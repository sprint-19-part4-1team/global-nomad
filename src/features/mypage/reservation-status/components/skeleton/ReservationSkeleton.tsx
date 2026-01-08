import ReservationCalendarSkeleton from '@/features/mypage/reservation-status/components/skeleton/ReservationCalendarSkeleton';
import Skeleton from '@/shared/components/skeleton/Skeleton';

/**
 * 예약 현황 페이지 스켈레톤 컴포넌트
 *
 * @description
 * - 체험 목록을 불러오는 동안 표시되는 로딩 UI
 * - 드롭다운과 달력 형태의 스켈레톤으로 구성
 * - 실제 컴포넌트의 레이아웃과 동일한 높이로 설정하여 레이아웃 시프트 방지
 *
 * @returns {JSX.Element} ReservationSkeleton 컴포넌트
 *
 * @example
 * ```tsx
 * {isLoadingActivities ? (
 *   <ReservationSkeleton />
 * ) : (
 *   <ReservationSelector />
 * )}
 * ```
 */
export default function ReservationSkeleton() {
  return (
    <div className='flex flex-col gap-28 sm:gap-24 lg:gap-32'>
      <Skeleton className='h-55 w-full rounded-16' />
      <ReservationCalendarSkeleton />
    </div>
  );
}
