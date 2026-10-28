import type { ClarifyCopy } from './types_clarify'

export const arClarify: Partial<ClarifyCopy> = {
  notReady: 'طلب التوضيح غير جاهز بعد',
  gatewayDisconnected: 'Hermes غير متصل الآن. أعد الاتصال ثم أرسله مرة أخرى.',
  sendFailed: 'تعذّر إرسال رد التوضيح',
  loadingQuestion: 'جارٍ تحميل السؤال…',
  other: 'غير ذلك (اكتب إجابتك)',
  placeholder: 'اكتب إجابتك…',
  skip: 'تخطٍّ',
  skipped: 'تم التخطي',
  noAnswer: 'لا توجد إجابة',
  confirmAndContinueLabel: 'تأكيد ومتابعة',
  singleSelectHint: 'اختر إجابة واحدة',
  multiSelectHint: 'اختر كل ما ينطبق',
  oneQuestion: 'سؤال واحد',
  questionProgress: (answered, total) => `تمت الإجابة عن ${answered} من ${total}`,
  notDelivered:
    'لم يصل هذا السؤال إلى التطبيق، لذا لا يمكن الإجابة عنه هنا. اضغط «إيقاف» لإنهاء الدور، ثم رد في المحادثة.'
}
