import type { TranslationOverrides } from './define-locale'
import { arDesktopCommands } from './ar_desktop_commands'
import { arSessionCommands } from './ar_session_commands'

// Shell notices (remote-display toast, butterbar, keep-awake offer), spread into ar.ts.
export const arNotices = {
  remoteDisplayBanner: {
    message: reason =>
      `العرض البرمجي مفعّل؛ تم اكتشاف عرض عن بُعد (${reason}). تم تعطيل تسريع GPU لمنع الوميض.`
  },
  butterbar: {
    goTo: (index, total) => `عرض الإشعار ${index} من ${total}`,
    legal: {
      before: 'يخضع استخدام Hermes Agent لـ ',
      terms: 'شروط الخدمة',
      between: ' و',
      privacy: 'سياسة الخصوصية',
      after: '.'
    }
  },
  promptNotices: {
    legacySendUnconfirmed:
      'لم يتمكن هذا الخادم من تأكيد الإرسال السابق لهذه الرسالة، لذا ربما تكون قد نُفِّذت بالفعل. راجع المحادثة قبل إرسالها مرة أخرى.',
    restoredDraftAttachmentsDropped: 'لم تتم استعادة مرفقات رسالتك غير المرسلة. أرفقها مرة أخرى قبل الإرسال.',
    mcpReloadDeferred:
      'هذه المحادثة مشغولة: يُطبَّق تغيير MCP بعد انتهاء دورها وإعادة تحميل MCP مرة أخرى، أو عند إعادة فتح المحادثة',
    mcpReloadUnavailable: servers => `تعذّر الاتصال: ${servers}`,
    compactedTurnUnavailable: 'تم تلخيص هذه الرسالة عند ضغط المحادثة، لذا لا يمكن استعادتها أو تعديلها بعد الآن.',
    staleTurnUnavailable: 'لم تعد هذه الرسالة موجودة في سجل هذه المحادثة.',
    sessionCommands: arSessionCommands,
    desktopCommands: arDesktopCommands
  },
  keepAwakeOffer: {
    title: 'دخل جهازك في وضع السكون أثناء عمل Hermes',
    message:
      'يستطيع Hermes إبقاء جهازك مستيقظًا أثناء تشغيل مهمة. ستنطفئ الشاشة كالمعتاد، وقد يدخل الجهاز في السكون عند العمل على البطارية.',
    action: 'إبقاء الجهاز مستيقظًا أثناء العمل'
  },
  billingBlock: {
    titleNous: 'نفد رصيد Nous',
    titleProvider: provider => `نفد الرصيد — ${provider}`,
    fallbackMessage: 'نفد رصيد حسابك. أضف رصيدًا للمتابعة.',
    openBilling: 'فتح الفوترة',
    addCredits: 'إضافة رصيد',
    dismiss: 'إغلاق'
  }
} satisfies Pick<
  TranslationOverrides,
  'remoteDisplayBanner' | 'butterbar' | 'promptNotices' | 'keepAwakeOffer' | 'billingBlock'
>
