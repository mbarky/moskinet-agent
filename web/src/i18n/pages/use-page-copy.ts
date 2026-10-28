import { useI18n } from "../context";

/**
 * Moski.net: per-page copy for strings upstream hard-codes in English.
 *
 * Each page keeps its English copy in `i18n/pages/<page>.en.ts` and the Arabic in
 * `<page>.ar.ts`; other locales fall back to English. `CopyOf` widens the English
 * object's literal types so the Arabic file must carry the same keys and function
 * signatures with any text.
 */
export type CopyOf<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => string
    ? (...args: A) => string
    : T[K] extends string
      ? string
      : CopyOf<T[K]>;
};

export function usePageCopy<T>(en: T, ar: CopyOf<T>): T {
  const { locale } = useI18n();
  return (locale === "ar" ? ar : en) as T;
}
