import Image from 'next/image';
import { SubImagesType } from '@/shared/types/activities';

/**
 * 체험 상세 이미지 그리드 컴포넌트의 Props
 * @property {SubImagesType[]} subImages - 표시할 이미지 배열 (1~4개)
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
 * Next.js Image 컴포넌트를 사용하여 반응형 이미지 최적화를 제공하며,
 * 1개 또는 3개 이미지 레이아웃의 경우 LCP(Largest Contentful Paint) 최적화를 위해
 * 첫 번째 이미지에 priority 속성을 적용합니다.
 *
 * @description
 * 이미지 개수에 따라 자동으로 최적의 그리드 레이아웃을 적용합니다.
 * - 1개: 전체 너비 단일 이미지
 * - 2개: 2열 나란히 배치
 * - 3개: 왼쪽 큰 이미지 + 오른쪽 2개 작은 이미지
 * - 4개: 2x2 그리드
 *
 * @param {ActivityImageGridProps} props - 컴포넌트 props
 * @returns {JSX.Element} 렌더링된 체험 상세 이미지 그리드
 *
 * @example
 * ```tsx
 * <ActivityImageGrid subImages={activity.subImages} />
 * ```
 */
export default function ActivityImageGrid({ subImages }: ActivityImageGridProps) {
  const count = subImages.length;
  const config = layoutConfig[count as keyof typeof layoutConfig];

  // 지원하지 않는 이미지 개수인 경우 렌더링하지 않음
  if (!config) {
    return null;
  }

  return (
    <div className='h-245 w-full overflow-hidden rounded-24 sm:h-400'>
      <div className={`grid h-full gap-6 sm:gap-12 ${config.grid}`}>
        {subImages.map((image, index) => {
          const isFirstInThreeLayout = count === 3 && index === 0;

          return (
            <div key={image.id} className={`relative ${isFirstInThreeLayout ? 'row-span-2' : ''}`}>
              <Image
                src={image.imageUrl}
                alt={`체험 상세 이미지 ${image.id}`}
                fill
                sizes={config.sizes}
                className='object-cover'
                priority={index === 0 && (count === 1 || count === 3)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
