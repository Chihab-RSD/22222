import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  Battery, 
  Signal, 
  Smartphone, 
  Monitor, 
  Volume2, 
  VolumeX, 
  Sparkles,
  Award,
  Search,
  BookOpen,
  Minus,
  Square,
  X,
  Maximize2,
  Minimize2,
  LayoutGrid,
  Laptop,
  Edit3
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

export type DeviceMode = 'desktop' | 'phone';

interface DeviceFrameProps {
  children: React.ReactNode;
  deviceMode: DeviceMode;
  onChangeDeviceMode: (mode: DeviceMode) => void;
  onOpenSearch: () => void;
  onOpenCertificate: () => void;
  onOpenPlayground: () => void;
  onOpenStudio?: () => void;
  completedCount: number;
  totalActivities: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  deviceMode,
  onChangeDeviceMode,
  onOpenSearch,
  onOpenCertificate,
  onOpenPlayground,
  onOpenStudio,
  completedCount,
  totalActivities,
  soundEnabled,
  onToggleSound
}) => {
  const [currentTime, setCurrentTime] = useState<string>('10:30');
  const [currentDate, setCurrentDate] = useState<string>('الجمعة، 06 نوفمبر');
  const [isWindowMaximized, setIsWindowMaximized] = useState<boolean>(true);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);

      const formattedDate = now.toLocaleDateString('ar-DZ', {
        weekday: 'long',
        day: 'numeric',
        month: 'long'
      });
      setCurrentDate(formattedDate);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start p-0 sm:p-2 md:p-4 transition-all duration-300">
      
      {/* Top Device Switcher & Platform Bar */}
      <header className="w-full max-w-6xl mb-2.5 px-3 py-2 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-slate-800 shadow-md flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-md">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <span>منهاج المعلوماتية للطور المتوسط</span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30 font-mono">
                1AM - 4AM (2026/2027)
              </span>
            </h1>
            <p className="text-[10px] sm:text-xs text-slate-400 hidden sm:block">
              وفق التوازيع السنوية الرسمية لوزارة التربية الوطنية • 32 درساً (320 لعبة بداية الدرس بالتعلم النشط + 320 نشاطاً تطبيقياً)
            </p>
          </div>
        </div>

        {/* Action Controls & Mode Switcher */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Quick search button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenSearch();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title="بحث في الدروس والأنشطة (Ctrl+F)"
          >
            <Search className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">بحث</span>
          </button>

          {/* Playground button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenPlayground();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-xs text-indigo-300 border border-indigo-500/30 transition-colors cursor-pointer"
            title="مختبر المحاكاة التفاعلية (سكراتش، إكسل، وورد، خوارزميات)"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="hidden sm:inline">مختبر المحاكاة</span>
          </button>

          {/* Certificate button */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenCertificate();
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-xs text-amber-300 border border-amber-500/30 transition-colors cursor-pointer"
            title="شهادة التميز والتفوق للتلميذ"
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">الشهادة</span>
          </button>

          {/* Teacher Studio Button */}
          {onOpenStudio && (
            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenStudio();
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-xs text-indigo-300 border border-indigo-500/30 transition-colors cursor-pointer font-bold"
              title="استوديو الأستاذ لإدارة وتعديل الأنشطة والألعاب"
            >
              <Edit3 className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">استوديو التعديل</span>
            </button>
          )}

          {/* Sound toggle */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onToggleSound();
            }}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
            title={soundEnabled ? 'كتم الصوت' : 'تفعيل المؤثرات الصوتية'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
          </button>

          {/* Platform Switcher: Computer / Desktop vs Android Phone */}
          <div className="flex items-center bg-slate-950 p-0.5 rounded-xl border border-slate-700/80">
            <button
              onClick={() => {
                soundEffects.playClick();
                onChangeDeviceMode('desktop');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                deviceMode === 'desktop'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="نسخة الحاسوب (Desktop PC)"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>نسخة الحاسوب</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                onChangeDeviceMode('phone');
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                deviceMode === 'phone'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="نسخة هاتف أندرويد (Android Mobile)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>هاتف أندرويد</span>
            </button>
          </div>

        </div>
      </header>

      {/* ========================================================================= */}
      {/* 1. DESKTOP / PC WORKSTATION CONTAINER (نسخة الحاسوب)                     */}
      {/* ========================================================================= */}
      {deviceMode === 'desktop' && (
        <div className={`w-full max-w-6xl transition-all duration-300 flex flex-col rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden ${
          !isWindowMaximized ? 'scale-[0.98] ring-2 ring-indigo-500/30' : ''
        }`}>
          
          {/* PC Desktop Window Titlebar (Windows 11 / Desktop Style) */}
          <div className="w-full bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs select-none">
            {/* Right: Window Controls in Arabic RTL */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 hover:bg-rose-500 inline-block cursor-pointer" title="إغلاق"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80 hover:bg-amber-500 inline-block cursor-pointer" title="تصغير"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 inline-block cursor-pointer" title="تكبير"></span>
              </div>
              <span className="text-slate-500 text-[11px] font-mono mr-2 hidden sm:inline">
                منظومة التعليم المتوسط للمعلوماتية DZ v2.5
              </span>
            </div>

            {/* Middle: Active Window Title */}
            <div className="flex items-center gap-2 font-bold text-slate-300 text-xs">
              <Laptop className="w-4 h-4 text-blue-400" />
              <span>بيئة الحاسوب التعليمية • برمجيات ونظم المعلومات</span>
            </div>

            {/* Left: Desktop Controls & Clock */}
            <div className="flex items-center gap-3 text-slate-400">
              <span className="text-[11px] font-mono text-slate-400 hidden md:inline">
                {currentDate}
              </span>
              <span className="text-xs font-mono font-bold text-slate-200 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                {currentTime}
              </span>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setIsWindowMaximized(!isWindowMaximized);
                }}
                className="text-slate-400 hover:text-white p-1"
                title={isWindowMaximized ? 'استعادة للأسفل' : 'تكبير النافذة'}
              >
                {isWindowMaximized ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Desktop Body Content */}
          <div className="flex-1 flex flex-col min-h-[750px] overflow-y-auto">
            {children}
          </div>

          {/* PC Taskbar / Status Bar in Desktop Mode */}
          <div className="w-full bg-slate-950 px-4 py-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 select-none">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-[11px] font-medium">نظام التشغيل: متصل ومتزامن</span>
              </div>
              <span className="text-slate-600">•</span>
              <span className="text-[11px]">
                تم إنجاز <strong>{completedCount}</strong> من <strong>{totalActivities}</strong> نشاطاً ({Math.round((completedCount / (totalActivities || 1)) * 100)}%)
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px]">
              <span className="text-slate-500">جاهز للتنفيذ • تصفح كامل الدروس</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300 font-mono">
                مكتبة الأنشطة والألعاب 640
              </span>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ANDROID PHONE CONTAINER (نسخة هاتف أندرويد)                            */}
      {/* ========================================================================= */}
      {deviceMode === 'phone' && (
        <div className="w-full max-w-md my-1 rounded-none sm:rounded-[42px] border-0 sm:border-8 sm:border-slate-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] bg-slate-900 overflow-hidden ring-1 sm:ring-slate-700/60 relative flex flex-col">
          
          {/* Android Status Bar */}
          <div className="w-full bg-slate-950 text-slate-300 px-6 pt-3 pb-2 flex items-center justify-between text-xs select-none border-b border-slate-800/50">
            <div className="font-mono font-bold tracking-wider text-slate-200">
              {currentTime}
            </div>

            {/* Front Camera Hole Punch */}
            <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-800 flex items-center justify-center shadow-inner">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-950/80"></div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-semibold text-emerald-400">5G</span>
              <Signal className="w-3.5 h-3.5 text-slate-300" />
              <Wifi className="w-3.5 h-3.5 text-slate-300" />
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-mono">98%</span>
                <Battery className="w-4 h-4 text-emerald-400 rotate-90" />
              </div>
            </div>
          </div>

          {/* Content Body */}
          <div className="flex-1 flex flex-col max-h-[84vh] sm:max-h-[820px] overflow-y-auto">
            {children}
          </div>

          {/* Android Bottom Navigation Pill / Bar */}
          <div className="w-full bg-slate-950 py-2.5 px-6 flex items-center justify-between border-t border-slate-800/80 select-none">
            <button 
              onClick={() => {
                soundEffects.playClick();
                onOpenSearch();
              }}
              className="text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
              title="بحث سريع"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Gesture Navigation Home Indicator Pill */}
            <div className="w-28 h-1 rounded-full bg-slate-600 hover:bg-slate-400 transition-colors cursor-pointer"></div>

            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenCertificate();
              }}
              className="text-slate-400 hover:text-amber-400 transition-colors p-1 cursor-pointer"
              title="الشهادة والإنجازات"
            >
              <Award className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* Footer credits & official ministry compliance */}
      <footer className="mt-2.5 text-center text-xs text-slate-500 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
        <span>مادة المعلوماتية للتعليم المتوسط</span>
        <span>•</span>
        <span>التوزيع السنوي الرسمي 2026 / 2027</span>
        <span>•</span>
        <span>الجمهورية الجزائرية الديمقراطية الشعبية</span>
      </footer>

    </div>
  );
};

// Export alias for backward compatibility
export const AndroidFrame = DeviceFrame;
