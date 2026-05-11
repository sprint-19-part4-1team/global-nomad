'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Icons from '@/assets/icons';
import { LAYER } from '@/shared/components/overlay/constants/layer';
import Backdrop from '@/shared/components/overlay/primitives/backdrop/Backdrop';
import OverlayPortal from '@/shared/components/overlay/primitives/overlay-portal/OverlayPortal';
import useOutsideClick from '@/shared/hooks/useOutsideClick';
import { SubImagesType } from '@/shared/types/activities';
import { cn } from '@/shared/utils/cn';

/**
 * 체험 상세 이미지 확대 모달 컴포넌트의 Props
 * @property images - 전체 이미지 배열
 * @property initialIndex - 처음 표시할 이미지 인덱스
 * @property onClose - 모달 닫기 콜백 함수
 */
interface ActivityImageModalProps {
  images: SubImagesType[];
  initialIndex: number;
  onClose: () => void;
}

/**
 * 체험 상세 이미지 확대 모달 컴포넌트
 *
 * 이미지를 전체 화면 오버레이로 확대하여 표시합니다.
 * 이전/다음 버튼 및 키보드 방향키(←/→)로 이미지 간 이동이 가능하며,
 * 마지막 이미지에서 다음으로 이동 시 첫 번째 이미지로 순환합니다.
 * 모달 외부 클릭 또는 이미지 영역 클릭 시 닫힙니다.
 *
 * @param props - ActivityImageModalProps
 * @returns 이미지 확대 모달 컴포넌트
 *
 * @example
 * ```tsx
 * <ActivityImageModal
 *   images={activity.subImages}
 *   initialIndex={0}
 *   onClose={() => overlayStore.pop()}
 * />
 * ```
 */
export default function ActivityImageModal({
  images,
  initialIndex,
  onClose,
}: ActivityImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const modalRef = useRef<HTMLDivElement>(null);
  useOutsideClick(modalRef, onClose);

  const currentImage = images[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [images.length]);

  return (
    <OverlayPortal>
      <Backdrop />
      <div
        ref={modalRef}
        className={cn(
          'fixed top-1/2 left-1/2 h-fit w-340 -translate-x-1/2 -translate-y-1/2 sm:w-700',
          LAYER.OVERLAY_SURFACE
        )}>
        <Image
          src={currentImage.imageUrl}
          alt={`체험 상세 이미지 ${currentIndex + 1} 확대 보기`}
          width={0}
          height={0}
          className='h-auto max-h-[70vh] w-full object-contain'
          sizes='(max-width: 640px) 340px, 700px'
        />
        <button
          aria-label={`체험 상세 이미지 ${currentIndex + 1} 확대 닫기`}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className='absolute inset-0'
        />
        {images.length > 1 && (
          <>
            <button
              aria-label='이전 이미지'
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className='absolute top-1/2 -left-32 h-32 w-32 text-gray-100'>
              <Icons.ChevronLeft aria-hidden='true' focusable='false' />
            </button>
            <button
              aria-label='다음 이미지'
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className='absolute top-1/2 -right-32 h-32 w-32 text-gray-100'>
              <Icons.ChevronRight aria-hidden='true' focusable='false' />
            </button>
            <span className='absolute left-1/2 mt-8 -translate-x-1/2 rounded-full bg-primary-100 px-8 py-2 body-14 text-gray-600'>
              <span className='font-bold text-primary-600'>{currentIndex + 1}</span> /{' '}
              {images.length}
            </span>
          </>
        )}
      </div>
    </OverlayPortal>
  );
}
