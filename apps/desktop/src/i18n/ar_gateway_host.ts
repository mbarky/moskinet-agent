import type { GatewayHostTranslations } from './types_gateway_host'

// Settings → Gateways copy where the connection cannot change, spread into ar.ts.
export const arGatewayHost: GatewayHostTranslations = {
  unavailableTitle: 'إعدادات البوابة غير متاحة',
  unavailableDesc: 'لا يمكن تغيير إعدادات الاتصال إلا من تطبيق Hermes Desktop على الكمبيوتر الذي يشغّله.',
  webappHostTitle: 'مضيف Hermes',
  webappHostDesc:
    'يستخدم Webapp دائمًا مضيف Hermes الذي يقدّمه. لتبديل البوابات أو تسجيل الدخول إلى Hermes Cloud أو إدارة الاتصالات المحفوظة، استخدم تطبيق Hermes Desktop.',
  webAccess: {
    title: 'الوصول عبر الويب',
    intro:
      'افتح Hermes على هذا الكمبيوتر من هاتفك أو من كمبيوتر آخر، مسجّلًا الدخول بحساب Nous. أي شخص يسجّل الدخول يمكنه تشغيل أوامر على هذا الكمبيوتر.',
    failed: 'تعذّر تغيير الوصول عبر الويب',
    running: 'قيد التشغيل',
    stopped: 'متوقف',
    starting: 'جارٍ البدء',
    stopping: 'جارٍ الإيقاف',
    restartNeeded: 'يلزم إعادة التشغيل',
    unavailable: 'غير متاح',
    notRunningDetail: 'شغّله لفتح Hermes من جهاز آخر.',
    needsNous: 'سجّل الدخول إلى حساب Nous من «المزوّدون» أولًا.',
    runningLan: 'افتح هذا العنوان على جهاز متصل بالشبكة نفسها.',
    runningPublic: 'يُقدَّم عبر عنوان URL الخاص بك.',
    runningLocal: 'لا يمكن فتحه إلا من هذا الكمبيوتر. أوقفه ثم شغّله مرة أخرى لفتحه من أجهزة أخرى.',
    pendingOn: 'تم الحفظ. ستقدّم البوابة تطبيق الويب بعد إعادة تشغيلها.',
    pendingOff: 'تم الإيقاف، لكن البوابة تواصل تقديم تطبيق الويب حتى إعادة تشغيلها.',
    unavailableDetail: reason => `تعذّر على البوابة تقديم تطبيق الويب: ${reason}`,
    restartBusy: 'تم الحفظ. هناك محادثة قيد التشغيل، لذا لم تُعِد البوابة التشغيل. اختر «إعادة تشغيل البوابة» بعد انتهائها.',
    restartFailed: 'تم الحفظ، لكن تعذّرت إعادة تشغيل البوابة. اختر «إعادة تشغيل البوابة» للمحاولة مرة أخرى.',
    startTimedOut: 'لم تقدّم البوابة تطبيق الويب خلال 90 ثانية.',
    stopTimedOut: 'لم تتوقف البوابة عن تقديم تطبيق الويب خلال 90 ثانية.',
    start: 'تشغيل',
    stop: 'إيقاف',
    restartGateway: 'إعادة تشغيل البوابة',
    modeLan: 'هذه الشبكة',
    modeLanDetail: url => `تفتح الأجهزة المتصلة بشبكة Wi-Fi لديك ${url}. استخدمه فقط على شبكة تثق بها.`,
    lanUnencrypted: 'الاتصال غير مشفّر: يمكن للآخرين على هذه الشبكة قراءة ما ترسله وتستقبله.',
    noLan: 'ليس لهذا الكمبيوتر عنوان شبكة يمكن للأجهزة الأخرى الوصول إليه.',
    modePublic: 'عنوان URL خاص بي',
    modePublicDetail: port =>
      `عنوان HTTPS تشغّله بالفعل، مثل Tailscale Serve أو نفق، يعيد التوجيه إلى http://127.0.0.1:${port}.`
  }
}
