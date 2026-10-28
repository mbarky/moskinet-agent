import type { TranslationOverrides } from './define-locale'

export const arOnboarding: TranslationOverrides['onboarding'] = {
  headerTitle: 'لنجهّز لك Hermes Agent',
  headerDesc: 'اربط مزوّد نماذج لتبدأ المحادثة. معظم الخيارات تحتاج إلى نقرة واحدة.',
  preparingInstall: 'يُنهي Hermes التثبيت. يستغرق ذلك عادةً أقل من دقيقة في التشغيل الأول.',
  starting: 'جارٍ تشغيل Hermes…',
  setupSlowTitle: 'يستغرق الإعداد وقتًا أطول من المعتاد.',
  setupSlowBody: 'ما زال Hermes يبدأ التشغيل في الخلفية.',
  continueWithoutSetup: 'المتابعة دون إعداد',
  lookingUpProviders: 'جارٍ البحث عن المزوّدين…',
  collapse: 'طي',
  otherProviders: 'مزوّدون آخرون',
  haveApiKey: 'لدي مفتاح API',
  chooseLater: 'سأختار مزوّدًا لاحقًا',
  recommended: 'مُوصى به',
  connected: 'متصل',
  featuredPitch: 'اشتراك واحد وأكثر من 300 نموذج متقدم — الطريقة الموصى بها لتشغيل Hermes',
  fireworksPitch: 'API مباشر للنماذج — نماذج متقدمة مستضافة على Fireworks',
  localModelsTitle: 'تشغيل النماذج محليًا',
  localModelsPitch: 'دون حساب — نزّل نموذجًا وشغّله على هذا الجهاز',
  openRouterPitch: 'مفتاح واحد ومئات النماذج — خيار افتراضي موثوق',
  apiKeyOptions: {
    fireworks: {
      short: 'API مباشر للنماذج',
      description: 'وصول مباشر إلى النماذج المستضافة لدى Fireworks AI.'
    },
    openrouter: {
      short: 'مفتاح واحد ونماذج كثيرة',
      description: 'يستضيف مئات النماذج خلف مفتاح واحد. خيار افتراضي جيد للتثبيتات الجديدة.'
    },
    openai: {
      short: 'نماذج من فئة GPT',
      description: 'وصول مباشر إلى نماذج OpenAI.'
    },
    gemini: {
      short: 'نماذج Gemini',
      description: 'وصول مباشر إلى نماذج Google Gemini.'
    },
    xai: {
      short: 'نماذج Grok',
      description: 'وصول مباشر إلى نماذج xAI Grok.'
    },
    local: {
      short: 'استضافة ذاتية',
      description: 'وجّه Hermes إلى نقطة نهاية محلية أو مستضافة ذاتيًا متوافقة مع OpenAI (vLLM أو llama.cpp أو Ollama وغيرها).'
    }
  },
  backToSignIn: 'العودة إلى تسجيل الدخول',
  getKey: 'الحصول على مفتاح',
  replaceCurrent: 'استبدال القيمة الحالية',
  pasteApiKey: 'الصق مفتاح API',
  localApiKeyPlaceholder: 'مفتاح API (اختياري — فقط إذا كانت نقطة النهاية تتطلبه)',
  localModelNamePlaceholder: 'اسم النموذج (مثل command-a-plus-05-2026)',
  couldNotSave: 'تعذّر حفظ بيانات الاعتماد.',
  connecting: 'جارٍ الاتصال',
  update: 'تحديث',
  flowSubtitles: {
    pkce: 'يفتح متصفحك لتسجيل الدخول، ثم يتابع هنا',
    device_code: 'يفتح صفحة تحقق في متصفحك — ويتصل Hermes تلقائيًا',
    external: 'سجّل الدخول مرة واحدة من الطرفية، ثم عد للمحادثة'
  },
  startingSignIn: provider => `جارٍ بدء تسجيل الدخول إلى ${provider}…`,
  verifyingCode: provider => `جارٍ التحقق من رمزك مع ${provider}…`,
  connectedProvider: provider => `تم الاتصال بـ ${provider}`,
  connectedPicking: provider => `تم الاتصال بـ ${provider}. جارٍ اختيار نموذج افتراضي…`,
  signInFailed: 'تعذّر تسجيل الدخول. حاول مرة أخرى.',
  signInExpired:
    'انتهت مهلة صفحة تسجيل الدخول قبل أن تنتهي. حاول مرة أخرى وأكمل خطوة المتصفح خلال بضع دقائق، أو استخدم مفتاح API بدلًا من ذلك.',
  signInDidNotFinish: provider =>
    `لم يكتمل تسجيل الدخول باستخدام ${provider}. تحقّق من اتصالك بالإنترنت وحاول مرة أخرى، أو اختر مزوّدًا آخر.`,
  tryAgain: 'إعادة المحاولة',
  useApiKeyInstead: 'استخدام مفتاح API',
  errorDetails: 'التفاصيل',
  pickDifferentProvider: 'اختيار مزوّد آخر',
  signInWith: provider => `تسجيل الدخول باستخدام ${provider}`,
  openedBrowser: provider => `فتحنا ${provider} في متصفحك.`,
  authorizeThere: 'امنح Hermes التفويض هناك.',
  copyAuthCode: 'انسخ رمز التفويض والصقه أدناه.',
  pasteAuthCode: 'الصق رمز التفويض',
  reopenAuthPage: 'إعادة فتح صفحة التفويض',
  waitingAuthorize: 'في انتظار تفويضك…',
  externalPending: provider =>
    `يسجّل ${provider} الدخول عبر CLI الخاص به. شغّل هذا الأمر في الطرفية، ثم عد واختر «سجّلت الدخول»:`,
  signedIn: 'سجّلت الدخول',
  deviceCodeOpened: provider => `فتحنا ${provider} في متصفحك. أدخل هذا الرمز هناك:`,
  reopenVerification: 'إعادة فتح صفحة التحقق',
  copy: 'نسخ',
  defaultModel: 'النموذج الافتراضي',
  freeTier: 'الفئة المجانية',
  pro: 'Pro',
  free: 'مجاني',
  price: (input, output) => `${input} للإدخال / ${output} للإخراج لكل Mtok`,
  change: 'تغيير',
  startChatting: 'ابدأ',
  docs: provider => `توثيق ${provider}`
}
