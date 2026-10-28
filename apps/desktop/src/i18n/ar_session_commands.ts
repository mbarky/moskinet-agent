// Typed /undo /retry /steer /queue lines (en_session_commands.ts is the source).
export const arSessionCommands = {
  undoUsage: 'الاستخدام: /undo [N]',
  undoNothing: 'لا يوجد ما يمكن التراجع عنه',
  undidOne: (count: string) => `تم التراجع عن ${count} رسالة — الرسالة المحذوفة في مربع الكتابة`,
  undidOther: (count: string) => `تم التراجع عن ${count} رسائل — الرسالة المحذوفة في مربع الكتابة`,
  retryNothing: 'لا يوجد ما يمكن إعادة محاولته',
  retryUnsupported: '/retry: إعادة المحاولة لا تدعم الوسائط أو أجزاء المحتوى غير المعروفة',
  busy: (command: string) =>
    `الجلسة مشغولة — ما زال Hermes يرد. أوقف الرد الحالي أولًا (زر «إيقاف»، أو Ctrl+C في الطرفية)، ثم شغّل /${command}.`,
  busyCompressing: (command: string) => `الجلسة مشغولة — هناك /compress قيد التشغيل؛ شغّل /${command} بعد انتهائه.`,
  steerUsage: 'الاستخدام: /steer <prompt>',
  steerQueued: (preview: string) => `تمت جدولة التوجيه — يصل بعد استدعاء الأداة التالي: «${preview}»`,
  steerNoActiveTurn: (preview: string) => `لا يوجد دور نشط — أُضيف إلى قائمة الانتظار للدور التالي: «${preview}»`,
  steerRejected: 'رُفض التوجيه — لا يوجد دور نشط، أُضيف إلى قائمة الانتظار للدور التالي',
  queued: (preview: string) => `في قائمة الانتظار: «${preview}»`,
  queueFailed: 'تعذّرت إضافة الرسالة إلى قائمة الانتظار',
  countOne: (count: string) => `${count} رسالة في قائمة الانتظار`,
  countOther: (count: string) => `${count} رسائل في قائمة الانتظار`,
  queueEditKeptTitle: 'لم تتغير الرسالة في قائمة الانتظار',
  queueEditKept: 'بدأ تنفيذها أو رُفضت قبل حفظ تعديلك. نصّك المعدّل موجود في مربع الكتابة.',
  queueEditUnconfirmedTitle: 'لم يتم تأكيد التعديل',
  queueEditUnconfirmed:
    'تعذّر على Hermes تأكيد تعديلك. احفظ مرة أخرى لإعادة محاولة التعديل نفسه؛ لن يُضاف إلى قائمة الانتظار مرتين أبدًا.'
}
