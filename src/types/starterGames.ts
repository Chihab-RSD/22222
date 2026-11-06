export type ActiveLearningStrategyType = 
  | 'who_am_i'             // استراتيجية مَن أكون؟ (حزورة المفهوم)
  | 'think_pair_share'     // استراتيجية فكر - زاوج - شارك
  | 'speed_sort'           // استراتيجية التصنيف السريع / الصندوقين
  | 'memory_match'         // استراتيجية بطاقات الذاكرة والمطابقة
  | 'word_scramble'        // استراتيجية فك شفرة الكلمة الضائعة
  | 'lightning_quiz'       // استراتيجية سباق الثواني (حقيقة أم خرافة)
  | 'spot_the_glitch'      // استراتيجية المحقق الرقمي (اكتشف الخطأ الشائع)
  | 'challenge_ladder'     // استراتيجية سلم التحدي المعرفي
  | 'concept_roulette'     // استراتيجية عجلة الحظ والتحدي السريع
  | 'smart_word_bank';     // استراتيجية صندوق الكلمات الذكية

export interface WhoAmIClue {
  clueNumber: number;
  text: string;
}

export interface MemoryCard {
  id: string;
  pairId: string;
  label: string;
  iconType?: string;
}

export interface SortCategory {
  id: string;
  title: string;
  color: string;
}

export interface SortItem {
  id: string;
  text: string;
  targetCategoryId: string;
}

export interface ThinkPairStage {
  step: 'think' | 'pair' | 'share';
  title: string;
  prompt: string;
  timerSeconds?: number;
  guidance: string;
}

export interface StarterGame {
  id: string;
  lessonId: string;
  number: number; // 1 to 10
  title: string;
  strategyType: ActiveLearningStrategyType;
  strategyTitle: string; // e.g. "استراتيجية فكر - زاوج - شارك"
  hookScenario: string; // الوضعية الانطلاقية المحفزة للنشاط
  learningGoal: string; // الهدف البيداغوجي للتهيئة واسترجاع المكتسبات

  // Specific game data depending on strategyType
  whoAmIData?: {
    clues: string[];
    options: string[];
    correctIndex: number;
    explanation: string;
  };

  speedSortData?: {
    instructions: string;
    categories: [SortCategory, SortCategory];
    items: SortItem[];
    explanation: string;
  };

  memoryMatchData?: {
    pairs: { id: string; term: string; definition: string }[];
  };

  wordScrambleData?: {
    scrambledLetters: string[];
    correctWord: string;
    hint: string;
    explanation: string;
  };

  lightningData?: {
    statement: string;
    isTrue: boolean;
    explanation: string;
    timerSeconds?: number;
  };

  spotGlitchData?: {
    scenarioDescription: string;
    options: { id: string; text: string; isGlitch: boolean; fixExplanation: string }[];
  };

  thinkPairData?: {
    question: string;
    stages: ThinkPairStage[];
    idealAnswer: string;
    classroomTip: string;
  };

  challengeLadderData?: {
    steps: {
      stepLevel: 1 | 2 | 3;
      question: string;
      options: string[];
      correctAnswer: number;
      feedback: string;
    }[];
  };

  smartWordBankData?: {
    sentenceWithBlanks: string; // e.g. "يعتبر [BLANK1] الوحدة المركزية، بينما [BLANK2] جهاز إدخال."
    wordBank: string[];
    correctAssignments: Record<string, string>; // BLANK1 -> 'المعالج', etc.
    explanation: string;
  };
}
