import React, { useState } from 'react';
import { StarterGame } from '../types/starterGames';
import { 
  X, 
  Save, 
  RotateCcw, 
  Edit3, 
  Gamepad2, 
  Lightbulb, 
  Plus, 
  Trash2,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface StarterGameEditorModalProps {
  game: StarterGame;
  lessonTitle?: string;
  isOpen?: boolean;
  onSave: (updatedGame: StarterGame) => void;
  onReset: () => void;
  onClose: () => void;
}

export const StarterGameEditorModal: React.FC<StarterGameEditorModalProps> = ({
  game,
  lessonTitle = '',
  isOpen,
  onSave,
  onReset,
  onClose
}) => {
  if (isOpen !== undefined && !isOpen) return null;
  const [title, setTitle] = useState<string>(game.title);
  const [strategyTitle, setStrategyTitle] = useState<string>(game.strategyTitle);
  const [hookScenario, setHookScenario] = useState<string>(game.hookScenario);
  const [learningGoal, setLearningGoal] = useState<string>(game.learningGoal);

  // Who Am I state
  const [clues, setClues] = useState<string[]>(
    game.whoAmIData?.clues ? [...game.whoAmIData.clues] : []
  );
  const [whoAmIOptions, setWhoAmIOptions] = useState<string[]>(
    game.whoAmIData?.options ? [...game.whoAmIData.options] : []
  );
  const [whoAmICorrectIdx, setWhoAmICorrectIdx] = useState<number>(
    game.whoAmIData?.correctIndex ?? 0
  );
  const [whoAmIExplanation, setWhoAmIExplanation] = useState<string>(
    game.whoAmIData?.explanation || ''
  );

  // Word Scramble state
  const [targetWord, setTargetWord] = useState<string>(
    game.wordScrambleData?.correctWord || ''
  );
  const [scrambleHint, setScrambleHint] = useState<string>(
    game.wordScrambleData?.hint || ''
  );

  // Speed Sort state
  const [cat1Title, setCat1Title] = useState<string>(
    game.speedSortData?.categories[0]?.title || ''
  );
  const [cat2Title, setCat2Title] = useState<string>(
    game.speedSortData?.categories[1]?.title || ''
  );
  const [sortItems, setSortItems] = useState(
    game.speedSortData?.items ? game.speedSortData.items.map(i => ({ ...i })) : []
  );

  // Lightning state
  const [lightningStatement, setLightningStatement] = useState<string>(
    game.lightningData?.statement || ''
  );
  const [lightningIsTrue, setLightningIsTrue] = useState<boolean>(
    game.lightningData?.isTrue ?? true
  );
  const [lightningExplanation, setLightningExplanation] = useState<string>(
    game.lightningData?.explanation || ''
  );

  // Think-Pair-Share state
  const [tpsQuestion, setTpsQuestion] = useState<string>(
    game.thinkPairData?.question || ''
  );
  const [tpsIdealAnswer, setTpsIdealAnswer] = useState<string>(
    game.thinkPairData?.idealAnswer || ''
  );

  // Memory state
  const [memoryPairs, setMemoryPairs] = useState(
    game.memoryMatchData?.pairs ? game.memoryMatchData.pairs.map(p => ({ ...p })) : []
  );

  // Save handler
  const handleSave = () => {
    soundEffects.playCorrect();
    const updated: StarterGame = {
      ...game,
      title: title.trim() || game.title,
      strategyTitle: strategyTitle.trim() || game.strategyTitle,
      hookScenario: hookScenario.trim() || game.hookScenario,
      learningGoal: learningGoal.trim() || game.learningGoal
    };

    if (game.strategyType === 'who_am_i' && game.whoAmIData) {
      updated.whoAmIData = {
        ...game.whoAmIData,
        clues: clues.filter(c => c.trim()),
        options: whoAmIOptions.filter(o => o.trim()),
        correctIndex: whoAmICorrectIdx,
        explanation: whoAmIExplanation.trim()
      };
    } else if (game.strategyType === 'word_scramble' && game.wordScrambleData) {
      const cleanWord = targetWord.trim();
      updated.wordScrambleData = {
        ...game.wordScrambleData,
        correctWord: cleanWord,
        scrambledLetters: cleanWord.replace(/\s+/g, '').split(''),
        hint: scrambleHint.trim()
      };
    } else if (game.strategyType === 'speed_sort' && game.speedSortData) {
      const c1 = { ...game.speedSortData.categories[0], title: cat1Title.trim() };
      const c2 = { ...game.speedSortData.categories[1], title: cat2Title.trim() };
      updated.speedSortData = {
        ...game.speedSortData,
        categories: [c1, c2],
        items: sortItems.filter(i => i.text.trim())
      };
    } else if (game.strategyType === 'lightning_quiz' && game.lightningData) {
      updated.lightningData = {
        ...game.lightningData,
        statement: lightningStatement.trim(),
        isTrue: lightningIsTrue,
        explanation: lightningExplanation.trim()
      };
    } else if (game.strategyType === 'think_pair_share' && game.thinkPairData) {
      updated.thinkPairData = {
        ...game.thinkPairData,
        question: tpsQuestion.trim(),
        idealAnswer: tpsIdealAnswer.trim()
      };
    } else if (game.strategyType === 'memory_match' && game.memoryMatchData) {
      updated.memoryMatchData = {
        ...game.memoryMatchData,
        pairs: memoryPairs.filter(p => p.term.trim() && p.definition.trim())
      };
    }

    onSave(updated);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 select-none animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]">
        
        {/* Header */}
        <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>تعديل لعبة بداية الدرس {game.number}</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-500/30 font-mono">
                  {game.strategyType}
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
          
          {/* Game Title */}
          <div>
            <label className="block text-slate-300 font-bold mb-1.5">عنوان اللعبة:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-white focus:border-amber-500 outline-none"
              placeholder="عنوان اللعبة..."
            />
          </div>

          {/* Strategy Title */}
          <div>
            <label className="block text-slate-300 font-bold mb-1.5">اسم استراتيجية التعلم النشط:</label>
            <input
              type="text"
              value={strategyTitle}
              onChange={(e) => setStrategyTitle(e.target.value)}
              className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-white focus:border-amber-500 outline-none"
              placeholder="مثال: استراتيجية فكر - زاوج - شارك..."
            />
          </div>

          {/* Hook Scenario */}
          <div>
            <label className="block text-slate-300 font-bold mb-1.5">الوضعية الانطلاقية المشوقة للنشاط:</label>
            <textarea
              value={hookScenario}
              onChange={(e) => setHookScenario(e.target.value)}
              rows={2}
              className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-white focus:border-amber-500 outline-none resize-none leading-relaxed"
              placeholder="القصة أو التحدي الانطلاقي..."
            />
          </div>

          {/* Learning Goal */}
          <div>
            <label className="block text-slate-300 font-bold mb-1.5">الهدف البيداغوجي للتهيئة:</label>
            <input
              type="text"
              value={learningGoal}
              onChange={(e) => setLearningGoal(e.target.value)}
              className="w-full bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-white focus:border-amber-500 outline-none"
              placeholder="الهدف من هذا النشاط التمهيدي..."
            />
          </div>

          {/* STRATEGY SPECIFIC: WHO AM I */}
          {game.strategyType === 'who_am_i' && (
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <span className="text-amber-400 font-bold block">إشارات التخمين (Clues):</span>
              {clues.map((clue, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 font-mono text-[11px] flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={clue}
                    onChange={(e) => {
                      const next = [...clues];
                      next[idx] = e.target.value;
                      setClues(next);
                    }}
                    className="flex-1 bg-slate-900 p-2 rounded-lg border border-slate-700 text-white text-xs outline-none"
                  />
                </div>
              ))}

              <div className="pt-2">
                <span className="text-slate-300 font-bold block mb-1.5">الخيارات الأربعة (حدد الإجابة الصحيحة):</span>
                <div className="space-y-1.5">
                  {whoAmIOptions.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="whoAmICorrect"
                        checked={whoAmICorrectIdx === idx}
                        onChange={() => setWhoAmICorrectIdx(idx)}
                        className="w-4 h-4 accent-amber-500 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) => {
                          const next = [...whoAmIOptions];
                          next[idx] = e.target.value;
                          setWhoAmIOptions(next);
                        }}
                        className="flex-1 bg-slate-900 p-1.5 rounded-lg border border-slate-700 text-white text-xs outline-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STRATEGY SPECIFIC: WORD SCRAMBLE */}
          {game.strategyType === 'word_scramble' && (
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">الكلمة السرية المراد تركيبها:</label>
                <input
                  type="text"
                  value={targetWord}
                  onChange={(e) => setTargetWord(e.target.value)}
                  className="w-full bg-slate-900 p-2 rounded-lg border border-slate-700 text-white text-xs outline-none"
                  placeholder="مثال: معلوماتية..."
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">تلميح المساعدة:</label>
                <input
                  type="text"
                  value={scrambleHint}
                  onChange={(e) => setScrambleHint(e.target.value)}
                  className="w-full bg-slate-900 p-2 rounded-lg border border-slate-700 text-white text-xs outline-none"
                  placeholder="تلميح..."
                />
              </div>
            </div>
          )}

          {/* STRATEGY SPECIFIC: SPEED SORT */}
          {game.strategyType === 'speed_sort' && (
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">عنوان الصندوق 1:</label>
                  <input
                    type="text"
                    value={cat1Title}
                    onChange={(e) => setCat1Title(e.target.value)}
                    className="w-full bg-slate-900 p-2 rounded-lg border border-slate-700 text-white text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-[11px] mb-1">عنوان الصندوق 2:</label>
                  <input
                    type="text"
                    value={cat2Title}
                    onChange={(e) => setCat2Title(e.target.value)}
                    className="w-full bg-slate-900 p-2 rounded-lg border border-slate-700 text-white text-xs"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-1">
                <span className="text-slate-300 font-bold block">العناصر والتعيين للصندوق:</span>
                {sortItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={item.text}
                      onChange={(e) => {
                        const next = [...sortItems];
                        next[idx].text = e.target.value;
                        setSortItems(next);
                      }}
                      className="flex-1 bg-slate-900 p-1.5 rounded-lg border border-slate-700 text-white text-xs"
                    />
                    <select
                      value={item.targetCategoryId}
                      onChange={(e) => {
                        const next = [...sortItems];
                        next[idx].targetCategoryId = e.target.value;
                        setSortItems(next);
                      }}
                      className="bg-slate-900 text-amber-300 p-1.5 rounded-lg border border-slate-700 text-xs"
                    >
                      <option value={game.speedSortData?.categories[0].id || 'cat1'}>
                        {cat1Title || 'الصندوق 1'}
                      </option>
                      <option value={game.speedSortData?.categories[1].id || 'cat2'}>
                        {cat2Title || 'الصندوق 2'}
                      </option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STRATEGY SPECIFIC: LIGHTNING */}
          {game.strategyType === 'lightning_quiz' && (
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">العبارة الموقوتة:</label>
                <textarea
                  value={lightningStatement}
                  onChange={(e) => setLightningStatement(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-900 p-2 rounded-lg border border-slate-700 text-white text-xs outline-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-slate-400 font-bold">صحة العبارة:</span>
                <button
                  type="button"
                  onClick={() => setLightningIsTrue(true)}
                  className={`px-4 py-1.5 rounded-lg font-bold ${
                    lightningIsTrue ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  ✓ حقيقة (صحيحة)
                </button>
                <button
                  type="button"
                  onClick={() => setLightningIsTrue(false)}
                  className={`px-4 py-1.5 rounded-lg font-bold ${
                    !lightningIsTrue ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  ✕ خرافة (خاطئة)
                </button>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">التعليل بعد الإجابة:</label>
                <input
                  type="text"
                  value={lightningExplanation}
                  onChange={(e) => setLightningExplanation(e.target.value)}
                  className="w-full bg-slate-900 p-2 rounded-lg border border-slate-700 text-white text-xs outline-none"
                />
              </div>
            </div>
          )}

          {/* STRATEGY SPECIFIC: THINK PAIR SHARE */}
          {game.strategyType === 'think_pair_share' && (
            <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
              <div>
                <label className="block text-slate-300 font-bold mb-1">السؤال أو المعضلة الانطلاقية:</label>
                <input
                  type="text"
                  value={tpsQuestion}
                  onChange={(e) => setTpsQuestion(e.target.value)}
                  className="w-full bg-slate-900 p-2 rounded-lg border border-slate-700 text-white text-xs outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">الخلاصة البيداغوجية المتفق عليها:</label>
                <textarea
                  value={tpsIdealAnswer}
                  onChange={(e) => setTpsIdealAnswer(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-900 p-2 rounded-lg border border-slate-700 text-white text-xs outline-none"
                />
              </div>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950 p-3.5 border-t border-slate-800 flex items-center justify-between gap-2">
          <button
            onClick={() => {
              soundEffects.playClick();
              onReset();
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 text-xs font-bold transition-all border border-slate-700 hover:border-rose-500/40 cursor-pointer"
            title="استعادة اللعبة الأصلية"
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
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer"
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
