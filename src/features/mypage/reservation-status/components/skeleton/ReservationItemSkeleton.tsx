import Skeleton from '@/shared/components/skeleton/Skeleton';

/**
 * 예약 내역의 로딩 스켈레톤 컴포넌트
 *
 * @description
 * - 예약 내역 로딩 중 상태를 표시하기 위한 스켈레톤 컴포넌트입니다.
 * - 반응형 높이를 적용하여 다양한 화면 크기에 대응합니다 (모바일: 90px, 데스크톱: 92px).
 * - 실제 예약 내역 컴포넌트와 동일한 크기로 레이아웃 시프트를 방지합니다.
 *
 * @example
 * ```tsx
 * {currentIsFetchingNextPage && <ReservationItemSkeleton />}
 * ```
 */
export default function ReservationItemSkeleton() {
  return <Skeleton className='h-90 w-full rounded-16 sm:h-92' />;
}
