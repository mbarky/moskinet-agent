import type { StatusResponse } from "@/lib/api";
import { ApiError } from "@/lib/api-error";
import { isArabicUi } from "@/lib/ui-lang";

/** Profiles a gateway restart would blip when the managed profile is carried by the shared
 *  multiplexer (default first). `null` for a standalone gateway or an older backend without
 *  `gateway_shared_with`; those keep the plain restart copy. */
export function sharedGatewayProfiles(
  status: Pick<StatusResponse, "gateway_shared_with"> | null | undefined,
): string[] | null {
  const shared = status?.gateway_shared_with;
  if (!Array.isArray(shared)) return null;
  const names = [...new Set(shared.map((n) => String(n).trim()).filter(Boolean))];
  if (names.length < 2) return null;
  return names.sort((a, b) =>
    a === "default" ? -1 : b === "default" ? 1 : a.localeCompare(b),
  );
}

export function sharedGatewayRestartDescription(profiles: string[]): string {
  if (isArabicUi()) return `ستُعيد كل البوتات على هذا الجهاز الاتصال: ${profiles.join("، ")}`;
  return `All bots on this device reconnect: ${profiles.join(", ")}`;
}

export function sharedGatewayRestartedMessage(count: number): string {
  if (isArabicUi()) return `أُعيد تشغيل البوابة المشتركة (${count} ${count === 1 ? "بوت" : "بوتات"})`;
  return `Shared gateway restarted (${count} ${count === 1 ? "bot" : "bots"})`;
}

/** Raw `gateway_state` values (gateway/status.py) → what they mean for the user. */
const GATEWAY_STATE_COPY: Record<string, string> = {
  running: "Running — messaging channels are online",
  starting: "Starting up",
  degraded: "Running with some channels offline — see Logs",
  stopped: "Stopped — messaging channels are offline",
  startup_failed: "Failed to start — see Logs",
};

/** A `degraded` record of a dead process is a watchdog exit, not a live gateway with channels down. */
const GATEWAY_EXITED_DEGRADED_COPY = "Exited: a watchdog stopped a wedged gateway — see Logs";

const GATEWAY_STATE_COPY_AR: Record<string, string> = {
  running: "تعمل — قنوات المراسلة متصلة",
  starting: "جارٍ التشغيل",
  degraded: "تعمل مع انقطاع بعض القنوات — راجع السجلات",
  stopped: "متوقفة — قنوات المراسلة غير متصلة",
  startup_failed: "فشل التشغيل — راجع السجلات",
};
const GATEWAY_EXITED_DEGRADED_COPY_AR = "توقفت: أوقف المراقب بوابة معلّقة — راجع السجلات";

/** Plain description of the gateway's state; null/unknown falls back to running/stopped. */
export function gatewayStateDescription(
  state: string | null | undefined,
  running: boolean | undefined,
): string {
  const ar = isArabicUi();
  const copy = ar ? GATEWAY_STATE_COPY_AR : GATEWAY_STATE_COPY;
  if (state === "degraded" && running === false) return ar ? GATEWAY_EXITED_DEGRADED_COPY_AR : GATEWAY_EXITED_DEGRADED_COPY;
  if (state && copy[state]) return copy[state];
  return running ? copy.running : copy.stopped;
}

/** True when the state points at Logs as the next step. */
export function gatewayStateNeedsLogs(state: string | null | undefined): boolean {
  return state === "startup_failed" || state === "degraded";
}

const GATEWAY_VERB_COPY: Record<"start" | "stop" | "restart", string> = {
  start: "Could not start the gateway",
  stop: "Could not stop the gateway",
  restart: "Could not restart the gateway",
};

const GATEWAY_VERB_COPY_AR: Record<"start" | "stop" | "restart", string> = {
  start: "تعذّر تشغيل البوابة",
  stop: "تعذّر إيقاف البوابة",
  restart: "تعذّر إعادة تشغيل البوابة",
};

/** Toast for a failed Start/Stop/Restart: lead with the outcome, then the detail, then the fix.
 *  `error` (the caught value) decides whether the Logs pointer makes sense: when the dashboard
 *  itself is unreachable (ApiError.status 0) the Logs page cannot load either, so it is omitted. */
export function gatewayActionFailedMessage(
  verb: "start" | "stop" | "restart",
  detail: string,
  error?: unknown,
): string {
  const trimmed = detail.trim().replace(/\.+$/, "");
  const ended = /[!?]$/.test(trimmed);
  const ar = isArabicUi();
  const lead = (ar ? GATEWAY_VERB_COPY_AR : GATEWAY_VERB_COPY)[verb];
  const head = trimmed ? `${lead}: ${trimmed}${ended ? "" : "."}` : `${lead}.`;
  const unreachable = error instanceof ApiError && error.status === 0;
  if (unreachable) return head;
  return ar ? `${head} افتح السجلات لمعرفة التفاصيل.` : `${head} Open Logs for details.`;
}

/** A 409 on gateway start/stop for a served profile carries the multiplexer explanation in
 *  `detail`, which `fetchJSON` already lifts into `ApiError.message`. Return it, else null. */
export function servedProfileRefusal(error: unknown): string | null {
  if (error instanceof ApiError) {
    return error.status === 409 ? error.message : null;
  }
  // Pre-ApiError shape (`"409: {...}"`) from callers that still hand-roll fetch.
  const text = error instanceof Error ? error.message : String(error ?? "");
  if (!text.startsWith("409")) return null;
  const detail = text.match(/"detail"\s*:\s*"([^"]+)"/)?.[1];
  return detail ?? text.replace(/^409:\s*/, "");
}
