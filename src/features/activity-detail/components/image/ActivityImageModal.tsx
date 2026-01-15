'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { LAYER } from '@/shared/components/overlay/constants/layer';
import Backdrop from '@/shared/components/overlay/primitives/backdrop/Backdrop';
import OverlayPortal from '@/shared/components/overlay/primitives/overlay-portal/OverlayPortal';
import useOutsideClick from '@/shared/hooks/useOutsideClick';
import { cn } from '@/shared/utils/cn';

/**
 * 체험 상세 이미지 확대 모달 컴포넌트의 Props
 * @property imageUrl - 확대할 이미지 URL
 * @property index - 이미지 인덱스 (접근성을 위한 라벨링에 사용)
 * @property onClose - 모달 닫기 콜백 함수
 */
interface ActivityImageModalProps {
  imageUrl: string;
  index: number;
  onClose: () => void;
}

/**
 * 체험 상세 이미지 확대 모달 컴포넌트
 *
 * 이미지를 전체 화면 오버레이로 확대하여 표시합니다.
 * 모달 외부 클릭 또는 이미지 영역 클릭 시 닫힙니다.
 *
 * @param props - ActivityImageModalProps
 * @returns 이미지 확대 모달 컴포넌트
 *
 * @example
 * ```tsx
 * <ActivityImageModal
 *   imageUrl="https://example.com/image.jpg"
 *   index={1}
 *   onClose={() => overlayStore.pop()}
 * />
 * ```
 */
export default function ActivityImageModal({ imageUrl, index, onClose }: ActivityImageModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, onClose);

  return (
    <OverlayPortal>
      <Backdrop />
      <div
        ref={modalRef}
        className={cn(
          'fixed top-1/2 left-1/2 h-fit w-340 -translate-x-1/2 -translate-y-1/2 shadow-card sm:w-700',
          LAYER.OVERLAY_SURFACE
        )}>
        <Image
          src={imageUrl}
          alt={`체험 상세 이미지 ${index} 확대 보기`}
          width={0}
          height={0}
          className='h-auto max-h-[70vh] w-full object-contain'
          sizes='(max-width: 640px) 340px, 700px'
        />
        <button
          aria-label={`체험 상세 이미지 ${index} 확대 닫기`}
          onPointerDown={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className='absolute inset-0'
        />
      </div>
    </OverlayPortal>
  );
}
