export const arModelMenu = {
  pickDeferred: (model: string) => `يُطبَّق ${model} بدءًا من رسالتك التالية`,
  search: 'البحث في النماذج',
  noModels: 'لم يُعثر على نماذج',
  editModels: 'تعديل النماذج…',
  followDefault: 'استخدام الافتراضي من الإعدادات',
  refreshModels: 'تحديث النماذج',
  favorites: 'المفضلة',
  addFavorite: 'إضافة إلى المفضلة',
  removeFavorite: 'إزالة من المفضلة',
  favoriteShortcut: '⇧ نقر',
  fast: 'سريع',
  free: 'مجاني',
  cacheRead: 'قراءة من الذاكرة المؤقتة',
  priceTitle: (input: string, output: string, cache: string) =>
    `الإدخال ${input}/Mtok · الإخراج ${output}/Mtok` + (cache ? ` · القراءة المخزّنة ${cache}/Mtok` : ''),
  localSetup: {
    title: 'تشغيل محلي · مجاني وخاص',
    text: (model: string, size: string) => `${model} يناسب هذا الجهاز · تنزيل ${size}`,
    action: 'إعداد'
  },
  limited: 'محدود',
  limitedUntil: (time: string) => `محدود حتى ${time}`,
  limitedTip: (provider: string, time: null | string) =>
    time
      ? `بلغ ${provider} حد الاستخدام. يُعاد تعيينه في ${time}؛ ويمكنك اختيار نموذج لما بعد ذلك.`
      : `بلغ ${provider} حد الاستخدام. يمكنك اختيار نموذج لما بعد إعادة تعيينه.`,
  modelResets: (time: string) => `يُعاد تعيينه ${time}`,
  modelLimitedTip: (time: string) =>
    `بلغ هذا النموذج حده الخاص ويُعاد تعيينه في ${time}. النماذج الأخرى هنا ما زالت تعمل.`,
  usageLeft: (percent: number, time: null | string) =>
    time ? `متبقٍّ ${percent}% · يُعاد التعيين ${time}` : `متبقٍّ ${percent}%`,
  poolAccounts: (count: number) => `${count} ${count === 1 ? 'حساب' : 'حسابات'}`,
  poolLimited: (limited: number, total: number) => `${limited}/${total} حسابات محدودة`,
  poolAccount: (number: number) => `الحساب ${number}`,
  poolUnknown: 'الاستخدام غير متاح',
  poolUnavailable: 'سجّل الدخول مرة أخرى',
  usageTip: (provider: string) => `${provider} يقترب من حد الاستخدام.`,
  usageWindow: (label: string, percent: number, time: null | string) =>
    time ? `${label}: متبقٍّ ${percent}%، يُعاد التعيين ${time}` : `${label}: متبقٍّ ${percent}%`
}
