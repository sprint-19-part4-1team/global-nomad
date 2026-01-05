export const OAUTH_MODES = ['signin', 'signup'] as const;

export type OAuthMode = (typeof OAUTH_MODES)[number];

export const DEFAULT_OAUTH_MODE: OAuthMode = 'signin';

export const isOAuthMode = (value: string | null): value is OAuthMode =>
  value === 'signin' || value === 'signup';
