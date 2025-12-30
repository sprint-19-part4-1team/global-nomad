'use client';

import { useEffect } from 'react';

/**
 * ## useEscape
 *
 * @description
 * ESC 키 입력을 감지하여 전달된 콜백을 실행하는 훅입니다.
 *
 * @param onEscape - ESC 입력 시 실행할 콜백
 * @param options.enabled - ESC 이벤트 활성화 여부 (기본값: true)
 */
const useEscape = (onEscape: () => void, enabled = true) => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') {
        return;
      }
      onEscape();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onEscape, enabled]);
};

export default useEscape;
