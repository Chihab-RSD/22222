import React, { useState, useEffect } from 'react';
import { GradeLevelId, Lesson, Activity } from './types';
import { 
  allGrades, 
  getGradeById, 
  getTotalActivitiesCount, 
  getTotalLessonsCount 
} from './data/gradesData';
import { 
  getStarterGamesForLesson, 
  getTotalStarterGamesCount 
} from './data/starterGames';
import { DeviceFrame, DeviceMode } from './components/DeviceFrame';
import { GradeTabs } from './components/GradeTabs';
import { LessonCard } from './components/LessonCard';
import { ActivityViewer } from './components/ActivityViewer';
import { StarterGamesViewer } from './components/StarterGamesViewer';
import { InteractivePlayground } from './components/InteractivePlayground';
import { CertificateModal } from './components/CertificateModal';
import { SearchModal } from './components/SearchModal';
import { ContentManagementModal } from './components/ContentManagementModal';
import { resolveActivity } from './utils/customContentManager';
import { soundEffects } from './utils/audio';
import { 
  Sparkles, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Search, 
  GraduationCap,
  Layers,
  ChevronLeft,
  Monitor,
  Laptop,
  Keyboard,
  Gamepad2,
  Flame,
  Check
} from 'lucide-react';

const STORAGE_KEY_COMPLETED = 'infomoyenne_completed_v1';
const STORAGE_KEY_STARTER_GAMES = 'infomoyenne_starter_games_v1';
const STORAGE_KEY_NAME = 'infomoyenne_name_v1';
const STORAGE_KEY_SOUND = 'infomoyenne_sound_v1';
const STORAGE_KEY_DEVICE = 'infomoyenne_device_v1';

export default function App() {
  const [activeGradeId, setActiveGradeId] = useState<GradeLevelId>('1am');
  const [completedActivities, setCompletedActivities] = useState<Record<string, boolean>>({});
  const [completedStarterGames, setCompletedStarterGames] = useState<Record<string, boolean>>({});
  const [studentName, setStudentName] = useState<string>('تلميذ النجاح');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop'); // Default to Computer / Desktop version

  // Active Lesson Practice Activity Viewer state
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeActivityIndex, setActiveActivityIndex] = useState<number>(0);

  // Active Lesson Starter Games state
  const [activeStarterLesson, setActiveStarterLesson] = useState<Lesson | null>(null);
  const [activeStarterGameIndex, setActiveStarterGameIndex] = useState<number>(0);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState<boolean>(false);
  const [isStudioOpen, setIsStudioOpen] = useState<boolean>(false);
  const [contentVersion, setContentVersion] = useState<number>(0);

  // Domain Filter within current grade
  const [selectedDomain, setSelectedDomain] = useState<string>('all');

  // Load from local storage on mount
  useEffect(() => {
    try {
      const storedCompleted = localStorage.getItem(STORAGE_KEY_COMPLETED);
      if (storedCompleted) {
        setCompletedActivities(JSON.parse(storedCompleted));
      }
      const storedGames = localStorage.getItem(STORAGE_KEY_STARTER_GAMES);
      if (storedGames) {
        setCompletedStarterGames(JSON.parse(storedGames));
      }
      const storedName = localStorage.getItem(STORAGE_KEY_NAME);
      if (storedName) {
        setStudentName(storedName);
      }
      const storedSound = localStorage.getItem(STORAGE_KEY_SOUND);
      if (storedSound !== null) {
        const val = storedSound === 'true';
        setSoundEnabled(val);
        soundEffects.enabled = val;
      }
      const storedDevice = localStorage.getItem(STORAGE_KEY_DEVICE);
      if (storedDevice === 'phone' || storedDevice === 'desktop') {
        setDeviceMode(storedDevice);
      }
    } catch {
      // Storage might not be accessible
    }
  }, []);

  // Global desktop keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }

      if (e.key === 'Escape') {
        if (activeStarterLesson) {
          setActiveStarterLesson(null);
        } else if (activeLesson) {
          setActiveLesson(null);
        } else if (isStudioOpen) {
          setIsStudioOpen(false);
        } else if (isSearchOpen) {
          setIsSearchOpen(false);
        } else if (isCertificateOpen) {
          setIsCertificateOpen(false);
        } else if (isPlaygroundOpen) {
          setIsPlaygroundOpen(false);
        }
      } else if (!activeStarterLesson && !activeLesson && !isSearchOpen && !isCertificateOpen && !isPlaygroundOpen && !isStudioOpen) {
        if (e.key === '1') {
          soundEffects.playClick();
          setActiveGradeId('1am');
          setSelectedDomain('all');
        } else if (e.key === '2') {
          soundEffects.playClick();
          setActiveGradeId('2am');
          setSelectedDomain('all');
        } else if (e.key === '3') {
          soundEffects.playClick();
          setActiveGradeId('3am');
          setSelectedDomain('all');
        } else if (e.key === '4') {
          soundEffects.playClick();
          setActiveGradeId('4am');
          setSelectedDomain('all');
        } else if (e.key === 'f' || e.key === 'F' || e.key === '/') {
          e.preventDefault();
          soundEffects.playClick();
          setIsSearchOpen(true);
        } else if (e.key === 'm' || e.key === 'M' || e.key === 'p' || e.key === 'P') {
          soundEffects.playClick();
          setIsPlaygroundOpen(true);
        } else if (e.key === 'c' || e.key === 'C') {
          soundEffects.playClick();
          setIsCertificateOpen(true);
        } else if (e.key === 'e' || e.key === 'E') {
          soundEffects.playClick();
          setIsStudioOpen(true);
        } else if (e.key === 'd' || e.key === 'D') {
          handleChangeDeviceMode(deviceMode === 'desktop' ? 'phone' : 'desktop');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeStarterLesson, activeLesson, isSearchOpen, isCertificateOpen, isPlaygroundOpen, isStudioOpen, deviceMode]);

  const handleChangeDeviceMode = (mode: DeviceMode) => {
    setDeviceMode(mode);
    try {
      localStorage.setItem(STORAGE_KEY_DEVICE, mode);
    } catch {
      // Ignore
    }
  };

  // Save practice activity completion
  const handleCompleteActivity = (activityId: string) => {
    setCompletedActivities(prev => {
      const updated = { ...prev, [activityId]: true };
      try {
        localStorage.setItem(STORAGE_KEY_COMPLETED, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  // Save starter game completion
  const handleCompleteStarterGame = (gameId: string) => {
    setCompletedStarterGames(prev => {
      const updated = { ...prev, [gameId]: true };
      try {
        localStorage.setItem(STORAGE_KEY_STARTER_GAMES, JSON.stringify(updated));
      } catch {
        // Ignore
      }
      return updated;
    });
  };

  const handleUpdateStudentName = (name: string) => {
    setStudentName(name);
    try {
      localStorage.setItem(STORAGE_KEY_NAME, name);
    } catch {
      // Ignore
    }
  };

  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    soundEffects.enabled = nextVal;
    try {
      localStorage.setItem(STORAGE_KEY_SOUND, nextVal.toString());
    } catch {
      // Ignore
    }
  };

  const currentGrade = getGradeById(activeGradeId);
  const totalActivitiesCount = getTotalActivitiesCount();
  const totalStarterGamesCount = getTotalStarterGamesCount();
  const completedTotalActivities = Object.keys(completedActivities).length;
  const completedTotalStarterGames = Object.keys(completedStarterGames).length;

  // Filter lessons by domain if selected
  const availableDomains = Array.from(new Set(currentGrade.lessons.map(l => l.domain)));
  const filteredLessons = selectedDomain === 'all'
    ? currentGrade.lessons
    : currentGrade.lessons.filter(l => l.domain === selectedDomain);

  // Handlers for Practice Activities
  const handleStartLesson = (lesson: Lesson, startIndex: number = 0) => {
    setActiveStarterLesson(null);
    const resolvedLesson: Lesson = {
      ...lesson,
      activities: lesson.activities.map(resolveActivity)
    };
    setActiveLesson(resolvedLesson);
    setActiveActivityIndex(startIndex);
  };

  const handleOpenSpecificActivity = (lesson: Lesson, activity: Activity) => {
    setActiveStarterLesson(null);
    const resolvedLesson: Lesson = {
      ...lesson,
      activities: lesson.activities.map(resolveActivity)
    };
    setActiveLesson(resolvedLesson);
    const idx = resolvedLesson.activities.findIndex(a => a.id === activity.id);
    setActiveActivityIndex(idx >= 0 ? idx : 0);
  };

  // Handlers for Starter Games
  const handleStartStarterGames = (lesson: Lesson, startIndex: number = 0) => {
    setActiveLesson(null);
    setActiveStarterLesson(lesson);
    setActiveStarterGameIndex(startIndex);
  };

  // Handler when selecting item from SearchModal
  const handleSelectSearchResult = (gradeId: GradeLevelId, lesson: Lesson, activity?: Activity) => {
    setIsSearchOpen(false);
    setActiveGradeId(gradeId);
    if (activity) {
      handleOpenSpecificActivity(lesson, activity);
    } else {
      handleStartLesson(lesson, 0);
    }
  };

  return (
    <DeviceFrame
      deviceMode={deviceMode}
      onChangeDeviceMode={handleChangeDeviceMode}
      completedCount={completedTotalActivities + completedTotalStarterGames}
      totalActivities={totalActivitiesCount + totalStarterGamesCount}
      soundEnabled={soundEnabled}
      onToggleSound={handleToggleSound}
      onOpenSearch={() => setIsSearchOpen(true)}
      onOpenCertificate={() => setIsCertificateOpen(true)}
      onOpenPlayground={() => setIsPlaygroundOpen(true)}
      onOpenStudio={() => setIsStudioOpen(true)}
    >
      {/* 1. If StarterGamesViewer is open, show the active learning starter game player */}
      {activeStarterLesson ? (
        <StarterGamesViewer
          lesson={activeStarterLesson}
          games={getStarterGamesForLesson(activeStarterLesson.id)}
          initialGameIndex={activeStarterGameIndex}
          completedGames={completedStarterGames}
          onCompleteGame={handleCompleteStarterGame}
          onClose={() => setActiveStarterLesson(null)}
          onOpenLessonActivities={() => {
            const lesson = activeStarterLesson;
            setActiveStarterLesson(null);
            handleStartLesson(lesson, 0);
          }}
        />
      ) : activeLesson ? (
        /* 2. If ActivityViewer is open, show the practice activity player */
        <ActivityViewer
          lesson={activeLesson}
          initialActivityIndex={activeActivityIndex}
          completedActivities={completedActivities}
          onCompleteActivity={handleCompleteActivity}
          onClose={() => setActiveLesson(null)}
        />
      ) : (
        /* 3. Main Grade Catalog View */
        <div className="flex-1 flex flex-col">
          
          {/* Top Grade Level Tabs (السنة الأولى، الثانية، الثالثة، الرابعة متوسط) */}
          <GradeTabs
            grades={allGrades}
            activeGradeId={activeGradeId}
            onSelectGrade={(id) => {
              setActiveGradeId(id);
              setSelectedDomain('all');
            }}
            completedActivities={completedActivities}
          />

          {/* Quick Domain Filter Pills & Keyboard Hint */}
          <div className="px-4 py-2.5 bg-slate-900/90 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 text-xs">
            
            <div className="flex items-center gap-1.5 overflow-x-auto">
              <span className="text-[11px] text-slate-500 shrink-0">المجال التعليمي:</span>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setSelectedDomain('all');
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                  selectedDomain === 'all'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                كافة المجالات ({currentGrade.lessons.length} دروس)
              </button>
              {availableDomains.map((dom, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    soundEffects.playClick();
                    setSelectedDomain(dom);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    selectedDomain === dom
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {dom}
                </button>
              ))}
            </div>

            {/* Desktop Keyboard Shortcuts Pill */}
            {deviceMode === 'desktop' && (
              <div className="hidden lg:flex items-center gap-2 text-[10px] text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                <Keyboard className="w-3.5 h-3.5 text-blue-400" />
                <span>اختصارات الحاسوب:</span>
                <span className="bg-slate-800 px-1 rounded text-slate-300 font-mono">[1..4] المستويات</span>
                <span className="bg-slate-800 px-1 rounded text-slate-300 font-mono">[/] بحث</span>
                <span className="bg-slate-800 px-1 rounded text-slate-300 font-mono">[M] محاكاة</span>
                <span className="bg-slate-800 px-1 rounded text-slate-300 font-mono">[C] الشهادة</span>
                <span className="bg-slate-800 px-1 rounded text-slate-300 font-mono">[D] تبديل النمط</span>
              </div>
            )}

          </div>

          {/* Lessons List with 10 starter games + 10 practice activities per lesson */}
          <div className="p-4 sm:p-5 space-y-4">
            
            {/* Level Info Banner with Active Learning Indicator */}
            <div className="p-4 rounded-3xl bg-slate-850/80 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-md">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2 flex-wrap">
                  <GraduationCap className="w-5 h-5 text-indigo-400" />
                  <span>دروس وأنشطة {currentGrade.title}</span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold flex items-center gap-1">
                    <Gamepad2 className="w-3 h-3" />
                    ألعاب بداية الدرس (التعلم النشط)
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    التوزيع السنوي الرسمي 2026 / 2027
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  {currentGrade.description} يضم كل درس في هذا القسم مسارين تفاعليين: <strong>10 ألعاب تفاعلية للتهيئة والانطلاق</strong> مبنية على استراتيجيات التعلم النشط (فكر-زاوج-شارك، مَن أكون، سباق الثواني، بطاقات الذاكرة)، بالإضافة إلى <strong>10 أنشطة تطبيقية لبناء التعلمات والتقويم</strong>.
                </p>
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between shrink-0 bg-slate-900/90 px-3.5 py-2.5 rounded-2xl border border-slate-800/90 gap-1">
                <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                  <Gamepad2 className="w-3.5 h-3.5" />
                  {currentGrade.lessons.length * 10} لعبة انطلاق
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {currentGrade.lessons.length * 10} نشاط تطبيقي
                </span>
                <span className="text-[10px] text-slate-500">
                  إجمالي {currentGrade.lessons.length * 20} نشاطاً تفاعلياً
                </span>
              </div>
            </div>

            {/* List of Lesson Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredLessons.map((lesson) => (
                <LessonCard
                  key={`${lesson.id}-${contentVersion}`}
                  lesson={lesson}
                  gradeColor={currentGrade.color}
                  completedActivities={completedActivities}
                  completedStarterGames={completedStarterGames}
                  onStartLesson={handleStartLesson}
                  onOpenActivity={handleOpenSpecificActivity}
                  onStartStarterGames={handleStartStarterGames}
                />
              ))}
            </div>

            {/* Bottom Quick Access Tools Banner */}
            <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setIsPlaygroundOpen(true);
                }}
                className="p-3.5 rounded-2xl bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-500/30 text-right transition-all cursor-pointer group shadow-sm"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="w-8 h-8 rounded-xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <ChevronLeft className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:-translate-x-1 transition-all" />
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-indigo-300 flex items-center gap-1.5">
                  <span>مختبر المحاكاة التفاعلية وسطح المكتب</span>
                  <span className="text-[9px] bg-indigo-500/30 text-indigo-200 px-1.5 py-0.5 rounded">Lab</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  محاكي سطح مكتب Windows، سكراتش، دوال Excel، والخوارزميات
                </p>
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  setIsCertificateOpen(true);
                }}
                className="p-3.5 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-right transition-all cursor-pointer group shadow-sm"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="w-8 h-8 rounded-xl bg-amber-500/30 text-amber-400 flex items-center justify-center border border-amber-500/30">
                    <Award className="w-4 h-4" />
                  </span>
                  <ChevronLeft className="w-4 h-4 text-slate-500 group-hover:text-amber-400 group-hover:-translate-x-1 transition-all" />
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-amber-300 flex items-center gap-1.5">
                  <span>شهادة التفوق والتميز للتلميذ</span>
                  <span className="text-[9px] bg-amber-500/30 text-amber-200 px-1.5 py-0.5 rounded">PDF / طباعة</span>
                </h4>
                <p className="text-[11px] text-slate-400 mt-1">
                  توليد وطباعة شهادة شرفية رسمية باسم التلميذ لمكافأة إنجازه
                </p>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <SearchModal
          onSelectResult={handleSelectSearchResult}
          onClose={() => setIsSearchOpen(false)}
        />
      )}

      {/* Certificate Modal */}
      {isCertificateOpen && (
        <CertificateModal
          studentName={studentName}
          onUpdateStudentName={handleUpdateStudentName}
          completedCount={completedTotalActivities + completedTotalStarterGames}
          totalActivities={totalActivitiesCount + totalStarterGamesCount}
          activeGradeId={activeGradeId}
          onClose={() => setIsCertificateOpen(false)}
        />
      )}

      {/* Interactive Playground Modal */}
      {isPlaygroundOpen && (
        <InteractivePlayground
          onClose={() => setIsPlaygroundOpen(false)}
        />
      )}

      {/* Teacher Content Management & Studio Modal */}
      {isStudioOpen && (
        <ContentManagementModal
          isOpen={isStudioOpen}
          onClose={() => setIsStudioOpen(false)}
          onRefreshContent={() => setContentVersion(v => v + 1)}
        />
      )}
    </DeviceFrame>
  );
}
