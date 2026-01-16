import { useEffect } from 'react';

/**
 * ## useBodyScrollLock
 *
 * @description
 * - body 스크롤을 잠금 및 외부 요소 포커스/상호작용 차단을 관리합니다.
 * - `lock` 값이 `true`일 때 `document.body`의 `overflow`를 `hidden`으로 설정하여
 *   배경 스크롤을 비활성화합니다.
 * - 스크롤바 제거로 인한 레이아웃 흔들림을 방지하기 위해
 *   스크롤바 폭만큼 `padding-right`를 보정합니다.
 * - 컴포넌트 언마운트 또는 `lock` 값이 `false`로 변경되면 기존 스타일 값을 복원합니다.
 * - `inert` 속성을 사용하여 모달 외부의 상호작용을 차단하며, 이 기능은 `id="main"`을 가진 주 콘텐츠 영역 래퍼 요소에 의존합니다.
 *
 * @param lock - 스크롤 잠금 여부를 결정하는 플래그
 *
 * @example
 * ```tsx
 * const isOpen = overlay.length > 0;
 * useBodyScrollLock(isOpen);
 * ```
 */
const useBodyScrollLock = (lock: boolean) => {
  useEffect(() => {
    if (!lock) {
      return;
    }

    const body = document.body;
    const mainContent = document.querySelector('#main');

    const originalOverflow = body.style.overflow;
    const originalPaddingRight = body.style.paddingRight;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    body.style.overflow = 'hidden';

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    mainContent?.setAttribute('inert', '');

    return () => {
      body.style.overflow = originalOverflow;
      body.style.paddingRight = originalPaddingRight;
      mainContent?.removeAttribute('inert');
    };
  }, [lock]);
};

export default useBodyScrollLock;
