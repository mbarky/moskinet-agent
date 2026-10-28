import type { PluginPreviewAccessTranslations } from './types_plugin_preview_access'

/** Copy for the preview-script consent prompt and the per-plugin grant list (Capabilities ▸ Plugins). */
export const arPluginPreviewAccess: PluginPreviewAccessTranslations = {
  previewScriptPromptTitle: (plugin: string) => `السماح لـ ${plugin} بتشغيل نصوص برمجية على هذه الصفحة؟`,
  previewScriptPromptBody: (plugin: string, origin: string) =>
    `تريد ${plugin} تشغيل JavaScript في متصفح المعاينة على ${origin}.`,
  previewScriptPromptRisk:
    'يمكن للنصوص البرمجية قراءة وتغيير كل شيء على ذلك الموقع، بما في ذلك صفحات الحسابات التي سجّلت الدخول إليها هناك.',
  previewScriptPromptRevokeHint: 'ينطبق على هذا الموقع فقط. يمكنك سحب الإذن من القدرات ▸ الإضافات.',
  previewScriptAllow: 'السماح على هذا الموقع',
  previewScriptDeny: 'عدم السماح',
  previewScriptAccessLabel: 'نصوص الصفحة البرمجية',
  previewScriptAccessNone: 'تسأل قبل تشغيل نصوص برمجية على أي صفحة',
  previewScriptRevoke: (origin: string) => `سحب الوصول إلى ${origin}`,
  previewScriptRevoked: (plugin: string, origin: string) => `لم يعد بإمكان ${plugin} تشغيل نصوص برمجية على ${origin}.`,
  previewScriptRevokeUnsaved: (plugin: string, origin: string) =>
    `تعذّر حفظ هذا التغيير، لذا يسري فقط حتى إعادة تشغيل Hermes. ${plugin} محظورة على ${origin} حاليًا.`
}
