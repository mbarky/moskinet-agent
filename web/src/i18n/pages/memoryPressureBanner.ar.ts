import type { CopyOf } from "./use-page-copy";
import type { memoryPressureBannerEn } from "./memoryPressureBanner.en";

export const memoryPressureBannerAr: CopyOf<typeof memoryPressureBannerEn> = {
  diskFree: (mb: number) => ` (${mb} MB متاحة)`,
};
