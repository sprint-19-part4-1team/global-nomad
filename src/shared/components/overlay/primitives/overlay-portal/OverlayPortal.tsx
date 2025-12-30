'use client';

import { ReactNode, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const OVERLAY_ROOT_ID = 'overlay-root';

/**
 * ## OverlayPortal
 *
 * @description
 * - Overlay 계열 컴포넌트를 DOM 트리 최상단으로 분리하기 위한 Portal 컴포넌트입니다.
 * - Dialog / BottomSheet / Panel 등을 기존 레이아웃 흐름에서 분리하여
 *   z-index, overflow, stacking-context 문제를 방지합니다.
 * - 기본적으로 `#overlay-root` DOM 노드에 렌더링됩니다.
 *
 * @param {ReactNode} children
 * Portal을 통해 `overlay-root`에 렌더링될 Overlay 콘텐츠입니다.
 *
 * @example
 * ```tsx
 * <OverlayPortal>
 *   <Backdrop />
 *   <OverlaySurface>
 *     <DialogContent />
 *   </OverlaySurface>
 * </OverlayPortal>
 * ```
 */
export default function OverlayPortal({ children }: { children: ReactNode }) {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let portalContainer = document.getElementById(OVERLAY_ROOT_ID);

    if (!portalContainer) {
      portalContainer = document.createElement('div');
      portalContainer.id = OVERLAY_ROOT_ID;
      document.body.appendChild(portalContainer);
    }

    setContainer(portalContainer);

    return () => {
      portalContainer.remove();
    };
  }, []);

  if (!container) {
    return null;
  }

  return ReactDOM.createPortal(children, container);
}
