import type { CopyOf } from "./use-page-copy";
import type { skillEditorDialogEn } from "./skill-editor-dialog.en";

export const skillEditorDialogAr: CopyOf<typeof skillEditorDialogEn> = {
  nameRequired: "اسم المهارة مطلوب.",
  contentRequired: "محتوى SKILL.md مطلوب.",
  editTitle: (name: string) => `تعديل المهارة: ${name}`,
  newTitle: "مهارة جديدة",
  editDescription:
    "أعد كتابة ملف SKILL.md لهذه المهارة. يتم التحقق من الـ Frontmatter (name، description) عند الحفظ.",
  createDescription:
    "أنشئ مهارة مخصّصة: Frontmatter بصيغة YAML مع تعليمات بصيغة Markdown. ستصبح متاحة للوكيل ويمكن إرفاقها بالمهام المجدولة.",
  name: "الاسم",
  categoryOptional: "الفئة (اختياري)",
  cancel: "إلغاء",
  saving: "جارٍ الحفظ…",
  saveChanges: "حفظ التغييرات",
  createSkill: "إنشاء المهارة",
};
