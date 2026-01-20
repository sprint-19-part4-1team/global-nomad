'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useNavigationStore } from '@/shared/stores/navigationStore';

/**
 * ## NavigationTracker
 *
 * @description
 * - App Router의 `pathname` 변경을 감지하여
 *   방문한 URL 경로를 전역 스토어에 기록하는 컴포넌트입니다.
 * - 동일한 경로의 중복 저장을 방지합니다.
 *
 * @remarks
 * - 화면에 UI를 렌더링하지 않으며, 사이드 이펙트 용도로만 사용됩니다.
 * - 레이아웃 또는 최상위 영역에 한 번만 마운트되어야 합니다.
 */
export default function NavigationTracker() {
  const pathname = usePathname();
  const { urlHistory, pushUrl } = useNavigationStore();

  useEffect(() => {
    const lastPath = urlHistory[urlHistory.length - 1];

    if (lastPath !== pathname) {
      pushUrl(pathname);
    }
  }, [pathname, pushUrl, urlHistory]);

  return null;
}
