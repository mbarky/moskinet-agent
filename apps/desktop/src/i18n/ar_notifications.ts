// Notification settings copy used when the desktop locale loads.
export const arNotifications = {
  title: 'الإشعارات',
  intro: 'إشعارات النظام (وليست التنبيهات داخل التطبيق). لكل جهاز على حدة.',
  enableAll: 'تفعيل الإشعارات',
  enableAllDesc: 'عند الإيقاف تُكتم كل الإشعارات أدناه.',
  focusedHint: 'تنبيهات الاكتمال تظهر فقط عندما يكون Hermes في الخلفية.',
  kinds: {
    approval: {
      label: 'مطلوب موافقة',
      description: 'أمر ينتظر موافقتك أو رفضك.'
    },
    input: {
      label: 'مطلوب إدخال',
      description: 'طرح Hermes سؤالًا أو يحتاج إلى كلمة مرور أو قيمة سرية.'
    },
    turnDone: {
      label: 'الرد جاهز',
      description: 'انتهى دور بينما كان Hermes في الخلفية.'
    },
    turnError: {
      label: 'فشل الدور',
      description: 'أخطاء الأدوار في الخلفية.'
    },
    backgroundDone: {
      label: 'انتهت مهمة في الخلفية',
      description: 'اكتمل أمر طرفية يعمل في الخلفية.'
    },
    credits: {
      label: 'تنبيهات الرصيد',
      description: 'تم إيقاف الوصول إلى الرصيد مؤقتًا أو استعادته.'
    },
    plugin: {
      label: 'إشعارات الإضافات',
      description: 'أرسلت إضافة سطح مكتب إشعارًا بينما كان Hermes في الخلفية.'
    }
  },
  test: 'إرسال إشعار تجريبي',
  testTitle: 'Hermes',
  testBody: 'الإشعارات تعمل.',
  testSent: 'تم إرسال الإشعار التجريبي. إذا لم يظهر شيء، فتحقّق من صلاحيات الإشعارات في النظام ووضع «التركيز/عدم الإزعاج».',
  testUnsupported: 'هذا النظام لا يدعم الإشعارات الأصلية.',
  muteSoundsTitle: 'كتم أصوات الواجهة',
  muteSoundsDesc:
    'يكتم إشارات الاكتمال التلقائية وكلمة التنبيه والتفكير، والاهتزاز، وأصوات إشعارات النظام. تظل معاينات الصوت والردود المنطوقة تعمل.',
  completionSoundTitle: 'صوت الاكتمال',
  completionSoundDesc: 'يُشغَّل عند انتهاء دور الوكيل. اختر صوتًا مسبقًا واستمع إلى معاينته هنا.',
  completionSoundPreview: 'معاينة'
}
