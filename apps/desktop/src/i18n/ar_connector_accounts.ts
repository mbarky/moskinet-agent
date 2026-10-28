import type { TranslationOverrides } from './define-locale'

export const arConnectorAccounts: NonNullable<TranslationOverrides['connectorsPage']>['accounts'] = {
  heading: 'الحسابات',
  count: (count: number) => `${count} ${count === 1 ? 'حساب' : 'حسابات'}`,
  addAnother: 'إضافة حساب آخر',
  aliasLabel: 'اسم الحساب',
  aliasHint: 'حروف إنجليزية صغيرة وأرقام وشرطات، حتى 32 حرفًا. مثلًا work أو home.',
  aliasInvalid: 'استخدم حروفًا إنجليزية صغيرة وأرقامًا وشرطات، على أن يبدأ بحرف أو رقم.',
  aliasTaken: 'هذا الاسم مستخدم بالفعل.',
  add: 'اتصال',
  rename: 'إعادة التسمية',
  renameLabel: (name: string) => `اسم جديد لـ ${name}`,
  renameGone: 'لم يعد هذا الحساب موجودًا. ربما حُذف أو استُبدل بإعادة اتصال.',
  remove: 'إزالة',
  removeTitle: (app: string, name: string) => `إزالة حساب ${app} باسم ${name}؟`,
  removeBody: 'سيتوقف Hermes عن العمل بهذا الحساب. تبقى حساباتك الأخرى متصلة.',
  retiredCount: (count: number) => `${count} مُستبدَل`,
  status: {
    expired: 'انتهت صلاحية الوصول',
    failed: 'تعذّر الاتصال',
    inactive: 'غير نشط',
    pending: 'في انتظار تسجيل الدخول',
    retired: 'استُبدل بإعادة اتصال',
    revoked: 'تم سحب الوصول'
  }
}
