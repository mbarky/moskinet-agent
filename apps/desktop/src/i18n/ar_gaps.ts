// Moski.net: Arabic for English keys the French-shaped overlay (ar.ts) does not carry, merged into
// arOverrides so they render in Arabic instead of falling back to English.
export const arGapFills = {
  appTour: {
    capabilities: { text: 'المهارات والأدوات والإضافات التي يستطيع Hermes استخدامها. أضف المزيد من هنا.', title: 'القدرات' },
    composer: { text: 'اكتب ما تريد إنجازه. اكتب @ لإضافة ملف.', title: 'اسأل هنا' },
    messaging: { text: 'تواصل مع Hermes من Telegram وSlack وDiscord وغيرها.', title: 'المراسلة' },
    model: { text: 'يحدد النموذج الذي يرد عليك.', title: 'اختيار النموذج' },
    modelLocal: 'يمكن لهذا الكمبيوتر تشغيل نموذج محليًا: الإعدادات > المزوّدون > النماذج المحلية.',
    newSession: { text: 'كل جلسة جديدة لها سياقها الخاص. استخدم جلسة لكل مهمة.', title: 'ابدأ من جديد' },
    rightPane: { text: 'يفتح الملفات والطرفية والمراجعة والمتصفح الداخلي على اليمين.', title: 'لوحة العمل' },
    sessions: { text: 'كل محادثاتك هنا. ابحث فيها أو ثبّتها أو أعد فتح أي منها.', title: 'محادثاتك' }
  },
  assistant: {
    approval: { commandDetails: 'تفاصيل الأمر' },
    catalogInstall: {
      alreadyInstalled: 'مثبّت بالفعل؛ تُرك كما هو',
      envVar: (name: string) => `متغير البيئة ${name}`,
      missingEnv: (names: string) => `اضبط ${names} لإكمال الإعداد`,
      notEnabled: 'مثبّت لكنه غير مفعّل',
      phase: {
        downloading: 'جارٍ التنزيل…',
        loading_tools: 'جارٍ تحميل أدواته…',
        python_packages: 'جارٍ تثبيت حزم Python…'
      },
      requiresHermes: (range: string) => `Hermes ${range}`,
      serverNotConnected: (server: string, reason?: string) =>
        `خادم MCP ‏${server} غير متصل${reason ? `: ${reason}` : ''}`
    }
  },
  catalog: {
    about: 'نبذة',
    add: 'إضافة',
    added: 'تمت الإضافة',
    addedDate: 'تاريخ الإضافة',
    allCategories: 'كل الفئات',
    allSources: 'كل المصادر',
    alphabetical: 'الاسم',
    author: 'المؤلف',
    back: 'العودة إلى النتائج',
    cardView: 'عرض البطاقات',
    category: 'الفئة',
    clearFilters: 'مسح عوامل التصفية',
    commands: 'الأوامر',
    destinationChanged: 'تغيّرت وجهة التثبيت. أغلق هذه النافذة وافتح رابط التثبيت مرة أخرى.',
    developer: {
      docs: 'وثائق المطوّرين',
      heading: 'وضع المطوّر',
      pitch: 'بنيت أداة أو موصّلًا أو إضافة أو Mod؟',
      pitchFollowUp: 'نفسك تبني واحدة ومش عارف تبدأ منين؟',
      submit: 'إرسال Mod',
      title: 'ابنِ لـ Hermes'
    },
    discover: 'اكتشف',
    discoverKind: (kind: string) => `اكتشف ${kind}`,
    documentation: 'الوثائق',
    explorePlugins: 'استكشف الإضافات',
    exploreSkills: 'استكشف المهارات',
    featured: 'مميّزة',
    filters: 'عوامل التصفية',
    hooks: 'الخطافات (Hooks)',
    install: 'تثبيت',
    installComplete: (name: string) => `تم تثبيت «${name}»`,
    installDescription: 'ستتوفر هذه المهارة في الجلسات الجديدة. ثبّت فقط من مصادر تثق بها.',
    installHint: 'راجع المصدر قبل التثبيت. تُطبَّق التغييرات على الجلسات الجديدة.',
    installTitle: (name: string) => `تثبيت «${name}»؟`,
    installTo: 'التثبيت في',
    installed: 'المثبّتة',
    installing: 'جارٍ التثبيت…',
    license: 'الترخيص',
    listView: 'عرض القائمة',
    loadFailed: 'تعذّر تحميل الكتالوج',
    middleware: 'البرمجيات الوسيطة',
    more: 'عرض المزيد',
    moreToExplore: 'المزيد للاستكشاف',
    moreToExploreBlurb: 'زوايا أصغر من الكتالوج، في مكان واحد.',
    mostStarred: 'الأكثر تقييمًا بالنجوم',
    newest: 'الأحدث',
    nextSlide: 'العنصر المميّز التالي',
    noResults: 'لا توجد نتائج',
    pinned: 'Commit تمت مراجعته',
    platforms: 'المنصات',
    previousSlide: 'العنصر المميّز السابق',
    recentlyUpdated: 'المحدَّثة مؤخرًا',
    related: 'عناصر مشابهة',
    repository: 'المستودع',
    requires: 'المتطلبات',
    results: (count: number) => `${count.toLocaleString()} ${count === 1 ? 'نتيجة' : 'نتائج'}`,
    retry: 'إعادة المحاولة',
    screenshots: 'لقطات الشاشة',
    searchPlugins: 'البحث في الإضافات',
    searchSkills: 'البحث في المهارات',
    seeAll: 'عرض الكل',
    skillsFor: (category: string) => `مهارات لـ ${category}.`,
    slideOf: (index: number, count: number) => `${index} من ${count}`,
    snapshotHint: 'من كتالوج Hermes. التصفح لا يتصل بمستودعات المصدر أبدًا.',
    sortBy: 'ترتيب حسب',
    source: 'المصدر',
    tags: 'الوسوم',
    thisComputer: 'هذا الكمبيوتر',
    tier: 'المستوى',
    tierLabels: { community: 'المجتمع', official: 'رسمية', verified: 'موثّقة' },
    tiers: {
      official: { blurb: 'من تطوير وصيانة Nous Research.', title: 'الإضافات الرسمية' },
      verified: { blurb: 'من الشركة صاحبة التكامل، وموثّقة من Nous.', title: 'الإضافات الموثّقة' }
    },
    tools: 'الأدوات',
    toolsets: {
      callCount: (count: string, calls: number) => `${count} ${calls === 1 ? 'استدعاء' : 'استدعاءات'}`,
      essentials: 'الأساسيات',
      essentialsBlurb: 'ما يعتمد عليه أغلب عمل Hermes.',
      mostUsed: 'الأكثر استخدامًا',
      mostUsedBlurb: 'مجموعات الأدوات التي يلجأ إليها Hermes أكثر في ملف التعريف هذا.',
      themes: {
        connect: { blurb: 'الحسابات والوكلاء الآخرون والمنزل الذكي والبحث خارج الويب.', label: 'الاتصال والتواصل' },
        create: { blurb: 'مشاهدة الصور والفيديو، وتفريغ الصوت، وتوليد الوسائط.', label: 'شاهد واسمع وأنشئ' },
        more: { blurb: 'كل ما يمكن تفعيله أيضًا في ملف التعريف هذا.', label: 'أدوات أخرى' },
        recall: { blurb: 'ما يتذكره Hermes، والمهارات والسجل الذي يمكنه البحث فيه.', label: 'الذاكرة والمعرفة' },
        work: { blurb: 'تحكّم في المتصفح وسطح المكتب، وعدّل الملفات، وشغّل الكود، وجدول المهام.', label: 'تصفّح واعمل وأتمت' }
      },
      toolCount: (count: number) => `${count} ${count === 1 ? 'أداة' : 'أدوات'}`
    },
    tryAnother: 'جرّب بحثًا آخر أو امسح عوامل التصفية.',
    updatedDate: 'تاريخ التحديث',
    version: 'الإصدار'
  },
  composer: {
    queuedTerminalSelectionExpiredBody:
      'لم يعد تحديد الطرفية المنتظر متاحًا. حدّد الأسطر مرة أخرى (Ctrl/Cmd+L) ثم أعد وضع الرسالة في الانتظار.',
    terminalSelectionMissingBody: 'حدّد أسطر الطرفية مرة أخرى (Ctrl/Cmd+L) قبل الإرسال — هذه الشريحة لا تحتوي النص الأصلي.',
    terminalSelectionMissingTitle: 'تحديد الطرفية غير متاح'
  },
  connectorOffer: {
    body: 'سجّل الدخول بحساب Nous مجاني لتحتفظ بالتطبيقات التي ربطتها، مثل Gmail أو Slack، على حسابك.',
    heading: 'احتفظ بتطبيقاتك المتصلة'
  },
  desktop: {
    resetZoom: 'إعادة ضبط التكبير',
    slashCommandIgnoredBody: 'لا يمكن دمج الأوامر المائلة مع المرفقات. احذف المرفق أو أرسل الأمر منفصلًا.',
    slashCommandIgnoredTitle: 'لم يُرسَل الأمر',
    zoomIn: 'تكبير',
    zoomOut: 'تصغير'
  },
  externalOpenFailed: {
    close: 'إغلاق',
    copyUrl: 'نسخ الرابط',
    message: 'لا يوجد متصفح مسجّل لفتح هذا العنوان. انسخ الرابط وافتحه يدويًا.',
    missing: {
      message: 'هذا الملف غير موجود — ربما حُذف أو نُقل، أو أنه موجود على جهاز آخر.',
      title: 'الملف غير موجود'
    },
    title: 'تعذّر فتح هذا الرابط'
  },
  gatewayGroupOpen: {
    lookupFailed: 'تعذّر العثور على هذه المجموعة في البوابة. حاول مرة أخرى.',
    missing: 'مجموعة البوابة هذه لم تعد موجودة.',
    opening: 'جارٍ فتح مجموعة البوابة…'
  },
  install: {
    bundledLocalDesc: 'استخدم بيئة Hermes المضمّنة في هذا التطبيق — الخادم الخلفي المضمّن هو التثبيت المحلي.',
    setupChoiceDescLocal: 'ثبّت Hermes على هذا الكمبيوتر، أو اتصل ببوابة Hermes تعمل لديك بالفعل.',
    useLocalDesc: 'بيئة Hermes مثبّتة هنا بالفعل — شغّلها بنقرة واحدة. لن يتم تنزيل أي شيء.',
    useLocalTitle: 'استخدم Hermes على هذا الكمبيوتر'
  },
  keybinds: {
    actions: {
      'composer.dictate': 'بدء / إيقاف الإملاء الصوتي',
      'conversation.scrollPageDown': 'تمرير المحادثة صفحة لأسفل',
      'conversation.scrollPageUp': 'تمرير المحادثة صفحة لأعلى'
    },
    clear: 'مسح'
  },
  notifications: {
    compressDeferredDone: 'اكتمل ضغط السياق',
    sharedProfileWarning:
      'هناك تثبيت آخر لـ Hermes يستخدم ملف التعريف هذا. يتشارك التثبيتان الإعدادات والبيانات، لذا قد تتعارض التغييرات. يمكنك المتابعة، أو إغلاق التثبيت الآخر قبل إجراء أي تغييرات.',
    updateReadyMessageAppInstaller: 'إصدار جديد من Hermes جاهز. حدّث الآن وسيُكمل Windows الباقي.'
  },
  preview: {
    missingBody: (label: string) =>
      `${label} حُذف أو نُقل، أو تم مسح موقعه المؤقت. لن تُستعاد علامة التبويب هذه في التشغيل القادم.`,
    missingTarget: 'هذا المسار غير موجود على هذا الكمبيوتر',
    missingTitle: 'الملف لم يعد موجودًا'
  },
  profiles: {
    soulMissing:
      'لا يوجد ملف SOUL.md لملف التعريف هذا بعد. أضف التعليمات أدناه واحفظ لإنشائه. تُدار إعدادات الشخصية المسبقة في config.yaml بشكل منفصل.'
  },
  rightSidebar: {
    terminalDropControl: (paths: string) => `هذه الأسماء تحتوي أحرف تحكم ستتعامل معها الصدفة كمفاتيح: ${paths}`,
    terminalDropControlTitle: 'لم تُكتب في الطرفية',
    terminalDropTooLarge: (names: string, limit: string) => `الحد الأقصى لكل ملف ${limit}. لم يُرفع: ${names}`,
    terminalDropTooLargeTitle: 'أكبر من أن يُرفع',
    terminalDropUploadFailed: (name: string) => `تعذّر رفع ${name}`,
    terminalOpenInteractive: 'فتح طرفية جديدة',
    terminalReadOnly: 'مخرجات للقراءة فقط',
    terminalReadOnlyHelp:
      'للرد على الطلبات، أوقف الأمر الذي يعمل في الخلفية وشغّله في طرفية جديدة. الطرفية الجديدة تفتح صدفة منفصلة ولا تتصل بهذه العملية.'
  },
  settings: {
    config: {
      alwaysExternalLinksDesc:
        'افتح كل رابط تنقر عليه في متصفح النظام بدل المتصفح الداخلي. خيار «فتح في المتصفح الداخلي» في قائمة النقر بالزر الأيمن يظل متاحًا.',
      alwaysExternalLinksTitle: 'فتح الروابط دائمًا في متصفح خارجي',
      voiceShortcutHintDesc:
        'اضبط اختصار تسجيل الصوت من الإعدادات ← اختصارات لوحة المفاتيح («بدء المحادثة الصوتية / إيقافها»). قيمة voice.record_key في الإعدادات تنطبق على CLI وTUI فقط.',
      voiceShortcutHintTitle: 'اختصار تسجيل الصوت'
    },
    fieldDescriptions: { 'stt.streaming': 'عرض النص أثناء التحدث (OpenAI وxAI وElevenLabs).' },
    fieldLabels: {
      'stt.deepinfra.model': 'نموذج DeepInfra',
      'stt.openai.streamingModel': 'نموذج البث المباشر (OpenAI)',
      'stt.streaming': 'التفريغ المباشر',
      'stt.xai.model': 'نموذج xAI'
    },
    nav: { plugins: 'الإضافات' },
    plugins: { disable: 'تعطيل', enable: 'تفعيل' },
    uninstallSection: {
      dataKept: (path: string) => `إعداداتك ومحادثاتك وأسرارك محفوظة في ${path}. إزالة التطبيق لا تحذفها.`,
      managedBody: 'هذا التثبيت يديره النظام، لذا لا يستطيع Hermes إزالة نفسه.',
      openAppsSettings: 'فتح إعدادات التطبيقات'
    }
  },
  shell: {
    statusbar: {
      backend: 'الخادم الخلفي',
      compressions: (count: number) => `مرات الضغط: ${count}`,
      messagingDegraded: (name: string) => `${name} متوقف`,
      messagingStopped: 'المراسلة متوقفة',
      planUsageTitle: (used: string, resetsIn?: string) =>
        `تم استخدام ${used} من حصة خطتك${resetsIn ? ` · تتجدد خلال ${resetsIn}` : ''} · افتح الفوترة`,
      releaseAvailable: (tag: string) => `الإصدار ${tag} متاح.`,
      togglePlanUsage: 'استخدام الخطة'
    }
  },
  skillDeepLink: {
    destinationChanged: 'تغيّرت وجهة التثبيت. أغلق هذه النافذة وافتح رابط التثبيت مرة أخرى.',
    installComplete: (name: string) => `تم تثبيت «${name}»`,
    installDescription: 'ستتوفر هذه المهارة في الجلسات الجديدة. ثبّت فقط من مصادر تثق بها.',
    installTitle: (name: string) => `تثبيت «${name}»؟`,
    installTo: 'التثبيت في',
    installed: 'مثبّتة',
    installing: 'جارٍ التثبيت…',
    source: 'المصدر',
    thisComputer: 'هذا الكمبيوتر'
  },
  skills: { plugins: { settingsForm: { optional: '(اختياري)' } } },
  statusStack: {
    coding: { readOnlyScope: 'عرض للقراءة فقط — التجهيز والتراجع والـ Commit تنطبق على التغييرات غير المحفوظة' }
  },
  updates: {
    applyStatus: {
      owed: (steps: string) => `تم تحديث الخادم الخلفي، لكن ما زال متبقيًا: ${steps}. شغّل \`hermes update\` مرة أخرى لإكمالها.`
    }
  }
}
