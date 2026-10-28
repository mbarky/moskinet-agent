import type { AuxTaskCopyMap } from './types_aux_tasks'

export const arAuxTasks: AuxTaskCopyMap = {
  vision: {
    label: 'الرؤية',
    hint: 'تحليل الصور'
  },
  compression: {
    label: 'الضغط',
    hint: 'ضغط السياق'
  },
  skills_hub: {
    label: 'مركز المهارات',
    hint: 'البحث عن المهارات'
  },
  approval: {
    label: 'الموافقة',
    hint: 'موافقة تلقائية ذكية'
  },
  mcp: {
    label: 'MCP',
    hint: 'توجيه أدوات MCP'
  },
  title_generation: {
    label: 'إنشاء العناوين',
    hint: 'عناوين الجلسات'
  },
  review: {
    label: 'المراجعة',
    hint: 'وكيل فرعي للمراجعة عبر /review'
  },
  voice_chat: { label: 'المحادثة الصوتية', hint: 'ردود منطوقة في وضع الصوت' },
  triage_specifier: {
    label: 'تحديد الفرز',
    hint: 'تفصيل مواصفات Kanban'
  },
  kanban_decomposer: {
    label: 'تقسيم Kanban',
    hint: 'تقسيم المهام'
  },
  profile_describer: {
    label: 'وصف ملف التعريف',
    hint: 'أوصاف تلقائية لملفات التعريف'
  },
  curator: {
    label: 'المنسّق',
    hint: 'مراجعة استخدام المهارات'
  }
}
