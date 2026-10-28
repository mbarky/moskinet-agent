import type { CopyOf } from "./use-page-copy";
import type { toolsetConfigDrawerEn } from "./toolset-config-drawer.en";

export const toolsetConfigDrawerAr: CopyOf<typeof toolsetConfigDrawerEn> = {
  loadFailed: "تعذّر تحميل إعدادات مجموعة الأدوات",
  postSetupComplete: "اكتمل الإعداد اللاحق",
  postSetupErrors: "انتهى الإعداد اللاحق مع أخطاء",
  postSetupLost: "فُقد تتبّع عملية الإعداد اللاحق",
  toggled: (label: string, next: boolean) =>
    `${next ? "تم تفعيل" : "تم تعطيل"} ${label}`,
  toggleFailed: "تعذّر تبديل مجموعة الأدوات",
  providerSet: (name: string) => `تم تعيين المزوّد إلى ${name}`,
  selectProviderFailed: "تعذّر اختيار المزوّد",
  enterValue: "أدخل قيمة واحدة على الأقل للحفظ",
  savedKeys: (n: number) => (n === 1 ? "تم حفظ مفتاح واحد" : `تم حفظ ${n} مفاتيح`),
  nothingToSave: "لا يوجد ما يُحفظ",
  saveKeysFailed: "تعذّر حفظ المفاتيح",
  postSetupStartFailed: "تعذّر بدء الإعداد اللاحق",
  close: "إغلاق",
  active: "مفعّلة",
  inactive: "غير مفعّلة",
  enableFor: (platform: string) => `تفعيل مجموعة الأدوات لـ ${platform}`,
  enabledFor: (platform: string) => `مفعّلة لـ ${platform}`,
  disabledFor: (platform: string) => `معطّلة لـ ${platform}`,
  noBackends:
    "لا تحتوي مجموعة الأدوات هذه على واجهات خلفية قابلة للتهيئة، فعّلها أو عطّلها من الأعلى. تعمل بدون اختيار مزوّد أو مفاتيح API.",
  noProviders: "لا يوجد مزوّدون متاحون لمجموعة الأدوات هذه في هذا التثبيت.",
  selected: "محدّد",
  select: "اختيار",
  saved: "محفوظ",
  savedPlaceholder: "•••••••• (محفوظ، اتركه فارغًا للإبقاء عليه)",
  getKey: "احصل على مفتاح",
  saveKeys: "حفظ المفاتيح",
  postSetupBefore: "تحتاج هذه الواجهة الخلفية إلى تثبيت لمرة واحدة",
  postSetupAfter: ". يعمل على هذا الجهاز وقد يستغرق بضع دقائق.",
  installing: "جارٍ التثبيت…",
  runSetup: "تشغيل الإعداد",
  starting: "جارٍ البدء…",
};
