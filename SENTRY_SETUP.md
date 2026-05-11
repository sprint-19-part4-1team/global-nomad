# Sentry 연동 가이드

> Next.js 15 + Vercel 환경 기준
> production 배포(main 브랜치)에서만 Sentry가 활성화되도록 설정

---

## Step 1. 패키지 설치

```bash
pnpm add @sentry/nextjs
```

---

## Step 2. Sentry 프로젝트 DSN 확인

1. [sentry.io](https://sentry.io) 로그인
2. 프로젝트 선택 → **Settings > Client Keys (DSN)**
3. DSN 값 복사 (형식: `https://xxxxx@o0.ingest.sentry.io/xxxxx`)

---

## Step 3. 환경변수 추가

**.env.local** (로컬 전용, git 제외)

```
NEXT_PUBLIC_SENTRY_DSN=https://xxxxx@o0.ingest.sentry.io/xxxxx
```

**Vercel 대시보드**

- Project Settings > Environment Variables
- `NEXT_PUBLIC_SENTRY_DSN` 를 **Production 환경에만** 추가
- "Enable access to System Environment Variables" 체크 확인 → `VERCEL_ENV` 자동 주입됨

---

## Step 4. next.config.ts 수정

`VERCEL_ENV`는 서버 전용이므로 클라이언트에서 쓸 수 있도록 노출하고, `withSentryConfig`로 래핑

```ts
import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_VERCEL_ENV: process.env.VERCEL_ENV,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sprint-fe-project.s3.ap-northeast-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.('.svg'));

    if (fileLoaderRule) {
      config.module.rules.push(
        {
          ...fileLoaderRule,
          test: /\.svg$/i,
          resourceQuery: /url/,
        },
        {
          test: /\.svg$/i,
          issuer: fileLoaderRule.issuer,
          resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
          use: ['@svgr/webpack'],
        }
      );
      fileLoaderRule.exclude = /\.svg$/i;
    }

    return config;
  },
};

export default withSentryConfig(nextConfig, {
  org: 'your-org-slug', // Sentry 조직 slug
  project: 'your-project-slug', // Sentry 프로젝트 slug
  silent: !process.env.CI,
  widenClientFileUpload: true,
  hideSourceMaps: true,
  disableLogger: true,
});
```

---

## Step 5. sentry.client.config.ts 생성 (프로젝트 루트)

```ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === 'production',
  environment: process.env.NEXT_PUBLIC_VERCEL_ENV, // 대시보드에서 환경 필터 가능
  tracesSampleRate: 0.2,
  debug: false,
});
```

---

## Step 6. sentry.server.config.ts 생성 (프로젝트 루트)

```ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.VERCEL_ENV === 'production',
  environment: process.env.VERCEL_ENV,
  tracesSampleRate: 0.2,
  debug: false,
});
```

---

## Step 7. sentry.edge.config.ts 생성 (프로젝트 루트)

```ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: process.env.VERCEL_ENV === 'production',
  environment: process.env.VERCEL_ENV,
  tracesSampleRate: 0.2,
  debug: false,
});
```

---

## Step 8. global-error.tsx 생성

`src/app/global-error.tsx` — App Router의 최상위 에러 바운더리

```tsx
'use client';

import * as Sentry from '@sentry/nextjs';
import NextError from 'next/error';
import { useEffect } from 'react';

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <NextError statusCode={0} />
      </body>
    </html>
  );
}
```

---

## Step 9. 동작 확인

1. main 브랜치에 배포
2. Sentry 대시보드 → Issues 확인
3. 대시보드 좌측 **Environment** 필터에서 `production` / `preview` 구분 가능

### 로컬 테스트 (선택)

임시로 `enabled: true`로 바꾸거나, 아래 버튼을 페이지에 추가해서 에러 전송 확인:

```tsx
<button
  onClick={() => {
    throw new Error('Sentry test');
  }}>
  Test Sentry
</button>
```

---

## 환경별 동작 요약

| 환경              | VERCEL_ENV   | Sentry 활성화 |
| ----------------- | ------------ | ------------- |
| 로컬 (`next dev`) | 없음         | X             |
| dev 브랜치 배포   | `preview`    | X             |
| main 브랜치 배포  | `production` | O             |
