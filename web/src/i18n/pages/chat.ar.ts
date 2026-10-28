import type { CopyOf } from "./use-page-copy";
import type { chatEn } from "./chat.en";

export const chatAr: CopyOf<typeof chatEn> = {
  imageUploadFailed: (message) => `تعذّر رفع الصورة: ${message}`,
  imageUploadedNotConnected: "تم رفع الصورة، لكن المحادثة غير متصلة — حاول مرة أخرى.",
  reloadPage: "إعادة تحميل الصفحة",
  chatReconnecting: "جارٍ إعادة اتصال المحادثة.",
  chatDisconnected: "انقطع اتصال المحادثة.",
  reconnectChatAria: "إعادة اتصال المحادثة",
  reconnectNow: "إعادة الاتصال الآن",
  checkServerStatus: "فحص حالة الخادم",
  chatTerminalAria: "طرفية المحادثة",
  startNewSessionAria: "بدء جلسة محادثة جديدة",
  startNewSession: "بدء جلسة جديدة",
  openLogs: "فتح السجلات",
  showSidePanelTitle: "إظهار اللوحة الجانبية (النموذج + الجلسات)",
  showSidePanelAria: "إظهار اللوحة الجانبية للمحادثة",
  panel: "اللوحة",
  collapseSidePanelAria: "طي اللوحة الجانبية للمحادثة",
  collapseSidePanelTitle: "طي اللوحة الجانبية",
};
