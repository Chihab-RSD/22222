import React from 'react';
import { Lesson, Activity } from '../types';
import { 
  Play, 
  CheckCircle2, 
  Sparkles,
  Cpu,
  FolderTree,
  FileText,
  LayoutGrid,
  Globe,
  TableProperties,
  Calculator,
  Sigma,
  BarChart3,
  Presentation,
  Blocks,
  Radio,
  Variable,
  GitFork,
  RotateCw,
  Image as ImageIcon,
  Database,
  Code,
  Workflow,
  Terminal,
  Split,
  Repeat,
  Globe2,
  ShieldCheck,
  BookOpen,
  Gamepad2,
  Flame,
  Edit3
} from 'lucide-react';
import { soundEffects } from '../utils/audio';
import { isActivityCustomized, isGameCustomized } from '../utils/customContentManager';

interface LessonCardProps {
  lesson: Lesson;
  gradeColor: string;
  completedActivities: Record<string, boolean>;
  completedStarterGames?: Record<string, boolean>;
  onStartLesson: (lesson: Lesson, startIndex?: number) => void;
  onOpenActivity: (lesson: Lesson, activity: Activity) => void;
  onStartStarterGames?: (lesson: Lesson, startGameIndex?: number) => void;
}

// Icon mapper helper
const getLessonIcon = (iconName: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    Cpu: <Cpu className="w-5 h-5" />,
    FolderTree: <FolderTree className="w-5 h-5" />,
    FileText: <FileText className="w-5 h-5" />,
    LayoutGrid: <LayoutGrid className="w-5 h-5" />,
    Globe: <Globe className="w-5 h-5" />,
    TableProperties: <TableProperties className="w-5 h-5" />,
    Calculator: <Calculator className="w-5 h-5" />,
    Sigma: <Sigma className="w-5 h-5" />,
    BarChart3: <BarChart3 className="w-5 h-5" />,
    Presentation: <Presentation className="w-5 h-5" />,
    Blocks: <Blocks className="w-5 h-5" />,
    Radio: <Radio className="w-5 h-5" />,
    Variable: <Variable className="w-5 h-5" />,
    GitFork: <GitFork className="w-5 h-5" />,
    RotateCw: <RotateCw className="w-5 h-5" />,
    Image: <ImageIcon className="w-5 h-5" />,
    Database: <Database className="w-5 h-5" />,
    Code: <Code className="w-5 h-5" />,
    Workflow: <Workflow className="w-5 h-5" />,
    Terminal: <Terminal className="w-5 h-5" />,
    Split: <Split className="w-5 h-5" />,
    Repeat: <Repeat className="w-5 h-5" />,
    Globe2: <Globe2 className="w-5 h-5" />,
    ShieldCheck: <ShieldCheck className="w-5 h-5" />
  };

  return iconMap[iconName] || <BookOpen className="w-5 h-5" />;
};

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  completedActivities,
  completedStarterGames = {},
  onStartLesson,
  onOpenActivity,
  onStartStarterGames
}) => {
  // Practice activities count
  const completedCount = lesson.activities.filter(a => completedActivities[a.id]).length;
  const isAllCompleted = completedCount === lesson.activities.length && lesson.activities.length > 0;
  const progressPercent = Math.round((completedCount / lesson.activities.length) * 100);

  // Starter games count (10 per lesson)
  const starterPrefix = `${lesson.id}-sg`;
  const completedStarterCount = Array.from({ length: 10 }, (_, i) => `${starterPrefix}${i + 1}`)
    .filter(id => completedStarterGames[id]).length;
  const isAllStarterCompleted = completedStarterCount >= 10;

  return (
    <div className="bg-slate-800/85 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-600 rounded-3xl p-4 sm:p-5 transition-all duration-200 shadow-lg flex flex-col justify-between">
      <div>
        {/* Header: Lesson number, Domain tag, Status badges */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-mono">
              الدرس {lesson.order}
            </span>
            <span className="text-[11px] text-slate-400">
              {lesson.domain}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {isAllStarterCompleted && (
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-bold flex items-center gap-1">
                <Gamepad2 className="w-3 h-3" />
                ألعاب 10/10
              </span>
            )}
            {isAllCompleted ? (
              <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <CheckCircle2 className="w-3.5 h-3.5" />
                تطبيقي (10/10)
              </span>
            ) : (
              <span className="text-[10px] font-mono font-medium text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded-full">
                {completedCount} / 10 أنشطة
              </span>
            )}
          </div>
        </div>

        {/* Title & Icon */}
        <div className="flex items-start gap-3 mb-2.5">
          <div className="w-11 h-11 rounded-2xl bg-slate-700/70 text-indigo-400 flex items-center justify-center shrink-0 border border-slate-600/50 shadow-inner">
            {getLessonIcon(lesson.iconName)}
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
              {lesson.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
              {lesson.summary}
            </p>
          </div>
        </div>

        {/* Key Concepts Pills */}
        <div className="flex flex-wrap gap-1 my-3">
          {lesson.keyConcepts.map((concept, idx) => (
            <span
              key={idx}
              className="text-[10px] bg-slate-900/70 text-slate-300 px-2 py-0.5 rounded-md border border-slate-700/60"
            >
              #{concept}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3 mt-1 pt-3 border-t border-slate-700/60">
        
        {/* ========================================================================= */}
        {/* SECTION 1: ألعاب بداية الدرس (10 ألعاب تفاعلية - استراتيجيات التعلم النشط)   */}
        {/* ========================================================================= */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/25 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-amber-300 flex items-center gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5 text-amber-400" />
              <span>ألعاب بداية الدرس (التعلم النشط):</span>
            </span>

            <span className="text-[10px] font-mono text-amber-400/90 bg-amber-500/20 px-2 py-0.5 rounded-full">
              {completedStarterCount} / 10 ألعاب
            </span>
          </div>

          {/* 10 Starter Games Pills */}
          <div className="grid grid-cols-10 gap-1">
            {Array.from({ length: 10 }, (_, i) => {
              const gameNum = i + 1;
              const gameId = `${starterPrefix}${gameNum}`;
              const isDone = !!completedStarterGames[gameId];
              const isCustom = isGameCustomized(gameId);
              return (
                <button
                  key={gameId}
                  onClick={() => {
                    soundEffects.playClick();
                    if (onStartStarterGames) onStartStarterGames(lesson, i);
                  }}
                  className={`h-7 rounded-lg text-xs font-bold font-mono transition-all duration-150 flex items-center justify-center cursor-pointer select-none relative ${
                    isDone
                      ? 'bg-amber-500 text-slate-950 font-black shadow-sm scale-100 hover:scale-105'
                      : 'bg-slate-900/80 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30'
                  } ${isCustom ? 'ring-1 ring-amber-400' : ''}`}
                  title={`لعبة بداية الدرس ${gameNum} (${isDone ? 'تم إنجازها' : 'جاهزة للعب'})${isCustom ? ' [معدلة ✏️]' : ''}`}
                >
                  {gameNum}
                  {isCustom && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400"></span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-1 flex items-center justify-end">
            <button
              onClick={() => {
                soundEffects.playClick();
                if (onStartStarterGames) {
                  // Start first uncompleted or 0
                  const firstUnfinished = Array.from({ length: 10 }, (_, i) => i)
                    .find(i => !completedStarterGames[`${starterPrefix}${i + 1}`]);
                  onStartStarterGames(lesson, firstUnfinished !== undefined ? firstUnfinished : 0);
                }
              }}
              className="w-full py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>{isAllStarterCompleted ? 'إعادة ألعاب بداية الدرس' : 'العب ألعاب بداية الدرس (10 ألعاب)'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION 2: الأنشطة التطبيقية وبناء التعلمات (10 أنشطة تطبيقية)                */}
        {/* ========================================================================= */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-semibold text-slate-300 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-400" />
              أنشطة الدرس التطبيقية (10):
            </span>
            <span className="text-[11px] text-slate-400">انقر أي رقم للبدء به</span>
          </div>

          {/* 10 Activities Circles */}
          <div className="grid grid-cols-10 gap-1">
            {lesson.activities.map((act) => {
              const isDone = completedActivities[act.id];
              const isCustom = isActivityCustomized(act.id);
              return (
                <button
                  key={act.id}
                  onClick={() => {
                    soundEffects.playClick();
                    onOpenActivity(lesson, act);
                  }}
                  className={`h-7 rounded-lg text-xs font-bold font-mono transition-all duration-150 flex items-center justify-center cursor-pointer select-none relative ${
                    isDone
                      ? 'bg-emerald-600 text-white shadow-sm hover:bg-emerald-500 scale-100 hover:scale-105'
                      : 'bg-slate-700/60 hover:bg-indigo-600/60 text-slate-300 hover:text-white border border-slate-600/40'
                  } ${isCustom ? 'ring-1 ring-amber-400' : ''}`}
                  title={`النشاط ${act.number}: ${act.title} (${isDone ? 'تم حله' : 'غير مكتمل'})${isCustom ? ' [معدل ✏️]' : ''}`}
                >
                  {act.number}
                  {isCustom && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Progress Bar & Start Practice Button */}
          <div className="flex items-center gap-3 pt-1">
            <div className="flex-1 bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-700/50">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            <button
              onClick={() => {
                soundEffects.playClick();
                const firstUnfinishedIdx = lesson.activities.findIndex(a => !completedActivities[a.id]);
                const startIdx = firstUnfinishedIdx >= 0 ? firstUnfinishedIdx : 0;
                onStartLesson(lesson, startIdx);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md hover:shadow-indigo-500/25 cursor-pointer shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isAllCompleted ? 'إعادة التمارين' : 'ابدأ الأنشطة الـ 10'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
