// Desktop-side /rollback /agents /config /history /save /export /import /timestamps lines
// (en_desktop_commands.ts is the source).
export const arDesktopCommands = {
  error: (message: string) => `خطأ: ${message}`,
  rollbackUsage: 'الاستخدام: /rollback [list] | diff <n|hash> | <n|hash> [file] [--all]',
  checkpointsDisabled: 'نقاط الاستعادة غير مفعّلة لهذه الجلسة (اضبط checkpoints.enabled في config.yaml).',
  checkpointsEmpty: 'لا توجد نقاط استعادة بعد لمجلد العمل هذا.',
  checkpointsHeader: 'نقاط الاستعادة (الأحدث أولًا):',
  checkpointsHint:
    'استعد باستخدام /rollback <n> [file] (أضف --all للكتابة فوق تعديلاتك أيضًا)؛ واعرض المعاينة باستخدام /rollback diff <n>.',
  noDiff: 'لا توجد تغييرات منذ نقطة الاستعادة هذه.',
  rollbackFailed: (error: string) => `تعذّرت الاستعادة: ${error}`,
  unknownError: 'خطأ غير معروف',
  restored: (hash: string) => (hash ? `تمت استعادة نقطة الاستعادة ${hash}.` : 'تمت استعادة نقطة الاستعادة.'),
  rewound: (count: string) => `تم إرجاع ${count} رسالة من هذه المحادثة.`,
  reopenForRewind: 'أعد فتح هذه المحادثة لرؤيتها بعد الإرجاع.',
  agentsEmpty: 'لا يوجد وكلاء فرعيون نشطون أو عمليات في الخلفية في هذه المحادثة.',
  subagentsHeader: (count: string) => `الوكلاء الفرعيون (${count}):`,
  subagentFallback: 'وكيل فرعي',
  statusRunning: 'قيد التشغيل',
  toolCalls: (count: string) => `${count} استدعاء أداة`,
  processesHeader: (count: string) => `العمليات في الخلفية (${count}):`,
  configHeader: 'التهيئة (إعدادات العرض والموافقات واللصق والصوت؛ لا يُعرض غيرها):',
  configDefaults: '(القيم الافتراضية)',
  configFooter: 'غيّر الإعدادات من «الإعدادات»، أو عدّل config.yaml باستخدام `hermes config edit` على جهاز البوابة.',
  historyHeader: (count: string) => `سجل المحادثة (${count} رسالة):`,
  historyEmpty: 'لا توجد رسائل بعد.',
  historyYou: 'أنت',
  historyHermes: 'Hermes',
  saveUsage: 'الاستخدام: /save [json|md|html] [filename] [redact]',
  saveLegacyRefused:
    'لم يتم الحفظ: لا تستطيع هذه البوابة تصدير نسخة منقّحة أو مسمّاة أو بغير صيغة JSON. حدّث البوابة، أو شغّل /save دون خيارات لكتابة JSON خام على جهاز البوابة.',
  savedOnHost: (path: string) => `تم الحفظ على جهاز البوابة: ${path}`,
  unknownPath: '(مسار غير معروف)',
  saveUnsupported: 'خطأ: لا يستطيع إصدار سطح المكتب هذا حفظ الملفات',
  saveDialogTitle: 'حفظ المحادثة',
  savedTo: (path: string) => `تم حفظ المحادثة في ${path}`,
  saveCancelled: 'لم يتم الحفظ (أُلغي).',
  exportRemote:
    'يحزم /export ملف تعريف من جهاز البوابة، وهو ليس هذا الجهاز. شغّل `hermes profile export` على ذلك الجهاز.',
  importRemote:
    'يثبّت /import ملف تعريف على جهاز البوابة، وهو ليس هذا الجهاز. شغّل `hermes profile import <archive>` على ذلك الجهاز.',
  timestampsUsage: 'الاستخدام: /timestamps [on|off|status]',
  timestampsOn: 'الطوابع الزمنية: مفعّلة (لهذه النافذة؛ اضبط display.timestamps في config.yaml للإبقاء عليها)',
  timestampsOff: 'الطوابع الزمنية: معطّلة (لهذه النافذة؛ اضبط display.timestamps في config.yaml للإبقاء عليها)'
}
