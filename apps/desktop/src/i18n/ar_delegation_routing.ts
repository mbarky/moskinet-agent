import type { DelegationRoutingTranslations } from './types_delegation_routing'

export const arDelegationRouting: DelegationRoutingTranslations = {
  title: 'التوجيه',
  settingsTitle: 'الإعدادات الافتراضية للوكلاء الفرعيين',
  intro: 'كيف يحصل كل وكيل فرعي على نموذجه.',
  modes: {
    default: { label: 'افتراضي', description: 'يعمل كل وكيل فرعي على نموذج الوكيل الفرعي أدناه.' },
    model_map: {
      label: 'مسارات النماذج',
      description: 'سمِّ بعض النماذج، وسيختار الوكيل واحدًا منها لكل وكيل فرعي.'
    },
    profile_routes: {
      label: 'مسارات ملفات التعريف',
      description: 'يعمل الوكلاء الفرعيون بأحد ملفات تعريفك، بنموذجه ومهاراته ومفاتيحه الخاصة.'
    }
  },
  inUse: 'قيد الاستخدام',
  plugin: 'إضافة',
  pluginMissing: 'تأتي «مسارات النماذج» و«مسارات ملفات التعريف» من إضافة Advanced Delegation.',
  pluginDisabled: 'إضافة Advanced Delegation مثبّتة لكنها معطّلة لملف التعريف هذا.',
  pluginNotLoaded: 'إضافة Advanced Delegation مفعّلة، لكن Hermes لم يحمّلها بعد. أعد تشغيل Hermes لإكمال ذلك.',
  installPlugin: 'تثبيت الإضافة',
  installUnavailable: 'إضافة Advanced Delegation ليست في كتالوج الإضافات بعد. ثبّتها من القدرات › الإضافات.',
  enablePlugin: 'تفعيل',
  enableFailed: 'تعذّر تفعيل Advanced Delegation',
  modeFailed: 'تعذّر تغيير توجيه الوكلاء الفرعيين',
  loadFailed: 'تعذّر تحميل توجيه الوكلاء الفرعيين',
  blockedPill: 'لا يعمل',
  blockedDetail: 'هذا الوضع محفوظ، لذا يرفض Hermes كل وكيل فرعي بدلًا من استخدام «افتراضي» دون تنبيه.',
  blockedMissing: 'لن يبدأ الوكلاء الفرعيون حتى تُثبَّت إضافة Advanced Delegation.',
  blockedDisabled: 'لن يبدأ الوكلاء الفرعيون حتى تُفعَّل Advanced Delegation لملف التعريف هذا.',
  blockedNotLoaded: 'لن يبدأ الوكلاء الفرعيون حتى يحمّل Hermes إضافة Advanced Delegation. أعد تشغيل Hermes لإكمال ذلك.',
  blockedUnavailable: label =>
    `لن يبدأ الوكلاء الفرعيون حتى يتمكن ${label} من العمل هنا. تفيد إضافته بأنه لا يستطيع ذلك.`,
  blockedUnregistered: name => `لن يبدأ الوكلاء الفرعيون حتى تُثبَّت وتُفعَّل إضافة توفّر «${name}».`,
  thirdPartyDescription: 'من إضافة. إعداداته موجودة مع تلك الإضافة.',

  modelRoutesTitle: 'مسارات النماذج',
  modelRoutesEmpty: 'لا توجد مسارات بعد. إلى أن تضيف مسارًا، يستخدم الوكلاء الفرعيون نموذج الوكيل الرئيسي.',
  addRoute: 'إضافة مسار',
  editRoute: 'تعديل',
  makeDefault: 'تعيين كافتراضي',
  deleteRoute: 'حذف',
  defaultBadge: 'افتراضي',
  routeActions: name => `إجراءات ${name}`,
  deleteConfirmTitle: name => `حذف المسار «${name}»؟`,
  deleteConfirmBody: 'لن يتمكن الوكلاء الفرعيون من اختياره بعد الآن.',
  deleteConfirmNextDefault: name => `هذا هو المسار الافتراضي، لذا سيصبح «${name}» هو الافتراضي.`,
  deleteConfirmAction: 'حذف المسار',
  saveFailed: 'تعذّر حفظ المسارات',
  baseUrlRoute: url => `نقطة النهاية ${url}`,

  dialogNew: 'مسار نموذج جديد',
  dialogEdit: 'تعديل مسار النموذج',
  dialogDesc: 'يقرأ الوكيل الاسم والوصف ليقرر أي مسار يسلكه الوكيل الفرعي.',
  nameLabel: 'الاسم',
  namePlaceholder: 'مثال: fast',
  nameHint: 'قصير وبدون مسافات. يختار الوكيل المسارات بهذا الاسم.',
  descriptionLabel: 'متى يُستخدم',
  descriptionPlaceholder: 'مثال: رخيص وسريع: عمليات بحث، ملخصات، تعديلات بسيطة.',
  descriptionHint: 'سطر واحد يقرؤه الوكيل قبل الاختيار.',
  providerLabel: 'المزوّد',
  providerPlaceholder: 'اختر مزوّدًا',
  modelLabel: 'النموذج',
  effortLabel: 'مستوى التفكير',
  effortInherit: 'الافتراضي للوكيل الفرعي',
  tierLabel: 'السرعة',
  tierNormal: 'عادية',
  tierFast: 'سريعة',
  tierUltrafast: 'فائقة السرعة',
  tierHint: 'فقط في النماذج التي توفّرها.',
  optional: 'اختياري',
  errors: { required: 'مطلوب', spaces: 'بدون مسافات', duplicate: 'مسار آخر يستخدم هذا الاسم بالفعل' },
  saveRoute: 'حفظ المسار',
  createRoute: 'إضافة مسار',

  profileRoutesTitle: 'ملفات التعريف التي يمكن للوكلاء الفرعيين العمل بها',
  profileRoutesHint: 'كل ملف تعريف محدَّد يأتي بنموذجه ومهاراته وشخصيته ومفاتيحه الخاصة.',
  profileDescriptionPlaceholder: 'متى يُستخدم (اختياري)',
  profileDefault: 'افتراضي',
  profileEmpty: 'لا توجد ملفات تعريف أخرى بعد. أنشئ واحدًا من شريط ملفات التعريف.',
  profileMissing: name => `${name} (لم يعد ملف التعريف موجودًا)`,

  inactiveTitle: 'غير مستخدم في هذا الوضع',
  inactiveModelMap: route =>
    `تختار مسارات النماذج نموذج كل وكيل فرعي. الوكلاء الفرعيون الذين لا يختارون مسارًا يستخدمون «${route}».`,
  inactiveProfiles: profile =>
    `تختار مسارات ملفات التعريف ملف تعريف كل وكيل فرعي. الوكلاء الفرعيون الذين لا يختارون ملف تعريف يعملون بـ «${profile}».`,
  inactiveModelMapNoDefault:
    'تختار مسارات النماذج نموذج كل وكيل فرعي. الوكلاء الفرعيون الذين لا يختارون مسارًا يستخدمون نموذج الوكيل الرئيسي.',
  inactiveProfilesNoDefault:
    'تختار مسارات ملفات التعريف ملف تعريف كل وكيل فرعي. الوكلاء الفرعيون الذين لا يختارون ملف تعريف يستخدمون نموذج الوكيل الرئيسي.',
  inactivePlugin: label => `يحدد ${label} نموذج كل وكيل فرعي، لذا لا ينطبق هذا الإعداد.`,
  useDefault: 'التبديل إلى «افتراضي»'
}
