import type { Metadata } from 'next';
import '@/shared/styles/globals.css';
import AuthGuard from '@/features/auth/common/components/AuthGuard';
import NavigationTracker from '@/shared/components/navigation/NavigationTracker';
import OverlayRoot from '@/shared/components/overlay/root/OverlayRoot';
import ToastProvider from '@/shared/components/toast/ToastProvider';
import { SITE_URL } from '@/shared/constants';
import NavigationTracker from '@/shared/providers/NavigationTracker';
import QueryProvider from '@/shared/providers/QueryProvider';
import RefreshProvider from '@/shared/providers/RefreshProvider';
import SessionWatcher from '@/shared/providers/session-watcher/SessionWatcher';
import { WithChildren } from '@/shared/types/common';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: { default: '글로벌 노마드 | Global Nomad', template: '%s | Global Nomad' },
  description: '글로벌 노마드는 체험 상품을 탐색하고 예약할 수 있는 체험 예약 플랫폼입니다.',
  keywords: ['글로벌 노마드', 'Global Nomad', '체험 예약'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: 'Global Nomad',
    url: '/',
    title: 'Global Nomad',
    description: '글로벌 노마드는 체험 상품을 탐색하고 예약할 수 있는 체험 예약 플랫폼입니다.',
    images: ['/og-default.png'],
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: '/',
  },

  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport = {
  interactiveWidget: 'resizes-visual',
};

export default function RootLayout({ children }: Readonly<WithChildren>) {
  return (
    <html lang='ko'>
      <body>
        <QueryProvider>
          <RefreshProvider>
            <SessionWatcher />
            <NavigationTracker />
            <AuthGuard>
              <div id='main'>{children}</div>
            </AuthGuard>
          </RefreshProvider>
          <OverlayRoot />
        </QueryProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
