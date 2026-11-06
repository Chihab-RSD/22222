import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Award, 
  Sparkles, 
  CheckCircle2,
  Calendar,
  Building
} from 'lucide-react';
import { soundEffects } from '../utils/audio';
import { GradeLevelId } from '../types';

interface CertificateModalProps {
  studentName: string;
  onUpdateStudentName: (name: string) => void;
  completedCount: number;
  totalActivities: number;
  activeGradeId: GradeLevelId;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  studentName,
  onUpdateStudentName,
  completedCount,
  totalActivities,
  activeGradeId,
  onClose
}) => {
  const [name, setName] = useState<string>(studentName || 'التلميذ(ة) المتفوق(ة)');
  const [school, setSchool] = useState<string>('متوسطة النجاح والتفوق');
  const [gradeTitle, setGradeTitle] = useState<string>(
    activeGradeId === '1am' ? 'السنة الأولى متوسط' :
    activeGradeId === '2am' ? 'السنة الثانية متوسط' :
    activeGradeId === '3am' ? 'السنة الثالثة متوسط' : 'السنة الرابعة متوسط (BEM)'
  );

  const handlePrint = () => {
    soundEffects.playVictory();
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('ar-DZ', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 select-none animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm sm:text-base font-bold text-white">
              شهادة التميز في مادة المعلوماتية
            </h3>
          </div>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Configuration Bar */}
        <div className="p-4 bg-slate-950/60 border-b border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div>
            <label className="text-slate-400 block mb-1 font-semibold">اسم ولقب التلميذ(ة):</label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                onUpdateStudentName(e.target.value);
              }}
              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-amber-400"
              placeholder="اكتب اسمك ولقبك..."
            />
          </div>

          <div>
            <label className="text-slate-400 block mb-1 font-semibold">اسم المتوسطة / المؤسسة:</label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-amber-400"
              placeholder="اكتب اسم مؤسستك التعليمية..."
            />
          </div>
        </div>

        {/* Certificate Card Render (Printable area) */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-900/50">
          <div 
            id="printable-certificate"
            className="w-full bg-gradient-to-br from-amber-50 via-white to-amber-50/80 text-slate-900 p-6 sm:p-8 rounded-2xl border-8 border-amber-600/30 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[380px]"
          >
            {/* Algerian Educational Emblem / Header */}
            <div className="text-center border-b-2 border-amber-600/30 pb-3">
              <h4 className="text-[11px] sm:text-xs font-semibold text-slate-700 tracking-wide">
                الجمهورية الجزائرية الديمقراطية الشعبية
              </h4>
              <p className="text-[10px] text-slate-600">
                وزارة التربية الوطنية • منهاج المعلوماتية للطور المتوسط
              </p>
              <h2 className="text-xl sm:text-2xl font-black text-amber-900 mt-2 font-serif flex items-center justify-center gap-2">
                <span>شهادة تفوق وتميز</span>
                <Sparkles className="w-5 h-5 text-amber-600" />
              </h2>
            </div>

            {/* Certificate Body Text */}
            <div className="text-center my-4 space-y-2.5">
              <p className="text-xs sm:text-sm text-slate-600">
                تُمنح هذه الشهادة التقديرية بكل فخر واعتزاز إلى التلميذ(ة):
              </p>

              <div className="text-lg sm:text-2xl font-black text-indigo-950 font-serif border-b-2 border-dashed border-amber-500 inline-block px-8 py-1">
                {name || 'التلميذ المتفوق'}
              </div>

              <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed pt-1">
                تقديراً لاجتهاده وإتمامه الأنشطة والتطبيقات العملية المقررة لمادة <strong>المعلوماتية</strong> لمستوى <strong>{gradeTitle}</strong> بمؤسسة <strong>{school}</strong>، حيث أبان عن كفاءة عالية وتفكير حوسبي مبدع.
              </p>
            </div>

            {/* Footer with Seal, Date & Signature */}
            <div className="pt-3 border-t border-amber-600/20 flex items-center justify-between text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-700" />
                <span>حرر بتاريخ: {currentDate}</span>
              </div>

              {/* Gold Seal Graphic */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex flex-col items-center justify-center shadow-lg border-2 border-white text-center">
                <Award className="w-5 h-5" />
                <span className="text-[8px] font-bold">امتياز</span>
              </div>

              <div className="text-left font-serif">
                <span className="block font-bold text-amber-900">أستاذ المادة</span>
                <span className="text-[10px] text-slate-500">لجنة التقييم الرقمي</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Actions */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            تم إنجاز {completedCount} من {totalActivities} نشاطاً
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة الشهادة (Print)</span>
            </button>
            <button
              onClick={onClose}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold cursor-pointer"
            >
              إغلاق
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
