import type { CopyOf } from "./use-page-copy";
import type { cronEn } from "./cron.en";

export const cronAr: CopyOf<typeof cronEn> = {
  advancedFields: "حقول متقدمة",
  provider: "المزوّد",
  default: "الافتراضي",
  model: "النموذج",
  baseUrlOverride: "تجاوز عنوان Base URL",
  noAgentHelp: "no_agent: شغّل السكربت فقط وسلّم مخرجات stdout كما هي",
  script: "السكربت",
  workdir: "مجلد العمل",
  continuityHelp:
    "continuity: كل تشغيل يرى مخرجات التشغيل السابق (لتجنّب التكرار والمتابعة من حيث توقّف)",
  contextFromLabel: "معرّفات المهام لـ context_from",
  contextFromPlaceholder: "معرّف مهمة واحد في كل سطر",
  noToolsets: "لا توجد مجموعات أدوات متاحة.",
  skillsOptional: "المهارات (اختياري)",
  noSkills: "لا توجد مهارات مثبّتة لملف التعريف هذا.",
  skillsHelp:
    "تُحمَّل المهارات المختارة قبل تشغيل الطلب — الجدولة تحدد متى، والمهارة تحدد كيف.",
  repeatForever: "للأبد",
  repeatTimes: (times) => `${times} مرات`,
  savedChanges: "تم حفظ التغييرات ✓",
  jobsTab: "المهام",
  blueprintsTab: "القوالب",
  close: "إغلاق",
  profile: "ملف التعريف",
  editJob: "تعديل المهمة",
  saveChanges: "حفظ التغييرات",
  allProfiles: "كل ملفات التعريف",
  skillsCount: (count) => `${count} مهارات`,
  modelBadge: "النموذج",
  toolsetsCount: (count) => `${count} مجموعات أدوات`,
  repeat: "التكرار",
  delivery: "التسليم",
  missedFire: (when) => `فات موعد تشغيل مجدول (${when}):`,
};
