export type GradeLevelId = '1am' | '2am' | '3am' | '4am';

export type ActivityType = 
  | 'mcq'              // اختيار من متعدد
  | 'true_false'        // صح أو خطأ
  | 'match'             // مطابقة وتوصيل
  | 'order'             // ترتيب الخطوات
  | 'fill_blank'        // ملء الفراغات
  | 'code_challenge';   // تحدي تطبيقي / برمجي

export interface MatchPair {
  id: string;
  left: string;
  right: string;
}

export interface Activity {
  id: string;
  number: number; // 1 to 10
  title: string;
  type: ActivityType;
  prompt: string;
  options?: string[]; // for mcq
  correctAnswer?: string | number | boolean; // for mcq or true_false
  explanation: string;
  // Specific fields for different activity types
  pairs?: MatchPair[]; // for match
  itemsToOrder?: string[]; // for order
  correctOrder?: string[]; // for order
  blankTemplate?: string; // for fill_blank: e.g. "نستخدم الدالة [BLANK] لحساب المجموع"
  acceptedAnswers?: string[]; // for fill_blank
  codeSnippet?: string; // code or formula or scratch snippet
  hint?: string;
  practicalTask?: {
    initialValue?: string;
    targetValue?: string;
    instructions: string;
    testCases?: { input: string; output: string }[];
  };
}

export interface Lesson {
  id: string;
  gradeId: GradeLevelId;
  order: number;
  title: string;
  domain: string; // المجال المفاهيمي (مثل: عتاد الحاسوب، معالج النصوص، الخوارزميات)
  iconName: string;
  summary: string;
  keyConcepts: string[];
  activities: Activity[]; // Exactly 10 activities per lesson
}

export interface GradeLevel {
  id: GradeLevelId;
  title: string;
  subtitle: string;
  shortName: string;
  color: string;
  accentBg: string;
  badge: string;
  description: string;
  lessons: Lesson[];
}

export interface UserProgress {
  studentName: string;
  completedActivities: Record<string, boolean>; // activityId -> true
  activityScores: Record<string, number>;
  bookmarkedActivities: string[];
  soundEnabled: boolean;
  unlockedBadges: string[];
}
