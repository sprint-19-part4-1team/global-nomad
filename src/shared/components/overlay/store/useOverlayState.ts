import { useSyncExternalStore } from 'react';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';

/**
 * ## useOverlayState
 *
 * @description
 * - overlayStore의 상태를 React와 동기화하는 전용 Hook입니다.
 * - 내부적으로 `useSyncExternalStore`를 사용하여 overlay 상태 변경을 구독합니다.
 * - overlay가 추가되거나 제거될 때 자동으로 리렌더링을 트리거합니다.
 * - OverlayRoot에서만 사용되는 훅이라서 외부에서 사용되지 않습니다.
 *
 * @returns
 * - 현재 열려 있는 overlay 목록
 *
 * @example
 * ```tsx
 * const overlays = useOverlayState();
 *
 * return (
 *   <>
 *     {overlays.map(({ id, element }) => (
 *       <div key={id}>{element}</div>
 *     ))}
 *   </>
 * );
 * ```
 */
const useOverlayState = () => {
  const overlays = useSyncExternalStore(
    overlayStore.subscribe,
    overlayStore.getSnapshot,
    overlayStore.getSnapshot
  );

  return overlays;
};

export default useOverlayState;
