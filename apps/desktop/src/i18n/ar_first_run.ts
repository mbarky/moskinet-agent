import type { FirstRunCopy } from './types_first_run'

export const arFirstRun: FirstRunCopy = {
  beats: {
    name: 'الاسم',
    theme: 'لون التمييز',
    layout: 'التخطيط',
    connectors: 'التطبيقات',
    plugins: 'الإضافات',
    tour: 'الجولة',
    build: 'أول مهمة'
  },
  namePlaceholder: 'اسمك',
  useName: name => `استخدام «${name}»`,
  install: 'تثبيت',
  installed: 'مثبّت',
  loading: 'جارٍ التحميل…',
  noPlugins: 'لا توجد إضافات لعرضها الآن.',
  noneChosen: 'لا شيء',
  noAnswer: 'لا توجد إجابة',
  answerRefused: 'لم تُقبل الإجابة',
  tours: {
    quick: 'جولة سريعة',
    full: 'اعرض لي كل شيء',
    skip: 'تخطٍّ، لنبنِ شيئًا'
  },
  skippedAll: 'تم تخطي الإعداد',
  skip: 'تخطي الإعداد',
  skipTip: 'إنهاء الإعداد الموجّه وفتح محادثة جديدة.',
  skipFailed: 'تعذّر تخطي الإعداد',
  slashOffTitle: 'الأوامر المائلة معطّلة أثناء الإعداد',
  slashOffBody: 'ستعمل كالمعتاد بعد انتهاء الإعداد.',
  localModel: {
    title: 'يستطيع هذا الكمبيوتر تشغيل نموذج محليًا',
    text: (model, size) => `${model} (${size}) يناسب جهازك. يعمل مجانًا، وتبقى محادثاتك على هذا الكمبيوتر.`,
    setUp: 'إعداده',
    notNow: 'ليس الآن'
  },
  intro: {
    greeting: 'أهلاً، أنا Hermes.',
    plan: 'خلّينا نجهّز كل حاجة ليك، وبعدها نعمل حاجة حلوة.'
  },
  rerun: {
    title: 'تشغيل الإعداد الأولي مرة أخرى',
    description: 'افتح محادثة إعداد جديدة تمر بخطوات التشغيل الأول باستخدام نموذجك الحالي.',
    action: 'التشغيل مرة أخرى',
    failed: 'تعذّر بدء الإعداد الأولي'
  }
}
