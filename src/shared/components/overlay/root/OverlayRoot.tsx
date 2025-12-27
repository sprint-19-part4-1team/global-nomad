'use client';

import useBodyScrollLock from '@/shared/components/overlay/hooks/useBodyScrollLock';
import useOverlayEscape from '@/shared/components/overlay/hooks/useOverlayEscape';
import useOverlayState from '@/shared/components/overlay/store/useOverlayState';

/**
 * ## OverlayRoot
 *
 * @description
 * - 앱 전역에서 overlay(Dialog, Sheet 등)를 렌더링하는 root 컴포넌트입니다.
 * - overlay stack을 순회하여 Portal 기반으로 화면 최상단에 표시합니다.
 * - overlay가 하나라도 존재할 경우 body 스크롤을 잠급니다.
 */
export default function OverlayRoot() {
  const overlays = useOverlayState();
  const isOpenOverlay = overlays.length > 0;

  useBodyScrollLock(isOpenOverlay);
  useOverlayEscape(isOpenOverlay);

  return (
    <>
      {overlays.map(({ id, element }) => (
        <div key={id}>{element}</div>
      ))}
    </>
  );
}
