import type { CopyOf } from "./use-page-copy";
import type { appEn } from "./app.en";

export const appAr: CopyOf<typeof appEn> = {
  loading: "جارٍ التحميل…",
  loadingChat: "جارٍ تحميل المحادثة…",
  updateDescBehind: (cmd: string, n: number) =>
    `سيتم تشغيل 'hermes update' (${cmd}) وجلب ${n} Commit جديد. تُعاد تشغيل البوابة عند انتهاء التحديث؛ وتحتفظ الجلسة الحالية بذاكرة الطلبات المؤقتة حتى ذلك الحين.`,
  restartAll: "إعادة تشغيل الكل",
  restartSharedTitle: "إعادة تشغيل البوابة المشتركة؟",
};
