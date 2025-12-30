'use client';

import { RefObject, useEffect } from 'react';

/**
 * ## useOutsideClick
 *
 * @description
 * - 지정한 요소(ref) 바깥 영역을 클릭했을 때 콜백을 실행하는 훅입니다.
 * - dropdown, dialog 등 외부 클릭으로 닫혀야 하는 UI에 사용됩니다.
 *
 * @param ref
 * - 기준이 되는 DOM 요소의 ref
 *
 * @param onOutsideClick
 * - ref 외부 영역 클릭 시 실행할 콜백
 *
 * @param enabled
 * - 외부 클릭 감지를 활성화할지 여부
 *
 * @remarks
 * - ref 내부 클릭은 무시됩니다.
 * - Portal로 렌더링된 컴포넌트에서도 정상 동작합니다.
 */
const useOutsideClick = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  onOutsideClick: () => void,
  enabled = true
) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) {
        return;
      }
      if (!ref.current) {
        return;
      }

      if (ref.current.contains(target)) {
        return;
      }

      onOutsideClick();
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [ref, onOutsideClick, enabled]);
};

export default useOutsideClick;
