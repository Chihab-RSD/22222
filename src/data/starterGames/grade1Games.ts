import { StarterGame } from '../../types/starterGames';

export const grade1StarterGames: Record<string, StarterGame[]> = {
  // ==========================================
  // Lesson 1: تعريف المعلوماتية والحاسوب (g1-l1)
  // ==========================================
  'g1-l1': [
    {
      id: 'g1-l1-sg1',
      lessonId: 'g1-l1',
      number: 1,
      title: 'لغز المفهوم: مَن أكون؟',
      strategyType: 'who_am_i',
      strategyTitle: 'استراتيجية مَن أكون؟ (L\'énigme du concept)',
      hookScenario: 'جهاز غيّر وجه العالم في القرن العشرين، يعمل بالكهرباء ويعالج مليارات العمليات!',
      learningGoal: 'الاستدلال على مفهوم جهاز الحاسوب من خلال خصائصه الوظيفية الأساسية.',
      whoAmIData: {
        clues: [
          'أنا جهاز إلكتروني مبرمج أتغذى على التيار الكهربائي.',
          'استقبل البيانات الخام (Données) وأجري عليها معالجة آلية دقيقة وسريعة.',
          'أخرج لك النتائج على شكل معلومات مفيدة وأحفظها في ذاكرتي.'
        ],
        options: ['جهاز الحاسوب (L’ordinateur)', 'جهاز التلفاز', 'الآلة الكاتبة اليدوية', 'ساعة الحائط'],
        correctIndex: 0,
        explanation: 'أحسنت! هذا هو تعريف الحاسوب: جهاز إلكتروني يستقبل البيانات، يعالجها ويخرج المعلومات.'
      }
    },
    {
      id: 'g1-l1-sg2',
      lessonId: 'g1-l1',
      number: 2,
      title: 'فك شفرة الكلمة السرية',
      strategyType: 'word_scramble',
      strategyTitle: 'استراتيجية فك الشفرة (Anagramme)',
      hookScenario: 'الحروف مبعثرة! رتب الحروف لتكتشف اسم العلم الذي ندرسه اليوم.',
      learningGoal: 'ترسيخ المصطلح الدقيق لعلم المعلوماتية باللغة العربية.',
      wordScrambleData: {
        scrambledLetters: ['م', 'ع', 'ل', 'و', 'م', 'ا', 'ت', 'ي', 'ة'],
        correctWord: 'معلوماتية',
        hint: 'علم المعالجة الآلية للمعلومات.',
        explanation: 'ممتاز! المعلوماتية هي الترجمة العربية لمصطلح Informatique المشتق من Information و Automatique.'
      }
    },
    {
      id: 'g1-l1-sg3',
      lessonId: 'g1-l1',
      number: 3,
      title: 'فرز السرعة: بيانات أم معلومات؟',
      strategyType: 'speed_sort',
      strategyTitle: 'استراتيجية التصنيف السريع (Speed Sorting)',
      hookScenario: 'صنّف العناصر التالية في الصندوق المناسب قبل انطلاق الدرس!',
      learningGoal: 'التمييز الدقيق بين المادة الخام (البيانات) والمادة المعالجة (المعلومات).',
      speedSortData: {
        instructions: 'صنف كل عنصر: هل هو بيان خام (Donnée) أم معلومة ذات معنى (Information)؟',
        categories: [
          { id: 'data', title: 'بيانات خام (Données)', color: 'from-amber-600 to-orange-600' },
          { id: 'info', title: 'معلومات معالجة (Information)', color: 'from-emerald-600 to-teal-600' }
        ],
        items: [
          { id: 'i1', text: 'أرقام متفرقة: 15 ، 12 ، 18', targetCategoryId: 'data' },
          { id: 'i2', text: 'كشف نقاط التلميذ مع المعدل السنوي 15/20', targetCategoryId: 'info' },
          { id: 'i3', text: 'أحرف مبعثرة: أ، ح، م، د', targetCategoryId: 'data' },
          { id: 'i4', text: 'قائمة الناجحين في شهادة التعليم المتوسط مرتبة أبجدياً', targetCategoryId: 'info' }
        ],
        explanation: 'رائع! البيانات هي حقائق وأرقام أولية مجردة، والمعلومات هي ناتج معالجتها وتنظيمها.'
      }
    },
    {
      id: 'g1-l1-sg4',
      lessonId: 'g1-l1',
      number: 4,
      title: 'سباق الثواني: حقيقة أم خرافة؟',
      strategyType: 'lightning_quiz',
      strategyTitle: 'استراتيجية حقيقة أم خرافة رقمية (Truth or Myth)',
      hookScenario: 'هل يستطيع الحاسوب أن يفكر ويبتكر من تلقاء نفسه بدون تعليمات الإنسان؟',
      learningGoal: 'إدراك أن الحاسوب آلة خاضعة للبرمجة البشرية ولا تمتلك عقلاً مستقلاً.',
      lightningData: {
        statement: 'الحاسوب جهاز فائق الذكاء يفكر بمفرده ويتخذ قرارات دون برامج كتبها الإنسان.',
        isTrue: false,
        explanation: 'خرافة! الحاسوب ينفذ فقط الأوامر والبرامج التي أعدها المبرمج البشري بدقة.',
        timerSeconds: 15
      }
    },
    {
      id: 'g1-l1-sg5',
      lessonId: 'g1-l1',
      number: 5,
      title: 'تحدي فكر - زاوج - شارك',
      strategyType: 'think_pair_share',
      strategyTitle: 'استراتيجية فكر - زاوج - شارك (Think-Pair-Share)',
      hookScenario: 'تخيل أن جميع حواسيب العالم توقفت فجأة لمدة 24 ساعة! ماذا سيحدث للمستشفيات، البنوك، والمطارات؟',
      learningGoal: 'استشعار الأهمية الحيوية لعلم المعلوماتية في الحياة المعاصرة.',
      thinkPairData: {
        question: 'كيف تسهم المعلوماتية في تنظيم حياة المجتمع العصري؟',
        stages: [
          { step: 'think', title: '1. فكر بمفردك (30 ثانية)', prompt: 'اكتب في ذهنك 3 قطاعات تتوقف كلياً إذا تعطلت الحواسيب.', guidance: 'تذكر: الصحة، النقل، التعليم، والاتصالات.' },
          { step: 'pair', title: '2. زاوج مع زميلك (دقيقة)', prompt: 'قارن إجابتك مع زميل المقعد واختارا أهم قطاعين.', guidance: 'ناقشا معاً: هل المعالجة اليدوية الورقية قادرة على تعويض الحاسوب؟' },
          { step: 'share', title: '3. شارك الحل مع القسم', prompt: 'اعرض النتيجة المشتركة أمام زملائك والأستاذ.', guidance: 'الاستنتاج: المعلوماتية توفر السرعة الفائقة، الدقة المتناهية، والقدرة التخزينية الهائلة.' }
        ],
        idealAnswer: 'المعلوماتية ركيزة المجتمع الحديث: تعالج بيانات المرضى، تدير حركة الطيران، وتنسق المعاملات المالية بدقة لا تضاهى.',
        classroomTip: 'اطلب من تلميذين تقديم خلاصة المقارنة بين الإدارة الورقية القديمة والإدارة الرقمية.'
      }
    },
    {
      id: 'g1-l1-sg6',
      lessonId: 'g1-l1',
      number: 6,
      title: 'بطاقات الذاكرة: مراحل المعالجة',
      strategyType: 'memory_match',
      strategyTitle: 'استراتيجية بطاقات الذاكرة (Memory Match)',
      hookScenario: 'طابق بين مرحلة معالجة المعلومات والنشاط الدال عليها.',
      learningGoal: 'استيعاب مخطط عمل الحاسوب: إدخال ← معالجة ← إخراج.',
      memoryMatchData: {
        pairs: [
          { id: 'p1', term: 'إدخال (Entrée)', definition: 'كتابة النص بواسطة لوحة المفاتيح' },
          { id: 'p2', term: 'معالجة (Traitement)', definition: 'حساب حاصل الجمع ومقارنة القيم في المعالج' },
          { id: 'p3', term: 'إخراج (Sortie)', definition: 'عرض النتيجة على الشاشة أو طباعتها على الورق' }
        ]
      }
    },
    {
      id: 'g1-l1-sg7',
      lessonId: 'g1-l1',
      number: 7,
      title: 'المحقق الرقمي: المفهوم الدخيل',
      strategyType: 'spot_the_glitch',
      strategyTitle: 'استراتيجية المحقق الرقمي (Spot the Glitch)',
      hookScenario: 'أحد العناصر الأربعة التالية لا ينتمي إلى مميزات المعالجة الآلية للمعلومات، اكتشفه!',
      learningGoal: 'التعرف على الخصائص الجوهرية لمعالجة الحاسوب للبيانات.',
      spotGlitchData: {
        scenarioDescription: 'أي من العناصر التالية ليس من خصائص ومميزات الحاسوب؟',
        options: [
          { id: 'o1', text: 'السرعة الفائقة في إنجاز العمليات', isGlitch: false, fixExplanation: 'خاصية صحيحة للحاسوب.' },
          { id: 'o2', text: 'الدقة العالية وتفادي الأخطاء البشرية', isGlitch: false, fixExplanation: 'خاصية صحيحة للحاسوب.' },
          { id: 'o3', text: 'الشعور بالتعب والملل بعد العمل لعدة ساعات', isGlitch: true, fixExplanation: 'هذا هو الخطأ الدخيل! الحاسوب آلة لا تتعب ولا تمل ويمكنها العمل دون انقطاع.' },
          { id: 'o4', text: 'القدرة على تخزين كميات هائلة من المعلومات', isGlitch: false, fixExplanation: 'خاصية صحيحة للحاسوب.' }
        ]
      }
    },
    {
      id: 'g1-l1-sg8',
      lessonId: 'g1-l1',
      number: 8,
      title: 'سلم التحدي المعرفي (3 درجات)',
      strategyType: 'challenge_ladder',
      strategyTitle: 'استراتيجية سلم التحدي (Challenge Ladder)',
      hookScenario: 'اصعد درجات السلم المعرفي الثلاث قبل بداية شرح الدرس!',
      learningGoal: 'التدرج من المفهوم البسيط إلى المفهوم التركيبي لعلم المعلوماتية.',
      challengeLadderData: {
        steps: [
          {
            stepLevel: 1,
            question: 'الدرجة 1: كلمة "Informatique" مشتقة من دمج كلمتي:',
            options: ['Information + Automatique', 'Internet + Formulaire', 'Info + Mathématique'],
            correctAnswer: 0,
            feedback: 'صحيح! معلومات + آلية.'
          },
          {
            stepLevel: 2,
            question: 'الدرجة 2: وظيفة وحدة المعالجة المركزية (CPU) في الحاسوب تشبه:',
            options: ['عقل وقلب الإنسان النابض', 'النافذة الزجاجية', 'حاوية المهملات'],
            correctAnswer: 0,
            feedback: 'ممتاز! المعالج هو العقل المدبر.'
          },
          {
            stepLevel: 3,
            question: 'الدرجة 3: الفرق الأساسي بين الحاسوب والآلة الحاسبة البسيطة هو:',
            options: ['الحاسوب جهاز قابل للبرمجة ويخزن المعلومات وينفذ مهام متعددة', 'الحاسوب أرخص ثمناً', 'لا يوجد أي فرق'],
            correctAnswer: 0,
            feedback: 'تهانينا! لقد صعدت قمة سلم التحدي المعرفي بنجاح.'
          }
        ]
      }
    },
    {
      id: 'g1-l1-sg9',
      lessonId: 'g1-l1',
      number: 9,
      title: 'صندوق الكلمات الذكية',
      strategyType: 'smart_word_bank',
      strategyTitle: 'استراتيجية بنك الكلمات (Word Bank)',
      hookScenario: 'أكمل الفراغات بالكلمات المناسبة لتصنع قاعدة الدرس الذهبية.',
      learningGoal: 'صياغة الخلاصة البيداغوجية الشاملة لتعريف المعلوماتية.',
      smartWordBankData: {
        sentenceWithBlanks: 'المعلوماتية هي علم معالجة [BLANK1] بطريقة [BLANK2] باستعمال جهاز [BLANK3].',
        wordBank: ['المعلومات', 'آلية', 'الحاسوب', 'يدوية', 'الورق'],
        correctAssignments: {
          BLANK1: 'المعلومات',
          BLANK2: 'آلية',
          BLANK3: 'الحاسوب'
        },
        explanation: 'العبارة الكاملة: المعلوماتية هي علم معالجة المعلومات بطريقة آلية باستعمال جهاز الحاسوب.'
      }
    },
    {
      id: 'g1-l1-sg10',
      lessonId: 'g1-l1',
      number: 10,
      title: 'لغز المفهوم 2: وسيط الإخراج',
      strategyType: 'who_am_i',
      strategyTitle: 'استراتيجية مَن أكون؟ الختامية',
      hookScenario: 'أداة تنقل أفكارك من العالم الافتراضي إلى الورق الملموس!',
      learningGoal: 'التهيئة للدرس القادم (مكونات الحاسوب ووحدات الإخراج).',
      whoAmIData: {
        clues: [
          'أنا ملحقة من ملحقات الحاسوب المتصلة بالوحدة المركزية.',
          'استعمل الحبر والورق الأبيض لعملي.',
          'أخرج لك النصوص والصور والرسومات المطبوعة.'
        ],
        options: ['الطابعة (Imprimante)', 'لوحة المفاتيح', 'الماسح الضوئي', 'مكبر الصوت'],
        correctIndex: 0,
        explanation: 'أحسنت! الطابعة هي جهاز إخراج رئيسي يحول المستند الرقمي إلى مستند ورقي.'
      }
    }
  ],

  // ==========================================
  // Lesson 2: مكونات الحاسوب (g1-l2)
  // ==========================================
  'g1-l2': [
    {
      id: 'g1-l2-sg1',
      lessonId: 'g1-l2',
      number: 1,
      title: 'مَن أكون؟ العقل المدبر للحاسوب',
      strategyType: 'who_am_i',
      strategyTitle: 'استراتيجية مَن أكون؟ (Who Am I?)',
      hookScenario: 'قطعة إلكترونية صغيرة مساحتها بضعة سنتيمترات مربعة، لكنها تدير ملايين العمليات في الثانية!',
      learningGoal: 'التعرف على وحدة المعالجة المركزية (CPU) وأهميتها في عتاد الحاسوب.',
      whoAmIData: {
        clues: [
          'أوجد داخل الصندوق المعدني على اللوحة الأم (Carte mère).',
          'أقيس سرعتي بالجيغاهرتز (GHz).',
          'أقوم بجميع الحسابات الرياضية والمنطقية والتحكم في سائر القطع.'
        ],
        options: ['المعالج (Le Processeur / CPU)', 'القرص الصلب', 'لوحة المفاتيح', 'مزود الطاقة'],
        correctIndex: 0,
        explanation: 'المعالج (CPU) هو عقل الحاسوب وأهم مكوّن في الوحدة المركزية.'
      }
    },
    {
      id: 'g1-l2-sg2',
      lessonId: 'g1-l2',
      number: 2,
      title: 'فرز السرعة: عتاد مادي أم برمجيات؟',
      strategyType: 'speed_sort',
      strategyTitle: 'استراتيجية الفرز الثنائي (Hardware vs Software)',
      hookScenario: 'قسّم عناصر الحاسوب إلى ما يمكن لمسه باليد وما لا يمكن لمسه!',
      learningGoal: 'التمييز بين العتاد المادي (Hardware) والبرمجيات (Software).',
      speedSortData: {
        instructions: 'صنف كل عنصر: عتاد مادي ملموس (Hardware) أم برنامج غير ملموس (Software)؟',
        categories: [
          { id: 'hw', title: 'عتاد مادي (Hardware)', color: 'from-blue-600 to-indigo-600' },
          { id: 'sw', title: 'برمجيات (Software)', color: 'from-purple-600 to-pink-600' }
        ],
        items: [
          { id: 'e1', text: 'الفأرة ولوحة المفاتيح', targetCategoryId: 'hw' },
          { id: 'e2', text: 'نظام التشغيل Windows', targetCategoryId: 'sw' },
          { id: 'e3', text: 'الشاشة ووحدة المعالجة', targetCategoryId: 'hw' },
          { id: 'e4', text: 'برنامج الرسام Paint', targetCategoryId: 'sw' }
        ],
        explanation: 'العتاد هو الأجزاء الصلبة الملموسة، بينما البرمجيات هي التطبيقات والأوامر الرقمية.'
      }
    },
    {
      id: 'g1-l2-sg3',
      lessonId: 'g1-l2',
      number: 3,
      title: 'فك شفرة القطعة الأساسية',
      strategyType: 'word_scramble',
      strategyTitle: 'استراتيجية فك الشفرة (Word Scramble)',
      hookScenario: 'رتب الحروف لتتعرف على لوحة التوصيل الكبرى داخل الحاسوب.',
      learningGoal: 'معرفة مصطلح اللوحة الأم ودورها الجامع لقطع الحاسوب.',
      wordScrambleData: {
        scrambledLetters: ['ل', 'و', 'ح', 'ة', 'ا', 'ل', 'أ', 'م'],
        correctWord: 'لوحة الأم',
        hint: 'اللوحة الكبيرة التي تُركب عليها كل المكونات الداخلية (Carte mère).',
        explanation: 'صحيح! اللوحة الأم هي الحاضنة الرئيسية للمعالج والذواكر وكافة البطاقات.'
      }
    },
    {
      id: 'g1-l2-sg4',
      lessonId: 'g1-l2',
      number: 4,
      title: 'سباق الثواني: ذاكرة RAM المتقلبة',
      strategyType: 'lightning_quiz',
      strategyTitle: 'استراتيجية حقيقة أم خرافة (Lightning Quiz)',
      hookScenario: 'ماذا يحدث للمعلومات المخزنة في الذاكرة الحية (RAM) عند انقطاع الكهرباء فجأة؟',
      learningGoal: 'فهم خاصية تطاير الذاكرة الحية (Mémoire vive).',
      lightningData: {
        statement: 'الذاكرة الحية (RAM) تحتفظ ببياناتها حتى لو انقطع التيار الكهربائي عن الحاسوب تماماً.',
        isTrue: false,
        explanation: 'خرافة! الذاكرة الحية RAM ذاكرة متطايرة، تفقد كل محتوياتها فور انقطاع التيار الكهربائي.',
        timerSeconds: 15
      }
    },
    {
      id: 'g1-l2-sg5',
      lessonId: 'g1-l2',
      number: 5,
      title: 'فكر - زاوج - شارك: منفذ الإدخال السحري',
      strategyType: 'think_pair_share',
      strategyTitle: 'استراتيجية فكر - زاوج - شارك',
      hookScenario: 'أردت إدخال صورة فوتوغرافية مرسومة على ورقة حقيقية إلى داخل الحاسوب، ما الأداة اللازمة؟',
      learningGoal: 'استنتاج دور الماسح الضوئي (Scanner) كأداة إدخال رقمي.',
      thinkPairData: {
        question: 'ما الجهاز الذي ينقل الصورة الورقية إلى صيغة رقمية داخل الحاسوب؟',
        stages: [
          { step: 'think', title: '1. فكر بمفردك', prompt: 'تذكر أجهزة الإدخال التي تراها في مقهى الإنترنت أو المدرسة.', guidance: 'عكس عمل الطابعة تماماً.' },
          { step: 'pair', title: '2. زاوج مع زميلك', prompt: 'ناقش زميلك: هل الكاميرا الرقمية والماسح الضوئي يؤديان نفس الغرض؟', guidance: 'كلاهما جهاز إدخال للصور.' },
          { step: 'share', title: '3. شارك الحل', prompt: 'قدما الحل معاً للقسم.', guidance: 'الماسح الضوئي (Scanner) يمسح الصورة ضوئياً ويرسلها كملف إلى الحاسوب.' }
        ],
        idealAnswer: 'الماسح الضوئي (Scanner) والكاميرا الرقمية هما وحدتا إدخال الصور إلى ذاكرة الحاسوب.',
        classroomTip: 'وضح للقسم الفرق بين الإدخال (Scanner) والإخراج (Imprimante).'
      }
    },
    {
      id: 'g1-l2-sg6',
      lessonId: 'g1-l2',
      number: 6,
      title: 'بطاقات الذاكرة: وحدات الإدخال والإخراج',
      strategyType: 'memory_match',
      strategyTitle: 'استراتيجية بطاقات الذاكرة',
      hookScenario: 'طابق كل جهاز بوظيفته الإدخالية أو الإخراجية.',
      learningGoal: 'تصنيف الطرفيات (Périphériques) بدقة.',
      memoryMatchData: {
        pairs: [
          { id: 'm1', term: 'لوحة المفاتيح (Clavier)', definition: 'وحدة إدخال نصوص وأوامر' },
          { id: 'm2', term: 'الشاشة (Écran)', definition: 'وحدة إخراج بصرية للمعلومات' },
          { id: 'm3', term: 'مكبر الصوت (Haut-parleur)', definition: 'وحدة إخراج صوتية' }
        ]
      }
    },
    {
      id: 'g1-l2-sg7',
      lessonId: 'g1-l2',
      number: 7,
      title: 'المحقق الرقمي: كشف المكون الدخيل',
      strategyType: 'spot_the_glitch',
      strategyTitle: 'استراتيجية المحقق الرقمي (Spot the Glitch)',
      hookScenario: 'الأستاذ كتب قائمة بأجهزة الإدخال (Périphériques d\'entrée)، لكن تلميذاً أضاف جهازاً خاطئاً!',
      learningGoal: 'التمييز الدقيق لوحدات الإدخال واستبعاد وحدات الإخراج.',
      spotGlitchData: {
        scenarioDescription: 'أي من العناصر التالية ليس من أجهزة الإدخال (Entrée)؟',
        options: [
          { id: 'o1', text: 'الفأرة (Souris)', isGlitch: false, fixExplanation: 'جهاز إدخال.' },
          { id: 'o2', text: 'شاشة العرض العادية (Écran)', isGlitch: true, fixExplanation: 'هذا هو الخطأ! الشاشة العادية وحدة إخراج (Sortie) وليست وحدة إدخال.' },
          { id: 'o3', text: 'الميكروفون (Microphone)', isGlitch: false, fixExplanation: 'جهاز إدخال صوت.' },
          { id: 'o4', text: 'لوحة المفاتيح (Clavier)', isGlitch: false, fixExplanation: 'جهاز إدخال نص.' }
        ]
      }
    },
    {
      id: 'g1-l2-sg8',
      lessonId: 'g1-l2',
      number: 8,
      title: 'سلم التحدي: مكونات الحاسوب',
      strategyType: 'challenge_ladder',
      strategyTitle: 'استراتيجية سلم التحدي المعرفي',
      hookScenario: 'ارتقِ في درجات معرفة عتاد الحاسوب.',
      learningGoal: 'تقويم المكتسبات القبلية حول عتاد الحاسوب.',
      challengeLadderData: {
        steps: [
          {
            stepLevel: 1,
            question: 'أين تُحفظ الملفات بصفة دائمة حتى بعد إطفاء الحاسوب؟',
            options: ['القرص الصلب (Disque dur)', 'الذاكرة الحية (RAM)', 'سلك التغذية'],
            correctAnswer: 0,
            feedback: 'صحيح! القرص الصلب وسيلة تخزين دائمة.'
          },
          {
            stepLevel: 2,
            question: 'ما هو دور الذاكرة الميتة (ROM)؟',
            options: ['تحتوي برامج الإقلاع الأساسية للحاسوب من المصنع ولا يمكن مسحها بسهولة', 'تستخدم للرسم فقط', 'تخزن ألعاب الفيديو'],
            correctAnswer: 0,
            feedback: 'رائع! الذاكرة الميتة ثابتة ودائمة.'
          },
          {
            stepLevel: 3,
            question: 'أي جهاز يعتبر وحدة إدخال وإخراج في نفس الوقت؟',
            options: ['شاشة اللمس (Écran tactile)', 'لوحة المفاتيح فقط', 'مكبر الصوت'],
            correctAnswer: 0,
            feedback: 'ممتاز! شاشة اللمس تعرض وتستقبل اللمس معاً.'
          }
        ]
      }
    },
    {
      id: 'g1-l2-sg9',
      lessonId: 'g1-l2',
      number: 9,
      title: 'صندوق الكلمات: تشريح الوحدة المركزية',
      strategyType: 'smart_word_bank',
      strategyTitle: 'استراتيجية بنك الكلمات',
      hookScenario: 'ركب الجملة المفتاحية للوحدة المركزية.',
      learningGoal: 'تجميع المفاهيم الأساسية للمكونات الداخلية.',
      smartWordBankData: {
        sentenceWithBlanks: 'تتصل جميع مكونات الحاسوب الداخلية بـ [BLANK1]، وتتم معالجة الأوامر في [BLANK2].',
        wordBank: ['اللوحة الأم', 'المعالج', 'الفأرة', 'الشاشة'],
        correctAssignments: {
          BLANK1: 'اللوحة الأم',
          BLANK2: 'المعالج'
        },
        explanation: 'اللوحة الأم تربط المكونات، والمعالج يقوم بالمعالجة المركزية.'
      }
    },
    {
      id: 'g1-l2-sg10',
      lessonId: 'g1-l2',
      number: 10,
      title: 'لغز المفهوم: وسيط النقر والتوجيه',
      strategyType: 'who_am_i',
      strategyTitle: 'استراتيجية مَن أكون؟',
      hookScenario: 'أداة صغيرة في يدك تجوب الشاشة بمؤشر سهمي رشيق!',
      learningGoal: 'الاستدلال على الفأرة ومؤشرها ودورها التفاعلي.',
      whoAmIData: {
        clues: [
          'أحمل اسم حيوان صغير وسريع الحركة.',
          'لدي زر أيمن وزر أيسر وعجلة تمرير في الوسط.',
          'أتحكم بمؤشر السهم على الشاشة لتحديد واختيار الأيقونات.'
        ],
        options: ['فأرة الحاسوب (Souris)', 'لوحة المفاتيح', 'السماعة', 'المعالج'],
        correctIndex: 0,
        explanation: 'فأرة الحاسوب (Souris) هي أداة التأشير الأساسية في الواجهة الرسومية.'
      }
    }
  ],

  // ==========================================
  // Lesson 3: برنامج الرسام (g1-l3)
  // ==========================================
  'g1-l3': [
    {
      id: 'g1-l3-sg1',
      lessonId: 'g1-l3',
      number: 1,
      title: 'مَن أكون؟ أداة التلوين السحرية',
      strategyType: 'who_am_i',
      strategyTitle: 'استراتيجية مَن أكون؟',
      hookScenario: 'أداة تملأ الشكل المغلق كاملاً بلون واحد بنقرة واحدة سريعة!',
      learningGoal: 'التعرف على أداة ملء الألوان (دلو الطلاء) في برنامج الرسام Paint.',
      whoAmIData: {
        clues: [
          'رمزي يشبه دلواً ينسكب منه الطلاء الملون.',
          'إذا كانت مساحتي مغلقة تماماً، ألوّنها بالكامل بضغطة زر واحدة.',
          'إذا كان في الشكل ثقب صغير، يتسرب لوني إلى كامل خلفية الرسمة!'
        ],
        options: ['أداة ملء اللون (Remplissage)', 'قلم الرصاص', 'الممحاة', 'العدسة المكبرة'],
        correctIndex: 0,
        explanation: 'أداة ملء اللون (Remplissage avec couleur) تملأ أي مساحة مغلقة فوراً.'
      }
    },
    {
      id: 'g1-l3-sg2',
      lessonId: 'g1-l3',
      number: 2,
      title: 'فك شفرة البرنامج الإبداعي',
      strategyType: 'word_scramble',
      strategyTitle: 'استراتيجية فك الشفرة',
      hookScenario: 'رتب الحروف لمعرفة اسم البرنامج الممتع الذي سنرسم به اليوم.',
      learningGoal: 'التعرف على الاسم العربي والفرنسي لبرنامج الرسم.',
      wordScrambleData: {
        scrambledLetters: ['ا', 'ل', 'ر', 'س', 'ا', 'م'],
        correctWord: 'الرسام',
        hint: 'برنامج مدمج في Windows لتعديل وإنشاء الصور والرسوم (Paint).',
        explanation: 'برنامج الرسام (Paint) هو من أوائل البرامج الرسومية التي يتعلمها التلميذ.'
      }
    },
    {
      id: 'g1-l3-sg3',
      lessonId: 'g1-l3',
      number: 3,
      title: 'فرز السرعة: أدوات الرسام vs أدوات الكتابة',
      strategyType: 'speed_sort',
      strategyTitle: 'استراتيجية التصنيف السريع',
      hookScenario: 'صنّف الأدوات التالية بين ما ينتمي للرسام وما ينتمي لمعالج النصوص!',
      learningGoal: 'تحديد الأدوات الخاصة بالبيئة الرسومية.',
      speedSortData: {
        instructions: 'صنف الأداة: هل هي أداة رسم وتلوين أم أداة تنسيق نصوص؟',
        categories: [
          { id: 'paint', title: 'أدوات الرسام Paint', color: 'from-rose-600 to-red-600' },
          { id: 'word', title: 'أدوات النصوص Word', color: 'from-blue-600 to-indigo-600' }
        ],
        items: [
          { id: 't1', text: 'بخاخ الألوان والممحاة والفرشاة', targetCategoryId: 'paint' },
          { id: 't2', text: 'التدقيق الإملائي وتسطير الكلمات', targetCategoryId: 'word' },
          { id: 't3', text: 'شكل المستطيل والدائرة ودلو الطلاء', targetCategoryId: 'paint' },
          { id: 't4', text: 'محاذاة النص وتغيير حجم الخط', targetCategoryId: 'word' }
        ],
        explanation: 'ممتاز! الرسام يركز على الرسومات النقطية والأشكال، والوورد على النصوص.'
      }
    },
    {
      id: 'g1-l3-sg4',
      lessonId: 'g1-l3',
      number: 4,
      title: 'سباق الثواني: التراجع السحري Ctrl+Z',
      strategyType: 'lightning_quiz',
      strategyTitle: 'استراتيجية سباق الثواني',
      hookScenario: 'رسمت خطأً وأردت إلغاء آخر حركة قمت بها فوراً، هل هذا ممكن؟',
      learningGoal: 'معرفة دور أمر التراجع (Annuler / Ctrl+Z).',
      lightningData: {
        statement: 'إذا أخطأت في برنامج الرسام، لا يمكنك التراجع أبداً ويجب إعادة الرسم من البداية.',
        isTrue: false,
        explanation: 'خرافة! الضغط على زر التراجع (Ctrl+Z) يلغي آخر عملية قمت بها في غمضة عين.',
        timerSeconds: 15
      }
    },
    {
      id: 'g1-l3-sg5',
      lessonId: 'g1-l3',
      number: 5,
      title: 'فكر - زاوج - شارك: رسم الدائرة المنتظمة',
      strategyType: 'think_pair_share',
      strategyTitle: 'استراتيجية فكر - زاوج - شارك',
      hookScenario: 'كيف ترسم دائرة تامة الاستدارة أو مربعاً متساوي الأضلاع في الرسام دون أن يصبح الشكل بيضاوياً؟',
      learningGoal: 'اكتشاف زر Shift في لوحة المفاتيح أثناء رسم الأشكال.',
      thinkPairData: {
        question: 'ما المفتاح الذي نضغط عليه مع الفأرة لنرسم دائرة كاملة الاستدارة؟',
        stages: [
          { step: 'think', title: '1. فكر بمفردك', prompt: 'تذكر مفاتيح التحكم الخاصة في لوحة المفاتيح.', guidance: 'مفتاح يثبت النسبة المتساوية للطول والعرض.' },
          { step: 'pair', title: '2. زاوج مع زميلك', prompt: 'جربا تخمين المفتاح: هل هو مفتاح المسافة أم مفتاح Shift (العالي)؟', guidance: 'مفتاح Shift معروف بفرض الأبعاد المنتظمة.' },
          { step: 'share', title: '3. شارك الحل', prompt: 'أعلنا النتيجة للأستاذ والزملاء.', guidance: 'الضغط المطول على مفتاح Shift أثناء السحب يرسم دائرة ومربعاً ومستقيماً تاماً.' }
        ],
        idealAnswer: 'مفتاح Shift (العالي) يحافظ على التناسب المتساوي عند رسم الدوائر والمربعات.',
        classroomTip: 'شجع التلاميذ على تجربة زر Shift عملياً أثناء الحصة.'
      }
    },
    {
      id: 'g1-l3-sg6',
      lessonId: 'g1-l3',
      number: 6,
      title: 'بطاقات الذاكرة: أيقونات الرسام',
      strategyType: 'memory_match',
      strategyTitle: 'استراتيجية بطاقات الذاكرة',
      hookScenario: 'طابق اسم أداة الرسام مع وظيفتها.',
      learningGoal: 'ربط أداة الرسام بالوظيفة البصرية.',
      memoryMatchData: {
        pairs: [
          { id: 'p1', term: 'الممحاة (Gomme)', definition: 'مسح الأجزاء غير المرغوبة من الرسمة' },
          { id: 'p2', term: 'العدسة المكبرة (Loupe)', definition: 'تكبير جزء دقيق لرسم تفاصيل صغيرة' },
          { id: 'p3', term: 'القطارة (Pipette)', definition: 'التقاط نفس اللون الموجود في جزء من الصورة' }
        ]
      }
    },
    {
      id: 'g1-l3-sg7',
      lessonId: 'g1-l3',
      number: 7,
      title: 'المحقق الرقمي: لغز تسرب اللون',
      strategyType: 'spot_the_glitch',
      strategyTitle: 'استراتيجية المحقق الرقمي',
      hookScenario: 'أراد تلميذ تلوين سيارة باللون الأخضر، فامتلأت كل مساحة الرسمة باللون الأخضر! ما الخطأ؟',
      learningGoal: 'الاستدلال على شرط الإغلاق الهندسي لأداة التعبئة.',
      spotGlitchData: {
        scenarioDescription: 'ما سبب تسرب اللون إلى خلفية لوحة الرسم كاملة؟',
        options: [
          { id: 'g1', text: 'وجود فتحة أو انقطاع صغير في خط محيط السيارة', isGlitch: false, fixExplanation: 'هذا هو السبب الحقيقي! إذا لم يكن الشكل مغلقاً تماماً، يتسرب الطلاء للخارج.' },
          { id: 'g2', text: 'شاشة الحاسوب مكسورة', isGlitch: true, fixExplanation: 'سبب خاطئ.' },
          { id: 'g3', text: 'الحاسوب لا يحب اللون الأخضر', isGlitch: true, fixExplanation: 'سبب خيالي خاطئ.' }
        ]
      }
    },
    {
      id: 'g1-l3-sg8',
      lessonId: 'g1-l3',
      number: 8,
      title: 'سلم التحدي: امتدادات الصور',
      strategyType: 'challenge_ladder',
      strategyTitle: 'استراتيجية سلم التحدي المعرفي',
      hookScenario: 'تسلق سلم المعرفة للرسومات الرقمية.',
      learningGoal: 'التمهيد لمفهوم لواحق الملفات الرسومية.',
      challengeLadderData: {
        steps: [
          {
            stepLevel: 1,
            question: 'في أي قائمة نجد أمر فتح مستند رسم جديد؟',
            options: ['قائمة ملف (Fichier)', 'قائمة المساعدة', 'سلة المحذوفات'],
            correctAnswer: 0,
            feedback: 'صحيح! قائمة Fichier تحوي Nouveau و Enregistrer.'
          },
          {
            stepLevel: 2,
            question: 'ما هو امتداد ملفات الصور الشهير الذي يحفظ به برنامج الرسام عادة؟',
            options: ['PNG أو JPG', 'MP3 للأغاني', 'EXE لتثبيت البرامج'],
            correctAnswer: 0,
            feedback: 'ممتاز! PNG و JPG و BMP هي صيغ صور شائعة.'
          },
          {
            stepLevel: 3,
            question: 'أي أمر تستعمله لحفظ رسمة باسم جديد لأول مرة؟',
            options: ['حفظ باسم (Enregistrer sous)', 'إغلاق بدون حفظ', 'طباعة فورية'],
            correctAnswer: 0,
            feedback: 'رائع! Enregistrer sous يحدد الاسم ومكان الحفظ.'
          }
        ]
      }
    },
    {
      id: 'g1-l3-sg9',
      lessonId: 'g1-l3',
      number: 9,
      title: 'صندوق الكلمات: خطوات تشغيل الرسام',
      strategyType: 'smart_word_bank',
      strategyTitle: 'استراتيجية بنك الكلمات',
      hookScenario: 'رتب المسار القياسي لتشغيل برنامج الرسام في نظام Windows.',
      learningGoal: 'حفظ مسار تشغيل التطبيقات من قائمة إبدأ.',
      smartWordBankData: {
        sentenceWithBlanks: 'لتشغيل الرسام ننقر زر [BLANK1] ثم كافة [BLANK2] ثم نختار [BLANK3].',
        wordBank: ['إبدأ (Démarrer)', 'البرامج', 'الرسام (Paint)', 'إيقاف التشغيل'],
        correctAssignments: {
          BLANK1: 'إبدأ (Démarrer)',
          BLANK2: 'البرامج',
          BLANK3: 'الرسام (Paint)'
        },
        explanation: 'المسار الكلاسيكي: Démarrer ← Tous les programmes ← Accessoires Windows ← Paint.'
      }
    },
    {
      id: 'g1-l3-sg10',
      lessonId: 'g1-l3',
      number: 10,
      title: 'لغز المفهوم: حامل الألوان',
      strategyType: 'who_am_i',
      strategyTitle: 'استراتيجية مَن أكون؟',
      hookScenario: 'شريط في أعلى الشاشة يضم مربعات ملونة تختار منها لون الرسم ولون الخلفية!',
      learningGoal: 'التعرف على لوحة الألوان (Palette des couleurs).',
      whoAmIData: {
        clues: [
          'أوجد في الشريط العلوي لبرنامج الرسام.',
          'أعرض لك اللون 1 (اللون الأمامي) واللون 2 (لون الخلفية).',
          'يمكنك تحرير درجات ألوان جديدة من خلالي.'
        ],
        options: ['لوحة الألوان (Palette des couleurs)', 'المسطرة', 'شريط التمرير', 'شريط المهام'],
        correctIndex: 0,
        explanation: 'لوحة الألوان تسمح باختيار وتعديل ألوان الرسم بدقة.'
      }
    }
  ],

  // ==========================================
  // Lesson 4: مفهوم الملف والمجلد (g1-l4)
  // ==========================================
  'g1-l4': [
    {
      id: 'g1-l4-sg1',
      lessonId: 'g1-l4',
      number: 1,
      title: 'مَن أكون؟ الحاوية الصفراء الذكية',
      strategyType: 'who_am_i',
      strategyTitle: 'استراتيجية مَن أكون؟',
      hookScenario: 'أيقونة صفراء شهيرة في الحاسوب تحفظ داخلها مئات الملفات ومجلدات أخرى!',
      learningGoal: 'استنتاج مفهوم المجلد (Dossier) كحاوية لتنظيم المعلومات.',
      whoAmIData: {
        clues: [
          'لوني الافتراضي في نظام Windows أصفر جميل.',
          'لا أحتوي نصوصاً مباشرة في داخلي، بل احتوي ملفات أو مجلدات فرعية.',
          'دوري تنظيم القرص الصلب وترتيب وثائق التلميذ حتى لا تختلط.'
        ],
        options: ['المجلد (Le Dossier)', 'الملف (Le Fichier)', 'القرص الصلب المادي', 'سلة المهملات'],
        correctIndex: 0,
        explanation: 'المجلد (Dossier) هو بمثابة حقيبة أو درج مخصص لحفظ وتنظيم الملفات.'
      }
    },
    {
      id: 'g1-l4-sg2',
      lessonId: 'g1-l4',
      number: 2,
      title: 'فك شفرة العنصر الأساسي',
      strategyType: 'word_scramble',
      strategyTitle: 'استراتيجية فك الشفرة',
      hookScenario: 'رتب الحروف لمعرفة الوحدة الأساسية لتخزين البيانات في الحاسوب.',
      learningGoal: 'التعرف على مصطلح الملف (Fichier).',
      wordScrambleData: {
        scrambledLetters: ['م', 'ل', 'ف'],
        correctWord: 'ملف',
        hint: 'مجموعة من المعلومات المترابطة المخزنة تحت اسم وامتداد محدد (Fichier).',
        explanation: 'الملف (Fichier) هو الكيان الذي يحفظ نصوصك أو رسوماتك أو مقاطعك الصوتية.'
      }
    },
    {
      id: 'g1-l4-sg3',
      lessonId: 'g1-l4',
      number: 3,
      title: 'فرز السرعة: ملفات أم مجلدات؟',
      strategyType: 'speed_sort',
      strategyTitle: 'استراتيجية الفرز السريع',
      hookScenario: 'فرّق بسرعة بين الملف والمجلد من خلال طبيعته وامتداده!',
      learningGoal: 'معرفة أن الملف له لاحقة وامتداد (Extension) بينما المجلد لا امتداد له.',
      speedSortData: {
        instructions: 'صنف العنصر: هل هو ملف يحمل امتداداً ونوعاً أم مجلد تنظيمي؟',
        categories: [
          { id: 'f', title: 'ملفات (Fichiers)', color: 'from-blue-600 to-cyan-600' },
          { id: 'd', title: 'مجلدات (Dossiers)', color: 'from-amber-600 to-yellow-600' }
        ],
        items: [
          { id: 'x1', text: 'واجب_الرياضيات.docx', targetCategoryId: 'f' },
          { id: 'x2', text: 'مجلد السنة الأولى متوسط', targetCategoryId: 'd' },
          { id: 'x3', text: 'صورة_العيد.png', targetCategoryId: 'f' },
          { id: 'x4', text: 'مجلد المواد العلمية', targetCategoryId: 'd' }
        ],
        explanation: 'الملف ينتهي دائماً بنقطة وامتداد (.docx, .png)، بينما المجلد حاوية تجمع الملفات.'
      }
    },
    {
      id: 'g1-l4-sg4',
      lessonId: 'g1-l4',
      number: 4,
      title: 'سباق الثواني: الاسم والامتداد',
      strategyType: 'lightning_quiz',
      strategyTitle: 'استراتيجية سباق الثواني',
      hookScenario: 'هل يتكون اسم الملف من جزأين تفصل بينهما نقطة؟',
      learningGoal: 'فهم بنية اسم الملف (الاسم + النقطة + الامتداد).',
      lightningData: {
        statement: 'اسم الملف يتكون دائماً من اسم تختاره أنت وامتداد (Extension) يحدد نوع البرنامج المشغل.',
        isTrue: true,
        explanation: 'حقيقة مؤكدة! مثل: `MonTexte.docx` حيث `MonTexte` هو الاسم و `docx` هو الامتداد.'
      }
    },
    {
      id: 'g1-l4-sg5',
      lessonId: 'g1-l4',
      number: 5,
      title: 'فكر - زاوج - شارك: الترتيب الشجري',
      strategyType: 'think_pair_share',
      strategyTitle: 'استراتيجية فكر - زاوج - شارك',
      hookScenario: 'تخيل أن لديك 500 ورقة فرض لكافة المواد مبعثرة على مكتبك! كيف تنظمها بحقائب ومجلدات؟',
      learningGoal: 'إدراك الهيكل الشجري المتفرع للمجلدات (Structure arborescente).',
      thinkPairData: {
        question: 'كيف ترتب ملفاتك المدرسية في مجلدات رئيسية ومجلدات فرعية؟',
        stages: [
          { step: 'think', title: '1. فكر بمفردك', prompt: 'تخيل مجلداً رئيسياً بعنوان "دراستي"، ما المجلدات الفرعية التي تضعها داخله؟', guidance: 'مجلد لكل فصل أو لكل مادة.' },
          { step: 'pair', title: '2. زاوج مع زميلك', prompt: 'قارنا مخططكما: هل مجلد "معلوماتية" يوضع داخل "الفصل الأول" أم العكس؟', guidance: 'كلا التنظيمين صحيح بحسب التفضيل.' },
          { step: 'share', title: '3. شارك الحل', prompt: 'اعرض المخطط الشجري أمام زملائك.', guidance: 'الاستنتاج: المجلدات الفرعية تسهل الوصول السريع لأي ملف وتمنع الضياع.' }
        ],
        idealAnswer: 'ننشئ مجلداً رئيسياً "1AM" يتفرع إلى مجلدات فرعية للمواد، وداخل كل مادة نضع ملفات الدروس.',
        classroomTip: 'ارسم على السبورة شجرة المجلدات المتفرعة لتوضيح المفهوم.'
      }
    },
    {
      id: 'g1-l4-sg6',
      lessonId: 'g1-l4',
      number: 6,
      title: 'بطاقات الذاكرة: امتدادات الملفات',
      strategyType: 'memory_match',
      strategyTitle: 'استراتيجية بطاقات الذاكرة',
      hookScenario: 'طابق كل امتداد ملف بنوع محتواه الرقمي.',
      learningGoal: 'الربط بين لاحقة الملف ونوع البيانات التي يحتويها.',
      memoryMatchData: {
        pairs: [
          { id: 'm1', term: '.docx / .txt', definition: 'ملف نصي مكتوب' },
          { id: 'm2', term: '.mp3 / .wav', definition: 'ملف صوتي مسجل' },
          { id: 'm3', term: '.mp4 / .avi', definition: 'ملف فيديو مرئي' }
        ]
      }
    },
    {
      id: 'g1-l4-sg7',
      lessonId: 'g1-l4',
      number: 7,
      title: 'المحقق الرقمي: الرموز الممنوعة في التسمية',
      strategyType: 'spot_the_glitch',
      strategyTitle: 'استراتيجية المحقق الرقمي',
      hookScenario: 'حاول تلميذ تسمية ملف بالاسم `فرضي/معلوماتية:2026?` فرفض الحاسوب حفظه! ما الرمز الممنوع؟',
      learningGoal: 'معرفة الحروف والرموز المحظورة في أسماء الملفات في نظام التشغيل.',
      spotGlitchData: {
        scenarioDescription: 'أي من الرموز التالية يمنع نظام Windows استخدامها في تسمية الملفات والمجلدات؟',
        options: [
          { id: 'r1', text: 'الرموز الخاصة: / \\ : * ? " < > |', isGlitch: true, fixExplanation: 'هذه الرموز محجوزة لأوامر نظام التشغيل ولا يسمح بكتابتها في اسم أي ملف.' },
          { id: 'r2', text: 'الحروف الهجائية العربية مثل أ، ب، ت', isGlitch: false, fixExplanation: 'مسموح بها تماماً.' },
          { id: 'r3', text: 'الأرقام مثل 1، 2، 3', isGlitch: false, fixExplanation: 'مسموح بها تماماً.' }
        ]
      }
    },
    {
      id: 'g1-l4-sg8',
      lessonId: 'g1-l4',
      number: 8,
      title: 'سلم التحدي: أحجام الملفات',
      strategyType: 'challenge_ladder',
      strategyTitle: 'استراتيجية سلم التحدي المعرفي',
      hookScenario: 'تدرج في معرفة وحدات قياس سعة الملفات.',
      learningGoal: 'التمهيد لوحدات قياس الذاكرة (Octet, Ko, Mo, Go).',
      challengeLadderData: {
        steps: [
          {
            stepLevel: 1,
            question: 'ما هي أصغر وحدة لقياس حجم الملفات في الحاسوب؟',
            options: ['الأوكتي (Octet / Byte)', 'الكيلومتر', 'اللتر'],
            correctAnswer: 0,
            feedback: 'صحيح! الأوكتي (Octet) يتكون من 8 بت.'
          },
          {
            stepLevel: 2,
            question: 'أيهما أكبر حجماً في التخزين عادة؟',
            options: ['ملف فيلم فيديو عالي الدقة (Go)', 'ملف نصي بسيط من 3 أسطر (Ko)', 'لا فرق بينهما'],
            correctAnswer: 0,
            feedback: 'ممتاز! الفيديو يتطلب مساحات تخزين بالجيغابايت.'
          },
          {
            stepLevel: 3,
            question: 'أين نرى حجم وتاريخ إنشاء الملف في الحاسوب؟',
            options: ['من نافذة الخصائص (Propriétés) للملف', 'من خلف الشاشة بالعين المجردة', 'من لوحة المفاتيح'],
            correctAnswer: 0,
            feedback: 'أحسنت! خصائص الملف تظهر كل التفاصيل التقنية.'
          }
        ]
      }
    },
    {
      id: 'g1-l4-sg9',
      lessonId: 'g1-l4',
      number: 9,
      title: 'صندوق الكلمات: علاقة الملف بالمجلد',
      strategyType: 'smart_word_bank',
      strategyTitle: 'استراتيجية بنك الكلمات',
      hookScenario: 'صغ القاعدة البيداغوجية المنظمة للقرص الصلب.',
      learningGoal: 'تثبيت المقارنة الوظيفية بين الملف والمجلد.',
      smartWordBankData: {
        sentenceWithBlanks: 'يُحفظ [BLANK1] داخل [BLANK2]، ولا يمكن لمجلد أن يمتلك [BLANK3] في اسمه.',
        wordBank: ['الملف', 'المجلد', 'امتداداً', 'حجماً'],
        correctAssignments: {
          BLANK1: 'الملف',
          BLANK2: 'المجلد',
          BLANK3: 'امتداداً'
        },
        explanation: 'الملف يحفظ داخل المجلد، والمجلدات لا تملك امتداداً لاحقاً كالملفات.'
      }
    },
    {
      id: 'g1-l4-sg10',
      lessonId: 'g1-l4',
      number: 10,
      title: 'لغز المفهوم: شريحة الذاكرة المحمولة',
      strategyType: 'who_am_i',
      strategyTitle: 'استراتيجية مَن أكون؟',
      hookScenario: 'أداة صغيرة في جيبك تنقل ملفاتك من حاسوب المدرسة إلى حاسوب المنزل!',
      learningGoal: 'التعرف على وسائط التخزين المتنقلة (Flash Disk).',
      whoAmIData: {
        clues: [
          'أتصل بالحاسوب عبر منفذ USB العالمي.',
          'حجمي صغير جداً وأحفظ كميات هائلة من المجلدات والملفات.',
          'يسميني التلاميذ: الفلاش ديسك (Flash Disk / Clé USB).'
        ],
        options: ['القرص الوامض (Clé USB)', 'الشاشة', 'كابل الشاحن', 'سماعة الرأس'],
        correctIndex: 0,
        explanation: 'مفتاح الذاكرة (Clé USB) وسيط تخزين خارجي مثالي لنقل الملفات.'
      }
    }
  ]
};
