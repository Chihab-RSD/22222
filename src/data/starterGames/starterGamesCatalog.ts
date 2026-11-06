import { StarterGame, ActiveLearningStrategyType } from '../../types/starterGames';
import { grade1StarterGames } from './grade1Games';

// Metadata and curriculum definitions for all 32 official lessons
interface LessonMetaConfig {
  id: string;
  gradeId: '1am' | '2am' | '3am' | '4am';
  order: number;
  title: string;
  domain: string;
  coreKeyword: string;
  scrambled: string[];
  whoAmI: {
    clues: string[];
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  speedSort: {
    cat1: { id: string; title: string; color: string };
    cat2: { id: string; title: string; color: string };
    items: { id: string; text: string; targetCategoryId: string }[];
    explanation: string;
  };
  lightning: {
    statement: string;
    isTrue: boolean;
    explanation: string;
  };
  thinkPair: {
    question: string;
    think: string;
    pair: string;
    share: string;
    idealAnswer: string;
    tip?: string;
  };
  memoryPairs: { id: string; term: string; definition: string }[];
  spotGlitch: {
    scenario: string;
    options: { id: string; text: string; isGlitch: boolean; fixExplanation: string }[];
  };
  ladderSteps: {
    q1: string; opt1: string[]; a1: number; f1: string;
    q2: string; opt2: string[]; a2: number; f2: string;
    q3: string; opt3: string[]; a3: number; f3: string;
  };
  wordBank: {
    sentence: string;
    words: string[];
    assignments: Record<string, string>;
    explanation: string;
  };
  bonusWhoAmI: {
    clues: string[];
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

// Full curriculum metadata for all lessons across 1AM, 2AM, 3AM, 4AM
export const lessonConfigs: Record<string, LessonMetaConfig> = {
  // ================= 1AM LESSONS 5 TO 8 =================
  'g1-l5': {
    id: 'g1-l5',
    gradeId: '1am',
    order: 5,
    title: 'عمليات على الملف والمجلد',
    domain: 'استخدام الحاسوب • تنظيم المعلومات',
    coreKeyword: 'مجلد جديد',
    scrambled: ['م', 'ج', 'ل', 'د', 'ج', 'د', 'ي', 'د'],
    whoAmI: {
      clues: ['أنا أمر يتيح لك صنع نسخة ثانية من الملف مع بقاء النسخة الأصلية مكانها.', 'اختصاري السريع على لوحة المفاتيح هو Ctrl+C ثم Ctrl+V.', 'أختلف عن القص (Couper) الذي يحذف الأصل وينقله لمكان جديد.'],
      options: ['أمر النسخ (Copier)', 'أمر الحذف (Supprimer)', 'أمر إعادة التسمية', 'إفراغ السلة'],
      correctIndex: 0,
      explanation: 'النسخ (Copier) يكرر الملف في مكان جديد، بينما النقل (Couper) ينقله تماماً.'
    },
    speedSort: {
      cat1: { id: 'copy', title: 'نسخ الملف (Copier)', color: 'from-blue-600 to-indigo-600' },
      cat2: { id: 'move', title: 'نقل / قص الملف (Couper)', color: 'from-rose-600 to-red-600' },
      items: [
        { id: 's1', text: 'يبقى الملف الأصلي مكانه وتظهر نسخة جديدة في الفلاش ديسك', targetCategoryId: 'copy' },
        { id: 's2', text: 'يختفي الملف من المجلد القديم وينتقل كلياً إلى المجلد الجديد', targetCategoryId: 'move' },
        { id: 's3', text: 'اختصاره السريع هو Ctrl + C', targetCategoryId: 'copy' },
        { id: 's4', text: 'اختصاره السريع هو Ctrl + X', targetCategoryId: 'move' }
      ],
      explanation: 'النسخ يضاعف المستند، بينما النقل يغير مساره الفيزيائي على القرص.'
    },
    lightning: {
      statement: 'عند حذف ملف بالزر Supprimer فإنه يختفي نهائياً ولا يمكن استرجاعه أبداً.',
      isTrue: false,
      explanation: 'خرافة! يذهب الملف أولاً إلى سلة المحذوفات (Corbeille) ويمكن استرجاعه (Restaurer) بسهولة.'
    },
    thinkPair: {
      question: 'لماذا وضعت أنظمة التشغيل مرحلة وسيطة اسمها "سلة المحذوفات" قبل الحذف النهائي؟',
      think: 'تذكر كم مرة حذفت ملفاً عن طريق الخطأ وندمت عليه.',
      pair: 'ناقش زميلك: كيف تفيد سلة المحذوفات في حماية وثائق التلميذ؟',
      share: 'اعرض الفكرة أمام القسم: سلة المحذوفات صمام أمان رقمي يمنع الكوارث الناتجة عن التسرع.',
      idealAnswer: 'سلة المحذوفات توفر فرصة التراجع والاسترجاع للملفات المحذوفة سهواً قبل التفريغ النهائي.',
      tip: 'ذكّر التلاميذ بوجود زر Shift+Delete الذي يحذف مباشرة دون المرور بالسلة.'
    },
    memoryPairs: [
      { id: 'p1', term: 'إعادة التسمية (Renommer)', definition: 'تغيير اسم الملف بالزر الأيمن أو مفتاح F2' },
      { id: 'p2', term: 'استرجاع (Restaurer)', definition: 'إعادة الملف من سلة المحذوفات لمكانه الأصلي' },
      { id: 'p3', term: 'لصق (Coller / Ctrl+V)', definition: 'تثبيت الملف المنسوخ في المجلد الهدف' }
    ],
    spotGlitch: {
      scenario: 'حاول تلميذ إعادة تسمية ملف وهو مفتوح ويعمل في برنامج Word، فظهرت رسالة خطأ تمنعه!',
      options: [
        { id: 'o1', text: 'لا يمكن تغيير اسم أو حذف ملف أثناء كونه مفتوحاً في برنامج نشط', isGlitch: false, fixExplanation: 'صحيح! يجب إغلاق الملف أولاً ثم إعادة تسميته.' },
        { id: 'o2', text: 'الحاسوب معطل ويجب شراء حاسوب جديد', isGlitch: true, fixExplanation: 'خطأ غير منطقي.' },
        { id: 'o3', text: 'برنامج Word حذف الملف تلقائياً', isGlitch: true, fixExplanation: 'خطأ غير صحيح.' }
      ]
    },
    ladderSteps: {
      q1: 'الزر المستخدم عادة لإظهار القائمة السياقية (Menu contextuel) للملف هو:',
      opt1: ['الزر الأيمن للفأرة', 'الزر الأيسر للفأرة', 'عجلة التمرير فقط'],
      a1: 0,
      f1: 'صحيح! الزر الأيمن يفتح قائمة العمليات (Copier, Supprimer...).',
      q2: 'المفتاح السريع على لوحة المفاتيح لإعادة تسمية عنصر محدد هو:',
      opt2: ['مفتاح F2', 'مفتاح الفضاء Space', 'مفتاح Escape'],
      a2: 0,
      f2: 'ممتاز! F2 هو الاختصار السريع للتسمية.',
      q3: 'إذا قمت بإفراغ سلة المحذوفات (Vider la corbeille):',
      opt3: ['يتم حذف الملفات نهائياً من نظام الملفات', 'تعود الملفات إلى سطح المكتب', 'يتوقف الحاسوب'],
      a3: 0,
      f3: 'أحسنت! إفراغ السلة يعني الحذف التام.'
    },
    wordBank: {
      sentence: 'لإنشاء مجلد جديد ننقر بالزر [BLANK1] ونختار جديد ثم [BLANK2].',
      words: ['الأيمن', 'مجلد (Dossier)', 'الأيسر', 'ملف'],
      assignments: { BLANK1: 'الأيمن', BLANK2: 'مجلد (Dossier)' },
      explanation: 'النقر بالزر الأيمن في مكان فارغ ← Nouveau ← Dossier.'
    },
    bonusWhoAmI: {
      clues: ['أنا صندوق مهملات رقمي أوجد على سطح المكتب.', 'أحفظ الأوراق والملفات المحذوفة مؤقتاً.', 'يمكنك النقر فوقي واختيار "استرجاع" لإعادة أي ملف لمكانه.'],
      options: ['سلة المحذوفات (Corbeille)', 'لوحة التحكم', 'القرص C', 'المتصفح'],
      correctIndex: 0,
      explanation: 'سلة المحذوفات هي المكان الآمن للملفات المحذوفة قبل التخلص النهائي منها.'
    }
  },

  'g1-l6': {
    id: 'g1-l6',
    gradeId: '1am',
    order: 6,
    title: 'تقديم معالج النصوص',
    domain: 'معالج النصوص • بيئة العمل',
    coreKeyword: 'معالج النصوص',
    scrambled: ['م', 'ع', 'ا', 'ل', 'ج', 'ا', 'ل', 'ن', 'ص', 'و', 'ص'],
    whoAmI: {
      clues: ['أنا أشهر برنامج مكتبي لمعالجة وتنسيق النصوص في العالم.', 'لوني الأزرق الشهير ورمزي يحمل حرف W كبير.', 'أسمح بكتابة البحوث وتنسيق الفقرات وتدقيق الإملاء.'],
      options: ['برنامج معالج النصوص (Microsoft Word)', 'برنامج الرسام Paint', 'برنامج الحاسبة', 'مشغل الموسيقى'],
      correctIndex: 0,
      explanation: 'برنامج Word هو رائد برمجيات معالجة النصوص المكتبية.'
    },
    speedSort: {
      cat1: { id: 'word', title: 'بيئة Word (معالج النصوص)', color: 'from-blue-600 to-indigo-600' },
      cat2: { id: 'paint', title: 'بيئة Paint (الرسام)', color: 'from-rose-600 to-orange-600' },
      items: [
        { id: 'w1', text: 'المسطرة وشريط التبويبات والمؤشر الومّاض', targetCategoryId: 'word' },
        { id: 'w2', text: 'دلو الطلاء وأداة العدسة المكبرة', targetCategoryId: 'paint' },
        { id: 'w3', text: 'صفحة الكتابة البيضاء ذات الهوامش', targetCategoryId: 'word' },
        { id: 'w4', text: 'لوحة الألوان وريشة الفرشاة', targetCategoryId: 'paint' }
      ],
      explanation: 'برنامج Word مخصص للتحرير المكتبي، بينما Paint مخصص للرسم النقطي.'
    },
    lightning: {
      statement: 'الخط العمودي الصغير الذي يومض في صفحة معالج النصوص يسمى مؤشر الكتابة (Curseur).',
      isTrue: true,
      explanation: 'حقيقة! المؤشر الومّاض يحدد بدقة مكان ظهور الحرف التالي الذي ستكتبه.'
    },
    thinkPair: {
      question: 'لماذا استبدل العالم الآلة الكاتبة اليدوية القديمة ببرنامج معالج النصوص على الحاسوب؟',
      think: 'فكر في صعوبة تصحيح خطأ على الآلة الكاتبة دون تمزيق الورقة.',
      pair: 'ناقش زميلك: سهولة التعديل، تغيير الخط، وحفظ الملف على القرص.',
      share: 'قدم المقارنة للقسم: معالج النصوص يسمح بالتعديل اللانهائي وحفظ التغييرات.',
      idealAnswer: 'معالج النصوص يوفر إمكانية الحذف، التصحيح، تلوين الخط، التنسيق، وحفظ المستند لاستخدامه لاحقاً.',
      tip: 'اعرض صورة لآلة كاتبة قديمة لمقارنتها مع واجهة Word الحديثة.'
    },
    memoryPairs: [
      { id: 'p1', term: 'شريط العنوان (Barre de titre)', definition: 'يعرض اسم المستند واسم البرنامج وأزرار التحكم' },
      { id: 'p2', term: 'المسطرة (Règle)', definition: 'تضبط هوامش الصفحة ومواقع الجداول والفقرات' },
      { id: 'p3', term: 'شريط الحالة (Barre d\'état)', definition: 'يعرض عدد الكلمات ورقم الصفحة الحالية ولغة الكتابة' }
    ],
    spotGlitch: {
      scenario: 'أراد تلميذ تغيير لغة الكتابة من الفرنسية إلى العربية في Word فقام بالضغط على زر إطفاء الحاسوب!',
      options: [
        { id: 'o1', text: 'تغيير لغة الكتابة يتم بالضغط على مفتاحي Alt + Shift معاً', isGlitch: false, fixExplanation: 'هذا هو الاختصار السليم لتبديل لغة الإدخال.' },
        { id: 'o2', text: 'إطفاء الحاسوب يغير اللغة تلقائياً', isGlitch: true, fixExplanation: 'تصرف خاطئ يضيع العمل.' },
        { id: 'o3', text: 'الضغط على زر المسافة 100 مرة', isGlitch: true, fixExplanation: 'تصرف خاطئ.' }
      ]
    },
    ladderSteps: {
      q1: 'امتداد الملفات الافتراضي المحفوظة بواسطة Word الحديث هو:',
      opt1: ['.docx', '.mp3', '.png'],
      a1: 0,
      f1: 'صحيح! .docx هو لاحقة معالج النصوص.',
      q2: 'الشريط العريض في أعلى Word الذي يضم الأوامر والأدوات يسمى:',
      opt2: ['شريط الشريط / التبويبات (Le Ruban)', 'شريط المهام', 'سلة المهملات'],
      a2: 0,
      f2: 'ممتاز! شريط Ruban يجمع تبويبات Accueil, Insertion...',
      q3: 'عند الضغط على مفتاح Entrée في لوحة المفاتيح أثناء الكتابة في Word:',
      opt3: ['ينتقل المؤشر لبداية سطر جديد وفقرة جديدة', 'يتم حفظ الملف', 'يتم إغلاق المستند'],
      a3: 0,
      f3: 'أحسنت! مفتاح Entrée ينشئ فقرة جديدة.'
    },
    wordBank: {
      sentence: 'يُفتح برنامج معالج النصوص من زر [BLANK1] ويظهر فيه مؤشر [BLANK2] على صفحة بيضاء.',
      words: ['إبدأ', 'الكتابة الومّاض', 'الطباعة', 'الإنترنت'],
      assignments: { BLANK1: 'إبدأ', BLANK2: 'الكتابة الومّاض' },
      explanation: 'Démarrer ← Word ← صفحة بيضاء مع مؤشر الكتابة.'
    },
    bonusWhoAmI: {
      clues: ['أنا شريط في أسفل نافذة Word.', 'أحسب لك عدد الكلمات التي كتبتها في النص بدقة.', 'أخبرك برقم الصفحة الحالية ونسبة التكبير والتصغير (Zoom).'],
      options: ['شريط الحالة (Barre d\'état)', 'شريط المهام', 'لوحة الألوان', 'المسطرة'],
      correctIndex: 0,
      explanation: 'شريط الحالة (Barre d\'état) يعرض إحصائيات المستند الحالية.'
    }
  },

  'g1-l7': {
    id: 'g1-l7',
    gradeId: '1am',
    order: 7,
    title: 'عمليات عامة على الوثيقة',
    domain: 'معالج النصوص • إدارة الوثائق',
    coreKeyword: 'حفظ المستند',
    scrambled: ['ح', 'ف', 'ظ', 'ا', 'ل', 'م', 'س', 'ت', 'ن', 'د'],
    whoAmI: {
      clues: ['أنا أمر في قائمة ملف (Fichier) أحفظ به المستند لأول مرة وأحدد اسمه ومكانه.', 'اختصاري يشبه ديسكيت الحفظ القديمة.', 'إذا لم تستخدمني وانقطعت الكهرباء، قد تضيع كل أسطرك المكتوبة!'],
      options: ['حفظ باسم (Enregistrer sous)', 'طباعة (Imprimer)', 'جديد (Nouveau)', 'خروج (Quitter)'],
      correctIndex: 0,
      explanation: 'أمر Enregistrer sous يحدد اسم ومسار حفظ الوثيقة لأول مرة.'
    },
    speedSort: {
      cat1: { id: 'save', title: 'حفظ المستند (Enregistrer / Ctrl+S)', color: 'from-emerald-600 to-teal-600' },
      cat2: { id: 'print', title: 'طباعة المستند (Imprimer / Ctrl+P)', color: 'from-amber-600 to-orange-600' },
      items: [
        { id: 'p1', text: 'كتابة وتثبيت الملف في القرص الصلب', targetCategoryId: 'save' },
        { id: 'p2', text: 'إخراج النص بالحبر على ورق حقيقي بواسطة الطابعة', targetCategoryId: 'print' },
        { id: 'p3', text: 'اختصاره السريع Ctrl + S', targetCategoryId: 'save' },
        { id: 'p4', text: 'اختصاره السريع Ctrl + P', targetCategoryId: 'print' }
      ],
      explanation: 'الحفظ يضمن بقاء الملف في الذاكرة الدائمة، والطباعة تحوله لورق ملموس.'
    },
    lightning: {
      statement: 'الفرق بين "حفظ" و "حفظ باسم" هو أن "حفظ باسم" يتيح تغيير اسم ومكان الملف.',
      isTrue: true,
      explanation: 'حقيقة! Enregistrer sous يستخدم للتسمية وتغيير المسار، و Enregistrer لتحديث التعديلات.'
    },
    thinkPair: {
      question: 'لماذا يُنصح دائماً بالضغط على Ctrl+S كل 5 دقائق أثناء كتابة بحث مهم؟',
      think: 'ماذا سيحدث لو انطفأ الجهاز فجأة بسبب انقطاع التيار؟',
      pair: 'ناقش زميلك: كيف يحمي الحفظ المتكرر تعب وجهد الباحث؟',
      share: 'شارك الحل: الحفظ الدوري يضمن عدم ضياع الفقرات الجديدة غير المحفوظة.',
      idealAnswer: 'الحفظ المنتظم يثبت التعديلات على القرص الصلب ويقي من ضياع المعلومات عند انقطاع التيار الكهربائي.',
      tip: 'علم التلاميذ اختصار Ctrl+S كمنعكس شرطي أثناء العمل المكتبي.'
    },
    memoryPairs: [
      { id: 'p1', term: 'مستند جديد (Nouveau / Ctrl+N)', definition: 'فتح صفحة بيضاء لبدء عمل جديد' },
      { id: 'p2', term: 'فتح (Ouvrir / Ctrl+O)', definition: 'استدعاء مستند محفوظ مسبقاً للتعديل عليه' },
      { id: 'p3', term: 'معاينة قبل الطباعة (Aperçu)', definition: 'مشاهدة شكل الصفحة النهائي قبل استهلاك الورق والحبر' }
    ],
    spotGlitch: {
      scenario: 'قام تلميذ بالنقر على زر الإغلاق ✕ الأحمر فظهرت له رسالة تسأله: "هل تريد حفظ التغييرات؟" فنقر "عدم الحفظ" واختفى نصه!',
      options: [
        { id: 'o1', text: 'كان يجب عليه النقر على "حفظ" (Enregistrer) ليتم تسجيل عمله قبل الإغلاق', isGlitch: false, fixExplanation: 'صحيح! النقر على "عدم الحفظ" يهدر التعديلات.' },
        { id: 'o2', text: 'رسالة الحفظ هي فيروس خطير', isGlitch: true, fixExplanation: 'تفسير خاطئ تماماً.' },
        { id: 'o3', text: 'الطابعة هي السبب', isGlitch: true, fixExplanation: 'تفسير خاطئ.' }
      ]
    },
    ladderSteps: {
      q1: 'القائمة التي تحتوي على أوامر Nouveau و Ouvrir و Enregistrer هي:',
      opt1: ['قائمة ملف (Fichier)', 'قائمة عرض (Affichage)', 'شريط المهام'],
      a1: 0,
      f1: 'صحيح! قائمة Fichier هي مركز إدارة الوثيقة.',
      q2: 'الاختصار السريع لأمر الحفظ (Enregistrer) هو:',
      opt2: ['Ctrl + S', 'Ctrl + Z', 'Alt + F4'],
      a2: 0,
      f2: 'ممتاز! S اختصار Save.',
      q3: 'لمشاهدة المستند كما سيظهر تماماً على الورق قبل طباعته نستخدم:',
      opt3: ['معاينة قبل الطباعة (Aperçu avant impression)', 'تكبير العدسة 500%', 'إغلاق الشاشة'],
      a3: 0,
      f3: 'أحسنت! المعاينة توفر الوقت والورق والحبر.'
    },
    wordBank: {
      sentence: 'لإنشاء مستند جديد ننقر [BLANK1] ولتثبيته نختار [BLANK2].',
      words: ['جديد (Nouveau)', 'حفظ (Enregistrer)', 'حذف', 'إغلاق'],
      assignments: { BLANK1: 'جديد (Nouveau)', BLANK2: 'حفظ (Enregistrer)' },
      explanation: 'Nouveau يبدأ المستند، و Enregistrer يثبته في الذاكرة الدائمة.'
    },
    bonusWhoAmI: {
      clues: ['أنا نافذة تنبهك قبل إغلاق أي مستند غير محفوظ.', 'أحمل ثلاثة خيارات: حفظ، عدم الحفظ، وإلغاء الأمر.', 'أحميك من إغلاق البرنامج سهواً وضياع تعبك.'],
      options: ['نافذة تأكيد الحفظ (Boîte de dialogue)', 'أداة الرسام', 'الآلة الحاسبة', 'المسطرة'],
      correctIndex: 0,
      explanation: 'نافذة الحوار التنبيهية تحمي المستخدم من فقدان بياناته عند إغلاق التطبيق.'
    }
  },

  'g1-l8': {
    id: 'g1-l8',
    gradeId: '1am',
    order: 8,
    title: 'كتابة نص مع توظيف المدقق الإملائي',
    domain: 'معالج النصوص • التحرير والتدقيق',
    coreKeyword: 'مدقق إملائي',
    scrambled: ['م', 'د', 'ق', 'ق', 'إ', 'م', 'ل', 'ا', 'ئ', 'ي'],
    whoAmI: {
      clues: ['أنا خط أحمر مموج صغير يظهر فجأة تحت كلمة كتبتها خطأً!', 'أنبهك إلى وجود خطأ في الرسم الإملائي للكلمة.', 'عند النقر فوقي بالزر الأيمن، أقترح عليك الكلمة الصحيحة فوراً.'],
      options: ['المدقق الإملائي (Correcteur orthographique)', 'مسطرة الهوامش', 'الفيروس', 'أداة الرسام'],
      correctIndex: 0,
      explanation: 'الخط الأحمر المموج يشير إلى خطأ إملائي ويساعدك المدقق في تصحيحه.'
    },
    speedSort: {
      cat1: { id: 'red', title: 'خط أحمر مموج (خطأ إملائي Orthographe)', color: 'from-rose-600 to-red-600' },
      cat2: { id: 'blue', title: 'خط أزرق / أخضر مموج (خطأ نحوي Grammaire)', color: 'from-blue-600 to-cyan-600' },
      items: [
        { id: 'e1', text: 'كتابة كلمة "مدرست" بالتاء المفتوحة عوض المربوطة', targetCategoryId: 'red' },
        { id: 'e2', text: 'عدم ترك مسافة بين الواو والكلمة أو تكرار المسافات', targetCategoryId: 'blue' },
        { id: 'e3', text: 'كتابة "كمبيوتر" بحروف فرنسية في نص عربي', targetCategoryId: 'red' },
        { id: 'e4', text: 'خطأ في تطابق الفعل مع الفاعل في الجمع', targetCategoryId: 'blue' }
      ],
      explanation: 'الأحمر للرسم الإملائي، والأزرق/الأخضر للقواعد والنحو وتنسيق المسافات.'
    },
    lightning: {
      statement: 'المدقق الإملائي في Word يعرف جميع الكلمات بنسبة 100% ولا يخطئ أبداً.',
      isTrue: false,
      explanation: 'خرافة! بعض الكلمات مثل الأسماء الجزائرية قد يعتبرها خطأ لأنها غير مضافة لقاموسه.'
    },
    thinkPair: {
      question: 'إذا كتب التلميذ اسمه أو اسم مدينته وظهر تحته خط أحمر، هل هذا يعني أنه أخطأ؟',
      think: 'هل القاموس المدمج يحتوي كل الألقاب وأسماء القرى الجزائرية؟',
      pair: 'ناقش زميلك: كيف نطلب من Word إضافة الاسم إلى القاموس (Ajouter au dictionnaire)؟',
      share: 'شارك الحل: ننقر بالزر الأيمن ونختار "إضافة إلى القاموس" أو "تجاهل الكل".',
      idealAnswer: 'لا، بل يعني أن الكلمة غير مسجلة في القاموس، ونحل ذلك باختيار "إضافة إلى القاموس".',
      tip: 'درب التلاميذ على النقر بالزر الأيمن على الكلمة المسطرة لاختيار البديل المناسب.'
    },
    memoryPairs: [
      { id: 'p1', term: 'إضافة إلى القاموس (Ajouter)', definition: 'تسجيل الكلمة الجديدة لعدم التسطير تحتها مستقبلاً' },
      { id: 'p2', term: 'تجاهل الكل (Ignorer tout)', definition: 'قبول الكلمة في هذا المستند دون تصحيحها' },
      { id: 'p3', term: 'المفتاح F7', definition: 'التشغيل الفوري للتدقيق الإملائي والنحوي الكامل' }
    ],
    spotGlitch: {
      scenario: 'كتب تلميذ نصاً وفيه أخطاء كثيرة، ولكنه لاحظ أن المدقق الإملائي لا يسطر تحت أي كلمة أبداً!',
      options: [
        { id: 'o1', text: 'لغة التدقيق محددة بالفرنسية والنص مكتوب بالعربية، فيجب ضبط لغة التدقيق على العربية', isGlitch: false, fixExplanation: 'صحيح! يجب تطابق لغة التدقيق مع لغة النص.' },
        { id: 'o2', text: 'الحاسوب نفد حبره', isGlitch: true, fixExplanation: 'خطأ غير منطقي.' },
        { id: 'o3', text: 'الشاشة غير متصلة بالإنترنت', isGlitch: true, fixExplanation: 'خطأ غير صحيح.' }
      ]
    },
    ladderSteps: {
      q1: 'المفتاح السريع لتشغيل التدقيق الإملائي والنحوي في Word هو:',
      opt1: ['F7', 'F1', 'F12'],
      a1: 0,
      f1: 'صحيح! F7 يبدأ فحص المستند كاملاً.',
      q2: 'الخط الأحمر المموج تحت الكلمة في Word يظهر عند الطباعة على الورق:',
      opt2: ['لا يظهر أبداً على الورق المطبوع', 'يُطبع بلون أحمر غامق', 'يقطع الورقة'],
      a2: 0,
      f2: 'ممتاز! الخط المموج إرشادي على الشاشة فقط ولا يُطبع.',
      q3: 'عند النقر بالزر الأيمن على كلمة تحتها خط أحمر يظهر:',
      opt3: ['قائمة بالاقتراحات الصحيحة للكلمة', 'لعبة فيديو', 'إغلاق الحاسوب'],
      a3: 0,
      f3: 'أحسنت! تظهر البدائل الإملائية المناسبة.'
    },
    wordBank: {
      sentence: 'يساعدنا المدقق الإملائي في تصحيح [BLANK1] بالضغط على المفتاح [BLANK2].',
      words: ['الأخطاء', 'F7', 'الصور', 'F1'],
      assignments: { BLANK1: 'الأخطاء', BLANK2: 'F7' },
      explanation: 'المدقق يصحح الأخطاء بمفتاح F7.'
    },
    bonusWhoAmI: {
      clues: ['أنا مفتاح على لوحة المفاتيح في صف الوظائف العلوي.', 'رقمي سبعة (7).', 'أفحص مستندك كاملاً من أوله إلى آخره وأصلح عثرات الإملاء.'],
      options: ['مفتاح F7', 'مفتاح المسافة Space', 'مفتاح الحذف Delete', 'مفتاح Enter'],
      correctIndex: 0,
      explanation: 'مفتاح F7 هو الاختصار العالمي للتدقيق الإملائي في حزمة أوفيس.'
    }
  }
};

// Builder function that constructs 10 starter games for any lesson config
export function buildStarterGamesForLesson(config: LessonMetaConfig): StarterGame[] {
  return [
    {
      id: `${config.id}-sg1`,
      lessonId: config.id,
      number: 1,
      title: 'لغز المفهوم: مَن أكون؟',
      strategyType: 'who_am_i',
      strategyTitle: 'استراتيجية مَن أكون؟ (L\'énigme du concept)',
      hookScenario: `وضعية انطلاقية لاكتشاف المفهوم المحوري لدرس "${config.title}".`,
      learningGoal: 'الاستدلال على المفهوم المستهدف من خلال مؤشرات وظيفية متدرجة.',
      whoAmIData: config.whoAmI
    },
    {
      id: `${config.id}-sg2`,
      lessonId: config.id,
      number: 2,
      title: 'فك شفرة الكلمة السرية',
      strategyType: 'word_scramble',
      strategyTitle: 'استراتيجية فك الشفرة (Anagramme)',
      hookScenario: 'حروف المصطلح مبعثرة! رتبها لكشف المصطلح المفتاحي للحصة.',
      learningGoal: 'تثبيت المصطلح التقني الدقيق الخاص بالدرس.',
      wordScrambleData: {
        scrambledLetters: config.scrambled,
        correctWord: config.coreKeyword,
        hint: `مصطلح أساسي في درس ${config.title}.`,
        explanation: `أحسنت! مصطلح "${config.coreKeyword}" هو جوهر درس اليوم.`
      }
    },
    {
      id: `${config.id}-sg3`,
      lessonId: config.id,
      number: 3,
      title: 'تحدي الفرز والتصنيف السريع',
      strategyType: 'speed_sort',
      strategyTitle: 'استراتيجية التصنيف السريع (Speed Sorting)',
      hookScenario: 'صنّف العناصر في الصندوقين المناسبين قبل بدء عرض الدرس!',
      learningGoal: 'التمييز بين فئات المفاهيم المتشابهة بدقة.',
      speedSortData: {
        instructions: `صنف كل عنصر إلى مجموعته الصحيحة في درس ${config.title}:`,
        categories: [config.speedSort.cat1, config.speedSort.cat2],
        items: config.speedSort.items,
        explanation: config.speedSort.explanation
      }
    },
    {
      id: `${config.id}-sg4`,
      lessonId: config.id,
      number: 4,
      title: 'سباق الثواني: حقيقة أم خرافة؟',
      strategyType: 'lightning_quiz',
      strategyTitle: 'استراتيجية سباق الثواني الموقوتة (Lightning Quiz)',
      hookScenario: 'اختبر سرعة بديهتك في 15 ثانية حول شائعة تقنية شائعة!',
      learningGoal: 'تصحيح التصورات الخاطئة والمفاهيم المغلوطة لدى التلاميذ.',
      lightningData: {
        statement: config.lightning.statement,
        isTrue: config.lightning.isTrue,
        explanation: config.lightning.explanation,
        timerSeconds: 15
      }
    },
    {
      id: `${config.id}-sg5`,
      lessonId: config.id,
      number: 5,
      title: 'تحدي فكر - زاوج - شارك',
      strategyType: 'think_pair_share',
      strategyTitle: 'استراتيجية فكر - زاوج - شارك (Think-Pair-Share)',
      hookScenario: 'وضعية مشكلة انطلاقية تثير التفكير الفردي والنقاش الثنائي مع زميل المقعد.',
      learningGoal: 'تفعيل التعلم التشاركي وتوليد الحلول البيداغوجية المتفاوض عليها.',
      thinkPairData: {
        question: config.thinkPair.question,
        stages: [
          { step: 'think', title: '1. فكر بمفردك (30 ثانية)', prompt: config.thinkPair.think, guidance: 'ركز في مكتسباتك وتجاربك السابقة مع الحاسوب.' },
          { step: 'pair', title: '2. زاوج مع زميلك (دقيقة)', prompt: config.thinkPair.pair, guidance: 'قارنا أفكاركما وتوافقا على تعليل منطقي مقنع.' },
          { step: 'share', title: '3. شارك الحل مع القسم', prompt: config.thinkPair.share, guidance: 'عرض جماعي يثري الحوار الصفي تحت إشراف الأستاذ.' }
        ],
        idealAnswer: config.thinkPair.idealAnswer,
        classroomTip: config.thinkPair.tip || 'مناقشة ثنائية تعزز التعلم التشاركي وتبادل الأفكار.'
      }
    },
    {
      id: `${config.id}-sg6`,
      lessonId: config.id,
      number: 6,
      title: 'بطاقات الذاكرة والمطابقة',
      strategyType: 'memory_match',
      strategyTitle: 'استراتيجية بطاقات الذاكرة (Memory Match)',
      hookScenario: 'اقلب البطاقات واعثر على الأزواج المتطابقة بين المصطلح ووظيفته.',
      learningGoal: 'الربط الذهني بين المصطلحات والمفاهيم بطريقة بصرية مرحة.',
      memoryMatchData: {
        pairs: config.memoryPairs
      }
    },
    {
      id: `${config.id}-sg7`,
      lessonId: config.id,
      number: 7,
      title: 'المحقق الرقمي: كشف الخطأ الشائع',
      strategyType: 'spot_the_glitch',
      strategyTitle: 'استراتيجية المحقق الرقمي (Spot the Glitch)',
      hookScenario: 'وقع خطأ في تطبيق هذا المفهوم! تقمص دور المحقق واكتشف سبب الخلل.',
      learningGoal: 'تنمية الحس النقدي والقدرة على تصحيح الأخطاء التشغيلية.',
      spotGlitchData: {
        scenarioDescription: config.spotGlitch.scenario,
        options: config.spotGlitch.options
      }
    },
    {
      id: `${config.id}-sg8`,
      lessonId: config.id,
      number: 8,
      title: 'سلم التحدي المعرفي (3 درجات)',
      strategyType: 'challenge_ladder',
      strategyTitle: 'استراتيجية سلم التحدي (Challenge Ladder)',
      hookScenario: 'تسلق درجات السلم الثلاث من المكتسبات السابقة نحو موضوع اليوم!',
      learningGoal: 'التقويم التشخيصي المتدرج لصعود المفاهيم.',
      challengeLadderData: {
        steps: [
          {
            stepLevel: 1,
            question: config.ladderSteps.q1,
            options: config.ladderSteps.opt1,
            correctAnswer: config.ladderSteps.a1,
            feedback: config.ladderSteps.f1
          },
          {
            stepLevel: 2,
            question: config.ladderSteps.q2,
            options: config.ladderSteps.opt2,
            correctAnswer: config.ladderSteps.a2,
            feedback: config.ladderSteps.f2
          },
          {
            stepLevel: 3,
            question: config.ladderSteps.q3,
            options: config.ladderSteps.opt3,
            correctAnswer: config.ladderSteps.a3,
            feedback: config.ladderSteps.f3
          }
        ]
      }
    },
    {
      id: `${config.id}-sg9`,
      lessonId: config.id,
      number: 9,
      title: 'صندوق الكلمات الذكية',
      strategyType: 'smart_word_bank',
      strategyTitle: 'استراتيجية بنك الكلمات (Word Bank)',
      hookScenario: 'أكمل الفراغات بالكلمات المناسبة لتستنتج الخلاصة الذهبية للحصة.',
      learningGoal: 'الصياغة السليمة للقواعد والمصطلحات المعلوماتية.',
      smartWordBankData: {
        sentenceWithBlanks: config.wordBank.sentence,
        wordBank: config.wordBank.words,
        correctAssignments: config.wordBank.assignments,
        explanation: config.wordBank.explanation
      }
    },
    {
      id: `${config.id}-sg10`,
      lessonId: config.id,
      number: 10,
      title: 'لغز المفهوم الختامي المشوق',
      strategyType: 'who_am_i',
      strategyTitle: 'استراتيجية حزورة المفهوم الانطلاقية',
      hookScenario: `لغز تشويقي ختامي يربط درس "${config.title}" بالنشاط التطبيقي المباشر.`,
      learningGoal: 'إشعال الحافز والدافعية قبل الانتقال للأنشطة التطبيقية.',
      whoAmIData: config.bonusWhoAmI
    }
  ];
}
