import React, { useState } from 'react';
import { Activity, MatchPair } from '../types';
import { 
  X, 
  Save, 
  RotateCcw, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  Lightbulb, 
  BookOpen,
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface ActivityEditorModalProps {
  activity: Activity;
  lessonTitle?: string;
  isOpen?: boolean;
  onSave: (updatedActivity: Activity) => void;
  onReset: () => void;
  onClose: () => void;
}

export const ActivityEditorModal: React.FC<ActivityEditorModalProps> = ({
  activity,
  lessonTitle = '',
  isOpen,
  onSave,
  onReset,
  onClose
}) => {
  if (isOpen !== undefined && !isOpen) return null;
  const [title, setTitle] = useState<string>(activity.title);
  const [prompt, setPrompt] = useState<string>(activity.prompt);
  const [explanation, setExplanation] = useState<string>(activity.explanation);
  const [hint, setHint] = useState<string>(activity.hint || '');

  // MCQ state
  const [options, setOptions] = useState<string[]>(activity.options ? [...activity.options] : []);
  const [correctOptionIdx, setCorrectOptionIdx] = useState<number>(
    typeof activity.correctAnswer === 'number' ? activity.correctAnswer : 0
  );

  // True/False state
  const [tfCorrect, setTfCorrect] = useState<boolean>(
    typeof activity.correctAnswer === 'boolean' ? activity.correctAnswer : true
  );

  // Match state
  const [pairs, setPairs] = useState<MatchPair[]>(
    activity.pairs ? activity.pairs.map(p => ({ ...p })) : []
  );

  // Order state
  const [orderItems, setOrderItems] = useState<string[]>(
    activity.correctOrder ? [...activity.correctOrder] : (activity.itemsToOrder ? [...activity.itemsToOrder] : [])
  );

  // Fill blank state
  const [blankTemplate, setBlankTemplate] = useState<string>(activity.blankTemplate || '');
  const [acceptedAnswersStr, setAcceptedAnswersStr] = useState<string>(
    activity.acceptedAnswers ? activity.acceptedAnswers.join(' ، ') : ''
  );

  // Handle Save
  const handleSave = () => {
    soundEffects.playCorrect();
    const updated: Activity = {
      ...activity,
      title: title.trim() || activity.title,
      prompt: prompt.trim() || activity.prompt,
      explanation: explanation.trim() || activity.explanation,
      hint: hint.trim() || undefined
    };

    if (activity.type === 'mcq' || activity.type === 'code_challenge') {
      updated.options = options.map(o => o.trim()).filter(Boolean);
      updated.correctAnswer = correctOptionIdx;
    } else if (activity.type === 'true_false') {
      updated.correctAnswer = tfCorrect;
    } else if (activity.type === 'match') {
      updated.pairs = pairs.filter(p => p.left.trim() && p.right.trim());
    } else if (activity.type === 'order') {
      const validItems = orderItems.map(i => i.trim()).filter(Boolean);
      updated.itemsToOrder = [...validItems].sort(() => Math.random() - 0.5);
      updated.correctOrder = validItems;
    } else if (activity.type === 'fill_blank') {
      updated.blankTemplate = blankTemplate.trim();
      updated.acceptedAnswers = acceptedAnswersStr
        .split(/[،,]/)
        .map(s => s.trim().toLowerCase())
        .filter(Boolean);
    }

    onSave(updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 select-none animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center border border-indigo-500/40">
              <Edit3 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>تعديل النشاط التطبيقي {activity.number}</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30 font-mono">
                  {activity.type.toUpperCase()}
                </span>
              </h3>
              <p className="text-xs text-slate-400">{lessonTitle}</p>
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

        {/* Form Body */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
          
          {/* Activity Title */}
          <div>
            <label className="block text-slate-300 font-bold mb-1.5">عنوان النشاط:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-white focus:border-indigo-500 outline-none"
              placeholder="اكتب عنوان النشاط..."
            />
          </div>

          {/* Activity Prompt / Question */}
          <div>
            <label className="block text-slate-300 font-bold mb-1.5">نص السؤال أو التعليمة:</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-white focus:border-indigo-500 outline-none resize-none leading-relaxed"
              placeholder="اكتب نص السؤال بدقة للمتعلم..."
            />
          </div>

          {/* Type Specific Fields: MCQ */}
          {(activity.type === 'mcq' || activity.type === 'code_challenge') && (
            <div className="space-y-3 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-bold">الخيارات المقترحة (حدد الإجابة الصحيحة):</span>
                {options.length < 5 && (
                  <button
                    onClick={() => setOptions([...options, `خيار ${options.length + 1}`])}
                    className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة خيار</span>
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {options.map((opt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctOption"
                      checked={correctOptionIdx === idx}
                      onChange={() => setCorrectOptionIdx(idx)}
                      className="w-4 h-4 accent-emerald-500 cursor-pointer"
                      title="اجعل هذا الخيار هو الإجابة الصحيحة"
                    />
                    <input
                      type="text"
                      value={opt}
                      onChange={(e) => {
                        const next = [...options];
                        next[idx] = e.target.value;
                        setOptions(next);
                      }}
                      className="flex-1 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700 text-white text-xs outline-none focus:border-indigo-500"
                    />
                    {options.length > 2 && (
                      <button
                        onClick={() => {
                          const next = options.filter((_, i) => i !== idx);
                          setOptions(next);
                          if (correctOptionIdx >= next.length) setCorrectOptionIdx(0);
                        }}
                        className="p-1.5 text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Type Specific Fields: True/False */}
          {activity.type === 'true_false' && (
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <span className="text-slate-300 font-bold block">الإجابة الصحيحة للعبارة:</span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setTfCorrect(true)}
                  className={`flex-1 py-2 rounded-xl font-bold border transition-all ${
                    tfCorrect
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-700'
                  }`}
                >
                  ✓ صحيحة (صواب)
                </button>
                <button
                  type="button"
                  onClick={() => setTfCorrect(false)}
                  className={`flex-1 py-2 rounded-xl font-bold border transition-all ${
                    !tfCorrect
                      ? 'bg-rose-600 text-white border-rose-500 shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-700'
                  }`}
                >
                  ✕ خاطئة (خطأ)
                </button>
              </div>
            </div>
          )}

          {/* Type Specific Fields: Match Pairs */}
          {activity.type === 'match' && (
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-bold">أزواج الربط والمطابقة (العنصر وقرينه):</span>
                {pairs.length < 6 && (
                  <button
                    onClick={() => setPairs([...pairs, { id: `p${pairs.length + 1}`, left: '', right: '' }])}
                    className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة زوج</span>
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {pairs.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={p.left}
                      onChange={(e) => {
                        const next = [...pairs];
                        next[idx].left = e.target.value;
                        setPairs(next);
                      }}
                      placeholder="العنصر (يمين)"
                      className="flex-1 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-700 text-white text-xs outline-none focus:border-indigo-500"
                    />
                    <span className="text-slate-500">↔</span>
                    <input
                      type="text"
                      value={p.right}
                      onChange={(e) => {
                        const next = [...pairs];
                        next[idx].right = e.target.value;
                        setPairs(next);
                      }}
                      placeholder="القرين أو الشرح (يسار)"
                      className="flex-1 bg-slate-900 px-2.5 py-1.5 rounded-lg border border-slate-700 text-white text-xs outline-none focus:border-indigo-500"
                    />
                    {pairs.length > 2 && (
                      <button
                        onClick={() => setPairs(pairs.filter((_, i) => i !== idx))}
                        className="p-1.5 text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Type Specific Fields: Order */}
          {activity.type === 'order' && (
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300 font-bold">خطوات الترتيب (اكتبها بالترتيب الصحيح 1 ← 2 ← 3):</span>
                {orderItems.length < 6 && (
                  <button
                    onClick={() => setOrderItems([...orderItems, `خطوة ${orderItems.length + 1}`])}
                    className="flex items-center gap-1 text-[11px] text-indigo-400 hover:text-indigo-300 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة خطوة</span>
                  </button>
                )}
              </div>

              <div className="space-y-2">
                {orderItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-slate-800 text-slate-400 font-mono text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const next = [...orderItems];
                        next[idx] = e.target.value;
                        setOrderItems(next);
                      }}
                      className="flex-1 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700 text-white text-xs outline-none focus:border-indigo-500"
                    />
                    {orderItems.length > 2 && (
                      <button
                        onClick={() => setOrderItems(orderItems.filter((_, i) => i !== idx))}
                        className="p-1.5 text-slate-500 hover:text-rose-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Type Specific Fields: Fill Blank */}
          {activity.type === 'fill_blank' && (
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  قالب الجملة مع مكان الفراغ [BLANK]:
                </label>
                <input
                  type="text"
                  value={blankTemplate}
                  onChange={(e) => setBlankTemplate(e.target.value)}
                  placeholder="مثال: نقوم بـ [BLANK] لحفظ المستند."
                  className="w-full bg-slate-900 p-2 rounded-lg border border-slate-700 text-white text-xs outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  الإجابات المقبولة (افصل بينها بفاصلة):
                </label>
                <input
                  type="text"
                  value={acceptedAnswersStr}
                      onChange={(e) => setAcceptedAnswersStr(e.target.value)}
                  placeholder="مثال: الحفظ ، Enregistrer ، Save"
                  className="w-full bg-slate-900 p-2 rounded-lg border border-slate-700 text-white text-xs outline-none focus:border-indigo-500"
                />
              </div>
            </div>
          )}

          {/* Explanation */}
          <div>
            <label className="block text-slate-300 font-bold mb-1.5">الشرح والتوضيح البيداغوجي (يظهر بعد الحل):</label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              rows={2}
              className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-white focus:border-indigo-500 outline-none resize-none leading-relaxed"
              placeholder="اكتب التبرير البيداغوجي للإجابة..."
            />
          </div>

          {/* Hint */}
          <div>
            <label className="block text-slate-300 font-bold mb-1.5">تلميح المساعدة (اختياري):</label>
            <input
              type="text"
              value={hint}
              onChange={(e) => setHint(e.target.value)}
              className="w-full bg-slate-950 p-2 rounded-xl border border-slate-800 text-white focus:border-indigo-500 outline-none"
              placeholder="تلميح يظهر للمتعلم عند الحاجة..."
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950 p-3.5 border-t border-slate-800 flex items-center justify-between gap-2">
          <button
            onClick={() => {
              soundEffects.playClick();
              onReset();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 text-xs font-bold transition-all border border-slate-700 hover:border-rose-500/40 cursor-pointer"
            title="استعادة نص النشاط الرسمي الأصلي لوزارة التربية"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>استعادة الأصل</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEffects.playClick();
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
            >
              إلغاء
            </button>

            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>حفظ التعديل</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
