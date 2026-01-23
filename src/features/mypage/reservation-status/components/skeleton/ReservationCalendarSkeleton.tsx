import Skeleton from '@/shared/components/skeleton/Skeleton';

/**
 * 예약 현황 페이지 달력 스켈레톤 컴포넌트
 *
 * @description
 * - 내 체험 월별 예약 현황을 불러오는 동안 표시되는 로딩 UI
 * - 달력 형태의 스켈레톤으로 구성
 * - 실제 컴포넌트의 레이아웃과 동일한 높이로 설정하여 레이아웃 시프트 방지
 *
 * @returns ReservationCalendarSkeleton 컴포넌트
 *
 * @example
 * ```tsx
 * {isLoadingReservations ? (
 *   <ReservationCalendarSkeleton />
 * ) : (
 *   <ReservationCalendar />
 * )}
 * ```
 */
export default function ReservationCalendarSkeleton() {
  return (
    <Skeleton className='-mx-24 h-605 w-screen sm:mx-auto sm:h-770 sm:w-full sm:rounded-24 lg:h-776' />
  );
}
