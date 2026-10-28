/*
 * Arabic titles for install.ps1 / install.sh manifest stages. The scripts emit English titles
 * (shared with `hermes update`), so the installer UI maps them by stage name; an unknown stage
 * keeps the script's own title.
 */
const STAGE_TITLES_AR: Record<string, string> = {
  prerequisites: 'متطلبات النظام',
  repository: 'تنزيل Moski.net',
  venv: 'إنشاء بيئة Python',
  'python-deps': 'تثبيت متطلبات Python',
  config: 'تجهيز الإعدادات والمهارات',
  products: 'تثبيت الأمر والتطبيق',
  setup: 'إعداد مفاتيح API والإعدادات',
  gateway: 'إعداد خدمة البوابة',
  complete: 'إنهاء التثبيت'
}

export function stageTitle(name: string, fallback: string): string {
  return STAGE_TITLES_AR[name] ?? fallback
}
