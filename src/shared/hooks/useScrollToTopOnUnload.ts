'use client';

import { useEffect } from 'react';

/**
 * ## useScrollToTopOnUnload
 *
 * @description
 * - 페이지를 벗어나거나 새로고침되기 직전에
 *   스크롤 위치를 최상단으로 이동시키는 커스텀 훅입니다.
 *
 * @remarks
 * - `beforeunload` 이벤트를 사용합니다.
 * - 페이지 이탈 시 스크롤 위치가 복원되는 브라우저 동작을 방지하기 위한 용도로 사용됩니다.
 * - 클라이언트 환경에서만 동작합니다.
 *
 * @example
 * ```ts
 * useScrollToTopOnUnload();
 * ```
 */
export const useScrollToTopOnUnload = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
};
