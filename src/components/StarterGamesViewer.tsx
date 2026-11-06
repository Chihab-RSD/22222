import React, { useState, useEffect } from 'react';
import { StarterGame } from '../types/starterGames';
import { Lesson } from '../types';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  Trophy, 
  RotateCcw, 
  CheckCircle2, 
  HelpCircle, 
  Clock, 
  Users, 
  Zap, 
  Eye, 
  Layers, 
  Search, 
  Lightbulb, 
  Check, 
  AlertCircle,
  Volume2,
  Gamepad2,
  Share2,
  Edit3
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../utils/audio';
import { resolveStarterGame, saveCustomStarterGame, resetCustomStarterGame, isGameCustomized } from '../utils/customContentManager';
import { StarterGameEditorModal } from './StarterGameEditorModal';

interface StarterGamesViewerProps {
  lesson: Lesson;
  games: StarterGame[];
  initialGameIndex?: number;
  completedGames: Record<string, boolean>;
  onCompleteGame: (gameId: string) => void;
  onClose: () => void;
  onOpenLessonActivities?: () => void;
}

export const StarterGamesViewer: React.FC<StarterGamesViewerProps> = ({
  lesson,
  games,
  initialGameIndex = 0,
  completedGames,
  onCompleteGame,
  onClose,
  onOpenLessonActivities
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(initialGameIndex);
  const [activeGame, setActiveGame] = useState<StarterGame>(() => resolveStarterGame(games[initialGameIndex] || games[0]));
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const currentGame = activeGame;

  useEffect(() => {
    if (games[currentIndex]) {
      setActiveGame(resolveStarterGame(games[currentIndex]));
    }
  }, [currentIndex, games]);

  const handleSaveEditedGame = (updated: StarterGame) => {
    saveCustomStarterGame(updated);
    setActiveGame(updated);
    setIsEditorOpen(false);
  };

  const handleResetGame = (gameId: string) => {
    resetCustomStarterGame(gameId);
    if (games[currentIndex]) {
      setActiveGame(games[currentIndex]);
    }
    setIsEditorOpen(false);
  };

  // Game specific state
  const [revealedClues, setRevealedClues] = useState<number>(1);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);

  // Word Scramble state
  const [scrambleBuiltWord, setScrambleBuiltWord] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<{ id: string; char: string }[]>([]);

  // Speed Sort state
  const [sortedItems, setSortedItems] = useState<Record<string, string>>({}); // itemId -> categoryId
  const [activeSortItemIndex, setActiveSortItemIndex] = useState<number>(0);

  // Lightning Quiz state
  const [lightningTimer, setLightningTimer] = useState<number>(15);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  // Think-Pair-Share state
  const [tpsStage, setTpsStage] = useState<'think' | 'pair' | 'share'>('think');

  // Memory Match state
  const [memoryCards, setMemoryCards] = useState<{ id: string; text: string; matchId: string; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [flippedCardIds, setFlippedCardIds] = useState<string[]>([]);

  // Challenge Ladder state
  const [ladderCurrentStep, setLadderCurrentStep] = useState<number>(0);
  const [ladderSelectedOption, setLadderSelectedOption] = useState<number | null>(null);

  // Word Bank state
  const [selectedBlank, setSelectedBlank] = useState<string | null>('BLANK1');
  const [bankAssignments, setBankAssignments] = useState<Record<string, string>>({});

  // Reset/Init game state when switching game
  useEffect(() => {
    setRevealedClues(1);
    setSelectedOption(null);
    setIsAnswered(!!completedGames[currentGame?.id]);
    setIsCorrect(!!completedGames[currentGame?.id]);

    // Word Scramble init
    if (currentGame?.wordScrambleData) {
      setScrambleBuiltWord([]);
      const letters = currentGame.wordScrambleData.scrambledLetters.map((char, idx) => ({
        id: `${char}-${idx}-${Date.now()}`,
        char
      }));
      setAvailableLetters(letters);
    }

    // Speed Sort init
    if (currentGame?.speedSortData) {
      setSortedItems({});
      setActiveSortItemIndex(0);
    }

    // Lightning timer init
    if (currentGame?.lightningData) {
      setLightningTimer(currentGame.lightningData.timerSeconds || 15);
      setIsTimerRunning(!completedGames[currentGame.id]);
    }

    // Think-Pair-Share init
    setTpsStage('think');

    // Memory Match init
    if (currentGame?.memoryMatchData) {
      const cards: { id: string; text: string; matchId: string; isFlipped: boolean; isMatched: boolean }[] = [];
      currentGame.memoryMatchData.pairs.forEach((p, idx) => {
        cards.push({ id: `c-term-${idx}`, text: p.term, matchId: p.id, isFlipped: false, isMatched: false });
        cards.push({ id: `c-def-${idx}`, text: p.definition, matchId: p.id, isFlipped: false, isMatched: false });
      });
      // Shuffle cards
      setMemoryCards(cards.sort(() => Math.random() - 0.5));
      setFlippedCardIds([]);
    }

    // Ladder init
    setLadderCurrentStep(0);
    setLadderSelectedOption(null);

    // Word bank init
    setSelectedBlank('BLANK1');
    setBankAssignments({});
  }, [currentIndex, currentGame, completedGames]);

  // Lightning countdown timer effect
  useEffect(() => {
    if (currentGame?.strategyType !== 'lightning_quiz' || !isTimerRunning || isAnswered) return;

    if (lightningTimer <= 0) {
      setIsTimerRunning(false);
      setIsAnswered(true);
      setIsCorrect(false);
      soundEffects.playIncorrect();
      return;
    }

    const timer = setInterval(() => {
      setLightningTimer(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [lightningTimer, isTimerRunning, currentGame, isAnswered]);

  if (!currentGame) return null;

  // Complete game handler
  const handleSuccess = () => {
    soundEffects.playCorrect();
    setIsAnswered(true);
    setIsCorrect(true);
    onCompleteGame(currentGame.id);

    // Check if all 10 are completed
    const completedCountAfter = Object.keys(completedGames).length + (completedGames[currentGame.id] ? 0 : 1);
    if (completedCountAfter >= games.length) {
      soundEffects.playVictory();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Who Am I handler
  const handleWhoAmIAnswer = (idx: number) => {
    if (isAnswered) return;
    soundEffects.playClick();
    setSelectedOption(idx);
    const correct = idx === currentGame.whoAmIData?.correctIndex;
    if (correct) {
      handleSuccess();
    } else {
      soundEffects.playIncorrect();
      setIsAnswered(true);
      setIsCorrect(false);
    }
  };

  // Word Scramble handler
  const handleSelectLetter = (letterItem: { id: string; char: string }) => {
    soundEffects.playClick();
    setAvailableLetters(prev => prev.filter(l => l.id !== letterItem.id));
    const newWord = [...scrambleBuiltWord, letterItem.char];
    setScrambleBuiltWord(newWord);

    // Check if matches target word
    const target = currentGame.wordScrambleData?.correctWord.replace(/\s+/g, '');
    const current = newWord.join('').replace(/\s+/g, '');
    if (current === target) {
      handleSuccess();
    }
  };

  const handleBackspaceScramble = () => {
    soundEffects.playClick();
    if (scrambleBuiltWord.length === 0) return;
    const lastChar = scrambleBuiltWord[scrambleBuiltWord.length - 1];
    setScrambleBuiltWord(prev => prev.slice(0, prev.length - 1));
    setAvailableLetters(prev => [...prev, { id: `${lastChar}-${Date.now()}`, char: lastChar }]);
  };

  // Speed Sort handler
  const handleSortItemToCategory = (catId: string) => {
    if (!currentGame.speedSortData) return;
    soundEffects.playClick();
    const items = currentGame.speedSortData.items;
    const currentItem = items[activeSortItemIndex];
    if (!currentItem) return;

    const updated = { ...sortedItems, [currentItem.id]: catId };
    setSortedItems(updated);

    if (activeSortItemIndex + 1 < items.length) {
      setActiveSortItemIndex(activeSortItemIndex + 1);
    } else {
      // Finished all items, evaluate
      const allCorrect = items.every(item => updated[item.id] === item.targetCategoryId);
      if (allCorrect) {
        handleSuccess();
      } else {
        soundEffects.playIncorrect();
        setIsAnswered(true);
        setIsCorrect(false);
      }
    }
  };

  // Lightning Quiz Answer
  const handleLightningAnswer = (userTrue: boolean) => {
    if (isAnswered) return;
    soundEffects.playClick();
    setIsTimerRunning(false);
    const correct = userTrue === currentGame.lightningData?.isTrue;
    if (correct) {
      handleSuccess();
    } else {
      soundEffects.playIncorrect();
      setIsAnswered(true);
      setIsCorrect(false);
    }
  };

  // Memory card click
  const handleCardClick = (cardId: string) => {
    if (isAnswered) return;
    if (flippedCardIds.length >= 2) return;
    const card = memoryCards.find(c => c.id === cardId);
    if (!card || card.isFlipped || card.isMatched) return;

    soundEffects.playClick();
    const newFlipped = [...flippedCardIds, cardId];
    setFlippedCardIds(newFlipped);

    // Update flip state
    setMemoryCards(prev => prev.map(c => c.id === cardId ? { ...c, isFlipped: true } : c));

    if (newFlipped.length === 2) {
      const card1 = memoryCards.find(c => c.id === newFlipped[0]);
      const card2 = card;
      if (card1 && card2 && card1.matchId === card2.matchId) {
        // Matched!
        setTimeout(() => {
          soundEffects.playCorrect();
          setMemoryCards(prev => prev.map(c => (c.id === card1.id || c.id === card2.id) ? { ...c, isMatched: true } : c));
          setFlippedCardIds([]);

          // Check if all pairs matched
          setTimeout(() => {
            setMemoryCards(current => {
              const allDone = current.every(c => c.isMatched || c.id === card1.id || c.id === card2.id);
              if (allDone) {
                handleSuccess();
              }
              return current;
            });
          }, 300);
        }, 500);
      } else {
        // Not matched
        setTimeout(() => {
          soundEffects.playIncorrect();
          setMemoryCards(prev => prev.map(c => (c.id === newFlipped[0] || c.id === newFlipped[1]) ? { ...c, isFlipped: false } : c));
          setFlippedCardIds([]);
        }, 900);
      }
    }
  };

  // Spot the glitch click
  const handleSpotGlitchClick = (isGlitch: boolean) => {
    if (isAnswered) return;
    soundEffects.playClick();
    if (isGlitch) {
      handleSuccess();
    } else {
      soundEffects.playIncorrect();
      setIsAnswered(true);
      setIsCorrect(false);
    }
  };

  // Challenge ladder answer click
  const handleLadderAnswer = (optIndex: number) => {
    if (!currentGame.challengeLadderData) return;
    soundEffects.playClick();
    setLadderSelectedOption(optIndex);
    const step = currentGame.challengeLadderData.steps[ladderCurrentStep];
    const correct = optIndex === step.correctAnswer;

    if (correct) {
      soundEffects.playCorrect();
      if (ladderCurrentStep + 1 < currentGame.challengeLadderData.steps.length) {
        setTimeout(() => {
          setLadderCurrentStep(prev => prev + 1);
          setLadderSelectedOption(null);
        }, 800);
      } else {
        handleSuccess();
      }
    } else {
      soundEffects.playIncorrect();
    }
  };

  // Word bank slot click & assign
  const handleAssignWord = (word: string) => {
    if (!selectedBlank || !currentGame.smartWordBankData) return;
    soundEffects.playClick();
    const nextAssignments = { ...bankAssignments, [selectedBlank]: word };
    setBankAssignments(nextAssignments);

    // Check if all blanks filled
    const requiredKeys = Object.keys(currentGame.smartWordBankData.correctAssignments);
    const allFilled = requiredKeys.every(k => nextAssignments[k]);
    if (allFilled) {
      const allCorrect = requiredKeys.every(k => nextAssignments[k] === currentGame.smartWordBankData?.correctAssignments[k]);
      if (allCorrect) {
        handleSuccess();
      } else {
        soundEffects.playIncorrect();
        setIsAnswered(true);
        setIsCorrect(false);
      }
    } else {
      // Auto advance to next empty blank
      const nextEmpty = requiredKeys.find(k => !nextAssignments[k]);
      if (nextEmpty) setSelectedBlank(nextEmpty);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 select-none animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]">
        
        {/* Top Header */}
        <div className="bg-slate-950 px-4 sm:px-6 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono">
                  النشاط الانطلاقي {currentGame.number} / 10
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  {lesson.title}
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white mt-0.5">
                {currentGame.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isGameCustomized(currentGame.id) && (
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2 py-0.5 rounded-full font-bold hidden sm:inline-block">
                ✏️ معدل
              </span>
            )}

            <button
              onClick={() => {
                soundEffects.playClick();
                setIsEditorOpen(true);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold border border-amber-500/30 transition-colors cursor-pointer"
              title="تعديل هذه اللعبة التفاعلية"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">تعديل اللعبة</span>
            </button>

            {onOpenLessonActivities && (
              <button
                onClick={onOpenLessonActivities}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-bold border border-indigo-500/30 transition-colors cursor-pointer"
                title="الانتقال إلى الأنشطة التطبيقية للدرس"
              >
                <span>الأنشطة التطبيقية (10)</span>
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
            )}

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
        </div>

        {/* 10 Starter Games Matrix Carousel */}
        <div className="bg-slate-950/70 p-2.5 border-b border-slate-800/80 flex items-center justify-between gap-1 overflow-x-auto">
          <div className="flex items-center gap-1.5 w-full">
            {games.map((g, idx) => {
              const isDone = !!completedGames[g.id];
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={g.id}
                  onClick={() => {
                    soundEffects.playClick();
                    setCurrentIndex(idx);
                  }}
                  className={`flex-1 min-w-[32px] h-9 rounded-xl text-xs font-bold font-mono transition-all duration-200 flex flex-col items-center justify-center relative cursor-pointer ${
                    isCurrent
                      ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-400 shadow-md scale-105'
                      : isDone
                      ? 'bg-emerald-600/80 text-white hover:bg-emerald-500'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60'
                  }`}
                  title={`${g.number}. ${g.title} (${g.strategyTitle})`}
                >
                  <span>{g.number}</span>
                  {isDone && (
                    <span className="w-1.5 h-1.5 rounded-full bg-white mt-0.5"></span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Strategy Hero Banner */}
        <div className="px-4 py-2.5 bg-gradient-to-r from-amber-500/10 via-slate-900 to-indigo-500/10 border-b border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-lg bg-amber-500/20 text-amber-300">
              <Lightbulb className="w-3.5 h-3.5" />
            </span>
            <span className="font-bold text-amber-300">
              {currentGame.strategyTitle}
            </span>
          </div>

          <div className="text-slate-400 text-[11px] flex items-center gap-2">
            <span className="text-emerald-400">الهدف:</span>
            <span>{currentGame.learningGoal}</span>
          </div>
        </div>

        {/* Main Game Arena */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto flex flex-col justify-between">
          
          <div className="space-y-4">
            
            {/* Contextual Hook Scenario */}
            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/70 text-xs text-slate-300 flex items-start gap-2.5">
              <span className="text-amber-400 text-base shrink-0">🎯</span>
              <div className="leading-relaxed">
                <strong className="text-white block mb-0.5">الوضعية الانطلاقية:</strong>
                {currentGame.hookScenario}
              </div>
            </div>

            {/* ========================================================================= */}
            {/* 1. WHO AM I? (مَن أكون؟)                                                 */}
            {/* ========================================================================= */}
            {currentGame.strategyType === 'who_am_i' && currentGame.whoAmIData && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-amber-400 block">الإشارات والمؤشرات المتدرجة:</span>
                  <div className="space-y-2">
                    {currentGame.whoAmIData.clues.map((clue, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-xs leading-relaxed transition-all duration-300 flex items-center justify-between gap-2 ${
                          idx < revealedClues
                            ? 'bg-slate-950/80 border-slate-700 text-slate-200'
                            : 'bg-slate-950/30 border-slate-800/60 text-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-[11px] font-mono flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span>{idx < revealedClues ? clue : '🔒 إشارة مخفية...'}</span>
                        </div>

                        {idx >= revealedClues && (
                          <button
                            onClick={() => {
                              soundEffects.playClick();
                              setRevealedClues(idx + 1);
                            }}
                            className="px-2 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[10px] font-bold cursor-pointer"
                          >
                            كشف الإشارة
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Options Grid */}
                <div className="space-y-2 pt-2">
                  <span className="text-xs font-bold text-slate-300 block">خمّن المفهوم السري:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentGame.whoAmIData.options.map((opt, idx) => {
                      const isChosen = selectedOption === idx;
                      const isTargetCorrect = idx === currentGame.whoAmIData?.correctIndex;
                      return (
                        <button
                          key={idx}
                          disabled={isAnswered}
                          onClick={() => handleWhoAmIAnswer(idx)}
                          className={`p-3 rounded-xl text-xs font-bold text-right transition-all cursor-pointer border ${
                            isAnswered && isTargetCorrect
                              ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/60 ring-1 ring-emerald-400'
                              : isAnswered && isChosen && !isTargetCorrect
                              ? 'bg-rose-600/30 text-rose-300 border-rose-500/60'
                              : 'bg-slate-800/80 hover:bg-slate-700/80 text-white border-slate-700'
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 2. WORD SCRAMBLE (فك شفرة الكلمة)                                        */}
            {/* ========================================================================= */}
            {currentGame.strategyType === 'word_scramble' && currentGame.wordScrambleData && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center space-y-3">
                  <span className="text-xs text-slate-400 block">
                    انقر الحروف بالترتيب الصحيح لتكوين الكلمة السرية:
                  </span>

                  {/* Built Word Box */}
                  <div className="min-h-[50px] bg-slate-900 border border-slate-700 rounded-xl p-2 flex items-center justify-center gap-1.5 flex-wrap">
                    {scrambleBuiltWord.length === 0 ? (
                      <span className="text-slate-600 text-xs">... تظهر الحروف هنا ...</span>
                    ) : (
                      scrambleBuiltWord.map((ch, idx) => (
                        <span key={idx} className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 font-bold text-lg flex items-center justify-center shadow-md animate-scale-in">
                          {ch}
                        </span>
                      ))
                    )}
                  </div>

                  {/* Scramble Actions */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] text-amber-400/90 font-medium">
                      تلميح: {currentGame.wordScrambleData.hint}
                    </span>

                    <button
                      onClick={handleBackspaceScramble}
                      disabled={scrambleBuiltWord.length === 0 || isAnswered}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs disabled:opacity-40 cursor-pointer"
                    >
                      ← تراجع عن حرف
                    </button>
                  </div>
                </div>

                {/* Available Letter Tiles */}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {availableLetters.map((item) => (
                    <button
                      key={item.id}
                      disabled={isAnswered}
                      onClick={() => handleSelectLetter(item)}
                      className="w-11 h-11 rounded-xl bg-slate-800 hover:bg-indigo-600 text-white font-bold text-lg border border-slate-700 hover:border-indigo-500 transition-all shadow-md active:scale-95 cursor-pointer"
                    >
                      {item.char}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 3. SPEED SORT (التصنيف والفرز السريع)                                     */}
            {/* ========================================================================= */}
            {currentGame.strategyType === 'speed_sort' && currentGame.speedSortData && (
              <div className="space-y-4">
                <span className="text-xs text-slate-400 block">
                  {currentGame.speedSortData.instructions}
                </span>

                {/* Active Item to Sort Card */}
                {activeSortItemIndex < currentGame.speedSortData.items.length ? (
                  <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/40 text-center animate-scale-in">
                    <span className="text-[11px] text-indigo-300 block mb-1">
                      عنصر للفرز ({activeSortItemIndex + 1} من {currentGame.speedSortData.items.length}):
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white">
                      "{currentGame.speedSortData.items[activeSortItemIndex].text}"
                    </h4>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-950 text-center text-xs text-emerald-400">
                    تم فرز كافة العناصر! تحقق من النتيجة أدناه.
                  </div>
                )}

                {/* 2 Target Bins */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentGame.speedSortData.categories.map((cat) => (
                    <button
                      key={cat.id}
                      disabled={activeSortItemIndex >= (currentGame.speedSortData?.items.length || 0)}
                      onClick={() => handleSortItemToCategory(cat.id)}
                      className={`p-4 rounded-2xl border text-center transition-all cursor-pointer shadow-md bg-gradient-to-br ${cat.color} hover:brightness-110 active:scale-98`}
                    >
                      <h5 className="text-sm font-bold text-white mb-1">{cat.title}</h5>
                      <span className="text-[11px] text-white/80 block">
                        انقر لوضع العنصر هنا
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 4. LIGHTNING QUIZ (سباق الثواني الموقوت)                                  */}
            {/* ========================================================================= */}
            {currentGame.strategyType === 'lightning_quiz' && currentGame.lightningData && (
              <div className="space-y-4">
                {/* Timer Bar */}
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>مؤقت التحدي السريع:</span>
                  </div>
                  <span className="font-mono font-bold text-amber-400 text-sm">
                    {lightningTimer} ثانية
                  </span>
                </div>

                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-amber-400 h-full transition-all duration-1000"
                    style={{ width: `${(lightningTimer / (currentGame.lightningData.timerSeconds || 15)) * 100}%` }}
                  />
                </div>

                {/* Statement Card */}
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-xs text-slate-500 block mb-2 font-mono">حقيقة أم خرافة؟</span>
                  <p className="text-sm sm:text-base font-bold text-white leading-relaxed">
                    "{currentGame.lightningData.statement}"
                  </p>
                </div>

                {/* True / False Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    disabled={isAnswered}
                    onClick={() => handleLightningAnswer(true)}
                    className="p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md cursor-pointer transition-all active:scale-98"
                  >
                    ✓ حقيقة (صحيح)
                  </button>

                  <button
                    disabled={isAnswered}
                    onClick={() => handleLightningAnswer(false)}
                    className="p-3.5 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-md cursor-pointer transition-all active:scale-98"
                  >
                    ✕ خرافة (خطأ)
                  </button>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 5. THINK - PAIR - SHARE (فكر - زاوج - شارك)                              */}
            {/* ========================================================================= */}
            {currentGame.strategyType === 'think_pair_share' && currentGame.thinkPairData && (
              <div className="space-y-4">
                {/* 3 Steps Stepper */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <button
                    onClick={() => setTpsStage('think')}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      tpsStage === 'think'
                        ? 'bg-blue-600 text-white border-blue-500 font-bold shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    1. فكر بمفردك 🧠
                  </button>

                  <button
                    onClick={() => setTpsStage('pair')}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      tpsStage === 'pair'
                        ? 'bg-amber-600 text-white border-amber-500 font-bold shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    2. زاوج مع زميلك 🤝
                  </button>

                  <button
                    onClick={() => {
                      setTpsStage('share');
                      handleSuccess();
                    }}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      tpsStage === 'share'
                        ? 'bg-emerald-600 text-white border-emerald-500 font-bold shadow-md'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    3. شارك الحل 📢
                  </button>
                </div>

                {/* Stage Content */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <h4 className="text-sm font-bold text-white">
                    {currentGame.thinkPairData.question}
                  </h4>

                  {tpsStage === 'think' && (
                    <div className="space-y-2 text-xs text-slate-300">
                      <p className="bg-slate-900 p-3 rounded-xl border border-slate-700">
                        {currentGame.thinkPairData.stages[0].prompt}
                      </p>
                      <button
                        onClick={() => setTpsStage('pair')}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold cursor-pointer transition-colors"
                      >
                        انتقل للمرحلة 2: ناقش مع زميل المقعد ←
                      </button>
                    </div>
                  )}

                  {tpsStage === 'pair' && (
                    <div className="space-y-2 text-xs text-slate-300">
                      <p className="bg-slate-900 p-3 rounded-xl border border-slate-700">
                        {currentGame.thinkPairData.stages[1].prompt}
                      </p>
                      <button
                        onClick={() => {
                          setTpsStage('share');
                          handleSuccess();
                        }}
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold cursor-pointer transition-colors"
                      >
                        انتقل للمرحلة 3: عرض الحل أمام القسم ←
                      </button>
                    </div>
                  )}

                  {tpsStage === 'share' && (
                    <div className="space-y-2 text-xs text-emerald-300">
                      <div className="bg-emerald-950/40 p-3.5 rounded-xl border border-emerald-500/40 leading-relaxed">
                        <strong className="text-emerald-200 block mb-1">الخلاصة البيداغوجية المتفق عليها:</strong>
                        {currentGame.thinkPairData.idealAnswer}
                      </div>
                      <p className="text-[11px] text-slate-400 italic">
                        نصيحة صفية: {currentGame.thinkPairData.classroomTip}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 6. MEMORY MATCH (بطاقات الذاكرة)                                          */}
            {/* ========================================================================= */}
            {currentGame.strategyType === 'memory_match' && (
              <div className="space-y-3">
                <span className="text-xs text-slate-400 block">
                  اقلب البطاقات واعثر على الأزواج المتطابقة (المصطلح وشرحه):
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {memoryCards.map((card) => (
                    <button
                      key={card.id}
                      onClick={() => handleCardClick(card.id)}
                      className={`h-24 p-2 rounded-2xl border text-xs font-bold transition-all duration-300 flex items-center justify-center text-center cursor-pointer ${
                        card.isMatched
                          ? 'bg-emerald-600/30 border-emerald-500/60 text-emerald-300 opacity-60'
                          : card.isFlipped
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-md scale-102'
                          : 'bg-slate-800 hover:bg-slate-700 text-slate-400 border-slate-700'
                      }`}
                    >
                      {card.isFlipped || card.isMatched ? (
                        <span>{card.text}</span>
                      ) : (
                        <span className="text-xl">🎴</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 7. SPOT THE GLITCH (المحقق الرقمي)                                        */}
            {/* ========================================================================= */}
            {currentGame.strategyType === 'spot_the_glitch' && currentGame.spotGlitchData && (
              <div className="space-y-4">
                <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="text-amber-400 font-bold block mb-1">سيناريو المحقق:</span>
                  {currentGame.spotGlitchData.scenarioDescription}
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-400 block">انقر فوق سبب الخطأ الحقيقي:</span>
                  {currentGame.spotGlitchData.options.map((opt) => (
                    <button
                      key={opt.id}
                      disabled={isAnswered}
                      onClick={() => handleSpotGlitchClick(opt.isGlitch)}
                      className="w-full p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-right text-slate-200 border border-slate-700 hover:border-amber-500 transition-all cursor-pointer"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 8. CHALLENGE LADDER (سلم التحدي المعرفي)                                  */}
            {/* ========================================================================= */}
            {currentGame.strategyType === 'challenge_ladder' && currentGame.challengeLadderData && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>درجة السلم الحالية:</span>
                  <span className="text-amber-400 font-bold">
                    الدرجة {ladderCurrentStep + 1} من {currentGame.challengeLadderData.steps.length}
                  </span>
                </div>

                {/* Current step question */}
                {currentGame.challengeLadderData.steps[ladderCurrentStep] && (
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                    <h5 className="text-xs sm:text-sm font-bold text-white">
                      {currentGame.challengeLadderData.steps[ladderCurrentStep].question}
                    </h5>

                    <div className="space-y-2">
                      {currentGame.challengeLadderData.steps[ladderCurrentStep].options.map((opt, idx) => (
                        <button
                          key={idx}
                          disabled={isAnswered}
                          onClick={() => handleLadderAnswer(idx)}
                          className="w-full p-2.5 rounded-xl bg-slate-900 hover:bg-indigo-600/30 text-xs text-right text-slate-200 border border-slate-700 transition-all cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* 9. SMART WORD BANK (صندوق الكلمات الذكية)                                  */}
            {/* ========================================================================= */}
            {currentGame.strategyType === 'smart_word_bank' && currentGame.smartWordBankData && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center leading-loose text-sm text-slate-200">
                  {currentGame.smartWordBankData.sentenceWithBlanks.split(/(\[BLANK\d\])/).map((part, idx) => {
                    const match = part.match(/\[(BLANK\d)\]/);
                    if (match) {
                      const blankKey = match[1];
                      const assignedWord = bankAssignments[blankKey];
                      const isSelected = selectedBlank === blankKey;
                      return (
                        <button
                          key={idx}
                          onClick={() => setSelectedBlank(blankKey)}
                          className={`inline-block mx-1.5 px-3 py-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                            assignedWord
                              ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm'
                              : isSelected
                              ? 'bg-amber-500/20 text-amber-300 border-amber-400 ring-2 ring-amber-400/40 animate-pulse'
                              : 'bg-slate-900 text-slate-500 border-dashed border-slate-600'
                          }`}
                        >
                          {assignedWord || '_____ ؟ _____'}
                        </button>
                      );
                    }
                    return <span key={idx}>{part}</span>;
                  })}
                </div>

                {/* Word bank pills */}
                <div className="space-y-2">
                  <span className="text-xs text-slate-400 block">اختر الكلمة المناسبة للفراغ المحدد:</span>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {currentGame.smartWordBankData.wordBank.map((word, idx) => (
                      <button
                        key={idx}
                        disabled={isAnswered}
                        onClick={() => handleAssignWord(word)}
                        className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-indigo-600 text-white text-xs font-bold border border-slate-700 transition-all cursor-pointer active:scale-95 shadow-md"
                      >
                        {word}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Feedback & Explanation Card */}
            {isAnswered && (
              <div className={`p-4 rounded-2xl border text-xs leading-relaxed animate-scale-in flex items-start gap-3 ${
                isCorrect
                  ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                  : 'bg-rose-950/50 border-rose-500/50 text-rose-200'
              }`}>
                {isCorrect ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
                <div>
                  <strong className="block mb-1 text-white font-bold">
                    {isCorrect ? 'أحسنت! إجابة ممتازة وموفقة 🎉' : 'تحتاج للمراجعة والمحاولة ثانية ⚠️'}
                  </strong>
                  <p>
                    {currentGame.whoAmIData?.explanation ||
                     currentGame.wordScrambleData?.explanation ||
                     currentGame.speedSortData?.explanation ||
                     currentGame.lightningData?.explanation ||
                     currentGame.thinkPairData?.idealAnswer ||
                     currentGame.smartWordBankData?.explanation ||
                     'إنجاز رائع يمهد لفهم موضوع الدرس.'}
                  </p>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Navigation Buttons */}
          <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              onClick={() => {
                soundEffects.playClick();
                if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
              }}
              disabled={currentIndex === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold disabled:opacity-40 cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
              <span>النشاط السابق</span>
            </button>

            <span className="text-xs text-slate-500 font-mono">
              {currentIndex + 1} / {games.length}
            </span>

            {currentIndex + 1 < games.length ? (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setCurrentIndex(currentIndex + 1);
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md cursor-pointer"
              >
                <span>النشاط التالي</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  if (onOpenLessonActivities) {
                    onOpenLessonActivities();
                  } else {
                    onClose();
                  }
                }}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                <span>بدء أنشطة الدرس التطبيقية</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>

      </div>

      {/* Starter Game Editor Modal */}
      {isEditorOpen && (
        <StarterGameEditorModal
          isOpen={isEditorOpen}
          game={currentGame}
          onClose={() => setIsEditorOpen(false)}
          onSave={handleSaveEditedGame}
          onReset={() => handleResetGame(currentGame.id)}
        />
      )}
    </div>
  );
};
