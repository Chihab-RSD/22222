import React from 'react';
import { GradeLevel, GradeLevelId } from '../types';
import { CheckCircle2, Award } from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface GradeTabsProps {
  grades: GradeLevel[];
  activeGradeId: GradeLevelId;
  onSelectGrade: (id: GradeLevelId) => void;
  completedActivities: Record<string, boolean>;
}

export const GradeTabs: React.FC<GradeTabsProps> = ({
  grades,
  activeGradeId,
  onSelectGrade,
  completedActivities,
}) => {
  return (
    <div className="w-full bg-slate-900/95 sticky top-0 z-20 border-b border-slate-800/80 backdrop-blur-md px-3 pt-2 pb-2">
      {/* 4 Grade Level Tabs */}
      <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-950/80 rounded-2xl border border-slate-800">
        {grades.map((grade) => {
          const isActive = grade.id === activeGradeId;
          
          // Calculate completed activities for this grade
          const totalInGrade = grade.lessons.reduce((acc, l) => acc + l.activities.length, 0);
          const completedInGrade = grade.lessons.reduce((acc, l) => {
            return acc + l.activities.filter(a => completedActivities[a.id]).length;
          }, 0);
          const isFinished = totalInGrade > 0 && completedInGrade === totalInGrade;

          return (
            <button
              key={grade.id}
              onClick={() => {
                soundEffects.playClick();
                onSelectGrade(grade.id);
              }}
              className={`relative flex flex-col items-center justify-center py-2 px-1 rounded-xl transition-all duration-200 cursor-pointer select-none ${
                isActive
                  ? 'bg-gradient-to-b from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 font-bold scale-[1.02]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 font-medium'
              }`}
            >
              {/* Short title */}
              <div className="flex items-center gap-1">
                <span className="text-xs sm:text-sm font-bold tracking-tight">
                  {grade.shortName}
                </span>
                {isFinished ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                ) : null}
              </div>

              {/* Progress counter */}
              <div className="flex items-center gap-1 mt-0.5">
                <span className={`text-[10px] font-mono ${isActive ? 'text-indigo-200' : 'text-slate-500'}`}>
                  {completedInGrade}/{totalInGrade}
                </span>
              </div>

              {/* Active Indicator dot */}
              {isActive && (
                <div className="absolute -bottom-1 w-5 h-1 rounded-full bg-amber-400"></div>
              )}
            </button>
          );
        })}
      </div>

      {/* Grade Level Summary Banner */}
      {(() => {
        const currentGrade = grades.find(g => g.id === activeGradeId) || grades[0];
        const totalActivities = currentGrade.lessons.reduce((acc, l) => acc + l.activities.length, 0);
        const completedCount = currentGrade.lessons.reduce((acc, l) => {
          return acc + l.activities.filter(a => completedActivities[a.id]).length;
        }, 0);
        const percentage = Math.round((completedCount / (totalActivities || 1)) * 100);

        return (
          <div className="mt-2.5 px-3 py-2 rounded-xl bg-gradient-to-r from-slate-800/90 to-slate-850/90 border border-slate-700/50 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xs sm:text-sm font-bold text-white">{currentGrade.title}</h2>
                  <span className="text-[10px] bg-slate-700/80 text-amber-300 px-1.5 py-0.2 rounded font-medium border border-amber-400/20">
                    {currentGrade.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-1">{currentGrade.subtitle}</p>
              </div>
            </div>

            {/* Percentage Badge & Progress bar */}
            <div className="text-left shrink-0">
              <div className="flex items-center justify-end gap-1.5">
                <span className="text-xs font-bold text-emerald-400 font-mono">{percentage}%</span>
                <span className="text-[10px] text-slate-400">مكتمل</span>
              </div>
              <div className="w-16 sm:w-20 bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1">
                <div 
                  className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};
