'use client';

import { useEffect, useState } from 'react';

/**
 * ## useMediaQuery
 *
 * @description
 * - CSS media query 조건을 JS에서 boolean 값으로 사용할 수 있는 훅입니다.
 * - 화면 크기 변경 시 조건 충족 여부를 실시간으로 반영합니다.
 *
 * @param query - media query 문자열 (ex. '(max-width: 767px)')
 * @returns media query 조건 충족 여부
 *
 * @example
 * ```ts
 * const isMobile = useMediaQuery('(max-width: 767px)');
 * ```
 */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    setMatches(mediaQueryList.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener('change', handleChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
}
