import { useQuery } from '@tanstack/react-query';
import { getMyActivityReservedSchedules } from '@/shared/apis/feature/myActivities';
import { QUERY_KEYS } from '@/shared/constants';
import { useUserStore } from '@/shared/stores/userStore';
import { GetMyActivityReservedSchedulesParams } from '@/shared/types/myActivities';

/**
 * useDailyReservations 훅의 매개변수 타입
 *
 * @property {number} activityId - 조회할 체험의 ID
 * @property {GetMyActivityReservedSchedulesParams} params - 날짜별 예약 스케줄 조회를 위한 쿼리 파라미터
 */
type useDailyReservationsParams = {
  activityId: number;
  params: GetMyActivityReservedSchedulesParams;
};

/**
 * 내 체험 날짜별 예약 정보가 있는 스케줄 조회 훅
 *
 * @description
 * 특정 날짜의 예약 가능한 시간대(스케줄) 목록을 조회합니다.
 * 각 스케줄별로 신청/승인/거절 상태의 예약 개수 정보를 포함합니다.
 * 사용자 로그인 상태일 때만 API를 호출합니다.
 *
 * @param params - 체험 ID와 날짜 쿼리 파라미터
 * @param params.activityId - 조회할 체험의 ID
 * @param params.params - 날짜별 예약 스케줄 조회를 위한 쿼리 파라미터
 * @returns 스케줄 목록 및 쿼리 상태를 포함하는 객체
 * - `reservations`: 예약 스케줄 목록 (빈 배열 기본값)
 * - `isPending`: 데이터 로딩 중 여부
 * - `isFetched`: 데이터 조회 완료 여부
 *
 * @example
 * ```tsx
 * const { reservations, isPending } = useDailyReservations({
 *   activityId: 123,
 *   params: { date: '2023-02-10' }
 * });
 * ```
 */
export const useDailyReservations = ({ activityId, params }: useDailyReservationsParams) => {
  const userId = useUserStore((s) => s.user?.id);

  const { data, isPending, isFetched } = useQuery({
    queryKey: QUERY_KEYS.MY_ACTIVITY_RESERVED_SCHEDULE(activityId, params, userId),
    queryFn: () => getMyActivityReservedSchedules(activityId, params),
    enabled: !!userId,
  });

  return {
    schedules: data || [],
    isPending,
    isFetched,
  };
};
