'use client';

import Image from 'next/image';
import { useRef } from 'react';
import ActivityImageModal from '@/features/activity-detail/components/image/ActivityImageModal';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';
import useOutsideClick from '@/shared/hooks/useOutsideClick';
import { SubImagesType } from '@/shared/types/activities';
import { cn } from '@/shared/utils/cn';

/**
 * 체험 상세 이미지 그리드 컴포넌트의 Props
 * @property subImages - 표시할 이미지 배열 (1~4개)
 */
interface ActivityImageGridProps {
  subImages: SubImagesType[];
}

/**
 * 이미지 개수별 레이아웃 설정
 * - 1개: 1열 전체 너비
 * - 2개: 2열 그리드
 * - 3개: 2열 2행 그리드 (첫 번째 이미지는 2행 span)
 * - 4개: 2열 2행 그리드
 */
const layoutConfig = {
  1: {
    grid: 'grid-cols-1',
    sizes: '(max-width: 640px) 327px, (max-width: 1024px) 684px, 670px',
  },
  2: {
    grid: 'grid-cols-2',
    sizes: '(max-width: 640px) 161px, (max-width: 1024px) 336px, 329px',
  },
  3: {
    grid: 'grid-cols-2 grid-rows-2',
    sizes: '(max-width: 640px) 161px, (max-width: 1024px) 336px, 329px',
  },
  4: {
    grid: 'grid-cols-2 grid-rows-2',
    sizes: '(max-width: 640px) 161px, (max-width: 1024px) 336px, 329px',
  },
};

/**
 * 체험 상세 이미지를 그리드 레이아웃으로 표시하는 컴포넌트
 *
 * 이미지 클릭 시 오버레이 모달로 확대 이미지를 표시하며,
 * Next.js Image 컴포넌트를 사용하여 반응형 이미지 최적화를 제공합니다.
 * 1개 또는 3개 이미지 레이아웃의 경우 LCP(Largest Contentful Paint) 최적화를 위해
 * 첫 번째 이미지에 priority 속성을 적용합니다.
 *
 * @description
 * 이미지 개수에 따라 자동으로 최적의 그리드 레이아웃을 적용합니다:
 * - 1개: 전체 너비 단일 이미지
 * - 2개: 2열 나란히 배치
 * - 3개: 왼쪽 큰 이미지(2행 span) + 오른쪽 2개 작은 이미지
 * - 4개: 2x2 그리드
 *
 * 확대 모달은 외부 클릭 시 자동으로 닫히며,
 * overlayStore를 통해 오버레이 상태를 관리합니다.
 *
 * @param props - 컴포넌트 props
 * @returns 렌더링된 체험 상세 이미지 그리드 또는 null (지원하지 않는 이미지 개수인 경우)
 *
 * @example
 * ```tsx
 * <ActivityImageGrid subImages={activity.subImages} />
 * ```
 */
export default function ActivityImageGrid({ subImages }: ActivityImageGridProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);

  // 확대 모달 외부 클릭 시 모달 닫기
  useOutsideClick(surfaceRef, () => {
    overlayStore.pop();
  });

  const count = subImages.length;
  const config = layoutConfig[count as keyof typeof layoutConfig];

  // 지원하지 않는 이미지 개수인 경우 렌더링하지 않음
  if (!config) {
    return null;
  }

  /**
   * 이미지 클릭 시 확대 모달을 오버레이로 표시
   * @param imageUrl - 확대할 이미지 URL
   * @param index - 이미지 인덱스 (접근성을 위한 라벨링에 사용)
   */
  const handleImageClick = (imageUrl: string, index: number) => {
    overlayStore.push(
      <ActivityImageModal imageUrl={imageUrl} index={index} onClose={() => overlayStore.pop()} />
    );
  };

  return (
    <div className='h-245 w-full overflow-hidden rounded-24 sm:h-400'>
      <div className={cn('grid h-full gap-6 sm:gap-12', config.grid)}>
        {subImages.map((image, index) => {
          // 3개 레이아웃에서 첫 번째 이미지는 2행을 차지
          const isFirstInThreeLayout = count === 3 && index === 0;

          return (
            <button
              key={image.id}
              onPointerDown={(e) => {
                e.stopPropagation();
                handleImageClick(image.imageUrl, index);
              }}
              className={cn('relative', isFirstInThreeLayout && 'row-span-2')}>
              <Image
                src={image.imageUrl}
                alt={`체험 상세 이미지 ${index}`}
                fill
                sizes={config.sizes}
                className='object-cover'
                priority={index === 0 && (count === 1 || count === 3)}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
