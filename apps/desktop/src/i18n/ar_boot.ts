import type { TranslationOverrides } from './define-locale'

// The boot screen's copy (including the update-hold screen), composed by ar.ts.
export const arBoot = {
  boot: {
    ready: 'Hermes Desktop جاهز',
    desktopBootFailedWithMessage: message => `تعذّر تشغيل التطبيق: ${message}`,
    steps: {
      connectingGateway: 'جارٍ الاتصال ببوابة سطح المكتب',
      loadingSettings: 'جارٍ تحميل إعدادات Hermes',
      loadingSessions: 'جارٍ تحميل الجلسات الأخيرة',
      retryingRemoteBackend: 'جارٍ إعادة الاتصال بخادم Hermes البعيد…',
      startingDesktopConnection: 'جارٍ بدء اتصال سطح المكتب',
      startingHermesDesktop: 'جارٍ تشغيل Hermes Desktop…'
    },
    errors: {
      backgroundExited:
        'أُغلقت الخدمة التي تشغّل محادثاتك بشكل غير متوقع. أعد تشغيلها للمتابعة، فمحادثاتك وإعداداتك في أمان.',
      backgroundExitedDuringStartup: 'توقف Hermes مباشرة بعد بدء تشغيله.',
      backendStopped: 'توقف Hermes عن العمل في الخلفية',
      restartHermes: 'إعادة تشغيل Hermes',
      openLogs: 'فتح السجلات',
      desktopBootFailed: 'تعذّر تشغيل Hermes',
      gatewayConnectionLost: 'فقد Hermes الاتصال',
      gatewayConnectionLostDetail:
        'ما زلنا نحاول إعادة الاتصال. يمكنك متابعة القراءة والكتابة. إذا استمر ذلك، أعد الاتصال الآن أو راجع إعدادات الاتصال.',
      reconnectNow: 'إعادة الاتصال الآن',
      connectionSettings: 'إعدادات الاتصال',
      gatewaySignInRequired: 'سجّل Hermes البعيد خروجك',
      gatewaySignInRequiredDetail: 'سجّل الدخول مرة أخرى لإعادة الاتصال. محادثاتك وإعداداتك في أمان.',
      signInAgain: 'تسجيل الدخول مرة أخرى',
      ipcBridgeUnavailable: 'تعذّر على Hermes Desktop التواصل مع طبقته الخلفية. أعد تشغيل التطبيق.'
    },
    causes: {
      exitedEarly: 'توقفت خدمة Hermes الخلفية مباشرة بعد بدء تشغيلها.',
      timedOut: 'لم تستجب خدمة Hermes الخلفية في الوقت المحدد.',
      permission: 'تعذّر على Hermes الكتابة في مجلد بياناته (مشكلة في الصلاحيات).',
      diskFull: 'القرص ممتلئ، لذا تعذّر تشغيل Hermes.',
      portInUse: 'برنامج آخر يستخدم منفذ الشبكة الذي يحتاجه Hermes.',
      installMissing: 'جزء من تثبيت Hermes مفقود. اختر «إصلاح التثبيت» لاستعادته.'
    },
    failure: {
      title: 'تعذّر تشغيل Hermes',
      description:
        'لم تبدأ خدمة Hermes الخلفية. جرّب إحدى خطوات الاسترداد أدناه. لا شيء هنا يحذف محادثاتك أو إعداداتك.',
      details: 'التفاصيل',
      remoteTitle: 'يلزم تسجيل الدخول إلى البوابة البعيدة',
      remoteDescription:
        'انتهت صلاحية جلستك على البوابة البعيدة. سجّل الدخول مرة أخرى لإعادة الاتصال. لا شيء هنا يحذف محادثاتك أو إعداداتك.',
      webappTitle: 'تسجيل الدخول إلى Hermes',
      webappDescription: 'شغّل hermes webapp على هذا الكمبيوتر لتسجيل دخول هذا المتصفح.',
      retry: 'إعادة المحاولة',
      repairInstall: 'إصلاح التثبيت',
      useLocalGateway: 'استخدام البوابة المحلية',
      gatewaySettings: 'إعدادات البوابة',
      back: 'رجوع',
      openLogs: 'فتح السجلات',
      repairHint: 'يعيد الإصلاح تشغيل المثبّت، وقد يستغرق بضع دقائق على جهاز جديد.',
      bundledReinstallHint:
        'لا يمكن لهذا التثبيت المدمج إصلاح نفسه من داخل التطبيق. أعد تثبيت التطبيق لاستعادة الخادم الخلفي.',
      reinstallApp: 'إعادة تثبيت التطبيق',
      remoteSignInHint: signInLabel =>
        `يسجّل الخروج من جلسة المتصفح البعيدة المحفوظة، ثم يفتح ${signInLabel}. استخدم البوابة المحلية للتبديل إلى الخادم الخلفي المدمج بدلًا من ذلك.`,
      signOutAndSignIn: 'تسجيل الخروج ثم الدخول',
      remoteFailureHint: 'تحقّق من عنوان URL للبوابة وتسجيل الدخول في إعدادات البوابة، أو انتقل إلى البوابة المحلية.',
      cloudDownTitle: 'وكيل Nous Cloud متوقف',
      cloudDownDescription:
        'الوكيل السحابي الذي تديره Nous وتتصل به هذه البوابة يُرجع خطأ في الخادم. لا يمكن إعادة تشغيله من هنا. تحقّق من حالته، أو انتقل إلى البوابة المحلية، أو اطلب الدعم.',
      cloudDownHint: 'تفتح الأزرار أدناه Nous Portal (حالة المثيل والتحكم فيه) وخادم Discord الخاص بنا للدعم.',
      cloudDownCheckPortal: 'التحقق من الحالة في Portal',
      cloudDownDiscord: 'طلب المساعدة على Discord',
      hideRecentLogs: 'إخفاء السجلات الأخيرة',
      showRecentLogs: 'عرض السجلات الأخيرة',
      signedInTitle: 'تم تسجيل الدخول',
      signedInMessage: 'جارٍ إعادة الاتصال بالبوابة البعيدة…',
      signInIncompleteTitle: 'لم يكتمل تسجيل الدخول',
      signInIncompleteMessage: 'أُغلقت نافذة تسجيل الدخول قبل انتهاء المصادقة.',
      signInFailed: 'تعذّر تسجيل الدخول',
      signInToRemoteGateway: 'تسجيل الدخول إلى البوابة البعيدة',
      signInWithProvider: provider => `تسجيل الدخول باستخدام ${provider}`,
      identityProvider: 'مزوّد الهوية الخاص بك'
    },
    updateHold: {
      title: 'تحديث سابق ما زال يوقف Hermes',
      titleUnverified: 'لا يستطيع Hermes التأكد من انتهاء التحديث الأخير',
      description:
        'ينتظر Hermes قبل التشغيل حتى لا يحمّل ملفات قد يكون التحديث ما زال يغيّرها. سيبدأ تلقائيًا فور انتهاء الإيقاف.',
      heldByProcess: pid => `انتهى التحديث (العملية ${pid})، لكن عملية بدأها ما زالت تحجز تثبيت Hermes.`,
      heldUnknown: 'انتهى تحديث، لكن عملية بدأها ما زالت تحجز تثبيت Hermes.',
      unverified: 'تعذّر على مساعد التحديث التحقق من الجهة التي تحجز تثبيت Hermes الآن. يواصل Hermes التحقق.',
      since: time => `في الانتظار منذ ${time}`,
      lastChecked: time => `آخر تحقق ${time}`,
      recoveryHint:
        'يُحل هذا عادةً خلال دقائق. إن لم يحدث: أغلق Hermes، وأنهِ عمليات git أو hermes المتبقية (أو أعد تشغيل الكمبيوتر)، ثم افتح Hermes مرة أخرى.',
      checkAgain: 'التحقق مرة أخرى',
      quit: 'إنهاء Hermes',
      openLogs: 'فتح السجلات',
      startAnyway: 'التشغيل على أي حال…',
      confirmTitle: 'تشغيل Hermes بينما ما زال التحديث يحجزه؟',
      confirmBody:
        'قد تكون عملية التحديث المتبقية ما زالت تغيّر ملفات Hermes. التشغيل الآن قد يحمّل تثبيتًا محدّثًا جزئيًا، وقد لا يعمل حتى تشغّل التحديث مرة أخرى. يسجّل Hermes هذا الاختيار في سجله ويترك علامة التحديث في مكانها.',
      confirmKeepWaiting: 'مواصلة الانتظار',
      confirmStart: 'التشغيل على أي حال',
      startAnywayRefused: 'تغيّر ما يحجز التثبيت قبل أن يتمكن Hermes من التشغيل. راجعه وحاول مرة أخرى.'
    }
  }
} satisfies Pick<TranslationOverrides, 'boot'>
