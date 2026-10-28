import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  Bot,
  Check,
  CheckCircle2,
  ExternalLink,
  Info,
  PlugZap,
  QrCode,
  Radio,
  RotateCw,
  Save,
  Settings2,
  WifiOff,
  X,
} from "lucide-react";
import * as QRCode from "qrcode";
import { Badge } from "@nous-research/ui/ui/components/badge";
import { Button } from "@nous-research/ui/ui/components/button";
import { Card, CardContent } from "@nous-research/ui/ui/components/card";
import { Input } from "@nous-research/ui/ui/components/input";
import { Label } from "@nous-research/ui/ui/components/label";
import { Spinner } from "@nous-research/ui/ui/components/spinner";
import { Switch } from "@nous-research/ui/ui/components/switch";
import { Toast } from "@nous-research/ui/ui/components/toast";
import { useToast } from "@nous-research/ui/hooks/use-toast";
import { api } from "@/lib/api";
import type {
  MessagingPlatform,
  MessagingPlatformEnvVar,
  MessagingPlatformUpdate,
  TelegramOnboardingStartResponse,
  WhatsAppOnboardingStartResponse,
} from "@/lib/api";
import { useModalBehavior } from "@/hooks/useModalBehavior";
import { AllowlistInput } from "@/components/AllowlistInput";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { usePageHeader } from "@/contexts/usePageHeader";
import { cn, themedBody } from "@/lib/utils";
import { errorMessage } from "@/lib/api-error";
import { usePageCopy } from "@/i18n/pages/use-page-copy";
import { channelsEn } from "@/i18n/pages/channels.en";
import { channelsAr } from "@/i18n/pages/channels.ar";

type ChannelsCopy = typeof channelsEn;

// State → badge mapping. The backend emits a small, fixed vocabulary plus
// whatever the live gateway runtime reports (connected/disconnected/fatal).
const STATE_BADGE: Record<
  string,
  "success" | "warning" | "destructive" | "secondary" | "outline"
> = {
  connected: "success",
  pending_restart: "warning",
  gateway_stopped: "warning",
  startup_failed: "destructive",
  disconnected: "warning",
  not_configured: "outline",
  disabled: "secondary",
  fatal: "destructive",
};

function stateBadge(state: string, copy: ChannelsCopy) {
  const tone = STATE_BADGE[state];
  if (!tone) return { tone: "outline" as const, label: state };
  const label = (copy.states as Record<string, string>)[state] ?? state;
  return { tone, label };
}

const TELEGRAM_USER_ID_RE = /^\d+$/;
const TELEGRAM_BOT_TOKEN_RE = /^\d+:[A-Za-z0-9_-]{30,}$/;
const SLACK_MEMBER_ID_RE = /^[UW][A-Z0-9]{2,}$/;
const SLACK_TOKEN_PREFIXES: Record<string, string> = {
  SLACK_BOT_TOKEN: "xoxb-",
  SLACK_APP_TOKEN: "xapp-",
};

function validateMessagingEnvField(
  field: MessagingPlatformEnvVar,
  value: string,
  copy: ChannelsCopy,
): string | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (field.key === "TELEGRAM_BOT_TOKEN" && !TELEGRAM_BOT_TOKEN_RE.test(trimmed)) {
    return copy.botTokenInvalid;
  }

  if (field.key === "TELEGRAM_ALLOWED_USERS") {
    const invalid = trimmed
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean)
      .find((part) => !TELEGRAM_USER_ID_RE.test(part));
    if (invalid) {
      return copy.telegramUserIdInvalid(invalid);
    }
  }

  const expectedPrefix = SLACK_TOKEN_PREFIXES[field.key];
  if (expectedPrefix && !trimmed.startsWith(expectedPrefix)) {
    return copy.mustStartWith(field.prompt || field.key, expectedPrefix);
  }

  if (field.key === "SLACK_ALLOWED_USERS") {
    // Mirror the gateway's parse (gateway/platforms/slack.py): drop empty
    // entries so a trailing/interior comma isn't rejected here. "*" is the
    // allow-all wildcard the gateway honors.
    const parts = trimmed
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    const invalid = parts.find((part) => part !== "*" && !SLACK_MEMBER_ID_RE.test(part));
    if (invalid) {
      return copy.slackMemberIdInvalid(invalid);
    }
  }

  return null;
}

function formatExpiry(expiresAt: string): string {
  const ms = Date.parse(expiresAt) - Date.now();
  if (!Number.isFinite(ms) || ms <= 0) return "expired";
  const seconds = Math.ceil(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${rest.toString().padStart(2, "0")}`;
}

function isTerminalTelegramOnboardingError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /\b410\b/.test(message) && /\b(expired|claimed|gone)\b/i.test(message);
}

function isTerminalWhatsAppOnboardingError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /\b410\b/.test(message) && /\b(expired|gone)\b/i.test(message);
}

function normalizeWhatsAppMode(mode: unknown): "bot" | "self-chat" | null {
  return mode === "bot" || mode === "self-chat" ? mode : null;
}

export default function ChannelsPage() {
  const p = usePageCopy(channelsEn, channelsAr);
  const [platforms, setPlatforms] = useState<MessagingPlatform[]>([]);
  const [envPath, setEnvPath] = useState("~/.hermes/.env");
  const [gatewayStartCommand, setGatewayStartCommand] = useState(
    "hermes gateway start",
  );
  const [loading, setLoading] = useState(true);
  const { toast, showToast } = useToast();
  const { setEnd } = usePageHeader();

  // Config modal state
  const [editing, setEditing] = useState<MessagingPlatform | null>(null);
  const [draftEnv, setDraftEnv] = useState<Record<string, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const closeEdit = useCallback(() => {
    setEditing(null);
    setFieldErrors({});
  }, []);
  const editModalRef = useModalBehavior({ open: editing !== null, onClose: closeEdit });

  // Per-card busy + restart-needed tracking
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [restartNeeded, setRestartNeeded] = useState(false);
  const [restarting, setRestarting] = useState(false);

  const gatewayRunning = platforms.length > 0 && platforms[0].gateway_running;

  const load = useCallback(() => {
    return api
      .getMessagingPlatforms()
      .then((res) => {
        setPlatforms(res.platforms);
        setEnvPath(res.env_path || "~/.hermes/.env");
        setGatewayStartCommand(res.gateway_start_command || "hermes gateway start");
      })
      .catch((e) => showToast(p.couldNotLoad(errorMessage(e)), "error"));
  }, [p, showToast]);

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [load]);

  const openConfig = (platform: MessagingPlatform) => {
    const initial: Record<string, string> = {};
    platform.env_vars.forEach((v) => {
      // Allowlists open with their saved entries (they are IDs, not secrets).
      initial[v.key] = v.is_list ? v.value || "" : "";
    });
    setDraftEnv(initial);
    setFieldErrors({});
    setEditing(platform);
  };

  const handleSave = async () => {
    if (!editing) return;
    // Only send fields the user actually filled in — leaving a field blank
    // preserves the existing value rather than clobbering it.
    const env: Record<string, string> = {};
    const clearEnv: string[] = [];
    editing.env_vars.forEach((field) => {
      const v = (draftEnv[field.key] || "").trim();
      if (field.is_list) {
        // Allowlists are prefilled, so an unchanged one is not an edit and an emptied one is a clear.
        if (v === (field.value || "")) return;
        if (v) env[field.key] = v;
        else if (field.is_set) clearEnv.push(field.key);
      } else if (v) {
        env[field.key] = v;
      }
    });
    if (Object.keys(env).length === 0 && clearEnv.length === 0) {
      showToast(p.nothingToSave, "error");
      return;
    }
    const missing = editing.env_vars.filter(
      (v) => v.required && !v.is_set && !env[v.key],
    );
    if (missing.length > 0) {
      showToast(p.fieldRequired(missing[0].prompt || missing[0].key), "error");
      return;
    }
    const nextFieldErrors: Record<string, string> = {};
    editing.env_vars.forEach((field) => {
      const message = validateMessagingEnvField(field, draftEnv[field.key] || "", p);
      if (message) nextFieldErrors[field.key] = message;
    });
    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors);
      showToast(p.fixFields, "error");
      return;
    }
    setSaving(true);
    try {
      const body: MessagingPlatformUpdate = {
        env,
        enabled: true,
        ...(clearEnv.length ? { clear_env: clearEnv } : {}),
      };
      const result = await api.updateMessagingPlatform(editing.id, body);
      showToast(
        result.hot_served
          ? p.savedConnecting(editing.name)
          : p.saved(editing.name),
        "success",
      );
      setEditing(null);
      if (!result.hot_served) setRestartNeeded(true);
      await load();
      if (result.hot_served) setTimeout(() => void load(), 4000);
    } catch (e) {
      showToast(p.failedToSave(errorMessage(e)), "error");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (platform: MessagingPlatform) => {
    const next = !platform.enabled;
    setTogglingId(platform.id);
    try {
      const result = await api.updateMessagingPlatform(platform.id, { enabled: next });
      setPlatforms((prev) =>
        prev.map((p) =>
          p.id === platform.id
            ? { ...p, enabled: next, state: next ? "pending_restart" : "disabled" }
            : p,
        ),
      );
      if (result.hot_served) setTimeout(() => void load(), 4000);
      else setRestartNeeded(true);
    } catch (e) {
      showToast(p.couldNotUpdate(errorMessage(e)), "error");
    } finally {
      setTogglingId(null);
    }
  };

  const handleTest = async (platform: MessagingPlatform) => {
    setTestingId(platform.id);
    try {
      const res = await api.testMessagingPlatform(platform.id);
      showToast(`${platform.name}: ${res.message}`, res.ok ? "success" : "error");
    } catch (e) {
      showToast(p.couldNotTest(errorMessage(e)), "error");
    } finally {
      setTestingId(null);
    }
  };

  const handleRestart = async () => {
    setRestarting(true);
    try {
      await api.restartGateway();
      showToast(p.gatewayRestarting, "success");
      setRestartNeeded(false);
      // Give the gateway a moment to come up, then refresh status.
      setTimeout(() => void load(), 4000);
    } catch (e) {
      showToast(p.failedToRestart(errorMessage(e)), "error");
    } finally {
      setRestarting(false);
    }
  };

  useLayoutEffect(() => {
    setEnd(
      <Button
        className="uppercase"
        size="sm"
        onClick={handleRestart}
        disabled={restarting}
        prefix={restarting ? <Spinner /> : <RotateCw className="h-4 w-4" />}
      >
        {restarting ? p.restarting : p.restartGateway}
      </Button>,
    );
    return () => setEnd(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setEnd, restarting, p]);

  const configured = useMemo(
    () => platforms.filter((p) => p.configured).length,
    [platforms],
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Spinner className="text-2xl text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <Toast toast={toast} />

      {/* Restart banner */}
      {restartNeeded && (
        <Card className="border-warning/50">
          <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-sm">
              <AlertTriangle className="h-4 w-4 shrink-0 text-warning" />
              <span>
                {p.changesSaved}
              </span>
            </div>
            <Button
              size="sm"
              className="uppercase shrink-0"
              onClick={handleRestart}
              disabled={restarting}
              prefix={restarting ? <Spinner /> : <RotateCw className="h-4 w-4" />}
            >
              {restarting ? p.restarting : p.restartNow}
            </Button>
          </CardContent>
        </Card>
      )}

      {!gatewayRunning && !restartNeeded && (
        <Card className="border-border">
          <CardContent className="flex items-center gap-2 p-4 text-sm text-muted-foreground">
            <WifiOff className="h-4 w-4 shrink-0" />
            <span>
              {p.gatewayNotRunningPrefix}
              <code className="font-courier">{gatewayStartCommand}</code>{" "}
              {p.gatewayNotRunningSuffix}
            </span>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground">
        {p.configuredSummaryPrefix(configured, platforms.length)}
        <code className="font-courier">{envPath}</code>
        {p.configuredSummarySuffix}
      </p>

      {/* Config modal */}
      {editing && (
        <div
          ref={editModalRef}
          className={cn(
            "fixed inset-0 z-[100] flex min-h-dvh items-start justify-center overflow-y-auto bg-background/85 px-4",
            "pb-[calc(1rem+env(safe-area-inset-bottom))] pt-[calc(1rem+env(safe-area-inset-top))]",
            "sm:items-center sm:p-4",
          )}
          onClick={(e) => e.target === e.currentTarget && setEditing(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="channel-config-title"
        >
          <div
            className={cn(
              themedBody,
              "relative flex max-h-[calc(100dvh-2rem)] w-full max-w-lg flex-col border border-border bg-card shadow-2xl sm:max-h-[90dvh]",
            )}
          >
            <Button
              ghost
              size="icon"
              onClick={() => setEditing(null)}
              className="absolute right-2 top-2 text-muted-foreground hover:text-foreground"
              aria-label={p.close}
            >
              <X />
            </Button>

            <header className="p-5 pb-3 border-b border-border">
              <h2
                id="channel-config-title"
                className="font-mondwest text-display text-base tracking-wider"
              >
                {editing.id === "telegram"
                  ? p.useOwnTelegramBot
                  : p.configureName(editing.name)}
              </h2>
              {editing.docs_url && (
                <a
                  href={editing.docs_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-xs text-primary hover:underline"
                >
                  {editing.id === "telegram" ? p.botFatherGuide : p.setupGuide}
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </header>

            <div className="grid gap-4 overflow-y-auto overscroll-contain p-4 sm:p-5">
              {editing.id === "telegram" && (
                <div className="grid gap-3 text-sm text-muted-foreground">
                  <p>
                    {p.telegramIntro}
                  </p>
                  <ol className="grid list-decimal gap-1.5 pl-5">
                    <li>
                      {p.stepOpen}
                      <span className="text-foreground">@BotFather</span>
                      {p.stepSend}
                      <code className="mx-1 font-courier text-xs">/newbot</code>
                      {p.stepFollow}
                    </li>
                    <li>{p.stepCopyToken}</li>
                    <li>
                      {p.stepMessage}
                      <span className="text-foreground">@userinfobot</span>
                      {p.stepFindId}
                    </li>
                  </ol>
                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
                    <a
                      href="https://t.me/BotFather"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      {p.openBotFather} <ExternalLink className="h-3 w-3" />
                    </a>
                    <a
                      href="https://t.me/userinfobot"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      {p.findUserId} <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                  <p className="text-xs">
                    {p.leaveBlankHelp}
                  </p>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                {editing.description}
              </p>
              {editing.env_vars.map((field: MessagingPlatformEnvVar) => (
                <div className="grid gap-1.5" key={field.key}>
                  <div className="flex items-center gap-1.5">
                    <Label htmlFor={`field-${field.key}`}>
                      {field.prompt || field.key}
                      {field.required ? " *" : ""}
                    </Label>
                    {field.help && (
                      <span
                        aria-label={field.help}
                        className="inline-flex text-muted-foreground hover:text-foreground"
                        role="img"
                        title={field.help}
                      >
                        <Info className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </div>
                  {field.description && (
                    <span className="text-xs text-muted-foreground">
                      {field.description}
                    </span>
                  )}
                  {field.is_list ? (
                    <AllowlistInput
                      id={`field-${field.key}`}
                      label={field.prompt || field.key}
                      value={draftEnv[field.key] ?? ""}
                      invalid={Boolean(fieldErrors[field.key])}
                      onChange={(nextValue) => {
                        setDraftEnv((prev) => ({ ...prev, [field.key]: nextValue }));
                        setFieldErrors((prev) => {
                          if (!prev[field.key]) return prev;
                          const next = { ...prev };
                          delete next[field.key];
                          return next;
                        });
                      }}
                    />
                  ) : (
                  <Input
                    id={`field-${field.key}`}
                    type={field.is_password ? "password" : "text"}
                    className="text-base leading-6 sm:text-xs sm:leading-4"
                    placeholder={
                      field.is_set
                        ? field.redacted_value || p.keepPlaceholder
                        : field.key
                    }
                    value={draftEnv[field.key] ?? ""}
                    aria-invalid={Boolean(fieldErrors[field.key])}
                    onChange={(e) => {
                      const nextValue = e.target.value;
                      setDraftEnv((prev) => ({ ...prev, [field.key]: nextValue }));
                      setFieldErrors((prev) => {
                        if (!prev[field.key]) return prev;
                        const next = { ...prev };
                        delete next[field.key];
                        return next;
                      });
                    }}
                  />
                  )}
                  {fieldErrors[field.key] && (
                    <span className="text-xs text-destructive">
                      {fieldErrors[field.key]}
                    </span>
                  )}
                </div>
              ))}

              <div className="flex flex-col-reverse gap-2 pt-1 sm:flex-row sm:justify-end">
                <Button
                  ghost
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => setEditing(null)}
                >
                  {p.cancel}
                </Button>
                <Button
                  className="w-full uppercase sm:w-auto"
                  size="sm"
                  onClick={handleSave}
                  disabled={saving}
                  prefix={saving ? <Spinner /> : undefined}
                >
                  {saving ? p.saving : p.saveAndEnable}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Platform list */}
      <div className="grid gap-3">
        {platforms.map((platform) => {
          const badge = stateBadge(platform.state, p);
          const busy = togglingId === platform.id;
          const StateIcon =
            platform.state === "connected"
              ? CheckCircle2
              : platform.state === "fatal" || platform.state === "startup_failed"
                ? AlertTriangle
                : Radio;
          return (
            <Card key={platform.id} className="border-border">
              <CardContent className="flex flex-col gap-4 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3 min-w-0">
                    <StateIcon
                      className={cn(
                        "h-5 w-5 shrink-0 mt-0.5",
                        platform.state === "connected"
                          ? "text-success"
                          : platform.state === "fatal" ||
                              platform.state === "startup_failed"
                            ? "text-destructive"
                            : "text-muted-foreground",
                      )}
                    />
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mondwest normal-case text-sm font-medium">
                          {platform.name}
                        </span>
                        <Badge tone={badge.tone}>{badge.label}</Badge>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {platform.description}
                      </span>
                      {platform.error_message && (
                        <span className="text-xs text-destructive">
                          {platform.error_message}
                        </span>
                      )}
                      {platform.ingress_url && (
                        <span className="text-xs text-muted-foreground break-all">
                          {p.callbackUrl}{" "}
                          <code className="font-mono">{platform.ingress_url}</code>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                    <div className="flex items-center gap-1.5">
                      {busy ? (
                        <Spinner className="text-sm" />
                      ) : (
                        <Switch
                          checked={platform.enabled}
                          onCheckedChange={() => void handleToggle(platform)}
                          aria-label={p.enableName(platform.name)}
                        />
                      )}
                    </div>
                    <Button
                      ghost
                      size="sm"
                      onClick={() => handleTest(platform)}
                      disabled={testingId === platform.id}
                      prefix={
                        testingId === platform.id ? (
                          <Spinner />
                        ) : (
                          <PlugZap className="h-4 w-4" />
                        )
                      }
                    >
                      {p.test}
                    </Button>
                    {platform.id !== "telegram" && (
                      <Button
                        size="sm"
                        className="uppercase"
                        onClick={() => openConfig(platform)}
                        prefix={<Settings2 className="h-4 w-4" />}
                      >
                        {p.configure}
                      </Button>
                    )}
                  </div>
                </div>
                {platform.id === "telegram" && (
                  <TelegramOnboardingPanel
                    onManualSetup={() => openConfig(platform)}
                    onChanged={load}
                    onRestartNeeded={() => setRestartNeeded(true)}
                    platform={platform}
                    setRestartNeeded={setRestartNeeded}
                    showToast={showToast}
                  />
                )}
                {platform.id === "whatsapp" && (
                  <WhatsAppOnboardingPanel
                    onChanged={load}
                    onRestartNeeded={() => setRestartNeeded(true)}
                    platform={platform}
                    setRestartNeeded={setRestartNeeded}
                    showToast={showToast}
                  />
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export function WhatsAppOnboardingPanel({
  onChanged,
  onRestartNeeded,
  platform,
  setRestartNeeded,
  showToast,
}: {
  onChanged: () => Promise<void>;
  onRestartNeeded: () => void;
  platform: MessagingPlatform;
  setRestartNeeded: (needed: boolean) => void;
  showToast: (message: string, type: "success" | "error") => void;
}) {
  const p = usePageCopy(channelsEn, channelsAr);
  const configuredMode = useMemo(
    () => normalizeWhatsAppMode(platform.whatsapp_setup?.mode),
    [platform.whatsapp_setup?.mode],
  );
  const [setup, setSetup] = useState<WhatsAppOnboardingStartResponse | null>(
    null,
  );
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [phase, setPhase] = useState<
    "idle" | "starting" | "waiting" | "connected" | "applying"
  >("idle");
  const [mode, setMode] = useState<"bot" | "self-chat">(
    configuredMode ?? "bot",
  );
  const [allowedUsers, setAllowedUsers] = useState("");
  const [confirmRepair, setConfirmRepair] = useState(false);
  const [error, setError] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!setup && phase === "idle" && configuredMode) {
      setMode(configuredMode);
    }
  }, [configuredMode, phase, setup]);

  const updateQr = useCallback(async (payload?: string | null) => {
    if (!payload) return;
    const dataUrl = await QRCode.toDataURL(payload, {
      errorCorrectionLevel: "M",
      margin: 3,
      width: 240,
    });
    setQrDataUrl(dataUrl);
  }, []);

  useEffect(() => {
    if (!setup || phase !== "waiting") return;
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const poll = async () => {
      try {
        const status = await api.getWhatsAppOnboardingStatus(setup.pairing_id);
        if (cancelled) return;
        setSetup(status);
        if (status.qr_payload && status.qr_payload !== setup.qr_payload) {
          await updateQr(status.qr_payload);
        }
        if (cancelled) return;
        if (status.status === "connected") {
          setPhase("connected");
          setError("");
          return;
        }
        if (status.status === "error") {
          setError(status.error || p.waSetupFailed);
          setSetup(null);
          setQrDataUrl("");
          setPhase("idle");
          return;
        }
        setError("");
        timeout = setTimeout(poll, 1500);
      } catch (pollError) {
        if (cancelled) return;
        const expiresAt = Date.parse(setup.expires_at);
        const expired =
          Number.isFinite(expiresAt) && Date.now() >= expiresAt;
        if (isTerminalWhatsAppOnboardingError(pollError) || expired) {
          setSetup(null);
          setQrDataUrl("");
          setPhase("idle");
          setError(p.waExpired);
          return;
        }
        setError(p.waStillWaiting(pollError));
        timeout = setTimeout(poll, 2000);
      }
    };

    timeout = setTimeout(poll, 1000);
    return () => {
      cancelled = true;
      if (timeout) clearTimeout(timeout);
    };
  }, [p, phase, setup, updateQr]);

  useEffect(() => {
    if (!setup) return;
    const timer = setInterval(() => setTick((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, [setup]);

  const resetSetup = () => {
    setSetup(null);
    setQrDataUrl("");
    setPhase("idle");
    setError("");
  };

  const start = async (resetSession = false) => {
    setConfirmRepair(false);
    setSetup(null);
    setPhase("starting");
    setError("");
    setQrDataUrl("");
    try {
      const res = await api.startWhatsAppOnboarding({
        mode,
        allowed_users: allowedUsers,
        reset_session: resetSession,
      });
      setSetup(res);
      if (res.qr_payload) {
        await updateQr(res.qr_payload);
      }
      if (res.status === "error") {
        setError(res.error || p.waSetupFailed);
        setSetup(null);
        setPhase("idle");
      } else {
        setPhase(res.status === "connected" ? "connected" : "waiting");
      }
    } catch (startError) {
      setPhase("idle");
      setError(String(startError));
    }
  };

  const cancel = async () => {
    if (setup) {
      try {
        await api.cancelWhatsAppOnboarding(setup.pairing_id);
      } catch {
        /* local cleanup still wins */
      }
    }
    resetSetup();
  };

  const watchRestartOutcome = async () => {
    for (let i = 0; i < 20; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      try {
        const st = await api.getActionStatus("gateway-restart", 5);
        if (st.running) continue;
        if (st.exit_code !== 0 && st.exit_code !== null) {
          onRestartNeeded();
          showToast(p.restartFailedToast(st.exit_code), "error");
        }
        return;
      } catch {
        // transient fetch error; keep polling
      }
    }
  };

  const apply = async () => {
    if (!setup) return;
    setPhase("applying");
    setError("");
    try {
      const result = await api.applyWhatsAppOnboarding(setup.pairing_id, {
        mode,
        allowed_users: allowedUsers,
      });
      resetSetup();
      if (result.restart_started) {
        showToast(p.waSavedRestarting, "success");
        setRestartNeeded(false);
        setTimeout(() => void onChanged(), 4000);
        void watchRestartOutcome();
      } else {
        onRestartNeeded();
        const detail = result.restart_error ? `: ${result.restart_error}` : "";
        showToast(p.waSavedRestartFailed(detail), "error");
      }
      await onChanged();
    } catch (applyError) {
      setPhase("connected");
      setError(String(applyError));
    }
  };

  const expiresIn = useMemo(
    () => (setup ? formatExpiry(setup.expires_at) : ""),
    // tick keeps the memo fresh without recalculating on every render branch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setup, tick],
  );
  const setupStatusLabel =
    setup?.status === "installing"
      ? p.statusPreparing
      : setup?.status === "starting"
        ? p.statusStarting
        : p.statusWaiting;
  const setupHelp =
    phase === "connected" || phase === "applying"
      ? p.waHelpLinked
      : setup?.status === "installing"
        ? p.waHelpInstalling
        : setup?.status === "starting"
          ? p.waHelpStarting
          : p.waHelpScan;
  const linkedAccountLabel = setup?.account_phone
    ? `+${setup.account_phone}`
    : setup?.account_name || setup?.account_id || "";
  const linkedAccountDetail =
    setup?.account_phone || setup?.account_id
      ? p.waAccountKnown
      : p.waAccountScanned;
  const linkedAccountChatUrl = setup?.account_phone
    ? `https://wa.me/${setup.account_phone}`
    : "";
  const messageInstruction =
    mode === "self-chat"
      ? p.waMsgSelfChat
      : p.waMsgBot;
  const hasSavedAllowedUsers = Boolean(platform.whatsapp_setup?.allowed_users_set);
  const pairingInstruction =
    mode === "self-chat" && !allowedUsers.trim()
      ? hasSavedAllowedUsers
        ? p.waKeepAllowlist
        : p.waSelfChatAllow
      : !allowedUsers.trim() && hasSavedAllowedUsers
        ? p.waKeepAllowlist
        : p.waPairingCode;
  const pairingBusy = ["starting", "waiting", "applying"].includes(phase);

  return (
    <div className="rounded-sm border border-border bg-background/35 p-4">
      <div className="grid gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Button
            size="sm"
            className="uppercase"
            onClick={() => void start()}
            disabled={pairingBusy}
            prefix={phase === "starting" ? <Spinner /> : <QrCode className="h-4 w-4" />}
          >
            {phase === "starting" ? p.starting : p.pairWithQr}
          </Button>
          <Button
            size="sm"
            outlined
            onClick={() => setConfirmRepair(true)}
            disabled={pairingBusy}
          >
            {p.repairWithQr}
          </Button>
          {platform.configured && (
            <span className="text-xs text-muted-foreground">
              {p.waExisting}
            </span>
          )}
        </div>

        <ConfirmDialog
          open={confirmRepair}
          title={p.waRepairTitle}
          description={p.waRepairDescription}
          confirmLabel={p.waRepairConfirm}
          destructive
          onCancel={() => setConfirmRepair(false)}
          onConfirm={() => void start(true)}
        />

        <div className="flex flex-col gap-3 lg:flex-row lg:items-end">
          <div className="grid gap-1.5">
            <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {p.mode}
            </span>
            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                outlined={mode !== "bot"}
                onClick={() => setMode("bot")}
                disabled={phase === "waiting" || phase === "applying"}
              >
                {p.modeBot}
              </Button>
              <Button
                size="sm"
                outlined={mode !== "self-chat"}
                onClick={() => setMode("self-chat")}
                disabled={phase === "waiting" || phase === "applying"}
              >
                {p.modeSelfChat}
              </Button>
            </div>
          </div>
          <div className="grid min-w-0 flex-1 gap-1.5">
            <Label htmlFor="whatsapp-allowed-users">{p.waAllowedNumbers}</Label>
            <Input
              id="whatsapp-allowed-users"
              value={allowedUsers}
              onChange={(event) => setAllowedUsers(event.target.value)}
              disabled={phase === "waiting" || phase === "applying"}
              placeholder="15551234567,15557654321"
            />
          </div>
        </div>

        {error && (
          <div className="border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </div>
        )}

        {setup && (
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="grid gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {phase === "connected" || phase === "applying" ? (
                  <Badge tone="success">{p.connected}</Badge>
                ) : (
                  <Badge tone="warning">{setupStatusLabel}</Badge>
                )}
                <Badge tone={expiresIn === "expired" ? "destructive" : "outline"}>
                  {expiresIn === "expired" ? p.expired : expiresIn}
                </Badge>
              </div>

              <div className="text-sm text-muted-foreground">{setupHelp}</div>

              {phase === "waiting" && (
                <div className="text-xs text-muted-foreground">
                  {p.waUnknownDms}
                </div>
              )}

              {(phase === "connected" || phase === "applying") && (
                <div className="grid gap-3">
                  <div className="border border-border bg-background/45 p-3 text-sm">
                    <div className="font-medium">
                      {linkedAccountLabel
                        ? p.linkedAs(linkedAccountLabel)
                        : p.waDeviceLinked}
                    </div>
                    <div className="mt-1 text-muted-foreground">{linkedAccountDetail}</div>
                    <ol className="mt-3 list-decimal space-y-1 pl-5 text-muted-foreground">
                      <li>{p.saveAndRestartStep}</li>
                      <li>{messageInstruction}</li>
                      <li>{pairingInstruction}</li>
                    </ol>
                    {linkedAccountChatUrl && (
                      <a
                        className="mt-3 inline-flex items-center gap-1 text-sm text-primary underline-offset-4 hover:underline"
                        href={linkedAccountChatUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {p.openChatLink}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      className="uppercase"
                      onClick={() => void apply()}
                      disabled={phase === "applying"}
                      prefix={phase === "applying" ? <Spinner /> : <Save className="h-4 w-4" />}
                    >
                      {phase === "applying" ? p.saving : p.saveAndRestart}
                    </Button>
                    <Button size="sm" ghost onClick={() => void cancel()}>
                      {p.cancel}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center justify-center gap-3">
              {qrDataUrl ? (
                <img
                  src={qrDataUrl}
                  alt={p.waQrAlt}
                  className="h-60 w-60 bg-white p-2"
                />
              ) : phase === "connected" || phase === "applying" ? (
                <div className="flex h-60 w-60 flex-col items-center justify-center gap-2 border border-border bg-background/50 p-4 text-center">
                  <Badge tone="success">{p.linked}</Badge>
                  <div className="text-sm text-muted-foreground">
                    {linkedAccountLabel || p.waExistingSession}
                  </div>
                </div>
              ) : (
                <div className="flex h-60 w-60 flex-col items-center justify-center gap-3 border border-border bg-background/50 p-4 text-center">
                  <Spinner className="text-2xl" />
                  <div className="text-xs text-muted-foreground">
                    {p.waWaitingQr}
                  </div>
                </div>
              )}
              {phase === "waiting" && (
                <span className="text-center text-xs text-muted-foreground">
                  {p.waScanHint}
                </span>
              )}
              <Button size="sm" ghost onClick={() => void cancel()}>
                {p.cancel}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TelegramOnboardingPanel({
  onManualSetup,
  onChanged,
  onRestartNeeded,
  platform,
  setRestartNeeded,
  showToast,
}: {
  onManualSetup: () => void;
  onChanged: () => Promise<void>;
  onRestartNeeded: () => void;
  platform: MessagingPlatform;
  setRestartNeeded: (needed: boolean) => void;
  showToast: (message: string, type: "success" | "error") => void;
}) {
  const p = usePageCopy(channelsEn, channelsAr);
  const [setup, setSetup] = useState<TelegramOnboardingStartResponse | null>(
    null,
  );
  const [qrDataUrl, setQrDataUrl] = useState("");
  const [phase, setPhase] = useState<
    "idle" | "starting" | "waiting" | "ready" | "applying"
  >("idle");
  const [botUsername, setBotUsername] = useState<string | null>(null);
  const [allowedIds, setAllowedIds] = useState<string[]>([]);
  const [detectedOwnerId, setDetectedOwnerId] = useState<string | null>(null);
  const [newAllowedId, setNewAllowedId] = useState("");
  const [error, setError] = useState("");
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!setup || phase !== "waiting") return;
    let cancelled = false;
    let timeout: ReturnType<typeof setTimeout> | null = null;

    const poll = async () => {
      try {
        const status = await api.getTelegramOnboardingStatus(setup.pairing_id);
        if (cancelled) return;
        if (status.status === "ready") {
          setPhase("ready");
          setBotUsername(status.bot_username ?? null);
          setError("");
          if (
            status.owner_user_id &&
            TELEGRAM_USER_ID_RE.test(status.owner_user_id)
          ) {
            setDetectedOwnerId(status.owner_user_id);
            setAllowedIds([status.owner_user_id]);
          }
          return;
        }
        setError("");
        timeout = setTimeout(poll, 2000);
      } catch (pollError) {
        if (cancelled) return;

        const expiresAt = Date.parse(setup.expires_at);
        const expired =
          Number.isFinite(expiresAt) && Date.now() >= expiresAt;
        if (isTerminalTelegramOnboardingError(pollError) || expired) {
          setSetup(null);
          setQrDataUrl("");
          setPhase("idle");
          setError(p.tgExpired);
          return;
        }

        setError(p.tgStillWaiting(pollError));
        timeout = setTimeout(poll, 2000);
      }
    };

    timeout = setTimeout(poll, 1200);
    return () => {
      cancelled = true;
      if (timeout) clearTimeout(timeout);
    };
  }, [p, phase, setup]);

  useEffect(() => {
    if (!setup) return;
    const timer = setInterval(() => setTick((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, [setup]);

  const resetSetup = () => {
    setSetup(null);
    setQrDataUrl("");
    setPhase("idle");
    setBotUsername(null);
    setAllowedIds([]);
    setDetectedOwnerId(null);
    setNewAllowedId("");
    setError("");
  };

  const start = async () => {
    setPhase("starting");
    setError("");
    setBotUsername(null);
    setAllowedIds([]);
    setDetectedOwnerId(null);
    setNewAllowedId("");
    try {
      const res = await api.startTelegramOnboarding({ bot_name: "Moski.net" });
      const dataUrl = await QRCode.toDataURL(res.qr_payload, {
        errorCorrectionLevel: "M",
        margin: 1,
        width: 224,
      });
      setSetup(res);
      setQrDataUrl(dataUrl);
      setPhase("waiting");
    } catch (startError) {
      setPhase("idle");
      setError(String(startError));
    }
  };

  const cancel = async () => {
    if (setup) {
      try {
        await api.cancelTelegramOnboarding(setup.pairing_id);
      } catch {
        /* local cleanup still wins */
      }
    }
    resetSetup();
  };

  const addAllowedId = () => {
    const trimmed = newAllowedId.trim();
    if (!TELEGRAM_USER_ID_RE.test(trimmed)) {
      setError(p.tgIdsNumeric);
      return;
    }
    setError("");
    setAllowedIds((ids) => (ids.includes(trimmed) ? ids : [...ids, trimmed]));
    setNewAllowedId("");
  };

  // restart_started only means the `hermes gateway restart` child spawned —
  // not that the restart will succeed (e.g. systemd linger missing, service
  // manager failure). Poll the action status briefly and surface a non-zero
  // exit via the manual-restart banner. Note: in no-service installs the
  // child becomes the foreground gateway and never exits, so "still running
  // when the window closes" counts as success.
  const watchRestartOutcome = async () => {
    for (let i = 0; i < 20; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      try {
        const st = await api.getActionStatus("gateway-restart", 5);
        if (st.running) continue;
        if (st.exit_code !== 0 && st.exit_code !== null) {
          onRestartNeeded();
          showToast(p.restartFailedToast(st.exit_code), "error");
        }
        return;
      } catch {
        // transient fetch error; keep polling
      }
    }
  };

  const apply = async () => {
    if (!setup) return;
    if (allowedIds.length === 0) {
      setError(p.tgAddOneAllowed);
      return;
    }
    setPhase("applying");
    setError("");
    try {
      const result = await api.applyTelegramOnboarding(setup.pairing_id, {
        allowed_user_ids: allowedIds,
      });
      resetSetup();
      if (result.restart_started) {
        showToast(p.tgSavedRestarting, "success");
        setRestartNeeded(false);
        setTimeout(() => void onChanged(), 4000);
        void watchRestartOutcome();
      } else if (result.restart_started === undefined && result.needs_restart) {
        try {
          await api.restartGateway();
          showToast(p.tgSavedRestarting, "success");
          setRestartNeeded(false);
          setTimeout(() => void onChanged(), 4000);
        } catch (restartError) {
          onRestartNeeded();
          showToast(p.tgSavedRestartFailedErr(restartError), "error");
        }
      } else {
        onRestartNeeded();
        const detail = result.restart_error ? `: ${result.restart_error}` : "";
        showToast(p.tgSavedRestartFailed(detail), "error");
      }
      await onChanged();
    } catch (applyError) {
      setPhase("ready");
      setError(String(applyError));
    }
  };

  const expiresIn = useMemo(
    () => (setup ? formatExpiry(setup.expires_at) : ""),
    // tick keeps the memo fresh without recalculating on every render branch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setup, tick],
  );

  return (
    <div className="rounded-sm border border-border bg-background/35 p-4">
      <div className="grid gap-1">
        <span className="font-mondwest text-sm text-foreground">
          {p.tgChoose}
        </span>
        <span className="text-xs text-muted-foreground">
          {p.tgChooseHelp}
        </span>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:divide-x sm:divide-border">
        <div className="grid content-start gap-3 sm:pr-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium uppercase text-foreground">
              {p.quickSetup}
            </span>
            <Badge tone="success">{p.recommended}</Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {p.quickSetupHelp}
          </p>
          <Button
            size="sm"
            className="w-fit uppercase"
            onClick={() => void start()}
            disabled={phase !== "idle"}
            prefix={phase === "starting" ? <Spinner /> : <QrCode className="h-4 w-4" />}
          >
            {phase === "starting" ? p.starting : p.createWithQr}
          </Button>
        </div>

        <div className="grid content-start gap-3 border-t border-border pt-4 sm:border-t-0 sm:pl-4 sm:pt-0">
          <span className="text-xs font-medium uppercase text-foreground">
            {p.useOwnBot}
          </span>
          <p className="text-xs text-muted-foreground">
            {p.useOwnBotHelp}
          </p>
          <Button
            size="sm"
            outlined
            className="w-fit uppercase"
            onClick={onManualSetup}
            disabled={phase !== "idle"}
            prefix={<Bot className="h-4 w-4" />}
          >
            {p.manualSetup}
          </Button>
        </div>
      </div>

      {platform.configured && (
        <div className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
          {p.tgAlreadyConfigured}
        </div>
      )}

      {phase !== "idle" && (
        <div className="mt-4 border-t border-border pt-4">
          <span className="text-xs text-muted-foreground">
            {p.tgFinishFirst}
          </span>
        </div>
      )}

      {error && (
        <div className="mt-3 border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      {setup && qrDataUrl && (
        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="grid gap-3">
            {(phase === "ready" || phase === "applying") && (
              <div className="grid gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="success">{p.ready}</Badge>
                  {botUsername && (
                    <span className="font-courier text-sm text-muted-foreground">
                      @{botUsername}
                    </span>
                  )}
                </div>

                <div className="grid gap-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                      {p.allowedUsers}
                    </span>
                    {detectedOwnerId && allowedIds.includes(detectedOwnerId) && (
                      <Badge tone="success">{p.ownerDetected}</Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {allowedIds.map((id) => (
                      <button
                        key={id}
                        type="button"
                        className="inline-flex items-center gap-1 border border-border px-2 py-1 font-courier text-xs text-foreground hover:border-destructive/50"
                        onClick={() =>
                          setAllowedIds((ids) =>
                            ids.filter((existing) => existing !== id),
                          )
                        }
                      >
                        {id}
                        <X className="h-3 w-3" />
                      </button>
                    ))}
                    {allowedIds.length === 0 && (
                      <span className="text-sm text-muted-foreground">
                        {p.tgAddOne}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    value={newAllowedId}
                    onChange={(event) => setNewAllowedId(event.target.value)}
                    placeholder={p.tgUserIdPlaceholder}
                    className="font-courier"
                  />
                  <Button size="sm" outlined onClick={addAllowedId} prefix={<Check />}>
                    {p.add}
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    className="uppercase"
                    onClick={() => void apply()}
                    disabled={phase === "applying"}
                    prefix={phase === "applying" ? <Spinner /> : <Save className="h-4 w-4" />}
                  >
                    {phase === "applying" ? p.saving : p.saveAndRestart}
                  </Button>
                  <Button size="sm" ghost onClick={() => void cancel()}>
                    {p.cancel}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center gap-3">
            <img
              src={qrDataUrl}
              alt={p.tgQrAlt}
              className="h-56 w-56 bg-white p-2"
            />
            <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
              <Badge tone={expiresIn === "expired" ? "destructive" : "outline"}>
                {expiresIn === "expired" ? p.expired : expiresIn}
              </Badge>
              {phase === "waiting" && <Badge tone="warning">{p.statusWaiting}</Badge>}
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <a
                href={setup.deep_link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 items-center gap-1 border border-border px-3 text-xs uppercase text-foreground hover:border-foreground/40"
              >
                <ExternalLink className="h-4 w-4" />
                {p.openTelegram}
              </a>
              <Button size="sm" ghost onClick={() => void cancel()}>
                {p.cancel}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
