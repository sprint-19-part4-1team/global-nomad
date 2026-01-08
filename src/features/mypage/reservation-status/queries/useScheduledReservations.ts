import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyActivityReservations } from '@/shared/apis/feature/myActivities';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { useUserStore } from '@/shared/stores/userStore';
import { ReservationStatus } from '@/shared/types/myReservations';

/**
 * useScheduledReservations 훅의 매개변수 타입
 *
 * @property {number} activityId - 조회할 체험의 ID
 * @property {number} scheduleId - 조회할 스케줄의 ID
 * @property {ReservationStatus.Declined | ReservationStatus.Pending | ReservationStatus.Confirmed} status - 예약 상태 (거절/대기/승인)
 * @property {number} [size=10] - 한 페이지당 조회할 예약 개수 (기본값: 10)
 */
interface UseScheduledReservationsParams {
  activityId: number;
  scheduleId: number;
  status: ReservationStatus.Declined | ReservationStatus.Pending | ReservationStatus.Confirmed;
  size?: number;
}

/**
 * 내 체험 예약 시간대별 예약 내역 조회 훅
 *
 * @description
 * 특정 스케줄에 대한 예약 목록을 무한 스크롤 방식으로 조회합니다.
 * 예약 상태(승인/대기/거절)별로 필터링하여 조회할 수 있습니다.
 * 사용자 로그인 상태이고 activityId, scheduleId가 존재할 때만 API를 호출합니다.
 *
 * @param params - 체험 ID, 스케줄 ID, 상태 및 페이지 크기 파라미터
 * @param params.activityId - 조회할 체험의 ID
 * @param params.scheduleId - 조회할 스케줄의 ID
 * @param params.status - 필터링할 예약 상태 (Declined/Pending/Confirmed)
 * @param params.size - 한 페이지당 조회할 예약 개수 (기본값: 10)
 * @returns 무한 쿼리 결과 객체
 * - `data`: 페이지별 예약 목록 데이터
 * - `fetchNextPage`: 다음 페이지 데이터를 가져오는 함수
 * - `hasNextPage`: 다음 페이지 존재 여부
 * - `isFetchingNextPage`: 다음 페이지 로딩 중 여부
 * - 기타 useInfiniteQuery의 반환값
 *
 * @example
 * ```tsx
 * const { data, fetchNextPage, hasNextPage } = useScheduledReservations({
 *   activityId: 123,
 *   scheduleId: 456,
 *   status: ReservationStatus.Confirmed,
 *   size: 20
 * });
 * ```
 */
export const useScheduledReservations = ({
  activityId,
  scheduleId,
  status,
  size = 10,
}: UseScheduledReservationsParams) => {
  const userId = useUserStore((s) => s.user?.id);

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.MY_ACTIVITY_RESERVATIONS(activityId, { scheduleId, status, size }, userId),
    queryFn: ({ pageParam }) =>
      getMyActivityReservations(activityId, {
        scheduleId,
        status,
        size,
        cursorId: pageParam,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    enabled: !!activityId && !!scheduleId && !!userId,
  });
};
