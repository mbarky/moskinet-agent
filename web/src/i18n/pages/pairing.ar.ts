import type { CopyOf } from "./use-page-copy";
import type { pairingEn } from "./pairing.en";

export const pairingAr: CopyOf<typeof pairingEn> = {
  loadFailed: "تعذّر تحميل طلبات الاقتران",
  missingRequest: "طلب الاقتران غير موجود",
  approved: (label: string) => `تمت الموافقة: «${label}»`,
  approveFailed: (err: string) => `تعذّرت الموافقة على طلب الاقتران: ${err}`,
  clearConfirm: "مسح كل طلبات الاقتران المعلّقة؟",
  cleared: (n: number) => `تم مسح ${n} من الطلبات المعلّقة`,
  clearFailed: (err: string) => `تعذّر مسح الطلبات المعلّقة: ${err}`,
  revoked: (label: string) => `تم سحب الوصول: «${label}»`,
  revokeFailed: (err: string) => `تعذّر سحب الوصول: ${err}`,
  clearPending: "مسح المعلّقة",
  revokeTitle: "سحب الوصول",
  revokeDescUser: (label: string) => `سيفقد «${label}» الوصول. لا يمكن التراجع عن ذلك.`,
  revokeDescGeneric: "سيفقد هذا المستخدم الوصول. لا يمكن التراجع عن ذلك.",
  revoke: "سحب",
  pendingRequests: (n: number) => `الطلبات المعلّقة (${n})`,
  noPending: "لا توجد طلبات اقتران معلّقة",
  minutesAgo: (n: number) => `منذ ${n} د`,
  approve: "موافقة",
  approvedUsers: (n: number) => `المستخدمون الموافَق عليهم (${n})`,
  noApproved: "لا يوجد مستخدمون موافَق عليهم",
};
