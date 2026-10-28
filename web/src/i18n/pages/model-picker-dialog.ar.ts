import type { CopyOf } from "./use-page-copy";
import type { modelPickerDialogEn } from "./model-picker-dialog.en";

export const modelPickerDialogAr: CopyOf<typeof modelPickerDialogEn> = {
  switchModel: "تبديل النموذج",
  expensiveFallback: "تسعير هذا النموذج المعروف مرتفع بشكل غير معتاد.",
  close: "إغلاق",
  current: "الحالي:",
  filterPlaceholder: "تصفية المزوّدين والنماذج…",
  savesToConfig: "يُحفظ في config.yaml، ويُطبّق على الجلسات الجديدة.",
  persistGlobally: "حفظ عام (وإلا فلهذه الجلسة فقط)",
  refreshModels: "تحديث النماذج",
  cancel: "إلغاء",
  switch: "تبديل",
  expensiveTitle: "تحذير: نموذج مرتفع التكلفة",
  switchAnyway: "التبديل على أي حال",
  noProviders:
    "لم يتم إعداد أي مزوّد نماذج بعد. أضف مفتاح API من صفحة المفاتيح أو سجّل الدخول إلى مزوّد من صفحة النماذج لتظهر النماذج هنا.",
  loading: "جارٍ التحميل…",
  noProvidersMatch: "لا يوجد مزوّدون يطابقون بحثك.",
  openKeys: "فتح المفاتيح",
  signInProvider: "تسجيل الدخول إلى مزوّد",
  modelsCount: (n: number) => `${n} نموذج`,
  pickProvider: "اختر مزوّدًا ←",
  noModelsMatch: "لا توجد نماذج تطابق التصفية",
  noModelsListed: "لا توجد نماذج مدرجة لهذا المزوّد",
  currentTag: "الحالي",
};
