'use client';

import { useEffect, useRef } from 'react';

export type NavigationType = 'ANCHOR_CLICK' | 'POPSTATE';

interface UsePreventNavigationProps {
  /** 폼에 변경 사항이 있는지 여부 */
  isDirty: boolean;
  /** 네비게이션이 차단되었을 때 호출되는 콜백 */
  onPrevent: (type: NavigationType, targetUrl?: string) => void;
  /** 네비게이션을 그대로 허용할 때 호출되는 콜백 */
  onNavigate: (targetUrl?: string) => void;
}

/**
 * ## usePreventNavigation
 *
 * @description
 * - 폼에 변경 사항이 있을 경우(`isDirty === true`)
 *   사용자의 의도치 않은 페이지 이탈을 방지하는 커스텀 훅입니다.
 * - 다음과 같은 네비게이션 이벤트를 가로챕니다.
 *   - 새로고침 / 탭 닫기 (`beforeunload`)
 *   - 내부 링크 클릭 (`ANCHOR_CLICK`)
 *   - 브라우저 뒤로가기 / 앞으로가기 (`POPSTATE`)
 *
 * @param props - 네비게이션 차단 동작을 제어하기 위한 옵션 객체
 */
export const usePreventNavigation = ({
  isDirty,
  onPrevent,
  onNavigate,
}: UsePreventNavigationProps) => {
  const isDirtyRef = useRef(isDirty);
  /** isDirty 최신 값 유지 */
  isDirtyRef.current = isDirty;

  useEffect(() => {
    if (!isDirty) {
      return;
    }

    if (history.state?.blocked !== true) {
      history.pushState({ blocked: true }, '', location.href);
    }
  }, [isDirty]);

  useEffect(() => {
    /** 새로고침/창 닫기 방지 */
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isDirtyRef.current) {
        return;
      }
      e.preventDefault();
    };

    /** 내부 링크 클릭 방지 */
    const handleAnchorClick = (e: MouseEvent) => {
      if (!isDirtyRef.current) {
        return;
      }

      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (anchor && anchor.href.startsWith(location.origin) && !anchor.target) {
        e.preventDefault();
        onPrevent('ANCHOR_CLICK', anchor.href);
      }
    };

    /** 브라우저 뒤로가기 방지 */
    const handlePopState = () => {
      /** 클린 상태면 즉시 이전 페이지로 이동 */
      if (!isDirtyRef.current) {
        setTimeout(() => {
          onNavigate();
        }, 0);

        return;
      }

      setTimeout(() => {
        onPrevent('POPSTATE');
      }, 0);
    };

    addEventListener('beforeunload', handleBeforeUnload);
    addEventListener('click', handleAnchorClick, true);
    addEventListener('popstate', handlePopState);

    return () => {
      removeEventListener('beforeunload', handleBeforeUnload);
      removeEventListener('click', handleAnchorClick, true);
      removeEventListener('popstate', handlePopState);
    };
  }, [onNavigate, onPrevent]);
};
