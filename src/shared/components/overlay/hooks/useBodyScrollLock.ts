import { useEffect } from 'react';

/**
 * ## useBodyScrollLock
 *
 * @description
 * - body 스크롤을 잠그기 위한 훅입니다.
 * - `lock` 값이 `true`일 때 `document.body`의 `overflow`를 `hidden`으로 설정하여
 *   배경 스크롤을 비활성화합니다.
 * - 컴포넌트 언마운트 또는 `lock` 값이 `false`로 변경되면
 *   기존 `overflow` 값을 복원합니다.
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

    const origin = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = origin;
    };
  }, [lock]);
};

export default useBodyScrollLock;
