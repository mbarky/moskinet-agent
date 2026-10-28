import type { CopyOf } from "./use-page-copy";
import type { authWidgetEn } from "./auth-widget.en";

export const authWidgetAr: CopyOf<typeof authWidgetEn> = {
  statusUnavailable: "حالة تسجيل الدخول غير متاحة",
  loggedInAs: (label: string) => `مسجّل الدخول باسم ${label}`,
  via: (provider: string) => `عبر ${provider}`,
  logOut: "تسجيل الخروج",
};
