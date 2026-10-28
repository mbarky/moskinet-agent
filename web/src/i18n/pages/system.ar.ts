import type { CopyOf } from "./use-page-copy";
import type { systemEn } from "./system.en";

const GATEWAY_VERB_AR = { start: "تشغيل", stop: "إيقاف", restart: "إعادة تشغيل" } as const;

export const systemAr: CopyOf<typeof systemEn> = {
  // Module-level helpers
  durationDays: (d: number, h: number, m: number) => `${d} يوم ${h} س ${m} د`,
  durationHours: (h: number, m: number) => `${h} س ${m} د`,
  durationMinutes: (m: number) => `${m} د`,
  theArchive: "الأرشيف",
  noBackupYet: "لم تُنشأ نسخة احتياطية بعد",
  newerThan: (v: string) => `أحدث من v${v}`,
  behindBadge: (n: number) => `متأخر ${n}`,
  updateAvailableBadge: "يتوفر تحديث",
  updateAvailableBehind: (n: number) => `يتوفر تحديث — متأخر ${n} Commit`,
  updateAvailable: "يتوفر تحديث",
  memoryStatus: {
    ready: "جاهز",
    needs_config: "يحتاج إلى إعداد",
    unavailable: "غير متاح",
    missing: "مفقود",
  },

  // Action log viewer
  running: "قيد التشغيل",
  done: "تم",
  exitCode: (code: number | null) => `رمز الخروج ${code}`,
  closeLog: "إغلاق السجل",
  starting: "جارٍ البدء…",

  // Toasts
  gatewayVerbStarted: (verb: "start" | "stop" | "restart") =>
    `بدأ ${GATEWAY_VERB_AR[verb]} البوابة`,
  migrating: "جارٍ الترحيل إلى بوابة واحدة متعددة الإرسال",
  migrationFailed: (err: string) => `فشل ترحيل البوابة: ${err}`,
  curatorResumed: "تم استئناف منسّق المهارات",
  curatorPaused: "تم إيقاف منسّق المهارات مؤقتًا",
  curatorToggleFailed: (err: string) => `تعذّر تبديل حالة منسّق المهارات: ${err}`,
  resetDone: (list: string) => `تمت إعادة التعيين: ${list}`,
  nothing: "لا شيء",
  resetFailed: (err: string) => `فشلت إعادة التعيين: ${err}`,
  providerKeyRequired: "المزوّد ومفتاح API مطلوبان",
  credentialAdded: "تمت إضافة بيانات الاعتماد",
  addCredentialFailed: (err: string) => `تعذّرت إضافة بيانات الاعتماد: ${err}`,
  credentialRemoved: "تمت إزالة بيانات الاعتماد",
  removeFailed: (err: string) => `تعذّرت الإزالة: ${err}`,
  opStarted: (label: string) => `بدأ: ${label}`,
  opFailed: (label: string, err: string) => `فشل «${label}»: ${err}`,
  backupStarted: "بدأ النسخ الاحتياطي",
  backupFailed: (err: string) => `فشل النسخ الاحتياطي: ${err}`,
  backupReady: "النسخة الاحتياطية جاهزة للتنزيل",
  downloadFailed: (err: string) => `فشل التنزيل: ${err}`,
  importStarted: "بدأ الاستيراد",
  importFailed: (err: string) => `فشل الاستيراد: ${err}`,
  copyFailed: "تعذّر النسخ إلى الحافظة",
  uploadedPastes: (n: number, redacted: boolean) =>
    `تم رفع ${n} من الملصقات${redacted ? " (مع الإخفاء)" : ""}`,
  debugShareFailed: (err: string) => `فشلت مشاركة تقرير التصحيح: ${err}`,
  latestVersion: "تمام، معاك أحدث إصدار",
  updateCheckFailed: (err: string) => `فشل التحقق من التحديثات: ${err}`,
  updatesManagedElsewhere: "تُدار تحديثات Hermes خارج لوحة التحكم هذه.",
  updatesNotFromDashboard: "لا تُطبَّق التحديثات من لوحة التحكم هذه.",
  updateStarted: "بدأ التحديث",
  updateFailed: (err: string) => `فشل التحديث: ${err}`,
  pruneStarted: "بدأ تقليم نقاط الاستعادة",
  pruneFailed: (err: string) => `فشل التقليم: ${err}`,
  commandRequired: "الأمر مطلوب",
  hookCreated: "تم إنشاء الخطّاف",
  createHookFailed: (err: string) => `تعذّر إنشاء الخطّاف: ${err}`,
  hookRemoved: "تمت إزالة الخطّاف",
  removeHookFailed: (err: string) => `تعذّرت إزالة الخطّاف: ${err}`,

  // Dialogs
  restartSharedTitle: "إعادة تشغيل البوابة المشتركة؟",
  restartAll: "إعادة تشغيل الكل",
  updateTitle: "تحديث Hermes؟",
  updateDescBehind: (cmd: string, n: number) =>
    `سيتم تشغيل 'hermes update' (${cmd}) وجلب ${n} Commit جديد. تُعاد تشغيل البوابة عند انتهاء التحديث؛ وتحتفظ الجلسة الحالية بذاكرة الطلبات المؤقتة حتى ذلك الحين.`,
  updateDesc: (cmd: string) =>
    `سيتم تشغيل 'hermes update' (${cmd}) ثم إعادة تشغيل البوابة عند الانتهاء.`,
  updateNow: "تحديث الآن",
  resetMemoryTitle: "إعادة تعيين الذاكرة",
  resetMemoryDesc:
    "سيؤدي هذا إلى مسح ملفات الذاكرة المدمجة المحددة نهائيًا. لا يمكن التراجع عن ذلك.",
  removeCredentialTitle: "إزالة بيانات الاعتماد",
  removeCredentialDesc:
    "إزالة مفتاح API هذا من المجموعة؟ لن يتناوب الوكيل عليه بعد الآن.",
  pruneTitle: "تقليم نقاط الاستعادة",
  pruneDesc:
    "حذف مخزن نقاط الاستعادة الظلّي؟ ستُفقد نقاط /rollback الحالية.",
  removeHookTitle: "إزالة خطّاف Shell",
  removeHookDesc:
    "إزالة هذا الخطّاف من الإعدادات وسحب الموافقة عليه؟ سيتوقف عن العمل بعد إعادة التشغيل التالية.",

  // Hook modal
  close: "إغلاق",
  newShellHook: "خطّاف Shell جديد",
  event: "الحدث",
  commandAbsPath: "الأمر (مسار مطلق)",
  matcherOptional: "المطابِق (اختياري)",
  matcherPlaceholder: "مثال: terminal",
  timeoutSeconds: "المهلة (ث)",
  approveNow:
    "الموافقة الآن (امنح الموافقة ليعمل؛ وإلا يبقى مُهيّأً لكن غير نشط)",
  hookWarning:
    "تُشغّل خطّافات Shell أوامر عشوائية على هذا الجهاز. أضف فقط سكربتات تثق بها. يسري التغيير بعد إعادة تشغيل البوابة/الجلسة التالية.",
  creating: "جارٍ الإنشاء",
  createHook: "إنشاء الخطّاف",

  // Host
  host: "المضيف",
  arch: "المعمارية",
  latest: "الأحدث",
  cores: "أنوية",
  memory: "الذاكرة",
  disk: "القرص",
  uptime: "مدة التشغيل",
  loadAvg: "متوسط الحمل",
  psutilBefore: "ثبّت الإضافة",
  psutilAfter: "لعرض مقاييس CPU / الذاكرة / القرص.",
  checkForUpdates: "التحقق من التحديثات",
  updateWith: "حدّث باستخدام",

  // Portal
  loggedIn: "مسجّل الدخول",
  notLoggedIn: "غير مسجّل الدخول",
  inferenceProvider: (provider: string) => `مزوّد الاستدلال: ${provider}`,
  manageSubscription: "إدارة الاشتراك",
  toolGatewayRouting: "توجيه Tool Gateway",
  logInWith: "سجّل الدخول باستخدام",

  // Curator
  skillCurator: "منسّق المهارات",
  paused: "متوقف مؤقتًا",
  active: "نشط",
  disabled: "معطّل",
  everyHours: (h: number) => `كل ${h} س`,
  lastRun: (when: string) => ` · آخر تشغيل ${when}`,
  neverRun: " · لم يُشغَّل بعد",
  resume: "استئناف",
  pause: "إيقاف مؤقت",
  runNow: "تشغيل الآن",
  curatorReview: "مراجعة المنسّق",

  // Gateway
  gateway: "البوابة",
  stopped: "متوقفة",
  openLogs: "فتح السجلات",
  start: "تشغيل",
  restart: "إعادة التشغيل",
  stop: "إيقاف",
  servedByShared: (profiles: string) => `تخدمها البوابة المشتركة مع ${profiles}.`,
  multiplexHint:
    "كل ملف تعريف لديك يشغّل بوابته الخاصة. بوابة واحدة متعددة الإرسال تخدم كل ملفات التعريف من عملية واحدة.",
  fixBlockersFirst: "أصلح العوائق أدناه أولًا",
  migrateToMultiplex: "الترحيل إلى بوابة واحدة متعددة الإرسال",

  // Memory
  externalProvider: "المزوّد الخارجي:",
  builtinOnly: "المدمجة فقط",
  changeInPlugins: "التغيير من الإضافات ←",
  providerSetup: "إعداد المزوّد:",
  configureInPlugins: "اضبطه من الإضافات",
  providerMissing:
    "المزوّد المُهيّأ لم يعد مثبّتًا. انتقل إلى الذاكرة المدمجة أو هيّئ مزوّدًا آخر من الإضافات.",
  builtinFiles: "الملفات المدمجة —",
  resetAll: "إعادة تعيين الكل",
  resetFile: (file: string) => `إعادة تعيين ${file}`,

  // Credential pool
  credentialPool: "مجموعة بيانات الاعتماد",
  provider: "المزوّد",
  apiKey: "مفتاح API",
  label: "التسمية",
  optional: "اختياري",
  addKey: "إضافة مفتاح",
  noPooled: "لا توجد بيانات اعتماد في المجموعة. أضف واحدة أعلاه لتفعيل تدوير المفاتيح.",
  removeCredential: "إزالة بيانات الاعتماد",

  // Operations
  operations: "العمليات",
  openConsole: "فتح الطرفية",
  runDoctor: "تشغيل الفحص",
  doctor: "الفحص",
  securityAudit: "تدقيق أمني",
  updateSkills: "تحديث المهارات",
  skillsUpdate: "تحديث المهارات",
  promptSize: "حجم الطلب",
  supportDump: "حزمة الدعم",
  migrateConfig: "ترحيل الإعدادات",
  configMigrate: "ترحيل الإعدادات",
  fullBackup: "نسخة احتياطية كاملة",
  createBackup: "إنشاء نسخة احتياطية",
  downloadBackup: "تنزيل النسخة الاحتياطية",
  restoreFromUpload: "الاستعادة من نسخة احتياطية مرفوعة",
  chooseRestoreZip: "اختيار ملف zip للاستعادة",
  noArchiveSelected: "لم يُحدَّد أرشيف نسخة احتياطية",
  restoreUpload: "استعادة الملف المرفوع",
  restoreFromPath: "الاستعادة من مسار النسخ الاحتياطية",
  restorePath: "استعادة من المسار",
  restoreTitle: "استعادة نسخة Hermes الاحتياطية كاملة؟",
  restoreDesc: (label: string) =>
    `سيؤدي هذا إلى استبدال إعدادات Hermes الحالية والمهارات والجلسات والبيانات بمحتويات ${label}. لا يمكن التراجع عن ذلك.`,
  restore: "استعادة",
  cancel: "إلغاء",
  shareDebugReport: "مشاركة تقرير التصحيح",
  shareDebugDesc:
    "يرفع معلومات النظام والسجلات إلى خدمة لصق عامة ويُرجع روابط لإرسالها إلى فريق Hermes. تُحذف الملصقات تلقائيًا بعد 6 ساعات.",
  uploading: "جارٍ الرفع…",
  generateShareLink: "إنشاء رابط المشاركة",
  redactLabel: "إخفاء الرموز التي تشبه بيانات الاعتماد قبل الرفع (موصى به)",
  uploaded: "تم الرفع",
  redacted: "مع الإخفاء",
  notRedacted: "بدون إخفاء",
  autoDeletesIn: (h: number) => `يُحذف تلقائيًا خلال ${h} س`,
  copyAll: "نسخ الكل",
  copyLink: (label: string) => `نسخ رابط ${label}`,
  someLogsFailed: (failures: string) => `تعذّر رفع بعض السجلات: ${failures}`,

  // Checkpoints
  checkpoints: "نقاط الاستعادة",
  sessionsCount: (n: number) => `${n} جلسة ·`,
  prune: "تقليم",

  // Shell hooks
  shellHooks: "خطّافات Shell",
  newHook: "خطّاف جديد",
  noHooks: "لا توجد خطّافات Shell مُهيّأة.",
  matcher: (m: string) => `المطابِق: ${m}`,
  notExecutable: "غير قابل للتنفيذ",
  allowed: "مسموح",
  notApproved: "غير موافَق عليه",
  removeHook: "إزالة الخطّاف",
};
