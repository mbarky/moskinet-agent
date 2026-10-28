import type { CopyOf } from "./use-page-copy";
import type { hermesConsoleModalEn } from "./hermes-console-modal.en";

export const hermesConsoleModalAr: CopyOf<typeof hermesConsoleModalEn> = {
  state: {
    connecting: "جارٍ الاتصال",
    ready: "جاهز",
    running: "قيد التشغيل",
    closed: "مغلق",
    error: "خطأ",
  },
  reconnectConsole: "إعادة توصيل الطرفية",
  reconnect: "إعادة الاتصال",
  closeConsole: "إغلاق الطرفية",
};
