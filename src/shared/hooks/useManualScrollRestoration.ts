'use client';

import { useEffect } from 'react';

/**
 * ## useManualScrollRestoration
 *
 * @description
 * - 브라우저의 자동 스크롤 복원 기능을 비활성화합니다.
 * - 페이지 이동 / 새로고침 / 뒤로가기 시
 *   스크롤 위치를 브라우저가 임의로 복원하지 않도록 합니다.
 */
export const useManualScrollRestoration = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || !('scrollRestoration' in window.history)) {
      return;
    }

    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';

    return () => {
      window.history.scrollRestoration = prev;
    };
  }, []);
};
