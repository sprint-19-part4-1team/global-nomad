'use client';

import { useParams, usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import useBodyScrollLock from '@/shared/components/overlay/hooks/useBodyScrollLock';
import useOverlayEscape from '@/shared/components/overlay/hooks/useOverlayEscape';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';
import useOverlayState from '@/shared/components/overlay/store/useOverlayState';

/**
 * ## OverlayRoot
 *
 * @description
 * - 앱 전역에서 overlay(Dialog, Sheet 등)를 렌더링하는 root 컴포넌트입니다.
 * - overlay stack을 순회하여 Portal 기반으로 화면 최상단에 표시합니다.
 * - overlay가 하나라도 존재할 경우 body 스크롤을 잠급니다.
 * - 경로 변경 시 모든 overlay를 자동으로 닫습니다. (첫 마운트 시 제외)
 */
export default function OverlayRoot() {
  const overlays = useOverlayState();
  const pathname = usePathname();
  const params = useParams();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      // 경로나 파라미터가 변경될 때마다 무조건 모든 overlay 초기화
      overlayStore.clear();
    }
    isMounted.current = true;

    // 컴포넌트 언마운트 시에도 정리
    return () => {
      overlayStore.clear();
    };
  }, [pathname, params]);

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
