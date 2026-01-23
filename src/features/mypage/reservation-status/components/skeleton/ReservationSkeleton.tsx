import ReservationCalendarSkeleton from '@/features/mypage/reservation-status/components/skeleton/ReservationCalendarSkeleton';
import ReservationDropdownSkeleton from '@/features/mypage/reservation-status/components/skeleton/ReservationDropdownSkeleton';

/**
 * 예약 현황 페이지의 로딩 스켈레톤 컴포넌트
 *
 * @description
 * - 드롭다운과 달력으로 구성된 예약 현황 페이지의 로딩 UI를 표시합니다.
 * - 반응형 간격(gap)을 적용하여 다양한 화면 크기에 대응합니다.
 * - 실제 컴포넌트와 동일한 구조로 레이아웃 시프트를 방지합니다.
 *
 * @returns 드롭다운과 달력 스켈레톤을 포함한 컨테이너
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
      <ReservationDropdownSkeleton />
      <ReservationCalendarSkeleton />
    </div>
  );
}
