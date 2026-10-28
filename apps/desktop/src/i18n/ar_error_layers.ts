import type { Translations } from './types'

type ThreadCopy = Translations['assistant']['thread']

// The error card's layer fallbacks (lib/error-surface-copy.ts): used when a failure code has no own entry.
export const arErrorLayers: Pick<ThreadCopy, 'errorLayerBodies' | 'errorLayers'> = {
  errorLayers: {
    auth: 'مشكلة في تسجيل الدخول',
    billing: 'نفد الرصيد',
    disk: 'القرص ممتلئ',
    endpoint: 'تعذّر الوصول إلى خادم النموذج',
    gateway: 'واجه Hermes مشكلة',
    generic: 'تعذّر على Hermes إكمال هذا الرد',
    provider: 'أرجعت خدمة الذكاء الاصطناعي خطأ',
    runtime: 'واجه Hermes مشكلة',
    streaming: 'انقطع الرد'
  },
  errorLayerBodies: {
    auth: 'رفضت خدمة الذكاء الاصطناعي تسجيل دخولك. تحقّق من بيانات الاعتماد لهذا المزوّد، ثم أرسل رسالتك مرة أخرى.',
    billing: 'لم يتبقَّ رصيد في حسابك لدى هذا المزوّد. اشحن الرصيد أو بدّل المزوّد، ثم أرسل مرة أخرى.',
    disk: 'قرصك ممتلئ، لذا تعذّر على Hermes حفظ هذه المحادثة. وفّر بعض المساحة، ثم أعد المحاولة.',
    endpoint: 'تعذّر على Hermes الوصول إلى خادم النموذج المخصص. تأكد من أنه يعمل، ثم أرسل رسالتك مرة أخرى.',
    gateway:
      'واجه Hermes مشكلة داخلية عند بدء هذا الرد. أرسل رسالتك مرة أخرى؛ وإذا تكرر ذلك، أرسل بيانات التشخيص.',
    generic: 'حدث خطأ أثناء رد Hermes. أعد المحاولة، أو انسخ التفاصيل إذا تكرر ذلك.',
    provider: 'تعذّر على خدمة الذكاء الاصطناعي إكمال هذا الطلب. أعد المحاولة بعد قليل أو بدّل المزوّد.',
    runtime:
      'واجه Hermes مشكلة داخلية عند بدء هذا الرد. أرسل رسالتك مرة أخرى؛ وإذا تكرر ذلك، أرسل بيانات التشخيص.',
    streaming: 'انقطع الاتصال قبل اكتمال الرد. أعد المحاولة لإرساله مرة أخرى.'
  }
}
