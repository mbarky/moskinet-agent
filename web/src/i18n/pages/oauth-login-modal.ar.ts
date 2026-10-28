import type { CopyOf } from "./use-page-copy";
import type { oauthLoginModalEn } from "./oauth-login-modal.en";

export const oauthLoginModalAr: CopyOf<typeof oauthLoginModalEn> = {
  failedToStart: (err: string) => `تعذّر بدء تسجيل الدخول: ${err}`,
  providerConnected: (name: string) => `تم ربط ${name}`,
  loginStatus: (status: string) => `تسجيل الدخول: ${status}`,
  pollingFailed: (err: string) => `تعذّر التحقق من الحالة: ${err}`,
  tokenExchangeFailed: "تعذّر تبادل التوكن",
  submitFailed: (err: string) => `تعذّر الإرسال: ${err}`,
  retryFailed: (retry: string, err: string) => `فشلت ${retry}: ${err}`,
};
