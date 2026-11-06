import React, { useState } from 'react';
import { 
  X, 
  Search as SearchIcon, 
  BookOpen, 
  Sparkles, 
  ArrowLeft 
} from 'lucide-react';
import { searchCurriculum, SearchResult } from '../data/gradesData';
import { soundEffects } from '../utils/audio';
import { Lesson, Activity, GradeLevelId } from '../types';

interface SearchModalProps {
  onSelectResult: (gradeId: GradeLevelId, lesson: Lesson, activity?: Activity) => void;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onSelectResult, onClose }) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = (text: string) => {
    setQuery(text);
    if (!text.trim()) {
      setResults([]);
      return;
    }
    const matched = searchCurriculum(text);
    setResults(matched);
  };

  const quickPills = [
    'سكراتش',
    'الخوارزمية',
    'Excel',
    'Word',
    'HTML',
    'الذاكرة RAM',
    'المخطط الانسيابي',
    'الشبكات LAN'
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 select-none animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center gap-2.5">
          <SearchIcon className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="ابحث عن درس، نشاط، دالة، مصطلح (مثال: سكراتش، خوارزمية، إكسل)..."
            autoFocus
            className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-slate-500"
          />
          {query && (
            <button
              onClick={() => handleSearch('')}
              className="text-xs text-slate-500 hover:text-white"
            >
              مسح
            </button>
          )}
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="w-7 h-7 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="px-4 py-2 bg-slate-950/60 border-b border-slate-800/60 flex items-center gap-1.5 overflow-x-auto text-xs">
          <span className="text-slate-500 text-[11px] shrink-0">مقترحات شائعة:</span>
          {quickPills.map((pill, i) => (
            <button
              key={i}
              onClick={() => {
                soundEffects.playClick();
                handleSearch(pill);
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-indigo-600/40 text-slate-300 hover:text-white border border-slate-700 text-[11px] shrink-0 cursor-pointer"
            >
              {pill}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {query.trim() === '' ? (
            <div className="text-center py-10 text-slate-500">
              <BookOpen className="w-8 h-8 mx-auto mb-2 opacity-40 text-indigo-400" />
              <p className="text-xs">اكتب أي كلمة للبحث في دروس وأنشطة السنوات 1 و 2 و 3 و 4 متوسط</p>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              <p className="text-sm">لم يتم العثور على نتائج مطابقة لـ "{query}"</p>
              <p className="text-xs text-slate-600 mt-1">جرب كلمات أخرى مثل: جدول، خوارزمية، شرط، شبكة...</p>
            </div>
          ) : (
            results.map((res, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundEffects.playClick();
                  onSelectResult(res.grade.id, res.lesson, res.activity);
                }}
                className="w-full text-right p-3 rounded-xl bg-slate-800/70 hover:bg-slate-700/80 border border-slate-700/60 transition-all flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {res.grade.shortName}
                    </span>
                    <span className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {res.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-1">
                    {res.snippet}
                  </p>
                </div>

                <ArrowLeft className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:-translate-x-1 transition-all shrink-0" />
              </button>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
