// health: allow FILE_LINES -- locale data: translated copy for the usage-window plan UI (allowance gauges, Large/Free tags, the limit card), one key per string
import { defineFieldCopy } from '@/app/settings/field-copy'

import { mergeTranslations } from '@hermes/shared/i18n'

import { arGapFills } from './ar_gaps'
import { defineLocale, type TranslationOverrides } from './define-locale'
import { arBoot } from './ar_boot'
import { arClarify } from './ar_clarify'
import { arConnectorAccounts } from './ar_connector_accounts'
import { arConnectorCard } from './ar_connector_card'
import { arErrorCodes } from './ar_error_codes'
import { arErrorLayers } from './ar_error_layers'
import { arFirstRun } from './ar_first_run'
import { arGatewayHost } from './ar_gateway_host'
import { arLocalModels } from './ar_local_models'
import { arModelMenu } from './ar_model_menu'
import { arModelSettings } from './ar_model_settings'
import { arNotices } from './ar_notices'
import { arNotifications } from './ar_notifications'
import { arOnboarding } from './ar_onboarding'
import { arPluginPreviewAccess } from './ar_plugin_preview_access'
import { arPluginUpdate } from './ar_plugin_update'
import { arPreviewWeb } from './ar_preview_web'
import { arProjects } from './ar_projects'
import { arSharedMetrics } from './ar_shared_metrics'
import { arThemePicker } from './ar_theme_picker'
import { arUpdateChannel } from './ar_update_channel'
import { introAr } from './intro-ar'

const arCount = (n: number, one: string, two: string, few: string, many: string) =>
  n === 1 ? one : n === 2 ? two : n >= 3 && n <= 10 ? `${n} ${few}` : `${n} ${many}`

const arBaseOverrides = {
  sharedMetrics: arSharedMetrics,
  firstRun: arFirstRun,
  intro: introAr,
  connectors: arConnectorCard,
  connectorsPage: {
    title: 'الموصّلات',
    searchPlaceholder: (count: number) => `ابحث في ${count} تطبيقًا`,
    filterCategory: 'الفئة',
    categoryAll: 'كل الفئات',
    uncategorised: 'بلا فئة',
    residencyLocal: 'على هذا الجهاز',
    segment: {
      all: 'الكل',
      available: 'المتاحة',
      connected: 'المتصلة',
      off: 'المعطّلة'
    },
    group: {
      connected: 'المتصلة',
      connectedNote: 'الاتصالات الفاشلة أولًا.',
      available: 'المتاحة',
      off: 'المعطّلة',
      offNote: 'يتم الاحتفاظ بالاتصالات.'
    },
    card: {
      kindManaged: 'مُدار',
      kindCatalog: 'MCP · الكتالوج',
      kindCustom: 'MCP · مخصص',
      kindPlugin: (plugin: string) => `MCP · الإضافة ${plugin}`,
      inCatalog: 'في كتالوج Hermes',
      hostedTwin: 'تتوفر نسخة مُدارة',
      alsoLocal: 'يعمل أيضًا على هذا الجهاز',
      open: (name: string) => `فتح ${name}`,
      turnServerOn: (name: string) => `تفعيل ${name}`,
      turnServerOff: (name: string) => `تعطيل ${name}`,
      state: {
        accessExpired: 'انتهت صلاحية الوصول',
        available: 'متاح',
        connected: 'متصل',
        connecting: 'جارٍ الاتصال',
        connectionUnknown: 'الحالة غير معروفة',
        couldNotConnect: 'تعذّر الاتصال',
        offByYourOrganisation: 'عطّلته مؤسستك',
        offForYou: 'معطّل لك',
        serverConnecting: 'جارٍ الاتصال…',
        serverError: 'خطأ',
        serverNeedsAuth: 'يلزم التحقق من الهوية',
        serverOff: 'معطّل',
        serverOn: 'مفعّل',
        serverOnUnused: 'مفعّل، غير مستخدم'
      },
      fact: {
        tools: (count: number) => arCount(count, 'أداة واحدة', 'أداتان', 'أدوات', 'أداة'),
        toolsOff: (count: number) => `${arCount(count, 'أداة واحدة', 'أداتان', 'أدوات', 'أداة')} معطّلة`,
        toolsOn: (count: number) => `${arCount(count, 'أداة واحدة', 'أداتان', 'أدوات', 'أداة')} مفعّلة`,
        toolsSomeOn: (total: number, on: number) => `${total} أداة، المفعّل منها ${on}`
      },
      verb: {
        authenticate: 'التحقق من الهوية',
        connect: 'اتصال',
        install: 'تثبيت',
        openLogs: 'فتح السجلات',
        reconnect: 'إعادة الاتصال',
        stopWaiting: 'إيقاف الانتظار',
        tryAgain: 'إعادة المحاولة',
        turnBackOn: 'إعادة التفعيل'
      },
      reason: {
        finishSignIn: 'أكمل تسجيل الدخول في متصفحك.',
        reconnect: 'أعد الاتصال ليستمر هذا التطبيق في العمل.',
        serverError: 'رفض الخادم الاتصال.',
        serverNeedsAuth: 'سجّل الدخول ليتمكن هذا الخادم من الرد.'
      }
    },
    page: {
      loading: 'جارٍ قراءة الكتالوج وخوادم هذا الكمبيوتر',
      emptyTitle: 'لا توجد تطبيقات بعد. أضف خادمًا على هذا الكمبيوتر للبدء.',
      noMatchTitle: 'لا توجد تطبيقات مطابقة',
      noMatchBody: 'لا نتائج. وجّه Hermes إلى خادم MCP الخاص بك لإضافته.',
      clearSearch: 'مسح البحث',
      hostedFailedTitle: 'تعذّر الوصول إلى التطبيقات المستضافة.',
      hostedFailedBody:
        'خوادم هذا الكمبيوتر لم تتأثر وما زالت تعمل. لم يتم تعطيل أي شيء.',
      retry: 'إعادة المحاولة',
      matchesElsewhere: (count: number) =>
        `${arCount(count, 'نتيجة أخرى', 'نتيجتان أخريان', 'نتائج أخرى', 'نتيجة أخرى')} في مجموعات أخرى.`,
      showAllMatches: 'عرض كل النتائج',
      segmentNoMatch: (segment: string) => `لا نتائج في ${segment}: يتم عرض كل النتائج.`,
      freeTierNote: 'تبقى الاتصالات على هذا الكمبيوتر حتى تسجّل الدخول.',
      signInLine: 'سجّل الدخول إلى Nous لاستخدام التطبيقات المُدارة.',
      signIn: 'تسجيل الدخول',
      managedUnavailable: 'التطبيقات المُدارة غير متاحة لهذا الحساب بعد.',
      writeFailed: 'لم يتم حفظ هذا التغيير.',
      refreshFailed: 'لم يتم تحديث قائمة الأدوات.',
      disconnectNoAccount: 'لا يوجد لدى Hermes حساب لفصله هنا. حدّث الصفحة ثم حاول مرة أخرى.',
      disconnectRefused:
        'لا يمكن لـ Nous إزالة هذا الاتصال حاليًا. عطّل التطبيق بالمفتاح بدلًا من ذلك، أو حاول لاحقًا.'
    },
    add: {
      action: 'إضافة خادمك',
      title: 'الاتصال بخادم MCP مخصص',
      hint: 'إدخال جديد في mcp.json على هذا الجهاز',
      pasteLabel: 'الصق أمرًا أو مقتطفًا',
      pastePlaceholder: 'npx -y @modelcontextprotocol/server-filesystem /path/to/folder',
      pasteNoMatch: 'لا يبدو أن هذا خادم. املأ الحقول أدناه بدلًا من ذلك.',
      name: 'الاسم',
      nameTaken: 'هذا الاسم مستخدم بالفعل.',
      type: 'النوع',
      typeStdio: 'STDIO',
      typeHttp: 'HTTP قابل للبث',
      command: 'أمر التشغيل',
      args: 'الوسائط',
      addArg: '+ إضافة وسيط',
      envVars: 'متغيرات البيئة',
      addEnvVar: '+ إضافة متغير بيئة',
      passthrough: 'تمرير متغيرات البيئة',
      addPassthrough: '+ إضافة متغير',
      cwd: 'مجلد العمل',
      url: 'URL',
      headers: 'الترويسات',
      addHeader: '+ إضافة ترويسة',
      auth: 'التحقق من الهوية',
      authNone: 'بدون',
      authOauth: 'OAuth',
      authBearer: 'رمز Bearer',
      keyPlaceholder: 'KEY',
      valuePlaceholder: 'القيمة',
      removeRow: 'إزالة هذا الصف',
      editJson: 'تعديل mcp.json',
      saveFailed: 'لم يتم حفظ هذا الخادم.'
    },
    dialog: {
      disconnect: 'قطع الاتصال',
      disconnectTitle: (name: string) => `قطع الاتصال بـ ${name}؟`,
      disconnectBody: 'سيتوقف Hermes عن العمل بهذا الحساب. يمكنك إعادة الاتصال في أي وقت.',
      menuRefreshTools: 'تحديث الأدوات',
      moreActions: 'إجراءات أخرى',
      removeServerTitle: (name: string) => `إزالة ${name}؟`,
      removeServerBody: 'سيُحذف الإدخال من mcp.json على هذا الكمبيوتر. لن يُحذف أي شيء آخر.',
      appSwitch: (name: string) => `يمكن لـ Hermes استخدام ${name}`,
      waysTitle: (name: string) => `أين يعمل ${name}`,
      wayNotConnected: (name: string) => `غير متصل بعد. سجّل الدخول إلى ${name} في متصفحك.`,
      wayHosted: 'مُدار',
      bothOn: (name: string) => `كلاهما مفعّل، لذا يرى Hermes كل أداة من ${name} مرتين.`,
      turnOffLocal: 'تعطيل الخادم المحلي',
      providedByPlugin: (plugin: string) => `مقدَّم من الإضافة ${plugin}`,
      openPlugins: 'فتح تبويب الإضافات',
      nousLine: 'تطبيقات Nous تتبع حسابك، لا ملف التعريف.',
      rulesReadOnly: 'لا يمكن تعديل القواعد حاليًا.',
      rulesAppOff: (name: string) => `فعّل ${name} لتعديل أدواته.`,
      rulesSignIn: 'سجّل الدخول لتعديل ما يمكن لـ Hermes فعله هنا.',
      orgNote: (count: number) => `عطّلت مؤسستك ${arCount(count, 'أداة واحدة', 'أداتين', 'أدوات', 'أداة')}.`,
      orgLink: 'فتح إدارة الموصّلات',
      connectEnded: 'لم يكتمل الاتصال.',
      connectOpenAgain: 'فتح الرابط مرة أخرى',
      tokensPerCall: 'توكن لكل استدعاء',
      usesPerMonth: 'مرات الاستخدام خلال 30 يومًا',
      advanced: 'متقدم',
      advancedHint: 'إدخال mcp.json والسجلات'
    },

    accounts: arConnectorAccounts,

    tools: {
      title: 'الأدوات',
      notInstalledBody: 'ثبّته على هذا الجهاز لرؤية الأدوات التي يوفّرها.',
      summaryTitle: (name: string) => `ما يمكن لـ Hermes فعله باستخدام ${name}`,
      summaryPreviewTitle: (name: string) => `ما سيتمكن Hermes من فعله باستخدام ${name} بعد الاتصال`,
      summaryCount: (count: number) => arCount(count, 'أداة واحدة', 'أداتان', 'أدوات', 'أداة'),
      summaryAllTools: 'كل الأدوات',
      summaryOther: 'أخرى',
      allToolsSwitch: 'تفعيل كل الأدوات أو تعطيلها',
      summaryAllOn: 'كلها مفعّلة',
      summarySomeOn: (on: number, total: number) => `${on} من ${total} مفعّلة`,
      summaryOff: 'معطّلة',
      showAllTools: (count: number) => (count > 1 ? `عرض الأدوات الـ ${count}` : `عرض ${count} أداة`),
      showSummary: 'عرض الملخص',
      facetSwitch: (facet: string) => `تفعيل أدوات ${facet} أو تعطيلها`,
      moreHints: (count: number) => `+${count}`,
      staleSignIn: 'سجّل الدخول لقراءة أحدث قائمة للأدوات.',
      searchCountPlaceholder: (count: number) => `ابحث في ${count} أداة`,
      toolList: (name: string) => `أدوات ${name}`,
      categorySelect: (count: number) => arCount(count, 'فئة واحدة', 'فئتان', 'فئات', 'فئة'),
      showDeprecated: (count: number) => `عرض المهمَلة (${count})`,
      hideDeprecated: (count: number) => `إخفاء المهمَلة (${count})`,
      quickReadOnly: 'للقراءة فقط',
      quickNoDestructive: 'تعطيل الأدوات الهدّامة',
      quickEverythingOn: 'تفعيل الكل',
      lockedHint: 'عطّلته مؤسستك',
      turnToolOn: (tool: string) => `تفعيل ${tool}`,
      turnToolOff: (tool: string) => `تعطيل ${tool}`,
      showDetails: (tool: string) => `عرض ما تفعله ${tool}`,
      hideDetails: (tool: string) => `إخفاء ما تفعله ${tool}`,
      noMatch: 'لا توجد أدوات تطابق هذه المرشحات.',
      loading: 'جارٍ قراءة قائمة الأدوات',
      unavailableLine: 'قائمة الأدوات غير متاحة.',
      needsAuthTitle: (name: string) => `سجّل الدخول إلى ${name} لقراءة أدواته.`,
      needsAuthBody: 'يبقى تسجيل الدخول على هذا الكمبيوتر. لا يغادره أي شيء.',
      retry: 'إعادة المحاولة',
      goneTitle: (name: string) => `غادر ${name} الكتالوج.`,
      goneBody: 'لم يعد بإمكان Hermes استدعاؤه. يبقى الصف حتى تزيله، فلا شيء يختفي.',
      remove: 'إزالة',
      offTitle: (name: string) => `${name} معطّل.`,
      offBody: 'فعّله بالمفتاح أعلاه لقراءة الأدوات التي يوفّرها.',
      signedOutTitle: 'سجّل الدخول إلى Nous لقراءة قائمة الأدوات.',
      signedOutBody: 'خوادمك على هذا الكمبيوتر لم تتأثر.',
      conflictTitle: 'عدّل شخص آخر هذه القاعدة أثناء تعديلك لها.',
      conflictBody: (theyOff: number, theyOn: number) => {
        const they = [
          theyOff > 0
            ? `عطّل ${theyOff} من الأدوات التي فعّلتها`
            : '',
          theyOn > 0
            ? `أبقى ${theyOn} من الأدوات التي عطّلتها مفعّلة`
            : ''
        ].filter(Boolean)

        return `${they.length > 0 ? `هذا الشخص ${they.join(' و')}. ` : ''}تغييراتك باقية على الشاشة، ولم يُكتب أي شيء.`
      },
      conflictReload: 'إعادة تحميل نسخته',
      conflictSave: 'الحفظ فوق نسخته',
      saveFailed: 'لم يتم حفظ قواعد الأدوات هذه.',
      footerDirty: (off: number, backOn: number) =>
        `${off} أداة معطّلة، ${backOn === 0 ? 'لا شيء' : backOn} أُعيد تفعيلها`,
      discard: 'تجاهل التغييرات',
      save: 'حفظ التغييرات',
      saving: 'جارٍ الحفظ...'
    },
    vocabulary: {
      facetRead: {
        label: 'قراءة',
        long: 'يقرأ بيانات من هذا التطبيق. لا يغيّر أي شيء.'
      },
      facetWrite: {
        label: 'كتابة',
        long: 'ينشئ شيئًا أو يغيّره في هذا التطبيق.'
      },
      facetDestructive: {
        label: 'هدّام',
        long: 'قد يحذف شيئًا نهائيًا في هذا التطبيق.'
      },
      facetUnclassified: {
        label: 'تأثير غير معروف',
        long: 'لم يوضّح التطبيق ما تفعله هذه الأداة.'
      },
      hintReadOnly: {
        label: 'للقراءة فقط',
        long: 'تصرّح الأداة بأنها تقرأ فقط.'
      },
      hintCreate: {
        label: 'ينشئ',
        long: 'ينشئ شيئًا جديدًا.'
      },
      hintUpdate: {
        label: 'يعدّل',
        long: 'يغيّر شيئًا موجودًا بالفعل.'
      },
      hintDelete: {
        label: 'يحذف',
        long: 'يحذف شيئًا.'
      },
      hintDestructive: {
        label: 'هدّام',
        long: 'لا يمكن التراجع عن التغيير الذي يجريه من هنا.'
      },
      hintIdempotent: {
        label: 'قابل للتكرار',
        long: 'تشغيله مرتين له نفس أثر تشغيله مرة واحدة.'
      },
      hintOpenWorld: {
        label: 'خارجي',
        long: 'يصل إلى شيء خارج هذا التطبيق.'
      }
    }
  },
  sessionImport: {
    title: 'المتابعة من تطبيق آخر',
    subtitle: 'استورد محادثة إلى Hermes وتابع من حيث توقفت.',
    action: 'استيراد جلسة',
    readingFrom: 'القراءة من',
    connectedComputer: 'الكمبيوتر المتصل',
    destination: 'الاستيراد إلى',
    all: 'الكل',
    search: 'ابحث في الجلسات المحمّلة',
    scanning: 'جارٍ البحث عن المحادثات',
    scanError: 'تعذّر العثور على الجلسات',
    scanHelp: 'تحقّق من الاتصال بالخادم الخلفي ثم حاول مرة أخرى. قد يلزم تحديث الخادم الخلفي.',
    empty: 'لم يتم العثور على محادثات',
    emptyHelp: 'ستظهر هنا جلسات Claude Code وCodex من هذا الخادم الخلفي.',
    noMatches: 'لا توجد محادثات مطابقة',
    searchHelp: 'جرّب عنوانًا أو مجلدًا آخر، أو حمّل المزيد من الجلسات.',
    skipped: 'بعض السجلات كانت فارغة أو غير قابلة للقراءة أو أكبر من أن تُعاين.',
    more: 'تحميل المزيد من الجلسات',
    messages: 'رسائل',
    choose: 'محادثة لمتابعتها',
    chooseHelp: 'اختر جلسة لقراءة سجلها قبل استيرادها إلى Hermes.',
    previewLoading: 'جارٍ فتح المعاينة',
    previewError: 'المعاينة غير متاحة',
    previewHelp: 'ربما نُقل المصدر أو تغيّر. حدّث القائمة ثم حاول مرة أخرى.',
    previewLimit: 'المعاينة مختصرة لتسهيل القراءة. تُستورد المحادثة كاملة.',
    you: 'أنت',
    snapshot: 'هذه المحادثة موجودة بالفعل في Hermes. افتح نسختك الحالية للمتابعة.',
    copyNotice:
      'ينسخ نص المحادثة دون تعديل ملفات المصدر. لا تُنقل نتائج الأدوات ولا خطوات التفكير.',
    importing: 'جارٍ الاستيراد…',
    open: 'فتح في Hermes',
    continue: 'المتابعة في Hermes',
    importError: 'تعذّر استيراد هذه المحادثة.'
  },
  common: {
    apply: 'تطبيق',
    back: 'رجوع',
    save: 'حفظ',
    saving: 'جارٍ الحفظ…',
    cancel: 'إلغاء',
    change: 'تغيير',
    choose: 'اختيار',
    clear: 'مسح',
    close: 'إغلاق',
    collapse: 'طي',
    confirm: 'تأكيد',
    connect: 'اتصال',
    connecting: 'جارٍ الاتصال',
    continue: 'متابعة',
    bots: 'البوتات',
    copied: 'تم النسخ',
    copy: 'نسخ',
    copyFailed: 'تعذّر النسخ',
    delete: 'حذف',
    docs: 'التوثيق',
    done: 'تم',
    error: 'خطأ',
    expand: 'توسيع',
    failed: 'فشل',
    formatJson: 'تنسيق JSON',
    free: 'مجاني',
    loading: 'جارٍ التحميل…',
    notSet: 'غير محدد',
    refresh: 'تحديث',
    remove: 'إزالة',
    replace: 'استبدال',
    retry: 'إعادة المحاولة',
    run: 'تشغيل',
    send: 'إرسال',
    set: 'تعيين',
    skip: 'تخطي',
    update: 'تحديث',
    tryHint: term => `جرّب «${term}»`,
    on: 'مفعّل',
    off: 'معطّل'
  },
  fileMenu: {
    revealFinder: 'إظهار في Finder',
    revealExplorer: 'إظهار في مستكشف الملفات',
    revealFileManager: 'فتح المجلد الأب',
    revealInSidebar: 'إظهار في شجرة الملفات',
    copyPath: 'نسخ المسار',
    copyRelativePath: 'نسخ المسار النسبي',
    download: 'تنزيل',
    downloadSaved: 'تم الحفظ',
    downloadFailed: 'تعذّر التنزيل',
    rename: 'إعادة التسمية…',
    delete: 'حذف',
    renameTitle: 'إعادة التسمية',
    renameLabel: 'الاسم الجديد',
    deleteTitle: name => `حذف ${name}؟`,
    deleteBody: 'سيُنقل إلى سلة المهملات، ويمكنك استعادته من هناك.',
    pathCopied: 'تم نسخ المسار',
    revealMissing: 'هذا المجلد غير موجود على هذا الكمبيوتر',
    revealUnavailable:
      'هذا المسار ليس على هذا الكمبيوتر، بل على جهاز الخادم الخلفي. استخدم «إظهار في شجرة الملفات».'
  },
  boot: arBoot.boot,
  notifications: {
    region: 'الإشعارات',
    hide: 'إخفاء',
    show: 'إظهار',
    more: count => (count === 1 ? 'إشعار آخر' : count === 2 ? 'إشعاران آخران' : count >= 3 && count <= 10 ? `${count} إشعارات أخرى` : `${count} إشعارًا آخر`),
    clearAll: 'مسح الكل',
    dismiss: 'إغلاق الإشعار',
    details: 'التفاصيل',
    copyDetail: 'نسخ التفاصيل',
    copyDetailFailed: 'تعذّر نسخ تفاصيل الإشعار',
    backendOutOfDateTitle: 'الخادم الخلفي قديم',
    backendOutOfDateMessage:
      'خادم Hermes الخلفي أقدم من إصدار تطبيق سطح المكتب هذا وقد لا يعمل بشكل صحيح. حدّثه ليتوافقا.',
    desktopOutOfDateTitle: 'تطبيق Hermes قديم',
    desktopOutOfDateMessage:
      'تطبيق Hermes هذا أقدم من الخادم الخلفي المتصل به وقد لا يعمل بشكل صحيح. حدّث التطبيق ليتوافقا.',
    updateDesktopApp: 'تحديث التطبيق',
    installMethodUnsupportedTitle: 'طريقة التثبيت غير مدعومة',
    updateHermes: 'تحديث Hermes',
    updateReadyTitle: 'التحديث جاهز',
    updateReadyMessage: count =>
      `${count === 1 ? 'يتوفر تغيير جديد واحد' : count === 2 ? 'يتوفر تغييران جديدان' : count >= 3 && count <= 10 ? `تتوفر ${count} تغييرات جديدة` : `يتوفر ${count} تغييرًا جديدًا`}.`,
    updateReadyMessageUnknown: 'يتوفر تحديث جديد.',
    seeWhatsNew: 'عرض الجديد',
    mcp: {
      needsAuthTitle: 'يحتاج خادم MCP إلى تحقق جديد من الهوية',
      needsAuthMessage: name => `يحتاج ${name} إلى تحقق MCP جديد من الهوية.`,
      errorTitle: 'تعذّر الوصول إلى خادم MCP',
      errorMessage: name => `فشل ${name} في فحص حالة MCP.`,
      signIn: 'تسجيل الدخول',
      view: 'عرض',
      disable: 'تعطيل',
      disabledMessage: name => `تم تعطيل ${name} MCP. يمكنك إعادة تفعيله من القدرات ← MCP.`,
      disableFailed: name => `تعذّر تعطيل ${name} MCP.`
    },
    errors: {
      elevenLabsNeedsKey: 'يحتاج STT من ElevenLabs إلى ELEVENLABS_API_KEY.',
      elevenLabsRejectedKey: 'رفضت ElevenLabs مفتاح API (401).',
      diskFull: 'القرص ممتلئ. حرّر بعض المساحة ثم حاول مرة أخرى.',
      storageFailure:
        'تعذّر على Hermes الحفظ في مجلد بياناته. افتح الصيانة لفحصه وإصلاحه.',
      gatewayAuthFailed: 'فشل التحقق من هوية البوابة، تحقّق من API_SERVER_KEY.',
      methodNotAllowed:
        'رفض الخادم الخلفي لسطح المكتب هذا الطلب (405 Method Not Allowed). جرّب إعادة تشغيل Hermes Desktop.',
      microphonePermission: 'تم رفض صلاحية الميكروفون.',
      openaiRejectedApiKey: 'رفضت OpenAI مفتاح API.',
      openaiTtsNeedsKey: 'يحتاج TTS من OpenAI إلى VOICE_TOOLS_OPENAI_KEY أو OPENAI_API_KEY.',
      codeSkewRestartRequired:
        'ما زال هذا الخادم الخلفي يشغّل الكود القديم بعد التحديث. أعد تشغيله لتحميل الكود الجديد.',
      rpcOutOfSync: 'التطبيق والخادم الخلفي ليسا على نفس الإصدار. حدّث الاثنين.',
      restartHermesFailed: 'تعذّرت إعادة تشغيل Hermes'
    },
    actions: {
      restartHermes: 'إعادة تشغيل Hermes',
      openKeys: 'فتح المفاتيح',
      openGateways: 'فتح البوابات',
      openMaintenance: 'فتح الصيانة'
    },
    voice: {
      configureSpeechToText: 'اضبط تحويل الكلام إلى نص لاستخدام الوضع الصوتي.',
      couldNotStartSession: 'تعذّر بدء الجلسة الصوتية',
      microphoneAccessDenied: 'تم رفض الوصول إلى الميكروفون.',
      microphoneConstraintsUnsupported: 'هذا الجهاز لا يدعم قيود الميكروفون.',
      microphoneFailed: 'فشل الميكروفون',
      microphoneInUse: 'الميكروفون مستخدم بالفعل من تطبيق آخر.',
      microphoneNeedsHttps: 'يحتاج الميكروفون إلى اتصال آمن. افتح تطبيق الويب عبر HTTPS، أو عبر نفق SSH إلى 127.0.0.1، لاستخدامه.',
      microphonePermissionDenied: 'تم رفض صلاحية الميكروفون.',
      microphoneStartFailed: 'تعذّر بدء التسجيل من الميكروفون.',
      microphoneUnsupported: 'بيئة التشغيل هذه لا تدعم التسجيل من الميكروفون.',
      noMicrophone: 'لم يتم العثور على ميكروفون.',
      noSpeechDetected: 'لم يتم اكتشاف أي كلام',
      playbackFailed: 'فشل تشغيل الصوت',
      recordingFailed: 'فشل التسجيل الصوتي',
      sayStopToEnd: phrase => `قل «${phrase}» لإنهاء المحادثة الصوتية.`,
      transcriptionFailed: 'فشل التفريغ النصي',
      transcriptionUnavailable: 'التفريغ النصي غير متاح بعد.',
      tryRecordingAgain: 'جرّب التسجيل مرة أخرى.',
      unavailable: 'الصوت غير متاح',
      liveEnded: 'انتهت الجلسة الصوتية المباشرة',
      liveEndedConnectionLost: 'فقدت الجلسة الصوتية المباشرة اتصالها.',
      liveEndedClosed: 'أغلقت الخدمة الجلسة الصوتية المباشرة.',
      liveError: 'الصوت المباشر',
      liveDelegationFailed: 'تعذّر تمرير الطلب إلى Hermes',
      liveUnavailable: reason =>
        `المحادثة الصوتية GPT-Live غير متاحة: ${reason}. سيتم استخدام تحويل الكلام إلى نص بدلًا منها.`
    },
    native: {
      approvalTitle: 'الموافقة مطلوبة',
      approvalTitleNamed: session => `الموافقة مطلوبة — ${session}`,
      approveAction: 'موافقة',
      rejectAction: 'رفض',
      inputTitle: 'مطلوب إدخال',
      inputTitleNamed: session => `مطلوب إدخال — ${session}`,
      inputBody: 'Hermes بانتظار ردك.',
      turnDoneTitle: 'انتهى Hermes',
      turnDoneBody: '',
      turnErrorTitle: 'فشل الدور',
      backgroundDoneTitle: 'اكتملت مهمة الخلفية',
      backgroundFailedTitle: 'فشلت مهمة الخلفية',
      creditsTitle: 'الرصيد'
    }
  },
  ...arNotices,
  sendDiagnostics: {
    title: 'إرسال التشخيصات إلى Nous',
    privacyNotice:
      'يرفع هذا حزمة تصحيح إلى تخزين داخلي لدى Nous، وليس إلى خدمة مشاركة عامة. تحتوي على معلومات النظام (نظام التشغيل، والإصدارات، والمزوّد، ومفاتيح API المهيأة — دون المفاتيح نفسها أبدًا) بالإضافة إلى السجلات الكاملة للوكيل والبوابة وتطبيق سطح المكتب (حتى 512 كيلوبايت لكل منها)، وقد تتضمن محادثات ونتائج أدوات ومسارات ملفات. تُحجب الأسرار قبل الإرسال. لا يمكن الاطلاع على الحزمة إلا لفريق Nous ومشرفي Discord المعتمدين، وتُحذف تلقائيًا بعد 14 يومًا.',
    upload: 'إرسال',
    uploading: 'جارٍ الإرسال…',
    cancel: 'إلغاء',
    close: 'إغلاق',
    copyLink: 'نسخ الرابط',
    uploadIdFallback: id => `لم يُرجَع رابط للعرض — أعطِ الدعم المعرّف ${id}`,
    doneTitle: 'تم إرسال التشخيصات',
    doneDescription:
      'تم رفع حزمتك بشكل خاص. شارك الرابط أدناه في محادثة الدعم ليتمكن الفريق من مراجعة سجلاتك.',
    failedTitle: 'فشل الإرسال',
    failedHint:
      'يمكنك أيضًا تشغيل `hermes debug share --nous` في الطرفية، أو `hermes debug share --local` لعرض التقرير دون رفعه.',
    handoffLead: 'تابع النقاش على:',
    links: {
      github: 'GitHub Issues',
      portal: 'دعم Nous Portal',
      discord: 'Discord'
    }
  },
  titlebar: {
    hideSidebar: 'إخفاء الشريط الجانبي',
    showSidebar: 'إظهار الشريط الجانبي',
    search: 'بحث',
    searchTitle: 'البحث في الجلسات والعروض والإجراءات',
    swapSidebarSides: 'تبديل جانبي الشريط الجانبي',
    hideRightSidebar: 'إخفاء الشريط الجانبي الأيمن',
    showRightSidebar: 'إظهار الشريط الجانبي الأيمن',
    unreadSessions: count => (count === 1 ? 'جلسة واحدة غير مقروءة' : count === 2 ? 'جلستان غير مقروءتين' : count >= 3 && count <= 10 ? `${count} جلسات غير مقروءة` : `${count} جلسة غير مقروءة`),
    muteHaptics: 'إيقاف الاهتزاز',
    unmuteHaptics: 'تشغيل الاهتزاز',
    openSettings: 'فتح الإعدادات',
    openStarmap: 'فتح خريطة الذاكرة',
    enterHud: 'وضع HUD',
    exitHud: 'الخروج من وضع HUD',
    resetHudLayout: 'إعادة تعيين حجم HUD وموضعه',
    layoutEditor: 'محرر التخطيط',
    layoutEditorTitle: mod => `محرر التخطيط — ${mod}+نقرة يعيد تعيين التخطيط`
  },
  keybinds: {
    title: 'اختصارات لوحة المفاتيح',
    subtitle: open => `انقر على اختصار لإعادة تعيينه · ${open} يعيد فتح هذه اللوحة.`,
    search: 'ابحث في الاختصارات…',
    rebind: 'إعادة التعيين',
    reset: 'إعادة الضبط',
    resetAll: 'إعادة ضبط الكل',
    pressKey: 'اضغط مفتاحًا…',
    set: 'معيّن',
    conflictWith: label => `معيّن أيضًا لـ «${label}»`,
    categories: {
      composer: 'محرر الرسائل',
      profiles: 'ملفات التعريف',
      session: 'الجلسة',
      navigation: 'التنقل',
      view: 'العرض'
    },
    actions: {
      'keybinds.openPanel': 'فتح اختصارات لوحة المفاتيح',
      'nav.commandPalette': 'فتح لوحة الأوامر',
      'nav.commandCenter': 'فتح مركز الأوامر',
      'nav.settings': 'فتح الإعدادات',
      'nav.profiles': 'فتح ملفات التعريف',
      'nav.capabilities': 'فتح المهارات',
      'nav.messaging': 'فتح المراسلة',
      'nav.artifacts': 'فتح المُخرَجات',
      'nav.cron': 'فتح المهام المجدولة',
      'nav.agents': 'فتح الوكلاء',
      'session.new': 'جلسة جديدة',
      'session.newTab': 'تبويب جلسة جديد',
      'session.newWindow': 'نافذة جديدة',
      'session.next': 'الجلسة التالية',
      'session.prev': 'الجلسة السابقة',
      'session.slot.1': 'التبديل إلى الجلسة الأخيرة 1',
      'session.slot.2': 'التبديل إلى الجلسة الأخيرة 2',
      'session.slot.3': 'التبديل إلى الجلسة الأخيرة 3',
      'session.slot.4': 'التبديل إلى الجلسة الأخيرة 4',
      'session.slot.5': 'التبديل إلى الجلسة الأخيرة 5',
      'session.slot.6': 'التبديل إلى الجلسة الأخيرة 6',
      'session.slot.7': 'التبديل إلى الجلسة الأخيرة 7',
      'session.slot.8': 'التبديل إلى الجلسة الأخيرة 8',
      'session.slot.9': 'التبديل إلى الجلسة الأخيرة 9',
      'session.focusSearch': 'البحث في الجلسات',
      'session.togglePin': 'تثبيت الجلسة الحالية / إلغاء تثبيتها',
      'session.archive': 'أرشفة الجلسة الحالية',
      'workspace.newWorktree': 'شجرة عمل (worktree) جديدة',
      'workspace.openFolder': 'فتح مجلد كمشروع',
      'composer.focus': 'التركيز على محرر الرسائل',
      'composer.modelPicker': 'فتح منتقي النموذج',
      'composer.voice': 'بدء المحادثة الصوتية / إيقافها',
      'composer.reasoningUp': 'رفع مستوى التفكير',
      'composer.reasoningDown': 'خفض مستوى التفكير',
      'view.toggleSidebar': 'إظهار/إخفاء الشريط الجانبي للجلسات',
      'view.cycleSidebarGrouping': 'تغيير تجميع الجلسات',
      'view.toggleRightSidebar': 'إظهار/إخفاء مستكشف الملفات',
      'view.toggleReview': 'إظهار/إخفاء لوحة المراجعة',
      'view.toggleStatusbar': 'إظهار/إخفاء شريط الحالة',
      'view.toggleTabStrip': 'إظهار/إخفاء التبويبات',
      'view.toggleProfileRail': 'إظهار/إخفاء شريط ملفات التعريف',
      'view.toggleSimpleMode': 'تفعيل/تعطيل الوضع البسيط',
      'view.showFiles': 'إظهار مستكشف الملفات',
      'view.showBrowser': 'إظهار/إخفاء المتصفح',
      'view.toggleHud': 'تبديل وضع HUD',
      'hud.snapToPointer': 'نقل HUD إلى المؤشر (عام، عندما يكون HUD مفتوحًا)',
      'view.showTerminal': 'إظهار/إخفاء الطرفية',
      'view.newTerminal': 'طرفية جديدة',
      'view.nextTerminal': 'الطرفية التالية',
      'view.prevTerminal': 'الطرفية السابقة',
      'view.closeTerminal': 'إغلاق الطرفية',
      'view.selectionToComposer': 'إرسال التحديد إلى محرر الرسائل',
      'view.terminalCopy': 'نسخ تحديد الطرفية',
      'view.terminalPaste': 'لصق في الطرفية',
      'view.closeTab': 'إغلاق التبويب',
      'view.reopenTab': 'إعادة فتح التبويب المغلق',
      'view.flipPanes': 'تبديل جانبي الشريط الجانبي',
      'view.findInPage': 'البحث في الصفحة',
      'view.findNext': 'البحث عن التطابق التالي',
      'view.findPrevious': 'البحث عن التطابق السابق',
      'view.tabSlot.1': 'التبديل إلى التبويب 1',
      'view.tabSlot.2': 'التبديل إلى التبويب 2',
      'view.tabSlot.3': 'التبديل إلى التبويب 3',
      'view.tabSlot.4': 'التبديل إلى التبويب 4',
      'view.tabSlot.5': 'التبديل إلى التبويب 5',
      'view.tabSlot.6': 'التبديل إلى التبويب 6',
      'view.tabSlot.7': 'التبديل إلى التبويب 7',
      'view.tabSlot.8': 'التبديل إلى التبويب 8',
      'view.tabSlot.9': 'التبديل إلى التبويب 9',
      'appearance.toggleMode': 'التبديل بين الفاتح / الداكن',
      'profile.default': 'التبديل إلى ملف التعريف الافتراضي',
      'profile.switch.1': 'التبديل إلى ملف التعريف 1',
      'profile.switch.2': 'التبديل إلى ملف التعريف 2',
      'profile.switch.3': 'التبديل إلى ملف التعريف 3',
      'profile.switch.4': 'التبديل إلى ملف التعريف 4',
      'profile.switch.5': 'التبديل إلى ملف التعريف 5',
      'profile.switch.6': 'التبديل إلى ملف التعريف 6',
      'profile.switch.7': 'التبديل إلى ملف التعريف 7',
      'profile.switch.8': 'التبديل إلى ملف التعريف 8',
      'profile.switch.9': 'التبديل إلى ملف التعريف 9',
      'profile.switch.10': 'التبديل إلى ملف التعريف 10',
      'profile.switch.11': 'التبديل إلى ملف التعريف 11',
      'profile.switch.12': 'التبديل إلى ملف التعريف 12',
      'profile.switch.13': 'التبديل إلى ملف التعريف 13',
      'profile.switch.14': 'التبديل إلى ملف التعريف 14',
      'profile.switch.15': 'التبديل إلى ملف التعريف 15',
      'profile.switch.16': 'التبديل إلى ملف التعريف 16',
      'profile.switch.17': 'التبديل إلى ملف التعريف 17',
      'profile.switch.18': 'التبديل إلى ملف التعريف 18',
      'profile.next': 'ملف التعريف التالي',
      'profile.prev': 'ملف التعريف السابق',
      'profile.toggleAll': 'تبديل عرض كل ملفات التعريف',
      'profile.create': 'إنشاء ملف تعريف',
      'composer.send': 'إرسال الرسالة',
      'composer.newline': 'إدراج سطر جديد',
      'composer.steer': 'توجيه الدور الحالي',
      'composer.queue': 'إضافة الرسالة إلى قائمة الانتظار',
      'composer.sendQueued': 'إرسال الدور التالي من قائمة الانتظار',
      'composer.mention': 'الإشارة إلى ملفات ومجلدات وروابط URL',
      'composer.slash': 'لوحة الأوامر المائلة (/)',
      'composer.help': 'مساعدة سريعة',
      'composer.history': 'التنقل في القائمة المنبثقة / السجل',
      'composer.cancel': 'إغلاق القائمة المنبثقة · إلغاء التشغيل'
    }
  },
  findInPage: {
    next: 'التطابق التالي',
    previous: 'التطابق السابق'
  },
  language: {
    label: 'اللغة',
    description: 'اختر لغة واجهة تطبيق سطح المكتب.',
    saving: 'جارٍ حفظ اللغة…',
    saveError: 'تعذّر تحديث اللغة',
    switchTo: 'تغيير اللغة',
    searchPlaceholder: 'ابحث في اللغات…',
    noResults: 'لم يتم العثور على لغات'
  },
  settings: {
    subpages: {
      appearanceTheme: 'السمة',
      appearanceTypography: 'الخطوط',
      appearanceWindowLayout: 'النافذة والتخطيط',
      appearanceChatDisplay: 'عرض المحادثات',
      appearancePet: 'الرفيق',
      appearanceGeneral: 'عام',
      modelMain: 'النموذج الرئيسي',
      modelAuxiliary: 'النماذج المساعدة',
      modelMoa: 'Mixture of Agents',
      modelFallbacks: 'النماذج الاحتياطية',
      chatBehavior: 'السلوك',
      chatAttachments: 'المرفقات',
      workspaceProjects: 'المشاريع والاكتشاف',
      workspaceShell: 'بيئة الصدفة (Shell)',
      workspaceFiles: 'الملفات والتنفيذ',
      safetyApprovals: 'الموافقات',
      safetyPrivacy: 'الخصوصية والشبكة',
      safetyCheckpoints: 'نقاط الاستعادة',
      browserProfile: 'ملف تعريف المتصفح',
      browserNetwork: 'روابط URL المحلية والخاصة',
      memoryPersistent: 'الذاكرة الدائمة',
      memoryContext: 'السياق والضغط',
      voiceConversation: 'المحادثة الصوتية',
      voiceTranscription: 'تحويل الكلام إلى نص',
      voiceSpeech: 'تحويل النص إلى كلام',
      advancedRuntime: 'حدود الوكيل',
      advancedTools: 'الوصول إلى الأدوات',
      advancedTerminal: 'الخادم الخلفي للطرفية',
      advancedOutput: 'حدود المخرجات',
      advancedDelegation: 'الوكلاء الفرعيون',
      advancedDesktop: 'سطح المكتب وبدء التشغيل',
      gatewayConnection: 'هذه النافذة',
      gatewayDevices: 'الاتصالات المحفوظة',
      gatewayManagedUpdates: 'التحديثات عن بُعد',
      gatewayManagedUpdatesUnavailable:
        'تحتاج التحديثات عن بُعد إلى إصدار من تطبيق سطح المكتب يدعم تحديثات SSH المُدارة.',
      gatewayManagedUpdatesEmpty:
        'أضف اتصال SSH في الاتصالات المحفوظة لإدارة تحديثاته من هنا.',
      keyboardShortcuts: 'اختصارات لوحة المفاتيح',
      hudGesture: 'إيماءة HUD',
      screenCapture: 'لقطة الشاشة',
      notificationAlerts: 'تنبيهات سطح المكتب',
      notificationSounds: 'الأصوات',
      archivedSessions: 'الأرشيف والاحتفاظ',
      defaultDirectory: 'مجلد المشروع الافتراضي',
      vaultCredentials: 'بيانات الاعتماد المحفوظة',
      vaultSources: 'مديرو كلمات المرور',
      appUpdates: 'الإصدار والتحديثات',
      uninstall: 'إزالة التثبيت',
      billingOverview: 'نظرة عامة',
      billingPlans: 'الخطط'
    },
    closeSettings: 'إغلاق الإعدادات',
    exportConfig: 'تصدير الإعدادات',
    importConfig: 'استيراد الإعدادات',
    resetToDefaults: 'إعادة التعيين إلى الافتراضي',
    resetConfirm: 'هل تريد إعادة كل الإعدادات إلى قيم Hermes الافتراضية؟',
    exportFailed: 'تعذّر التصدير',
    resetFailed: 'تعذّرت إعادة التعيين',
    pluginPages: {
      blurb:
        'خيارات أضافتها الإضافات المثبتة. لكل إضافة صفحتها الخاصة، وبعضها يضيف صفحات فرعية.',
      empty: 'لا توجد إضافة لها إعدادات بعد.',
      manage: 'إدارة الإضافات',
      agentSettings: 'إعدادات الوكيل',
      pageCount: (n: number) => (n === 1 ? 'صفحة واحدة' : n === 2 ? 'صفحتان' : n >= 3 && n <= 10 ? `${n} صفحات` : `${n} صفحة`),
      missing: 'لا توجد صفحة إعدادات لهذه الإضافة. ربما تكون معطّلة أو تمت إزالتها.'
    },
    nav: {
      providers: 'المزوّدون',
      providerAccounts: 'الحسابات',
      providerApiKeys: 'مفاتيح API',
      providerCustomEndpoints: 'نقاط النهاية المخصصة',
      providerLocalModels: 'النماذج المحلية',
      gateway: 'البوابة',
      apiKeys: 'الأدوات والمفاتيح',
      keybinds: 'اختصارات لوحة المفاتيح',
      keysTools: 'الأدوات',
      keysSettings: 'الإعدادات',
      mcp: 'MCP',
      archivedChats: 'المحادثات المؤرشفة',
      sessions: 'الجلسات',
      about: 'حول',
      billing: 'الفوترة',
      notifications: 'الإشعارات',
      vault: 'كلمات المرور وبيانات الاعتماد'
    },
    plugins: {
      title: 'إضافات سطح المكتب',
      openFolder: 'فتح مجلد إضافات سطح المكتب',
      rescan: 'إعادة الفحص',
      reveal: 'إظهار في مدير الملفات',
      failed: 'فشل',
      kinds: {
        bundled: 'مدمجة',
        disk: 'على القرص',
        runtime: 'وقت التشغيل'
      },
      installModal: {
        installFromGit: 'التثبيت من Git',
        reviewRepository: 'مراجعة المستودع',
        repoPlaceholder: 'https://github.com/owner/repo',
        title: 'تثبيت الإضافة',
        description: 'تحقّق من محتوى هذا المستودع قبل تثبيت أي شيء.',
        repoLabel: 'المستودع',
        includesHeading: 'تتضمن هذه الحزمة',
        agentLabel: 'إضافة الوكيل',
        desktopLabel: 'واجهة سطح المكتب',
        profileLabel: 'التثبيت لملف التعريف',
        agentTargetLocal: (profile, dir) => `تُثبَّت في الخادم الخلفي ${profile} (${dir})`,
        agentTargetRemote: profile => `تُثبَّت في الخادم الخلفي المتصل ${profile}`,
        toolsConnected: n => (n === 1 ? 'تم توصيل أداة واحدة' : n === 2 ? 'تم توصيل أداتين' : n >= 3 && n <= 10 ? `تم توصيل ${n} أدوات` : `تم توصيل ${n} أداة`),
        skillsReady: names => (names.length === 1 ? `المهارة ${names[0]} جاهزة` : `${names.length} مهارات جاهزة`),
        nextChat: 'أدوات إضافية متاحة في محادثتك القادمة',
        serverNotConnected: (server, reason) =>
          `خادم MCP ${server} غير متصل${reason ? `: ${reason}` : '.'}`,
        missingEnvAction: 'إعداده',
        alreadyInstalled: name => `${name} مثبت بالفعل.`,
        desktopTarget: 'تُثبَّت في مجلد desktop-plugins المحلي لهذا التطبيق',
        desktopTargetFromPackage:
          'تُحمَّل في هذا التطبيق من الحزمة أعلاه — نفسها لكل ملفات التعريف',
        desktopOnlyNote: 'الحزم الخاصة بسطح المكتب فقط لا تثبّت أي إضافة في الخادم الخلفي.',
        insecureWarning:
          'يستخدم هذا الرابط بروتوكولًا غير آمن أو محليًا. يُفضّل https:// أو git@ في بيئة الإنتاج.',
        securityIntro:
          'ثبّت من مصادر موثوقة فقط — راجع المستودع أدناه لترى ما ستتم إضافته.',
        sourceHeading: 'الكود المصدري',
        viewRepository: 'عرض المستودع',
        viewPluginFiles: 'عرض ملفات الإضافة',
        enableAgent: 'تفعيل إضافة الوكيل بعد التثبيت',
        forceReinstall: 'فرض إعادة التثبيت (استبدال النسخة الحالية)',
        pinToCommit: 'التثبيت على Commit محدد (اختياري)',
        pinToCommitPlaceholder: 'SHA كامل للـ Commit من 40 حرفًا',
        pinToCommitHint:
          'كل من يثبّت هذا الـ SHA يحصل على نفس الكود؛ وسترفض الإضافة التحديثات حتى تثبّتها على Commit جديد. اتركه فارغًا لاستخدام أحدث Commit.',
        pinToCommitInvalid:
          'يجب أن يتكون الـ SHA من 40 حرفًا بالضبط (لا تُقبل الفروع ولا الوسوم).',
        install: 'تثبيت',
        installing: 'جارٍ التثبيت…',
        probing: 'جارٍ فحص المستودع…',
        probeUnavailable: 'فحص الإضافة غير متاح في هذه البيئة.',
        desktopUnavailable: 'تثبيت إضافة سطح المكتب غير متاح في هذه البيئة.',
        selectComponent: 'اختر مكوّنًا واحدًا على الأقل لتثبيته.',
        agentSuccess: name => `تم تثبيت إضافة الوكيل ${name}`,
        desktopSuccess: name => `تم تثبيت إضافة سطح المكتب ${name}`,
        agentFailed: 'تعذّر تثبيت إضافة الوكيل',
        installUncertain:
          'توقّف Hermes عن انتظار نتيجة التثبيت، لكن ربما ما زالت الإضافة قيد التثبيت. أغلق هذه النافذة وحدّث قائمة الإضافات قبل إعادة المحاولة.',
        desktopFailed: 'تعذّر تثبيت إضافة سطح المكتب',
        missingEnv: (name, vars) =>
          `تم تثبيت ${name}، لكنه يحتاج إلى مفتاح ليعمل: ${vars}. أضفه الآن، وإلا ستفشل أدوات الإضافة.`,
        verified: 'موثّقة',
        unverified: 'غير موثّقة',
        reviewedByNous: 'راجعتها Nous.',
        installsAndEnables: profile => `تُثبَّت لـ ${profile} وتُفعَّل فورًا.`,
        installsOnly: profile => `تُثبَّت لـ ${profile}.`,
        advanced: 'متقدم',
        versionLabel: 'الإصدار',
        reviewedPin: sha => (sha ? `تثبيت مُراجَع ${sha}` : 'تثبيت مُراجَع'),
        latestCommit: 'أحدث Commit',
        nothingToInstall: 'لا يوجد في هذه الحزمة ما يُثبَّت هنا.'
      }
    },
    vault: {
      title: 'كلمات المرور وبيانات الاعتماد',
      blurb:
        'اطلب من الوكيل تسجيل الدخول إلى موقع: سيطلب منك بيانات الدخول في المرة الأولى، ثم يمكنه إعادة استخدامها. كلمات المرور مشفّرة على هذا الكمبيوتر وتُملأ مباشرة في الصفحة؛ ولا يراها النموذج أبدًا.',
      count: n => (n === 1 ? 'عنصر واحد محفوظ' : n === 2 ? 'عنصران محفوظان' : n >= 3 && n <= 10 ? `${n} عناصر محفوظة` : `${n} عنصرًا محفوظًا`),
      loadFailed: 'تعذّر تحميل عناصر الخزنة',
      empty: 'لا توجد عناصر محفوظة',
      emptyDesc:
        'لا حاجة لإضافة أي شيء مسبقًا. اطلب من الوكيل تسجيل الدخول إلى موقع وسيطلب منك بيانات الدخول في الوقت المناسب.',
      add: 'إضافة',
      addTitle: 'إضافة بيانات دخول أو بطاقة أو عنوان',
      addDescription: 'تُحفظ مشفّرة على هذا الكمبيوتر. لا يرى الوكيل كلمة المرور أبدًا.',
      added: 'تم الحفظ.',
      adding: 'جارٍ الحفظ…',
      addConfirm: 'حفظ',
      kindField: 'النوع',
      kinds: {
        login: 'بيانات دخول',
        payment: 'بطاقة دفع',
        address: 'عنوان'
      },
      labelField: 'التسمية',
      labelPlaceholder: 'مثلًا: حساب GitHub للعمل',
      labelRequired: 'التسمية مطلوبة.',
      originField: 'أصل الموقع',
      originPlaceholder: 'https://github.com',
      originPlaceholderCheckout: 'https://shop.example.com',
      originInvalid: 'أدخل رابط URL صالحًا، مثل https://example.com.',
      identifierTypeField: 'نوع المعرّف',
      identifierTypes: {
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        username: 'اسم المستخدم'
      },
      identifierField: 'المعرّف',
      identifierShown: identifier => identifier,
      passwordField: 'كلمة المرور',
      loginFieldsRequired: 'المعرّف وكلمة المرور مطلوبان.',
      cardNumberField: 'رقم البطاقة',
      cardNameField: 'الاسم على البطاقة',
      expMonthField: 'شهر الانتهاء',
      expYearField: 'سنة الانتهاء',
      cvcField: 'CVC',
      postalField: 'الرمز البريدي',
      addressLine1Field: 'سطر العنوان 1',
      addressLine2Field: 'سطر العنوان 2',
      cityField: 'المدينة',
      stateField: 'الولاية / المنطقة',
      countryField: 'الدولة',
      optional: '(اختياري)',
      createdOn: date => `أُضيف ${date}`,
      deleteAction: 'حذف العنصر المحفوظ',
      otpField: 'مفتاح المصادقة',
      otpPlaceholder: 'سرّ Base32 أو رابط otpauth://',
      otpHint:
        '«مفتاح الإعداد» الذي يعرضه الموقع عند تفعيل 2FA. بعد حفظه، يولّد Hermes الرموز بنفسه.',
      twoFactorBadge: '2FA تلقائي',
      deleteTitle: 'حذف هذا العنصر؟',
      deleteDescription: label => `سيُحذف «${label}» نهائيًا.`,
      deleteConfirm: 'حذف',
      sources: {
        title: 'مديرو كلمات المرور',
        blurb:
          'يتم اكتشاف مديري كلمات المرور المثبتين تلقائيًا. يطلب منك الوكيل فتح أحدها في أول مرة يحتاجه فيها (مرة لكل جلسة)؛ ولا يبقى في الذاكرة سوى رمز الجلسة، ولا يرى الوكيل كلمة المرور الرئيسية أو أي بيانات اعتماد أبدًا.',
        toggleFailed: 'تعذّر تحديث مدير كلمات المرور',
        notInstalled: name =>
          `غير مكتشف. ثبّت أداة سطر الأوامر ${name} وسجّل الدخول؛ وسيكتشفها Hermes تلقائيًا.`,
        disabledDesc: 'مكتشف لكنه معطّل في Hermes.',
        lockedDesc:
          'مكتشف. سيطلب منك الوكيل فتحه عند الحاجة، أو افتحه الآن.',
        unlockedDesc:
          'مفتوح لهذه الجلسة. يُقفل تلقائيًا بعد 30 دقيقة من عدم النشاط أو عند إغلاق Hermes.',
        statusLocked: 'مقفل',
        statusNotDetected: 'غير مكتشف',
        statusOff: 'معطّل',
        statusUnlocked: 'مفتوح',
        unlock: 'فتح القفل',
        unlocking: 'جارٍ فتح القفل…',
        lock: 'قفل',
        unlocked: name => `تم فتح ${name} لهذه الجلسة.`,
        unlockTitle: name => `فتح قفل ${name}`,
        unlockDescription:
          'أدخل كلمة المرور الرئيسية. تُمرَّر إلى مدير كلمات المرور على هذا الجهاز ثم تُتلف — لا تُخزَّن ولا تُسجَّل ولا تُعرض على الوكيل أبدًا.',
        masterPasswordPlaceholder: 'كلمة المرور الرئيسية'
      }
    },
    notifications: arNotifications,
    sections: {
      model: 'النموذج',
      chat: 'المحادثة',
      appearance: 'المظهر',
      workspace: 'مساحة العمل',
      safety: 'الأمان',
      memory: 'الذاكرة والسياق',
      voice: 'الصوت',
      advanced: 'متقدم'
    },
    searchPlaceholder: {
      about: 'حول Hermes Desktop',
      config: 'ابحث في الإعدادات...',
      gateway: 'الاتصال بالبوابة...',
      keys: 'ابحث في مفاتيح API...',
      mcp: 'ابحث في خوادم MCP...',
      sessions: 'ابحث في الجلسات المؤرشفة...'
    },
    modeOptions: {
      light: {
        label: 'فاتح',
        description: 'أسطح مضيئة'
      },
      dark: {
        label: 'داكن',
        description: 'مساحة عمل بلا وهج'
      },
      system: {
        label: 'النظام',
        description: 'اتباع مظهر النظام'
      }
    },
    appearance: {
      chatTextScaleTitle: 'حجم نص المحادثة',
      chatTextScaleDesc:
        'يضبط نص المحادثات وحقل الإدخال نسبةً إلى مقياس الواجهة. تحتفظ الأشرطة الجانبية وعناصر التحكم بحجمها.',
      title: 'المظهر',
      intro:
        'خاص بتطبيق سطح المكتب. الوضع يتحكم في السطوع، والسمة تتحكم في لوحة الألوان وإطار المحادثة.',
      colorMode: 'وضع الألوان',
      colorModeDesc: 'اختر وضعًا ثابتًا أو دع Hermes يتبع إعداد النظام.',
      toolViewTitle: 'عرض استدعاءات الأدوات',
      toolViewDesc:
        'وضع «المنتج» يخفي البيانات الخام؛ ووضع «تقني» يعرض المدخلات والمخرجات كاملة.',
      hideCodeDiffsTitle: 'إخفاء فروقات الكود',
      hideCodeDiffsDesc:
        'عرض تعديلات الملفات كسطور أدوات مع عدد الأسطر المضافة/المحذوفة، دون الكود.',
      hideThreadTimelineTitle: 'إخفاء أشرطة الخط الزمني',
      hideThreadTimelineDesc: 'إخفاء أشرطة التنقل على الحافة اليمنى لكل محادثة.',
      reasoningCollapsedTitle: 'طي التفكير افتراضيًا',
      reasoningCollapsedDesc:
        'إبقاء التفكير المتدفق مطويًا حتى تفتحه بنفسك.',
      uiScaleTitle: 'مقياس الواجهة',
      uiScaleDesc: (percent: number) =>
        `يغيّر حجم النص وعناصر التحكم في كل التطبيق. يعمل أيضًا Cmd/Ctrl مع + و- و0. الحالي: ${percent}%.`,
      sessionDensityTitle: 'كثافة قائمة الجلسات',
      sessionDensityDesc:
        'اختر مقدار السياق المعروض تحت عناوين الجلسات في الشريط الجانبي.',
      sessionDensityCompact: 'مضغوطة',
      sessionDensityComfortable: 'مريحة',
      sessionDensityDetailed: 'مفصّلة',
      tabStripTitle: 'شريط التبويبات',
      tabStripDesc:
        'يعرض التبويبات فوق المنطقة. الوضع التلقائي يخفيها عندما تحتوي المنطقة على لوحة واحدة فقط.',
      tabStripAuto: 'تلقائي',
      tabStripAlways: 'دائمًا',
      tabStripNever: 'أبدًا',
      appActionsTitle: 'إجراءات التطبيق',
      appActionsDesc:
        'اختر جانب شريط العنوان الذي توضع فيه الإعدادات والتخطيط وHUD. الجانب الأيمن يترك مساحة للتبويبات على اليسار.',
      appActionsLeft: 'يسار',
      appActionsRight: 'يمين',
      terminalFontTitle: 'خط الطرفية',
      terminalFontDesc:
        'اختر خطًا مثبتًا لطرفيات سطح المكتب. خطوط Nerd Fonts تعرض Powerlevel10k وأيقونات الصدفة بشكل صحيح؛ اتركه فارغًا لاستخدام JetBrains Mono المدمج.',
      terminalFontPlaceholder: 'MesloLGS NF أو قائمة خطوط CSS',
      terminalFontPreview: 'معاينة الرموز',
      terminalFontReset: 'استخدام الافتراضي',
      chatFontTitle: 'خط المحادثة',
      chatFontDesc:
        'اختر خطًا مثبتًا للمحادثة وبقية التطبيق. مفيد لخطوط أسهل قراءة مثل OpenDyslexic؛ اتركه فارغًا لاستخدام خط السمة.',
      chatFontPlaceholder: 'OpenDyslexic أو قائمة خطوط CSS',
      chatFontPreview: 'معاينة',
      chatFontSample: 'نص تجريبي لمعاينة الخط: أبجد هوز حطي كلمن سعفص قرشت. 0123456789',
      chatFontReset: 'استخدام خط السمة',
      translucencyTitle: 'شفافية النافذة',
      translucencyDesc: 'رؤية سطح المكتب عبر النافذة كاملة. macOS وWindows فقط.',
      translucencyGlassDesc:
        'زجاج مطفأ: يبقى سطح المكتب ظاهرًا خلف ضبابية متجانسة بينما يبقى النص واضحًا. macOS فقط.',
      translucencyModeClear: 'شفاف',
      translucencyModeGlass: 'زجاج',
      translucencyTintTitle: 'الصبغة',
      translucencyFadeTitle: 'الخفوت',
      translucencyFrostTitle: 'الضبابية',
      translucencyFrost: {
        'under-window': 'عميقة',
        popover: 'ناعمة',
        titlebar: 'خفيفة',
        header: 'لامعة'
      },
      translucencyScopeTitle: 'النطاق',
      translucencyScope: {
        window: 'النافذة كاملة',
        sidebar: 'الشريط الجانبي فقط'
      },
      backdropTitle: 'خلفية المحادثة',
      backdropDesc: 'صورة التمثال الخافتة خلف المحادثة.',
      userBubbleTitle: 'فقاعة الرسائل',
      userBubbleDesc: 'شفافية رسائلك: خلفية معتمة عند 0؛ ويبقى الإطار وحده ظاهرًا عند 100.',
      textDirectionTitle: 'اتجاه النص',
      textDirectionDesc:
        'اتجاه كتابة الرسائل وحقل الإدخال. «تلقائي» يتبع أول حرف في كل فقرة؛ اختر اتجاهًا عندما يُحاذى النص المختلط بشكل خاطئ. يبقى الكود دائمًا من اليسار إلى اليمين.',
      textDirection: { auto: 'تلقائي', rtl: 'من اليمين إلى اليسار', ltr: 'من اليسار إلى اليمين' },
      introSplashTitle: 'شاشة الترحيب',
      introSplashDesc: 'الشعار والدعوة المعروضان في محادثة فارغة.',
      modelPricingTitle: 'أسعار النماذج',
      modelPricingDesc:
        'يعرض أسعار الإدخال والإخراج وقراءة الذاكرة المؤقتة لكل مليون توكن في منتقي النموذج.',
      reactionsTitle: 'التفاعل مع الرسائل',
      reactionsDesc: 'تفاعلات بالإيموجي على طريقة iMessage — تفاعل مع الرسائل، ويمكن لـ Hermes التفاعل مع رسائلك.',
      tipsTitle: 'نصائح داخل التطبيق',
      tipsDesc:
        'تشير فقاعة صغيرة أحيانًا إلى جزء من التطبيق عندما تكون خاملًا أو عندما يستطيع Hermes مساعدتك. إغلاق النصيحة يخفيها نهائيًا.',
      tipsReset: (count: number) =>
        `إعادة إظهار النصائح المغلقة (${count})`,
      toursTitle: 'الجولات الإرشادية',
      toursDesc:
        'دع Hermes يرشدك داخل التطبيق بتعتيم الشاشة وإبراز كل خطوة.',
      composerPopoutTitle: 'فصل حقل الإدخال',
      composerPopoutDesc:
        'يسمح بسحب حقل الإدخال خارج مكانه. عند التعطيل يبقى مثبتًا في الأسفل.',
      fileBrowserTitle: 'متصفح الملفات',
      fileBrowserDesc:
        'يعرض متصفح الملفات بجوار المحادثة عند فتح مساحة عمل. زر شريط العنوان يغيّر هذا الإعداد أيضًا.',
      vibeHeartsTitle: 'قلوب الأجواء',
      vibeHeartsDesc:
        'تظهر قلوب طائرة عندما تقول شكرًا أو «أحبك» أو «good bot» أو ترسل قلبًا. هذا الخيار مستقل عن التفاعل مع الرسائل أعلاه.',
      embedsTitle: 'التضمينات المباشرة',
      embedsDesc:
        'تُحمَّل المعاينات الغنية من مواقع خارجية (YouTube وX و…). «اسأل» يعرض عنصرًا نائبًا حتى تسمح بكل واحدة؛ و«دائمًا» يحمّلها تلقائيًا؛ و«معطّل» يبقي الروابط عادية.',
      embedsAsk: 'اسأل',
      embedsAlways: 'دائمًا',
      embedsOff: 'معطّل',
      embedsReset: (count: number) =>
        `إعادة تعيين ${count === 1 ? 'خدمة واحدة مسموح بها' : count === 2 ? 'خدمتين مسموح بهما' : count >= 3 && count <= 10 ? `${count} خدمات مسموح بها` : `${count} خدمة مسموح بها`}`,
      resumeLastSessionTitle: 'إعادة فتح آخر محادثة عند التشغيل',
      resumeLastSessionDesc:
        'عند تفعيل هذا الخيار، يعيد التطبيق فتح أحدث محادثة بعد التشغيل من جديد. عطّله لتبدأ دائمًا بمحادثة جديدة.',
      product: 'المنتج',
      productDesc: 'نشاط أدوات سهل القراءة مع ملخصات موجزة.',
      technical: 'تقني',
      technicalDesc: 'تضمين وسائط/نتائج الأدوات الخام والتفاصيل منخفضة المستوى.',
      themeTitle: 'السمة',
      themeDesc: 'لوحات ألوان لسطح المكتب فقط. يُطبَّق الوضع المختار فوقها.',
      themeSearchPlaceholder: 'ابحث في سماتك أو في VS Code Marketplace…',
      themeProfileNote: profile => `محفوظة لملف التعريف ${profile} — لكل ملف تعريف سمته الخاصة.`,
      installTitle: 'التثبيت من VS Code',
      installDesc:
        'الصق معرّف امتداد من Marketplace (مثل dracula-theme.theme-dracula) لتحويل سمة ألوانه إلى لوحة ألوان لسطح المكتب.',
      installPlaceholder: 'publisher.extension',
      installButton: 'تثبيت',
      installing: 'جارٍ التثبيت…',
      installError: 'تعذّر تثبيت هذه السمة.',
      installed: name => `تم تثبيت «${name}».`,
      removeTheme: 'إزالة السمة',
      importedBadge: 'مستوردة',
      pet: {
        title: 'الحيوان الأليف',
        intro:
          'تبنَّ تميمة petdex متحركة تطفو فوق التطبيق وتتفاعل مع ما يفعله Hermes — تجري أثناء تشغيل الأدوات، وتحتفل بالنجاح، وتزعل من الأخطاء.',
        restartHint:
          'تحتاج الحيوانات الأليفة إلى إعادة تشغيل سريعة — التطبيق الحالي بدأ قبل إضافة هذه الميزة. أغلق Hermes وافتحه من جديد، ثم ارجع إلى هنا.',
        scaleTitle: 'الحجم',
        scaleDesc: 'غيّر حجم التميمة الطافية. يُطبَّق في كل مكان فورًا.',
        roamTitle: 'التجوّل',
        roamDesc: 'دع الحيوان يتجوّل في النافذة أثناء أوقات الخمول.',
        chooseTitle: 'اختيار حيوان',
        chooseDesc: 'اختياره يثبّته (إذا لزم الأمر) ويفعّله.',
        searchPlaceholder: 'ابحث في الحيوانات…',
        unreachable: 'تعذّر الوصول إلى معرض petdex. تحقّق من اتصالك ثم أعد فتح هذه الصفحة.',
        noMatch: query => `لا يوجد حيوان يطابق «${query}».`,
        installedTag: 'مثبّت',
        generatedTag: 'مُولَّد',
        countCapped: (cap, total) => `عرض ${cap} من ${total} — اكتب لتضييق النتائج.`,
        count: n => (n === 1 ? 'حيوان واحد.' : n === 2 ? 'حيوانان.' : n >= 3 && n <= 10 ? `${n} حيوانات.` : `${n} حيوانًا.`),
        uninstall: name => `إزالة تثبيت ${name}`,
        delete: name => `حذف ${name}`,
        deleteTitle: name => `حذف ${name}؟`,
        deleteBody: 'سيُحذف الحيوان نهائيًا — ولا يمكن إعادة تثبيته.',
        deleteConfirm: 'حذف',
        rename: name => `إعادة تسمية ${name}`,
        renameTitle: 'إعادة تسمية الحيوان',
        renamePlaceholder: 'اختر اسمًا لحيوانك',
        renameSave: 'حفظ',
        exportPet: name => `تصدير ${name}`,
        adoptFailed: slug => `تعذّر تبنّي ${slug}`,
        uninstallFailed: slug => `تعذّرت إزالة تثبيت ${slug}`,
        renameFailed: slug => `تعذّرت إعادة تسمية ${slug}`,
        exportFailed: slug => `تعذّر تصدير ${slug}`,
        noneAvailable: 'لا توجد حيوانات متاحة حاليًا.',
        turnOnFailed: 'تعذّر تفعيل الحيوان.',
        turnOffFailed: 'تعذّر تعطيل الحيوان.'
      }
    },
    fieldLabels: defineFieldCopy({
      model: 'النموذج الافتراضي',
      modelContextLength: 'نافذة سياق النموذج الرئيسي (تجاوز)',
      fallbackProviders: 'النماذج الاحتياطية',
      toolsets: 'مجموعات الأدوات المفعّلة',
      timezone: 'المنطقة الزمنية',
      display: {
        personality: 'الشخصية',
        showReasoning: 'كتل التفكير'
      },
      desktop: {
        repoScanEnabled: 'الاكتشاف التلقائي للمستودعات',
        repoScanRoots: 'جذور اكتشاف المستودعات',
        repoScanExcludePaths: 'مسارات المستودعات المستثناة'
      },
      agent: {
        maxTurns: 'الحد الأقصى لخطوات الوكيل',
        imageInputMode: 'مرفقات الصور',
        apiMaxRetries: 'إعادة محاولات API',
        serviceTier: 'مستوى الخدمة',
        toolUseEnforcement: 'التحكم في استخدام الأدوات'
      },
      terminal: {
        cwd: 'مجلد العمل',
        backend: 'الخادم الخلفي للتنفيذ',
        timeout: 'مهلة الأمر',
        persistentShell: 'صدفة (Shell) دائمة',
        envPassthrough: 'تمرير البيئة',
        dockerImage: 'صورة Docker',
        singularityImage: 'صورة Singularity',
        modalImage: 'صورة Modal',
        daytonaImage: 'صورة Daytona'
      },
      fileReadMaxChars: 'حد قراءة الملفات',
      toolOutput: {
        maxBytes: 'حد مخرجات الطرفية',
        maxLines: 'حد تقسيم الملفات إلى صفحات',
        maxLineLength: 'حد طول السطر'
      },
      codeExecution: { mode: 'وضع تنفيذ الكود' },
      approvals: {
        mode: 'وضع الموافقة',
        timeout: 'مهلة الموافقة',
        mcpReloadConfirm: 'تأكيد إعادة تحميل MCP'
      },
      commandAllowlist: 'قائمة الأوامر المسموح بها',
      security: {
        redactSecrets: 'حجب الأسرار',
        allowPrivateUrls: 'السماح بعناوين الويب الخاصة'
      },
      browser: {
        allowPrivateUrls: 'عناوين الويب الخاصة في المتصفح',
        autoLocalForPrivateUrls: 'متصفح محلي لعناوين الويب الخاصة',
        useRealProfile: 'استخدام ملف تعريف متصفحي الحقيقي'
      },
      checkpoints: {
        enabled: 'نقاط استعادة الملفات',
        maxSnapshots: 'حد نقاط الاستعادة'
      },
      voice: {
        maxRecordingSeconds: 'أقصى مدة للتسجيل',
        autoTts: 'قراءة الردود بصوت عالٍ',
        voiceChatMode: 'وضع المحادثة الصوتية',
        gptLive: {
          voice: 'صوت GPT-Live',
          instructions: 'شخصية GPT-Live'
        }
      },
      stt: {
        enabled: 'تحويل الكلام إلى نص',
        echoTranscripts: 'إعادة نشر التفريغ النصي',
        provider: 'مزوّد تحويل الكلام إلى نص',
        local: {
          model: 'نموذج التفريغ المحلي',
          language: 'لغة التفريغ'
        },
        openai: {
          model: 'نموذج STT من OpenAI'
        },
        groq: {
          model: 'نموذج STT من Groq'
        },
        mistral: {
          model: 'نموذج STT من Mistral'
        },
        elevenlabs: {
          modelId: 'نموذج STT من ElevenLabs',
          languageCode: 'لغة ElevenLabs',
          tagAudioEvents: 'وسم الأحداث الصوتية',
          diarize: 'تمييز المتحدثين'
        }
      },
      tts: {
        provider: 'مزوّد تحويل النص إلى كلام',
        edge: {
          voice: 'صوت Edge'
        },
        openai: {
          model: 'نموذج TTS من OpenAI',
          voice: 'صوت OpenAI'
        },
        elevenlabs: {
          voiceId: 'صوت ElevenLabs',
          modelId: 'نموذج ElevenLabs'
        },
        xai: {
          voiceId: 'صوت xAI (Grok)',
          language: 'لغة xAI',
          speed: 'سرعة التشغيل في xAI',
          autoSpeechTags: 'وسوم الكلام التلقائية في xAI',
          optimizeStreamingLatency: 'تحسين زمن الاستجابة للبث في xAI',
          sampleRate: 'معدل العيّنات في xAI',
          bitRate: 'معدل البت في xAI'
        },
        minimax: {
          model: 'نموذج TTS من MiniMax',
          voiceId: 'صوت MiniMax'
        },
        mistral: {
          model: 'نموذج TTS من Mistral',
          voiceId: 'صوت Mistral'
        },
        gemini: {
          model: 'نموذج TTS من Gemini',
          voice: 'صوت Gemini'
        },
        neutts: {
          model: 'نموذج NeuTTS',
          device: 'جهاز NeuTTS'
        },
        kittentts: {
          model: 'نموذج KittenTTS',
          voice: 'صوت KittenTTS'
        },
        piper: {
          voice: 'صوت Piper'
        },
        deepinfra: {
          model: 'نموذج TTS من DeepInfra',
          voice: 'صوت DeepInfra'
        }
      },
      memory: {
        memoryEnabled: 'الذاكرة الدائمة',
        userProfileEnabled: 'ملف تعريف المستخدم',
        memoryCharLimit: 'ميزانية الذاكرة',
        userCharLimit: 'ميزانية ملف التعريف',
        provider: 'مزوّد الذاكرة'
      },
      context: {
        engine: 'محرك السياق'
      },
      compression: {
        enabled: 'الضغط التلقائي',
        threshold: 'عتبة الضغط',
        codexGpt55Autoraise: 'رفع الضغط تلقائيًا لـ Codex',
        targetRatio: 'هدف الضغط',
        protectLastN: 'الرسائل الأخيرة المحمية'
      },
      auxiliary: {
        compression: {
          timeout: 'مهلة نموذج الضغط (ث)'
        }
      },
      delegation: {
        model: 'نموذج الوكيل الفرعي',
        provider: 'مزوّد الوكيل الفرعي',
        maxIterations: 'حد أدوار الوكيل الفرعي',
        maxConcurrentChildren: 'الوكلاء الفرعيون المتوازيون',
        childTimeoutSeconds: 'مهلة الوكيل الفرعي',
        reasoningEffort: 'مستوى تفكير الوكيل الفرعي'
      },
      updates: {
        nonInteractiveLocalChanges: 'التعديلات المحلية عند التحديث المدمج'
      }
    }),
    fieldDescriptions: defineFieldCopy({
      model: 'يُستخدم للمحادثات الجديدة ما لم تختر نموذجًا آخر في محرر الرسائل.',
      modelContextLength:
        'يتجاوز نافذة السياق المكتشفة لنموذج المحادثة الرئيسي فقط (بالتوكن). اتركه 0 لاستخدام القيمة المكتشفة للنموذج المختار. لا يؤثر على النماذج المساعدة/MoA.',
      fallbackProviders: 'إدخالات provider:model احتياطية تُجرَّب إذا فشل النموذج الافتراضي.',
      display: {
        personality: 'الأسلوب الافتراضي للمساعد في الجلسات الجديدة.',
        showReasoning: 'عرض أقسام التفكير عندما يوفّرها الخادم الخلفي.'
      },
      desktop: {
        repoScanEnabled: 'فحص المجلدات المحلية بحثًا عن مستودعات Git لعرضها في المشاريع.',
        repoScanRoots: 'المجلدات المراد فحصها. اتركها فارغة لفحص مجلدك الرئيسي.',
        repoScanExcludePaths: 'مجلدات (مع ما بداخلها) تُتجاهل أثناء اكتشاف المستودعات.'
      },
      timezone: 'معرّف منطقة زمنية IANA. إذا تُرك فارغًا، تُستخدم منطقة النظام الزمنية.',
      browser: {
        useRealProfile:
          'التصفح المحلي يستخدم تسجيلات دخولك الحقيقية. ينسخ Hermes ملف تعريف متصفحك الافتراضي (ملفات تعريف الارتباط، وتسجيلات الدخول، والتفضيلات) إلى لقطة مُدارة ويشغّلها عبر Chromium المدمج — لا يُفتح ملف تعريفك النشط مباشرة أبدًا، وتُحدَّث النسخة في كل تشغيل. يسمح أيضًا للوكيل بفتح جلسة محلية بملف تعريفك الحقيقي عند الطلب، حتى إذا كان هناك خادم خلفي سحابي للمتصفح مهيأ. المتصفحات المبنية على Chromium فقط (Chrome وEdge وBrave وBrave Origin وChromium) مدعومة؛ وإذا كان المتصفح الافتراضي غير مبني على Chromium فسيفشل برسالة واضحة. معطّل افتراضيًا.'
      },
      agent: {
        imageInputMode: 'يتحكم في طريقة إرسال مرفقات الصور إلى النموذج.',
        maxTurns: 'الحد الأعلى لأدوار استدعاء الأدوات قبل أن يوقف Hermes التشغيل.'
      },
      terminal: {
        cwd: 'مجلد المشروع الافتراضي للأدوات والطرفية.',
        persistentShell: 'يحتفظ بحالة الصدفة بين الأوامر عندما يسمح الخادم الخلفي بذلك.',
        envPassthrough: 'متغيرات البيئة التي تُمرَّر إلى تنفيذ الأدوات.',
        dockerImage: 'صورة الحاوية المستخدمة عندما يكون الخادم الخلفي للتنفيذ Docker.',
        singularityImage: 'الصورة المستخدمة عندما يكون الخادم الخلفي للتنفيذ Singularity.',
        modalImage: 'الصورة المستخدمة عندما يكون الخادم الخلفي للتنفيذ Modal.',
        daytonaImage: 'الصورة المستخدمة عندما يكون الخادم الخلفي للتنفيذ Daytona.'
      },
      codeExecution: {
        mode: 'مدى تقييد تنفيذ الكود بالمشروع الحالي.'
      },
      fileReadMaxChars: 'أقصى عدد من الأحرف يمكن لـ Hermes قراءته في طلب ملف واحد.',
      approvals: {
        mode: 'كيف يتعامل Hermes مع الأوامر التي تحتاج إلى موافقة صريحة.',
        timeout: 'مدة انتظار طلبات الموافقة قبل انتهاء المهلة.'
      },
      security: {
        redactSecrets: 'يحجب الأسرار المكتشفة من المحتوى الذي يراه النموذج متى أمكن.'
      },
      checkpoints: {
        enabled: 'إنشاء لقطات استعادة قبل تعديل الملفات.'
      },
      memory: {
        memoryEnabled: 'حفظ ذكريات دائمة قد تساعد في الجلسات القادمة.',
        userProfileEnabled: 'الاحتفاظ بملف تعريف موجز لتفضيلات المستخدم.'
      },
      context: {
        engine: 'استراتيجية التعامل مع المحادثات الطويلة القريبة من حد السياق.'
      },
      compression: {
        enabled: 'تلخيص السياق القديم عندما تكبر المحادثات.',
        codexGpt55Autoraise: 'رفع الضغط إلى 85% لنماذج ChatGPT Codex OAuth المدعومة.'
      },
      auxiliary: {
        compression: {
          timeout:
            'عدد ثواني انتظار نموذج الضغط المساعد لكل استدعاء (الافتراضي 120). زِدها للنماذج المحلية البطيئة.'
        }
      },
      voice: {
        autoTts: 'يقرأ ردود المساعد بصوت عالٍ تلقائيًا.',
        voiceChatMode:
          'chained: تحويل الكلام إلى نص ← Hermes ← تحويل النص إلى كلام باستخدام المزوّدين أدناه. gpt-live: نموذج صوتي من OpenAI ثنائي الاتجاه بالكامل (gpt-live-1) يستمع ويتحدث، ويحيل كل طلب حقيقي إلى Hermes — فيرد النموذج الذي اخترته مع كل الأدوات. يحتاج إلى مفتاح API من OpenAI؛ وتُحتسب الطبقة الصوتية بسعر 0.05$ للدقيقة.',
        gptLive: {
          voice: 'صوت وضع GPT-Live. تُقبل معرّفات الأصوات المخصصة.',
          instructions:
            'جمل إضافية لشخصية الصوت المباشر (النبرة، والإيقاع، واللغة). يحتفظ Hermes بتعليمات النظام الخاصة به.'
        }
      },
      tts: {
        xai: {
          voiceId: 'معرّف صوت xAI (مثل eve) أو معرّف صوت مخصص.',
          language: 'رمز اللغة المنطوقة (مثل en أو pt-BR) أو "auto" للاكتشاف التلقائي.',
          speed: 'سرعة التشغيل. 0.7 = أبطأ، 1.0 = عادي، 1.5 = أسرع.',
          autoSpeechTags:
            'السماح لنموذج LLM بإدراج وسوم صوتية معبّرة ([laughing] و[sighs]) في النص قبل التوليد.',
          optimizeStreamingLatency: 'الموازنة بين زمن الاستجابة والجودة. 0 = أفضل جودة، 2 = أقل زمن استجابة.',
          sampleRate:
            'معدل عيّنات الصوت بالهرتز. كلما ارتفع زادت الجودة وكبر حجم الملفات.',
          bitRate: 'معدل بت MP3 بوحدة bps. يُطبَّق فقط عندما يكون الترميز mp3.'
        },
        neutts: {
          device: 'جهاز الاستدلال المحلي لـ NeuTTS.'
        }
      },
      stt: {
        enabled: 'تفعيل التفريغ النصي للصوت محليًا أو عبر مزوّد.',
        echoTranscripts: 'نشر التفريغ النصي الخام 🎙️ للرسائل الصوتية في المحادثة.',
        elevenlabs: {
          languageCode: 'رمز لغة ISO-639-3 اختياري. فارغ = اكتشاف تلقائي من ElevenLabs.'
        }
      },
      updates: {
        nonInteractiveLocalChanges:
          'عندما يتحدّث Hermes من داخل التطبيق (دون طلب في الطرفية)، يحتفظ بالتعديلات المحلية (stash) أو يتجاهلها (discard). التحديثات عبر الطرفية تطلب التأكيد دائمًا.'
      }
    }),
    uninstallSection: {
      dangerZone: 'منطقة الخطر',
      checkingInstalled: 'جارٍ التحقق من العناصر المثبتة…',
      uninstallHermes: 'إزالة تثبيت Hermes',
      chooseHowMuch:
        'اختر ما تريد إزالته. سيُغلق التطبيق لإكمال العملية؛ ويمكنك فتح برنامج التثبيت في أي وقت للعودة.',
      confirmUninstall: 'تأكيد إزالة التثبيت',
      confirmBody: what => `سيؤدي هذا إلى إزالة ${what}. لا يمكن التراجع عن ذلك.`,
      appLabel: 'التطبيق:',
      couldNotStart: 'تعذّر بدء إزالة التثبيت.',
      uninstalling: 'جارٍ إزالة التثبيت…',
      yesUninstall: 'نعم، أزل التثبيت',
      options: {
        gui: {
          title: 'إزالة واجهة المحادثة فقط',
          description:
            'يزيل تطبيق سطح المكتب هذا. يتم الاحتفاظ بوكيل Hermes وإعداداتك ومحادثاتك.',
          consequence: 'واجهة المحادثة لسطح المكتب (هذا التطبيق وبياناته)'
        },
        lite: {
          title: 'إزالة الواجهة والوكيل مع الاحتفاظ ببياناتي',
          description:
            'يزيل التطبيق ووكيل Hermes، لكنه يحتفظ بالإعدادات والمحادثات والأسرار لإعادة التثبيت لاحقًا.',
          consequence:
            'واجهة المحادثة ووكيل Hermes (يتم الاحتفاظ بالإعدادات والمحادثات والأسرار)'
        },
        full: {
          title: 'إزالة كل شيء',
          description:
            'يزيل التطبيق والوكيل وكل بيانات المستخدم: الإعدادات، والمحادثات، والمهام المجدولة، والأسرار، والسجلات.',
          consequence:
            'كل شيء — واجهة المحادثة، ووكيل Hermes، وكل إعداداتك ومحادثاتك وأسرارك وسجلاتك'
        }
      }
    },
    customEndpoints: {
      active: 'نشط',
      apiKeySet: 'تم تعيين مفتاح API',
      use: 'استخدام',
      editTitle: 'تعديل نقطة النهاية',
      addTitle: 'إضافة نقطة نهاية',
      fields: {
        name: 'الاسم',
        providerId: 'معرّف المزوّد',
        endpointUrl: 'رابط URL لنقطة النهاية',
        defaultModel: 'النموذج الافتراضي',
        context: 'السياق',
        apiKey: 'مفتاح API',
        apiKeyNewPlaceholder: 'اتركه فارغًا للاحتفاظ بالمفتاح الحالي',
        apiKeyPlaceholder: 'اختياري',
        useNewChats: 'الاستخدام للمحادثات الجديدة',
        discoverModels: 'اكتشاف النماذج'
      },
      test: 'اختبار',
      save: 'حفظ',
      newEndpoint: 'نقطة نهاية جديدة',
      apiMode: 'وضع API',
      autoDetect: 'اكتشاف تلقائي',
      couldNotLoad: 'تعذّر تحميل نقاط النهاية المخصصة',
      endpointSaved: 'تم حفظ نقطة النهاية المخصصة.',
      saveFailed: 'تعذّر الحفظ',
      endpointReachable: 'يمكن الوصول إلى نقطة النهاية.',
      endpointReachableTransport: transport => `يمكن الوصول إلى نقطة النهاية (المسار ${transport} متاح).`,
      endpointReachableModels: (reachable, count) =>
        `${reachable} تم العثور على ${count === 1 ? 'نموذج واحد' : count === 2 ? 'نموذجين' : count >= 3 && count <= 10 ? `${count} نماذج` : `${count} نموذجًا`}.`,
      endpointValidationFailed: 'فشل التحقق من نقطة النهاية.',
      validationFailed: 'فشل التحقق',
      activationFailed: 'فشل التفعيل',
      deleteConfirm: name => `حذف ${name}؟`,
      deleteFailed: 'تعذّر الحذف',
      title: 'نقاط النهاية المخصصة',
      deleteEndpoint: 'حذف نقطة النهاية',
      emptyDescription: 'أضف أدناه نقطة نهاية متوافقة مع OpenAI.',
      emptyTitle: 'لا توجد نقاط نهاية مخصصة',
      namePlaceholder: 'Axet Proxy',
      contextPlaceholder: 'تلقائي'
    },
    computerUse: {
      accessibility: 'إمكانية الوصول',
      screenRecording: 'تسجيل الشاشة',
      driverHealth: 'حالة برنامج التشغيل'
    },
    about: { updates: 'التحديثات', channel: arUpdateChannel },
    config: {
      minimizeToTrayTitle: 'التصغير إلى شريط الحالة',
      minimizeToTrayDesc:
        'تصغير النوافذ أو إغلاق النافذة الرئيسية يخفيها في منطقة الإشعارات (شريط القوائم على macOS) ويستمر Hermes في العمل. استخدم «إنهاء Hermes» من قائمة منطقة الإشعارات أو Cmd+Q للخروج. معطّل افتراضيًا؛ ويُطبَّق على هذا الجهاز فقط.',
      minimizeToTrayUnavailable:
        'منطقة الإشعارات غير متاحة. سيتم تصغير النوافذ وإغلاقها بشكل عادي. عطّل هذا الخيار ثم فعّله لإعادة المحاولة.',
      none: 'لا شيء',
      noneParen: '(لا شيء)',
      builtinOnly: 'المدمج فقط',
      notSet: 'غير محدد',
      commaSeparated: 'قيم مفصولة بفواصل',
      searchPlaceholder: 'بحث…',
      noResults: 'لم يتم العثور على نتائج',
      systemDefault: 'افتراضي النظام',
      loading: 'جارٍ تحميل إعدادات Hermes...',
      emptyTitle: 'لا يوجد ما يُضبط',
      emptyDesc: 'لا يحتوي هذا القسم على إعدادات قابلة للتعديل.',
      failedLoad: 'تعذّر تحميل الإعدادات',
      autosaveFailed: 'تعذّر الحفظ التلقائي',
      imported: 'تم استيراد الإعدادات',
      invalidJson: 'JSON الإعدادات غير صالح',
      toolsetsWipeConfirm:
        'إزالة كل مجموعات الأدوات المفعّلة؟ سيؤدي ذلك إلى تعطيل الذاكرة والطرفية والبحث على الويب والتفويض ومعظم الأدوات الأخرى حتى تعيد تفعيلها.',
      keepAwakeTitle: 'إبقاء الكمبيوتر مستيقظًا',
      keepAwakeDesc:
        'منع هذا الجهاز من الدخول في وضع السكون. «أثناء العمل» يُطبَّق فقط أثناء تنفيذ دور: تستمر التشغيلات الليلية دون إبقاء الحاسوب المحمول مستيقظًا طوال الأسبوع. قد تخفت الشاشة رغم ذلك.',
      keepAwakeOff: 'معطّل',
      keepAwakeWhileWorking: 'أثناء العمل',
      keepAwakeAlways: 'دائمًا',
      disableF12Title: 'تعطيل أدوات المطوّر عبر F12',
      disableF12Desc:
        'منع F12 من فتح أدوات المطوّر. يظل Ctrl+Shift+I (أو Cmd+Option+I على Mac) يعمل.',
      attachmentSizeTitle: 'الحد الأقصى لحجم تحميل المعاينات / الصور',
      attachmentSizeDesc:
        'الحد الأقصى لحجم الملف المحلي الذي يحمّله تطبيق سطح المكتب للمعاينات ومرفقات الصور، بالميغابايت. القيمة الافتراضية 16. المرفقات البعيدة غير الصور لها حد منفصل قدره 256 ميغابايت. القيمة الكبيرة جدًا تحمّل الملف كاملًا في الذاكرة وقد تجمّد التطبيق أو توقفه.',
      attachmentSizeUnit: 'ميغابايت',
      attachmentSizeLabel: 'الحد الأقصى لحجم تحميل المعاينات / الصور بالميغابايت',
      showOptions: 'عرض الخيارات'
    },
    hudModifier: {
      title: 'اللمس لإظهار HUD',
      description:
        'اضغط ثم حرّر ⌘ + Option على Mac، أو Ctrl + Alt على Windows/Linux، لإظهار HUD من أي تطبيق. معطّل افتراضيًا؛ ويُطبَّق على هذا الجهاز فقط.',
      permission:
        'اسمح لـ Hermes في إعدادات النظام ← الخصوصية والأمان ← مراقبة الإدخال، ثم حاول مرة أخرى. هذه الإيماءة لا تسجّل ضغطات المفاتيح ولا تلتقط شاشتك.',
      unavailable:
        'تعذّر بدء مساعد إيماءة HUD أو توقف بشكل غير متوقع. حاول مرة أخرى أو أعد تشغيل Hermes. اختصار HUD الحالي ما زال يعمل داخل Hermes.',
      missingHelper:
        'مساعد إيماءة HUD غير موجود في تثبيت Hermes هذا. حدّث Hermes أو أعد تثبيته، ثم حاول مرة أخرى.',
      unsupportedSession:
        'جلسة سطح المكتب هذه لا تدعم الضغط العام على مفاتيح التعديل. يحتاج Linux إلى X11؛ وWayland غير مدعوم.'
    },
    screenshot: {
      enabledTitle: 'اختصار لقطة الشاشة',
      enabledDesc:
        'اضغط مفتاحي Command معًا من أي تطبيق لالتقاط نافذته الأمامية وإرفاقها بمسودة Hermes الحالية. لا يُرسل أي شيء تلقائيًا. معطّل افتراضيًا ومقتصر على جهاز Mac هذا. قد يكون المحتوى حساسًا: راجع المرفق قبل الإرسال.',
      statusTitle: 'حالة اختصار لقطة الشاشة',
      checking: 'جارٍ التحقق من اختصار لقطة الشاشة…',
      disabled: 'اختصار لقطة الشاشة معطّل.',
      starting: 'جارٍ بدء مستمع الاختصار؛ ليس جاهزًا بعد.',
      ready: 'الاختصار جاهز. تُرفق لقطات الشاشة بالمسودة الحالية دون إرسالها.',
      inputPermission:
        'صلاحية مراقبة الإدخال تتيح لـ Hermes اكتشاف مفتاحي Command عندما يكون تطبيق آخر نشطًا. اسمح لـ Hermes في إعدادات النظام ← الخصوصية والأمان ← مراقبة الإدخال، ثم حاول مرة أخرى.',
      screenPermission:
        'صلاحية تسجيل الشاشة تتيح لـ Hermes التقاط النافذة الأمامية. اسمح لـ Hermes في إعدادات النظام ← الخصوصية والأمان ← تسجيل الشاشة، ثم حاول مرة أخرى. أعد تشغيل Hermes إذا طلب macOS ذلك.',
      openSettings: 'فتح إعدادات النظام',
      retry: 'إعادة المحاولة',
      unavailable: 'اختصار لقطة الشاشة غير متاح. حاول مرة أخرى أو عطّله.',
      errorTitle: 'خطأ في اختصار لقطة الشاشة',
      loadFailed: 'تعذّرت قراءة حالة الاختصار. حاول مرة أخرى للتحقق من إعداده الحالي.',
      saveFailed: 'تعذّر تأكيد تغيير الاختصار. حاول مرة أخرى للتحقق من إعداده الحالي.',
      permissionFailed:
        'تعذّر فتح إعدادات النظام. افتح «الخصوصية والأمان» يدويًا، ثم حاول مرة أخرى.',
      captureFailed: 'تعذّر التقاط النافذة الأمامية. لم يُرفق أو يُرسل أي شيء.',
      contextChanged: 'تغيّرت المسودة الحالية أثناء الالتقاط. لم تُرفق الصورة ولم تُرسل.'
    },
    quickEntry: {
      enabledTitle: 'الإدخال السريع',
      enabledDesc:
        'أظهر محرر رسائل صغيرًا من أي مكان باختصار عام وأرسل طلبًا دون فتح Hermes.',
      shortcutTitle: 'اختصار الإدخال السريع',
      shortcutDesc: 'يحتاج إلى مفتاح تعديل واحد على الأقل، مثل CommandOrControl+Shift+Space.',
      active: 'الاختصار نشط.',
      takenBy: 'تطبيق آخر يستخدم هذا الاختصار بالفعل — اختر اختصارًا آخر.',
      invalidShortcut: 'اختصار غير صالح. أضف مفتاح تعديل واحدًا على الأقل.'
    },
    credentials: {
      pasteKey: 'لصق المفتاح',
      pasteLabelKey: label => `لصق مفتاح ${label}`,
      optional: 'اختياري',
      enterValueFirst: 'أدخل قيمة أولًا.',
      couldNotSave: 'تعذّر حفظ بيانات الاعتماد.',
      remove: 'إزالة',
      getKey: 'الحصول على مفتاح',
      saving: 'جارٍ الحفظ'
    },
    envActions: {
      actions: 'الإجراءات',
      manageInKeys: 'الإدارة في مفاتيح API',
      docs: 'التوثيق',
      hideValue: 'إخفاء القيمة',
      revealValue: 'إظهار القيمة',
      replace: 'استبدال',
      set: 'تعيين',
      clear: 'مسح'
    },
    connections: {
      title: 'الاتصالات',
      intro:
        'احفظ كل الأماكن التي يعمل فيها وكلاؤك: هذا الجهاز، والبوابات البعيدة على شبكتك، ومثيلات Hermes Cloud. كلها محفوظة هنا.',
      stagedNote:
        'المحادثات وقائمة الوكلاء تتبع المصدر المختار؛ ويبقى الخادم الخلفي للنافذة الذي يديره التطبيق محددًا في الإعدادات ← البوابة.',
      launchModeTitle: 'عند التشغيل، العودة إلى جلسات آخر بوابة مستخدمة',
      launchModeDesc: 'إذا عُطّل هذا الخيار، تُفتح الجلسات على البوابة الرئيسية.',
      searchPlaceholder: 'ابحث في البوابات…',
      noSearchResults: 'لا توجد بوابة تطابق بحثك.',
      loadFailed: 'تعذّر تحميل الاتصالات',
      currentPill: 'الحالية',
      primaryPill: 'الرئيسية',
      managedPill: 'هذا الجهاز',
      addConnection: 'إضافة اتصال',
      editConnection: 'تعديل',
      removeConnection: 'إزالة',
      removeConfirmTitle: 'إزالة هذا الاتصال؟',
      removeConfirmDesc: label =>
        `ستُزال «${label}» من هذا التطبيق. لن يتغير المثيل نفسه، ويمكنك إضافته مجددًا في أي وقت.`,
      makePrimary: 'تعيين كرئيسية',
      testConnection: 'اختبار',
      testOk: 'يمكن الوصول',
      testFailed: 'فشل اختبار الاتصال',
      saveFailed: 'تعذّر حفظ الاتصال',
      removeFailed: 'تعذّرت إزالة الاتصال',
      updateAll: 'تحديث كل المثيلات',
      updateAllRunning: 'جارٍ تحديث كل المثيلات…',
      updateAllDone: 'تم إرسال التحديثات',
      updateAllFailed: 'فشل إرسال التحديثات المجمّعة',
      updateSkippedCloud: 'يديرها Hermes Cloud',
      kindLocal: 'محلي',
      kindRemote: 'بوابة بعيدة',
      kindCloud: 'Hermes Cloud',
      kindSsh: 'SSH',
      kindLocalDesc: 'بيئة Hermes التي يديرها هذا التطبيق.',
      kindRemoteDesc: 'بوابة Hermes يمكن الوصول إليها عبر HTTP(S)، من خلال الشبكة المحلية أو Tailscale أو الإنترنت.',
      kindCloudDesc: 'مثيل مستضاف تم اكتشافه عبر حساب Hermes Cloud الخاص بك.',
      kindSshDesc: 'تثبيت Hermes يمكن الوصول إليه عبر SSH.',
      labelTitle: 'الاسم',
      labelDesc:
        'مطلوب. يظهر في كل مكان يظهر فيه هذا المثيل ويجب أن يكون فريدًا (مثل «Homelab» أو «كمبيوتر العمل»).',
      labelPlaceholder: 'Homelab',
      urlTitle: 'رابط URL للبوابة',
      sshHostTitle: 'مضيف SSH',
      headersTitle: 'ترويسات إضافية للبوابة',
      headersDesc:
        'تُرسل مع كل طلب HTTP وWebSocket إلى هذه البوابة، خاصة لوكلاء الوصول مثل Cloudflare Access (CF-Access-Client-Id / CF-Access-Client-Secret). تُخزَّن القيم مشفّرة. يتم تجاهل الترويسات التي يديرها Hermes (Authorization وCookie وHost…).',
      headerValuePlaceholder: 'القيمة',
      headerValueSaved: 'محفوظة — اتركها فارغة للاحتفاظ بها',
      headerAdd: 'إضافة ترويسة',
      headerRemove: 'إزالة',
      duplicateLocal: 'يدير هذا التطبيق اتصالًا محليًا بالفعل — ولا يمكن وجود أكثر من واحد.',
      duplicateUrl: label => `يوجد بالفعل اتصال برابط البوابة هذا («${label}»).`,
      duplicateSsh: label => `يوجد بالفعل اتصال بمضيف SSH هذا («${label}»).`,
      sameBackendHint: label => `نفس الخادم الخلفي لـ «${label}»`,
      localAddHint:
        'الاتصال المحلي غير متاح: الاتصال المُدار موجود بالفعل (ولا يمكن وجود أكثر من واحد).',
      cloudAddHint:
        'نصيحة: سجّل الدخول إلى Hermes Cloud أعلاه لاكتشاف وكلائك تلقائيًا — استخدم هذا النموذج فقط لحفظ رابط مثيل معروف يدويًا.',
      save: 'حفظ الاتصال',
      saving: 'جارٍ الحفظ…',
      cancel: 'إلغاء',
      empty: 'لا توجد اتصالات محفوظة.'
    },
    managedUpdates: {
      title: 'التحديثات المُدارة',
      intro:
        'حدّث تثبيتات SSH التي يديرها تطبيق سطح المكتب بشكل متكامل: تُترك الجلسات النشطة لتنتهي، ويُحدَّث المستودع البعيد، ثم يُستعاد كل ملف تعريف مع إيصال مرتبط.',
      sshConnection: 'تثبيت SSH يديره تطبيق سطح المكتب',
      update: 'تحديث',
      updating: 'جارٍ التحديث…',
      progress: 'جارٍ إنهاء الجلسات النشطة، وتحديث التثبيت البعيد، واستعادة ملفات التعريف…',
      updated: 'اكتمل التحديث',
      partial: 'اكتمل التحديث — فشلت الاستعادة',
      refused: 'مرفوض',
      failed: 'فشل التحديث',
      alreadyRunning: 'يوجد تحديث قيد التنفيذ بالفعل',
      receipt: (id: string, outcome: string) => `الإيصال ${id} · ${outcome}`,
      receiptVersions: (pre: string, post: string) => `${pre} → ${post}`,
      scopesRestored: (profiles: string) => `ملفات التعريف المستعادة: ${profiles}`,
      scopeNotRestored: (profile: string, error: string) => `لم تتم استعادة ملف التعريف «${profile}»: ${error}`
    },
    gateway: {
      loading: 'جارٍ تحميل إعدادات البوابة...',
      ...arGatewayHost,
      title: 'الاتصال بالبوابة',
      envOverride: 'تجاوز عبر متغير بيئة',
      intro:
        'محلي افتراضيًا. استخدم البعيد عندما يجب أن يتحكم هذا التطبيق في خادم Hermes خلفي في مكان آخر. التجاوزات لكل ملف تعريف أدناه.',
      envOverrideTitle: 'متغيرات البيئة تتحكم في جلسة سطح المكتب هذه.',
      envOverrideDesc:
        'احذف المتغيرين HERMES_DESKTOP_REMOTE_URL وHERMES_DESKTOP_REMOTE_TOKEN لاستخدام الإعداد المحفوظ أدناه.',
      modeTitle: 'وضع الاتصال',
      localTitle: 'بوابة محلية',
      localDesc:
        'تشغيل خادم Hermes خلفي خاص على localhost. هذا هو الافتراضي ويعمل دون اتصال بالإنترنت.',
      remoteTitle: 'بوابة بعيدة',
      remoteDesc: 'توصيل واجهة سطح المكتب هذه بخادم Hermes خلفي بعيد.',
      remoteAuthHint:
        'البوابات المستضافة تستخدم OAuth أو اسم مستخدم وكلمة مرور؛ والمستضافة ذاتيًا يمكنها استخدام رمز جلسة.',
      cloudTitle: 'Hermes Cloud',
      cloudDesc:
        'سجّل الدخول مرة واحدة إلى Hermes Cloud واختر من وكلاء حسابك — دون لصق أي رابط.',
      cloudSignInTitle: 'Hermes Cloud',
      cloudSignIn: 'تسجيل الدخول إلى Hermes Cloud',
      cloudSignedIn: 'تم تسجيل الدخول إلى Hermes Cloud',
      cloudNeedsSignIn: 'سجّل الدخول إلى Hermes Cloud لاكتشاف وكلاء حسابك.',
      cloudSignedInDesc:
        'تم تسجيل دخولك. اختر وكيلًا أدناه؛ تتجدد الجلسة تلقائيًا.',
      cloudAgentsTitle: 'وكلاؤك',
      cloudOrgPickerTitle: 'اختيار مؤسسة',
      cloudOrgSelect: 'اختيار',
      cloudOrgChange: 'تغيير المؤسسة',
      cloudOrgRole: role => `الدور: ${role}`,
      cloudLoadingAgents: 'جارٍ تحميل وكلائك…',
      cloudNoAgents: {
        before: 'لم يتم العثور على وكلاء في هذا الحساب… أنشئ وكيلًا في ',
        linkText: 'Nous Portal',
        after: '، ثم حدّث الصفحة.'
      },
      cloudRefresh: 'تحديث',
      cloudConnect: 'اتصال',
      cloudSavedTitle: 'بوابات Cloud المحفوظة',
      cloudSavedDesc:
        'استخدم بوابة محفوظة دون تغيير البوابة الافتراضية. سجّل الدخول أدناه لإضافة مثيلات. أدِر أسماءها واتصالها من قائمة الاتصالات المحفوظة.',
      cloudUseSaved: 'استخدام البوابة',
      cloudActive: 'نشطة في هذه النافذة',
      cloudConnecting: 'جارٍ الاتصال…',
      cloudDiscoverFailed: 'تعذّر تحميل وكلائك في Hermes Cloud',
      cloudConnectFailed: 'تعذّر الاتصال بهذا الوكيل',
      cloudSignInFailed: 'فشل تسجيل الدخول إلى Hermes Cloud',
      cloudSignedOutTitle: 'تم تسجيل الخروج من Hermes Cloud',
      cloudSignedOutMessage: 'تم مسح جلسة Hermes Cloud.',
      cloudConnectedTitle: 'متصل',
      cloudConnectedPill: 'متصل',
      cloudConnectedTo: name => `متصل بـ ${name}.`,
      cloudAgentProvisioning: 'جارٍ التجهيز…',
      cloudStatusLabel: status => `الحالة: ${status}`,
      remoteUrlTitle: 'الرابط البعيد',
      remoteUrlDesc:
        'رابط URL الأساسي للخادم الخلفي للوحة التحكم البعيدة. البادئات في المسار مدعومة، مثل /hermes.',
      probing: 'جارٍ التحقق من طريقة التحقق من الهوية لهذه البوابة…',
      probeError:
        'تعذّر الوصول إلى هذه البوابة حاليًا. تحقّق من الرابط — ستظهر طريقة التحقق من الهوية بمجرد أن تستجيب.',
      signedIn: 'تم تسجيل الدخول',
      signIn: 'تسجيل الدخول',
      signOut: 'تسجيل الخروج',
      signInWith: provider => `تسجيل الدخول باستخدام ${provider}`,
      authTitle: 'التحقق من الهوية',
      authSignedInPassword:
        'تستخدم هذه البوابة اسم مستخدم وكلمة مرور. تم تسجيل دخولك؛ وتتجدد الجلسة تلقائيًا.',
      authSignedInOauth: 'تستخدم هذه البوابة OAuth. تم تسجيل دخولك؛ وتتجدد الجلسة تلقائيًا.',
      authNeedsPassword:
        'تستخدم هذه البوابة اسم مستخدم وكلمة مرور. سجّل الدخول لتفويض تطبيق سطح المكتب هذا.',
      authNeedsOauth: provider =>
        `تستخدم هذه البوابة OAuth. سجّل الدخول باستخدام ${provider} لتفويض تطبيق سطح المكتب هذا.`,
      tokenTitle: 'رمز الجلسة',
      tokenDesc:
        'رمز جلسة لوحة التحكم المستخدم للوصول عبر REST وWebSocket. اتركه فارغًا للاحتفاظ بالرمز المحفوظ.',
      existingToken: value => `الرمز الحالي ${value}`,
      savedToken: 'محفوظ',
      pasteSessionToken: 'الصق رمز الجلسة',
      plainTextConfirmTitle: 'تخزين رمز البوابة كنص عادي؟',
      plainTextConfirmDesc:
        'لم يتم العثور على خدمة سلسلة مفاتيح للنظام على هذا الجهاز، لذا سيُحفظ الرمز دون تشفير في ملف إعدادات الاتصال الخاص بالتطبيق، ويمكن لأي عملية يشغّلها هذا المستخدم قراءته. ثبّت سلسلة مفاتيح النظام أو فعّلها (GNOME Keyring أو KWallet على Linux) للتخزين المشفّر.',
      plainTextConfirmAction: 'الحفظ كنص عادي',
      plainTextStoredTitle: 'الرمز مخزّن كنص عادي',
      plainTextStoredDesc:
        'التخزين الآمن غير متاح، لذا الرمز المحفوظ مخزّن دون تشفير في ملف إعدادات الاتصال الخاص بالتطبيق على هذا الجهاز. ثبّت سلسلة مفاتيح النظام أو فعّلها (GNOME Keyring أو KWallet على Linux) لتشفيره.',
      keychainEncryptionTitle: 'تشفير الأسرار المحفوظة بسلسلة مفاتيح النظام',
      keychainEncryptionDesc:
        'معطّل افتراضيًا. عند التفعيل، تُشفَّر رموز البوابة وبيانات اعتماد الاتصال بسلسلة مفاتيح النظام (Keychain Access أو GNOME Keyring أو Windows DPAPI)؛ وقد يطلب النظام إذنًا أو كلمة مرور. وإلا فتُخزَّن في ملفات عادية لا يقرؤها إلا حساب المستخدم الخاص بك.',
      keychainEncryptionFailed: 'تعذّر تغيير تشفير الأسرار',
      testRemote: 'اختبار البعيد',
      saveForRestart: 'الحفظ لإعادة التشغيل القادمة',
      saveAndReconnect: 'الحفظ وإعادة الاتصال',
      diagnostics: 'التشخيصات',
      diagnosticsDesc:
        'إظهار desktop.log في مدير الملفات — مفيد عندما لا تبدأ البوابة.',
      openLogs: 'فتح السجلات',
      incompleteTitle: 'البوابة البعيدة غير مكتملة',
      incompleteSignIn: 'أدخل رابطًا بعيدًا وسجّل الدخول قبل التبديل إلى البعيد.',
      incompleteToken: 'أدخل رابطًا بعيدًا ورمز جلسة قبل التبديل إلى البعيد.',
      incompleteSignInTest: 'أدخل رابطًا بعيدًا وسجّل الدخول قبل الاختبار.',
      incompleteTokenTest: 'أدخل رابطًا بعيدًا ورمز جلسة قبل الاختبار.',
      enterUrlFirst: 'أدخل رابطًا بعيدًا أولًا.',
      restartingTitle: 'جارٍ إعادة اتصال البوابة',
      savedTitle: 'تم حفظ إعدادات البوابة',
      restartingMessage: 'سيعيد Hermes Desktop الاتصال بالإعدادات المحفوظة — تبقى الواجهة مفتوحة.',
      savedMessage: 'تم الحفظ لإعادة التشغيل القادمة.',
      connectedTo: (baseUrl, version) => `متصل بـ ${baseUrl}${version ? ` · Hermes ${version}` : ''}`,
      reachableTitle: 'يمكن الوصول إلى البوابة البعيدة',
      signedOutTitle: 'تم تسجيل الخروج',
      signedOutMessage: 'تم مسح جلسة البوابة البعيدة.',
      failedLoad: 'تعذّر تحميل إعدادات البوابة',
      signInFailed: 'فشل تسجيل الدخول',
      signOutFailed: 'فشل تسجيل الخروج',
      testFailed: 'فشل اختبار البوابة البعيدة',
      applyFailed: 'تعذّر تطبيق إعدادات البوابة',
      saveFailed: 'تعذّر حفظ إعدادات البوابة',
      sshTitle: 'الاتصال عبر SSH',
      sshDesc:
        'يُشغَّل Hermes على الجهاز البعيد عبر SSH ويُوجَّه إلى هذا التطبيق — لا حاجة لتشغيل أو كشف أي شيء بنفسك. يحتاج إلى وصول SSH يعمل بالمفاتيح إلى المضيف.',
      sshTrustHint:
        'يتم الوثوق بأول مفتاح مضيف يُقدَّم وتثبيته؛ وأي تغيير لاحق يفشل ويُغلق الاتصال.',
      sshHostTitle: 'المضيف',
      sshHostDesc: 'user@host، أو اسم مستعار Host من ~/.ssh/config.',
      sshHostPick: 'اختر مضيفًا…',
      sshHostPickTitle: 'المضيف',
      sshHostPickDesc: 'اسم مستعار Host من ~/.ssh/config، أو «مخصص» لإدخال واحد.',
      sshHostCustom: 'مخصص (إدخال يدوي)…',
      sshUserTitle: 'المستخدم',
      sshUserDesc: 'فارغ = ~/.ssh/config أو مستخدمك الحالي.',
      sshUserPlaceholder: 'من ~/.ssh/config',
      sshPortTitle: 'المنفذ',
      sshPortDesc: 'فارغ = 22 أو المنفذ من ~/.ssh/config.',
      sshKeyTitle: 'ملف الهوية',
      sshKeyDesc: 'مسار المفتاح الخاص. فارغ = ssh-agent أو ~/.ssh/config.',
      sshHermesPathTitle: 'مسار Hermes (اختياري)',
      sshHermesPathDesc: 'المسار الكامل لملف hermes التنفيذي البعيد. فارغ = اكتشاف تلقائي.',
      sshHermesPathPlaceholder: 'اكتشاف تلقائي',
      sshTestConnection: 'اختبار SSH',
      sshConnect: 'اتصال',
      sshButtonsHint: '«حفظ» يُطبَّق عند التشغيل القادم. «اتصال» يعيد الاتصال فورًا.',
      sshReachable: (host, platform) => `يمكن الوصول: ${host} (${platform}) — تم العثور على Hermes`,
      sshIncompleteHost: 'أدخل مضيف SSH قبل الاتصال.',
      sshErrUnreachable: 'تعذّر الوصول إلى هذا المضيف عبر SSH. تحقّق من المضيف والمنفذ والشبكة.',
      sshErrAuth:
        'فشل التحقق من هوية SSH. حمّل مفتاحك في ssh-agent (ssh-add) أو عيّن IdentityFile في ~/.ssh/config — يشغّل Hermes الأمر ssh بشكل غير تفاعلي.',
      sshErrHostKey:
        'تغيّر مفتاح المضيف منذ آخر اتصال. تأكّد أن هذا التغيير متوقع، ثم شغّل ssh-keygen -R <host> وأعد الاتصال.',
      sshErrNotInstalled:
        'Hermes غير مثبت على المضيف البعيد. ثبّته هناك (curl -fsSL https://hermes-agent.nousresearch.com/install.sh | sh) أو عيّن مسار Hermes.',
      sshErrPlatform:
        'المنصة البعيدة غير مدعومة. وضع SSH في Hermes Desktop يدعم المضيفات البعيدة بأنظمة Linux وmacOS وWindows.',
      sshErrTimeout: 'انتهت مهلة اتصال SSH. قد يكون المضيف غير متاح أو في وضع السكون.',
      sshErrUpdateRequired: 'حدّث Hermes على المضيف البعيد قبل الاتصال عبر Desktop SSH.',
      sshErrInteractiveAuth:
        'يتطلب Tailscale SSH تحققًا تفاعليًا في المتصفح. شغّل `ssh <host> true` في الطرفية، وأكمل التحقق، ثم حاول مرة أخرى — يشغّل Hermes الأمر SSH بشكل غير تفاعلي.',
      sshErrUnknown: 'فشل اتصال SSH.'
    },
    keys: {
      loading: 'جارٍ تحميل مفاتيح API وبيانات الاعتماد...',
      failedLoad: 'تعذّر تحميل مفاتيح API',
      empty: 'لم يُضبط أي شيء في هذه الفئة بعد.'
    },
    search: {
      placeholder: 'ابحث في كل الإعدادات…',
      pill: 'بحث'
    },
    profileScope: {
      appliesTo: 'يُطبَّق على',
      editsProfile: profile => `تُطبَّق التغييرات في هذه الصفحة على ملف التعريف «${profile}».`
    },
    mcp: {
      loading: 'جارٍ تحميل خوادم MCP...',
      invalidJson: 'JSON الخاص بـ MCP غير صالح',
      saveFailed: 'تعذّر الحفظ',
      removeFailed: 'تعذّرت الإزالة',
      reloadFailed: 'فشلت إعادة تحميل MCP',
      savedTitle: 'تم حفظ خادم MCP',
      savedMessage: name => `يُطبَّق ${name} بعد إعادة تحميل MCP.`,
      disabled: 'معطّل',
      name: 'الاسم',
      serverJson: 'JSON الخادم',
      remove: 'إزالة',
      test: 'اختبار الاتصال',
      catalogLoading: 'جارٍ تحميل كتالوج MCP...',
      catalogInstallFailed: name => `تعذّر تثبيت ${name}`,
      catalogEnvRequired: 'املأ القيم المطلوبة قبل التثبيت.',
      capabilitySummary: (tools, prompts, resources) =>
        `المفعّل: ${[`${tools} أداة`, ...(prompts ? [`${prompts} طلب جاهز`] : []), ...(resources ? [`${resources} مورد`] : [])].join('، ')}`,
      costTokens: tokens => `~${tokens} توكن/استدعاء`,
      usage30d: uses => `${uses} استخدام/30 يومًا`,
      statusConnecting: 'جارٍ الاتصال…',
      statusNeedsAuth: 'يحتاج إلى تحقق من الهوية',
      statusError: 'خطأ',
      statusOff: 'معطّل',
      allServers: 'كل الخوادم',
      authenticatedTitle: 'تم التحقق من الهوية',
      authenticatedMessage: (server, count) => `${server}: ${count} أداة`,
      authenticate: 'التحقق من الهوية',
      noOutput: 'لا توجد مخرجات بعد.',
      deepLinkTitle: 'إضافة خادم MCP؟',
      deepLinkDescription:
        'يطلب رابط إضافة خادم MCP هذا إلى Hermes. راجع الإعدادات أدناه بعناية: فهي قادمة من الرابط، لا من Hermes.',
      deepLinkStdioWarning:
        'يشغّل هذا الخادم عملية محلية على جهازك بالأمر المعروض أدناه. تابع فقط إذا كنت تثق في مصدره.',
      deepLinkConfirm: 'إضافة الخادم',
      deepLinkNameInvalid: 'تتكون الأسماء من 1 إلى 64 حرفًا أو رقمًا أو نقطة أو شرطة أو شرطة سفلية.',
      deepLinkNameConflict: name => `يوجد بالفعل خادم باسم ${name} — اختر اسمًا آخر أو ألغِ.`,
      deepLinkErrorTitle: 'تم رفض رابط تثبيت MCP',
      deepLinkErrorName: 'اسم الخادم مفقود أو غير صالح في الرابط.',
      deepLinkErrorConfig: 'إعدادات الرابط ليست JSON صالحًا بترميز base64.',
      deepLinkErrorShape: 'يجب أن تكون الإعدادات كائن JSON يحتوي على حقل نصي `url` أو `command`.',
      deepLinkErrorUrl: 'يُسمح فقط بروابط الخوادم http:// وhttps://.',
      deepLinkErrorTooLarge: 'تتجاوز الإعدادات حد 32 كيلوبايت.'
    },
    model: arModelSettings,
    localModels: arLocalModels,
    billing: {
      perMonth: (amount: string) => `${amount}/شهريًا`,
      creditsPerMonth: (amount: string) => `${amount} رصيد/شهريًا`,
      usageLabel: (label: string) => `استخدام ${label}`,
      freeTier: {
        signIn: 'تسجيل الدخول',
        title: 'أنت تستخدم الخطة المجانية من Nous',
        message: 'سجّل الدخول بحساب Nous لفتح المزيد من النماذج والأدوات.',
        caption:
          'يعمل مع nous/welcome، والموصّلات مشمولة. تسجيل الدخول يحتفظ بموصّلاتك ويضيف الأدوات التي تحتاج إلى حساب وكل النماذج الأخرى.',
        name: 'Nous · الخطة المجانية',
        footnote:
          'الخطة المجانية بلا رصيد ولا شيء للدفع. يظهر الدفع والاستخدام بعد تسجيل الدخول بحساب Nous.',
        plan: 'الخطة المجانية',
        model: 'النموذج',
        connectors: 'الموصّلات',
        included: 'مشمول'
      },
      amountValidation: {
        reloadTo: 'إعادة الشحن حتى',
        greaterThanThreshold: 'يجب أن يكون مبلغ إعادة الشحن أكبر من العتبة.',
        decimal: (label: string) => `${label}: أدخل مبلغًا بالدولار بحد أقصى خانتين عشريتين.`,
        positive: (label: string) => `${label}: يجب أن يكون المبلغ أكبر من 0$.`,
        minimum: (label: string, amount: string) => `${label}: الحد الأدنى ${amount}.`,
        maximum: (label: string, amount: string) => `${label}: الحد الأقصى ${amount}.`
      },
      stepUp: {
        openVerification: 'فتح صفحة التحقق',
        dismiss: 'تجاهل',
        waiting: 'بانتظار رابط التحقق…',
        verify: 'تحقّق للمتابعة',
        deniedTitle: 'لم تتم الموافقة على التحقق',
        deniedBody: 'انتهى التحقق دون السماح بالإنفاق عن بُعد لهذه الطرفية.',
        successTitle: 'اكتمل التحقق',
        successBody: 'الإنفاق عن بُعد مسموح لهذه الطرفية.'
      },
      charge: {
        added: (amount?: string) => (amount ? `تمت إضافة ${amount}$.` : 'تمت إضافة الرصيد.'),
        failedTitle: 'فشل الدفع',
        unconfirmedTitle: 'نتيجة الدفع غير مؤكدة',
        unconfirmedBody: (message: string) =>
          `${message} نتيجة آخر عملية دفع غير مؤكدة - تحقّق من رصيدك/سجلك قبل إعادة المحاولة.`,
        checkTitle: 'تعذّر التحقق من الدفع',
        checkBody: 'تعذّر التحقق من الدفع.',
        untrackedTitle: 'تعذّر تتبّع الدفع',
        untrackedBody: 'قبلت خدمة الفوترة الطلب لكنها لم تُرجع معرّفًا للدفع.',
        timeoutTitle: 'ما زال قيد المعالجة بعد 5 دقائق',
        timeoutBody: 'قد يكتمل الدفع لاحقًا. راجع البوابة الإلكترونية قبل إعادة المحاولة.',
        authenticationRequired:
          'يتطلب مصرفك تحققًا (3DS). أكمله على البوابة الإلكترونية لإتمام هذا الشراء.',
        expired: 'انتهت صلاحية بطاقتك. حدّثها على البوابة الإلكترونية.',
        declined: 'تم رفض بطاقتك. جرّب بطاقة أخرى على البوابة الإلكترونية.',
        failedBody: (reason: string) => `لم يكتمل الدفع (${reason}).`
      },
      title: 'الفوترة',
      preview: 'معاينة',
      summary: {
        balance: 'الرصيد',
        plan: 'الخطة',
        autoRefill: 'إعادة الشحن التلقائية'
      },
      sections: {
        invoices: 'الفواتير',
        plan: 'الخطة',
        paymentAndCredits: 'الدفع والرصيد',
        usage: 'الاستخدام'
      },
      usage: {
        title: 'الاستخدام'
      },
      buyCredits: {
        customAmount: 'مبلغ رصيد مخصص',
        title: 'شراء رصيد الآن',
        buyButton: 'شراء',
        processing: 'جارٍ المعالجة… التحقق من التسوية',
        added: (amount: string) => `تمت إضافة ${amount}. جارٍ تحديث الرصيد.`,
        retry: 'إعادة المحاولة',
        openPortal: 'فتح البوابة الإلكترونية'
      },
      plan: {
        title: 'الخطط',
        changePlan: 'تغيير الخطة',
        viewPlans: 'عرض الخطط',
        backAria: 'العودة إلى الفوترة',
        current: 'الخطة الحالية',
        scheduled: 'مجدولة',
        empty: 'لا توجد خطط متاحة حاليًا.',
        undo: 'تراجع',
        undoing: 'جارٍ التراجع…',
        downgrade: 'تخفيض الخطة',
        confirmDowngrade: 'تأكيد تخفيض الخطة',
        tryAgain: 'إعادة المحاولة',
        checkingChange: 'جارٍ التحقق من هذا التغيير…',
        cannotChange: 'لا يمكن إجراء هذا التغيير من هنا.',
        alreadyOn: (name: string) => `أنت بالفعل على خطة ${name} — لا يوجد ما يُغيَّر.`,
        notScheduleable: 'لا يمكن جدولة هذا التغيير من هنا.',
        scheduling: 'جارٍ الجدولة…',
        cancel: 'إلغاء',
        effectScheduled: (targetName: string, effectiveAt: string, creditsDelta?: string) =>
          `الانتقال إلى ${targetName} — يسري ${effectiveAt}. لا خصم الآن؛ وتحتفظ بخطتك الحالية حتى ذلك الحين.${creditsDelta ? ` تغيّر الرصيد الشهري: ${creditsDelta}.` : ''}`
      },
      keepGoingOnCredits: {
        title: 'المتابعة باستخدام الرصيد',
        description:
          'يستخدم رصيدك عند نفاد الاستخدام المشمول. عند التعطيل: ينتظر Hermes إعادة التعيين.',
        approveInBrowser:
          'وافق على Remote Spending في متصفحك لتغيير هذا الإعداد. يُطبَّق فور موافقتك.',
        openAgain: 'فتح مرة أخرى',
        cancel: 'إلغاء',
        approvedRetry: 'تمت الموافقة على Remote Spending، لكن لم يتم حفظ التغيير.',
        tryAgain: 'إعادة المحاولة'
      },
      autoReload: {
        threshold: 'العتبة',
        thresholdAria: 'عتبة إعادة الشحن التلقائية',
        reloadTo: 'إعادة الشحن حتى',
        reloadToAria: 'المبلغ المستهدف لإعادة الشحن التلقائية',
        turnOffConfirm: 'تعطيل إعادة الشحن التلقائية؟',
        turnOff: 'تعطيل',
        disable: 'تعطيل',
        updated: 'تم تحديث إعادة الشحن التلقائية.',
        turnedOff: 'تم تعطيل إعادة الشحن التلقائية.',
        manage: 'إدارة',
        save: 'حفظ',
        saving: 'جارٍ الحفظ…',
        cancel: 'إلغاء'
      },
      state: {
        notice: {
          loggedOut: {
            title: 'اربط حسابك في Nous',
            message:
              'سجّل الدخول بحساب Nous لعرض رصيدك وخطتك واستخدامك هنا.',
            action: 'تسجيل الدخول'
          },
          openPortal: 'فتح البوابة الإلكترونية ↗',
          noCard: {
            title: 'لا توجد وسيلة دفع محفوظة',
            message:
              'يبقى شراء الرصيد وإعادة الشحن التلقائية معطّلين حتى تُحفظ بطاقة. أضف واحدة على البوابة الإلكترونية.',
            action: 'إضافة بطاقة ↗'
          }
        },
        paymentMethod: {
          title: 'وسيلة الدفع',
          description: 'أدِر البطاقة المستخدمة لإعادة الشحن وتجديد الاشتراك.',
          addAction: 'إضافة وسيلة دفع',
          updateAction: 'تحديث',
          provenance: {
            autoRefill: 'بطاقة إعادة الشحن التلقائية',
            customerDefault: 'البطاقة الافتراضية للعميل',
            subPin: 'بطاقة الاشتراك',
            suffix: (label: string) => ` - ${label}`
          }
        },
        buyCredits: {
          description: 'خصم لمرة واحدة من بطاقتك، يُضاف إلى رصيدك اليوم.'
        },
        autoRefill: {
          title: 'إعادة الشحن عند انخفاض الرصيد',
          genericDescription: 'حافظ على رصيدك عندما ينخفض تحت العتبة التي حددتها.',
          offPill: 'معطّلة',
          enabledPill: 'مفعّلة',
          notAvailablePill: '—',
          manageCaption: 'أدِر إعادة الشحن التلقائية من البوابة الإلكترونية.',
          turnOnCaption: 'فعّل إعادة الشحن التلقائية من البوابة الإلكترونية',
          chargesDescription: (reloadTo: string, threshold: string) =>
            `يخصم ${reloadTo} تلقائيًا عندما ينخفض رصيدك تحت ${threshold}.`,
          distinctCardCaption: (cardLabel: string) =>
            `إعادة الشحن التلقائية تخصم من ${cardLabel} — وحّدها على البوابة الإلكترونية`,
          distinctCardFallback: 'بطاقة أخرى',
          reconcileAction: 'توحيد ↗'
        },
        usage: {
          subscriptionCredits: {
            title: 'رصيد الاشتراك',
            barLabel: 'رصيد الاشتراك المتبقي',
            captionResets: (date: string) => `يُعاد التعيين ${date}`,
            valueOf: (remaining: string, monthly: string) => `المتبقي ${remaining} من ${monthly}`,
            valueOver: (remaining: string, monthly: string, over: string) =>
              `المتبقي ${remaining} من ${monthly} · تجاوز ${over}`
          },
          topupCredits: {
            title: 'الرصيد المشحون',
            caption: 'لا ينتهي'
          },
          monthlyCap: {
            title: 'حد الإنفاق الشهري',
            barLabel: 'المستخدم من حد الإنفاق الشهري',
            captionDefault: 'الحد الافتراضي',
            captionSpending: 'الإنفاق الشهري عن بُعد',
            valueUsed: (spent: string, limit: string) => `المستخدم ${spent} من ${limit}`
          },
          window: {
            today: 'اليوم',
            week: 'هذا الأسبوع',
            month: 'هذا الشهر',
            topTier: 'النماذج الكبيرة (شهريًا)',
            barLabel: (title: string) => `${title}: المستهلك من الاستخدام المشمول`,
            captionPaused: 'متوقف مؤقتًا: فشل دفع الاشتراك',
            captionPausedOther: 'متوقف مؤقتًا: راجع الفوترة في البوابة الإلكترونية',
            captionTopTierUsedUp: 'نفدت الحصة الشهرية، والرصيد يغطي الباقي',
            captionTopTierUsedUpKeepGoingOff: 'نفدت الحصة الشهرية، والنماذج المشمولة الأخرى ما زالت تعمل',
            captionResetsIn: (duration: string) => `يُعاد التعيين خلال ${duration}`,
            captionIncluded: 'الاستخدام المشمول',
            valueUsed: (percent: string) => `المستخدم ${percent}`
          }
        },
        planCard: {
          freeTier: 'مجاني',
          chooseAction: 'اختيار ↗',
          adjustPlanAction: 'تعديل الخطة ↗',
          unavailableCaption:
            'تفاصيل الاشتراك غير متاحة؛ ما زال بإمكانك فتح البوابة الإلكترونية.',
          downgradeCaption: (tierName: string, when: string) => `ينتقل إلى ${tierName} في ${when}.`,
          cancellationCaption: (when: string) => `يُلغى في ${when}.`,
          renewsCaption: (date: string) => `يتجدد ${date}`,
          noSubscriptionCaption: 'لا يوجد اشتراك نشط — النماذج المدفوعة تستهلك الرصيد المشحون.'
        }
      },
      errors: {
        consentRequired: {
          title: 'يلزم تأكيد البطاقة',
          message: 'أكّد هذه البطاقة لخصومات الطرفية في البوابة الإلكترونية'
        },
        insufficientScope: {
          title: 'يلزم الموافقة على الإنفاق عن بُعد',
          message:
            'يحتاج هذا الإجراء إلى إذن الإنفاق عن بُعد. ابدأ عملية شحن لمنح الإذن، ثم حاول مرة أخرى.'
        },
        remoteSpendingRevoked: {
          title: 'تم إيقاف الإنفاق عن بُعد',
          messageByAdmin: 'أوقف أحد المسؤولين الإنفاق عن بُعد لهذه الطرفية.',
          messageBySelf: 'أوقفت الإنفاق عن بُعد لهذه الطرفية.'
        },
        remoteSpendingReconnect: (who: string) =>
          `${who} أعد الاتصال من الإعدادات -> البوابة لإعادة تفويض هذا الجهاز.`,
        sessionRevoked: {
          title: 'تم تسجيل خروج الجلسة',
          message: 'تم تسجيل خروج جلستك. أعد الاتصال من الإعدادات ← البوابة.'
        },
        cliBillingDisabled: {
          title: 'الإنفاق عن بُعد معطّل',
          message:
            'الإنفاق عن بُعد معطّل لهذا الحساب — يمكن لمسؤول الفوترة تفعيله من صفحة Hermes Agent في البوابة الإلكترونية.'
        },
        roleRequired: {
          title: 'يلزم دور المسؤول',
          message:
            'إضافة الأموال تتطلب مسؤولًا أو مالكًا للمؤسسة. اطلب ذلك من أحد المسؤولين، أو أدِره من البوابة الإلكترونية.'
        },
        idempotencyConflict: {
          title: 'ابدأ عملية شحن جديدة',
          message: '🔴 استُخدم مفتاح الدفع هذا بالفعل لمبلغ مختلف. ابدأ عملية شحن جديدة.'
        },
        noPaymentMethod: {
          title: 'لا توجد بطاقة محفوظة',
          message:
            '💳 لا توجد بطاقة محفوظة لخصومات الطرفية. أضف واحدة على البوابة الإلكترونية ' +
            '(عمليات شراء الرصيد لمرة واحدة لا تحفظ بطاقة قابلة لإعادة الاستخدام).'
        },
        orgAccessDenied: {
          title: 'تم رفض الوصول إلى المؤسسة',
          message: 'هذا الرمز غير مرتبط بأي مؤسسة يمكنك إدارتها'
        },
        monthlyCapExceeded: {
          title: 'تم بلوغ حد الإنفاق الشهري',
          messageReached: '🔴 تم بلوغ حد الإنفاق الشهري.',
          messageHeadroom: (remaining: string) =>
            `🔴 تم بلوغ حد الإنفاق الشهري — الهامش المتبقي: ${remaining}$.`
        },
        rateLimited: {
          title: 'عدد كبير من عمليات الدفع حاليًا',
          message: (mins: number) =>
            mins > 0
              ? `🟡 عدد كبير من عمليات الدفع حاليًا (حاول مرة أخرى بعد ~${mins} دقيقة). هذا ليس فشلًا في الدفع.`
              : '🟡 عدد كبير من عمليات الدفع حاليًا. هذا ليس فشلًا في الدفع.'
        },
        stripeUnavailable: {
          title: 'تواجه Stripe مشكلات',
          message: (mins: number) =>
            mins > 0
              ? `تواجه Stripe مشكلات — حاول مرة أخرى بعد ~${mins} دقيقة`
              : 'تواجه Stripe مشكلات — حاول مرة أخرى قريبًا'
        },
        upgradeCapExceeded: {
          title: 'تم بلوغ الحد اليومي لتغيير الخطة',
          message: 'تم بلوغ الحد اليومي لتغيير الخطة — حاول مرة أخرى غدًا'
        },
        endpointUnavailable: {
          title: 'نقطة نهاية الفوترة غير متاحة',
          message:
            'أرجعت نقطة نهاية الفوترة ردًا ليس بصيغة JSON (ربما لا تكون متاحة في هذا النشر).'
        },
        timeout: {
          title: 'انتهت مهلة طلب الفوترة',
          message: 'انتهت مهلة طلب الفوترة.'
        },
        transport: {
          title: 'فشل اتصال الفوترة',
          message: 'فشل طلب الفوترة قبل الوصول إلى البوابة.'
        },
        default: {
          title: 'فشل طلب الفوترة',
          message: 'فشل طلب الفوترة.'
        }
      }
    },
    providers: {
      connectAccount: 'ربط حساب',
      haveApiKey: 'لديك مفتاح API؟',
      intro:
        'سجّل الدخول باشتراك — دون مفتاح API لنسخه. يبدأ Hermes تسجيل الدخول عبر المتصفح نيابةً عنك، مباشرة داخل التطبيق.',
      connected: 'متصل',
      collapse: 'طي',
      connectAnother: 'ربط مزوّد آخر',
      otherProviders: 'مزوّدون آخرون',
      disconnect: 'قطع الاتصال',
      disconnectInTerminal: 'قطع الاتصال (يشغّل أمر الإزالة في الطرفية)',
      removeConfirm: provider => `إزالة ${provider}؟`,
      removeExternalGeneric: provider => `${provider} تتم إدارته عبر CLI الخاصة به — أزله من هناك.`,
      removeKeyManaged: provider => `${provider} مهيأ من مفتاح API. أزله من مفاتيح API.`,
      removeTerminalConfirm: (provider, command) =>
        `قطع الاتصال بـ ${provider}؟ سيشغّل هذا «${command}» في الطرفية لمسح بيانات الاعتماد.`,
      removeTerminalRunning: provider => `جارٍ تنفيذ قطع اتصال ${provider} في الطرفية…`,
      removedTitle: 'تمت إزالة الحساب',
      removedMessage: provider => `تمت إزالة ${provider}.`,
      failedRemove: provider => `تعذّرت إزالة ${provider}`,
      noProviderKeys: 'لا توجد مفاتيح API متاحة للمزوّدين.',
      searchKeys: 'ابحث في المزوّدين…',
      noKeysMatch: 'لا يوجد مزوّد يطابق بحثك.',
      localEndpoint: {
        title: 'نقطة نهاية محلية / مخصصة',
        description:
          'وجّه Hermes إلى أي نقطة نهاية متوافقة مع OpenAI (Zyphra وvLLM وllama.cpp وOllama وغيرها).'
      },
      loading: 'جارٍ تحميل المزوّدين...'
    },
    sessions: {
      loading: 'جارٍ تحميل الجلسات المؤرشفة…',
      archivedTitle: 'الجلسات المؤرشفة',
      archivedIntro:
        'المحادثات المؤرشفة مخفية من الشريط الجانبي لكنها تحتفظ بكل رسائلها. Alt/⌥+Shift/⇧ مع النقر على محادثة في الشريط الجانبي لأرشفتها.',
      emptyArchivedTitle: 'لا يوجد شيء مؤرشف',
      emptyArchivedDesc: 'أرشف محادثة لإخفائها هنا.',
      unarchive: 'استعادة',
      deletePermanently: 'حذف نهائي',
      messages: count => (count === 1 ? 'رسالة واحدة' : count === 2 ? 'رسالتان' : count >= 3 && count <= 10 ? `${count} رسائل` : `${count} رسالة`),
      restored: 'تمت الاستعادة',
      deleteConfirm: title => `حذف «${title}» نهائيًا؟ لا يمكن التراجع عن ذلك.`,
      autoArchiveTitle: 'أرشفة المحادثات الخاملة تلقائيًا',
      autoArchiveDesc:
        'أرشف تلقائيًا المحادثات التي لم تفتحها منذ فترة. المحادثات المثبتة لا تُؤرشف أبدًا ولا يُحذف أي شيء — المحادثات المؤرشفة تنتقل إلى هنا فقط.',
      autoArchiveDaysLabel: 'الأرشفة بعد',
      autoArchiveDaysUnit: 'يومًا من الخمول',
      autoArchiveFailed: 'تعذّر تحديث الأرشفة التلقائية',
      defaultDirTitle: 'مجلد المشروع الافتراضي',
      defaultDirDesc:
        'تبدأ الجلسات الجديدة في هذا المجلد ما لم تختر مجلدًا آخر. اتركه غير محدد لاستخدام مجلدك الرئيسي.',
      defaultDirUpdated:
        'تم تحديث مجلد المشروع الافتراضي — ابدأ محادثة جديدة (Ctrl/⌘+N) ليسري مفعوله',
      defaultsTo: label => `الافتراضي: ${label}.`,
      change: 'تغيير',
      choose: 'اختيار',
      clear: 'مسح',
      notSet: 'غير محدد',
      failedLoad: 'تعذّر تحميل الجلسات المؤرشفة',
      unarchiveFailed: 'فشلت الاستعادة',
      deleteFailed: 'تعذّر الحذف',
      updateDirFailed: 'تعذّر تحديث المجلد الافتراضي',
      clearDirFailed: 'تعذّر مسح المجلد الافتراضي'
    },
    toolsets: {
      loadingConfig: 'جارٍ تحميل الإعدادات',
      savedTitle: 'تم حفظ بيانات الاعتماد',
      savedMessage: key => `تم تحديث ${key}.`,
      removedTitle: 'تمت إزالة بيانات الاعتماد',
      removedMessage: key => `تمت إزالة ${key}.`,
      failedSave: key => `تعذّر حفظ ${key}`,
      failedRemove: key => `تعذّرت إزالة ${key}`,
      failedReveal: key => `تعذّر إظهار ${key}`,
      removeConfirm: key => `إزالة ${key} من .env؟`,
      set: 'تعيين',
      notSet: 'غير محدد',
      selectedTitle: 'تم اختيار المزوّد',
      selectedMessage: provider => `${provider} نشط الآن.`,
      failedSelect: provider => `تعذّر اختيار ${provider}`,
      failedLoad: 'تعذّر تحميل إعدادات الأدوات',
      noProviderOptions:
        'لا توجد خيارات مزوّد لمجموعة الأدوات هذه — فعّلها وستعمل بإعداداتك الحالية.',
      noProviders: 'لا يوجد مزوّد متاح لمجموعة الأدوات هذه حاليًا.',
      ready: 'جاهز',
      needsSignIn: 'يحتاج إلى تسجيل الدخول',
      needsSetup: 'يحتاج إلى إعداد',
      activeBackend: 'نشط',
      activeBackendHint: 'هذا هو الخادم الخلفي النشط لديك',
      useBackend: 'استخدام هذا الخادم الخلفي',
      nousIncluded: 'مشمول مع اشتراك Nous — سجّل الدخول إلى Nous Portal للتفعيل.',
      nousAuthNeededTitle: 'تسجيل الدخول إلى Nous Portal',
      nousAuthNeededMessage: provider =>
        `تم حفظ ${provider} لكنه لن يُفعَّل حتى تسجّل الدخول إلى Nous Portal.`,
      nousAuthSignIn: 'تسجيل الدخول',
      nousAuthDoneTitle: 'تم ربط Nous Portal',
      nousAuthDoneMessage: 'الخوادم الخلفية لاشتراكك نشطة الآن.',
      nousAuthFailed: 'لم يكتمل تسجيل الدخول إلى Nous Portal',
      nousAuthFailedMessage: 'حاول مرة أخرى.',
      nousAuthTryAgain: 'إعادة المحاولة',
      noApiKeyRequired: 'لا حاجة لمفتاح API.',
      postSetupHint: step =>
        `يحتاج هذا الخادم الخلفي إلى تثبيت لمرة واحدة (${step}). يعمل على هذا الجهاز — وقد يستغرق بضع دقائق.`,
      postSetupInstalledHint: 'مثبّت. أعد تشغيل الإعداد فقط إذا تعطّل شيء ما.',
      postSetupRun: 'تشغيل الإعداد',
      postSetupRerun: 'إعادة تشغيل الإعداد',
      postSetupInstalled: 'مثبّت',
      postSetupRunning: 'جارٍ التثبيت…',
      postSetupStarting: 'جارٍ البدء…',
      postSetupCompleteTitle: 'اكتمل الإعداد',
      postSetupCompleteMessage: step => `تم تثبيت ${step}.`,
      postSetupErrorTitle: 'اكتمل الإعداد مع أخطاء',
      postSetupErrorMessage: step => `راجع سجل ${step}.`,
      postSetupOpenLogs: 'فتح السجلات',
      postSetupRunAgain: 'التشغيل مرة أخرى',
      postSetupFailed: step => `تعذّر تشغيل إعداد ${step}`,
      webSearchActive: backend => `البحث: ${backend}`,
      webExtractActive: backend => `الاستخراج: ${backend}`,
      webCapabilityUnset: 'غير محدد',
      webUseForSearch: 'استخدام للبحث',
      webUseForExtract: 'استخدام للاستخراج',
      webUsedForSearch: 'الخادم الخلفي للبحث',
      webUsedForExtract: 'الخادم الخلفي للاستخراج',
      webCapabilitySelectedMessage: (provider, capability) =>
        `يتولى ${provider} الآن ${capability === 'search' ? 'البحث على الويب' : 'استخراج محتوى الويب'}.`,
      failedSelectCapability: provider => `تعذّر تعيين ${provider}`,
      loadingModels: 'جارٍ تحميل كتالوج النماذج...',
      modelSectionTitle: 'النموذج',
      modelCount: count => (count === 1 ? 'نموذج واحد' : count === 2 ? 'نموذجان' : count >= 3 && count <= 10 ? `${count} نماذج` : `${count} نموذجًا`),
      modelInUse: 'قيد الاستخدام',
      modelDefault: 'افتراضي',
      modelInactiveHint: 'اختر هذا الخادم الخلفي أولًا لتغيير نموذجه.',
      modelSelectedTitle: 'تم اختيار النموذج',
      modelSelectedMessage: model => `يُطبَّق ${model} على الجلسات الجديدة.`,
      failedSelectModel: model => `تعذّر اختيار ${model}`,
      terminalBackend: {
        sectionTitle: 'الخادم الخلفي للتنفيذ',
        loading: 'جارٍ التحقق من الخوادم الخلفية للتنفيذ…',
        failedLoad: 'تعذّر تحميل الخوادم الخلفية للطرفية',
        ready: 'جاهز',
        needsSetup: 'يحتاج إلى إعداد',
        unavailable: 'غير متاح',
        inUse: 'قيد الاستخدام',
        selectedTitle: 'تم اختيار الخادم الخلفي',
        selectedMessage: backend =>
          `تُنفَّذ أوامر الطرفية الآن عبر ${backend}. يُطبَّق على الجلسات الجديدة.`,
        failedSelect: backend => `تعذّر اختيار ${backend}`,
        needsSetupHint:
          'تم اختيار هذا الخادم الخلفي دون إكمال إعداده — ستفشل الأوامر حتى يكتمل الإعداد.',
        needsSetupConfirmTitle: (backend: string) => `اختيار ${backend} على أي حال؟`,
        needsSetupConfirmDescription: (detail: string) =>
          `${detail} الجلسات التي تبدأ بعد هذا التغيير لن تتوفر فيها أدوات الطرفية ولا أدوات الملفات حتى يكتمل الإعداد.`,
        needsSetupConfirmDescriptionGeneric:
          'هذا الخادم الخلفي غير مُعدّ بعد. الجلسات التي تبدأ بعد هذا التغيير لن تتوفر فيها أدوات الطرفية ولا أدوات الملفات حتى يكتمل الإعداد.',
        needsSetupConfirmAction: 'الاختيار على أي حال',
        unavailableTitle: 'أوامر الطرفية غير متاحة',
        unavailableMessage: backend =>
          `لا يستطيع Hermes تنفيذ أوامر الصدفة حاليًا: ${backend} غير جاهز. انتقل إلى «محلي» أو أكمل إعداد ${backend}، ثم حاول مرة أخرى.`,
        openBackendSettings: 'فتح إعدادات الطرفية',
        useLocal: 'استخدام المحلي',
        switchedToLocal:
          'تُنفَّذ أوامر الطرفية الآن محليًا. يُطبَّق على الجلسات الجديدة.'
      },
      browserRealProfile: {
        label: 'استخدام ملف تعريف متصفحي الحقيقي',
        description:
          'ينسخ تسجيلات الدخول وملفات تعريف الارتباط من متصفحك الافتراضي إلى لقطة مُدارة يستخدمها الوكيل للتصفح. لا يُفتح ملف تعريفك النشط مباشرة أبدًا. يُطبَّق على الجلسات الجديدة.',
        enabledTitle: 'تم تفعيل التصفح بملف التعريف الحقيقي',
        enabledMessage: 'ستستخدم الجلسات الجديدة لقطة من ملف تعريف متصفحك الافتراضي.',
        disabledTitle: 'تم تعطيل التصفح بملف التعريف الحقيقي',
        disabledMessage:
          'ستُحذف لقطة ملف التعريف؛ وستستخدم الجلسات الجديدة متصفحًا نظيفًا.',
        failedSave: 'تعذّر حفظ إعداد ملف التعريف الحقيقي',
        prompt: {
          title: 'ابقَ مسجّلًا في مواقعك',
          body: 'اسمح لـ Hermes بالتصفح باستخدام لقطة من ملف تعريف متصفحك الافتراضي لتُفتح المواقع وأنت مسجّل الدخول بالفعل.',
          bulletSnapshot: 'تُنسخ ملفات تعريف الارتباط وتسجيلات الدخول إلى لقطة مُدارة.',
          bulletLiveProfile: 'لا يُفتح ملف تعريف متصفحك النشط مباشرة أبدًا.',
          bulletLocal: 'لا يغادر أي شيء هذا الكمبيوتر.',
          dontShowAgain: 'عدم الإظهار مجددًا',
          notNow: 'ليس الآن',
          enable: 'استخدام ملف تعريفي'
        }
      }
    }
  },
  skills: {
    tabSkills: 'المهارات',
    tabToolsets: 'الأدوات',
    configuringProfile: 'جارٍ إعداد:',
    all: 'الكل',
    searchSkills: 'ابحث في المهارات...',
    searchToolsets: 'ابحث في الأدوات...',
    refresh: 'تحديث المهارات',
    refreshing: 'جارٍ تحديث المهارات',
    loading: 'جارٍ تحميل القدرات...',
    noSkillsTitle: 'لم يتم العثور على مهارات',
    noSkillsDesc: 'جرّب بحثًا أوسع أو فئة مختلفة.',
    noToolsetsTitle: 'لم يتم العثور على مجموعات أدوات',
    noToolsetsDesc: 'جرّب عبارة بحث أوسع.',
    noDescription: 'لا يوجد وصف.',
    configured: 'مُعدّ',
    needsKeys: 'يحتاج إلى مفاتيح',
    visionModelHint:
      'تستخدم الرؤية إعدادات النموذج المساعد — يُختار النموذج القادر على الصور هناك، لا حسب المزوّد هنا.',
    visionModelLink: 'اختر نموذج الرؤية من الإعدادات ← النماذج',
    toolsetsEnabled: (enabled, total) => `${enabled}/${total} من مجموعات الأدوات مفعّلة`,
    configureToolset: label => `إعداد ${label}`,
    toggleToolset: (label, enabled) => `${enabled ? 'تفعيل' : 'تعطيل'} مجموعة الأدوات ${label}`,
    skillsLoadFailed: 'تعذّر تحميل المهارات',
    toolsetsRefreshFailed: 'تعذّر تحديث مجموعات الأدوات',
    skillEnabled: 'تم تفعيل المهارة',
    skillDisabled: 'تم تعطيل المهارة',
    toolsetEnabled: 'تم تفعيل مجموعة الأدوات',
    toolsetDisabled: 'تم تعطيل مجموعة الأدوات',
    appliesToNewSessions: name => `يُطبَّق ${name} على الجلسات الجديدة.`,
    failedToUpdate: name => `تعذّر تحديث ${name}`,
    sortMostUsed: 'الأكثر استخدامًا',
    sortAlpha: 'A–Z',
    sortMostUsedDesc: '↓ الأكثر استخدامًا',
    sortLeastUsedAsc: '↑ الأقل استخدامًا',
    enableAll: 'تفعيل الكل',
    disableAll: 'تعطيل الكل',
    disableUnused: 'تعطيل غير المستخدمة',
    bulkUpdated: count => `تم تحديث ${count === 1 ? 'عنصر واحد' : count === 2 ? 'عنصرين' : count >= 3 && count <= 10 ? `${count} عناصر` : `${count} عنصرًا`} للجلسات الجديدة.`,
    bulkNoChange: 'لا يوجد ما يُغيَّر.',
    usageCount: count => `استُخدم ${count}×`,
    provenance: {
      agent: 'مُكتسبة',
      bundled: 'مدمجة',
      hub: 'Hub'
    },
    emptyNoneFound: noun => `لم يتم العثور على ${noun}`,
    emptyNothingMatches: query => `لا شيء يطابق «${query}».`,
    emptyNoneAvailable: noun => `لا يوجد ${noun} متاح حاليًا.`,
    changesApplyNewSessions: 'تُطبَّق التغييرات على الجلسات الجديدة.',
    skillUpdated: 'تم تحديث المهارة',
    edit: 'تعديل',
    archive: 'أرشفة',
    skillArchivedTitle: 'تمت أرشفة المهارة',
    skillArchivedMessage: 'يمكن استعادتها عبر hermes curator restore.',
    tabPlugins: 'الإضافات',
    plugins: {
      agentTitle: 'إضافات الوكيل',
      agentBlurb:
        'وسّع وكيل ملف التعريف المختار بأدوات وخطافات (hooks) ومزوّدين. تسري التغييرات بعد إعادة تشغيل البوابة.',
      pageBlurb:
        'يمكن للإضافة أن توسّع هذا التطبيق أو الوكيل أو كليهما — ولكل نصف مفتاحه الخاص.',
      halfDesktop: 'سطح المكتب',
      halfDesktopHint: 'هذا التطبيق، نفسه لكل ملفات التعريف',
      halfAgent: 'الوكيل',
      halfAgentIn: profile => `الوكيل في ${profile}`,
      defaultProfile: 'Hermes (افتراضي)',
      kindAgent: 'الوكيل',
      kindDesktop: 'سطح المكتب',
      kindBoth: 'الوكيل + سطح المكتب',
      installAgentHere: 'التثبيت هنا',
      installAgentHereTip: profile =>
        `جزء سطح المكتب محمّل في هذا التطبيق، لكن جزء الوكيل غير مثبت في ${profile}. ثبّته في ملف التعريف هذا.`,
      installAgentHereNoOrigin:
        'جزء الوكيل غير مثبت في ملف التعريف هذا، وقد نُسخت هذه الحزمة يدويًا دون إدخال في الكتالوج أو مستودع Git. انسخ مجلدها إلى ملف التعريف أو أعد تثبيتها من Git.',
      desktopHalfPending: 'جارٍ النسخ…',
      desktopHalfPendingTip:
        'تحتوي هذه الحزمة على جزء لسطح المكتب لم يُنسخ إلى التطبيق بعد. أعد الفحص أو أعد تشغيل التطبيق.',
      desktopHalfRemote: 'غير متاح (خادم خلفي بعيد)',
      desktopHalfRemoteTip:
        'نصف سطح المكتب من هذه الحزمة موجود على قرص الخادم الخلفي البعيد، ولا يستطيع هذا التطبيق قراءته. لاستخدامه هنا، شغّل «التثبيت من Git» برابط مستودع الحزمة مع تحديد هدف سطح المكتب — سيؤدي ذلك إلى استنساخ نصف سطح المكتب على هذا الجهاز.',
      emptyAll: 'لا توجد إضافات بعد.',
      empty: 'لا توجد إضافات وكيل مثبتة لملف التعريف هذا.',
      emptyHint: 'تصفّح الكتالوج أدناه لتثبيت إضافة موثّقة بنقرة واحدة.',
      loadFailed: 'تعذّر تحميل إضافات الوكيل',
      toggleFailed: name => `تعذّر تغيير حالة ${name}`,
      toolsetOn: (name: string, profile: string) => `تم تفعيل أدوات الوكيل من ${name} لـ ${profile}`,
      toolsetOff: (name: string, profile: string) => `تم تعطيل أدوات الوكيل من ${name} لـ ${profile}`,
      toolsetToggleFailed: (name: string) =>
        `تعذّر تغيير أدوات الوكيل من ${name}؛ ولوحة سطح المكتب لم تتغير`,
      legacyBackend: 'هذا الخادم الخلفي أقدم من أن يدير الإضافات من هذه الشاشة؛ حدّث Hermes.',
      portableBadge: 'محمولة',
      serverStates: {
        connected: 'متصل',
        app_not_running: 'التطبيق غير قيد التشغيل',
        hermes_not_connected: 'اتصال MCP مفقود',
        endpoint_unavailable: 'نقطة النهاية غير متاحة',
        no_interactive_session: 'لا توجد جلسة تفاعلية',
        version_too_old: 'الإصدار قديم جدًا',
        missing_app: 'التطبيق مفقود',
        unsupported_gpu: 'GPU غير مدعومة',
        unknown: 'حالة غير معروفة'
      },
      alreadyInstalled: (name: string) => `${name} مثبت بالفعل في ملف التعريف هذا.`,
      catalogProvenance: (sha: string) =>
        `مثبّتة من كتالوج Hermes${sha ? ` على الـ Commit المثبّت ${sha}` : ''}.`,
      pinnedProvenance: (sha: string) =>
        `مثبّتة على الـ Commit ${sha}. تُرفض التحديثات حتى تُعاد تثبيتها على Commit جديد.`,
      pinnedBadge: (sha: string) => `مثبّتة @ ${sha}`,
      ...arPluginUpdate,
      ...arPluginPreviewAccess,
      uninstall: 'إزالة التثبيت',
      uninstallTip: (name: string, profile: string) => `إزالة تثبيت ${name} من ${profile}`,
      uninstallConfirmTitle: (name: string) => `إزالة تثبيت ${name}؟`,
      uninstallConfirmBody: (name: string, profile: string) =>
        `سيحذف هذا ملفات الإضافة من ملف التعريف ${profile}. ويُحذف معها أي نصف لسطح المكتب مرفق بها. يمكنك إعادة تثبيتها من الكتالوج أو من Git في أي وقت.`,
      uninstallFailed: (name: string) => `تعذّرت إزالة تثبيت ${name}`,
      uninstalled: (name: string) => `تمت إزالة تثبيت ${name}. أعد تشغيل البوابة لإلغاء تحميلها.`,
      uninstallDesktopTip: (name: string) => `إزالة تثبيت ${name} من هذا التطبيق`,
      uninstallDesktopConfirmBody: (name: string) =>
        `سيحذف هذا ${name} من مجلد desktop-plugins على هذا الكمبيوتر ويلغي تحميلها فورًا. يمكنك إعادة تثبيتها من Git أو إعادة المجلد إلى مكانه في أي وقت.`,
      uninstalledDesktop: (name: string) => `تمت إزالة تثبيت ${name}.`,
      deepLinkErrorTitle: 'تم رفض رابط تثبيت الإضافة',
      deepLinkCatalogInvalidName: 'اسم الكتالوج في الرابط مفقود أو غير صالح.',
      deepLinkCatalogUnknown: (name: string) =>
        `«${name}» غير موجودة في كتالوج إضافات Hermes. لم يتم تثبيت أي شيء.`,
      deepLinkCatalogUnavailable:
        'تعذّر تحميل كتالوج إضافات Hermes. تحقّق من اتصالك ثم أعد فتح الرابط.',
      settingsToggle: (name: string) => `الإعدادات: ${name}`,
      settingsForm: {
        save: 'حفظ الإعدادات',
        saved: (name: string) => `تم حفظ إعدادات ${name}.`,
        saveFailed: (name: string) => `تعذّر حفظ إعدادات ${name}`,
        required: 'مطلوب',
        secretSet: '•••••••• (معيّن)',
        secretStoredAs: (env: string) =>
          `مخزّن في .env الخاص بملف التعريف باسم ${env}، ولا يُخزَّن أبدًا في config.yaml؛ اتركه فارغًا للاحتفاظ بالقيمة الحالية.`
      }
    },
    officialCatalog: 'متاحة للتثبيت',
    officialPill: 'رسمي',
    hub: {
      searchPlaceholder: 'ابحث في مركز المهارات',
      search: 'بحث',
      searching: 'جارٍ البحث...',
      connectingHubs: 'جارٍ الاتصال بمراكز المهارات...',
      connectedHubs: 'المراكز المتصلة:',
      featured: 'مهارات مميزة',
      landingHint:
        'ابحث في المركز لتصفّح المهارات القابلة للتثبيت من الفهرس الرسمي وGitHub ومصادر المجتمع.',
      noResults: 'لم يتم العثور على مهارات مطابقة في المركز.',
      resultCount: (count, ms) => `${count === 1 ? 'نتيجة واحدة' : count === 2 ? 'نتيجتان' : count >= 3 && count <= 10 ? `${count} نتائج` : `${count} نتيجة`}${ms !== null ? ` خلال ${ms} مللي ثانية` : ''}`,
      timedOut: sources => `انتهت المهلة: ${sources}`,
      installed: 'مثبّتة',
      install: 'تثبيت',
      installing: 'جارٍ التثبيت...',
      uninstall: 'إزالة التثبيت',
      uninstalling: 'جارٍ إزالة التثبيت...',
      updateAll: 'تحديث المثبّتة',
      updating: 'جارٍ التحديث...',
      preview: 'معاينة',
      scan: 'فحص',
      scanning: 'جارٍ الفحص...',
      close: 'إغلاق',
      files: 'الملفات',
      noReadme: 'لا توجد معاينة SKILL.md لهذه المهارة.',
      trust: {
        builtin: 'مدمجة',
        trusted: 'موثوقة',
        community: 'المجتمع'
      },
      verdictSafe: 'آمنة',
      verdictCaution: 'بحذر',
      verdictDangerous: 'خطيرة',
      policyAllow: 'التثبيت مسموح',
      policyAsk: 'المراجعة قبل التثبيت',
      policyBlock: 'التثبيت محظور بموجب السياسة',
      findings: count => (count === 1 ? 'نتيجة فحص واحدة' : count === 2 ? 'نتيجتا فحص' : count >= 3 && count <= 10 ? `${count} نتائج فحص` : `${count} نتيجة فحص`),
      noFindings: 'لا توجد نتائج للفحص الأمني.',
      installStarted: name => `جارٍ تثبيت ${name}...`,
      uninstallStarted: name => `جارٍ إزالة تثبيت ${name}...`,
      updateStarted: 'جارٍ تحديث المهارات المثبّتة...',
      actionFailed: 'فشل إجراء المهارة',
      installBlockedTitle: name => `تعذّر تثبيت ${name}`,
      installBlockedMessage: (findings, unverified) =>
        `رصد الفحص الأمني ${findings > 0 ? `${findings} عنصرًا` : 'أنماطًا خطرة'} تحتاج إلى مراجعة${unverified ? '، والمهارة من مصدر غير موثّق' : ''}. راجع الفحص قبل أن تقرر ما إذا كنت تثق في المؤلف.`,
      viewScan: 'عرض الفحص',
      openLog: 'فتح السجل',
      actionLog: 'سجل الإجراء',
      alreadyInstalled: name => `«${name}» مثبّتة بالفعل`,
      pickerTitle: 'مركز المهارات',
      pickerBrowse: 'تصفّح المركز كاملًا',
      pickerHide: 'إخفاء متصفح المركز',
      pickerHint:
        'انقر على «+ إضافة إلى هذا الوكيل» لتثبيت مهارة: ستظهر بعد ذلك في القائمة أعلاه.',
      loadFailed: 'تعذّر تحميل مركز المهارات',
      previewFailed: 'تعذّرت معاينة المهارة',
      scanFailed: 'فشل الفحص الأمني',
      searchFailed: 'فشل البحث في المركز'
    }
  },
  starmap: {
    title: 'خريطة الذاكرة',
    subtitle: (nodes, clusters) => `${nodes} مهارة في ${clusters} فئة`,
    close: 'إغلاق خريطة الذاكرة',
    refresh: 'تحديث',
    memory: 'الذاكرة',
    filterAll: 'الكل',
    filterUsed: 'المستخدمة',
    filterLearned: 'المُكتسبة',
    viewGraph: 'الرسم البياني',
    loadFailed: 'تعذّر تحميل خريطة الذاكرة',
    loading: 'جارٍ التحميل…',
    emptyTitle: 'لا شيء مُكتسب لسه',
    emptyDesc:
      'كلما بنى Hermes مهارات وذكريات لعملك، ستظهر هنا.',
    share: 'مشاركة الخريطة',
    shareHint:
      'انسخ الرمز لمشاركة هذه الخريطة، أو الصق رمزًا لتحميله. يتضمن التخطيط فقط، لا نص الذاكرة أو المهارات.',
    shareTitle: 'استيراد / تصدير الخريطة',
    sharePlaceholder: 'الصق رمز خريطة…',
    copy: 'نسخ رمز الخريطة',
    copied: 'تم النسخ!',
    importMap: 'استيراد خريطة',
    importBtn: 'تحميل',
    importEmpty: 'الصق رمز خريطة لتحميله.',
    importSuccess: nodes => `تم تحميل الخريطة ${nodes === 1 ? 'بعقدة واحدة' : nodes === 2 ? 'بعقدتين' : nodes >= 3 && nodes <= 10 ? `بـ ${nodes} عقد` : `بـ ${nodes} عقدة`}.`,
    importedBadge: 'خريطة مستوردة',
    resetToMine: 'العودة إلى خريطتي'
  },
  agents: {
    extendedTranscript: 'النص الكامل الموسّع',
    transcriptTruncated: 'عرض أحدث 16 كيبيبايت',
    transcriptUnavailable: 'النص المباشر غير متاح',
    close: 'إغلاق الوكلاء',
    title: 'شجرة الإنشاء',
    subtitle: 'نشاط مباشر للوكلاء الفرعيين في الدور الحالي.',
    emptyTitle: 'لا يوجد وكلاء فرعيون نشطون',
    emptyDesc: 'عندما يفوّض دورٌ عملًا، يبث الوكلاء الفرعيون تقدّمهم هنا.',
    running: 'قيد التشغيل',
    failed: 'فشل',
    done: 'تم',
    streaming: 'جارٍ البث',
    files: 'الملفات',
    moreFiles: count => `+${count} ملفات إضافية`,
    moreAgents: count => `+${count} وكلاء إضافيين`,
    queued: 'في الانتظار',
    waitingActivity: 'بانتظار النشاط',
    steer: 'توجيه',
    steerPlaceholder: 'تعليمات لهذا الوكيل الفرعي',
    steerQueued: 'التعليمات مجدولة عند نقطة التحقق القادمة',
    stopRequested: 'تم طلب الإيقاف',
    requestRejected: 'لم يقبل الوكيل الفرعي الطلب',
    delegation: index => `التفويض ${index}`,
    workers: count => `${count} عاملًا`,
    workersActive: count => `${count} نشط`,
    agentsCount: count => (count === 1 ? 'وكيل واحد' : count === 2 ? 'وكيلان' : count >= 3 && count <= 10 ? `${count} وكلاء` : `${count} وكيلًا`),
    activeCount: count => `${count} نشط`,
    failedCount: count => `${count} فاشل`,
    toolsCount: count => `${count} أداة`,
    filesCount: count => `${count} ملف`,
    updatedAgo: age => `حُدّث منذ ${age}`,
    ageNow: 'الآن',
    ageSeconds: seconds => `منذ ${seconds} ث`,
    ageMinutes: minutes => `منذ ${minutes} د`,
    ageHours: hours => `منذ ${hours} س`,
    ageDays: days => `منذ ${days} ي`,
    durationSeconds: seconds => `${seconds} ث`,
    durationMinutes: (minutes, seconds) => `${minutes} د ${seconds} ث`,
    tokens: value => `${value} توكن`
  },

  commandCenter: {
    close: 'إغلاق مركز الأوامر',
    paletteTitle: 'لوحة الأوامر',
    back: 'رجوع',
    searchPlaceholder: 'ابحث في الجلسات والعروض والإجراءات',
    goTo: 'انتقال إلى',
    goToSession: 'الانتقال إلى الجلسة',
    branches: 'الفروع',
    projects: 'المشاريع',
    openFolder: 'فتح مجلد كمشروع…',
    openFolderAt: path => `فتح المجلد كمشروع — ${path}`,
    newSessionInProject: project => `جلسة جديدة في ${project}`,
    commands: 'الأوامر',
    startInBranch: branch => `محادثة جديدة في ${branch}`,
    commandCenter: 'مركز الأوامر',
    appearance: 'المظهر',
    settings: 'الإعدادات',
    changeTheme: 'تغيير السمة',
    changeColorMode: 'تغيير وضع الألوان…',
    pets: {
      title: 'الحيوانات الأليفة',
      placeholder: 'ابحث عن حيوان أليف…',
      loading: 'جارٍ تحميل معرض petdex…',
      error: 'تعذّر الوصول إلى معرض petdex…',
      staleBackend: 'أعد تشغيل Hermes لاستخدام الحيوانات الأليفة — الخادم الخلفي أقدم من هذه الميزة.',
      empty: 'لا توجد حيوانات مطابقة.',
      turnOff: 'إيقاف',
      turnOn: 'تشغيل',
      installed: 'مثبّت',
      generatedTag: 'مُولَّد',
      adoptFailed: 'تعذّر تبنّي هذا الحيوان الأليف.',
      toggleFailed: enabled => `تعذّر ${enabled ? 'تفعيل' : 'تعطيل'} الحيوان الأليف.`,
      noneAvailable: 'لا توجد حيوانات أليفة متاحة — اختر واحدًا من الأسفل لتثبيته.'
    },
    generatePet: {
      title: 'توليد حيوان أليف',
      placeholder: 'صِف الحيوان الأليف الذي تريد توليده…',
      promptHint: 'اكتب وصفًا، ثم اضغط Enter لتوليد أربعة أشكال.',
      readyHint: 'اضغط Enter لتوليد أربعة أشكال من وصفك.',
      generate: 'توليد',
      generating: 'جارٍ التوليد…',
      retry: 'إعادة المحاولة',
      hatch: 'فقس',
      spawning: 'جارٍ الإنشاء…',
      hatching: 'جارٍ فقس حيوانك الأليف…',
      hatchingSub: 'جارٍ بثّ الحياة فيه…',
      hatched: 'فقس خلاص!',
      hatchRow: (_state, done, total) => `جارٍ رسم الصورة ${done} من ${total}…`,
      hatchComposing: 'جارٍ التجميع…',
      hatchSaving: 'قربنا نخلص…',
      namePlaceholder: 'سمِّ حيوانك الأليف',
      staleBackend: 'حدّث Hermes لتوليد الحيوانات الأليفة…',
      backgroundHint: 'يمكنك الإغلاق — سيُعلمك Hermes عند الانتهاء.',
      slowProviderHint: 'قد يستغرق هذا عدة دقائق',
      remix: 'إعادة مزج',
      remixConfirmTitle: 'إعادة مزج هذا الشكل؟',
      remixConfirmBody:
        'سيُولّد هذا مجموعة جديدة من المسودات باستخدام هذا الشكل كنقطة بداية. قد يستغرق ذلك عدة دقائق.',
      genericError: 'فشل التوليد — حاول مرة أخرى أو اختر اقتراحًا.',
      referenceImageTooLarge: 'الصورة المرجعية كبيرة جدًا. استخدم صورة أصغر من 16 ميجابايت.',
      referenceImageInvalid: 'تعذّرت قراءة هذه الصورة المرجعية. جرّب PNG أو JPG أو WebP أو GIF.',
      adopt: 'تبنٍّ',
      startOver: 'البدء من جديد'
    },
    installTheme: {
      title: 'تثبيت سمة…',
      pageTitle: 'تثبيت سمة',
      placeholder: 'ابحث في VS Code Marketplace…',
      loading: 'جارٍ البحث في Marketplace…',
      error: 'تعذّر الوصول إلى Marketplace.',
      empty: 'لا توجد سمات مطابقة.',
      install: 'تثبيت',
      installing: 'جارٍ التثبيت…',
      installed: 'مثبّتة',
      installs: count => `${count} تثبيت`
    },
    settingsFields: 'حقول الإعدادات',
    mcpServers: 'خوادم MCP',
    archivedChats: 'المحادثات المؤرشفة',
    sections: {
      maintenance: 'الصيانة',
      sessions: 'الجلسات',
      system: 'النظام',
      usage: 'الاستخدام'
    },
    nav: {
      newChat: {
        title: 'جلسة جديدة',
        detail: 'ابدأ جلسة جديدة'
      },
      settings: {
        title: 'الإعدادات',
        detail: 'تهيئة Hermes Desktop'
      },
      capabilities: {
        title: 'القدرات',
        detail: 'المهارات والأدوات وخوادم MCP والإضافات'
      },
      messaging: {
        title: 'المراسلة',
        detail: 'إعداد Telegram وSlack وDiscord وغيرها'
      },
      artifacts: {
        title: 'المُخرَجات',
        detail: 'تصفّح المُخرَجات المُولَّدة'
      }
    },
    sectionEntries: {
      sessions: {
        title: 'لوحة الجلسات',
        detail: 'ابحث في الجلسات وثبّتها وأدِرها'
      },
      system: {
        title: 'لوحة النظام',
        detail: 'حالة البوابة، السجلات، إعادة التشغيل/التحديث'
      },
      usage: {
        title: 'لوحة الاستخدام',
        detail: 'نشاط التوكنات والتكاليف والمهارات'
      }
    },
    providerNavigate: 'تنقّل',
    providerSessions: 'الجلسات',
    refresh: 'تحديث',
    refreshing: 'جارٍ التحديث…',
    noResults: 'لم يتم العثور على نتائج مطابقة.',
    pinSession: 'تثبيت الجلسة',
    unpinSession: 'إلغاء تثبيت الجلسة',
    exportSession: 'تصدير الجلسة',
    deleteSession: 'حذف الجلسة',
    noSessions: 'لا توجد جلسات بعد.',
    gatewayRunning: 'بوابة المراسلة تعمل',
    gatewayStopped: 'بوابة المراسلة متوقفة',
    hermesActiveSessions: (version, count) => `Hermes ${version} · الجلسات النشطة ${count}`,
    restartGateway: 'إعادة تشغيل البوابة',
    openBrowser: 'إظهار/إخفاء المتصفح',
    toggleBrowser: 'إظهار/إخفاء المتصفح',
    gatewayRestartFailed: 'فشلت إعادة تشغيل البوابة.',
    sharedGatewayRestartTitle: 'إعادة تشغيل البوابة المشتركة؟',
    sharedGatewayRestartDescription: bots => `ستُعيد كل البوتات على هذا الجهاز الاتصال: ${bots}`,
    sharedGatewayRestartConfirm: 'إعادة تشغيل الكل',
    sharedGatewayRestarted: count => `تمت إعادة تشغيل البوابة المشتركة (${count} ${count === 1 ? 'بوت' : 'بوتات'})`,
    updateHermes: 'تحديث Hermes',
    reloadWindow: 'إعادة تحميل النافذة',
    actionRunning: 'قيد التشغيل',
    actionDone: 'تم',
    actionFailed: 'فشل',
    actionStartedWaiting: 'بدأ الإجراء، في انتظار الحالة…',
    loadingStatus: 'جارٍ تحميل الحالة…',
    recentLogs: 'السجلات الأخيرة',
    noLogs: 'لم يتم تحميل أي سجلات بعد.',
    days: count => `${count} يوم`,
    statSessions: 'الجلسات',
    statApiCalls: 'استدعاءات API',
    statTokens: 'التوكنات الداخلة/الخارجة',
    statCost: 'التكلفة التقديرية',
    actualCost: cost => `الفعلية ${cost}`,
    loadingUsage: 'جارٍ تحميل الاستخدام…',
    noUsage: period => `لا يوجد استخدام خلال آخر ${period} يوم.`,
    retry: 'إعادة المحاولة',
    dailyTokens: 'التوكنات اليومية',
    input: 'داخل',
    output: 'خارج',
    noDailyActivity: 'لا يوجد نشاط يومي.',
    topModels: 'أكثر النماذج استخدامًا',
    noModelUsage: 'لا يوجد استخدام للنماذج بعد.',
    topSkills: 'أكثر المهارات استخدامًا',
    noSkillActivity: 'لا يوجد نشاط للمهارات بعد.',
    actions: count => `${count} إجراء`,
    logFile: 'ملف السجل',
    logLevel: 'المستوى',
    logSearchPlaceholder: 'ابحث في السجلات…',
    maintenance: {
      runOps: 'التشخيص',
      doctor: 'تشغيل التشخيص',
      doctorDesc: 'افحص التثبيت والتهيئة والمزوّدين',
      securityAudit: 'تدقيق أمني',
      securityAuditDesc: 'افحص التهيئة والمهارات بحثًا عن إعدادات خطرة',
      backup: 'إنشاء نسخة احتياطية',
      backupDesc: 'ضغط التهيئة والذاكرة والمهارات والجلسات في ملف zip',
      debugShare: 'مشاركة التصحيح',
      debugShareDesc:
        'ارفع تقريرًا منقّحًا مع السجلات واحصل على روابط قابلة للمشاركة (تُحذف تلقائيًا بعد 6 ساعات)',
      debugShareRunning: 'جارٍ رفع تقرير التصحيح…',
      debugShareLinks: 'روابط المشاركة',
      debugShareFailed: 'فشلت مشاركة التصحيح',
      copyLink: 'نسخ الرابط',
      linkCopied: 'تم نسخ الرابط',
      curator: 'منسّق المهارات',
      curatorDesc: 'مراجعة في الخلفية تؤرشف مهارات الوكيل القديمة',
      curatorPaused: 'متوقف مؤقتًا',
      curatorActive: 'نشط',
      curatorDisabled: 'معطّل',
      curatorLastRun: when => `آخر تشغيل ${when}`,
      curatorNeverRan: 'لم يُشغَّل قط',
      pause: 'إيقاف مؤقت',
      resume: 'استئناف',
      runNow: 'تشغيل الآن',
      memoryData: 'بيانات الذاكرة',
      memoryDataDesc: 'ملفات الذاكرة المدمجة التي تُحقن في كل جلسة',
      memoryProvider: name => `المزوّد النشط: ${name}`,
      builtinMemory: 'مدمج',
      memoryFile: 'ذاكرة الوكيل (MEMORY.md)',
      userFile: 'ملف تعريف المستخدم (USER.md)',
      bytes: size => size,
      empty: 'فارغ',
      resetMemory: 'إعادة تعيين الذاكرة',
      resetUser: 'إعادة تعيين ملف التعريف',
      resetAll: 'إعادة تعيين الاثنين',
      resetConfirm: target => `حذف ${target}؟ لا يمكن التراجع عن ذلك.`,
      resetDone: files => `تم حذف ${files}.`,
      resetFailed: 'فشلت إعادة تعيين الذاكرة',
      actionStarted: name => `بدأ ${name} — جارٍ متابعة السجل…`,
      actionFailed: name => `فشل بدء ${name}`,
      running: 'قيد التشغيل…',
      viewLog: 'سجل الإجراء'
    }
  },
  messaging: {
    search: 'ابحث في المراسلة…',
    statusFilter: {
      all: 'الكل',
      bad: 'أخطاء',
      good: 'متصلة',
      muted: 'غير نشطة',
      warn: 'تحتاج إلى انتباه'
    },
    loading: 'جارٍ تحميل منصات المراسلة…',
    loadFailed: 'فشل تحميل منصات المراسلة',
    states: {
      connected: 'متصل',
      connecting: 'جارٍ الاتصال',
      disabled: 'معطّل',
      fatal: 'خطأ',
      gateway_stopped: 'بوابة المراسلة متوقفة',
      not_configured: 'يحتاج إلى إعداد',
      pending_restart: 'يلزم إعادة التشغيل',
      retrying: 'جارٍ إعادة المحاولة',
      startup_failed: 'فشل بدء التشغيل'
    },
    unknown: 'غير معروف',
    hintPendingRestart: 'أعد تشغيل البوابة من شريط الحالة لتطبيق هذا التغيير.',
    sharedListenerUrl: 'يُقدَّم عبر المستمع المشترك للبوابة على',
    hintGatewayStopped: 'شغّل البوابة من شريط الحالة للاتصال.',
    credentialsSet: 'تم تعيين بيانات الاعتماد',
    needsSetup: 'يحتاج إلى إعداد',
    gatewayStopped: 'بوابة المراسلة متوقفة',
    getCredentials: 'احصل على بيانات الاعتماد',
    openSetupGuide: 'فتح دليل الإعداد',
    required: 'مطلوب',
    recommended: 'موصى به',
    advanced: count => `متقدم (${count})`,
    noTokenNeeded:
      'لا تحتاج هذه المنصة إلى توكن هنا. استخدم دليل الإعداد أعلاه، ثم فعّلها بالأسفل.',
    enabled: 'مفعّل',
    disabled: 'معطّل',
    unsavedChanges: 'تغييرات غير محفوظة',
    saving: 'جارٍ الحفظ…',
    saveChanges: 'حفظ التغييرات',
    saved: 'تم الحفظ',
    replaceValue: 'استبدال القيمة الحالية',
    openDocs: 'فتح الوثائق',
    clearField: key => `مسح ${key}`,
    addListEntry: 'إضافة',
    removeListEntry: 'إزالة',
    listEntryPlaceholder: 'أدخل معرّفًا',
    enableAria: name => `تفعيل ${name}`,
    disableAria: name => `تعطيل ${name}`,
    platformEnabled: name => `تم تفعيل ${name}`,
    platformDisabled: name => `تم تعطيل ${name}`,
    restartToApply: 'يسري هذا التغيير بعد إعادة تشغيل البوابة.',
    setupSaved: name => `تم حفظ إعداد ${name}`,
    restartToReconnect: 'تسري بيانات الاعتماد الجديدة بعد إعادة تشغيل البوابة.',
    appliedLive: 'تم التطبيق على البوابة العاملة.',
    connectingLive: 'البوابة العاملة تتصل ببيانات الاعتماد الجديدة.',
    keyCleared: key => `تم مسح ${key}`,
    setupUpdated: name => `تم تحديث إعداد ${name}.`,
    failedUpdate: name => `فشل تحديث ${name}`,
    failedSave: name => `فشل حفظ ${name}`,
    failedClear: key => `فشل مسح ${key}`,
    pendingRequests: count => `طلبات معلّقة (${count})`,
    pendingAria: count =>
      `${count} ${count === 1 ? 'طلب اقتران معلّق' : 'طلبات اقتران معلّقة'}`,
    approvedUsers: count => `المستخدمون الموافَق عليهم (${count})`,
    approve: 'موافقة',
    approving: 'جارٍ الموافقة…',
    revoke: 'إلغاء الوصول',
    revoking: 'جارٍ الإلغاء…',
    revokeAria: name => `إلغاء وصول ${name}`,
    revokeTitle: 'إلغاء الوصول',
    revokeDesc: name => `سيفقد ${name} الوصول ولن يتم التعرّف عليه بدءًا من رسالته التالية.`,
    approvedUser: name => `تمت الموافقة على ${name}`,
    approvedHint: 'سيتم التعرّف على هذا المستخدم تلقائيًا بدءًا من رسالته التالية.',
    revokedUser: name => `تم إلغاء وصول ${name}`,
    failedApprove: name => `فشلت الموافقة على ${name}`,
    failedRevoke: name => `فشل إلغاء وصول ${name}`,
    pairingLockedOut:
      'محاولات موافقة فاشلة كثيرة — هذه المنصة مقفلة مؤقتًا. حاول مرة أخرى لاحقًا.',
    waitingSince: minutes => (minutes < 1 ? 'الآن' : `منذ ${minutes} دقيقة`),
    restartNeeded: 'تم الحفظ. أعد تشغيل بوابة المراسلة لتطبيق الإعدادات الجديدة.',
    restartNow: 'إعادة التشغيل الآن',
    restarting: 'جارٍ إعادة التشغيل…',
    restartFailedManual: 'فشلت إعادة تشغيل البوابة — أعد تشغيلها يدويًا وراجع سجلاتها.',
    restartFailedManualDetail:
      'أعد محاولة التشغيل؛ وإذا استمرت المشكلة، افتح السجلات وأرسل التشخيصات.',
    restartAgain: 'إعادة التشغيل مرة أخرى',
    openLogs: 'فتح السجلات',
    telegramQr: {
      title: 'اختر طريقة ربط بوت Telegram الخاص بك',
      subtitle:
        'كلتا الطريقتين تربطان بوتًا تتحكم فيه وتحفظان بيانات اعتماده في تثبيت Hermes هذا فقط.',
      quickSetup: 'إعداد سريع',
      recommended: 'موصى به',
      quickHelp:
        'امسح رمز QR وأكّد في Telegram. سيُنشئ Hermes البوت ويكتشف معرّف مستخدم Telegram الخاص بك تلقائيًا.',
      createWithQr: 'الإنشاء برمز QR',
      starting: 'جارٍ البدء…',
      replaceWarning:
        'بيانات اعتماد Telegram مُهيّأة بالفعل. أي إعداد جديد عبر QR أو توكن جديد سيستبدل البوت الحالي عند الحفظ.',
      scanHint: 'امسح باستخدام تطبيق Telegram على هاتفك أو افتح الرابط على هذا الكمبيوتر.',
      waiting: 'في انتظار Telegram…',
      expiresIn: remaining => `ينتهي خلال ${remaining}`,
      expired: 'منتهي الصلاحية',
      openTelegram: 'فتح Telegram',
      ready: 'تم إنشاء البوت',
      allowedUsers: 'المستخدمون المسموح لهم',
      ownerDetected: 'تم اكتشاف المالك',
      addAtLeastOne: 'أضف معرّف مستخدم Telegram واحدًا على الأقل.',
      userIdPlaceholder: 'معرّف مستخدم Telegram',
      add: 'إضافة',
      numericOnly: 'يجب أن تكون معرّفات مستخدمي Telegram المسموح لهم أرقامًا.',
      saveAndRestart: 'حفظ وإعادة التشغيل',
      applying: 'جارٍ الحفظ…',
      pairingExpired: 'انتهت صلاحية ربط Telegram. ابدأ إعداد QR من جديد للمحاولة مرة أخرى.',
      stillWaiting: detail => `ما زال في انتظار Telegram. إعادة المحاولة بعد: ${detail}`,
      savedRestarting: 'تم حفظ Telegram؛ جارٍ إعادة تشغيل البوابة…',
      savedRestartFailed: detail => `تم حفظ Telegram؛ فشلت إعادة تشغيل البوابة${detail}`
    },
    fieldCopy: {
      TELEGRAM_BOT_TOKEN: {
        label: 'توكن البوت',
        help: 'أنشئ بوتًا عبر @BotFather، ثم الصق التوكن الذي يعطيك إياه.',
        placeholder: 'الصق توكن بوت Telegram'
      },
      TELEGRAM_ALLOWED_USERS: {
        label: 'معرّفات مستخدمي Telegram المسموح لهم',
        help: 'موصى به. معرّفات رقمية (واحد في كل خانة) من @userinfobot. بدون ذلك، يمكن لأي شخص مراسلة البوت الخاص بك.'
      },
      TELEGRAM_PROXY: {
        label: 'URL الوكيل (Proxy)',
        help: 'مطلوب فقط على الشبكات التي يُحجب فيها Telegram.'
      },
      DISCORD_BOT_TOKEN: {
        label: 'توكن البوت',
        help: 'أنشئ تطبيقًا في Discord Developer Portal، وأضف بوتًا، ثم الصق التوكن الخاص به.'
      },
      DISCORD_ALLOWED_USERS: {
        label: 'معرّفات مستخدمي Discord المسموح لهم',
        help: 'موصى به. معرّفات مستخدمي Discord (واحد في كل خانة).'
      },
      DISCORD_REPLY_TO_MODE: {
        label: 'أسلوب الرد',
        help: 'first أو all أو off.'
      },
      DISCORD_ALLOW_ALL_USERS: {
        label: 'السماح لكل مستخدمي Discord',
        help: 'للتطوير فقط. عند التفعيل، يمكن لأي شخص مراسلة البوت دون قائمة سماح.'
      },
      DISCORD_HOME_CHANNEL: {
        label: 'معرّف القناة الرئيسية',
        help: 'القناة التي يرسل إليها البوت الرسائل الاستباقية (مخرجات cron والتذكيرات).'
      },
      DISCORD_HOME_CHANNEL_NAME: {
        label: 'اسم القناة الرئيسية',
        help: 'اسم العرض للقناة الرئيسية في السجلات ومخرجات الحالة.'
      },
      BLUEBUBBLES_ALLOW_ALL_USERS: {
        label: 'السماح لكل مستخدمي iMessage',
        help: 'عند التفعيل، يتم تجاهل قائمة السماح الخاصة بـ BlueBubbles.'
      },
      MATTERMOST_ALLOW_ALL_USERS: {
        label: 'السماح لكل مستخدمي Mattermost'
      },
      MATTERMOST_HOME_CHANNEL: {
        label: 'القناة الرئيسية'
      },
      QQ_ALLOW_ALL_USERS: {
        label: 'السماح لكل مستخدمي QQ'
      },
      QQBOT_HOME_CHANNEL: {
        label: 'قناة QQ الرئيسية',
        help: 'القناة أو المجموعة الافتراضية لتسليم مخرجات cron.'
      },
      QQBOT_HOME_CHANNEL_NAME: {
        label: 'اسم قناة QQ الرئيسية'
      },
      SLACK_BOT_TOKEN: {
        label: 'توكن بوت Slack',
        help: 'استخدم توكن البوت من OAuth & Permissions بعد تثبيت تطبيق Slack الخاص بك.',
        placeholder: 'الصق توكن بوت Slack'
      },
      SLACK_APP_TOKEN: {
        label: 'توكن تطبيق Slack',
        help: 'استخدم توكن مستوى التطبيق المطلوب لـ Socket Mode.',
        placeholder: 'الصق توكن تطبيق Slack'
      },
      SLACK_ALLOWED_USERS: {
        label: 'معرّفات مستخدمي Slack المسموح لهم',
        help: 'موصى به. معرّفات مستخدمي Slack (واحد في كل خانة).'
      },
      MATTERMOST_URL: {
        label: 'URL الخادم',
        placeholder: 'https://mattermost.example.com'
      },
      MATTERMOST_TOKEN: {
        label: 'توكن البوت'
      },
      MATTERMOST_ALLOWED_USERS: {
        label: 'معرّفات المستخدمين المسموح لهم',
        help: 'موصى به. معرّفات مستخدمي Mattermost (واحد في كل خانة).'
      },
      MATRIX_HOMESERVER: {
        label: 'URL الخادم الرئيسي (homeserver)',
        placeholder: 'https://matrix.org'
      },
      MATRIX_ACCESS_TOKEN: {
        label: 'توكن الوصول'
      },
      MATRIX_USER_ID: {
        label: 'معرّف مستخدم البوت',
        placeholder: '@hermes:example.org'
      },
      MATRIX_ALLOWED_USERS: {
        label: 'معرّفات مستخدمي Matrix المسموح لهم',
        help: 'موصى به. معرّفات المستخدمين (واحد في كل خانة) بصيغة @user:server.'
      },
      SIGNAL_HTTP_URL: {
        label: 'URL جسر Signal',
        placeholder: 'http://127.0.0.1:8080',
        help: 'URL لجسر REST من signal-cli يعمل حاليًا.'
      },
      SIGNAL_ACCOUNT: {
        label: 'رقم الهاتف',
        help: 'الرقم المسجّل في جسر signal-cli الخاص بك.'
      },
      SIGNAL_ALLOWED_USERS: {
        label: 'مستخدمو Signal المسموح لهم',
        help: 'موصى به. معرّفات Signal (واحد في كل خانة).'
      },
      WHATSAPP_ENABLED: {
        label: 'تفعيل جسر WhatsApp',
        help: 'يُضبط تلقائيًا عبر المفتاح بالأسفل. لا تغيّره إلا إذا كنت تعرف أنك تحتاج إليه.'
      },
      WHATSAPP_MODE: {
        label: 'وضع الجسر'
      },
      WHATSAPP_ALLOWED_USERS: {
        label: 'مستخدمو WhatsApp المسموح لهم',
        help: 'موصى به. أرقام هواتف أو معرّفات WhatsApp (واحد في كل خانة).'
      }
    },
    platformIntro: {}
  },
  webhooks: {
    search: 'ابحث في Webhooks…',
    loading: 'جارٍ تحميل Webhooks…',
    loadFailed: 'فشل تحميل Webhooks',
    subscriptions: (count: number) => `الاشتراكات (${count})`,
    hint: 'تُعاد تهيئة تغييرات الاشتراكات فورًا بمجرد تشغيل المستقبِل. الاشتراكات المعطّلة ترفض الأحداث الواردة.',
    empty: 'لا توجد اشتراكات Webhook بعد.',
    disabledTitle: 'مستقبِل Webhooks معطّل',
    disabledBody:
      'Webhooks منصة مستقلة ضمن البوابة. فعّلها هنا لاستقبال أحداث HTTP الواردة؛ ولا تحتاج إلى قنوات المحادثة إلا عندما يُسلِّم اشتراك إلى Telegram أو Discord أو Slack أو قناة أخرى.',
    enable: 'تفعيل Webhooks',
    enabling: 'جارٍ التفعيل…',
    enabled: (name: string) => `تم التفعيل: «${name}»`,
    disabled: (name: string) => `تم التعطيل: «${name}»`,
    enableRow: 'تفعيل',
    disableRow: 'تعطيل',
    delete: 'حذف',
    deleting: 'جارٍ الحذف…',
    deleted: 'تم حذف Webhook',
    deleteTitle: 'حذف Webhook',
    deleteDescPrefix: 'سيؤدي هذا إلى الحذف النهائي لـ ',
    deleteDescSuffix: '. لا يمكن التراجع عن ذلك.',
    deleteFailed: (name: string) => `فشل حذف «${name}»`,
    toggleFailed: (name, enabled) => `فشل ${enabled ? 'تفعيل' : 'تعطيل'} «${name}»`,
    newSubscription: 'اشتراك جديد',
    restarting: 'جارٍ إعادة تشغيل البوابة…',
    restartNeeded:
      'تم تفعيل Webhooks، لكن البوابة ما زالت تحتاج إلى إعادة تشغيل قبل أن يتمكن المستقبِل من الاتصال.',
    restartGateway: 'إعادة تشغيل البوابة',
    restartingGateway: 'جارٍ إعادة التشغيل…',
    restartFailed: (detail: string) => `فشلت إعادة تشغيل البوابة${detail}`,
    enabledRestarting: 'تم تفعيل Webhooks؛ جارٍ إعادة تشغيل البوابة…',
    all: '(الكل)',
    deliverOnly: 'تسليم فقط',
    createdTitle: 'تم إنشاء الاشتراك',
    createdSecretHint: 'انسخ السر الآن — لن يظهر إلا مرة واحدة.',
    webhookUrl: 'URL الـ Webhook',
    secretOnce: 'السر (يظهر مرة واحدة)',
    done: 'تم',
    fieldName: 'الاسم',
    fieldNamePlaceholder: 'مثال: github-push',
    fieldDescription: 'الوصف',
    fieldDescriptionPlaceholder: 'ما يفعله هذا الـ Webhook (اختياري)',
    fieldEvents: 'الأحداث',
    fieldEventsPlaceholder: 'مفصولة بفواصل، اتركها فارغة للكل',
    fieldSkills: 'المهارات',
    fieldSkillsPlaceholder: 'أسماء مهارات مفصولة بفواصل (اختياري)',
    fieldDeliver: 'التسليم إلى',
    fieldDeliverOnly: 'تسليم الحمولة (payload) فقط',
    fieldPrompt: 'الطلب',
    fieldPromptPlaceholder: 'تعليمات للوكيل عند تشغيل هذا الـ Webhook (اختياري)',
    nameRequired: 'الاسم مطلوب',
    create: 'إنشاء',
    creating: 'جارٍ الإنشاء…',
    created: 'تم الإنشاء',
    createFailed: (detail: string) => `فشل الإنشاء: ${detail}`,
    copy: 'نسخ',
    deliverOptions: {
      log: 'السجل',
      telegram: 'Telegram',
      discord: 'Discord',
      slack: 'Slack',
      email: 'البريد الإلكتروني',
      github_comment: 'تعليق GitHub'
    }
  },
  profiles: {
    close: 'إغلاق ملفات التعريف',
    nameHint: 'أحرف إنجليزية صغيرة وأرقام وشرطات وشرطات سفلية. يجب أن يبدأ بحرف أو رقم.',
    title: 'ملفات التعريف',
    count: count => `${count} ${count === 1 ? 'ملف تعريف' : 'ملفات تعريف'}`,
    search: 'ابحث في ملفات التعريف…',
    loading: 'جارٍ تحميل ملفات التعريف…',
    newProfile: 'ملف تعريف جديد',
    importProfile: 'استيراد ملف تعريف…',
    exportProfile: 'تصدير ملف التعريف…',
    imported: 'تم استيراد ملف التعريف',
    exported: 'تم تصدير ملف التعريف',
    failedImport: 'فشل استيراد ملف التعريف',
    failedExport: 'فشل تصدير ملف التعريف',
    exportNeedsHost: name => `لا يستطيع المتصفح حفظ أرشيف ملف التعريف. على جهاز Hermes المضيف، شغّل: hermes profile export ${name}`,
    allProfiles: 'كل ملفات التعريف',
    showAllProfiles: 'عرض كل ملفات التعريف',
    notServedHere: 'غير متاح هنا',
    switchToProfile: name => `التبديل إلى ${name}`,
    switchToConnection: name => `التبديل إلى ${name}`,
    switchConnectionFailed: name => `تعذّر الاتصال بـ ${name}`,
    manageProfiles: 'إدارة ملفات التعريف…',
    connectGateway: 'ربط بوابة Hermes أخرى…',
    fleet: {
      allOnGateway: 'كل ملفات التعريف على هذه البوابة',
      gateway: gateway => `ملفات التعريف على ${gateway}`,
      gatewayUnreachable: gateway => `${gateway} · يتعذّر الوصول`,
      onGateway: (name, gateway) => `${name} · ${gateway}`,
      switchTo: (name, gateway) => `التبديل إلى ${name} على ${gateway}`,
      deleteOn: gateway => ` على ${gateway}`,
      localDevice: 'هذا الجهاز (خادم خلفي محلي — يثبّت Hermes إن لم يكن موجودًا، وإلا يفتح جلسة جديدة)',
      switchDeviceTitle: 'التبديل إلى هذا الجهاز؟',
      switchDeviceDesc:
        'سيفتح هذا جلسة جديدة على هذا الكمبيوتر. تبقى المحادثة الحالية على البوابة الأخرى.',
      switchDeviceConfirm: 'تبديل',
      installDeviceTitle: 'التبديل إلى هذا الجهاز؟',
      installDeviceDesc:
        'سيُثبَّت Hermes محليًا، ثم تُفتح جلسة جديدة على هذا الكمبيوتر. لن يُثبَّت شيء قبل تأكيدك.',
      installDeviceConfirm: 'تثبيت محليًا',
      connectExistingInstead: 'ربط تثبيت موجود بدلًا من ذلك'
    },
    status: {
      unread: (count: number) => (count === 1 ? 'جلسة واحدة غير مقروءة' : `${count} جلسات غير مقروءة`),
      needsInput: (count: number) =>
        count === 1 ? 'جلسة واحدة تنتظر ردّك' : `${count} جلسات تنتظر ردّك`,
      working: (count: number) => (count === 1 ? 'جلسة واحدة قيد العمل' : `${count} جلسات قيد العمل`)
    },
    remoteOverride: {
      menuItem: 'الاتصال بمضيف بعيد…',
      badge: (host: string) => `يعمل على ${host}`,
      title: (profile: string) => `ربط ${profile} بمضيف بعيد`,
      description:
        'ستعمل جلسات ملف التعريف هذا على نظام Hermes البعيد المحدد بدلًا من هذا الكمبيوتر.',
      urlLabel: 'العنوان البعيد',
      urlPlaceholder: 'https://hermes.example.com',
      urlInvalid: 'أدخل عنوانًا كاملًا يبدأ بـ http:// أو https://',
      tokenLabel: 'توكن الوصول',
      tokenPlaceholder: 'الصق توكن الجلسة البعيدة',
      tokenSavedHint: 'يوجد توكن محفوظ بالفعل. اترك هذا الحقل فارغًا للاحتفاظ به.',
      plainTextOptIn:
        'لا يوفّر هذا الكمبيوتر تخزينًا آمنًا للمفاتيح، لذا سيُحفظ التوكن على القرص دون تشفير. احفظه على أي حال.',
      collisionWarning: (label: string) =>
        `توجد بالفعل بوابة باسم «${label}» في الإعدادات. اتصال ملف التعريف هذا مستقل ولن يغيّرها.`,
      confirmTitle: 'ربط ملف التعريف هذا بمضيف بعيد؟',
      confirmNote: (profile: string, host: string) =>
        `ستعمل المحادثات الجديدة لـ ${profile} على ${host}. سيُنفّذ ذلك الكمبيوتر البعيد الأوامر ويقرأ الملفات الموجودة عليه، لا الموجودة على هذا الجهاز. لا تتصل إلا بمضيف موثوق.`,
      confirmBack: 'رجوع',
      connect: 'اتصال',
      connecting: 'جارٍ الاتصال…',
      disconnect: 'إزالة الاتصال البعيد',
      savedTitle: 'تم ربط ملف التعريف',
      savedMessage: (profile: string, host: string) => `${profile} يعمل الآن على ${host}`,
      removedTitle: 'تمت إزالة الاتصال البعيد',
      removedMessage: (profile: string) => `${profile} يعمل الآن على هذا الكمبيوتر`,
      removeFailed: 'تعذّرت إزالة الاتصال البعيد',
      authFailedTitle: 'رفض المضيف البعيد التوكن المحفوظ',
      authFailedMessage: (profile: string, host: string) =>
        `رفض ${host} التوكن المحفوظ لـ ${profile}. ربما تم تغييره على النظام البعيد.`,
      updateToken: 'إدخال توكن جديد…'
    },
    actions: 'الإجراءات',
    color: 'اللون…',
    colorFor: 'اللون',
    openInNewWindow: 'فتح في نافذة جديدة',
    setAsDefault: 'تعيين كافتراضي',
    defaultProfile: 'ملف التعريف الافتراضي',
    defaultSet: name => `أصبح ${name} ملف التعريف الافتراضي`,
    defaultDescription:
      'يُستخدم عند فتح Hermes وللمحادثات الجديدة. تبقى الجلسات الحالية في ملف التعريف الخاص بها.',
    failedSetDefault: 'تعذّر تعيين ملف التعريف الافتراضي',
    setColor: color => `تعيين اللون ${color}`,
    autoColor: 'تلقائي',
    noProfiles: 'لا توجد ملفات تعريف بعد.',
    selectPrompt: 'اختر ملف تعريف لعرض تفاصيله.',
    refresh: 'تحديث ملفات التعريف',
    refreshing: 'جارٍ تحديث ملفات التعريف',
    default: 'افتراضي',
    skills: count => `${count} ${count === 1 ? 'مهارة' : 'مهارات'}`,
    env: 'env',
    defaultBadge: 'افتراضي',
    rename: 'إعادة تسمية',
    renameMenu: 'إعادة تسمية…',
    exportMenu: 'تصدير',
    editSoul: 'تعديل SOUL.md…',
    copySetup: 'نسخ أمر الإعداد',
    copying: 'جارٍ النسخ…',
    modelLabel: 'النموذج',
    skillsLabel: 'المهارات',
    notSet: 'غير محدد',
    soulDesc: 'تعليمات النظام والشخصية المضمّنة في ملف التعريف هذا.',
    soulOptional: 'اختياري',
    soulPlaceholder: mode =>
      `تعليمات النظام / الشخصية لملف التعريف هذا.\nاتركه فارغًا للإبقاء على القيمة الافتراضية ${mode}.`,
    soulPlaceholderCloned: 'المنسوخة',
    soulPlaceholderEmpty: 'الفارغة',
    unsavedChanges: 'تغييرات غير محفوظة',
    loadingSoul: 'جارٍ تحميل SOUL.md…',
    emptySoul: 'SOUL.md فارغ — ابدأ بكتابة الشخصية…',
    saving: 'جارٍ الحفظ…',
    saveSoul: 'حفظ SOUL.md',
    deleteTitle: 'حذف ملف التعريف؟',
    deleteDescPrefix: 'سيؤدي هذا إلى حذف ',
    deleteDescMid: ' وإزالة مجلد ',
    deleteDescSuffix: ' الخاص به. لا يمكن التراجع عن ذلك.',
    deleting: 'جارٍ الحذف…',
    createDesc: 'ملفات التعريف بيئات Hermes مستقلة: تهيئة ومهارات وSOUL.md منفصلة.',
    nameLabel: 'الاسم',
    cloneFrom: 'نسخ من',
    cloneFromNone: 'لا شيء (فارغ)',
    cloneFromDesc: 'ينسخ التهيئة والمهارات وSOUL.md من ملف التعريف المصدر المحدد.',
    cloneFromDefault: 'نسخ من ملف التعريف الافتراضي',
    cloneFromDefaultDesc: 'انسخ التهيئة والمهارات وSOUL.md من ملف التعريف الافتراضي.',
    invalidName: hint => `اسم غير صالح. ${hint}`,
    nameRequired: 'الاسم مطلوب.',
    creating: 'جارٍ الإنشاء…',
    createAction: 'إنشاء ملف التعريف',
    renameTitle: 'إعادة تسمية ملف التعريف',
    renameDescPrefix: 'تُحدّث إعادة التسمية مجلد ملف التعريف وسكربتات التغليف في ',
    renameDescSuffix: '.',
    displayNameTitle: 'سمِّ هذا الوكيل',
    displayNameDesc:
      'يحدد الاسم المعروض في كل أنحاء التطبيق. يبقى المعرّف الداخلي لملف التعريف «default».',
    displayNameLabel: 'اسم العرض',
    newNameLabel: 'الاسم الجديد',
    renaming: 'جارٍ إعادة التسمية…',
    created: 'تم إنشاء ملف التعريف',
    renamed: 'تمت إعادة تسمية ملف التعريف',
    deleted: 'تم حذف ملف التعريف',
    setupCopied: 'تم نسخ أمر الإعداد',
    soulSaved: 'تم حفظ SOUL.md',
    failedLoad: 'فشل تحميل ملفات التعريف',
    failedDelete: 'فشل حذف ملف التعريف',
    failedCopy: 'فشل نسخ أمر الإعداد',
    failedLoadSoul: 'فشل تحميل SOUL.md',
    failedSaveSoul: 'فشل حفظ SOUL.md',
    failedCreate: 'فشل إنشاء ملف التعريف',
    failedRename: 'فشلت إعادة تسمية ملف التعريف'
  },
  modelAssignment: {
    saveFailed: 'لم يحفظ Hermes تغيير النموذج هذا.',
    confirmTitle: 'تحذير بشأن اختيار النموذج',
    confirmDetail: 'لا تؤكّد إلا إذا كنت تقبل هذه المقايضة.',
    confirmAction: 'تأكيد',
    declined:
      'تم إلغاء تغيير النموذج — لقد رفضت التحذير الخاص بمستوى التدريب على البيانات.'
  },
  cron: {
    close: 'إغلاق المهام المجدولة',
    title: 'المهام المجدولة',
    count: count => `${count} ${count === 1 ? 'مهمة' : 'مهام'}`,
    search: 'ابحث في مهام cron…',
    loading: 'جارٍ تحميل مهام cron…',
    states: {
      enabled: 'مفعّلة',
      scheduled: 'مجدولة',
      running: 'قيد التشغيل',
      paused: 'متوقفة مؤقتًا',
      disabled: 'معطّلة',
      error: 'خطأ',
      completed: 'مكتملة'
    },
    lastRunFailed: 'فشل آخر تشغيل:',
    editJob: 'تعديل المهمة',
    runAgain: 'تشغيل مرة أخرى',
    deliveryLabels: {
      local: 'سطح المكتب هذا',
      telegram: 'Telegram',
      discord: 'Discord',
      slack: 'Slack',
      email: 'البريد الإلكتروني'
    },
    scheduleLabels: {
      daily: 'يوميًا',
      weekdays: 'أيام العمل',
      weekly: 'أسبوعيًا',
      monthly: 'شهريًا',
      hourly: 'كل ساعة',
      'every-15-minutes': 'كل 15 دقيقة',
      custom: 'مخصص'
    },
    scheduleHints: {
      daily: 'كل يوم الساعة 9:00',
      weekdays: 'من الاثنين إلى الجمعة الساعة 9:00',
      weekly: 'كل اثنين الساعة 9:00',
      monthly: 'أول يوم من كل شهر الساعة 9:00',
      hourly: 'في بداية كل ساعة',
      'every-15-minutes': 'كل 15 دقيقة',
      custom: 'صيغة cron أو لغة طبيعية'
    },
    days: {
      '0': 'الأحد',
      '1': 'الاثنين',
      '2': 'الثلاثاء',
      '3': 'الأربعاء',
      '4': 'الخميس',
      '5': 'الجمعة',
      '6': 'السبت',
      '7': 'الأحد'
    },
    dayFallback: value => `اليوم ${value}`,
    everyDayAt: time => `كل يوم الساعة ${time}`,
    weekdaysAt: time => `أيام العمل الساعة ${time}`,
    everyDayOfWeekAt: (day, time) => `كل ${day} الساعة ${time}`,
    monthlyOnDayAt: (dayOfMonth, time) => `شهريًا في اليوم ${dayOfMonth} الساعة ${time}`,
    topOfHour: 'في بداية كل ساعة',
    everyHourAt: minute => `كل ساعة عند الدقيقة :${minute}`,
    newCron: 'مهمة مجدولة جديدة',
    emptyDescNew:
      'جدول طلبًا ليُنفَّذ وفق تعبير cron. سيشغّله Hermes ويسلّم النتائج إلى الوجهة التي تختارها.',
    emptyDescSearch: 'جرّب بحثًا أوسع.',
    emptyTitleNew: 'لا توجد مهام مجدولة بعد',
    emptyTitleSearch: 'لا توجد نتائج مطابقة',
    last: 'الأخير:',
    next: 'التالي:',
    overdueSince: 'متأخرة منذ:',
    noRuns: 'لا توجد عمليات تشغيل',
    queuedRun: 'تشغيل في قائمة الانتظار',
    manage: 'إدارة',
    showRuns: 'عرض عمليات التشغيل',
    hideRuns: 'إخفاء عمليات التشغيل',
    runHistory: 'سجل عمليات التشغيل',
    actionsTitle: 'إجراءات المهمة المجدولة',
    resume: 'استئناف المهمة',
    pause: 'إيقاف المهمة مؤقتًا',
    resumeTitle: 'استئناف',
    pauseTitle: 'إيقاف مؤقت',
    triggerNow: 'تشغيل الآن',
    edit: 'تعديل المهمة',
    deleteTitle: 'حذف المهمة المجدولة؟',
    deleteDescPrefix: 'سيؤدي هذا إلى حذف ',
    deleteDescSuffix: ' نهائيًا. ستتوقف عن العمل فورًا.',
    deleting: 'جارٍ الحذف…',
    resumed: 'تم استئناف المهمة',
    paused: 'تم إيقاف المهمة مؤقتًا',
    triggered: 'تم تشغيل المهمة',
    deleted: 'تم حذف المهمة',
    created: 'تم إنشاء المهمة',
    updated: 'تم تحديث المهمة',
    failedLoad: 'فشل تحميل مهام cron',
    failedUpdate: 'فشل تحديث المهمة المجدولة',
    failedTrigger: 'فشل تشغيل المهمة المجدولة',
    failedDelete: 'فشل حذف المهمة المجدولة',
    failedSave: 'فشل حفظ المهمة المجدولة',
    editTitle: 'تعديل المهمة المجدولة',
    createTitle: 'مهمة مجدولة جديدة',
    editDesc:
      'حدّث الجدول أو الطلب أو وجهة التسليم. تُطبَّق التغييرات في التشغيل التالي.',
    createDesc:
      'جدول طلبًا ليُنفَّذ تلقائيًا. استخدم صيغة cron أو عبارة طبيعية مثل «every 15 minutes». ',
    nameLabel: 'الاسم',
    namePlaceholder: 'ملخص الصباح',
    promptLabel: 'الطلب',
    scriptLabel: 'السكربت',
    scriptBadge: 'سكربت',
    promptPlaceholder: 'لخّص سلاسل Slack غير المقروءة وأرسل لي أهم 5 بالبريد الإلكتروني…',
    frequencyLabel: 'التكرار',
    deliverLabel: 'التسليم إلى',
    deliverNeedsHomeChannel: 'حدد قناة رئيسية أولًا',
    modelLabel: 'النموذج',
    modelDefault: 'الافتراضي (النموذج العام)',
    customScheduleLabel: 'جدول مخصص',
    customPlaceholder: '0 9 * * * أو weekdays at 9am',
    customHint: 'تعبير cron أو عبارات مثل «every hour» أو «weekdays at 9am». ',
    optional: 'اختياري',
    promptRequired: 'الطلب مطلوب.',
    promptScheduleRequired: 'الطلب والجدول مطلوبان.',
    scheduleRequired: 'الجدول مطلوب.',
    scriptOnlyEditHint: 'مهمة سكربت فقط (بدون طلب للذكاء الاصطناعي). معرّف المهمة:',
    saveChanges: 'حفظ التغييرات',
    createAction: 'إنشاء المهمة',
    tabs: {
      jobs: 'المهام',
      blueprints: 'القوالب'
    },
    blueprints: {
      tab: 'القوالب',
      startFrom: 'ابدأ من',
      custom: 'مخصص',
      subtitle: 'أتمتة جاهزة للاستخدام',
      dialogDesc: 'املأ التفاصيل وجدولها.',
      scheduleIt: 'جدولة',
      scheduling: 'جارٍ الجدولة…',
      scheduled: 'تمت جدولة القالب',
      loading: 'جارٍ تحميل القوالب…',
      failedLoad: 'فشل تحميل القوالب',
      emptyTitle: 'لا توجد قوالب متاحة',
      emptyDesc: 'لا توجد قوالب أتمتة متاحة على هذا الخادم الخلفي.'
    }
  },
  artifacts: {
    search: 'ابحث في المُخرَجات…',
    refresh: 'تحديث المُخرَجات',
    refreshing: 'جارٍ تحديث المُخرَجات',
    indexing: 'جارٍ فهرسة مُخرَجات الجلسات الأخيرة',
    tabAll: 'الكل',
    tabImages: 'الصور',
    tabFiles: 'الملفات',
    tabLinks: 'الروابط',
    noArtifactsTitle: 'لم يتم العثور على مُخرَجات',
    noArtifactsDesc:
      'ستظهر هنا الصور المُولَّدة ومخرجات الملفات كلما أنتجتها الجلسات.',
    failedLoad: 'فشل تحميل المُخرَجات',
    openFailed: 'فشل الفتح',
    itemsImage: 'صور',
    itemsLink: 'روابط',
    itemsFile: 'ملفات',
    itemsGeneric: 'عناصر',
    zero: '0',
    rangeOf: (start, end, total) => `${start}-${end} من ${total}`,
    goToPage: (itemLabel, page) => `الانتقال إلى ${itemLabel}، الصفحة ${page}`,
    colTitleLink: 'عنوان الرابط',
    colTitleFile: 'الاسم',
    colTitleDefault: 'العنوان / الاسم',
    colLocationLink: 'URL',
    colLocationFile: 'المسار',
    colLocationDefault: 'الموقع',
    colSession: 'الجلسة',
    kindImage: 'صورة',
    kindFile: 'ملف',
    kindLink: 'رابط',
    chat: 'المحادثة',
    copyUrl: 'نسخ URL',
    copyPath: 'نسخ المسار'
  },
  artifactCard: {
    kind: {
      code: 'كود',
      html: 'صفحة تفاعلية',
      svg: 'رسم'
    },
    generating: lines => `جارٍ التوليد… ${lines} سطر`,
    versionBadge: count => `${count} إصدارات`,
    open: 'فتح'
  },
  artifactPreview: {
    versionOf: (current, total) => `v${current} من ${total}`,
    olderVersion: 'الإصدار السابق',
    newerVersion: 'الإصدار التالي',
    latest: 'الأحدث',
    copyContent: 'نسخ المحتوى',
    download: 'تنزيل',
    openInBrowser: 'فتح في المتصفح',
    openInBrowserFailed: 'تعذّر الفتح في المتصفح',
    missingTitle: 'المُخرَج غير متاح',
    missingBody: 'لم يعد هذا المُخرَج موجودًا في السجل المحلي.'
  },
  sidebar: {
    filter: {
      grouping: 'التجميع',
      ordering: 'الترتيب',
      show: 'عرض',
      filters: 'عوامل التصفية',
      status: 'الحالة',
      pullRequest: 'Pull request',
      profile: 'ملف التعريف',
      project: 'المشروع',
      archived: 'المؤرشفة',
      resetToDefaults: 'استعادة الافتراضيات',
      expandAll: 'توسيع الكل',
      collapseAll: 'طيّ الكل',
      inboxStyle: 'نمط صندوق الوارد',
      updated: 'آخر تحديث',
      created: 'تاريخ الإنشاء',
      tokens: 'التوكنات',
      cost: 'التكلفة',
      manual: 'يدوي',
      preview: 'معاينة',
      pr: 'PR',
      needsInput: 'يحتاج إلى إجراء',
      working: 'قيد العمل',
      unread: 'غير مقروءة',
      draft: 'مسودة',
      idle: 'خاملة',
      open: 'مفتوح',
      merged: 'مدموج',
      closed: 'مغلق',
      noPR: 'بدون PR'
    },
    gatewayGroups: {
      grouping: 'البوابة وملف التعريف',
      rename: 'إعادة تسمية المجموعة',
      aliasLabel: 'اسم العرض',
      aliasHint: 'يتغيّر اسم العرض فقط؛ تبقى أسماء البوابة وملف التعريف كما هي.',
      resetName: 'استعادة الاسم',
      moveUp: 'نقل لأعلى',
      moveDown: 'نقل لأسفل',
      reorder: 'إعادة ترتيب المجموعة',
      actions: 'إجراءات المجموعة'
    },
    profileRail: 'شريط ملفات التعريف',
    nav: {
      'new-session': 'جلسة جديدة',
      capabilities: 'القدرات',
      messaging: 'المراسلة',
      artifacts: 'المُخرَجات',
      cron: 'المهام المجدولة'
    },
    searchAria: 'البحث في الجلسات',
    searchPlaceholder: 'ابحث في الجلسات…',
    clearSearch: 'مسح البحث',
    noMatch: query => `لا توجد جلسة تطابق «${query}».`,
    results: 'النتائج',
    pinned: 'المثبّتة',
    sessions: 'الجلسات',
    terminal: 'الطرفية',
    files: 'الملفات',
    review: 'المراجعة',
    logs: 'السجلات',
    cronJobs: 'مهام cron',
    groupAriaGrouped: 'عرض الجلسات في قائمة واحدة',
    groupAriaUngrouped: 'تجميع الجلسات حسب مساحة العمل',
    showProjects: 'عرض المشاريع',
    showSessions: 'عرض الجلسات',
    groupTitleGrouped: 'إلغاء تجميع الجلسات',
    groupTitleUngrouped: 'التجميع حسب مساحة العمل',
    allPinned: 'كل شيء مثبّت هنا. ألغِ تثبيت محادثة لتظهر في الأحدث.',
    shiftClickHint: 'Shift+نقر على محادثة لتثبيتها',
    noWorkspace: 'بدون مساحة عمل',
    projectEmpty: 'لا توجد جلسات بعد',
    projectLoadFailed: 'تعذّر تحميل الجلسات',
    noSessions: 'لا توجد جلسات بعد',
    storageCorrupt: {
      title: 'قاعدة بيانات الجلسات تالفة',
      body: (profiles: string) =>
        `لا يستطيع Hermes قراءة كل سجل الجلسات لـ ${profiles}. المحادثات غير الظاهرة في هذه القائمة لم تُحذف؛ الملف الذي يحتويها تالف.`,
      action: 'أغلق Hermes على ملف التعريف هذا، ثم افحص الملف دون تعديله، أو استعد لقطة سابقة:',
      guide: 'دليل الاستعادة'
    },
    noFilterMatches: 'لا توجد جلسات تطابق عوامل التصفية هذه',
    projects: arProjects,
    newSessionIn: label => `جلسة جديدة في ${label}`,
    showMoreIn: (count, label) => `عرض ${count} أخرى في ${label}`,
    loading: 'جارٍ التحميل…',
    loadMore: 'تحميل المزيد',
    loadCount: step => `تحميل ${step} أخرى`,
    messageCount: count => `${count} ${count === 1 ? 'رسالة' : 'رسائل'}`,
    toolCallCount: count => `${count} ${count === 1 ? 'استدعاء أداة' : 'استدعاءات أدوات'}`,
    row: {
      pin: 'تثبيت',
      unpin: 'إلغاء التثبيت',
      markUnread: 'تعليم كغير مقروءة',
      markRead: 'تعليم كمقروءة',
      unreadFailed: 'تعذّر تحديث حالة القراءة',
      copyId: 'نسخ المعرّف',
      export: 'تصدير',
      branchFrom: 'تفريع',
      rename: 'إعادة تسمية',
      archive: 'أرشفة',
      unarchive: 'استعادة',
      newWindow: 'نافذة جديدة',
      openInTerminal: 'فتح في الطرفية',
      hideTabBar: 'إخفاء شريط التبويبات',
      openInNewTab: 'فتح في تبويب جديد',
      openInSplit: 'فتح في عرض مقسوم',
      copyIdFailed: 'تعذّر نسخ معرّف الجلسة',
      sessionActions: 'إجراءات الجلسة',
      sessionRunning: 'الجلسة قيد التشغيل',
      needsInput: 'تحتاج إلى إدخالك',
      waitingForAnswer: 'في انتظار ردّك',
      finishedUnread: 'انتهت — غير مقروءة',
      backgroundRunning: 'مهمة في الخلفية قيد التشغيل',
      draftSession: 'مسودة — لم تُرسل أي رسالة',
      handoffOrigin: platform => `محوّلة من ${platform}`,
      continuationOrigin: 'متابعة تلقائية — تم ضغط هذه المحادثة ثم استكمالها',
      ownedByProfile: profile => `ملف التعريف: ${profile}`,
      renamed: 'تمت إعادة التسمية',
      renameFailed: 'فشلت إعادة التسمية',
      renameTitle: 'إعادة تسمية الجلسة',
      renameDesc: 'اتركه فارغًا للمسح.',
      untitledPlaceholder: 'جلسة بدون عنوان',
      deleteTitle: 'حذف الجلسة؟',
      deleteDesc: title => `سيتم حذف «${title}» نهائيًا. لا يمكن التراجع عن هذا الإجراء.`,
      deleting: 'جارٍ الحذف…',
      deleted: 'تم حذف الجلسة',
      untitledChat: id => `محادثة ${id}`,
      messageCount: count => `${count} ${count === 1 ? 'رسالة' : 'رسائل'}`,
      todoProgress: 'المهام المنجزة',
      ageNow: 'الآن',
      ageDay: 'ي',
      ageHour: 'س',
      ageMin: 'د'
    },
    dateDivider: {
      today: 'اليوم',
      yesterday: 'أمس',
      thisWeek: 'في وقت سابق من هذا الأسبوع',
      lastWeek: 'الأسبوع الماضي',
      thisMonth: 'في وقت سابق من هذا الشهر'
    },
    statusDivider: {
      working: 'قيد العمل',
      done: 'المنتهية'
    },
    markAllRead: 'تعليم الكل كمقروء'
  },
  composer: {
    message: 'رسالة',
    wakingProfile: profile => `جارٍ إيقاظ ${profile}…`,
    placeholderStarting: 'جارٍ تشغيل Hermes…',
    placeholderReconnecting: 'جارٍ إعادة الاتصال بـ Hermes…',
    placeholderFollowUp: 'أرسل متابعة',
    newSessionPlaceholders: [
      'على إيه هنشتغل النهارده؟',
      'أعطِ Hermes مهمة',
      'إيه اللي في بالك؟',
      'صِف ما تحتاج إليه',
      'يلا نبدأ بإيه؟',
      'اسأل أي سؤال',
      'ابدأ بهدف'
    ],
    followUpPlaceholders: [
      'أرسل متابعة',
      'أضف سياقًا',
      'حسّن الطلب',
      'وبعدين؟',
      'كمّل',
      'تعمّق أكثر',
      'عدّل أو كمّل'
    ],
    startVoice: 'بدء المحادثة الصوتية',
    openDirective: 'فتح',
    queueMessage: 'إضافة الرسالة إلى قائمة الانتظار',
    steer: 'توجيه التشغيل الحالي',
    redirect: 'إعادة توجيه التشغيل الحالي',
    stop: 'إيقاف',
    send: 'إرسال',
    speaking: 'يتحدث',
    transcribing: 'جارٍ التفريغ',
    thinking: 'يفكّر',
    muted: 'مكتوم',
    listening: 'يستمع',
    muteMic: 'كتم الميكروفون',
    unmuteMic: 'إلغاء كتم الميكروفون',
    stopListening: 'إيقاف الاستماع والإرسال',
    stopShort: 'إيقاف',
    endConversation: 'إنهاء المحادثة الصوتية',
    endShort: 'إنهاء',
    stopDictation: 'إيقاف الإملاء',
    transcribingDictation: 'جارٍ تفريغ الإملاء',
    voiceControls: 'الصوت',
    voiceEngine: 'محرّك المحادثة الصوتية',
    voiceEngineChained: 'التعرّف على الكلام + صوت Hermes',
    voiceEngineLive: 'GPT-Live (ثنائي الاتجاه بالكامل، يفوّض إلى Hermes)',
    voiceEngineLiveNeedsKey: 'يتطلب مفتاح API من OpenAI',
    voiceEngineChangeFailed: 'تعذّر تغيير محرّك المحادثة الصوتية',
    voiceEngineChainedShort: 'التعرّف على الكلام',
    voiceEngineLiveShort: 'GPT-Live',
    voiceDictation: 'الإملاء الصوتي',
    speakReplies: 'قراءة الردود بصوت عالٍ',
    stopSpeakingReplies: 'إيقاف قراءة الردود بصوت عالٍ',
    wakeWord: phrase => `كلمة التنبيه «${phrase}»`,
    wakeWordListening: phrase => `كلمة التنبيه: «${phrase}» — جارٍ الاستماع`,
    wakeWordOff: phrase => `كلمة التنبيه: «${phrase}» — معطّلة`,
    wakeWordPausedVoice: phrase => `كلمة التنبيه: «${phrase}» — متوقفة مؤقتًا أثناء المحادثة الصوتية`,
    lookupLoading: 'جارٍ البحث…',
    lookupNoMatches: 'لا توجد نتائج مطابقة.',
    lookupTry: 'جرّب',
    lookupOr: 'أو',
    commonCommands: 'الأوامر الشائعة',
    hotkeys: 'اختصارات لوحة المفاتيح',
    helpFooter: 'يفتح اللوحة الكاملة · امسح للإغلاق',
    commandDescs: {
      '/help': 'عرض الأوامر المائلة لسطح المكتب',
      '/clear': 'بدء جلسة جديدة',
      '/resume': 'استئناف جلسة محفوظة',
      '/details': 'التحكم في مستوى تفاصيل النص المسجّل',
      '/copy': 'نسخ التحديد أو آخر رسالة من المساعد',
      '/quit': 'الخروج من Hermes',
      '/start': 'الإقرار باستلام تنبيهات بدء المنصة دون رد',
      '/new': 'بدء محادثة جديدة',
      '/topic': 'تفعيل أو فحص الجلسات حسب الموضوع في رسائل Telegram الخاصة',
      '/save': 'حفظ النص المسجّل الحالي بصيغة JSON',
      '/retry': 'إعادة محاولة آخر رسالة (إعادة إرسالها إلى الوكيل)',
      '/prompt': 'اكتب طلبك التالي في $EDITOR (markdown)، ثم أرسله',
      '/undo': 'التراجع N أدوار للمستخدم وإعادة التشغيل (1 افتراضيًا)',
      '/title': 'إعادة تسمية الجلسة الحالية',
      '/handoff': 'تحويل هذه الجلسة إلى منصة مراسلة',
      '/branch': 'تفريع آخر رسالة إلى محادثة جديدة',
      '/worktree': 'عرض أو سرد أو إنشاء أو تنظيف أشجار عمل git (worktree) معزولة',
      '/compress': 'ضغط سياق هذه المحادثة',
      '/rollback':
        'سرد نقاط حفظ نظام الملفات أو استعادتها (الاستعادة تحتفظ بتعديلاتك اليدوية؛ --all يستبدلها)',
      '/export': 'تصدير ملف تعريف (التهيئة، المهارات، السمة) إلى أرشيف قابل للمشاركة',
      '/import': 'استيراد أرشيف ملف تعريف مشترك كملف تعريف جديد',
      '/stop': 'إيقاف الدور النشط والعمليات في الخلفية',
      '/pause': "إيقاف أي عمل جديد على مستوى النظام (إيقاف طارئ)؛ '/pause off' للاستئناف",
      '/bg': 'تشغيل طلب في جلسة خلفية منفصلة',
      '/btw': 'طرح سؤال جانبي عن هذه المحادثة دون مقاطعتها',
      '/agents': 'عرض الوكلاء النشطين والمهام الجارية',
      '/journey': 'فتح مخطط الذاكرة — المهارات والذكريات عبر الزمن',
      '/queue':
        'إضافة طلب إلى قائمة الانتظار للدور التالي، أو سرد/تعديل/حذف/نقل/مسح الطلبات في القائمة',
      '/steer': 'إدخال رسالة بعد استدعاء الأداة التالي دون مقاطعة',
      '/goal':
        'تحديد هدف دائم يعمل عليه Hermes عبر الأدوار حتى يتحقق',
      '/heartbeat': 'تحديد طلب متكرر يعود إلى هذه الجلسة عندما تكون خاملة',
      '/refine': 'مراجعة هذه المحادثة الآن وحفظ الدروس في الذاكرة/المهارات',
      '/review': 'تشغيل وكيل فرعي مستقل لمراجعة العمل الذي نوقش للتو (PR، كود، وثائق)',
      '/loop': 'إعادة تشغيل طلب على فترات منتظمة في هذه الجلسة',
      '/plan': 'كتابة خطة تنفيذ بصيغة markdown في .hermes/plans/ دون تنفيذ أي شيء',
      '/moa': 'تشغيل طلب بإعداد Mixture of Agents الافتراضي، ثم استعادة نموذجك',
      '/subgoal': 'إضافة أو إدارة معايير إضافية للهدف النشط',
      '/status': 'عرض حالة الجلسة الحالية',
      '/egress': 'عرض حالة وكيل الخروج (egress proxy) في Docker',
      '/context':
        'عرض تفاصيل نافذة السياق مع مقياس الاستخدام والتوزيع حسب الفئة وإحصاءات الضغط والإنتاجية',
      '/whoami': 'عرض صلاحية وصولك إلى الأوامر المائلة (مسؤول / مستخدم)',
      '/profile': 'تغيير ملف تعريف Hermes النشط',
      '/codex-runtime': 'تفعيل/تعطيل بيئة تشغيل codex app-server لنماذج OpenAI/Codex',
      '/personality': 'تعيين شخصية مُعدّة مسبقًا',
      '/battery': 'إظهار/إخفاء مؤشر بطارية ملوّن في شريط الحالة',
      '/timestamps': 'إظهار/إخفاء الطوابع الزمنية [HH:MM] على الرسائل و/history',
      '/diff': 'عرض تغييرات git في مجلد العمل',
      '/focus': 'تفعيل/تعطيل وضع التركيز — عرض طلبك والرد النهائي فقط',
      '/yolo': 'تفعيل/تعطيل YOLO — الموافقة التلقائية على الأوامر الخطرة',
      '/approvals': 'عرض أو تعيين وضع الموافقة الدائم للأوامر الخطرة',
      '/reasoning': 'جهد التفكير أو طريقة عرضه [<level> [--global]|show|hide|full|clamp]',
      '/skin': 'تغيير سمة سطح المكتب أو الانتقال إلى التالية',
      '/wake': 'التحكم في الاستماع لكلمة التنبيه على سطح المكتب [on|off|status]',
      '/tools': 'إدارة الأدوات: /tools [list|disable|enable] [name...]',
      '/memory': 'مراجعة كتابات الذاكرة المعلّقة / تفعيل أو تعطيل التحقق',
      '/bundles': 'سرد حِزم المهارات (اسم مستعار /<name> لعدة مهارات)',
      '/pet': 'إظهار/إخفاء أو تبنّي حيوان petdex أليف (/pet، /pet list، /pet boba)',
      '/hatch': 'توليد حيوان أليف جديد (يفتح المولّد)',
      '/learn':
        'تعلّم مهارة قابلة لإعادة الاستخدام مما تصفه (مجلدات، URL، هذه المحادثة، ملاحظات)',
      '/init': 'إنشاء أو تحديث تعليمات المشروع AGENTS.md بناءً على تحليل المستودع',
      '/suggestions': 'مراجعة الأتمتة المقترحة (قبول/تجاهل)',
      '/blueprint': 'إعداد أتمتة من قالب',
      '/browser': 'إدارة متصفح الوكيل [connect|disconnect|status]',
      '/palette': 'فتح لوحة الأوامر بالبحث التقريبي (أو Ctrl+P)',
      '/usage':
        'عرض استخدام التوكنات وحدود المعدّل؛ `reset` يستخدم إعادة تعيين حد Codex احتياطية',
      '/subscription': 'عرض خطة Nous الخاصة بك وتعديلها في المتصفح',
      '/topup': 'عرض رصيد Nous وإدارة الفوترة في البوابة',
      '/platform': 'إيقاف أو استئناف أو سرد منصة بوابة فاشلة',
      '/version': 'عرض إصدار Hermes Agent',
      '/debug': 'رفع تقرير تصحيح (معلومات النظام + السجلات) والحصول على روابط قابلة للمشاركة',
      '/model': 'تغيير نموذج هذه الجلسة'
    },
    hotkeyDescs: {
      'composer.mention': 'الإشارة إلى ملفات ومجلدات وURLs وgit',
      'composer.slash': 'لوحة الأوامر المائلة',
      'composer.help': 'مساعدة سريعة (امسح للإغلاق)',
      'composer.sendNewline': 'إرسال · Shift+Enter لسطر جديد',
      'composer.sendQueued': 'إرسال الدور التالي في قائمة الانتظار',
      'keybinds.openPanel': 'كل اختصارات لوحة المفاتيح',
      'composer.cancel': 'إغلاق النافذة المنبثقة · إلغاء التشغيل',
      'composer.history': 'التنقل في النافذة المنبثقة / السجل'
    },
    attachUrlTitle: 'إرفاق URL',
    attachUrlDesc: 'سيجلب Hermes الصفحة ويضمّنها كسياق لهذا الدور.',
    urlPlaceholder: 'https://example.com/post',
    urlHintPre: 'أدخل URL كاملًا، مثلًا ',
    attach: 'إرفاق',
    queued: count => `${count} في قائمة الانتظار`,
    queuedPaused: count => `${count} في قائمة الانتظار — متوقفة مؤقتًا`,
    attachmentOnly: 'دور يحتوي على مرفقات فقط',
    emptyTurn: 'دور فارغ',
    hiddenQueued: 'ملاحظة إعداد',
    attachments: count => `${count} ${count === 1 ? 'مرفق' : 'مرفقات'}`,
    editingInComposer: 'جارٍ التعديل في المحرّر',
    editingQueuedInComposer: 'جارٍ تعديل الدور المنتظر في المحرّر',
    restoredDraftNotice: 'تمت استعادة رسالتك غير المرسلة',
    restoredDraftUndo: 'تراجع',
    queueEdit: 'تعديل',
    queueExpand: 'توسيع',
    queueCollapse: 'طيّ',
    queueSendNext: 'التالي',
    queueSteer: 'توجيه — أعد توجيه الدور الحالي الآن',
    queueSend: 'إرسال',
    queueDelete: 'حذف',
    queueResume: 'استئناف',
    queueResumeTip: 'أُوقف مؤقتًا بزر الإيقاف — استأنف إرسال الأدوار في قائمة الانتظار',
    queueLostNote: 'فُقد الدور أثناء إعادة التشغيل',
    restoreImageDraft: 'استعادة مسودة الصورة',
    queueCancelFailed: 'تعذّرت إزالة الدور من قائمة الانتظار',
    queueLostDiscard: 'تجاهل',
    queueLostDiscardTip:
      'أُعيد تشغيل البوابة في منتصف الدور ولا يمكنها إكماله. تجاهله حتى تُنفَّذ الأدوار المنتظرة بعده.',
    queueStuckTitle: 'لم تُرسل الرسالة المنتظرة',
    queueStuckBody:
      'استمر فشل إرسال دور في قائمة الانتظار. ما زال في القائمة — حاول إرساله مرة أخرى.',
    queueDroppedTitle: 'تم إسقاط عنصر من قائمة الانتظار',
    queueDroppedBody:
      'تم إسقاط هذا الإدخال الخلفي لأن جلسته تعذّر استئنافها بعد عدة محاولات. باقي قائمة الانتظار لم يتغيّر.',
    previewUnavailable: 'المعاينة غير متاحة',
    previewLabel: label => `معاينة ${label}`,
    couldNotPreview: label => `تعذّرت معاينة ${label}`,
    removeAttachment: label => `إزالة ${label}`,
    dictating: 'جارٍ الإملاء',
    preparingAudio: 'جارٍ تجهيز الصوت',
    speakingResponse: 'جارٍ قراءة الرد',
    readingAloud: 'قراءة بصوت عالٍ',
    themeSuggestions: 'اقتراحات سمات سطح المكتب',
    noMatchingThemes: 'لا توجد سمات مطابقة.',
    themeTryPre: 'جرّب ',
    themeTryPost: '.',
    attachLabel: 'إرفاق',
    files: 'ملفات…',
    folder: 'مجلد…',
    images: 'صور…',
    pasteImage: 'لصق صورة',
    url: 'URL…',
    promptSnippets: 'مقتطفات الطلبات…',
    tipPre: 'نصيحة: اكتب ',
    tipPost: ' للإشارة إلى الملفات داخل النص.',
    snippetsTitle: 'مقتطفات الطلبات',
    snippetsDesc: 'اختر طلبًا جاهزًا لإدراجه في المحرّر.',
    dropFiles: 'أفلت الملفات لإرفاقها',
    dropSession: 'أفلت لربط هذه المحادثة',
    snippets: {
      codeReview: {
        label: 'مراجعة الكود',
        description:
          'تدقيق التغييرات الحالية بحثًا عن تراجعات وحالات حدّية فائتة واختبارات ناقصة.',
        text: 'راجع هذا بحثًا عن الأخطاء والتراجعات والاختبارات الناقصة.'
      },
      implementationPlan: {
        label: 'خطة التنفيذ',
        description: 'ضع منهجًا قبل لمس الكود حتى تبقى الفروقات مركّزة.',
        text: 'ضع خطة تنفيذ موجزة قبل تعديل الكود.'
      },
      explainThis: {
        label: 'اشرح هذا',
        description: 'اشرح طريقة عمل الكود المحدد واربط الملفات الرئيسية.',
        text: 'اشرح كيف يعمل هذا ودلّني على الملفات الرئيسية.'
      }
    }
  },
  statusStack: {
    hideStack: 'إخفاء مكدّس الحالة',
    showStack: 'إظهار مكدّس الحالة',
    agents: 'الوكلاء',
    background: count => `${count} في الخلفية`,
    goalActive: 'هدف نشط',
    goalBlocked: 'هدف متعثّر',
    goalDone: 'هدف مكتمل',
    goalPaused: 'هدف متوقف مؤقتًا',
    goalWaiting: 'هدف في الانتظار',
    subagents: count => `${count} ${count === 1 ? 'وكيل فرعي' : 'وكلاء فرعيون'}`,
    todos: (done, total) => `المهام ${done}/${total}`,
    previousTodos: (done, total) => `المهام السابقة ${done}/${total}`,
    running: 'قيد التشغيل',
    stop: 'إيقاف',
    dismiss: 'تجاهل',
    exit: code => `خروج ${code}`,
    control: {
      goalActiveTurns: (turn, maxTurns) => `الدور ${turn}/${maxTurns}`,
      goalDoneTurns: turns => `${turns} ${turns === 1 ? 'دور' : 'أدوار'}`,
      goalTurn: turn => `الدور ${turn}`,
      goalActions: 'إجراءات الهدف',
      viewDetails: 'عرض التفاصيل',
      addCriterion: 'إضافة معيار',
      addCriterionDialogTitle: 'إضافة معيار',
      addCriterionPlaceholder: 'أدخل المعيار…',
      criterionLabel: 'المعيار',
      pauseGoal: 'إيقاف الهدف مؤقتًا',
      resumeGoal: 'استئناف الهدف',
      resumeNow: 'استئناف الآن',
      clearGoal: 'حذف الهدف',
      clearGoalConfirmTitle: 'حذف الهدف؟',
      clearGoalConfirmBody: 'هل تريد بالتأكيد حذف الهدف النشط؟ لا يمكن التراجع عن هذا الإجراء.',
      copyCriterion: index => `نسخ المعيار ${index}`,
      removeCriterion: index => `حذف المعيار ${index}`,
      removeCriterionConfirmTitle: index => `حذف المعيار ${index}؟`,
      removeCriterionConfirmBody: index => `هل تريد بالتأكيد حذف المعيار ${index}؟`,
      clearCriteria: 'حذف كل المعايير',
      clearCriteriaConfirmTitle: 'حذف كل المعايير؟',
      clearCriteriaConfirmBody: 'هل تريد بالتأكيد حذف كل معايير هذا الهدف؟',
      criteriaHeader: count => `المعايير · ${count}`,
      noCriteria: 'لا توجد معايير',
      goalDetailsTitle: 'تفاصيل الهدف',
      objectiveLabel: 'الهدف',
      contractOutcome: 'النتيجة المتوقعة',
      contractVerification: 'التحقق',
      contractConstraints: 'القيود',
      contractBoundaries: 'الحدود',
      contractStopWhen: 'شرط التوقف',
      waitBarrierTitle: 'شرط الانتظار',
      waitUntil: target => `في الانتظار حتى ${target}`,
      waitSession: target => `في انتظار الجلسة ${target}`,
      waitPid: pid => `في انتظار العملية ${pid}`,
      qualityGatesTitle: 'فحوصات الجودة',
      gateCommand: 'الأمر',
      gateAttempts: (attempts, max) => `${attempts}/${max} محاولات`,
      gateTimeout: seconds => `المهلة القصوى: ${seconds} ث`,
      gateLastExit: code => (code === null ? 'في الانتظار' : `رمز الخروج: ${code}`),
      loopActive: 'حلقة نشطة',
      loopPaused: 'حلقة متوقفة مؤقتًا',
      loopDeferred: 'حلقة مؤجّلة',
      loopFinished: 'حلقة منتهية',
      loopRuns: runs => `${runs} ${runs === 1 ? 'تشغيل' : 'عمليات تشغيل'}`,
      loopRunCount: (current, total) => `التشغيل ${current}/${total}`,
      loopNext: time => `التالي: ${time}`,
      loopEverySeconds: seconds => `كل ${seconds} ث`,
      loopEveryMinutes: minutes => `كل ${minutes} د`,
      loopEveryHours: hours => `كل ${hours} س`,
      loopSelfPaced: 'إيقاع ذاتي',
      loopActions: 'إجراءات الحلقة',
      pauseLoop: 'إيقاف الحلقة مؤقتًا',
      resumeLoop: 'استئناف الحلقة',
      stopLoop: 'إيقاف الحلقة',
      stopLoopConfirmTitle: 'إيقاف الحلقة؟',
      stopLoopConfirmBody: 'هل تريد بالتأكيد إيقاف هذه الحلقة؟',
      dismissLoop: 'إخفاء الحلقة',
      loopPromptLabel: 'الطلب',
      loopCadenceLabel: 'التكرار',
      loopUntilLabel: 'شرط التوقف',
      loopDeferredNotice: 'يتحكم هدف نشط في الجلسة حاليًا.',
      loopAwaitingResponse: 'في انتظار رد',
      heartbeatActive: 'المتابعة الدورية نشطة',
      heartbeatPaused: 'المتابعة الدورية متوقفة مؤقتًا',
      heartbeatEveryMinutes: minutes => `كل ${minutes} د`,
      heartbeatEveryHours: hours => `كل ${hours} س`,
      heartbeatEverySeconds: seconds => `كل ${seconds} ث`,
      heartbeatNext: time => `التالي: ${time}`,
      dueWaitingForIdle: 'مستحق — في انتظار التفرّغ',
      heartbeatActions: 'إجراءات المتابعة الدورية',
      pauseHeartbeat: 'إيقاف المتابعة مؤقتًا',
      resumeHeartbeat: 'استئناف المتابعة',
      clearHeartbeat: 'حذف المتابعة',
      clearHeartbeatConfirmTitle: 'حذف المتابعة الدورية؟',
      clearHeartbeatConfirmBody: 'هل تريد بالتأكيد حذف هذه المتابعة الدورية؟',
      heartbeatFiredCount: count => `تم التشغيل ${count} مرة`,
      actionFailed: msg => `فشل الإجراء: ${msg}`,
      actionSucceeded: 'نجح الإجراء',
      copySuccess: 'تم نسخ المعيار إلى الحافظة',
      copyFailure: 'تعذّر نسخ المعيار إلى الحافظة',
      continuationFailed: 'تعذّر إرسال متابعة الهدف',
      continuationQueued: 'تم استئناف الهدف — المتابعة في انتظار انتهاء الدور الحالي',
      continuationBusy:
        'تم استئناف الهدف — الجلسة مشغولة، أوقف الرد الحالي أولًا (زر الإيقاف أو Esc) للمتابعة',
      controlUnavailable: msg => `أدوات التحكم في الجلسة غير متاحة: ${msg}`,
      dismissError: 'إخفاء الخطأ',
      add: 'إضافة'
    },
    coding: {
      title: 'شجرة العمل',
      noBranch: 'بدون فرع',
      detached: 'منفصل',
      clean: 'نظيف',
      changed: count => `${count} ${count === 1 ? 'معدّل' : 'معدّلة'}`,
      ahead: count => `متقدم بـ ${count}`,
      behind: count => `متأخر بـ ${count}`,
      review: 'مراجعة',
      close: 'إغلاق',
      openChanges: 'فتح التغييرات',
      openFile: 'فتح الملف',
      stage: 'إضافة إلى منطقة التجهيز',
      unstage: 'إزالة من منطقة التجهيز',
      stageAll: 'إضافة الكل إلى منطقة التجهيز',
      viewAsTree: 'عرض كشجرة',
      viewAsList: 'عرض كقائمة',
      revert: 'تراجع',
      revertAll: 'التراجع عن الكل',
      revertConfirm:
        'تجاهل تغييرات هذا الملف وإعادته إلى الحالة المعتمدة؟ لا يمكن التراجع عن ذلك.',
      revertAllConfirm:
        'تجاهل كل التغييرات وإعادة الملفات إلى الحالة المعتمدة؟ لا يمكن التراجع عن ذلك.',
      staged: 'في منطقة التجهيز',
      noChanges: 'لا توجد تغييرات',
      notRepo: 'ليس مستودع git',
      noDiff: 'لا توجد فروقات لعرضها',
      scopeUncommitted: 'غير معتمدة',
      scopeBranch: 'الفرع',
      scopeLastTurn: 'آخر دور',
      commit: 'Commit',
      commitAndPush: 'Commit ودفع',
      commitPlaceholder: shortcut => `الرسالة (${shortcut} للاعتماد)`,
      generateCommitMessage: 'توليد رسالة Commit',
      stopGenerating: 'إيقاف التوليد',
      createPr: 'إنشاء PR',
      openPr: 'فتح PR',
      ghMissing: 'ثبّت GitHub CLI (gh) وسجّل الدخول لفتح طلبات PR',
      agentShip: 'اطلب من Hermes فتح PR',
      agentShipUnavailable: 'المحادثة التي أنتجت هذه التغييرات غير معروضة.',
      agentShipPrompt:
        'راجع التغييرات الحالية، واعتمدها برسالة commit تقليدية واضحة، وادفع الفرع، ثم افتح pull request.',
      newBranch: 'فرع جديد',
      branchOffFrom: base => `فرع جديد من ${base}`,
      switchTo: branch => `التبديل إلى ${branch}`,
      switchFailed: branch => `تعذّر التبديل إلى ${branch}`,
      worktrees: 'أشجار العمل (Worktrees)'
    }
  },
  updates: {
    discontinuedTitle: 'إصدار Hermes هذا لم يعد مدعومًا',
    discontinuedBody:
      'إصدار Hermes هذا لم يعد مدعومًا وقد يتوقف عن العمل — أزل تثبيته. تبقى بياناتك على القرص.',
    channels: { stable: 'مستقر', canary: 'Canary' },
    appName: 'Hermes',
    availableBodyRelease: tag => `الإصدار ${tag} جاهز للتثبيت.`,
    releaseAvailable: tag => `الإصدار ${tag} متاح.`,
    checkingShort: 'جارٍ التحقق…',
    availableBodyAppInstaller:
      'إصدار جديد من Hermes جاهز. سيُغلق Hermes، وسيُكمل Windows التحديث، ثم يُعاد فتح Hermes تلقائيًا.',
    applyingBodyAppInstaller:
      'سيُغلق Hermes وسيُكمل Windows التحديث. بعدها يُعاد فتح Hermes تلقائيًا — لا تحتاج إلى فعل أي شيء.',
    applyingCloseAppInstaller:
      'ستُغلق هذه النافذة، وسيُكمل Windows التحديث، ثم يُعاد فتح Hermes تلقائيًا.',
    checkUnknownTitleAppInstaller: 'تعذّر التحقق من التحديثات',
    checkUnknownBodyAppInstaller:
      'تعذّر على Windows البحث عن التحديثات. تُثبَّت التحديثات أيضًا تلقائيًا عند إعادة تشغيل Hermes.',
    versionDetailsTitle: 'تفاصيل الإصدار',
    versionDetailsBody:
      'يُدار هذا التثبيت من خارج التطبيق. حدّثه بالطريقة نفسها التي ثبّته بها.',
    versionDetailsVersion: 'الإصدار',
    versionDetailsClient: 'هذا الجهاز',
    versionDetailsBackend: 'الخادم الخلفي المتصل',
    versionDetailsCommit: 'Commit',
    versionDetailsBuildOrigin: 'مصدر البناء',
    versionDetailsDistribution: 'التوزيعة',
    versionDetailsDistributionDesktop: 'تطبيق سطح المكتب',
    versionDetailsDistributionDesktopMsix: 'تطبيق سطح المكتب (MSIX)',
    versionDetailsDistributionDesktopInstaller: 'تطبيق سطح المكتب (المثبّت)',
    versionDetailsDistributionSourceInstaller: 'الكود المصدري (سكربت التثبيت)',
    versionDetailsDistributionSourceInstallerDesktop: 'الكود المصدري (سكربت التثبيت) + hermes desktop',
    versionDetailsDistributionSource: 'الكود المصدري',
    versionDetailsDistributionSourceDesktop: 'الكود المصدري + hermes desktop',
    versionDetailsDistributionStore: 'Microsoft Store',
    versionDetailsRuntime: 'بيئة التشغيل',
    versionDetailsRuntimeEmbedded: 'بيئة تشغيل مدمجة',
    versionDetailsRuntimeExternal: 'خارجية (تستخدم بيئة تشغيل النظام)',
    versionDetailsInstallId: 'معرّف التثبيت',
    versionDetailsUncommittedChanges: 'تغييرات غير معتمدة',
    version: value => `الإصدار ${value}`,
    versionUnavailable: 'الإصدار غير متاح',
    bundleOutOfSync: 'إصدار التطبيق قديم',
    bundleOutOfSyncDesc:
      'تم تحديث بيئة تشغيل Hermes، لكن تطبيق سطح المكتب ما زال يستخدم إصدارًا قديمًا. ستبقى ميزات الواجهة الجديدة، مثل وضع البوت، غير متاحة حتى يتم تحديثه. شغّل التحديث بالأسفل لإعادة بناء التطبيق. إذا استمر هذا التحذير، أعد تثبيته بأحدث مثبّت لسطح المكتب.',
    bundleOutOfSyncAction: 'الحصول على المثبّت',
    bundleSwapPending: 'أعد التشغيل لإكمال التحديث',
    bundleSwapPendingDesc:
      'التطبيق المحدّث مثبّت بالفعل — يحتاج Hermes فقط إلى إعادة التشغيل لتحميله. محادثاتك وإعداداتك محفوظة.',
    bundleSwapPendingAction: 'إعادة تشغيل Hermes',
    checkNow: 'تحقّق الآن',
    seeWhatsNew: 'عرض الجديد',
    releaseNotes: 'ملاحظات الإصدار',
    onLatest: 'أنت تستخدم أحدث إصدار.',
    installing: 'جارٍ تثبيت تحديث.',
    cantReach: 'تعذّر الوصول إلى خادم التحديثات.',
    tapCheck: 'انقر «تحقّق الآن» للبحث عن تحديثات.',
    updateReady: count => `تحديث جديد جاهز (يتضمن ${count} ${count === 1 ? 'تغييرًا' : 'تغييرات'}).`,
    updateReadyUnknown: 'تحديث جديد جاهز.',
    lastChecked: age => `آخر تحقق ${age}`,
    justNowSuffix: ' · الآن',
    never: 'أبدًا',
    justNow: 'الآن',
    minAgo: count => `منذ ${count} د`,
    hoursAgo: count => `منذ ${count} س`,
    daysAgo: count => `منذ ${count} ي`,
    stages: {
      idle: 'جارٍ التجهيز…',
      prepare: 'جارٍ التجهيز…',
      fetch: 'جارٍ التنزيل…',
      pull: 'قربنا نخلص…',
      pydeps: 'جارٍ الإنهاء…',
      update: 'جارٍ تحديث Hermes…',
      rebuild: 'جارٍ إعادة بناء تطبيق سطح المكتب…',
      restart: 'جارٍ إعادة تشغيل Hermes…',
      done: 'اكتمل التحديث',
      manual: 'التحديث من الطرفية',
      guiSkew: 'تحديث تطبيق سطح المكتب',
      error: 'التحديث متوقف مؤقتًا'
    },
    checking: 'جارٍ البحث عن تحديثات…',
    checkFailedTitle: 'تعذّر التحقق من التحديثات',
    tryAgain: 'إعادة المحاولة',
    notAvailableTitle: 'التحديث غير متاح',
    unsupportedMessage: 'لا يمكن لإصدار Hermes هذا التحديث من داخل التطبيق.',
    connectionRetry: 'تحقّق من اتصالك ثم حاول مرة أخرى.',
    gitUnusable: 'تعذّر على Hermes تشغيل Git على هذا الكمبيوتر، لذا لم يتمكن من البحث عن تحديثات.',
    connectionSettings: 'إعدادات الاتصال',
    openDownloadPage: 'فتح صفحة التنزيل',
    latestBody: 'أنت تستخدم أحدث إصدار.',
    latestBodyBackend: 'الخادم الخلفي يستخدم أحدث إصدار.',
    allSetTitle: 'كله تمام',
    availableTitle: 'تحديث جديد متاح',
    availableBody: 'إصدار جديد من Hermes جاهز للتثبيت.',
    availableTitleBackend: 'تحديث للخادم الخلفي متاح',
    availableBodyBackend: 'إصدار أحدث من خادم Hermes الخلفي المتصل جاهز للتثبيت.',
    availableBodyNoChangelog:
      'إصدار أحدث جاهز. ملاحظات الإصدار غير متاحة لهذا النوع من التثبيت.',
    updateNow: 'التحديث الآن',
    maybeLater: 'ربما لاحقًا',
    moreChanges: count =>
      `+ ${count} ${count === 1 ? 'تغيير إضافي مضمّن' : 'تغييرات إضافية مضمّنة'}.`,
    copyFullLog: 'نسخ سجل التغييرات كاملًا',
    manualTitle: 'التحديث من الطرفية',
    manualUnavailableTitle: 'لا يمكن التحديث هنا',
    manualBody:
      'لقد ثبّت Hermes من سطر الأوامر، لذا تتم التحديثات من هناك أيضًا. الصق هذا في الطرفية:',
    manualPickedUp: 'سيستخدم Hermes الإصدار الجديد عند التشغيل التالي.',
    manualBodyBackend:
      'يُدار خادم Hermes الخلفي من خارج هذا التطبيق. شغّل هذا على الخادم الذي يستضيفه:',
    manualPickedUpBackend: 'سيحمّل الخادم الخلفي الإصدار الجديد بعد اكتمال التحديث.',
    guiSkewTitle: 'تحديث تطبيق سطح المكتب',
    guiSkewBody:
      'تم تحديث الخادم الخلفي، لكن حزمة تطبيق سطح المكتب هذه لم تُحدَّث. حدّث أو أعد تثبيت تطبيق Hermes لسطح المكتب (AppImage / .deb / .rpm) ليتطابق معه.',
    copy: 'نسخ',
    copied: 'تم النسخ',
    done: 'تم',
    applyingBody:
      'يتولى برنامج تحديث Hermes العمل في نافذته الخاصة ويعيد فتح Hermes تلقائيًا عند الانتهاء. لا تُعِد فتح Hermes بنفسك أثناء التحديث.',
    applyingBodyBackend:
      'يطبّق الخادم الخلفي البعيد التحديث وسيُعاد تشغيله. سيُعيد Hermes الاتصال تلقائيًا عند عودته.',
    applyingClose: 'ستُغلق هذه النافذة أثناء التحديث، ثم يُعاد فتح Hermes تلقائيًا.',
    errorTitle: 'لم يكتمل التحديث',
    errorBody: 'ولا يهمك — لم يضِع أي شيء. يمكنك المحاولة مرة أخرى الآن.',
    blockerTitle: 'إغلاق المعاينات المحلية لتحديث Hermes؟',
    blockerBody:
      'يحتاج Hermes إلى إيقاف هذه المعاينات المحلية قبل التحديث. لن يتم تعديل أو حذف أي من ملفاتك.',
    foreignBlockerTitle: 'أغلق العمليات الأخرى لتحديث Hermes',
    foreignBlockerBody:
      'لا يستطيع Hermes إغلاق هذه العمليات تلقائيًا بأمان. أغلق التطبيق أو الطرفية أو الخدمة التي تملك كلًا منها، ثم أعد تشغيل التحديث.',
    mixedBlockerBody:
      'يمكن لـ Hermes إغلاق المعاينات المحلية أدناه. يجب إغلاق العمليات الأخرى يدويًا قبل متابعة التحديث.',
    closePreviewsAndUpdate: 'إغلاق المعاينات والتحديث',
    closePreviewsAndCheckAgain: 'إغلاق المعاينات وإعادة التحقق',
    localPreview: 'معاينة محلية',
    portLabel: port => `المنفذ ${port}`,
    pidLabel: pid => `PID ${pid}`,
    technicalDetails: 'التفاصيل التقنية',
    notNow: 'ليس الآن',
    clientAlsoBehindTitle: 'تطبيق سطح المكتب غير محدّث',
    clientAlsoBehindMessage:
      'الخادم الخلفي محدّث، لكن تطبيق سطح المكتب هذا ما زال يستخدم إصدارًا قديمًا. حدّثه للاستفادة من أحدث الإصلاحات.',
    clientAlsoBehindAction: 'تحديث تطبيق سطح المكتب',
    everythingDispatched: 'تم إرسال التحديث',
    everythingSkipped: 'تم التخطي',
    everythingRowFailed: 'فشل التحديث',
    everythingFanoutFailedTitle: 'تعذّر تحديث النسخ الأخرى',
    changeLogNew: 'الجديد',
    changeLogFixed: 'تم إصلاحه',
    changeLogFaster: 'أسرع',
    changeLogImproved: 'تم تحسينه',
    changeLogOther: 'تحسينات أخرى',
    changeLogFallbackLabel: 'في هذا التحديث',
    changeLogFallbackItem: 'تحسينات وإصلاحات',
    applyStatus: {
      preparing: 'جارٍ تحديث الخادم الخلفي…',
      pulling: 'جارٍ تحديث الخادم الخلفي…',
      restarting: 'جارٍ إعادة تشغيل الخادم الخلفي لتحميل التحديث…',
      notAvailable: 'التحديث غير متاح لهذا الخادم الخلفي.',
      failed: 'فشل تحديث الخادم الخلفي.',
      noReturn:
        'لم يُعِد الخادم الخلفي الاتصال. ربما لم يكتمل التحديث — تحقّق من مضيف الخادم الخلفي.'
    }
  },
  install: {
    stageStates: {
      pending: 'في الانتظار',
      running: 'جارٍ التثبيت',
      succeeded: 'تم',
      skipped: 'تم التخطي',
      failed: 'فشل'
    },
    oneTimeTitle: 'يحتاج Hermes إلى تثبيت لمرة واحدة',
    unsupportedDesc: platform =>
      `التثبيت التلقائي عند أول تشغيل غير متاح بعد على ${platform}. افتح الطرفية وشغّل الأمر أدناه، ثم أعد تشغيل هذا التطبيق. ستتخطى مرات التشغيل التالية هذه الخطوة.`,
    installCommand: 'أمر التثبيت',
    copyCommand: 'نسخ الأمر',
    viewDocs: 'عرض وثائق التثبيت',
    installTo: 'سيُثبَّت في',
    retryAfterRun: 'شغّلته — أعد المحاولة',
    setupChoiceTitle: 'إعداد Hermes Desktop',
    setupChoiceDesc:
      'اربط هذا التطبيق ببوابة Hermes تشغّلها بالفعل، أو ثبّت Hermes محليًا على هذا الكمبيوتر.',
    connectExistingTitle: 'الاتصال بـ Hermes موجود',
    connectExistingShort: 'ربط تثبيت موجود',
    connectExistingDesc:
      'استخدم خادمًا خلفيًا بعيدًا بتوكن جلسة أو بتسجيل دخول عبر المتصفح. لن يبدأ أي تثبيت محلي.',
    installLocalTitle: 'تثبيت Hermes محليًا',
    installLocalDesc: 'نزّل Hermes، وأنشئ بيئة Python الخاصة به، وشغّل الخادم الخلفي على هذا الكمبيوتر.',
    localStartUnavailable: 'تعذّر بدء التثبيت المحلي. أعد تشغيل Hermes Desktop وحاول مرة أخرى.',
    remoteSetupTitle: 'الاتصال بـ Hermes موجود',
    remoteSetupDesc:
      'أدخل URL البوابة. سيكتشف Hermes Desktop ما إذا كان يحتاج إلى توكن أو تسجيل دخول عبر المتصفح.',
    remoteUrlTitle: 'URL البوابة',
    remoteUrlDesc: 'استخدم URL الأساسي لبوابة Hermes، مع https:// للاتصالات البعيدة.',
    remoteUrlPlaceholder: 'https://gateway.example.com/hermes',
    probing: 'جارٍ اكتشاف طريقة مصادقة البوابة…',
    probeError: 'تعذّر الوصول إلى بوابة Hermes هذه.',
    probeErrorDetails: 'التفاصيل',
    identityProvider: 'مزوّد الهوية الخاص بك',
    authTitle: 'المصادقة',
    authNeedsOauth: provider => `سجّل الدخول عبر ${provider} قبل اختبار هذه البوابة.`,
    authSignedIn: 'اكتمل تسجيل الدخول عبر المتصفح.',
    connected: 'متصل',
    signIn: 'تسجيل الدخول',
    signInWith: provider => `تسجيل الدخول عبر ${provider}`,
    enterUrlFirst: 'أدخل URL البوابة أولًا.',
    signInIncomplete: 'أُغلقت نافذة تسجيل الدخول قبل اكتمال المصادقة.',
    tokenTitle: 'توكن الجلسة',
    tokenDesc: 'الصق توكن الجلسة من ملف .env الخاص بالبوابة البعيدة.',
    pasteSessionToken: 'الصق توكن الجلسة',
    incompleteSignInTest: 'سجّل الدخول قبل اختبار هذه البوابة المحمية بـ OAuth.',
    incompleteTokenTest: 'أدخل توكن جلسة قبل اختبار هذه البوابة.',
    testConnection: 'اختبار الاتصال',
    testSucceeded: (baseUrl, version) => `تم الاتصال بـ ${baseUrl}${version ? ` (${version})` : ''}.`,
    applyRemote: 'تطبيق وإعادة الاتصال',
    backToSetup: 'رجوع',
    failedTitle: 'فشل التثبيت',
    settingUpTitle: 'جارٍ إعداد Hermes Agent',
    finishingTitle: 'جارٍ الإنهاء',
    failedDesc:
      'فشلت إحدى خطوات التثبيت. على Windows، قد يحدث ذلك إذا كانت نسخة أخرى من Hermes CLI أو سطح المكتب تعمل. أوقف كل نسخ Hermes العاملة، ثم حاول مرة أخرى. راجع التفاصيل أدناه أو سجل سطح المكتب للاطلاع على النص الكامل.',
    activeDesc:
      'هذا إعداد لمرة واحدة. يقوم مثبّت Hermes بتنزيل الاعتماديات وتهيئة جهازك. ستتخطى مرات التشغيل التالية هذه الخطوة.',
    progress: (completed, total) => `اكتملت ${completed} من ${total} خطوات`,
    currentStage: stage => ` -- حاليًا: ${stage}`,
    fetchingManifest: 'جارٍ جلب بيان التثبيت…',
    error: 'خطأ',
    hideOutput: 'إخفاء مخرجات المثبّت',
    showOutput: 'إظهار مخرجات المثبّت',
    lines: count => `${count} ${count === 1 ? 'سطر' : 'أسطر'}`,
    noOutput: 'لا توجد مخرجات بعد.',
    cancelling: 'جارٍ الإلغاء…',
    cancelInstall: 'إلغاء التثبيت',
    transcriptSaved: 'تم حفظ النص الكامل في',
    copiedOutput: 'تم النسخ!',
    copyOutput: 'نسخ المخرجات',
    reloadRetry: 'إعادة التحميل والمحاولة',
    openLogs: 'فتح السجلات'
  },
  onboarding: arOnboarding,
  freeTier: {
    providerRowTitle: 'Nous · الخطة المجانية',
    providerRowPitch: 'سجّل الدخول بحساب Nous لفتح المزيد من النماذج والأدوات.',
    readyTitle: 'Hermes جاهز.',
    readyCaption: 'مجاني · الموصّلات مضمّنة',
    begin: 'ابدأ',
    signInInstead: 'تسجيل الدخول بحساب Nous بدلًا من ذلك',
    otherProviders: 'مزوّدون آخرون',
    stripTitle: 'استدلال Nous المجاني والموصّلات متاحة الآن.',
    stripBody: 'افتح منتقي النماذج لتجربتها أو سجّل الدخول بحساب Nous.',
    openModelPicker: 'فتح منتقي النماذج',
    dismiss: 'إغلاق',
    providerName: 'Nous',
    statusLabel: model => `Nous · ${model}`,
    signIn: 'تسجيل الدخول',
    signInHeading: 'سجّل الدخول بحساب Nous لفتح المزيد من النماذج والأدوات.',
    settingUp: 'جارٍ إعداد الاستدلال المجاني…',
    finishInBrowser: 'أكمل في المتصفح',
    doNotShare: 'لا تشارك هذا الرمز.',
    openPageAgain: 'إعادة فتح الصفحة',
    waiting: 'في انتظار تسجيل الدخول…',
    finishingHeading: 'جارٍ إكمال تسجيل الدخول…',
    finishingBody: 'تم منح الإذن في المتصفح. جارٍ جلب توكنات حسابك.',
    signedInAsLabel: 'مسجّل الدخول باسم',
    signedIn: 'تم تسجيل الدخول.',
    completedBody: 'يتيح حسابك الآن الوصول إلى الاستدلال والأدوات.',
    reconnect: 'إعادة الاتصال',
    openConnectors: 'فتح الموصّلات',
    defaultModel: 'النموذج الافتراضي',
    change: 'تغيير',
    done: 'تم',
    notNow: 'ليس الآن',
    tryAgain: 'إعادة المحاولة',
    didNotComplete: 'لم يكتمل تسجيل الدخول',
    timedOutHeading: 'انتهت مهلة تسجيل الدخول',
    timedOutBody: 'لم يُستخدم الرمز في الوقت المحدد. ما زلت على الخطة المجانية.',
    errorBody: 'لم يكتمل تسجيل الدخول؛ أعد المحاولة.',
    busyHeading: 'قربنا نخلص',
    busyBody: wait =>
      `تعذّر على Hermes إكمال تسجيل دخولك لأن خدمة Nous مشغولة. حاول مرة أخرى خلال ${wait}. تبقى جلستك متاحة في هذه الأثناء.`,
    unreachableBody:
      'تعذّر على Hermes الوصول إلى خدمة Nous لإكمال تسجيل دخولك. تحقّق من اتصالك بالإنترنت ثم حاول مرة أخرى. تبقى جلستك متاحة.',
    alreadySignedInHeading: 'مسجّل الدخول بالفعل.',
    alreadySignedInBody: 'تثبيت Hermes هذا متصل بالفعل بحساب Nous.',
    offer: {
      heading: 'تابع مع Hermes',
      body: 'أنت تستخدم الحصة المجانية. إذا واصلت استخدام Hermes فستبدأ في الوصول إلى الحدود. سجّل الدخول بحساب Nous مجاني للحصول على حصة أكبر.',
      signIn: 'تسجيل الدخول',
      notNow: 'ليس الآن'
    },
    setupFailed: {
      gateClosed:
        'لا يمكن لإصدار Hermes هذا البدء دون حساب Nous. سجّل الدخول أو أنشئ حسابًا مجانًا في دقيقة.',
      paused:
        'استخدام Hermes دون تسجيل دخول معلّق مؤقتًا. سيواصل Hermes التحقق. تسجيل الدخول مجاني ويتيح لك المتابعة فورًا.',
      rateLimited: wait =>
        `يبدأ كثير من الأشخاص الآن؛ سيعيد Hermes المحاولة خلال ${wait}. تسجيل الدخول مجاني ويوفّر عليك الانتظار.`,
      unreachable:
        'تعذّر على Hermes الوصول إلى خدمة Nous. تحقّق من اتصالك بالإنترنت، ثم اضغط إعادة المحاولة. يمكنك أيضًا ربط مزوّد آخر.',
      serverError:
        'واجهت خدمة Nous مشكلة. حاول مرة أخرى بعد قليل أو اربط مزوّدًا آخر.',
      powRequired:
        'طلب خادم Nous إثبات عمل (proof of work) غير مدعوم بعد في الوكيل الخاص بك. سجّل الدخول أو أنشئ حساب Nous مجانيًا للمتابعة.',
      locked:
        'لا يمكن لهذه الجلسة المتابعة دون تسجيل الدخول. سجّل الدخول أو أنشئ حساب Nous مجانيًا للاستمرار.',
      generic:
        'تعذّر على Hermes إعداد الوصول المجاني دون تسجيل دخول. سجّل الدخول مجانًا أو اختر مزوّدًا آخر.',
      signInBelow: 'تسجيل الدخول مجاني. اختر Nous بالأسفل.',
      tryAgain: 'إعادة المحاولة',
      retrying: 'جارٍ إعادة المحاولة…'
    }
  },
  modelPicker: {
    title: 'تغيير النموذج',
    current: 'الحالي:',
    unknown: '(غير معروف)',
    search: 'تصفية المزوّدين والنماذج…',
    noModels: 'لم يتم العثور على نماذج.',
    addProvider: 'إضافة مزوّد',
    loadFailed: 'تعذّر تحميل النماذج',
    loadingIntoMemory: 'جارٍ التحميل في الذاكرة',
    downloading: 'جارٍ التنزيل',
    localDownloadsHeading: 'محلي',
    noAuthenticatedProviders: 'لا يوجد مزوّد موثَّق.',
    pro: 'Pro',
    proNeedsSubscription: 'نماذج Pro تتطلب اشتراك Nous مدفوعًا.',
    free: 'مجاني',
    freeTier: 'مجاني',
    priceTitle: 'السعر للداخل / الخارج لكل مليون توكن',
    wasPrice: 'كان',
    customModel: 'نموذج مخصص',
    addCustomModelAction: 'إضافة نموذج مخصص…',
    customModelPlaceholder: 'أدخل معرّف نموذج، مثلًا openai/gpt-5',
    today: 'اليوم',
    week: 'الأسبوع',
    month: 'الشهر',
    topTier: 'النماذج الكبيرة (شهريًا)',
    included: 'كل النماذج أدناه مضمّنة',
    pausedRenewal: 'متوقف: تجديد غير مدفوع',
    pausedOther: 'متوقف',
    includedUsedUp: 'تم استهلاك الاستخدام المضمّن',
    limitReached: (name: string) => `تم بلوغ الحد ${name}`,
    limitNames: {
      day: 'اليومي',
      month: 'الشهري',
      top_tier: 'الشهري للنماذج الكبيرة',
      week: 'الأسبوعي'
    },
    limitThenCredits: 'النماذج المدفوعة تستخدم الآن رصيدك (الدفع حسب الاستخدام)',
    limitThenCreditsLarge: 'النماذج الكبيرة تستخدم الآن رصيدك (الدفع حسب الاستخدام)',
    limitThenWait: 'النماذج المجانية فقط حتى ذلك الحين',
    limitThenWaitLarge: 'النماذج الكبيرة متوقفة حتى ذلك الحين',
    percentUsed: (percent: string) => `تم استخدام ${percent}`,
    resetsIn: (duration: string) => `يُعاد التعيين خلال ${duration}`,
    usageLevels: { free: 'مجاني', top_tier: 'كبير' },
    sectionRecommended: 'موصى بها',
    sectionOther: 'نماذج أخرى',
    largeFootnote: 'تُحتسب النماذج الكبيرة أيضًا ضمن حدك الشهري للنماذج الكبيرة.'
  },
  modelVisibility: {
    title: 'النماذج',
    search: 'ابحث في النماذج',
    noAuthenticatedProviders: 'لا يوجد مزوّد موثَّق.',
    addProvider: 'إضافة مزوّد…',
    addCustomModel: 'إضافة نموذج مخصص',
    removeCustomModel: 'إزالة النموذج المخصص',
    resetToDefaults: 'استعادة الافتراضيات',
    resetConfirm: 'استعادة ظهور النماذج الافتراضي؟',
    resetDescription:
      'ستُمسح اختياراتك للنماذج الظاهرة والمخفية وتعود قائمة كل مزوّد إلى الافتراضي. تبقى النماذج المخصصة التي أضفتها ظاهرة.',
    resetAction: 'استعادة'
  },
  shell: {
    windowControls: 'أدوات التحكم في النافذة',
    paneControls: 'أدوات التحكم في اللوحة',
    appControls: 'أدوات التحكم في التطبيق',
    modelMenu: arModelMenu,
    modelOptions: {
      noOptions: 'لا توجد خيارات لهذا النموذج',
      options: 'الخيارات',
      thinking: 'التفكير',
      fast: 'سريع',
      ultrafast: 'Ultrafast',
      useStandardSpeed: 'استخدام السرعة العادية',
      effort: 'الجهد',
      minimal: 'أدنى',
      low: 'منخفض',
      medium: 'متوسط',
      high: 'مرتفع',
      xhigh: 'مرتفع جدًا',
      max: 'أقصى',
      ultra: 'Ultra',
      sendsOnRoute: (level: string) => `يرسل ${level} على هذا المسار`,
      updateFailed: 'فشل تحديث خيار النموذج',
      fastFailed: 'فشل تحديث الوضع السريع'
    },
    gatewayMenu: {
      gateway: 'البوابة',
      connected: 'متصل',
      connecting: 'جارٍ الاتصال',
      offline: 'غير متصل',
      inferenceReady: 'الاستدلال جاهز',
      inferenceNotReady: 'الاستدلال غير جاهز',
      checkingInference: 'جارٍ التحقق من الاستدلال',
      disconnected: 'غير متصل',
      reconnectGateway: 'إعادة اتصال البوابة',
      openSystem: 'فتح لوحة النظام',
      connection: label => `الاتصال: ${label}`,
      recentActivity: 'النشاط الأخير',
      viewAllLogs: 'عرض كل السجلات ←',
      messagingPlatforms: 'منصات المراسلة'
    },
    approvalMode: {
      title: 'وضع الموافقة',
      ariaLabel: mode => `وضع الموافقة: ${mode}`,
      manual: 'يدوي',
      manualDescription: 'السؤال قبل الإجراءات التي تحتاج إلى موافقة',
      smart: 'ذكي',
      smartDescription: 'تقييم الإجراءات تلقائيًا والسؤال عند الحاجة',
      off: 'معطّل',
      offDescription: 'التنفيذ دون طلبات موافقة'
    },
    statusbar: {
      unknown: 'غير معروف',
      restart: 'إعادة التشغيل',
      update: 'تحديث',
      updateInProgress: 'التحديث جارٍ',
      commitsBehind: (count, branch) => `متأخر بـ ${count} ${count === 1 ? 'commit' : 'commits'} عن ${branch}`,
      desktopVersion: version => `Hermes Desktop v${version}`,
      backendVersion: version => `الخادم الخلفي v${version}`,
      clientLabel: version => `العميل v${version}`,
      connectionSsh: host => `SSH: ${host}`,
      connectionRemote: host => `بعيد: ${host}`,
      connectionCloud: host => `سحابي: ${host}`,
      connectionCloudTooltip: host => `Hermes Cloud · ${host}`,
      connectionSshTooltip: host => `SSH · ${host}`,
      connectionRemoteTooltip: host => `بعيد · ${host}`,
      backendLabel: version => `الخادم الخلفي v${version}`,
      commit: sha => `commit ${sha}`,
      branch: branch => `الفرع ${branch}`,
      closeCommandCenter: 'إغلاق مركز الأوامر',
      openCommandCenter: 'فتح مركز الأوامر',
      showTerminal: 'إظهار الطرفية',
      hideTerminal: 'إخفاء الطرفية',
      gateway: 'البوابة',
      gatewayReady: 'جاهزة',
      gatewayNeedsSetup: 'تحتاج إلى إعداد',
      gatewayUnavailable: 'الاستدلال غير متاح',
      gatewayChecking: 'جارٍ التحقق',
      gatewayConnecting: 'جارٍ الاتصال',
      gatewayOffline: 'غير متصلة',
      gatewayRestarting: 'جارٍ إعادة التشغيل…',
      gatewayTitle: 'البوابة',
      customizeTitle: 'العرض في شريط الحالة',
      hideStatusbar: 'إخفاء شريط الحالة',
      resetStatusbar: 'استعادة الافتراضيات',
      toggleApprovalMode: 'الموافقات',
      toggleBackendVersion: 'إصدار الخادم الخلفي',
      toggleCacheHitRate: 'معدّل التخزين المؤقت',
      toggleCommandCenter: 'مركز الأوامر',
      toggleContextUsage: 'مقياس السياق',
      toggleRunningTimer: 'مؤقّت الدور',
      toggleSessionTimer: 'مؤقّت الجلسة',
      toggleTerminal: 'الطرفية',
      toggleTokensPerSecond: 'التوكنات في الثانية',
      toggleVersion: 'الإصدار والتحديثات',
      toggleFreeTier: 'الخطة المجانية',
      toggleWorkspace: 'مساحة العمل',
      cacheHitRateTitle:
        'معدّل إصابة التخزين المؤقت للطلبات في هذه الجلسة — التوكنات المخزّنة مؤقتًا أرخص، لذا المعدّل الأعلى أوفر',
      tokensPerSecondTitle: 'توكنات المخرجات في الثانية، متوسط آخر 10 استدعاءات للنموذج',
      agents: 'الوكلاء',
      closeAgents: 'إغلاق الوكلاء',
      openAgents: 'فتح الوكلاء',
      subagents: count => `${count} ${count === 1 ? 'وكيل فرعي' : 'وكلاء فرعيون'}`,
      failed: count => `${count} فاشلة`,
      running: count => `${count} قيد التشغيل`,
      cron: 'Cron',
      openCron: 'فتح مهام cron',
      webhooks: 'Webhooks',
      openWebhooks: 'فتح Webhooks',
      starmap: 'مخطط الذاكرة',
      openStarmap: 'فتح مخطط الذاكرة',
      turnRunning: 'قيد التشغيل',
      contextUsage: 'استخدام السياق',
      systemResources: {
        title: 'موارد النظام',
        loading: 'الموارد…',
        gpuUtilization: 'استخدام GPU',
        gpuMemory: 'ذاكرة GPU',
        ram: 'RAM',
        unifiedNote: 'ذاكرة موحّدة — يتشارك GPU والنظام هذه المساحة.',
        toggle: 'موارد النظام'
      },
      contextUsagePanel: {
        categories: {
          conversation: 'المحادثة',
          mcp: 'MCP',
          memory: 'الذاكرة',
          rules: 'القواعد',
          skills: 'المهارات',
          subagent_definitions: 'تعريفات الوكلاء الفرعيين',
          system_prompt: 'تعليمات النظام',
          tool_definitions: 'تعريفات الأدوات'
        },
        empty: 'لا توجد بيانات سياق بعد',
        loading: 'جارٍ تحميل التفاصيل…',
        percentFull: percent => `ممتلئ ${percent}%`,
        title: 'استخدام السياق',
        tokenSummary: (used, max) => `${used} / ${max} توكن`
      },
      focusedSince: 'في الواجهة منذ',
      focusedSinceTitle: 'الوقت منذ أن أصبحت هذه المحادثة في الواجهة — وليس مدة الدور',
      yoloOn: 'YOLO مفعّل — موافقة تلقائية على الأوامر الخطرة. Shift+نقر للتبديل على مستوى عام.',
      yoloOff: 'YOLO معطّل. Shift+نقر للتبديل على مستوى عام.',
      modelNone: 'لا شيء',
      noModel: 'لا يوجد نموذج',
      switchModel: 'تغيير النموذج',
      openModelPicker: 'فتح منتقي النماذج',
      modelPinned:
        'مثبّت بواسطتك؛ تستخدمه المحادثات الجديدة بدلًا من القيمة الافتراضية في الإعدادات',
      modelTitle: (provider, model) => `النموذج · ${provider}: ${model}`,
      providerModelTitle: (provider, model) => `${provider} · ${model}`
    }
  },
  rightSidebar: {
    terminalDropUnquotable: (shell, paths) => `تعذّر إدخال هذه الأسماء بأمان في ${shell}: ${paths}`,
    aria: 'الشريط الجانبي الأيمن',
    panelsAria: 'لوحات الشريط الجانبي الأيمن',
    files: 'نظام الملفات',
    terminal: 'الطرفية',
    noFolderSelected: 'لم يتم تحديد مجلد',
    changeCwdTitle: 'تغيير مجلد العمل',
    remotePickerTitle: 'اختيار مجلد بعيد',
    remotePickerDescription: 'تصفّح المجلدات على الخادم الخلفي المتصل.',
    remotePickerSelect: 'تحديد المجلد',
    remotePickerNewFolder: 'مجلد جديد',
    remotePickerFolderName: 'اسم المجلد',
    remotePickerCreateFolder: 'إنشاء المجلد',
    remotePickerInvalidFolderName: 'أدخل اسم مجلد واحدًا، دون شرطة مائلة.',
    remotePickerCreateFolderFailed: error => `تعذّر إنشاء المجلد (${error}).`,
    folderTip: cwd => cwd,
    openFolder: 'فتح المجلد',
    refreshTree: 'تحديث الشجرة',
    collapseAll: 'طيّ كل المجلدات',
    showIgnored: 'إظهار الملفات التي يتجاهلها Git',
    hideIgnored: 'إخفاء الملفات التي يتجاهلها Git',
    previewUnavailable: 'المعاينة غير متاحة',
    couldNotPreview: path => `تعذّرت معاينة ${path}`,
    noProjectTitle: 'لا يوجد مشروع',
    noProjectBody: 'افتح مشروعًا لتصفّح ملفاته ومراجعة التغييرات.',
    noProjectOpen: 'لا يوجد مشروع مفتوح',
    noDiffs: 'لا توجد فروقات',
    unreadableTitle: 'غير قابل للقراءة',
    unreadableBody: error => `تعذّرت قراءة هذا المجلد (${error}).`,
    emptyTitle: 'فارغ',
    emptyBody: 'هذا المجلد فارغ.',
    treeErrorTitle: 'خطأ في الشجرة',
    treeErrorBody: 'واجهت شجرة الملفات خطأً أثناء عرض هذا المجلد.',
    tryAgain: 'إعادة المحاولة',
    loadingTree: 'جارٍ تحميل شجرة الملفات',
    loadingFiles: 'جارٍ تحميل الملفات',
    terminalHide: 'إخفاء الطرفية',
    terminalsAria: 'الطرفيات',
    terminalNew: 'طرفية جديدة',
    terminalCloseOthers: 'إغلاق الأخرى',
    terminalCloseAll: 'إغلاق الكل',
    addToChat: 'إضافة إلى المحادثة'
  },
  preview: {
    tab: 'معاينة',
    pin: 'تثبيت في مساحة العمل',
    unpin: 'فصل عن مساحة العمل',
    closePane: 'إغلاق لوحة المعاينة',
    loading: 'جارٍ تحميل المعاينة',
    unavailable: 'المعاينة غير متاحة',
    opening: 'جارٍ الفتح…',
    hide: 'إخفاء',
    openPreview: 'فتح المعاينة',
    openInBrowser: 'فتح في المتصفح',
    openInExternal: 'فتح في تطبيق خارجي',
    popIn: 'إعادة الدمج',
    popOut: 'فصل',
    linkHint: '⌘/Ctrl+نقر للوحة المعاينة',
    sourceLineTitle: 'انقر للتحديد · Shift+نقر للتوسيع · اسحب إلى المحرّر',
    source: 'المصدر',
    renderedPreview: 'المعاينة',
    diff: 'الفروقات',
    unknownSize: 'حجم غير معروف',
    binaryTitle: 'يبدو أن هذا ملف ثنائي',
    binaryBody: label => `قد تعرض معاينة ${label} نصًا غير مقروء.`,
    largeTitle: 'هذا الملف كبير',
    largeBody: (label, size) => `حجم ${label} هو ${size}. سيعرض Hermes أول 512 كيلوبايت فقط.`,
    previewAnyway: 'المعاينة على أي حال',
    truncated: 'يتم عرض أول 512 كيلوبايت.',
    noInlineTitle: 'لا توجد معاينة مضمّنة',
    noInlineBody: mimeType => `${mimeType || 'هذا النوع من الملفات'} يمكن إرفاقه كسياق مع ذلك.`,
    edit: 'تعديل',
    editing: 'جارٍ التعديل',
    unsavedChanges: 'تغييرات غير محفوظة',
    saveFailed: message => `تعذّر الحفظ: ${message}`,
    saveScopeChanged: 'ارجع إلى الاتصال وملف التعريف الأصليين لحفظ هذه المسودة.',
    diskChangedTitle: 'تم تعديل الملف على القرص',
    diskChangedBody:
      'تغيّر هذا الملف منذ أن فتحته. هل تريد استبداله بنسختك، أم تجاهل تعديلاتك وإعادة التحميل؟',
    overwrite: 'استبدال',
    discardReload: 'تجاهل وإعادة التحميل',
    console: {
      deselect: 'إلغاء تحديد الإدخال',
      select: 'تحديد الإدخال',
      copyFailed: 'تعذّر نسخ مخرجات وحدة التحكم',
      copyEntry: 'نسخ هذا الإدخال',
      sendEntry: 'إرسال هذا الإدخال إلى المحادثة',
      messages: count => `${count} رسائل في وحدة التحكم`,
      resize: 'تغيير حجم وحدة تحكم المعاينة',
      title: 'وحدة تحكم المعاينة',
      selected: count => `${count} محدد`,
      sendToChat: 'إرسال إلى المحادثة',
      copySelected: 'نسخ المحدد إلى الحافظة',
      copyAll: 'نسخ الكل إلى الحافظة',
      copy: 'نسخ',
      clear: 'مسح',
      empty: 'لا توجد رسائل في وحدة التحكم بعد.',
      promptHeader: 'وحدة تحكم المعاينة:',
      sentTitle: 'تم الإرسال إلى المحادثة',
      sentMessage: count => `تمت الإضافة إلى المحرّر: ${count} ${count === 1 ? 'رسالة' : 'رسائل'} من وحدة التحكم`
    },
    web: arPreviewWeb
  },
  interfaceMode: {
    title: 'وضع الواجهة',
    hint: 'يغيّر ما يُعرض، لا ما يستطيع Hermes فعله.',
    sessionNote:
      'محدد بواسطة الوضع البسيط. التغيير هنا يستمر طوال هذه الجلسة فقط؛ انتقل إلى الوضع المتقدم للاحتفاظ به.',
    simple: {
      label: 'بسيط',
      description:
        'للدردشة مع Hermes. شريط جانبي ومحادثة؛ بدون لوحات الطرفية أو الملفات أو الفروقات.'
    },
    advanced: {
      label: 'متقدم',
      description: 'للمطوّرين. الطرفية والملفات والفروقات وشريط الحالة والتخطيطات، حسب إعداداتك.'
    }
  },
  zones: {
    showTabStrip: 'إظهار التبويبات',
    hideTabStrip: 'إخفاء التبويبات',
    showStripTab: title => `إظهار ${title}`,
    hideStripTab: title => `إخفاء ${title}`,
    zoneMenuLabel: title => `خيارات المنطقة لـ ${title}`,
    lastTabKeptTitle: 'يبقى التبويب الأخير ظاهرًا',
    lastTabKeptBody:
      'يجب أن تحتفظ هذه المنطقة بتبويب واحد ظاهر على الأقل. أظهر تبويبًا آخر أولًا أو اطوِ الشريط الجانبي بالكامل.',
    toggleStripTab: title => `إظهار أو إخفاء تبويب ${title}`,
    minimize: 'تصغير',
    restore: 'استعادة',
    closeRunningTitle: 'إغلاق التبويب قيد التشغيل؟',
    closeRunningBody:
      'هذه المحادثة ما زالت قيد التشغيل (أو في انتظار إدخالك). إغلاق التبويب يخفيها — تحتفظ الجلسة بتقدّمها ويمكن إعادة فتحها من الشريط الجانبي.',
    closeRunningConfirm: 'إغلاق التبويب',
    reload: 'إعادة التحميل',
    closeOthers: 'إغلاق الأخرى',
    closeToRight: 'إغلاق ما على اليمين',
    closeAll: 'إغلاق الكل',
    newSessionTab: 'تبويب جلسة جديد',
    newTab: 'تبويب جديد',
    pluginDisabled: pluginId => `الإضافة «${pluginId}» معطّلة`,
    pluginDisabledBody: 'أعد تفعيلها من الإعدادات ← الإضافات لاستعادة اللوحة.',
    missingPane: paneId => `لوحة مفقودة: ${paneId}`,
    editTitle: 'التخطيطات',
    editHint:
      'اختر تخطيطًا أو اسحب اللوحات بين المناطق. انقر بزر الفأرة الأيمن على منطقة لتقسيمها.',
    reset: 'إعادة تعيين',
    templates: 'القوالب',
    custom: 'مخصص',
    newGridLayout: 'تخطيط شبكي جديد',
    saveCurrentAs: 'حفظ التخطيط الحالي كقالب',
    nameLayoutPlaceholder: 'سمِّ هذا التخطيط…',
    deletePreset: name => `حذف ${name}`,
    zoneEditorTitle: 'محرّر المناطق',
    editorHintPre: 'انقر للتقسيم · ',
    editorHintPost:
      ' يعكس الاتجاه · اسحب عبر المناطق للدمج · اسحب الحواف المشتركة لتغيير الحجم',
    templateColumns: 'أعمدة',
    templateRows: 'صفوف',
    templateGrid: 'شبكة',
    templatePriority: 'أولوية',
    zoneTag: index => `المنطقة ${index}`,
    mergeZones: count => `دمج ${count} مناطق`,
    customZoneName: count => `مخصص ${count} مناطق`,
    layoutNamePlaceholder: fallback => `اسم التخطيط (${fallback})`,
    saveApply: 'حفظ وتطبيق',
    notExpressible: 'هذا التخطيط متشابك (دوّار) — لا يمكن التعبير عنه بعد كتقسيمات متداخلة',
    zoneCount: count => `${count} مناطق`,
    tabCount: count => `${count} ${count === 1 ? 'تبويب' : 'تبويبات'}`
  },
  contextMenu: {
    link: {
      openInApp: 'فتح في المتصفح المدمج',
      openExternal: 'فتح في المتصفح الخارجي',
      copyUrl: 'نسخ URL',
      copyResolvedUrl: 'نسخ URL النهائي'
    },
    image: {
      copyImage: 'نسخ الصورة',
      copyImageAddress: 'نسخ عنوان الصورة',
      saveImageAs: 'حفظ الصورة باسم…'
    },
    edit: {
      cut: 'قص',
      paste: 'لصق',
      selectAll: 'تحديد الكل',
      addToDictionary: 'إضافة إلى القاموس'
    },
    page: {
      copyPageUrl: 'نسخ URL الصفحة',
      inspectElement: 'فحص العنصر'
    }
  },
  assistant: {
    thread: {
      loadingSession: 'جارٍ تحميل الجلسة',
      showEarlier: 'عرض الرسائل السابقة',
      loadingResponse: 'Hermes يحمّل ردًا',
      loadingLocalModel: model => `جارٍ تحميل ${model} في الذاكرة`,
      processingPrompt: 'جارٍ معالجة الطلب',
      resumeWhenBackgroundDone: count =>
        count === 1
          ? 'سيُستأنف بعد انتهاء المهمة في الخلفية'
          : `سيُستأنف بعد انتهاء ${count} مهام في الخلفية`,
      thinking: 'يفكّر',
      thought: 'فكّر',
      thoughtBriefly: 'فكّر لفترة قصيرة',
      thoughtFor: duration => `فكّر لمدة ${duration}`,
      turnDuration: duration => `استغرق هذا الدور ${duration}`,
      today: time => `اليوم، ${time}`,
      yesterday: time => `أمس، ${time}`,
      copy: 'نسخ',
      refresh: 'تحديث',
      moreActions: 'إجراءات أخرى',
      branchNewChat: 'تفريع إلى محادثة جديدة',
      react: 'تفاعل',
      dismissError: 'تجاهل الخطأ',
      responseStopped: 'تم إيقاف الرد',
      ...arErrorLayers,
      errorCodes: {
        ...arErrorCodes,
        auth: {
          title: provider => `رفض ${provider} اتصالك`,
          body: provider =>
            `تم رفض بيانات الاعتماد المحفوظة لـ ${provider}. صحّحها في الإعدادات أو غيّر المزوّد، ثم حاول مرة أخرى.`
        },
        auth_permanent: {
          title: provider => `رفض ${provider} اتصالك`,
          body: provider =>
            `بيانات الاعتماد المحفوظة لـ ${provider} غير صالحة أو أُلغيت. حدّثها أو غيّر المزوّد، ثم حاول مرة أخرى.`
        },
        billing: {
          title: 'نفد الرصيد',
          body: provider =>
            `لم يعد في حساب ${provider} رصيد. اشحنه أو غيّر المزوّد، ثم حاول مرة أخرى.`
        },
        rate_limit: {
          title: 'خدمة الذكاء الاصطناعي مشغولة',
          body: provider => `يقيّد ${provider} الطلبات حاليًا. انتظر دقيقة، ثم حاول مرة أخرى.`
        },
        upstream_rate_limit: {
          title: 'خدمة الذكاء الاصطناعي مشغولة',
          body: provider => `يقيّد ${provider} الطلبات حاليًا. انتظر دقيقة، ثم حاول مرة أخرى.`
        },
        overloaded: {
          title: 'خدمة الذكاء الاصطناعي محمّلة فوق طاقتها',
          body: provider =>
            `يواجه ${provider} صعوبات. حاول مرة أخرى بعد قليل أو غيّر المزوّد.`
        },
        server_error: {
          title: 'واجهت خدمة الذكاء الاصطناعي مشكلة',
          body: provider =>
            `أعاد ${provider} خطأً في الخادم. حاول مرة أخرى بعد قليل أو غيّر المزوّد.`
        },
        timeout: {
          title: 'تعذّر الوصول إلى خدمة الذكاء الاصطناعي',
          body: provider =>
            `يتعذّر الوصول إلى ${provider} أو لم يستجب في الوقت المحدد. تحقّق من اتصالك بالإنترنت، ثم حاول مرة أخرى.`
        },
        no_reply: {
          title: 'لم يكتمل الرد',
          body: 'أنهى Hermes هذا الدور دون رد. أعد المحاولة لإرساله من جديد.'
        },
        stream_drop: {
          title: 'انقطع الرد',
          body: 'انقطع الاتصال قبل اكتمال الرد. أعد المحاولة لإرساله من جديد.'
        },
        upstream_blocked: {
          title: 'حجب جدار حماية الطلب',
          body: (provider: string) =>
            `حجب جدار حماية أو CDN أمام ${provider} الطلب قبل وصوله إلى النموذج — مفتاحك صالح غالبًا. عيّن ترويسة User-Agent عبر extra_headers الخاصة بالمزوّد في الإعدادات، أو غيّر المزوّد، ثم أعد إرسال رسالتك.`
        },
        ssl_cert_verification: {
          title: 'فشل الاتصال الآمن',
          body: provider =>
            `تعذّر على Hermes التحقق من الاتصال الآمن بـ ${provider}. تحقّق من شبكتك أو الوكيل (proxy)، أو غيّر المزوّد.`
        },
        context_overflow: {
          title: 'هذه المحادثة طويلة جدًا',
          body: 'لم تعد المحادثة تتسع في النموذج. اضغطها أو ابدأ محادثة جديدة، ثم حاول مرة أخرى.'
        },
        payload_too_large: {
          title: 'هذه الرسالة كبيرة جدًا',
          body: 'كان الطلب أكبر من أن يستوعبه النموذج. اضغط المحادثة أو ابدأ محادثة جديدة، ثم حاول مرة أخرى.'
        },
        model_not_found: {
          title: 'هذا النموذج غير متاح',
          body: provider =>
            `لا يوفّر ${provider} هذا النموذج لحسابك. اختر نموذجًا آخر، ثم حاول مرة أخرى.`
        },
        provider_policy_blocked: {
          title: 'هذا النموذج محجوب بإعدادات حسابك',
          body: provider =>
            `لم يوجّه ${provider} هذا الطلب بسبب إعدادات البيانات أو الخصوصية لديك. اختر نموذجًا أو مزوّدًا آخر.`
        },
        content_policy_blocked: {
          title: 'رفضت خدمة الذكاء الاصطناعي هذا الطلب',
          body: provider => `لم يرد ${provider} على هذه الرسالة. عدّلها ثم أعد إرسالها.`
        },
        format_error: {
          title: 'رفضت خدمة الذكاء الاصطناعي الطلب',
          body: provider =>
            `لم يقبل ${provider} صيغة هذا الطلب. غيّر المزوّد أو أرسل التشخيصات.`
        },
        truncated: {
          title: 'تم اقتطاع الرد',
          body: 'توقف النموذج قبل النهاية. أعد المحاولة للحصول على رد كامل.'
        },
        invalid_response: {
          title: 'أرسلت خدمة الذكاء الاصطناعي ردًا غير مقروء',
          body: provider => `أعاد ${provider} ردًا تعذّر على Hermes قراءته. حاول مرة أخرى بعد قليل.`
        },
        empty_response: {
          title: 'أرسلت خدمة الذكاء الاصطناعي ردًا فارغًا',
          body: provider => `لم يُعِد ${provider} أي شيء لهذه الرسالة. حاول مرة أخرى بعد قليل.`
        },
        loop_error: {
          title: 'علِق Hermes في حلقة متكررة',
          body: 'كان الرد يكرر الخطوات نفسها، لذا أوقفه Hermes. حاول مرة أخرى أو ابدأ محادثة جديدة.'
        },
        SESSION_NOT_OWNED: {
          title: 'هذه المحادثة مفتوحة في مكان آخر',
          body: 'هذه المحادثة مفتوحة بالفعل في نافذة Hermes أخرى أو في طرفية. أغلقها هناك ثم حاول مرة أخرى، أو ابدأ محادثة جديدة هنا.'
        },
        disk_full: {
          title: 'القرص ممتلئ',
          body: 'القرص ممتلئ؛ تعذّر على Hermes حفظ هذه المحادثة. حرّر بعض المساحة ثم حاول مرة أخرى.'
        },
        free_tier_disabled: {
          title: 'استخدام Hermes دون تسجيل دخول معطّل حاليًا',
          body: 'سجّل الدخول بحساب Nous مجاني للمتابعة.'
        },
        free_tier_rate_limited: {
          title: 'لقد استهلكت الحصة المتاحة دون تسجيل دخول',
          body: 'ستتجدد قريبًا. سجّل الدخول بحساب Nous مجاني للحصول على حصة أكبر.'
        },
        free_tier_at_capacity: {
          title: 'الخدمة دون تسجيل دخول عليها ضغط كبير',
          body: 'سجّل الدخول مجانًا لتجنّب الانتظار، أو حاول مرة أخرى لاحقًا.'
        },
        free_tier_model_not_free: {
          title: 'هذا النموذج غير متاح دون تسجيل دخول',
          body: 'يستخدم Hermes النموذج المجاني حاليًا. سجّل الدخول بحساب Nous مجاني للوصول إلى مزيد من النماذج.'
        },
        free_tier_route: {
          title: 'تعذّر على Hermes الوصول إلى النموذج المجاني عبر هذا المسار',
          body: 'سجّل الدخول بحساب Nous مجاني أو تحقّق من إعداد NOUS_INFERENCE_BASE_URL.'
        },
        free_tier_outage: {
          title: 'النموذج المجاني يواجه صعوبات',
          body: 'أعد إرسال رسالتك بعد دقيقة.'
        },
        free_tier_refused: {
          title: 'تعذّر على Hermes إرسال هذه الرسالة دون تسجيل دخول',
          body: 'تسجيل الدخول بحساب Nous مجاني.'
        },
        usage_window: {
          title: 'تم استهلاك الاستخدام المضمّن',
          body: 'نفد الاستخدام المضمّن في خطتك حتى إعادة التعيين. أضف رصيدًا عبر /topup للمتابعة.'
        }
      },
      errorAuthKinds: {
        api_key: {
          title: provider => `رفض ${provider} مفتاح API الخاص بك`,
          body: provider =>
            `المفتاح المحفوظ لـ ${provider} غير صالح أو أُلغي. حدّثه، ثم حاول مرة أخرى.`
        },
        oauth: {
          title: provider => `انتهت صلاحية اتصالك بـ ${provider}`
        }
      },
      errorDetails: 'التفاصيل',
      errorGenericProvider: 'خدمة الذكاء الاصطناعي',
      errorToastTitle: 'تعذّر على Hermes إكمال الرد',
      errorRetry: 'إعادة المحاولة',
      errorSwitchToModel: (model, note) => (note ? `التبديل إلى ${model} (${note})` : `التبديل إلى ${model}`),
      errorSwitchModelFailed: 'تعذّر تغيير النموذج',
      errorUseCredits: 'تفعيل المتابعة باستخدام الرصيد',
      errorUseCreditsFailed: 'تعذّر تفعيل المتابعة باستخدام الرصيد',
      errorAddCredits: 'إضافة رصيد',
      errorOpenBillingSettings: 'فتح إعدادات الفوترة',
      errorLimitResets: (time: string) => `يُعاد تعيين الحصة في ${time}`,
      errorRetryAtReset: (time: string) => `إعادة المحاولة عند إعادة تعيين الحصة (${time})`,
      errorRetryScheduled: (time: string, wait: string) => `محاولة جديدة في ${time} — خلال ${wait}`,
      errorRetryScheduledCancel: 'إلغاء',
      errorStartNewSession: 'بدء جلسة جديدة',
      errorSwitchProvider: 'تغيير المزوّد',
      errorChooseModel: 'اختيار نموذج',
      errorCompressConversation: 'ضغط المحادثة',
      errorCompressFailed: 'تعذّر ضغط المحادثة',
      errorOpenHermesFolder: 'فتح مجلد Hermes',
      errorOpenHermesFolderFailed: 'تعذّر فتح مجلد Hermes',
      errorUpdateApiKey: 'تحديث مفتاح API',
      errorSignInAgain: provider => `إعادة تسجيل الدخول إلى ${provider}`,
      errorSignInFreeTier: 'تسجيل الدخول بحساب Nous',
      errorOauthExpired: provider =>
        `انتهت صلاحية اتصالك بـ ${provider} أو أُلغي. سجّل الدخول من جديد لمتابعة المحادثة.`,
      errorOpenLogs: 'فتح السجلات',
      errorOpenLogsFailed: 'تعذّر فتح مجلد السجلات',
      errorOpenDesktopLogs: 'فتح سجلات سطح المكتب',
      errorCopyDiagnostics: 'نسخ تفاصيل الخطأ',
      errorSendDiagnostics: 'إرسال التشخيصات',
      filesChanged: count => (count === 1 ? 'ملف واحد معدّل' : `${count} ملفات معدّلة`),
      reviewChanges: 'مراجعة',
      readAloudFailed: 'فشلت القراءة بصوت عالٍ',
      preparingAudio: 'جارٍ تجهيز الصوت…',
      stopReading: 'إيقاف القراءة',
      readAloud: 'قراءة بصوت عالٍ',
      copyFullResponse: 'نسخ الرد كاملًا',
      readAloudFullResponseHint: 'Shift+نقر: قراءة الرد كاملًا',
      editMessage: 'تعديل الرسالة',
      expandMessage: 'توسيع الرسالة',
      scrollToBottom: 'التمرير إلى الأسفل',
      stop: 'إيقاف',
      restorePrevious: 'استعادة نقطة الحفظ السابقة',
      restoreCheckpoint: 'استعادة نقطة الحفظ',
      restoreFromHere: 'استعادة نقطة الحفظ — إعادة التشغيل من هذا الطلب',
      restoreTitle: 'استعادة نقطة الحفظ هذه؟',
      restoreBody:
        'سيُزال كل ما بعد هذا الطلب من المحادثة، ثم يُعاد تشغيل الطلب من هنا.',
      restoreConfirm: 'استعادة وإعادة التشغيل',
      restoreNext: 'استعادة نقطة الحفظ التالية',
      goForward: 'تقدّم',
      sendEdited: 'إرسال الرسالة المعدّلة',
      attachingFile: 'جارٍ الإرفاق…'
    },
    approval: {
      gatewayDisconnected: 'بوابة Hermes غير متصلة',
      sendFailed: 'تعذّر إرسال رد الموافقة',
      reconnect: 'إعادة الاتصال',
      timedOutSystemLine:
        'انتهت مهلة الموافقة — لم يُنفَّذ الأمر. اطلب من Hermes المحاولة مرة أخرى أو زِد الحد من الإعدادات ← الأمان ← مهلة الموافقة.',
      openSafetySettings: 'فتح إعدادات الأمان',
      run: 'تنفيذ',
      command: 'الأمر',
      moreOptions: 'خيارات موافقة أخرى',
      allowSession: 'السماح لهذه الجلسة',
      alwaysAllowMenu: 'السماح دائمًا…',
      jumpToApproval: 'مطلوب موافقة',
      reject: 'رفض',
      alwaysTitle: 'السماح بهذا الأمر دائمًا؟',
      alwaysDescription: pattern =>
        `سيضيف هذا النمط «${pattern}» إلى قائمة السماح الدائمة (~/.hermes/config.yaml). لن يسأل Hermes مرة أخرى عن هذا النوع من الأوامر — لا في هذه الجلسة ولا في الجلسات القادمة.`,
      alwaysAllow: 'السماح دائمًا'
    },
    clarify: arClarify,
    themePicker: arThemePicker,
    catalogInstall: {
      preparing: 'جارٍ تجهيز التثبيت…',
      install: 'تثبيت',
      advanced: 'متقدم',
      skip: 'تخطٍّ',
      installing: 'جارٍ التثبيت…',
      installed: 'مثبّت',
      notInstalled: 'غير مثبّت',
      failed: 'فشل',
      showNames: 'إظهار الأسماء',
      hideNames: 'إخفاء الأسماء',
      skill: (name: string) => `المهارة ${name}`,
      kind: {
        plugin: 'إضافة',
        skill: 'مهارة'
      },
      tier: { official: 'رسمي', verified: 'موثَّق', community: 'المجتمع' },
      targetProfile: (profile: string) => `يُثبَّت في ملف التعريف ${profile}`,
      sendFailed: 'تعذّر إرسال ردك. حاول مرة أخرى.',
      commitLabel: 'Commit',
      subdirLabel: 'المجلد',
      securityHeading: 'الأمان',
      scan: {
        passed: 'نجح الفحص',
        warnings: 'وجد الفحص تحذيرات',
        failed: 'فشل الفحص'
      },
      requirementsLabel: 'يتطلب',
      credentialsHeading: 'بيانات الاعتماد'
    },
    mcpSetup: {
      installTitle: 'إضافة خوادم MCP',
      enableTitle: 'تفعيل خوادم MCP',
      authorizeTitle: 'تفويض خوادم MCP',
      installAction: 'تثبيت',
      enableAction: 'تفعيل',
      authorizeAction: 'تفويض',
      installed: server => `تم تثبيت ${server}`,
      enabled: server => `تم تفعيل ${server}`,
      authorized: server => `تم تفويض ${server}`,
      failed: server => `فشل إعداد ${server}`,
      toolCount: count => (count === 1 ? 'أداة واحدة' : `${count} أدوات`),
      envRequired: 'أدخل بيانات الاعتماد المطلوبة أولًا',
      sendFailed: 'تعذّر إرسال رد إعداد MCP',
      reloadFailed:
        'تم حفظ الخادم، لكن فشلت إعادة تحميل أدوات MCP — ستُحمَّل في الجلسة التالية',
      gatewayDisconnected: 'بوابة Hermes غير متصلة'
    },
    tool: {
      copyCode: 'نسخ الكود',
      renderingImage: 'جارٍ عرض الصورة',
      copyOutput: 'نسخ المخرجات',
      copyCommand: 'نسخ الأمر',
      copyContent: 'نسخ المحتوى',
      copyUrl: 'نسخ URL',
      copyResults: 'نسخ النتائج',
      copyQuery: 'نسخ الاستعلام',
      copyFile: 'نسخ الملف',
      copyPath: 'نسخ المسار',
      failedCalls: count => `${count} ${count === 1 ? 'استدعاء أداة فاشل' : 'استدعاءات أدوات فاشلة'}`,
      skillActivity: {
        loading: 'جارٍ تحميل المهارة',
        loaded: 'تم تحميل المهارة',
        loadFailed: 'فشل تحميل المهارة',
        readingResource: 'جارٍ قراءة مورد المهارة',
        readResource: 'تمت قراءة مورد المهارة',
        resourceFailed: 'فشلت قراءة مورد المهارة',
        listing: 'جارٍ سرد المهارات',
        listed: 'تم سرد المهارات',
        listFailed: 'فشل سرد المهارات',
        unavailable: 'نتيجة المهارة غير متاحة'
      },
      outputAlt: 'مخرجات الأداة',
      rawResponse: 'الرد الخام',
      copyActivity: 'نسخ النشاط',
      recoveredOne: 'تم التعافي بعد خطوة فاشلة واحدة',
      recoveredMany: count => `تم التعافي بعد ${count} خطوات فاشلة`,
      failedOne: 'فشلت خطوة واحدة',
      failedMany: count => `فشلت ${count} خطوات`,
      statusRunning: 'قيد التشغيل',
      statusError: 'خطأ',
      statusRecovered: 'تم التعافي',
      statusDone: 'تم',
      resultUnavailable: 'النتيجة غير متاحة',
      resultInterrupted: 'تمت المقاطعة',
      memoryWriteNoted: 'تم تسجيل الكتابة في الذاكرة',
      actions: {
        read: 'تمت القراءة',
        reading: 'جارٍ القراءة',
        opened: 'تم الفتح',
        opening: 'جارٍ الفتح',
        failedToOpen: 'فشل الفتح',
        searched: 'تم البحث',
        searching: 'جارٍ البحث',
        ran: 'تم التنفيذ',
        running: 'جارٍ التنفيذ',
        ranCode: 'تم تنفيذ الكود',
        runningCode: 'جارٍ تشغيل السكربت'
      },
      prefixes: {
        browser: 'المتصفح',
        web: 'الويب'
      },
      titleTemplates: {
        actionCommand: (action, command) => `${action} ${command}`,
        actionQuoted: (action, value) => `${action} «${value}»`,
        actionTarget: (action, target) => `${action} ${target}`,
        prefixedDone: (prefix, action) => `${prefix} ${action}`,
        runningPrefixedTool: (prefix, action) => `جارٍ تشغيل ${prefix.toLowerCase()} ${action.toLowerCase()}`,
        runningTool: action => `جارٍ تشغيل ${action.toLowerCase()}`
      },
      titles: {
        browser_click: {
          done: 'تم النقر على عنصر في الصفحة',
          pending: 'جارٍ النقر على عنصر في الصفحة',
          pendingAction: 'جارٍ النقر'
        },
        browser_fill: {
          done: 'تم ملء حقل النموذج',
          pending: 'جارٍ ملء حقل النموذج',
          pendingAction: 'جارٍ الملء'
        },
        browser_navigate: {
          done: 'تم فتح الصفحة',
          pending: 'جارٍ فتح الصفحة',
          pendingAction: 'جارٍ الفتح'
        },
        browser_snapshot: {
          done: 'تم التقاط لقطة للصفحة',
          pending: 'جارٍ التقاط لقطة للصفحة',
          pendingAction: 'جارٍ الالتقاط'
        },
        browser_take_screenshot: {
          done: 'تم التقاط لقطة شاشة',
          pending: 'جارٍ التقاط لقطة شاشة',
          pendingAction: 'جارٍ الالتقاط'
        },
        browser_type: {
          done: 'تمت الكتابة في الصفحة',
          pending: 'جارٍ الكتابة في الصفحة',
          pendingAction: 'جارٍ الكتابة'
        },
        clarify: {
          done: 'تم طرح سؤال',
          pending: 'جارٍ طرح سؤال',
          pendingAction: 'سؤال'
        },
        cronjob: {
          done: 'مهمة مجدولة',
          pending: 'جارٍ جدولة المهمة',
          pendingAction: 'جارٍ الجدولة'
        },
        edit_file: {
          done: 'تم تعديل الملف',
          pending: 'جارٍ تعديل الملف',
          pendingAction: 'جارٍ التعديل'
        },
        execute_code: {
          done: 'تم تنفيذ الكود',
          pending: 'جارٍ تشغيل السكربت',
          pendingAction: 'جارٍ تشغيل السكربت'
        },
        image_generate: {
          done: 'تم توليد الصورة',
          pending: 'جارٍ توليد الصورة',
          pendingAction: 'جارٍ التوليد'
        },
        list_files: {
          done: 'تم سرد الملفات',
          pending: 'جارٍ سرد الملفات',
          pendingAction: 'جارٍ السرد'
        },
        memory: {
          done: 'تم الحفظ في الذاكرة',
          pending: 'جارٍ الحفظ في الذاكرة',
          pendingAction: 'جارٍ الحفظ'
        },
        patch: {
          done: 'تم ترقيع الملف',
          pending: 'جارٍ ترقيع الملف',
          pendingAction: 'جارٍ الترقيع'
        },
        read_file: {
          done: 'تمت قراءة الملف',
          pending: 'جارٍ قراءة الملف',
          pendingAction: 'جارٍ القراءة'
        },
        search_files: {
          done: 'تم البحث في الملفات',
          pending: 'جارٍ البحث في الملفات',
          pendingAction: 'جارٍ البحث'
        },
        session_search_recall: {
          done: 'تم البحث في سجل الجلسات',
          pending: 'جارٍ البحث في سجل الجلسات',
          pendingAction: 'جارٍ البحث'
        },
        terminal: {
          done: 'تم تنفيذ الأمر',
          pending: 'جارٍ تنفيذ الأمر',
          pendingAction: 'جارٍ التنفيذ'
        },
        todo: {
          done: 'تم تحديث المهام',
          pending: 'جارٍ تحديث المهام',
          pendingAction: 'جارٍ التحديث'
        },
        vision_analyze: {
          done: 'تم تحليل الصورة',
          pending: 'جارٍ تحليل الصورة',
          pendingAction: 'جارٍ التحليل'
        },
        web_extract: {
          done: 'تمت قراءة صفحة الويب',
          pending: 'جارٍ قراءة صفحة الويب',
          pendingAction: 'جارٍ القراءة'
        },
        web_search: {
          done: 'تم البحث على الويب',
          pending: 'جارٍ البحث على الويب',
          pendingAction: 'جارٍ البحث'
        },
        write_file: {
          done: 'تم تعديل الملف',
          pending: 'جارٍ تعديل الملف',
          pendingAction: 'جارٍ التعديل'
        }
      }
    }
  },
  prompts: {
    gatewayDisconnected: 'بوابة Hermes غير متصلة',
    reconnect: 'إعادة الاتصال',
    sudoSendFailed: 'تعذّر إرسال كلمة مرور sudo',
    secretSendFailed: 'تعذّر إرسال السر',
    sudoTitle: 'كلمة مرور المسؤول',
    sudoDesc:
      'يحتاج Hermes إلى كلمة مرور sudo لتنفيذ أمر يتطلب صلاحيات. تُرسل فقط إلى الوكيل المحلي الخاص بك.',
    sudoCommandUnavailable:
      'لم يقدّم هذا الوكيل الأمر. ألغِ إذا لم تتمكن من التحقق منه في المحادثة.',
    sudoInstallDesc:
      'يحتاج Hermes إلى كلمة مرور sudo لتثبيت حزم Bot Screen (TigerVNC + Xfce) على مضيف البوابة. تُرسل إلى ذلك المضيف فقط.',
    sudoPlaceholder: 'كلمة مرور sudo',
    secretTitle: 'مطلوب سر',
    secretDesc: 'يحتاج Hermes إلى بيانات اعتماد للمتابعة.',
    secretPlaceholder: 'قيمة السر',
    vaultUnlockSendFailed: 'تعذّر إرسال كلمة المرور الرئيسية',
    vaultUnlockTitle: name => `فتح قفل ${name}`,
    vaultUnlockDesc: name =>
      `يريد الوكيل تسجيل الدخول إلى موقع ببيانات اعتماد محفوظة في ${name}. أدخل كلمة المرور الرئيسية لفتح القفل خلال هذه الجلسة: تُرسل مباشرة إلى ${name} على هذا الكمبيوتر، دون حفظها أو إظهارها للوكيل.`,
    vaultUnlockPlaceholder: 'كلمة المرور الرئيسية',
    vaultUnlockKeepLocked: 'إبقاء القفل',
    vaultUnlockConfirm: 'فتح القفل',
    vaultSaveSendFailed: 'تعذّر حفظ بيانات الاعتماد',
    vaultSaveTitle: site => `حفظ بيانات اعتماد ${site}؟`,
    vaultSaveDesc: origin =>
      `وصل Hermes إلى صفحة تسجيل دخول على ${origin} ولا يملك بيانات اعتماد لها. أدخلها مرة واحدة هنا: ستُشفَّر على هذا الكمبيوتر وتُملأ في الصفحة دون أن يرى النموذج كلمة المرور.`,
    vaultSaveIdentifierLabel: 'البريد الإلكتروني أو اسم المستخدم',
    vaultSaveIdentifierPlaceholder: 'you@example.com',
    vaultSavePasswordPlaceholder: 'كلمة المرور',
    vaultSaveFootnote: 'أدِر بيانات الاعتماد المحفوظة من الإعدادات ← كلمات المرور وبيانات الاعتماد.',
    vaultSaveDecline: 'عدم الحفظ',
    vaultSaveConfirm: 'حفظ وتسجيل الدخول',
    vaultCodeSendFailed: 'تعذّر إرسال الرمز',
    vaultCodeTitle: site => `رمز التحقق لـ ${site}`,
    vaultCodeDesc: site =>
      `يطلب ${site} رمزًا لمرة واحدة وصلك عبر SMS أو البريد الإلكتروني أو تطبيق مصادقة. أدخله هنا: سيملؤه Hermes في الصفحة دون أن يراه النموذج.`,
    vaultCodeLabel: 'الرمز',
    vaultCodeFootnote:
      'نصيحة: احفظ مفتاح المصادقة مع بيانات الاعتماد هذه من الإعدادات ← كلمات المرور وبيانات الاعتماد؛ وسيُدخل Hermes الرموز نيابةً عنك.',
    vaultCodeSkip: 'تخطٍّ',
    vaultCodeConfirm: 'إدخال الرمز'
  },
  desktop: {
    audioReadFailed: 'تعذّرت قراءة الصوت المسجّل',
    sessionUnavailable: 'الجلسة غير متاحة',
    createSessionFailed: 'تعذّر إنشاء جلسة جديدة',
    promptFailed: 'فشل الطلب',
    providerCredentialRequired: 'أضف بيانات اعتماد مزوّد قبل إرسال رسالتك الأولى.',
    emptySlashCommand: 'أمر مائل فارغ',
    desktopCommands: 'أوامر سطح المكتب',
    skillCommandsAvailable: count => `${count} أوامر مهارات متاحة.`,
    warningLine: message => `تحذير: ${message}`,
    yoloArmed: 'تم تفعيل YOLO لهذه المحادثة',
    yoloOff: 'تم تعطيل YOLO',
    yoloSystem: active => `YOLO ${active ? 'on' : 'off'} لهذه الجلسة`,
    yoloTitle: 'YOLO',
    yoloToggleFailed: 'تعذّر تبديل YOLO',
    profileStatus: current =>
      `ملف التعريف: ${current}. استخدم /profile <name> أو منتقي «جلسة جديدة» لبدء محادثة في ملف تعريف آخر.`,
    unknownProfile: 'ملف تعريف غير معروف',
    noProfileNamed: (target, available) => `لا يوجد ملف تعريف باسم «${target}». المتاح: ${available}`,
    newChatsProfile: name => `ستستخدم المحادثات الجديدة ملف التعريف ${name}.`,
    setProfileFailed: 'فشل تعيين ملف التعريف',
    sttDisabled: 'التعرّف على الكلام معطّل في الإعدادات.',
    stopFailed: 'فشل الإيقاف',
    regenerateFailed: 'فشلت إعادة التوليد',
    editFailed: 'فشل التعديل',
    editTurnUnavailable:
      'لم يعد هذا الدور موجودًا في سجل الخادم (ربما حُذف أثناء الضغط).',
    resumeFailed: 'فشل الاستئناف',
    readOnlyTranscriptTitle: 'مفتوحة للقراءة فقط',
    readOnlyTranscriptBody:
      'لا يوجد خادم خلفي متصل يتولى هذه المحادثة القديمة بعد، لذا فُتحت كنص للقراءة فقط. سجلها سليم، لكن الإرسال يبقى معطّلًا حتى يتولاها خادم خلفي.',
    readOnlyTranscriptSendBlocked:
      'هذه المحادثة مفتوحة كنص للقراءة فقط — الإرسال معطّل.',
    resumeStrandedTitle: 'تعذّر تحميل هذه الجلسة',
    resumeStrandedBody:
      'فشل الاتصال بهذه الجلسة وتوقفت المحاولات التلقائية. تأكد من أن البوابة تعمل، ثم حاول مرة أخرى.',
    poolSlotTimeoutBody:
      'كل خانات الخادم الخلفي المحلي مشغولة. زِد عدد الخوادم الخلفية للبوتات التي تبقى نشطة من الإعدادات ← متقدم، أو حاول مرة أخرى بعد إخلاء خادم خلفي خامل.',
    poolSlotTimeoutOpenSettings: 'فتح الإعدادات المتقدمة',
    resumeRetry: 'إعادة المحاولة',
    nothingToBranch: 'لا يوجد ما يمكن تفريعه',
    branchNeedsChat: 'ابدأ محادثة أو استأنفها قبل إنشاء فرع.',
    sessionBusy: 'الجلسة مشغولة',
    branchStopCurrent: 'أوقف الدور الحالي قبل إنشاء فرع لهذه المحادثة.',
    branchNoText: 'لا تحتوي هذه الرسالة على نص يمكن التفريع منه.',
    branchTitle: n => `مسودة: فرع رقم ${n}`,
    branchFailed: 'فشل إنشاء الفرع',
    deleteFailed: 'فشل الحذف',
    archived: 'تمت الأرشفة',
    archiveFailed: 'فشلت الأرشفة',
    restored: 'تمت الاستعادة',
    unarchiveFailed: 'فشلت الاستعادة',
    cwdChangeFailed: 'فشل تغيير مجلد العمل',
    cwdStagedTitle: 'مجلد العمل في انتظار التطبيق',
    cwdStagedMessage: 'أعد تشغيل الخادم الخلفي لسطح المكتب لتطبيق تغييرات cwd على هذه الجلسة النشطة.',
    modelSwitchConfirmBody: 'يتطلب تغيير النموذج هذا تأكيدًا.',
    modelSwitchConfirmLabel: 'التغيير على أي حال',
    modelSwitchConfirmTitle: model => `التبديل إلى ${model}؟`,
    modelSwitchConfirmTitleFallback: 'تغيير النموذج؟',
    modelSwitchFailed: 'فشل تغيير النموذج',
    modelSwitchKeepLabel: 'الإبقاء على النموذج الحالي',
    modelSwitchStaleNotice: 'تغيّر التحديد — لم يُطبَّق تغيير النموذج.',
    hydrationSyncing: (profile: string) => `جارٍ مزامنة ${profile}…`,
    sessionExported: 'تم تصدير الجلسة',
    sessionExportFailed: 'تعذّر تصدير الجلسة',
    imageSaved: 'تم حفظ الصورة',
    downloadStarted: 'بدأ التنزيل',
    restartToUseSaveImage: 'أعد تشغيل Hermes Desktop لاستخدام حفظ الصورة.',
    restartToSaveImages: 'أعد تشغيل Hermes Desktop لحفظ الصور',
    imageDownloadFailed: 'فشل تنزيل الصورة',
    openImage: 'فتح الصورة',
    downloadImage: 'تنزيل الصورة',
    savingImage: 'جارٍ حفظ الصورة',
    imagePreviewFailed: 'فشلت معاينة الصورة',
    imageAttach: 'صورة مرفقة',
    imageWriteFailed: 'فشلت كتابة الصورة على القرص.',
    imageAttachFailed: 'فشل إرفاق الصورة',
    attachFailed: 'فشل الإرفاق',
    pastedContent: 'محتوى ملصوق',
    pasteAttachFailed: 'تعذّر إرفاق النص الملصوق',
    attachImages: 'إرفاق صور',
    clipboard: 'الحافظة',
    noClipboardImage: 'لم يتم العثور على صورة في الحافظة',
    clipboardPasteFailed: 'فشل اللصق من الحافظة',
    dropFiles: 'إفلات الملفات',
    dropFilesMore: (count: number) => `و${count} أخرى`,
    handoff: {
      pickPlatform: 'اختر وجهة',
      success: platform => `تم التحويل إلى ${platform}. يمكنك المتابعة من هنا في أي وقت.`,
      systemNote: platform => `↻ تم التحويل إلى ${platform} — يمكنك المتابعة من هنا في أي وقت.`,
      failed: error => `فشل التحويل: ${error}`,
      timedOut: 'انتهت المهلة أثناء انتظار البوابة. هل `hermes gateway` قيد التشغيل؟',
      startMessaging: 'بدء المراسلة'
    }
  },
  tips: {
    close: 'عدم إظهار هذه النصيحة مرة أخرى',
    items: {
      'new-session': {
        title: 'ابدأ من جديد',
        text: 'كل محادثة جديدة لها سياقها وطرفيتها ومجلد عملها الخاص.'
      },
      skills: {
        title: 'علّمه مرة واحدة بس',
        text: 'المهارات مجلدات تعليمات يحمّلها Hermes عندما يحتاج العمل إليها.'
      },
      messaging: {
        title: 'Hermes بعيدًا عن مكتبك',
        text: 'اربط Telegram وDiscord وSlack وغيرها: الوكيل نفسه، والذاكرة نفسها.'
      },
      artifacts: {
        title: 'كل ما أنشأه Hermes',
        text: 'صور وملفات وروابط من كل جلسة، مفهرسة في مكان واحد.'
      },
      cron: {
        title: 'شغل بيشتغل لوحده',
        text: 'جدول طلبًا كل ساعة، أو كل ليلة، أو بتعبير cron.'
      },
      'command-palette': {
        title: 'مكان واحد لكل حاجة',
        text: 'الجلسات والإعدادات والمهارات والأوامر كلها متاحة من لوحة الأوامر.'
      },
      profiles: {
        title: 'ملفات التعريف منفصلة',
        text: 'لكل ملف Hermes خاص به، بمفاتيحه وذاكرته وجلساته.'
      },
      'composer-mentions': {
        title: 'أرفق وأصدر الأوامر',
        text: 'اكتب @ لإرفاق ملف بالمحادثة، أو / لتنفيذ أمر.'
      },
      'local-runtime-update': {
        title: 'يتوفر تحديث للمحرّك المحلي',
        text: 'حدّث المحرّك الذي يشغّل نماذجك المحلية. قد تنقطع الطلبات المحلية الجارية.',
        action: 'التحديث الآن'
      },
      'right-pane': {
        title: 'لوحة العمل',
        text: 'الملفات والطرفية والمراجعة والمتصفح المدمج تتشارك الجانب الأيمن من التطبيق.'
      }
    }
  },
  errors: {
    genericFailure: 'حدث خطأ',
    boundaryTitle: 'حدثت مشكلة في الواجهة',
    boundaryDesc: 'واجه العرض خطأً غير متوقع. محادثاتك وإعداداتك في أمان.',
    boundaryDetails: 'التفاصيل',
    sendDiagnostics: 'إرسال التشخيصات',
    reloadWindow: 'إعادة تحميل النافذة',
    openLogs: 'فتح السجلات'
  },
  ui: {
    search: {
      clear: 'مسح البحث'
    },
    logs: {
      bottom: 'الانتقال إلى النهاية',
      search: 'ابحث في السجلات…',
      top: 'الانتقال إلى البداية'
    },
    pagination: {
      label: 'ترقيم الصفحات',
      previous: 'السابق',
      previousAria: 'الانتقال إلى الصفحة السابقة',
      next: 'التالي',
      nextAria: 'الانتقال إلى الصفحة التالية'
    },
    sidebar: {
      title: 'الشريط الجانبي',
      description: 'يعرض الشريط الجانبي للجوّال.',
      toggle: open => `${open ? 'إظهار' : 'إخفاء'} الشريط الجانبي`
    }
  }
} satisfies TranslationOverrides

// Merge in Arabic for English keys the French-shaped overlay does not carry (see ar_gaps.ts).
export const arOverrides = mergeTranslations<TranslationOverrides>(
  arBaseOverrides,
  arGapFills satisfies TranslationOverrides
) as typeof arBaseOverrides & typeof arGapFills

export const ar = defineLocale(arOverrides)
