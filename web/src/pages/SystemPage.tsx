import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import {
  Activity,
  Brain,
  Check,
  Clock,
  Copy,
  Cpu,
  Database,
  Download,
  Globe,
  HardDrive,
  KeyRound,
  Link2,
  Play,
  Plus,
  Power,
  RotateCw,
  Server,
  Share2,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Terminal,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { Badge } from "@nous-research/ui/ui/components/badge";
import { Button } from "@nous-research/ui/ui/components/button";
import { Spinner } from "@nous-research/ui/ui/components/spinner";
import { H2 } from "@nous-research/ui/ui/components/typography/h2";
import { Card, CardContent } from "@nous-research/ui/ui/components/card";
import { Checkbox } from "@nous-research/ui/ui/components/checkbox";
import { Input } from "@nous-research/ui/ui/components/input";
import { Label } from "@nous-research/ui/ui/components/label";
import { Select, SelectOption } from "@nous-research/ui/ui/components/select";
import { Toast } from "@nous-research/ui/ui/components/toast";
import { useToast } from "@nous-research/ui/hooks/use-toast";
import { useConfirmDelete } from "@nous-research/ui/hooks/use-confirm-delete";
import { ConfirmDialog } from "@nous-research/ui/ui/components/confirm-dialog";
import { useModalBehavior } from "@/hooks/useModalBehavior";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { HermesConsoleModal } from "@/components/HermesConsoleModal";
import { cn, themedBody } from "@/lib/utils";
import { api } from "@/lib/api";
import { copyTextToClipboard } from "@/lib/clipboard";
import {
  gatewayStateNeedsLogs,
  gatewayStateDescription,
  gatewayActionFailedMessage,
  servedProfileRefusal,
  sharedGatewayProfiles,
  sharedGatewayRestartDescription,
  sharedGatewayRestartedMessage,
} from "@/lib/shared-gateway";
import type {
  StatusResponse,
  MemoryStatus,
  MemoryProviderInfo,
  CredentialPoolProvider,
  CheckpointsResponse,
  HooksResponse,
  HookEntry,
  SystemStats,
  UpdateCheckResponse,
  CuratorStatus,
  PortalStatus,
  DebugShareResponse,
  GatewayMigratePlan,
} from "@/lib/api";
import { apiErrorFromResponse, errorMessage } from "@/lib/api-error";
import { usePageCopy } from "@/i18n/pages/use-page-copy";
import { systemEn } from "@/i18n/pages/system.en";
import { systemAr } from "@/i18n/pages/system.ar";

type SystemCopy = typeof systemEn;

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  if (n < 1024 * 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)} MB`;
  return `${(n / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function formatDuration(seconds: number, p: SystemCopy): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return p.durationDays(d, h, m);
  if (h > 0) return p.durationHours(h, m);
  return p.durationMinutes(m);
}

type BackupImportTarget =
  | { kind: "upload"; file: File }
  | { kind: "path"; path: string };

function backupImportLabel(target: BackupImportTarget | null, p: SystemCopy): string {
  if (!target) return p.theArchive;
  return target.kind === "upload" ? target.file.name : target.path;
}

function backupFileName(path: string | null, p: SystemCopy): string {
  if (!path) return p.noBackupYet;
  return path.split(/[\\/]/).filter(Boolean).pop() ?? path;
}

/**
 * Live action-log viewer for the spawn-based admin actions (doctor, audit,
 * backup, import, skills update, checkpoints prune, gateway start/stop).
 * Polls /api/actions/<name>/status until the process exits.
 */
/** Badge for an available update; a rollback names the release it returns to. */
function updateBadge(info: UpdateCheckResponse, p: SystemCopy): string {
  if (info.rollback_to) return p.newerThan(info.rollback_to);
  return info.behind && info.behind > 0 ? p.behindBadge(info.behind) : p.updateAvailableBadge;
}

function updateToast(info: UpdateCheckResponse, p: SystemCopy): string {
  if (info.rollback_to && info.message) return info.message;
  return info.behind && info.behind > 0
    ? p.updateAvailableBehind(info.behind)
    : p.updateAvailable;
}

function ActionLogViewer({
  action,
  onClose,
  onComplete,
}: {
  action: string;
  onClose: () => void;
  onComplete?: (action: string, exitCode: number | null) => void;
}) {
  const p = usePageCopy(systemEn, systemAr);
  const [lines, setLines] = useState<string[]>([]);
  const [running, setRunning] = useState(true);
  const [exitCode, setExitCode] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completeRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    completeRef.current = false;
    const poll = async () => {
      try {
        const st = await api.getActionStatus(action, 400);
        if (cancelled) return;
        setLines(st.lines);
        setRunning(st.running);
        setExitCode(st.exit_code);
        if (!st.running && !completeRef.current) {
          completeRef.current = true;
          onComplete?.(action, st.exit_code);
        }
        if (st.running) timer.current = setTimeout(poll, 1200);
      } catch {
        if (!cancelled) setRunning(false);
      }
    };
    poll();
    return () => {
      cancelled = true;
      if (timer.current) clearTimeout(timer.current);
    };
  }, [action, onComplete]);

  return (
    <Card>
      <CardContent className="py-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono text-sm">{action}</span>
            {running ? (
              <Badge tone="warning">{p.running}</Badge>
            ) : (
              <Badge tone={exitCode === 0 ? "success" : "destructive"}>
                {exitCode === 0 ? p.done : p.exitCode(exitCode)}
              </Badge>
            )}
          </div>
          <Button ghost size="icon" onClick={onClose} aria-label={p.closeLog}>
            <X />
          </Button>
        </div>
        <pre className="max-h-72 overflow-auto whitespace-pre-wrap break-words bg-background/50 border border-border p-3 text-xs font-mono text-muted-foreground">
          {lines.length ? lines.join("\n") : p.starting}
        </pre>
      </CardContent>
    </Card>
  );
}

const HOOK_EVENTS_FALLBACK = [
  "pre_tool_call",
  "post_tool_call",
  "pre_llm_call",
  "post_llm_call",
  "on_session_start",
  "on_session_end",
];

const MEMORY_STATUS_TONE: Record<
  MemoryProviderInfo["status"],
  "success" | "warning" | "destructive" | "secondary"
> = {
  ready: "success",
  needs_config: "warning",
  unavailable: "destructive",
  missing: "destructive",
};

export default function SystemPage() {
  const p = usePageCopy(systemEn, systemAr);
  const { toast, showToast } = useToast();

  const [status, setStatus] = useState<StatusResponse | null>(null);
  const [stats, setStats] = useState<SystemStats | null>(null);
  const [memory, setMemory] = useState<MemoryStatus | null>(null);
  const [pool, setPool] = useState<CredentialPoolProvider[]>([]);
  const [checkpoints, setCheckpoints] = useState<CheckpointsResponse | null>(
    null,
  );
  const [hooks, setHooks] = useState<HooksResponse | null>(null);
  const [curator, setCurator] = useState<CuratorStatus | null>(null);
  const [portal, setPortal] = useState<PortalStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [migratePlan, setMigratePlan] = useState<GatewayMigratePlan | null>(null);

  // Add-credential form.
  const [credProvider, setCredProvider] = useState("openrouter");
  const [credKey, setCredKey] = useState("");
  const [credLabel, setCredLabel] = useState("");
  const [addingCred, setAddingCred] = useState(false);

  const [pendingBackupArchive, setPendingBackupArchive] = useState<string | null>(
    null,
  );
  const [downloadableBackupArchive, setDownloadableBackupArchive] = useState<
    string | null
  >(null);
  const [downloadingBackup, setDownloadingBackup] = useState(false);
  const importUploadInputRef = useRef<HTMLInputElement | null>(null);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importPath, setImportPath] = useState("");
  // Restore-from-backup is destructive (overwrites the live config) and the
  // spawned `hermes import` runs non-interactively (stdin is /dev/null), so
  // its CLI "Continue? [y/N]" prompt would auto-abort. The dashboard owns the
  // consent: confirm here, then call the endpoint with force=true.
  const [importingBackup, setImportingBackup] = useState(false);
  const [importConfirmTarget, setImportConfirmTarget] =
    useState<BackupImportTarget | null>(null);

  // Create-hook modal.
  const [hookModalOpen, setHookModalOpen] = useState(false);
  const closeHookModal = useCallback(() => setHookModalOpen(false), []);
  const hookModalRef = useModalBehavior({
    open: hookModalOpen,
    onClose: closeHookModal,
  });
  const [hookEvent, setHookEvent] = useState("pre_tool_call");
  const [hookCommand, setHookCommand] = useState("");
  const [hookMatcher, setHookMatcher] = useState("");
  const [hookTimeout, setHookTimeout] = useState("");
  const [hookApprove, setHookApprove] = useState(true);
  const [creatingHook, setCreatingHook] = useState(false);

  // ── Update check ───────────────────────────────────────────────────
  const [updateInfo, setUpdateInfo] = useState<UpdateCheckResponse | null>(
    null,
  );
  const [checkingUpdate, setCheckingUpdate] = useState(false);
  const [updateConfirmOpen, setUpdateConfirmOpen] = useState(false);

  const loadAll = useCallback(() => {
    Promise.allSettled([
      api.getStatus(),
      api.getSystemStats(),
      api.getMemory(),
      api.getCredentialPool(),
      api.getCheckpoints(),
      api.getHooks(),
      api.getCurator(),
      api.getPortal(),
      // Cached (non-forced) check so the version row shows update status on
      // load without a separate effect / a forced network round-trip.
      api.checkHermesUpdate(false),
      api.getGatewayMigratePlan(),
    ])
      .then(([s, st, m, p, c, h, cur, prt, upd, mig]) => {
        if (s.status === "fulfilled") setStatus(s.value);
        if (st.status === "fulfilled") setStats(st.value);
        if (m.status === "fulfilled") setMemory(m.value);
        if (p.status === "fulfilled") setPool(p.value.providers);
        if (c.status === "fulfilled") setCheckpoints(c.value);
        if (h.status === "fulfilled") setHooks(h.value);
        if (cur.status === "fulfilled") setCurator(cur.value);
        if (prt.status === "fulfilled") setPortal(prt.value);
        if (upd.status === "fulfilled") setUpdateInfo(upd.value);
        if (mig.status === "fulfilled") setMigratePlan(mig.value);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  // ── Gateway lifecycle ──────────────────────────────────────────────
  // A profile served by the shared multiplexer has no gateway of its own: Restart restarts
  // the ONE process every bot on this device runs in, so confirm first and say so after;
  // Start/Stop answer 409 with an explanation that belongs in a notice, not a raw error.
  const sharedGateway = sharedGatewayProfiles(status);
  const [sharedRestartOpen, setSharedRestartOpen] = useState(false);
  const [servedNotice, setServedNotice] = useState<string | null>(null);
  const runGateway = async (verb: "start" | "stop" | "restart"): Promise<boolean> => {
    setServedNotice(null);
    try {
      if (verb === "start") {
        await api.startGateway();
        setActiveAction("gateway-start");
      } else if (verb === "stop") {
        await api.stopGateway();
        setActiveAction("gateway-stop");
      } else {
        await api.restartGateway();
        setActiveAction("gateway-restart");
      }
      showToast(p.gatewayVerbStarted(verb), "success");
      setTimeout(loadAll, 3000);
      return true;
    } catch (e) {
      const refusal = servedProfileRefusal(e);
      if (refusal) {
        setServedNotice(refusal);
        return false;
      }
      showToast(gatewayActionFailedMessage(verb, errorMessage(e), e), "error");
      return false;
    }
  };
  const requestRestart = () => {
    if (sharedGateway) {
      setSharedRestartOpen(true);
      return;
    }
    void runGateway("restart");
  };
  // Same completion rule as the Desktop: the restart child exiting 0, or still running when the
  // bounded poll ends (in a no-service install it BECOMES the gateway and never exits), is
  // success — then the "(N bots)" toast; a non-zero exit is the action log's failure to show.
  const restartShared = async () => {
    const bots = sharedGateway?.length ?? 0;
    const started = await runGateway("restart");
    if (!started) return;
    for (let attempt = 0; attempt < 18; attempt += 1) {
      await new Promise((r) => setTimeout(r, 1200));
      const st = await api.getActionStatus("gateway-restart", 1).catch(() => null);
      if (st && !st.running) {
        if (st.exit_code != null && st.exit_code !== 0) return;
        break;
      }
    }
    showToast(sharedGatewayRestartedMessage(bots), "success");
  };

  const migrateToMultiplex = async () => {
    try {
      await api.migrateGatewayToMultiplex();
      setActiveAction("gateway-migrate");
      showToast(p.migrating, "success");
      setTimeout(loadAll, 5000);
    } catch (e) {
      showToast(p.migrationFailed(errorMessage(e)), "error");
    }
  };

  // ── Curator ────────────────────────────────────────────────────────
  const toggleCuratorPaused = async () => {
    if (!curator) return;
    try {
      await api.setCuratorPaused(!curator.paused);
      showToast(curator.paused ? p.curatorResumed : p.curatorPaused, "success");
      loadAll();
    } catch (e) {
      showToast(p.curatorToggleFailed(errorMessage(e)), "error");
    }
  };

  // ── Memory ─────────────────────────────────────────────────────────
  // Memory provider selection lives on the /plugins page now (see the
  // read-only display + link below); the dropdown was intentionally
  // dropped from this card during the admin-panel refresh.
  const memoryReset = useConfirmDelete({
    onDelete: useCallback(
      async (target: string) => {
        try {
          const res = await api.resetMemory(
            target as "all" | "memory" | "user",
          );
          showToast(p.resetDone(res.deleted.join(", ") || p.nothing), "success");
          loadAll();
        } catch (e) {
          showToast(p.resetFailed(errorMessage(e)), "error");
          throw e;
        }
      },
      [loadAll, showToast, p],
    ),
  });

  // ── Credential pool ────────────────────────────────────────────────
  const addCredential = async () => {
    if (!credProvider.trim() || !credKey.trim()) {
      showToast(p.providerKeyRequired, "error");
      return;
    }
    setAddingCred(true);
    try {
      await api.addCredentialPoolEntry(
        credProvider.trim(),
        credKey.trim(),
        credLabel.trim() || undefined,
      );
      showToast(p.credentialAdded, "success");
      setCredKey("");
      setCredLabel("");
      loadAll();
    } catch (e) {
      showToast(p.addCredentialFailed(errorMessage(e)), "error");
    } finally {
      setAddingCred(false);
    }
  };

  const credDelete = useConfirmDelete({
    onDelete: useCallback(
      async (key: string) => {
        const [provider, idxStr] = key.split("|");
        try {
          await api.removeCredentialPoolEntry(provider, Number(idxStr));
          showToast(p.credentialRemoved, "success");
          loadAll();
        } catch (e) {
          showToast(p.removeFailed(errorMessage(e)), "error");
          throw e;
        }
      },
      [loadAll, showToast, p],
    ),
  });

  // ── Operations ─────────────────────────────────────────────────────
  const runOp = async (fn: () => Promise<{ name: string }>, label: string) => {
    try {
      const res = await fn();
      setActiveAction(res.name);
      showToast(p.opStarted(label), "success");
    } catch (e) {
      showToast(p.opFailed(label, errorMessage(e)), "error");
    }
  };

  const runDashboardBackup = async () => {
    try {
      const res = await api.runBackup();
      setActiveAction(res.name);
      setPendingBackupArchive(res.archive ?? null);
      setDownloadableBackupArchive(null);
      showToast(p.backupStarted, "success");
    } catch (e) {
      showToast(p.backupFailed(errorMessage(e)), "error");
    }
  };

  const handleActionComplete = useCallback(
    (action: string, exitCode: number | null) => {
      if (action === "backup" && pendingBackupArchive) {
        if (exitCode === 0) {
          setDownloadableBackupArchive(pendingBackupArchive);
          showToast(p.backupReady, "success");
        } else {
          setPendingBackupArchive(null);
        }
      }
    },
    [pendingBackupArchive, showToast, p],
  );

  const downloadBackup = async () => {
    const archive = downloadableBackupArchive;
    if (!archive) return;
    setDownloadingBackup(true);
    try {
      const res = await api.downloadBackup(archive);
      if (!res.ok) {
        throw apiErrorFromResponse(res.status, await res.text().catch(() => ""), res.url);
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = backupFileName(archive, p);
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      showToast(p.downloadFailed(errorMessage(e)), "error");
    } finally {
      setDownloadingBackup(false);
    }
  };

  const clearImportFile = () => {
    setImportFile(null);
    if (importUploadInputRef.current) importUploadInputRef.current.value = "";
  };

  const runBackupImport = async (target: BackupImportTarget) => {
    setImportingBackup(true);
    try {
      const res =
        target.kind === "upload"
          ? await api.runImportUpload(target.file, true)
          : await api.runImport(target.path, true);
      setActiveAction(res.name);
      showToast(p.importStarted, "success");
      if (target.kind === "upload") clearImportFile();
    } catch (e) {
      showToast(p.importFailed(errorMessage(e)), "error");
    } finally {
      setImportingBackup(false);
    }
  };

  // ── Debug share ────────────────────────────────────────────────────
  // Unlike the fire-and-forget ops above, `debug share` produces shareable
  // paste URLs that are the whole point — so we surface them as real,
  // copyable links rather than a log tail.
  const [shareRedact, setShareRedact] = useState(true);
  const [sharing, setSharing] = useState(false);
  const [shareResult, setShareResult] = useState<DebugShareResponse | null>(
    null,
  );
  const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

  const copyToClipboard = useCallback(
    async (text: string, label: string) => {
      if (await copyTextToClipboard(text)) {
        setCopiedLabel(label);
        setTimeout(
          () => setCopiedLabel((cur) => (cur === label ? null : cur)),
          1500,
        );
      } else {
        showToast(p.copyFailed, "error");
      }
    },
    [showToast, p],
  );

  const runDebugShare = useCallback(async () => {
    setSharing(true);
    setShareResult(null);
    try {
      const res = await api.runDebugShare({ redact: shareRedact });
      setShareResult(res);
      const n = Object.keys(res.urls).length;
      showToast(p.uploadedPastes(n, !!res.redacted), "success");
    } catch (e) {
      showToast(p.debugShareFailed(errorMessage(e)), "error");
    } finally {
      setSharing(false);
    }
  }, [shareRedact, showToast, p]);


  // ── Update check / apply ───────────────────────────────────────────
  const checkForUpdate = useCallback(
    async (force = false) => {
      if (status?.can_update_hermes === false) return;
      setCheckingUpdate(true);
      try {
        const info = await api.checkHermesUpdate(force);
        setUpdateInfo(info);
        if (force) {
          if (info.update_available) {
            showToast(updateToast(info, p), "success");
          } else if (info.behind === 0) {
            showToast(p.latestVersion, "success");
          } else if (info.message) {
            showToast(info.message, "error");
          }
        }
      } catch (e) {
        showToast(p.updateCheckFailed(errorMessage(e)), "error");
      } finally {
        setCheckingUpdate(false);
      }
    },
    [showToast, status?.can_update_hermes, p],
  );

  // Auto-check (cached) runs inside loadAll on mount; this is the
  // user-triggered forced re-check from the "Check for updates" button.
  const applyUpdate = async () => {
    setUpdateConfirmOpen(false);
    if (status?.can_update_hermes === false) {
      showToast(p.updatesManagedElsewhere, "success");
      return;
    }
    try {
      const resp = await api.updateHermes();
      if (!resp.ok) {
        showToast(
          resp.message ??
            p.updatesNotFromDashboard,
          "success",
        );
        return;
      }
      setActiveAction(resp.name ?? "hermes-update");
      showToast(p.updateStarted, "success");
    } catch (e) {
      showToast(p.updateFailed(errorMessage(e)), "error");
    }
  };

  const checkpointsPrune = useConfirmDelete({
    onDelete: useCallback(async () => {
      try {
        const res = await api.pruneCheckpoints();
        setActiveAction(res.name);
        showToast(p.pruneStarted, "success");
      } catch (e) {
        showToast(p.pruneFailed(errorMessage(e)), "error");
        throw e;
      }
    }, [showToast, p]),
  });

  // ── Hooks ──────────────────────────────────────────────────────────
  const createHook = async () => {
    if (!hookCommand.trim()) {
      showToast(p.commandRequired, "error");
      return;
    }
    setCreatingHook(true);
    try {
      await api.createHook({
        event: hookEvent,
        command: hookCommand.trim(),
        matcher: hookMatcher.trim() || undefined,
        timeout: hookTimeout.trim() ? Number(hookTimeout) : undefined,
        approve: hookApprove,
      });
      showToast(p.hookCreated, "success");
      setHookCommand("");
      setHookMatcher("");
      setHookTimeout("");
      setHookModalOpen(false);
      loadAll();
    } catch (e) {
      showToast(p.createHookFailed(errorMessage(e)), "error");
    } finally {
      setCreatingHook(false);
    }
  };

  const hookDelete = useConfirmDelete({
    onDelete: useCallback(
      async (key: string) => {
        const sep = key.indexOf("|");
        const event = key.slice(0, sep);
        const command = key.slice(sep + 1);
        try {
          await api.deleteHook(event, command);
          showToast(p.hookRemoved, "success");
          loadAll();
        } catch (e) {
          showToast(p.removeHookFailed(errorMessage(e)), "error");
          throw e;
        }
      },
      [loadAll, showToast, p],
    ),
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner className="text-2xl text-primary" />
      </div>
    );
  }

  const gatewayRunning = status?.gateway_running;
  const canUpdateHermes = status?.can_update_hermes !== false;
  const activeMemoryProvider = memory?.active
    ? memory.providers.find((provider) => provider.name === memory.active)
    : null;
  const validEvents = hooks?.valid_events?.length
    ? hooks.valid_events
    : HOOK_EVENTS_FALLBACK;

  return (
    <div className="flex flex-col gap-8">
      <Toast toast={toast} />
      <input
        ref={importUploadInputRef}
        type="file"
        accept=".zip,application/zip,application/x-zip-compressed"
        className="hidden"
        onChange={(event) => {
          setImportFile(event.currentTarget.files?.[0] ?? null);
        }}
      />

      <ConfirmDialog
        open={sharedRestartOpen}
        onCancel={() => setSharedRestartOpen(false)}
        onConfirm={() => {
          setSharedRestartOpen(false);
          void restartShared();
        }}
        title={p.restartSharedTitle}
        description={sharedGatewayRestartDescription(sharedGateway ?? [])}
        confirmLabel={p.restartAll}
      />

      <ConfirmDialog
        open={canUpdateHermes && updateConfirmOpen}
        onCancel={() => setUpdateConfirmOpen(false)}
        onConfirm={() => void applyUpdate()}
        title={p.updateTitle}
        description={
          updateInfo && updateInfo.behind && updateInfo.behind > 0
            ? p.updateDescBehind(updateInfo.update_command, updateInfo.behind)
            : p.updateDesc(updateInfo?.update_command ?? "hermes update")
        }
        confirmLabel={p.updateNow}
      />

      <DeleteConfirmDialog
        open={memoryReset.isOpen}
        onCancel={memoryReset.cancel}
        onConfirm={memoryReset.confirm}
        title={p.resetMemoryTitle}
        description={p.resetMemoryDesc}
        loading={memoryReset.isDeleting}
      />
      <DeleteConfirmDialog
        open={credDelete.isOpen}
        onCancel={credDelete.cancel}
        onConfirm={credDelete.confirm}
        title={p.removeCredentialTitle}
        description={p.removeCredentialDesc}
        loading={credDelete.isDeleting}
      />
      <DeleteConfirmDialog
        open={checkpointsPrune.isOpen}
        onCancel={checkpointsPrune.cancel}
        onConfirm={checkpointsPrune.confirm}
        title={p.pruneTitle}
        description={p.pruneDesc}
        loading={checkpointsPrune.isDeleting}
      />
      <DeleteConfirmDialog
        open={hookDelete.isOpen}
        onCancel={hookDelete.cancel}
        onConfirm={hookDelete.confirm}
        title={p.removeHookTitle}
        description={p.removeHookDesc}
        loading={hookDelete.isDeleting}
      />
      <HermesConsoleModal
        open={consoleOpen}
        onClose={() => setConsoleOpen(false)}
      />

      {/* Create-hook modal */}
      {hookModalOpen && (
        <div
          ref={hookModalRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/85 p-4"
          onClick={(e) => e.target === e.currentTarget && setHookModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div className={cn(themedBody, "relative w-full max-w-lg border border-border bg-card shadow-2xl flex flex-col")}>
            <Button
              ghost
              size="icon"
              onClick={() => setHookModalOpen(false)}
              className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
              aria-label={p.close}
            >
              <X />
            </Button>
            <header className="p-5 pb-3 border-b border-border">
              <h2 className="font-mondwest text-display text-base tracking-wider">
                {p.newShellHook}
              </h2>
            </header>
            <div className="p-5 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="hook-event">{p.event}</Label>
                <Select
                  id="hook-event"
                  value={hookEvent}
                  onValueChange={(v) => setHookEvent(v)}
                >
                  {validEvents.map((ev) => (
                    <SelectOption key={ev} value={ev}>
                      {ev}
                    </SelectOption>
                  ))}
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="hook-command">{p.commandAbsPath}</Label>
                <Input
                  id="hook-command"
                  autoFocus
                  placeholder="/usr/local/bin/my-hook.sh"
                  value={hookCommand}
                  onChange={(e) => setHookCommand(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="hook-matcher">{p.matcherOptional}</Label>
                  <Input
                    id="hook-matcher"
                    placeholder={p.matcherPlaceholder}
                    value={hookMatcher}
                    onChange={(e) => setHookMatcher(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="hook-timeout">{p.timeoutSeconds}</Label>
                  <Input
                    id="hook-timeout"
                    placeholder="10"
                    value={hookTimeout}
                    onChange={(e) => setHookTimeout(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Checkbox
                  checked={hookApprove}
                  id="hook-approve"
                  onCheckedChange={(checked) => setHookApprove(checked === true)}
                />

                <Label
                  className="cursor-pointer text-sm font-normal normal-case tracking-normal text-muted-foreground"
                  htmlFor="hook-approve"
                >
                  {p.approveNow}
                </Label>
              </div>
              <p className="text-xs text-warning">
                {p.hookWarning}
              </p>
              <div className="flex justify-end">
                <Button
                  className="uppercase"
                  size="sm"
                  onClick={createHook}
                  disabled={creatingHook}
                  prefix={creatingHook ? <Spinner /> : undefined}
                >
                  {creatingHook ? p.creating : p.createHook}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Live action log */}
      {activeAction && (
        <ActionLogViewer
          action={activeAction}
          onComplete={handleActionComplete}
          onClose={() => setActiveAction(null)}
        />
      )}

      {/* ── Host / system stats ───────────────────────────────────── */}
      <section className="flex flex-col gap-3">
        <H2 variant="sm" className="flex items-center gap-2 text-muted-foreground">
          <Server className="h-4 w-4" /> {p.host}
        </H2>
        <Card>
          <CardContent className="py-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-6 text-sm">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">OS</div>
                <div>{stats?.os} {stats?.os_release}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{p.arch}</div>
                <div>{stats?.arch}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{p.host}</div>
                <div className="truncate">{stats?.hostname}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Python</div>
                <div>{stats?.python_impl} {stats?.python_version}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Hermes</div>
                <div className="flex items-center gap-2">
                  <span>v{stats?.hermes_version}</span>
                  {canUpdateHermes &&
                    updateInfo &&
                    (updateInfo.update_available ? (
                      <Badge tone="warning">
                        {updateBadge(updateInfo, p)}
                      </Badge>
                    ) : updateInfo.behind === 0 ? (
                      <Badge tone="success">{p.latest}</Badge>
                    ) : null)}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <Cpu className="h-3 w-3" /> CPU
                </div>
                <div>
                  {stats?.cpu_count ?? "—"} {p.cores}
                  {typeof stats?.cpu_percent === "number"
                    ? ` · ${stats.cpu_percent.toFixed(0)}%`
                    : ""}
                </div>
              </div>
              {stats?.memory && (
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{p.memory}</div>
                  <div>
                    {formatBytes(stats.memory.used)} / {formatBytes(stats.memory.total)} ({stats.memory.percent}%)
                  </div>
                </div>
              )}
              {stats?.disk && (
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                    <HardDrive className="h-3 w-3" /> {p.disk}
                  </div>
                  <div>
                    {formatBytes(stats.disk.used)} / {formatBytes(stats.disk.total)} ({stats.disk.percent}%)
                  </div>
                </div>
              )}
              {typeof stats?.uptime_seconds === "number" && (
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{p.uptime}</div>
                  <div>{formatDuration(stats.uptime_seconds, p)}</div>
                </div>
              )}
              {stats?.load_avg && stats.load_avg.length >= 3 && (
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{p.loadAvg}</div>
                  <div>{stats.load_avg.map((n) => n.toFixed(2)).join(" / ")}</div>
                </div>
              )}
            </div>
            {stats && !stats.psutil && (
              <p className="mt-3 text-xs text-muted-foreground">
                {p.psutilBefore} <span className="font-mono">psutil</span>{" "}
                {p.psutilAfter}
              </p>
            )}
            {canUpdateHermes && (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                <Button
                  size="sm"
                  ghost
                  disabled={checkingUpdate}
                  prefix={
                    checkingUpdate ? (
                      <Spinner className="h-3.5 w-3.5" />
                    ) : (
                      <RotateCw className="h-3.5 w-3.5" />
                    )
                  }
                  onClick={() => void checkForUpdate(true)}
                >
                  {p.checkForUpdates}
                </Button>
                {updateInfo?.update_available && updateInfo.can_apply && (
                  <Button
                    size="sm"
                    prefix={<Download className="h-3.5 w-3.5" />}
                    onClick={() => setUpdateConfirmOpen(true)}
                  >
                    {p.updateNow}
                  </Button>
                )}
                {updateInfo &&
                  !updateInfo.can_apply &&
                  updateInfo.update_available && (
                    <span className="text-xs text-muted-foreground">
                      {p.updateWith}{" "}
                      <span className="font-mono">{updateInfo.update_command}</span>
                    </span>
                  )}
                {updateInfo?.message && !updateInfo.update_available && (
                  <span className="text-xs text-muted-foreground">
                    {updateInfo.message}
                  </span>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* ── Portal ────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-3">
        <H2 variant="sm" className="flex items-center gap-2 text-muted-foreground">
          <Globe className="h-4 w-4" /> Nous Portal
        </H2>
        <Card>
          <CardContent className="flex flex-col gap-3 py-4">
            <div className="flex items-center gap-3">
              <Badge tone={portal?.logged_in ? "success" : "secondary"}>
                {portal?.logged_in ? p.loggedIn : p.notLoggedIn}
              </Badge>
              {portal?.provider && (
                <span className="text-sm text-muted-foreground">
                  {p.inferenceProvider(portal.provider)}
                </span>
              )}
              <a
                href={portal?.subscription_url || "https://portal.nousresearch.com/manage-subscription"}
                target="_blank"
                rel="noreferrer"
                className="ml-auto text-xs text-primary underline"
              >
                {p.manageSubscription}
              </a>
            </div>
            {portal?.features && portal.features.length > 0 && (
              <div className="flex flex-col gap-1 border-t border-border pt-3">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {p.toolGatewayRouting}
                </span>
                {portal.features.map((f) => (
                  <div key={f.label} className="flex items-center justify-between text-sm">
                    <span>{f.label}</span>
                    <span className="text-muted-foreground">{f.state}</span>
                  </div>
                ))}
              </div>
            )}
            {!portal?.logged_in && (
              <p className="text-xs text-muted-foreground">
                {p.logInWith} <span className="font-mono">hermes portal</span>.
              </p>
            )}
          </CardContent>
        </Card>
      </section>

      {/* ── Curator ───────────────────────────────────────────────── */}
      <section className="flex flex-col gap-3">
        <H2 variant="sm" className="flex items-center gap-2 text-muted-foreground">
          <Sparkles className="h-4 w-4" /> {p.skillCurator}
        </H2>
        <Card>
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <Badge tone={curator?.paused ? "warning" : curator?.enabled ? "success" : "secondary"}>
                {curator?.paused ? p.paused : curator?.enabled ? p.active : p.disabled}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {curator?.interval_hours ? p.everyHours(curator.interval_hours) : ""}
                {curator?.last_run_at ? p.lastRun(new Date(curator.last_run_at).toLocaleString()) : p.neverRun}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" ghost onClick={toggleCuratorPaused}>
                {curator?.paused ? p.resume : p.pause}
              </Button>
              <Button
                size="sm"
                ghost
                prefix={<Play className="h-3.5 w-3.5" />}
                onClick={() => runOp(api.runCurator, p.curatorReview)}
              >
                {p.runNow}
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── Gateway ───────────────────────────────────────────────── */}
      <section className="flex flex-col gap-3">
        <H2 variant="sm" className="flex items-center gap-2 text-muted-foreground">
          <Power className="h-4 w-4" /> {p.gateway}
        </H2>
        <Card>
          <CardContent className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <Badge tone={gatewayRunning ? "success" : "secondary"}>
                {gatewayRunning ? p.running : p.stopped}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {gatewayStateDescription(status?.gateway_state, gatewayRunning)}
              </span>
              {gatewayStateNeedsLogs(status?.gateway_state) && (
                <Link to="/logs?file=gateway" className="text-sm underline">
                  {p.openLogs}
                </Link>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                className="uppercase"
                onClick={() => runGateway("start")}
                disabled={gatewayRunning}
                prefix={<Play className="h-3.5 w-3.5" />}
              >
                {p.start}
              </Button>
              <Button
                size="sm"
                className="uppercase"
                onClick={requestRestart}
                prefix={<RotateCw className="h-3.5 w-3.5" />}
              >
                {p.restart}
              </Button>
              <Button
                size="sm"
                className="uppercase text-warning"
                ghost
                onClick={() => runGateway("stop")}
                disabled={!gatewayRunning}
                prefix={<Power className="h-3.5 w-3.5" />}
              >
                {p.stop}
              </Button>
            </div>
          </CardContent>
          {(sharedGateway || servedNotice) && (
            <CardContent className="border-t border-current/10 py-3 text-xs text-muted-foreground" data-slot="shared-gateway-notice">
              {servedNotice ?? p.servedByShared(sharedGateway!.join(", "))}
            </CardContent>
          )}
          {migratePlan && !migratePlan.already_multiplexed && migratePlan.profiles.length > 1 && (
            migratePlan.eligible || migratePlan.blockers.length > 0
          ) && (
            <CardContent className="flex flex-col gap-2 border-t border-border py-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">
                  {p.multiplexHint}
                </span>
                <Button
                  size="sm"
                  className="uppercase"
                  onClick={migrateToMultiplex}
                  disabled={!migratePlan.eligible}
                  title={migratePlan.eligible ? undefined : p.fixBlockersFirst}
                >
                  {p.migrateToMultiplex}
                </Button>
              </div>
              {migratePlan.blockers.map((b) => (
                <div key={b} className="text-warning">• {b}</div>
              ))}
            </CardContent>
          )}
        </Card>
      </section>

      {/* ── Memory ────────────────────────────────────────────────── */}
      <section className="flex flex-col gap-3">
        <H2 variant="sm" className="flex items-center gap-2 text-muted-foreground">
          <Brain className="h-4 w-4" /> {p.memory}
        </H2>
        <Card>
          <CardContent className="flex flex-col gap-4 py-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span>
                {p.externalProvider}{" "}
                <span className="font-mono text-foreground">
                  {memory?.active || p.builtinOnly}
                </span>
              </span>
              {activeMemoryProvider && (
                <Badge tone={MEMORY_STATUS_TONE[activeMemoryProvider.status]}>
                  {p.memoryStatus[activeMemoryProvider.status]}
                </Badge>
              )}
              <Link to="/plugins" className="underline">
                {p.changeInPlugins}
              </Link>
              <span className="ml-auto">
                {p.providerSetup}{" "}
                <Link to="/plugins" className="underline">
                  {p.configureInPlugins}
                </Link>
              </span>
            </div>

            {activeMemoryProvider?.status === "missing" && (
              <p className="border border-destructive/50 px-3 py-2 text-xs text-destructive">
                {p.providerMissing}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-3 border-t border-border pt-3">
              <span className="text-xs text-muted-foreground">
                {p.builtinFiles} MEMORY.md:{" "}
                {formatBytes(memory?.builtin_files.memory ?? 0)} · USER.md:{" "}
                {formatBytes(memory?.builtin_files.user ?? 0)}
              </span>
              <div className="flex items-center gap-2 ml-auto">
                <Button size="sm" ghost className="text-destructive" onClick={() => memoryReset.requestDelete("memory")}>
                  {p.resetFile("MEMORY.md")}
                </Button>
                <Button size="sm" ghost className="text-destructive" onClick={() => memoryReset.requestDelete("user")}>
                  {p.resetFile("USER.md")}
                </Button>
                <Button size="sm" ghost className="text-destructive" onClick={() => memoryReset.requestDelete("all")}>
                  {p.resetAll}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* ── Credential pool ───────────────────────────────────────── */}
      <section className="flex flex-col gap-3">
        <H2 variant="sm" className="flex items-center gap-2 text-muted-foreground">
          <KeyRound className="h-4 w-4" /> {p.credentialPool}
        </H2>
        <Card>
          <CardContent className="flex flex-col gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
              <div className="grid gap-2">
                <Label htmlFor="cred-provider">{p.provider}</Label>
                <Input id="cred-provider" value={credProvider} onChange={(e) => setCredProvider(e.target.value)} placeholder="openrouter" />
              </div>
              <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="cred-key">{p.apiKey}</Label>
                <Input id="cred-key" type="password" value={credKey} onChange={(e) => setCredKey(e.target.value)} placeholder="sk-…" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cred-label">{p.label}</Label>
                <Input id="cred-label" value={credLabel} onChange={(e) => setCredLabel(e.target.value)} placeholder={p.optional} />
              </div>
            </div>
            <div className="flex justify-end">
              <Button size="sm" className="uppercase" onClick={addCredential} disabled={addingCred} prefix={addingCred ? <Spinner /> : undefined}>
                {p.addKey}
              </Button>
            </div>
            {pool.length === 0 && (
              <p className="text-sm text-muted-foreground">
                {p.noPooled}
              </p>
            )}
            {pool.map((prov) => (
              <div key={prov.provider} className="flex flex-col gap-2">
                <span className="text-xs uppercase tracking-wider text-muted-foreground">
                  {prov.provider}
                </span>
                {prov.entries.map((entry) => (
                  <div key={`${prov.provider}-${entry.index}`} className="flex items-center gap-3 border border-border bg-background/40 px-3 py-2">
                    <span className="text-sm font-medium">{entry.label}</span>
                    <span className="font-mono text-xs text-muted-foreground">{entry.token_preview}</span>
                    <Badge tone="outline">{entry.auth_type}</Badge>
                    {entry.last_status && <Badge tone="secondary">{entry.last_status}</Badge>}
                    <Button ghost size="icon" className="ml-auto text-destructive" aria-label={p.removeCredential} onClick={() => credDelete.requestDelete(`${prov.provider}|${entry.index}`)}>
                      <Trash2 />
                    </Button>
                  </div>
                ))}
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* ── Operations ────────────────────────────────────────────── */}
      <section className="flex flex-col gap-3">
        <H2 variant="sm" className="flex items-center gap-2 text-muted-foreground">
          <Activity className="h-4 w-4" /> {p.operations}
        </H2>
        <Card>
          <CardContent className="flex flex-wrap gap-2 py-4">
            <Button size="sm" ghost prefix={<Terminal className="h-3.5 w-3.5" />} onClick={() => setConsoleOpen(true)}>
              {p.openConsole}
            </Button>
            <Button size="sm" ghost prefix={<Stethoscope className="h-3.5 w-3.5" />} onClick={() => runOp(api.runDoctor, p.doctor)}>
              {p.runDoctor}
            </Button>
            <Button size="sm" ghost prefix={<ShieldCheck className="h-3.5 w-3.5" />} onClick={() => runOp(api.runSecurityAudit, p.securityAudit)}>
              {p.securityAudit}
            </Button>
            <Button size="sm" ghost prefix={<RotateCw className="h-3.5 w-3.5" />} onClick={() => runOp(api.updateSkillsFromHub, p.skillsUpdate)}>
              {p.updateSkills}
            </Button>
            <Button size="sm" ghost prefix={<Activity className="h-3.5 w-3.5" />} onClick={() => runOp(api.runPromptSize, p.promptSize)}>
              {p.promptSize}
            </Button>
            <Button size="sm" ghost prefix={<Database className="h-3.5 w-3.5" />} onClick={() => runOp(api.runDump, p.supportDump)}>
              {p.supportDump}
            </Button>
            <Button size="sm" ghost prefix={<RotateCw className="h-3.5 w-3.5" />} onClick={() => runOp(api.runConfigMigrate, p.configMigrate)}>
              {p.migrateConfig}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
              <div className="grid min-w-0 flex-1 gap-2">
                <Label>{p.fullBackup}</Label>
                <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
                  <Button
                    size="sm"
                    ghost
                    prefix={<Database className="h-3.5 w-3.5" />}
                    onClick={() => void runDashboardBackup()}
                  >
                    {p.createBackup}
                  </Button>
                  <Button
                    size="sm"
                    ghost
                    disabled={!downloadableBackupArchive || downloadingBackup}
                    prefix={
                      downloadingBackup ? (
                        <Spinner className="h-3.5 w-3.5" />
                      ) : (
                        <Download className="h-3.5 w-3.5" />
                      )
                    }
                    onClick={() => void downloadBackup()}
                  >
                    {p.downloadBackup}
                  </Button>
                  <span
                    className="min-w-0 truncate text-xs text-muted-foreground"
                    title={pendingBackupArchive ?? p.noBackupYet}
                  >
                    {backupFileName(pendingBackupArchive, p)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-end">
              <div className="grid min-w-0 flex-1 gap-2">
                <Label>{p.restoreFromUpload}</Label>
                <div className="flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center">
                  <Button
                    type="button"
                    size="sm"
                    ghost
                    disabled={importingBackup}
                    prefix={<Upload className="h-3.5 w-3.5" />}
                    onClick={() => importUploadInputRef.current?.click()}
                  >
                    {p.chooseRestoreZip}
                  </Button>
                  <span
                    className="min-w-0 truncate text-xs text-muted-foreground"
                    title={importFile?.name ?? p.noArchiveSelected}
                  >
                    {importFile?.name ?? p.noArchiveSelected}
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                ghost
                disabled={!importFile || importingBackup}
                prefix={importingBackup ? <Spinner /> : undefined}
                onClick={() => {
                  if (!importFile) return;
                  setImportConfirmTarget({ kind: "upload", file: importFile });
                }}
              >
                {p.restoreUpload}
              </Button>
            </div>

            <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-end">
              <div className="grid min-w-0 flex-1 gap-2">
                <Label htmlFor="import-path">{p.restoreFromPath}</Label>
                <Input
                  id="import-path"
                  value={importPath}
                  onChange={(e) => setImportPath(e.target.value)}
                  placeholder="$HERMES_HOME/backups/hermes-backup.zip"
                />
              </div>
              <Button
                size="sm"
                ghost
                disabled={!importPath.trim() || importingBackup}
                prefix={importingBackup ? <Spinner /> : undefined}
                onClick={() => {
                  const path = importPath.trim();
                  if (!path) return;
                  setImportConfirmTarget({ kind: "path", path });
                }}
              >
                {p.restorePath}
              </Button>
            </div>
            <ConfirmDialog
              open={!!importConfirmTarget}
              title={p.restoreTitle}
              description={p.restoreDesc(backupImportLabel(importConfirmTarget, p))}
              destructive
              confirmLabel={p.restore}
              cancelLabel={p.cancel}
              onCancel={() => setImportConfirmTarget(null)}
              onConfirm={() => {
                const target = importConfirmTarget;
                setImportConfirmTarget(null);
                if (target) void runBackupImport(target);
              }}
            />
          </CardContent>
        </Card>

        {/* Debug share — uploads a redacted report + logs, returns shareable
            links. Separated from the buttons above because its output is
            persistent, copyable URLs, not a fire-and-forget log tail. */}
        <Card>
          <CardContent className="flex flex-col gap-3 py-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-start gap-2">
                <Share2 className="h-4 w-4 mt-0.5 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{p.shareDebugReport}</span>
                  <span className="text-xs text-muted-foreground max-w-prose">
                    {p.shareDebugDesc}
                  </span>
                </div>
              </div>
              <Button
                size="sm"
                disabled={sharing}
                prefix={
                  sharing ? (
                    <Spinner className="h-3.5 w-3.5" />
                  ) : (
                    <Share2 className="h-3.5 w-3.5" />
                  )
                }
                onClick={() => void runDebugShare()}
              >
                {sharing ? p.uploading : p.generateShareLink}
              </Button>
            </div>

            <div className="flex items-center gap-2.5">
              <Checkbox
                checked={shareRedact}
                disabled={sharing}
                id="share-redact"
                onCheckedChange={(checked) => setShareRedact(checked === true)}
              />

              <Label
                className="cursor-pointer select-none text-xs font-normal normal-case tracking-normal text-muted-foreground"
                htmlFor="share-redact"
              >
                {p.redactLabel}
              </Label>
            </div>

            {shareResult && (
              <div className="flex flex-col gap-2 border-t border-border pt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge tone="success">{p.uploaded}</Badge>
                    {shareResult.redacted ? (
                      <Badge tone="outline">{p.redacted}</Badge>
                    ) : (
                      <Badge tone="warning">{p.notRedacted}</Badge>
                    )}
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {p.autoDeletesIn(Math.round(shareResult.auto_delete_seconds / 3600))}
                    </span>
                  </div>
                  {Object.keys(shareResult.urls).length > 1 && (
                    <Button
                      size="sm"
                      ghost
                      prefix={
                        copiedLabel === "__all__" ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )
                      }
                      onClick={() =>
                        void copyToClipboard(
                          Object.entries(shareResult.urls)
                            .map(([label, url]) => `${label}: ${url}`)
                            .join("\n"),
                          "__all__",
                        )
                      }
                    >
                      {p.copyAll}
                    </Button>
                  )}
                </div>

                {Object.entries(shareResult.urls).map(([label, url]) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 bg-background/50 border border-border px-3 py-2"
                  >
                    <Link2 className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="font-mono text-xs shrink-0 w-24 truncate text-muted-foreground">
                      {label}
                    </span>
                    <a
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono text-xs truncate flex-1 text-primary hover:underline"
                    >
                      {url}
                    </a>
                    <Button
                      ghost
                      size="icon"
                      aria-label={p.copyLink(label)}
                      onClick={() => void copyToClipboard(url, label)}
                    >
                      {copiedLabel === label ? <Check /> : <Copy />}
                    </Button>
                  </div>
                ))}

                {shareResult.failures.length > 0 && (
                  <span className="text-xs text-destructive">
                    {p.someLogsFailed(shareResult.failures.join("; "))}
                  </span>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      {/* ── Checkpoints ───────────────────────────────────────────── */}
      <section className="flex flex-col gap-3">
        <H2 variant="sm" className="flex items-center gap-2 text-muted-foreground">
          <Database className="h-4 w-4" /> {p.checkpoints}
        </H2>
        <Card>
          <CardContent className="flex items-center justify-between py-4">
            <span className="text-sm text-muted-foreground">
              {p.sessionsCount(checkpoints?.sessions.length ?? 0)}{" "}
              {formatBytes(checkpoints?.total_bytes ?? 0)}
            </span>
            <Button size="sm" ghost className="text-destructive" disabled={!checkpoints?.sessions.length} prefix={<Trash2 className="h-3.5 w-3.5" />} onClick={() => checkpointsPrune.requestDelete("all")}>
              {p.prune}
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* ── Shell hooks ───────────────────────────────────────────── */}
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <H2 variant="sm" className="flex items-center gap-2 text-muted-foreground">
            <Terminal className="h-4 w-4" /> {p.shellHooks}
          </H2>
          <Button size="sm" className="uppercase" prefix={<Plus className="h-3.5 w-3.5" />} onClick={() => setHookModalOpen(true)}>
            {p.newHook}
          </Button>
        </div>
        {(!hooks || hooks.hooks.length === 0) && (
          <Card>
            <CardContent className="py-6 text-center text-sm text-muted-foreground">
              {p.noHooks}
            </CardContent>
          </Card>
        )}
        {hooks?.hooks.map((h: HookEntry, i) => (
          <Card key={`${h.event}-${i}`}>
            <CardContent className="flex items-center gap-3 py-3">
              <Badge tone="outline">{h.event}</Badge>
              {h.matcher && (
                <span className="text-xs text-muted-foreground">{p.matcher(h.matcher)}</span>
              )}
              <span className="font-mono text-xs truncate flex-1">{h.command}</span>
              {h.executable === false && (
                <Badge tone="destructive">{p.notExecutable}</Badge>
              )}
              <Badge tone={h.allowed ? "success" : "warning"}>
                {h.allowed ? p.allowed : p.notApproved}
              </Badge>
              <Button
                ghost
                size="icon"
                className="text-destructive"
                aria-label={p.removeHook}
                onClick={() =>
                  hookDelete.requestDelete(`${h.event}|${h.command ?? ""}`)
                }
              >
                <Trash2 />
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
