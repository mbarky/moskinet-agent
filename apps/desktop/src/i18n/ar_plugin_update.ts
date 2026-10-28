import type { PluginUpdateTranslations } from './types_plugin_update'

/** Copy for updating an installed plugin (Plugins tab): catalog re-pin consent and the security-scan override. */
export const arPluginUpdate: PluginUpdateTranslations = {
  folderAccess: {
    title: 'الوصول إلى المجلدات',
    hint: (name: string) => `يمكن لـ ${name} قراءة الملفات وتغييرها في هذه المجلدات. يسري سحب الإذن فورًا.`,
    revoke: 'سحب',
    revokeLabel: (path: string) => `سحب الوصول إلى ${path}`,
    revoked: (name: string, path: string) => `لم يعد بإمكان ${name} استخدام ${path}.`,
    revokeFailed: (name: string) => `تعذّر سحب وصول ${name} إلى المجلدات`,
    pickerTitle: (name: string) => `اختر مجلدًا لـ ${name}`,
    pickerButton: 'السماح بالوصول',
    refusedProtected: (name: string) =>
      `لا يمكن لـ ${name} استخدام هذا المجلد: فهو يحتوي على إعدادات Hermes أو مفاتيحه أو بيانات الإضافات. اختر مجلدًا لا يحتوي عليها.`,
    loadFailed: (name: string) => `تعذّر تحميل المجلدات المشتركة مع ${name}.`
  },
  updateToPin: (sha: string) => `التحديث إلى ${sha}`,
  updateFailed: (name: string) => `تعذّر تحديث ${name}`,
  updated: (name: string) => `تم تحديث ${name} إلى الإصدار المثبّت حاليًا في الكتالوج. أعد تشغيل البوابة لتطبيقه.`,
  updateConsentTitle: (name: string) => `${name} تطلب صلاحيات أكثر`,
  updateConsentBody: (name: string, sha: string) =>
    `الإصدار الجديد المثبّت في الكتالوج لـ ${name} (${sha}) يضيف واجهات لا يملكها الإصدار المثبّت لديك. طبّقه فقط إذا كنت تثق بها:`,
  updateConsentConfirm: 'تطبيق التحديث',
  updateScanTitle: (name: string) => `رصد الفحص الأمني مشكلات في ${name}`,
  updateScanBody: (name: string, count: number) =>
    `حصل تحديث ${name} على حكم «تحذير» (${count} ${count === 1 ? 'ملاحظة' : 'ملاحظات'}). يُفحص كل تحديث. طبّقه فقط إذا كنت تثق بالمصدر:`,
  updateScanMore: (count: number) => `+ ${count} أخرى`,
  updateScanConfirm: 'التحديث على أي حال',
  updateScanBlocked: (name: string) => `حظر الفحص الأمني تحديث ${name} (حكم «خطير»). لا يمكن تجاوز ذلك.`,
  updatedGit: (name: string) => `تم تحديث ${name} إلى أحدث Commit.`,
}
