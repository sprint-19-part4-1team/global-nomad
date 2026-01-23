import { cva } from 'class-variance-authority';
import Skeleton from '@/shared/components/skeleton/Skeleton';
import { cn } from '@/shared/utils/cn';

/**
 * ActivityCardSkeleton 컴포넌트의 Props
 *
 * @property variant - 카드 스타일 변형 ('default': 328x243px, 'popular': 131x243px)
 * @property [className] - 추가 CSS 클래스명
 */
interface ActivityCardSkeletonProps {
  /** 카드 스타일 변형 ('default': 기본 크기, 'popular': 작은 크기) */
  variant: 'default' | 'popular';
  /** 추가 CSS 클래스명 */
  className?: string;
}

/** 체험 카드 스켈레톤의 스타일 변형을 관리하는 CVA 설정 */
const activityCardVariants = cva(
  'relative flex flex-col overflow-hidden rounded-18 bg-transparent sm:h-423 sm:basis-1/2 sm:rounded-32 lg:h-366 md:basis-[calc(25%-18px)]',
  {
    variants: {
      variant: {
        default: 'h-243 w-full',
        popular: 'h-243 w-131',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

/**
 * 메인 화면의 체험 카드 로딩 상태를 표시하는 스켈레톤 UI 컴포넌트
 *
 * 이미지, 제목, 별점, 가격 정보의 로딩 상태를 시각적으로 표현합니다.
 *
 * @param props - 컴포넌트 props
 * @param props.variant - 카드 스타일 변형 ('default' 또는 'popular')
 * @param props.className - 추가 CSS 클래스명 (선택)
 *
 * @returns ActivityCardSkeleton 컴포넌트
 *
 * @example
 * ```tsx
 * // 기본 크기 스켈레톤
 * <ActivityCardSkeleton variant="default" />
 *
 * // 인기 체험용 작은 크기 스켈레톤
 * <ActivityCardSkeleton variant="popular" />
 *
 * // 커스텀 스타일 적용
 * <ActivityCardSkeleton variant="default" className="shadow-lg" />
 * ```
 */
export default function ActivityCardSkeleton({ variant, className }: ActivityCardSkeletonProps) {
  return (
    <div className={cn(activityCardVariants({ variant }), className)}>
      {/* 이미지 */}
      <Skeleton className='h-4/5 w-full rounded-t-18 sm:rounded-t-32' />
      {/* 정보 영역 */}
      <div className='absolute bottom-0 left-0 flex h-112 w-full flex-col justify-between overflow-hidden rounded-18 bg-white px-17 py-16 shadow-card sm:h-134 sm:gap-16 sm:rounded-32 sm:px-30 sm:py-20'>
        <div className='flex flex-col gap-2'>
          {/* 제목 */}
          <Skeleton className='h-24 w-[45%] rounded sm:h-26' />

          {/* 별점 */}
          <div className='flex items-center gap-2'>
            <Skeleton className='h-20 w-20 rounded-full' />
            <Skeleton className='h-22 w-51 rounded sm:h-24' />
          </div>
        </div>

        {/* 가격 */}
        <Skeleton className='h-24 w-90 rounded sm:h-26 sm:w-113' />
      </div>
    </div>
  );
}
