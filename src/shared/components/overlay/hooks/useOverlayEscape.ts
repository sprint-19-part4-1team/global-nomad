import { overlayStore } from '@/shared/components/overlay/store/overlayStore';
import useEscape from '@/shared/hooks/useEscape';

/**
 * ## useOverlayEscape
 *
 * @description
 * - ESC 키 입력을 감지하여 가장 마지막에 열린 overlay를 닫는 훅입니다.
 * - overlay가 열려 있을 때만 전역 `keydown` 이벤트를 등록합니다.
 * - 실제 overlay 상태는 React state가 아닌 `overlayStore`의 스냅샷을 직접 참조합니다.
 * - overlay 스택이 비어 있을 경우에는 아무 동작도 하지 않습니다.
 *
 * @param enabled
 * - ESC 키 이벤트 리스너를 활성화할지 여부
 * - `true`일 경우에만 `window.addEventListener('keydown', ...)`가 등록됩니다.
 *
 * @example
 * ```tsx
 * const overlays = useOverlayState();
 * const isOpenOverlay = overlays.length > 0;
 *
 * useOverlayEscape(isOpenOverlay);
 * ```
 */
const useOverlayEscape = (enabled: boolean) => {
  useEscape(() => {
    const overlays = overlayStore.getSnapshot();
    if (overlays.length === 0) {
      return;
    }
    overlayStore.pop();
  }, enabled);
};

export default useOverlayEscape;
