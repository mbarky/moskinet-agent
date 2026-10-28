import type { CopyOf } from "./use-page-copy";
import type { envEn } from "./env.en";

export const envAr: CopyOf<typeof envEn> = {
  hideVar: (key: string) => `إخفاء ${key}`,
  revealVar: (key: string) => `إظهار ${key}`,
  providers: "المزوّدون",
  tools: "الأدوات",
  settings: "الإعدادات",
  jumpToSection: "الانتقال إلى قسم",
  saved: (key: string) => `تم حفظ ${key}`,
};
