export const oauthLoginModalEn = {
  failedToStart: (err: string) => `Failed to start login: ${err}`,
  providerConnected: (name: string) => `${name} connected`,
  loginStatus: (status: string) => `Login ${status}`,
  pollingFailed: (err: string) => `Polling failed: ${err}`,
  tokenExchangeFailed: "Token exchange failed",
  submitFailed: (err: string) => `Submit failed: ${err}`,
  retryFailed: (retry: string, err: string) => `${retry} failed: ${err}`,
} as const;
