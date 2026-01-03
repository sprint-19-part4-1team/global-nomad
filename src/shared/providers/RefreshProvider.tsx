'use client';

import { ReactNode } from 'react';
import useTokenRefresh from '@/shared/hooks/useTokenRefresh';

interface RefreshProviderProps {
  children: ReactNode;
}

export default function RefreshProvider({ children }: RefreshProviderProps) {
  useTokenRefresh();

  return <>{children}</>;
}
