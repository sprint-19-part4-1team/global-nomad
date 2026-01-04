import { cva } from 'class-variance-authority';
import Skeleton from '@/shared/components/skeleton/Skeleton';
import { cn } from '@/shared/utils/cn';

/**
 * MypageCardSkeleton 컴포넌트의 Props
 *
 * @property {'reservation' | 'activity'} variant - 카드 스타일 변형 ('reservation': 이미지가 카드 밖, 'activity': 이미지가 카드 안)
 * @property {string} [className] - 추가 CSS 클래스명
 */
interface MypageCardSkeletonProps {
  /** 카드 스타일 변형 ('reservation': 예약 카드, 'activity': 내 체험 카드) */
  variant: 'reservation' | 'activity';
  /** 추가 CSS 클래스명 */
  className?: string;
}

/** 마이페이지 카드 스켈레톤의 스타일 변형을 관리하는 CVA 설정 */
const MypageCardVariants = cva('flex h-full rounded-24 bg-white', {
  variants: {
    variant: {
      reservation:
        'relative z-10 w-2/3 gap-8 py-20 pr-24 pl-16 sm:rounded-32 sm:py-28 sm:pr-80 sm:pl-24 lg:px-28 lg:py-32',
      activity: 'justify-between w-full gap-24 px-16 py-24 sm:px-20 sm:py-28 lg:px-24 lg:py-32',
    },
  },
  defaultVariants: {
    variant: 'reservation',
  },
});

/**
 * 예약 카드 레이아웃의 스켈레톤 컴포넌트
 *
 * 예약 카드의 로딩 상태를 표시하며, 뱃지, 제목, 시간, 가격, 액션 버튼을 포함합니다.
 *
 * @returns {JSX.Element} 예약 카드 스켈레톤 레이아웃
 */
const ReservationSkeleton = () => (
  <div className='flex w-full flex-col justify-between gap-8'>
    {/* 뱃지 */}
    <Skeleton className='h-26 w-64 rounded-[100px]' />
    {/* 정보 영역 */}
    <div className='flex w-full flex-col justify-between gap-4'>
      {/* 제목 */}
      <Skeleton className='h-24 w-3/5 rounded' />
      {/* 예약 시간 */}
      <Skeleton className='h-24 w-4/5 rounded' />
      {/* 가격, 신청 인원 */}
      <div className='flex gap-8'>
        <Skeleton className='h-20 w-1/5 rounded' />
        <Skeleton className='h-20 w-[12%] rounded' />
      </div>
    </div>
    {/* 버튼 */}
    <Skeleton className='h-34 w-73 rounded-12' />
  </div>
);

/**
 * 체험 카드 레이아웃의 스켈레톤 컴포넌트
 *
 * 체험 카드의 로딩 상태를 표시하며, 제목, 별점, 가격, 액션 버튼, 썸네일 이미지를 포함합니다.
 *
 * @returns {JSX.Element} 체험 카드 스켈레톤 레이아웃
 */
const ActivitySkeleton = () => (
  <>
    {/* 정보 영역 */}
    <div className='flex flex-1 flex-col justify-between gap-12 sm:gap-16 lg:gap-20'>
      {/* 제목, 별점, 가격 */}
      <div className='flex flex-col gap-8 lg:gap-12'>
        <div className='flex flex-col gap-4 sm:gap-8'>
          {/* 제목 */}
          <Skeleton className='h-24 w-4/5 rounded lg:h-26 lg:w-3/5' />
          {/* 별점 */}
          <div className='flex items-center gap-2'>
            <Skeleton className='h-20 w-20 rounded-full' />
            <Skeleton className='h-22 w-56 rounded sm:h-24' />
          </div>
        </div>
        {/* 가격 */}
        <Skeleton className='h-24 w-2/5 rounded lg:h-26' />
      </div>
      {/* 버튼 영역 */}
      <div className='flex gap-8'>
        <Skeleton className='h-34 w-69 rounded-12 sm:h-36 sm:w-73' />
        <Skeleton className='h-34 w-69 rounded-12 sm:h-36 sm:w-73' />
      </div>
    </div>
    {/* 이미지 */}
    <Skeleton className='h-72 w-72 rounded-16 sm:h-140 sm:w-140 sm:rounded-24 lg:h-152 lg:w-152' />
  </>
);

/**
 * 마이페이지의 예약/내 체험 카드 로딩 상태를 표시하는 스켈레톤 UI 컴포넌트
 *
 * 예약 내역과 내 체험 관리의 로딩 상태를 시각적으로 표현합니다.
 *
 * @param props - 컴포넌트 props
 * @param props.variant - 카드 스타일 변형 ('reservation' 또는 'activity')
 * @param props.className - 추가 CSS 클래스명 (선택)
 *
 * @returns {JSX.Element} MypageCardSkeleton 컴포넌트
 *
 * @example
 * ```tsx
 * // 예약 내역 스켈레톤 (이미지가 카드 밖)
 * <MypageCardSkeleton variant="reservation" />
 *
 * // 내 체험 관리 스켈레톤 (이미지가 카드 안)
 * <MypageCardSkeleton variant="activity" />
 *
 * // 커스텀 스타일 적용
 * <MypageCardSkeleton variant="reservation" className="mb-4" />
 * ```
 */
export default function MypageCardSkeleton({ variant, className }: MypageCardSkeletonProps) {
  const isReservation = variant === 'reservation';

  return (
    <div
      className={cn('relative h-full w-full', className)}
      role='status'
      aria-busy='true'
      aria-label={`${isReservation ? '예약' : '내 체험'} 카드 로딩 중`}>
      <div className={cn(MypageCardVariants({ variant }))}>
        {isReservation ? <ReservationSkeleton /> : <ActivitySkeleton />}
      </div>
      {/* 예약 - 이미지 */}
      {isReservation && (
        <Skeleton className='absolute top-0 right-0 h-full w-2/5 rounded-r-24 sm:rounded-r-32' />
      )}
    </div>
  );
}
