export const envEn = {
  hideVar: (key: string) => `Hide ${key}`,
  revealVar: (key: string) => `Reveal ${key}`,
  providers: "Providers",
  tools: "Tools",
  settings: "Settings",
  jumpToSection: "Jump to section",
  saved: (key: string) => `${key} saved`,
} as const;
