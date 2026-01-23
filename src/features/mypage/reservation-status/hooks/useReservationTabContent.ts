import { useScheduledReservations } from '@/features/mypage/reservation-status/queries/useScheduledReservations';
import useInfiniteScroll from '@/shared/hooks/useInfiniteScroll';
import { ActivityReservationStatus } from '@/shared/types/myActivities';

/**
 * 예약 탭 컨텐츠 훅의 매개변수 타입
 *
 * @property activityId - 조회할 활동의 ID
 * @property scheduleId - 조회할 스케줄의 ID
 * @property currentTab - 현재 활성화된 탭 상태 (신청/승인/거절)
 */
interface UseReservationTabContentProps {
  activityId: string;
  scheduleId: string;
  currentTab: ActivityReservationStatus;
}

/**
 * 예약 탭 컨텐츠를 관리하는 커스텀 훅
 *
 * 현재 선택된 탭에 해당하는 예약 데이터를 조회하고,
 * 무한 스크롤 기능을 제공합니다.
 *
 * @param props - 훅 설정 객체
 *
 * @returns 예약 데이터와 무한 스크롤 관련 상태 및 ref
 * @returns reservations - 현재 탭의 예약 목록
 * @returns isPending - 초기 로딩 상태
 * @returns hasNextPage - 다음 페이지 존재 여부
 * @returns isFetchingNextPage - 다음 페이지 로딩 상태
 * @returns observerRef - 무한 스크롤 옵저버를 연결할 ref
 *
 * @example
 * ```tsx
 * const { reservations, isPending, observerRef } = useReservationTabContent({
 *   activityId: '123',
 *   scheduleId: '456',
 *   currentTab: ReservationStatus.Pending
 * });
 * ```
 */
export const useReservationTabContent = ({
  activityId,
  scheduleId,
  currentTab,
}: UseReservationTabContentProps) => {
  // 현재 탭의 데이터만 조회
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useScheduledReservations({
      activityId: Number(activityId),
      scheduleId: Number(scheduleId),
      status: currentTab,
      size: 10,
    });

  const reservations = data?.pages.flatMap((page) => page.reservations) ?? [];

  // 무한 스크롤 훅 사용
  const observerRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  return {
    reservations,
    isPending,
    hasNextPage,
    isFetchingNextPage,
    observerRef,
  };
};
