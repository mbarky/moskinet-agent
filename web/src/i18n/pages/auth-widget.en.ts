export const authWidgetEn = {
  statusUnavailable: "auth status unavailable",
  loggedInAs: (label: string) => `Logged in as ${label}`,
  via: (provider: string) => `via ${provider}`,
  logOut: "Log out",
} as const;
