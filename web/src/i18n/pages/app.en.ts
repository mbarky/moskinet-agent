export const appEn = {
  loading: "Loading…",
  loadingChat: "Loading chat…",
  updateDescBehind: (cmd: string, n: number) =>
    `This will run 'hermes update' (${cmd}) and pull ${n} new commit${n === 1 ? "" : "s"}. The gateway restarts when the update finishes; the current session keeps its prompt cache until then.`,
  restartAll: "Restart all",
  restartSharedTitle: "Restart the shared gateway?",
} as const;
