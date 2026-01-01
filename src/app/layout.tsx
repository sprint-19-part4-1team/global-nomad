import type { Metadata } from 'next';
import '@/shared/styles/globals.css';
import OverlayRoot from '@/shared/components/overlay/root/OverlayRoot';
import ToastProvider from '@/shared/components/toast/ToastProvider';

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://global-nomad-1team.vercel.app'
  ),

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
};

export const viewport = {
  interactiveWidget: 'resizes-visual',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        {children}
        <ToastProvider />
        <OverlayRoot />
      </body>
    </html>
  );
}
