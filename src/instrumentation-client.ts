import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production',
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV,
  tracesSampleRate: 0.1,
  enableLogs: true,
  sendDefaultPii: false,
  debug: false,
});

// eslint-disable-next-line import/namespace
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
