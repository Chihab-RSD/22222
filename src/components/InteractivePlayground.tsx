import React, { useState, useRef } from 'react';
import { 
  X, 
  Play, 
  RotateCcw, 
  Blocks, 
  TableProperties, 
  Code, 
  Globe, 
  Sparkles,
  Monitor,
  Folder,
  FileText,
  Trash2,
  HardDrive,
  Palette,
  FilePlus,
  Eraser,
  PenTool,
  Maximize2,
  Minimize2,
  FolderPlus,
  Edit2,
  Check,
  Search,
  Laptop
} from 'lucide-react';
import { soundEffects } from '../utils/audio';

interface InteractivePlaygroundProps {
  onClose: () => void;
}

type TabType = 'desktop_os' | 'scratch' | 'excel' | 'algo' | 'html';

interface DesktopFile {
  id: string;
  name: string;
  type: 'doc' | 'image' | 'folder' | 'scratch';
  size: string;
}

export const InteractivePlayground: React.FC<InteractivePlaygroundProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('desktop_os');

  // ==========================================
  // Windows Desktop OS Simulator State
  // ==========================================
  const [openWindow, setOpenWindow] = useState<'pc' | 'trash' | 'paint' | 'word' | 'folder' | null>('folder');
  const [startMenuOpen, setStartMenuOpen] = useState<boolean>(false);
  const [myFiles, setMyFiles] = useState<DesktopFile[]>([
    { id: '1', name: 'فرض_الفصل1_معلوماتية.docx', type: 'doc', size: '24 KB' },
    { id: '2', name: 'رسمة_الحاسوب.png', type: 'image', size: '150 KB' },
    { id: '3', name: 'مشروع_القطة.sb3', type: 'scratch', size: '520 KB' }
  ]);
  const [trashItems, setTrashItems] = useState<DesktopFile[]>([
    { id: 't1', name: 'ملف_قديم_غير_هام.tmp', type: 'doc', size: '12 KB' }
  ]);
  const [editingFileId, setEditingFileId] = useState<string | null>(null);
  const [tempFileName, setTempFileName] = useState<string>('');

  // Paint App State
  const [paintColor, setPaintColor] = useState<string>('#3b82f6');
  const [paintTool, setPaintTool] = useState<'pen' | 'eraser'>('pen');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  // Word App State
  const [wordText, setWordText] = useState<string>(
    'بسم الله الرحمن الرحيم\nدرس معالج النصوص (Word) للسنة الأولى والثانية متوسط.\nيمكننا تنسيق النصوص وتغيير الخط والألوان وإدراج الجداول والصور.'
  );
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const [textAlign, setTextAlign] = useState<'right' | 'center' | 'left'>('right');

  // ==========================================
  // Scratch State
  // ==========================================
  const [catPos, setCatPos] = useState<{ x: number; y: number; angle: number }>({ x: 0, y: 0, angle: 0 });
  const [catSpeech, setCatSpeech] = useState<string>('مرحباً بك في سكراتش!');
  const [isRunningScratch, setIsRunningScratch] = useState<boolean>(false);

  // ==========================================
  // Excel State
  // ==========================================
  const [gridData, setGridData] = useState<number[][]>([
    [10, 15, 20],
    [5, 8, 12],
    [18, 14, 16]
  ]);
  const [formulaInput, setFormulaInput] = useState<string>('=SUM(A1:C1)');
  const [formulaResult, setFormulaResult] = useState<string>('45');

  // ==========================================
  // Algo Trace State
  // ==========================================
  const [algoStep, setAlgoStep] = useState<number>(0);
  const [traceVars, setTraceVars] = useState<{ a: number; b: number; s: number }>({ a: 0, b: 0, s: 0 });

  // ==========================================
  // HTML State
  // ==========================================
  const [htmlCode, setHtmlCode] = useState<string>(
`<div style="text-align:center; padding:15px; font-family:sans-serif;">
  <h2 style="color:#2563eb;">مرحباً بكم في مدرستنا</h2>
  <p style="color:#475569;">تصميم صفحة ويب أولى بلغة HTML لمادة المعلوماتية.</p>
  <button style="background:#10b981; color:white; border:none; padding:8px 16px; border-radius:8px; cursor:pointer;">
    انقر هنا للتفاعل
  </button>
</div>`
  );

  // Desktop File System Handlers
  const handleCreateNewFolder = () => {
    soundEffects.playClick();
    const newId = Date.now().toString();
    const newFolder: DesktopFile = {
      id: newId,
      name: `مجلد جديد ${myFiles.filter(f => f.type === 'folder').length + 1}`,
      type: 'folder',
      size: '0 KB'
    };
    setMyFiles([...myFiles, newFolder]);
    setEditingFileId(newId);
    setTempFileName(newFolder.name);
  };

  const handleDeleteFile = (id: string) => {
    soundEffects.playClick();
    const file = myFiles.find(f => f.id === id);
    if (file) {
      setTrashItems([...trashItems, file]);
      setMyFiles(myFiles.filter(f => f.id !== id));
    }
  };

  const handleEmptyTrash = () => {
    soundEffects.playClick();
    setTrashItems([]);
  };

  const handleSaveRename = (id: string) => {
    soundEffects.playClick();
    if (tempFileName.trim()) {
      setMyFiles(myFiles.map(f => f.id === id ? { ...f, name: tempFileName.trim() } : f));
    }
    setEditingFileId(null);
  };

  // Canvas drawing handlers
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = paintTool === 'eraser' ? '#ffffff' : paintColor;
    ctx.lineWidth = paintTool === 'eraser' ? 16 : 4;
    ctx.lineCap = 'round';
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    soundEffects.playClick();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  // Scratch actions
  const runScratchCommand = (cmd: string) => {
    soundEffects.playClick();
    if (cmd === 'move') {
      setCatPos(prev => ({ ...prev, x: Math.min(prev.x + 30, 140) }));
    } else if (cmd === 'turn') {
      setCatPos(prev => ({ ...prev, angle: (prev.angle + 30) % 360 }));
    } else if (cmd === 'reset') {
      setCatPos({ x: 0, y: 0, angle: 0 });
      setCatSpeech('مرحباً بك في سكراتش!');
    } else if (cmd === 'say') {
      setCatSpeech('برمجني لتحقيق المستحيل! 🚀');
    }
  };

  const handleRunScratchSequence = () => {
    soundEffects.playClick();
    setIsRunningScratch(true);
    setCatSpeech('انطلق!');
    
    setTimeout(() => {
      setCatPos(prev => ({ ...prev, x: prev.x + 40, angle: 15 }));
      soundEffects.playCorrect();
    }, 400);

    setTimeout(() => {
      setCatPos(prev => ({ ...prev, x: prev.x + 40, angle: 0 }));
      setCatSpeech('أنا بطل سكراتش! ✨');
      setIsRunningScratch(false);
    }, 900);
  };

  // Evaluate Excel formula
  const evalFormula = (formula: string) => {
    setFormulaInput(formula);
    const clean = formula.trim().toUpperCase();

    if (clean.startsWith('=SUM') || clean.startsWith('=SOMME')) {
      if (clean.includes('A1:C1')) {
        const sum = gridData[0].reduce((a, b) => a + b, 0);
        setFormulaResult(sum.toString());
      } else if (clean.includes('A1:A3')) {
        const sum = gridData[0][0] + gridData[1][0] + gridData[2][0];
        setFormulaResult(sum.toString());
      } else {
        const sum = gridData.flat().reduce((a, b) => a + b, 0);
        setFormulaResult(sum.toString());
      }
    } else if (clean.startsWith('=AVERAGE') || clean.startsWith('=MOYENNE')) {
      const avg = gridData[0].reduce((a, b) => a + b, 0) / 3;
      setFormulaResult(avg.toFixed(2));
    } else if (clean.startsWith('=MAX')) {
      const max = Math.max(...gridData.flat());
      setFormulaResult(max.toString());
    } else if (clean.startsWith('=MIN')) {
      const min = Math.min(...gridData.flat());
      setFormulaResult(min.toString());
    } else {
      setFormulaResult('صيغة غير معرفة (جرب =SUM, =AVERAGE, =MAX, =MIN)');
    }
  };

  // Algorithm step through
  const algoSteps = [
    { code: 'Début (بداية الخوارزمية)', desc: 'تهيئة البرنامج في الذاكرة' },
    { code: 'A ← 5 (إسناد 5 لـ A)', desc: 'المتغير A يحمل القيمة 5' },
    { code: 'B ← 10 (إسناد 10 لـ B)', desc: 'المتغير B يحمل القيمة 10' },
    { code: 'S ← A + B (حساب المجموع)', desc: 'المتغير S يأخذ 5 + 10 = 15' },
    { code: 'Ecrire("المجموع هو: ", S)', desc: 'طباعة النتيجة 15 على الشاشة للمستخدم' },
    { code: 'Fin (نهاية الخوارزمية)', desc: 'انتهاء البرنامج بنجاح' }
  ];

  const handleNextAlgoStep = () => {
    soundEffects.playClick();
    if (algoStep < algoSteps.length - 1) {
      const next = algoStep + 1;
      setAlgoStep(next);
      if (next === 1) setTraceVars({ a: 5, b: 0, s: 0 });
      if (next === 2) setTraceVars({ a: 5, b: 10, s: 0 });
      if (next === 3) setTraceVars({ a: 5, b: 10, s: 15 });
      if (next === 5) soundEffects.playVictory();
    } else {
      setAlgoStep(0);
      setTraceVars({ a: 0, b: 0, s: 0 });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 select-none animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh]">
        
        {/* Top Header */}
        <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600/30 text-indigo-400 flex items-center justify-center border border-indigo-500/40">
              <Laptop className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                <span>مختبر المحاكاة التفاعلية والأنشطة الرقمية</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30 font-mono">
                  PC Workstation Lab
                </span>
              </h3>
              <p className="text-xs text-slate-400">تطبيق عملي وتجربة حية لبرامج ونظم المعلوماتية</p>
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

        {/* 5 Interactive Lab Tabs */}
        <div className="bg-slate-950/70 p-2 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('desktop_os');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'desktop_os'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Monitor className="w-4 h-4 text-sky-300" />
            <span>سطح مكتب Windows</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('scratch');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'scratch'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Blocks className="w-4 h-4" />
            <span>محاكي سكراتش (Scratch)</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('excel');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'excel'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <TableProperties className="w-4 h-4" />
            <span>مختبر دوال Excel</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('algo');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'algo'
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>متتبع الخوارزميات (Trace)</span>
          </button>

          <button
            onClick={() => {
              soundEffects.playClick();
              setActiveTab('html');
            }}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${
              activeTab === 'html'
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>محرر كود الويب (HTML)</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 p-3 sm:p-5 overflow-y-auto">
          
          {/* TAB 0: WINDOWS DESKTOP OS SIMULATOR */}
          {activeTab === 'desktop_os' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>
                  محاكي نظام التشغيل وسطح المكتب: انقر فوق الأيقونات لفتح النوافذ وتطبيق عمليات الملفات والمجلدات.
                </span>
                <span className="text-emerald-400 font-mono">Windows 11 DZ Edu Edition</span>
              </div>

              {/* Simulated Desktop Screen Container */}
              <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-slate-700 bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 shadow-2xl flex flex-col">
                
                {/* Desktop Desktop Icons Grid */}
                <div className="flex-1 p-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 content-start">
                  
                  {/* Icon: This PC */}
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setOpenWindow('pc');
                    }}
                    className="flex flex-col items-center p-2 rounded-xl hover:bg-white/10 active:bg-white/20 transition-all text-center group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform shadow-md">
                      <HardDrive className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-white mt-1.5 drop-shadow">هذا الكمبيوتر</span>
                  </button>

                  {/* Icon: Recycle Bin */}
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setOpenWindow('trash');
                    }}
                    className="flex flex-col items-center p-2 rounded-xl hover:bg-white/10 active:bg-white/20 transition-all text-center group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-slate-500/20 border border-slate-400/40 flex items-center justify-center text-slate-300 group-hover:scale-105 transition-transform shadow-md">
                      <Trash2 className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-white mt-1.5 drop-shadow">
                      سلة المحذوفات ({trashItems.length})
                    </span>
                  </button>

                  {/* Icon: Paint */}
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setOpenWindow('paint');
                    }}
                    className="flex flex-col items-center p-2 rounded-xl hover:bg-white/10 active:bg-white/20 transition-all text-center group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-rose-500/20 border border-rose-400/40 flex items-center justify-center text-rose-400 group-hover:scale-105 transition-transform shadow-md">
                      <Palette className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-white mt-1.5 drop-shadow">برنامج الرسام</span>
                  </button>

                  {/* Icon: Word */}
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setOpenWindow('word');
                    }}
                    className="flex flex-col items-center p-2 rounded-xl hover:bg-white/10 active:bg-white/20 transition-all text-center group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400/40 flex items-center justify-center text-indigo-300 group-hover:scale-105 transition-transform shadow-md">
                      <FileText className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-white mt-1.5 drop-shadow">معالج النصوص</span>
                  </button>

                  {/* Icon: My Folder */}
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setOpenWindow('folder');
                    }}
                    className="flex flex-col items-center p-2 rounded-xl hover:bg-white/10 active:bg-white/20 transition-all text-center group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform shadow-md">
                      <Folder className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-white mt-1.5 drop-shadow">مجلد دروسي</span>
                  </button>

                </div>

                {/* Simulated Floating Windows */}
                {openWindow && (
                  <div className="absolute inset-x-4 top-4 bottom-14 bg-slate-900/95 backdrop-blur-md rounded-xl border border-slate-700 shadow-2xl flex flex-col overflow-hidden z-20 animate-scale-in">
                    
                    {/* Window Titlebar */}
                    <div className="bg-slate-950 px-3 py-2 border-b border-slate-800 flex items-center justify-between text-xs select-none">
                      <div className="flex items-center gap-2 font-bold text-white">
                        {openWindow === 'pc' && <HardDrive className="w-4 h-4 text-blue-400" />}
                        {openWindow === 'trash' && <Trash2 className="w-4 h-4 text-slate-400" />}
                        {openWindow === 'paint' && <Palette className="w-4 h-4 text-rose-400" />}
                        {openWindow === 'word' && <FileText className="w-4 h-4 text-indigo-400" />}
                        {openWindow === 'folder' && <Folder className="w-4 h-4 text-amber-400" />}
                        <span>
                          {openWindow === 'pc' && 'هذا الكمبيوتر (Ce PC) - محركات الأقراص'}
                          {openWindow === 'trash' && 'سلة المحذوفات (Corbeille)'}
                          {openWindow === 'paint' && 'برنامج الرسام (Paint DZ)'}
                          {openWindow === 'word' && 'معالج النصوص (Word) - مستند جديد'}
                          {openWindow === 'folder' && 'مستكشف الملفات: مجلد دروسي (C:\\Mes_Lecons)'}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 flex items-center justify-center">_</button>
                        <button className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 flex items-center justify-center">□</button>
                        <button 
                          onClick={() => {
                            soundEffects.playClick();
                            setOpenWindow(null);
                          }}
                          className="w-6 h-6 rounded bg-rose-600/30 hover:bg-rose-600 text-white flex items-center justify-center"
                        >
                          ✕
                        </button>
                      </div>
                    </div>

                    {/* Window Body: Folder Explorer */}
                    {openWindow === 'folder' && (
                      <div className="flex-1 flex flex-col p-3 overflow-y-auto">
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs">
                          <button
                            onClick={handleCreateNewFolder}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold cursor-pointer transition-colors"
                          >
                            <FolderPlus className="w-3.5 h-3.5" />
                            <span>إنشاء مجلد جديد</span>
                          </button>
                          <span className="text-slate-400 text-[11px]">
                            {myFiles.length} عناصر • انقر أيقونة القلم لتغيير الاسم أو سلة المهملات للحذف
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                          {myFiles.map(file => (
                            <div key={file.id} className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between gap-2">
                              <div className="flex items-center gap-2 min-w-0">
                                {file.type === 'folder' ? (
                                  <Folder className="w-6 h-6 text-amber-400 shrink-0" />
                                ) : file.type === 'doc' ? (
                                  <FileText className="w-6 h-6 text-blue-400 shrink-0" />
                                ) : (
                                  <Palette className="w-6 h-6 text-emerald-400 shrink-0" />
                                )}
                                
                                <div className="min-w-0">
                                  {editingFileId === file.id ? (
                                    <div className="flex items-center gap-1">
                                      <input
                                        type="text"
                                        value={tempFileName}
                                        onChange={(e) => setTempFileName(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSaveRename(file.id)}
                                        className="bg-slate-950 text-xs text-white px-1.5 py-0.5 rounded border border-blue-500 outline-none w-28"
                                        autoFocus
                                      />
                                      <button 
                                        onClick={() => handleSaveRename(file.id)} 
                                        className="p-1 text-emerald-400 hover:text-emerald-300"
                                      >
                                        <Check className="w-3.5 h-3.5" />
                                      </button>
                                    </div>
                                  ) : (
                                    <>
                                      <p className="text-xs font-bold text-white truncate">{file.name}</p>
                                      <p className="text-[10px] text-slate-400">{file.size}</p>
                                    </>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center gap-1 shrink-0">
                                <button
                                  onClick={() => {
                                    setEditingFileId(file.id);
                                    setTempFileName(file.name);
                                  }}
                                  className="p-1 rounded text-slate-400 hover:text-amber-300 hover:bg-slate-700 cursor-pointer"
                                  title="تغيير الاسم (Renommer)"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteFile(file.id)}
                                  className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-700 cursor-pointer"
                                  title="حذف إلى سلة المحذوفات"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Window Body: Paint */}
                    {openWindow === 'paint' && (
                      <div className="flex-1 flex flex-col p-2 bg-slate-900">
                        {/* Paint Toolbar */}
                        <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-xs gap-2">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setPaintTool('pen')}
                              className={`p-1.5 rounded-lg border ${paintTool === 'pen' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
                              title="قلم الرسم"
                            >
                              <PenTool className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setPaintTool('eraser')}
                              className={`p-1.5 rounded-lg border ${paintTool === 'eraser' ? 'bg-indigo-600 text-white border-indigo-500' : 'bg-slate-800 text-slate-300 border-slate-700'}`}
                              title="ممحاة"
                            >
                              <Eraser className="w-3.5 h-3.5" />
                            </button>
                            <div className="h-4 w-[1px] bg-slate-700 mx-1"></div>
                            {['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#000000'].map(color => (
                              <button
                                key={color}
                                onClick={() => {
                                  setPaintColor(color);
                                  setPaintTool('pen');
                                }}
                                className={`w-5 h-5 rounded-full border-2 transition-transform ${paintColor === color && paintTool === 'pen' ? 'scale-125 border-white' : 'border-transparent'}`}
                                style={{ backgroundColor: color }}
                              />
                            ))}
                          </div>

                          <button
                            onClick={clearCanvas}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs"
                          >
                            مسح اللوحة
                          </button>
                        </div>

                        {/* Interactive Drawing Canvas */}
                        <div className="flex-1 bg-white rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
                          <canvas
                            ref={canvasRef}
                            width={720}
                            height={280}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            className="w-full h-full cursor-crosshair bg-white"
                          />
                        </div>
                      </div>
                    )}

                    {/* Window Body: Word Processor */}
                    {openWindow === 'word' && (
                      <div className="flex-1 flex flex-col p-3 bg-slate-900">
                        {/* Word Ribbon */}
                        <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 flex items-center justify-between mb-2 text-xs">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => setIsBold(!isBold)}
                              className={`w-7 h-7 rounded font-bold ${isBold ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                            >
                              B
                            </button>
                            <button
                              onClick={() => setIsItalic(!isItalic)}
                              className={`w-7 h-7 rounded italic ${isItalic ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                            >
                              I
                            </button>
                            <button
                              onClick={() => setIsUnderline(!isUnderline)}
                              className={`w-7 h-7 rounded underline ${isUnderline ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                            >
                              U
                            </button>
                            <div className="h-4 w-[1px] bg-slate-700 mx-1"></div>
                            <button
                              onClick={() => setTextAlign('right')}
                              className={`px-2 py-1 rounded ${textAlign === 'right' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                            >
                              يمين
                            </button>
                            <button
                              onClick={() => setTextAlign('center')}
                              className={`px-2 py-1 rounded ${textAlign === 'center' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                            >
                              وسط
                            </button>
                            <button
                              onClick={() => setTextAlign('left')}
                              className={`px-2 py-1 rounded ${textAlign === 'left' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'}`}
                            >
                              يسار
                            </button>
                          </div>
                          <span className="text-[11px] text-slate-400">
                            {wordText.split(/\s+/).filter(Boolean).length} كلمة
                          </span>
                        </div>

                        {/* Document Typing Paper */}
                        <div className="flex-1 bg-white text-slate-900 rounded-xl p-4 shadow-inner overflow-y-auto">
                          <textarea
                            value={wordText}
                            onChange={(e) => setWordText(e.target.value)}
                            style={{
                              fontWeight: isBold ? 'bold' : 'normal',
                              fontStyle: isItalic ? 'italic' : 'normal',
                              textDecoration: isUnderline ? 'underline' : 'none',
                              textAlign: textAlign
                            }}
                            className="w-full h-full outline-none resize-none bg-transparent font-sans text-sm leading-relaxed"
                            placeholder="اكتب نص وثيقتك هنا..."
                          />
                        </div>
                      </div>
                    )}

                    {/* Window Body: This PC */}
                    {openWindow === 'pc' && (
                      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                        <h4 className="text-xs font-bold text-slate-300">أجهزة ومحركات الأقراص (Périphériques et lecteurs):</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="p-3 bg-slate-850 rounded-xl border border-slate-700 flex items-center gap-3">
                            <HardDrive className="w-10 h-10 text-blue-400 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h5 className="text-xs font-bold text-white">قرص محلي (C:)</h5>
                              <div className="w-full bg-slate-950 h-2.5 rounded-full mt-1.5 overflow-hidden">
                                <div className="bg-blue-500 h-full w-[45%]"></div>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-1">48.2 جيغابايت حرة من 120 جيغابايت</p>
                            </div>
                          </div>

                          <div className="p-3 bg-slate-850 rounded-xl border border-slate-700 flex items-center gap-3">
                            <HardDrive className="w-10 h-10 text-emerald-400 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <h5 className="text-xs font-bold text-white">قرص البيانات (D:)</h5>
                              <div className="w-full bg-slate-950 h-2.5 rounded-full mt-1.5 overflow-hidden">
                                <div className="bg-emerald-500 h-full w-[70%]"></div>
                              </div>
                              <p className="text-[10px] text-slate-400 mt-1">190 جيغابايت حرة من 500 جيغابايت</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
                          <p><strong>المعالج (CPU):</strong> Intel Core i7 - 3.20 GHz</p>
                          <p><strong>الذاكرة الحية (RAM):</strong> 16 Go DDR4</p>
                          <p><strong>نظام التشغيل:</strong> Windows 11 Pro DZ (64-bit)</p>
                        </div>
                      </div>
                    )}

                    {/* Window Body: Recycle Bin */}
                    {openWindow === 'trash' && (
                      <div className="flex-1 p-4 flex flex-col justify-between overflow-y-auto">
                        <div>
                          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-xs">
                            <span className="text-slate-300 font-bold">الملفات المحذوفة مؤقتاً:</span>
                            <button
                              onClick={handleEmptyTrash}
                              className="px-3 py-1 bg-rose-600/30 hover:bg-rose-600 text-rose-200 hover:text-white rounded-lg text-xs transition-colors"
                            >
                              إفراغ سلة المحذوفات
                            </button>
                          </div>

                          {trashItems.length === 0 ? (
                            <div className="text-center py-8 text-slate-500 text-xs">
                              سلة المحذوفات فارغة حالياً
                            </div>
                          ) : (
                            <div className="space-y-2">
                              {trashItems.map(item => (
                                <div key={item.id} className="p-2 bg-slate-800/60 rounded-lg flex items-center justify-between text-xs">
                                  <div className="flex items-center gap-2">
                                    <Trash2 className="w-4 h-4 text-slate-400" />
                                    <span className="text-slate-300">{item.name}</span>
                                  </div>
                                  <span className="text-[10px] text-slate-500">{item.size}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        <p className="text-[10px] text-slate-500 mt-4">
                          تنبيه بيداغوجي: الملفات في سلة المحذوفات يمكن استرجاعها (Restaurer) ما لم يتم إفراغ السلة نهائياً.
                        </p>
                      </div>
                    )}

                  </div>
                )}

                {/* Windows Desktop Taskbar */}
                <div className="w-full h-11 bg-slate-950/90 backdrop-blur-md border-t border-slate-800 px-3 flex items-center justify-between text-xs z-30 select-none">
                  <div className="flex items-center gap-2">
                    {/* Start Menu Button */}
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setStartMenuOpen(!startMenuOpen);
                      }}
                      className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <Laptop className="w-4 h-4" />
                      <span className="text-[11px] hidden sm:inline">ابدأ (Démarrer)</span>
                    </button>

                    <div className="flex items-center bg-slate-900 border border-slate-700/60 rounded-lg px-2 py-1 text-slate-400 gap-1.5">
                      <Search className="w-3.5 h-3.5" />
                      <span className="text-[10px]">بحث في التطبيقات...</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400">10:30 ص</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </div>
                </div>

                {/* Start Menu Popup */}
                {startMenuOpen && (
                  <div className="absolute bottom-12 right-3 w-64 bg-slate-900/98 border border-slate-700 rounded-2xl p-3 shadow-2xl z-40 animate-fade-in">
                    <h5 className="text-[11px] font-bold text-slate-400 mb-2">التطبيقات المثبتة</h5>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <button
                        onClick={() => {
                          setOpenWindow('paint');
                          setStartMenuOpen(false);
                        }}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 flex flex-col items-center text-center cursor-pointer"
                      >
                        <Palette className="w-5 h-5 text-rose-400 mb-1" />
                        <span className="text-[10px] text-white">الرسام</span>
                      </button>

                      <button
                        onClick={() => {
                          setOpenWindow('word');
                          setStartMenuOpen(false);
                        }}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 flex flex-col items-center text-center cursor-pointer"
                      >
                        <FileText className="w-5 h-5 text-indigo-400 mb-1" />
                        <span className="text-[10px] text-white">معالج النصوص</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('scratch');
                          setStartMenuOpen(false);
                        }}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 flex flex-col items-center text-center cursor-pointer"
                      >
                        <Blocks className="w-5 h-5 text-amber-400 mb-1" />
                        <span className="text-[10px] text-white">سكراتش</span>
                      </button>

                      <button
                        onClick={() => {
                          setActiveTab('excel');
                          setStartMenuOpen(false);
                        }}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 flex flex-col items-center text-center cursor-pointer"
                      >
                        <TableProperties className="w-5 h-5 text-emerald-400 mb-1" />
                        <span className="text-[10px] text-white">المجدول Excel</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* TAB 1: SCRATCH SIMULATOR */}
          {activeTab === 'scratch' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  انقر اللبنات البرمجية أو زر التشغيل لمشاهدة استجابة الكائن في المنصة:
                </span>
                <button
                  onClick={() => runScratchCommand('reset')}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-amber-400 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>إعادة تعيين المنصة</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Palette of blocks */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-amber-400">لبنات البرمجة (Scratch Blocks):</h4>

                  <button
                    onClick={() => runScratchCommand('move')}
                    className="w-full p-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-mono text-xs flex items-center justify-between shadow-sm cursor-pointer"
                  >
                    <span>تحرك 30 خطوة (Avancer de 30)</span>
                    <span className="text-[10px] opacity-75">حركة</span>
                  </button>

                  <button
                    onClick={() => runScratchCommand('turn')}
                    className="w-full p-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-mono text-xs flex items-center justify-between shadow-sm cursor-pointer"
                  >
                    <span>استدر 30 درجة ↻ (Tourner 30°)</span>
                    <span className="text-[10px] opacity-75">حركة</span>
                  </button>

                  <button
                    onClick={() => runScratchCommand('say')}
                    className="w-full p-2.5 bg-purple-600 hover:bg-purple-500 rounded-xl text-white font-mono text-xs flex items-center justify-between shadow-sm cursor-pointer"
                  >
                    <span>قل عبارة تشجيعية (Dire ...)</span>
                    <span className="text-[10px] opacity-75">مظاهر</span>
                  </button>

                  <button
                    onClick={handleRunScratchSequence}
                    disabled={isRunningScratch}
                    className="w-full mt-3 p-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>تشغيل المقطع البرمجي الكامل (العلم الأخضر ⚑)</span>
                  </button>
                </div>

                {/* Scratch Stage */}
                <div className="h-[220px] bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center p-4">
                  <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-500">
                    X: {catPos.x} | Y: {catPos.y} | Dir: {catPos.angle}°
                  </div>

                  {/* Speech Bubble */}
                  {catSpeech && (
                    <div className="absolute top-6 px-3 py-1.5 bg-white text-slate-900 text-xs font-bold rounded-2xl rounded-bl-none shadow-xl border border-slate-300 animate-bounce">
                      {catSpeech}
                    </div>
                  )}

                  {/* Scratch Sprite (Cat icon simulation) */}
                  <div 
                    style={{
                      transform: `translate(${catPos.x}px, ${catPos.y}px) rotate(${catPos.angle}deg)`,
                      transition: 'all 0.3s ease-out'
                    }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-400 flex items-center justify-center shadow-lg border-2 border-white/80 cursor-pointer"
                  >
                    <span className="text-2xl select-none">🐱</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: EXCEL FORMULAS */}
          {activeTab === 'excel' && (
            <div className="space-y-4">
              <span className="text-xs text-slate-400 block">
                مختبر جدول البيانات والدوال الحسابية (SUM, AVERAGE, MAX, MIN):
              </span>

              {/* Mini Spreadsheet Grid */}
              <div className="overflow-x-auto">
                <table className="w-full text-center border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-950 text-slate-400 font-mono">
                      <th className="p-2 border border-slate-800 w-10">#</th>
                      <th className="p-2 border border-slate-800">A</th>
                      <th className="p-2 border border-slate-800">B</th>
                      <th className="p-2 border border-slate-800">C</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gridData.map((row, rIdx) => (
                      <tr key={rIdx} className="hover:bg-slate-800/40">
                        <td className="p-2 bg-slate-950 text-slate-400 font-mono border border-slate-800">{rIdx + 1}</td>
                        {row.map((val, cIdx) => (
                          <td key={cIdx} className="p-2 border border-slate-800 font-mono text-emerald-400 font-bold">
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Formula Input & Result */}
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-400">fx</span>
                  <input
                    type="text"
                    value={formulaInput}
                    onChange={(e) => evalFormula(e.target.value)}
                    placeholder="=SUM(A1:C1)"
                    className="flex-1 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-mono text-white outline-none focus:border-emerald-500 dir-ltr text-left"
                  />
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400">نتيجة الصيغة:</span>
                  <span className="font-mono font-bold text-base text-emerald-400 px-3 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    {formulaResult}
                  </span>
                </div>

                {/* Quick Formula Helpers */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['=SUM(A1:C1)', '=AVERAGE(A1:C1)', '=MAX(A1:C3)', '=MIN(A1:C3)'].map((f) => (
                    <button
                      key={f}
                      onClick={() => evalFormula(f)}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] font-mono text-slate-300 border border-slate-700 cursor-pointer"
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: ALGORITHM TRACE */}
          {activeTab === 'algo' && (
            <div className="space-y-4">
              <span className="text-xs text-slate-400 block">
                محاكاة تتبع تنفيذ خوارزمية حسابية خطوة بخطوة في الذاكرة (Trace):
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Algorithm Code */}
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 font-mono text-xs space-y-1">
                  {algoSteps.map((step, idx) => (
                    <div 
                      key={idx}
                      className={`p-1.5 rounded-lg transition-all ${
                        algoStep === idx 
                          ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 font-bold' 
                          : 'text-slate-400'
                      }`}
                    >
                      {step.code}
                    </div>
                  ))}
                </div>

                {/* State of Memory & Screen */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-between">
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-indigo-400">حالة متغيرات الذاكرة (RAM):</h4>
                    
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700">
                        <span className="text-[10px] text-slate-400 block">المتغير A</span>
                        <span className="text-lg font-bold text-amber-400">{traceVars.a}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700">
                        <span className="text-[10px] text-slate-400 block">المتغير B</span>
                        <span className="text-lg font-bold text-sky-400">{traceVars.b}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-700">
                        <span className="text-[10px] text-slate-400 block">المجموع S</span>
                        <span className="text-lg font-bold text-emerald-400">{traceVars.s}</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-slate-900/60 rounded-lg border border-slate-800 text-xs text-slate-300">
                      <strong>الشرح: </strong> {algoSteps[algoStep].desc}
                    </div>
                  </div>

                  <button
                    onClick={handleNextAlgoStep}
                    className="w-full mt-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    {algoStep === algoSteps.length - 1 ? 'إعادة الخوارزمية من البداية' : 'تنفيذ الخطوة التالية ←'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: HTML SANDBOX */}
          {activeTab === 'html' && (
            <div className="space-y-4">
              <span className="text-xs text-slate-400 block">
                محرر لغة HTML المباشر: عدل الوسوم البرمجية وشاهد المعاينة فوراً:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Code Editor */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 mb-1.5">كود HTML:</h4>
                  <textarea
                    value={htmlCode}
                    onChange={(e) => setHtmlCode(e.target.value)}
                    rows={8}
                    className="w-full bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-xs text-emerald-300 outline-none focus:border-indigo-500 resize-none dir-ltr text-left"
                  />
                </div>

                {/* Live Preview */}
                <div>
                  <h4 className="text-xs font-bold text-slate-400 mb-1.5">معاينة المتصفح المباشرة:</h4>
                  <div 
                    className="w-full h-[180px] bg-white text-slate-900 rounded-xl border border-slate-300 p-2 overflow-auto shadow-inner"
                    dangerouslySetInnerHTML={{ __html: htmlCode }}
                  />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
