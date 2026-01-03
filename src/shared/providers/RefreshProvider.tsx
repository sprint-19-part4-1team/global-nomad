'use client';

import { ReactNode } from 'react';
import useTokenRefresh from '@/shared/hooks/useTokenRefresh';

interface RefreshProviderProps {
  children: ReactNode;
}

/**
 * ## RefreshProvider
 *
 * @description
 * - 앱 전역에서 accessToken 자동 갱신 로직을 활성화하기 위한 Provider 컴포넌트입니다.
 * - 내부에서 `useTokenRefresh` 훅을 실행하여,
 *   로그인 상태인 사용자의 accessToken을 만료 5분 전에 자동으로 갱신합니다.
 */
export default function RefreshProvider({ children }: RefreshProviderProps) {
  useTokenRefresh();

  return <>{children}</>;
}
