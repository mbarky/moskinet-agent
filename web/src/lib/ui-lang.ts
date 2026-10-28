/**
 * Moski.net: Arabic for copy that lives in plain (non-React) modules.
 *
 * The i18n provider stamps `<html lang>` (applyDocumentLocale), so helpers that run outside
 * React read the active language from there at call time. Tests render without that stamp,
 * so they keep upstream's English.
 */
export function isArabicUi(): boolean {
  return typeof document !== "undefined" && document.documentElement.lang === "ar";
}

/** Exact English module constants (pty-close-copy, pty-reconnect, pty-resume-loading) → Arabic. */
const LIB_TEXT_AR: Record<string, string> = {
  "Chat can't connect because this page was opened without a login token. Reload the page, or start it again with `hermes dashboard` in a terminal.":
    "تعذّر اتصال المحادثة لأن هذه الصفحة فُتحت بدون رمز تسجيل الدخول. أعد تحميل الصفحة، أو شغّلها مرة أخرى بالأمر `hermes dashboard` في الطرفية.",
  "This chat tab's login expired (the dashboard server was restarted). Reload the page to reconnect.":
    "انتهت صلاحية تسجيل الدخول في علامة تبويب المحادثة هذه (أُعيد تشغيل خادم لوحة التحكم). أعد تحميل الصفحة لإعادة الاتصال.",
  "The dashboard refused this chat connection because the page address does not match the server it was opened from. Open the dashboard from the address `hermes dashboard` printed.":
    "رفضت لوحة التحكم اتصال المحادثة لأن عنوان الصفحة لا يطابق الخادم الذي فُتحت منه. افتح لوحة التحكم من العنوان الذي طبعه الأمر `hermes dashboard`.",
  "This Hermes server does not offer the terminal chat. Update Hermes (`hermes update`) and reload the page.":
    "خادم Hermes هذا لا يوفّر محادثة الطرفية. حدّث Hermes (`hermes update`) ثم أعد تحميل الصفحة.",
  "This Hermes server only accepts chat from the machine it runs on. Open the dashboard on that machine, or start it with a public bind.":
    "خادم Hermes هذا يقبل المحادثة فقط من الجهاز الذي يعمل عليه. افتح لوحة التحكم على ذلك الجهاز، أو شغّله مع ربط عام (public bind).",
  "Chat connection interrupted. Reconnecting...": "انقطع اتصال المحادثة. جارٍ إعادة الاتصال…",
  "Lost connection to the Hermes dashboard server. If you stopped `hermes dashboard`, start it again; otherwise click Reconnect now.":
    "انقطع الاتصال بخادم لوحة تحكم Hermes. إذا كنت أوقفت `hermes dashboard` فشغّله مرة أخرى، وإلا فاضغط «إعادة الاتصال الآن».",
  "Chat session ended. If you did not end it yourself, the agent may have crashed — open Logs to see why, or start a new session.":
    "انتهت جلسة المحادثة. إذا لم تُنهِها بنفسك فربما توقف الوكيل بشكل مفاجئ — افتح السجلات لمعرفة السبب، أو ابدأ جلسة جديدة.",
  "Chat could not start. The reason is printed above.": "تعذّر بدء المحادثة. السبب مطبوع بالأعلى.",
  "[chat session ended]": "[انتهت جلسة المحادثة]",
  "Chat is reconnecting. Input will resume when connected.": "جارٍ إعادة اتصال المحادثة. ستتمكن من الكتابة بعد الاتصال.",
  "Please wait while the conversation loads…": "انتظر قليلًا حتى تُحمَّل المحادثة…",
};

/** Arabic for a known module constant when the UI is Arabic; anything else passes through. */
export function libText(text: string): string {
  return isArabicUi() ? (LIB_TEXT_AR[text] ?? text) : text;
}
