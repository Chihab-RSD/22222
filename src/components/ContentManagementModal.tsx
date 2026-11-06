import React, { useState, useRef } from 'react';
import { 
  X, 
  Download, 
  Upload, 
  RotateCcw, 
  Edit3, 
  CheckCircle2, 
  AlertTriangle, 
  FileJson, 
  Sparkles,
  Info
} from 'lucide-react';
import { 
  getCustomizedActivitiesCount, 
  getCustomizedGamesCount, 
  exportAllCustomizationsJson, 
  importCustomizationsJson, 
  resetAllCustomizations 
} from '../utils/customContentManager';
import { soundEffects } from '../utils/audio';

interface ContentManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefreshContent: () => void;
}

export const ContentManagementModal: React.FC<ContentManagementModalProps> = ({
  isOpen,
  onClose,
  onRefreshContent
}) => {
  const [importStatus, setImportStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [pasteJson, setPasteJson] = useState<string>('');
  const [showPasteArea, setShowPasteArea] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const activitiesCount = getCustomizedActivitiesCount();
  const gamesCount = getCustomizedGamesCount();
  const totalCustomized = activitiesCount + gamesCount;

  // Export customizations as a JSON file
  const handleExport = () => {
    soundEffects.playClick();
    const dataStr = exportAllCustomizationsJson();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `infomoyenne_curriculum_custom_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    soundEffects.playCorrect();
  };

  // Import from JSON file
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const ok = importCustomizationsJson(content);
        if (ok) {
          soundEffects.playCorrect();
          setImportStatus({ success: true, message: 'تم استيراد كافة الأنشطة والألعاب بنجاح!' });
          onRefreshContent();
        } else {
          soundEffects.playIncorrect();
          setImportStatus({ success: false, message: 'صيغة ملف JSON غير صالحة أو لا تحتوي على بيانات صحيحة.' });
        }
      } catch (err) {
        soundEffects.playIncorrect();
        setImportStatus({ success: false, message: 'فشل في قراءة الملف، تأكد من سلامة ملف JSON.' });
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Import from pasted JSON string
  const handleImportPasted = () => {
    if (!pasteJson.trim()) return;
    try {
      const ok = importCustomizationsJson(pasteJson);
      if (ok) {
        soundEffects.playCorrect();
        setImportStatus({ success: true, message: 'تم استيراد البيانات النصية بنجاح!' });
        setPasteJson('');
        setShowPasteArea(false);
        onRefreshContent();
      } else {
        soundEffects.playIncorrect();
        setImportStatus({ success: false, message: 'النص المدخل ليس بصيغة JSON متوافقة.' });
      }
    } catch (e) {
      soundEffects.playIncorrect();
      setImportStatus({ success: false, message: 'حدث خطأ أثناء معالجة البيانات المدخلة.' });
    }
  };

  // Reset all customized activities to official baseline
  const handleResetAll = () => {
    soundEffects.playClick();
    const confirmed = window.confirm(
      'تحذير: هل أنت متأكد من رغبتك في إعادة ضبط جميع الأنشطة والألعاب المخصصة والعودة إلى المحتوى الوزاري الأصلي؟ لا يمكن التراجع عن هذه الخطوة إلا إذا كان لديك ملف تصدير احتياطي.'
    );
    if (confirmed) {
      resetAllCustomizations();
      soundEffects.playCorrect();
      setImportStatus({ success: true, message: 'تمت استعادة النسخة الوزارية الرسمية بنجاح لكافة الأنشطة.' });
      onRefreshContent();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 select-none animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-slate-950 px-5 py-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-inner">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                استوديو الأستاذ لإدارة وتعديل المنهاج
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-normal">
                  قابل للتعديل 100%
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                تخصيص كامل لـ 320 نشاط تطبيقي و 320 لعبة تمهيدية مع إمكانية التصدير والاستيراد
              </p>
            </div>
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

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* Status Message */}
          {importStatus && (
            <div className={`p-3.5 rounded-2xl border text-xs flex items-center gap-2.5 animate-scale-in ${
              importStatus.success
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
            }`}>
              {importStatus.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{importStatus.message}</span>
            </div>
          )}

          {/* Statistics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block mb-1">الأنشطة المعدلة</span>
              <span className="text-xl font-bold font-mono text-indigo-400">{activitiesCount}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">من أصل 320 نشاط</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block mb-1">الألعاب المعدلة</span>
              <span className="text-xl font-bold font-mono text-amber-400">{gamesCount}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">من أصل 320 لعبة</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 block mb-1">إجمالي التخصيص</span>
              <span className="text-xl font-bold font-mono text-emerald-400">{totalCustomized}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">من 640 نشاط ولعبة</span>
            </div>
          </div>

          {/* Quick Guide */}
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200 space-y-2">
            <div className="flex items-center gap-2 font-bold text-indigo-300">
              <Info className="w-4 h-4 text-indigo-400" />
              <span>كيف تعدّل أي نشاط أو لعبة؟</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px] leading-relaxed">
              <li>ادخل إلى أي درس من دروس المستويات (1م، 2م، 3م، 4م).</li>
              <li>افتح النشاط التطبيقي أو اللعبة التفاعلية التي ترغب في تعديلها.</li>
              <li>انقر على زر <strong>«تعديل هذا النشاط ✏️»</strong> أو <strong>«تعديل هذه اللعبة ✏️»</strong> في أعلى النافذة.</li>
              <li>غيّر نص السؤال، خيارات الإجابة، الشروحات، التلميحات، أو الكلمات المفتاحية ثم اضغط <strong>«حفظ التعديل»</strong>.</li>
              <li>تحفظ كل التعديلات محلياً وتظهر لك علامة <strong>(معدل ✏️)</strong> لتمييز الأنشطة المخصصة.</li>
            </ul>
          </div>

          {/* Export & Import Actions */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-300 flex items-center gap-2">
              <FileJson className="w-4 h-4 text-amber-400" />
              النسخ الاحتياطي ومشاركة التعديلات بين الأساتذة:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Export Button */}
              <button
                onClick={handleExport}
                className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-3 text-right transition-all cursor-pointer group"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Download className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">تصدير التعديلات (JSON)</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">تحميل ملف بكافة الأنشطة والألعاب المخصصة</p>
                </div>
              </button>

              {/* Import Button */}
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".json,application/json"
                  className="hidden"
                />
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    fileInputRef.current?.click();
                  }}
                  className="w-full p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-3 text-right transition-all cursor-pointer group"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">استيراد ملف تعديلات</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">رفع ملف JSON تم تصديره مسبقاً</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Toggle Paste JSON Area */}
            <div>
              <button
                onClick={() => setShowPasteArea(!showPasteArea)}
                className="text-xs text-indigo-400 hover:text-indigo-300 underline cursor-pointer"
              >
                {showPasteArea ? 'إخفاء لصق نص JSON' : 'أو الصق محتوى ملف JSON مباشرة كـ نص'}
              </button>

              {showPasteArea && (
                <div className="mt-2 space-y-2 animate-fade-in">
                  <textarea
                    rows={4}
                    value={pasteJson}
                    onChange={(e) => setPasteJson(e.target.value)}
                    placeholder='الصق نص JSON هنا...'
                    className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 focus:border-indigo-500 outline-none dir-ltr text-left"
                  />
                  <button
                    onClick={handleImportPasted}
                    disabled={!pasteJson.trim()}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    تطبيق الاستيراد من النص
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Reset All to Baseline */}
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-rose-300 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                العودة للنسخة الوزارية الرسمية
              </h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                إلغاء جميع التعديلات الشخصية واستعادة محتوى التوازيع الرسمية 2026/2027.
              </p>
            </div>

            <button
              onClick={handleResetAll}
              disabled={totalCustomized === 0}
              className="px-3.5 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shrink-0 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة ضبط الكل</span>
            </button>
          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-950 px-5 py-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};
