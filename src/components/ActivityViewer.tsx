import React, { useState, useEffect } from 'react';
import { Activity, Lesson } from '../types';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  RotateCcw, 
  Sparkles, 
  Trophy,
  HelpCircle,
  ArrowUp,
  ArrowDown,
  Check,
  Edit3
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/audio';
import { resolveActivity, saveCustomActivity, resetCustomActivity, isActivityCustomized } from '../utils/customContentManager';
import { ActivityEditorModal } from './ActivityEditorModal';

interface ActivityViewerProps {
  lesson: Lesson;
  initialActivityIndex?: number;
  completedActivities: Record<string, boolean>;
  onCompleteActivity: (activityId: string, score: number) => void;
  onClose: () => void;
}

export const ActivityViewer: React.FC<ActivityViewerProps> = ({
  lesson,
  initialActivityIndex = 0,
  completedActivities,
  onCompleteActivity,
  onClose
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialActivityIndex);
  const [activeActivity, setActiveActivity] = useState<Activity>(() => resolveActivity(lesson.activities[initialActivityIndex]));
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const currentActivity: Activity = activeActivity;

  // User input states
  const [selectedMcq, setSelectedMcq] = useState<number | null>(null);
  const [selectedTf, setSelectedTf] = useState<boolean | null>(null);
  const [fillBlankInput, setFillBlankInput] = useState<string>('');
  
  // Matching state
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [userPairs, setUserPairs] = useState<Record<string, string>>({}); // leftId -> rightText
  const [shuffledRights, setShuffledRights] = useState<string[]>([]);

  // Ordering state
  const [orderItems, setOrderItems] = useState<string[]>([]);

  // Feedback states
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  useEffect(() => {
    setActiveActivity(resolveActivity(lesson.activities[currentIndex]));
  }, [currentIndex, lesson]);

  const handleSaveEditedActivity = (updated: Activity) => {
    saveCustomActivity(updated);
    setActiveActivity(updated);
    setIsEditorOpen(false);
  };

  const handleResetActivity = (activityId: string) => {
    resetCustomActivity(activityId);
    setActiveActivity(lesson.activities[currentIndex]);
    setIsEditorOpen(false);
  };

  // Initialize/reset states when activity changes
  useEffect(() => {
    setSelectedMcq(null);
    setSelectedTf(null);
    setFillBlankInput('');
    setSelectedLeft(null);
    setUserPairs({});
    setShowHint(false);

    if (currentActivity.type === 'match' && currentActivity.pairs) {
      // Shuffle rights to make matching authentic
      const rights = currentActivity.pairs.map(p => p.right).sort(() => Math.random() - 0.5);
      setShuffledRights(rights);
    }

    if (currentActivity.type === 'order' && currentActivity.itemsToOrder) {
      // Shuffle ordering items initially if they match correctOrder
      const shuffled = [...currentActivity.itemsToOrder].sort(() => Math.random() - 0.5);
      setOrderItems(shuffled);
    }

    // Check if already completed previously
    const alreadyDone = !!completedActivities[currentActivity.id];
    setIsAnswered(alreadyDone);
    setIsCorrect(alreadyDone);
  }, [currentIndex, currentActivity]);

  // Handle MCQ / Code Challenge selection
  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    soundEffects.playClick();
    setSelectedMcq(idx);

    const correct = idx === currentActivity.correctAnswer;
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      soundEffects.playCorrect();
      onCompleteActivity(currentActivity.id, 10);
      triggerCelebrationIfLast();
    } else {
      soundEffects.playIncorrect();
    }
  };

  // Handle True / False
  const handleSelectTf = (val: boolean) => {
    if (isAnswered) return;
    soundEffects.playClick();
    setSelectedTf(val);

    const correct = val === currentActivity.correctAnswer;
    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      soundEffects.playCorrect();
      onCompleteActivity(currentActivity.id, 10);
      triggerCelebrationIfLast();
    } else {
      soundEffects.playIncorrect();
    }
  };

  // Handle Fill in the blank submit
  const handleCheckFillBlank = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!fillBlankInput.trim() || isAnswered) return;

    soundEffects.playClick();
    const cleanUser = fillBlankInput.trim().toLowerCase().replace(/[إأآا]/g, 'ا');
    const accepted = currentActivity.acceptedAnswers || [];
    const correct = accepted.some(ans => {
      const cleanAns = ans.trim().toLowerCase().replace(/[إأآا]/g, 'ا');
      return cleanUser === cleanAns || cleanUser.includes(cleanAns) || cleanAns.includes(cleanUser);
    });

    setIsAnswered(true);
    setIsCorrect(correct);

    if (correct) {
      soundEffects.playCorrect();
      onCompleteActivity(currentActivity.id, 10);
      triggerCelebrationIfLast();
    } else {
      soundEffects.playIncorrect();
    }
  };

  // Handle Matching pair click
  const handleMatchLeftClick = (pairId: string) => {
    if (isAnswered) return;
    soundEffects.playClick();
    setSelectedLeft(pairId);
  };

  const handleMatchRightClick = (rightText: string) => {
    if (isAnswered || !selectedLeft) return;
    soundEffects.playClick();

    const newPairs = { ...userPairs, [selectedLeft]: rightText };
    setUserPairs(newPairs);
    setSelectedLeft(null);

    // If all pairs matched, evaluate
    if (currentActivity.pairs && Object.keys(newPairs).length === currentActivity.pairs.length) {
      const allCorrect = currentActivity.pairs.every(p => newPairs[p.id] === p.right);
      setIsAnswered(true);
      setIsCorrect(allCorrect);

      if (allCorrect) {
        soundEffects.playCorrect();
        onCompleteActivity(currentActivity.id, 10);
        triggerCelebrationIfLast();
      } else {
        soundEffects.playIncorrect();
      }
    }
  };

  // Handle Order move up/down
  const moveOrderItem = (idx: number, direction: 'up' | 'down') => {
    if (isAnswered) return;
    soundEffects.playClick();
    const newItems = [...orderItems];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= newItems.length) return;

    const temp = newItems[idx];
    newItems[idx] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    setOrderItems(newItems);
  };

  const handleCheckOrder = () => {
    if (isAnswered) return;
    soundEffects.playClick();
    const correctOrder = currentActivity.correctOrder || [];
    const isMatched = orderItems.every((item, i) => item === correctOrder[i]);

    setIsAnswered(true);
    setIsCorrect(isMatched);

    if (isMatched) {
      soundEffects.playCorrect();
      onCompleteActivity(currentActivity.id, 10);
      triggerCelebrationIfLast();
    } else {
      soundEffects.playIncorrect();
    }
  };

  // Retry the current activity
  const handleRetry = () => {
    soundEffects.playClick();
    setIsAnswered(false);
    setIsCorrect(false);
    setSelectedMcq(null);
    setSelectedTf(null);
    setFillBlankInput('');
    setUserPairs({});
    setSelectedLeft(null);
    if (currentActivity.itemsToOrder) {
      setOrderItems([...currentActivity.itemsToOrder].sort(() => Math.random() - 0.5));
    }
  };

  // Confetti celebration if 10th activity or all 10 are finished
  const triggerCelebrationIfLast = () => {
    const isLast = currentIndex === lesson.activities.length - 1;
    if (isLast) {
      soundEffects.playVictory();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Next / Previous navigation
  const handleNext = () => {
    soundEffects.playClick();
    if (currentIndex < lesson.activities.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    soundEffects.playClick();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Keyboard navigation for Desktop PC mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if student is typing in an input
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        handleNext();
      } else if (e.key === 'ArrowRight') {
        handlePrev();
      } else if (!isAnswered && (currentActivity.type === 'mcq' || currentActivity.type === 'code_challenge')) {
        if (['1', '2', '3', '4'].includes(e.key)) {
          const idx = parseInt(e.key) - 1;
          if (currentActivity.options && idx < currentActivity.options.length) {
            handleSelectOption(idx);
          }
        } else if (['a', 'b', 'c', 'd', 'A', 'B', 'C', 'D'].includes(e.key)) {
          const code = e.key.toUpperCase().charCodeAt(0) - 65;
          if (currentActivity.options && code >= 0 && code < currentActivity.options.length) {
            handleSelectOption(code);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isAnswered, currentActivity]);

  const completedCount = lesson.activities.filter(a => completedActivities[a.id]).length;

  return (
    <div className="w-full flex-1 flex flex-col bg-slate-900 text-slate-100 select-none">
      
      {/* Top Header Bar */}
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
        <button
          onClick={() => {
            soundEffects.playClick();
            onClose();
          }}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
          <span>العودة للدروس</span>
        </button>

        <div className="text-center">
          <span className="text-xs font-bold text-indigo-400 block">
            {lesson.title}
          </span>
          <span className="text-[10px] text-slate-400">
            النشاط {currentActivity.number} من 10 • {completedCount} مكتمل
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isActivityCustomized(currentActivity.id) && (
            <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold hidden sm:inline-block">
              ✏️ معدل
            </span>
          )}

          <button
            onClick={() => {
              soundEffects.playClick();
              setIsEditorOpen(true);
            }}
            className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border-indigo-500/40 transition-all cursor-pointer font-bold"
            title="تعديل هذا النشاط (تغيير الأسئلة، الخيارات، والشرح)"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">تعديل النشاط</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setShowHint(!showHint);
            }}
            className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
              showHint 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                : 'bg-slate-800 text-slate-400 hover:text-amber-300 border-slate-700'
            }`}
            title="تلميح المساعدة"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            <span>تلميح</span>
          </button>
        </div>
      </div>

      {/* 10 Activities Horizontal Step Tracker */}
      <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800/60 flex items-center justify-between gap-1 overflow-x-auto">
        {lesson.activities.map((act, idx) => {
          const isCurrent = idx === currentIndex;
          const isDone = completedActivities[act.id];

          return (
            <button
              key={act.id}
              onClick={() => {
                soundEffects.playClick();
                setCurrentIndex(idx);
              }}
              className={`h-7 min-w-7 px-1.5 rounded-lg text-xs font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${
                isCurrent
                  ? 'bg-indigo-600 text-white ring-2 ring-indigo-400 ring-offset-2 ring-offset-slate-900 shadow-md scale-105'
                  : isDone
                  ? 'bg-emerald-600/80 text-white hover:bg-emerald-500'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {isDone && !isCurrent ? <Check className="w-3 h-3" /> : act.number}
            </button>
          );
        })}
      </div>

      {/* Activity Content Area */}
      <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto max-w-4xl mx-auto w-full flex flex-col justify-between">
        <div>
          {/* Activity Badge & Title */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {currentActivity.type === 'mcq' && 'سؤال اختيار من متعدد'}
              {currentActivity.type === 'true_false' && 'سؤال صح أو خطأ'}
              {currentActivity.type === 'match' && 'نشاط مطابقة وتوصيل'}
              {currentActivity.type === 'order' && 'نشاط ترتيب الخطوات'}
              {currentActivity.type === 'fill_blank' && 'نشاط إكمال الفراغ'}
              {currentActivity.type === 'code_challenge' && 'تحدي برمجي تطبيقي'}
            </span>

            <span className="text-xs text-slate-400 font-mono">
              تمرين {currentActivity.number} / 10
            </span>
          </div>

          <h2 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
            {currentActivity.title}
          </h2>

          <p className="text-sm text-slate-300 mb-4 whitespace-pre-line leading-relaxed bg-slate-800/40 p-3.5 rounded-xl border border-slate-700/50">
            {currentActivity.prompt}
          </p>

          {/* Code Snippet Box (if present) */}
          {currentActivity.codeSnippet && (
            <div className="mb-4 bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 whitespace-pre overflow-x-auto shadow-inner dir-ltr text-left">
              {currentActivity.codeSnippet}
            </div>
          )}

          {/* Hint Card if activated */}
          {showHint && currentActivity.hint && (
            <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-xs text-amber-200 flex items-start gap-2 animate-fade-in">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-amber-300 mb-0.5">تلميح لمساعدتك:</span>
                {currentActivity.hint}
              </div>
            </div>
          )}

          {/* Interactive Inputs based on Activity Type */}

          {/* 1. MCQ & Code Challenge Options */}
          {(currentActivity.type === 'mcq' || currentActivity.type === 'code_challenge') && currentActivity.options && (
            <div className="space-y-2.5">
              {currentActivity.options.map((option, idx) => {
                const isSelected = selectedMcq === idx;
                const isTargetCorrect = idx === currentActivity.correctAnswer;
                
                let btnStyle = 'bg-slate-800/90 hover:bg-slate-700/80 border-slate-700 text-slate-200';
                if (isAnswered) {
                  if (isTargetCorrect) {
                    btnStyle = 'bg-emerald-600/30 border-emerald-500 text-emerald-200 font-bold';
                  } else if (isSelected && !isTargetCorrect) {
                    btnStyle = 'bg-rose-600/30 border-rose-500 text-rose-200 font-bold';
                  } else {
                    btnStyle = 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full text-right p-3.5 rounded-xl border transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-xs sm:text-sm leading-relaxed">{option}</span>
                    </div>

                    {isAnswered && isTargetCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isTargetCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* 2. True / False Buttons */}
          {currentActivity.type === 'true_false' && (
            <div className="grid grid-cols-2 gap-3 my-4">
              <button
                onClick={() => handleSelectTf(true)}
                disabled={isAnswered}
                className={`py-5 px-4 rounded-2xl border text-center font-bold text-sm sm:text-base flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                  isAnswered
                    ? currentActivity.correctAnswer === true
                      ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500'
                      : selectedTf === true
                      ? 'bg-rose-600/30 border-rose-500 text-rose-300'
                      : 'bg-slate-800/30 border-slate-800 text-slate-500 opacity-50'
                    : 'bg-emerald-600/20 hover:bg-emerald-600/30 border-emerald-500/40 text-emerald-300'
                }`}
              >
                <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                <span>صحيح (Vrai)</span>
              </button>

              <button
                onClick={() => handleSelectTf(false)}
                disabled={isAnswered}
                className={`py-5 px-4 rounded-2xl border text-center font-bold text-sm sm:text-base flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                  isAnswered
                    ? currentActivity.correctAnswer === false
                      ? 'bg-emerald-600/30 border-emerald-500 text-emerald-300 ring-2 ring-emerald-500'
                      : selectedTf === false
                      ? 'bg-rose-600/30 border-rose-500 text-rose-300'
                      : 'bg-slate-800/30 border-slate-800 text-slate-500 opacity-50'
                    : 'bg-rose-600/20 hover:bg-rose-600/30 border-rose-500/40 text-rose-300'
                }`}
              >
                <XCircle className="w-7 h-7 text-rose-400" />
                <span>خطأ (Faux)</span>
              </button>
            </div>
          )}

          {/* 3. Matching Activity */}
          {currentActivity.type === 'match' && currentActivity.pairs && (
            <div className="space-y-4">
              <p className="text-xs text-indigo-300 font-medium">
                انقر عنصراً من القائمة اليمنى ثم اختر ما يقابله من القائمة اليسرى:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Left Column (Keys) */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 mb-1">المفاهيم:</h4>
                  {currentActivity.pairs.map((p) => {
                    const isPaired = !!userPairs[p.id];
                    const isSelected = selectedLeft === p.id;

                    return (
                      <button
                        key={p.id}
                        onClick={() => handleMatchLeftClick(p.id)}
                        disabled={isAnswered}
                        className={`w-full text-right p-3 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-400 ring-2 ring-indigo-400'
                            : isPaired
                            ? 'bg-indigo-950/60 border-indigo-500/50 text-indigo-200'
                            : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                        }`}
                      >
                        <div className="font-bold">{p.left}</div>
                        {isPaired && (
                          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 border-t border-indigo-500/30 pt-1">
                            <span>← {userPairs[p.id]}</span>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Right Column (Values) */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 mb-1">التعريفات / الخيارات:</h4>
                  {shuffledRights.map((rightText, idx) => {
                    const isUsed = Object.values(userPairs).includes(rightText);

                    return (
                      <button
                        key={idx}
                        onClick={() => handleMatchRightClick(rightText)}
                        disabled={isAnswered || isUsed}
                        className={`w-full text-right p-3 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer ${
                          isUsed
                            ? 'bg-slate-800/40 border-slate-800 text-slate-500 line-through opacity-50 cursor-not-allowed'
                            : selectedLeft
                            ? 'bg-emerald-600/20 hover:bg-emerald-600/40 border-emerald-500/50 text-emerald-200 animate-pulse'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        {rightText}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* 4. Ordering Activity */}
          {currentActivity.type === 'order' && (
            <div className="space-y-3">
              <p className="text-xs text-indigo-300 font-medium">
                استخدم الأسهم لإعادة ترتيب العناصر بالتسلسل المنطقي الصحيح من البداية للنهاية:
              </p>

              <div className="space-y-2">
                {orderItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-mono font-bold flex items-center justify-center text-[10px] shrink-0">
                        {idx + 1}
                      </span>
                      <span className="text-slate-200">{item}</span>
                    </div>

                    {!isAnswered && (
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => moveOrderItem(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200"
                          title="تحريك للأعلى"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveOrderItem(idx, 'down')}
                          disabled={idx === orderItems.length - 1}
                          className="p-1 rounded bg-slate-700 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200"
                          title="تحريك للأسفل"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {!isAnswered && (
                <button
                  onClick={handleCheckOrder}
                  className="w-full mt-3 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                >
                  تحقق من صحة الترتيب
                </button>
              )}
            </div>
          )}

          {/* 5. Fill in the Blank Activity */}
          {currentActivity.type === 'fill_blank' && (
            <form onSubmit={handleCheckFillBlank} className="space-y-4">
              <div className="p-4 bg-slate-800/80 border border-slate-700 rounded-2xl">
                <p className="text-sm text-slate-200 leading-loose mb-3">
                  {currentActivity.blankTemplate ? (
                    currentActivity.blankTemplate.split('[BLANK]').map((part, index, arr) => (
                      <React.Fragment key={index}>
                        {part}
                        {index < arr.length - 1 && (
                          <span className="inline-block px-2 py-0.5 mx-1 border-b-2 border-dashed border-amber-400 font-bold text-amber-300">
                            {isAnswered ? (
                              <span className={isCorrect ? 'text-emerald-400' : 'text-rose-400'}>
                                {fillBlankInput || '(فارغ)'}
                              </span>
                            ) : (
                              '........'
                            )}
                          </span>
                        )}
                      </React.Fragment>
                    ))
                  ) : null}
                </p>

                {!isAnswered ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={fillBlankInput}
                      onChange={(e) => setFillBlankInput(e.target.value)}
                      placeholder="اكتب الإجابة المناسبة هنا..."
                      className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white text-sm outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!fillBlankInput.trim()}
                      className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-md cursor-pointer shrink-0"
                    >
                      تأكيد الحل
                    </button>
                  </div>
                ) : null}
              </div>
            </form>
          )}

          {/* Explanation & Pedagogical Feedback Card */}
          {isAnswered && (
            <div className={`mt-5 p-4 rounded-2xl border transition-all animate-fade-in ${
              isCorrect 
                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
                : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
            }`}>
              <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                {isCorrect ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-300">إجابة نموذجية ممتازة! (+10 نقاط)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-5 h-5 text-rose-400" />
                    <span className="text-rose-300">إجابة غير دقيقة، طالع الشرح التالي:</span>
                  </>
                )}
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentActivity.explanation}
              </p>

              {/* Retry button if wrong */}
              {!isCorrect && (
                <button
                  onClick={handleRetry}
                  className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold border border-slate-700 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إعادة المحاولة من جديد</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-semibold text-slate-300 transition-colors cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
            <span>النشاط السابق</span>
          </button>

          {/* Middle counter */}
          <span className="text-xs text-slate-400 font-mono">
            {currentIndex + 1} / {lesson.activities.length}
          </span>

          <button
            onClick={handleNext}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
              currentIndex === lesson.activities.length - 1
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            <span>{currentIndex === lesson.activities.length - 1 ? 'إنهاء الدرس' : 'النشاط التالي'}</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Activity Editor Modal */}
      {isEditorOpen && (
        <ActivityEditorModal
          isOpen={isEditorOpen}
          activity={currentActivity}
          onClose={() => setIsEditorOpen(false)}
          onSave={handleSaveEditedActivity}
          onReset={() => handleResetActivity(currentActivity.id)}
        />
      )}
    </div>
  );
};
