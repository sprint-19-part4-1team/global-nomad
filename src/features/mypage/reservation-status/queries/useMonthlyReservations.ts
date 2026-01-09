import { useQuery } from '@tanstack/react-query';
import { getMyActivityReservationDashboard } from '@/shared/apis/feature/myActivities';
import { QUERY_KEYS } from '@/shared/constants';
import { useUserStore } from '@/shared/stores/userStore';
import { GetMyActivityReservationDashboardParams } from '@/shared/types/myActivities';

/**
 * useMonthlyReservations 훅의 매개변수 타입
 *
 * @property {number} activityId - 조회할 체험의 ID
 * @property {GetMyActivityReservationDashboardParams} params - 월별 예약 현황을 조회하는 데 필요한 파라미터들
 */
type UseMonthlyReservationsParams = {
  activityId: number;
  params: GetMyActivityReservationDashboardParams;
};

/**
 * 달력에 표시할 월별 예약 현황 조회 훅
 *
 * @description
 * - 특정 체험의 특정 월(year-month) 예약 현황을 조회
 * - activityId, year, month가 변경되면 자동으로 재조회
 * - React Query의 캐싱으로 같은 조건 재조회 시 캐시 사용
 * - userId나 activityId가 없으면 API 호출하지 않음 (enabled 옵션)
 *
 * @param params - 조회 파라미터
 * @param params.activityId - 체험 ID (0이면 API 호출 안함)
 * @param params.params - 년도와 월 정보를 담은 객체
 * @param params.params.year - 조회할 년도 문자열 (예: "2026")
 * @param params.params.month - 조회할 월 문자열 (예: "1", "2", ..., "12")
 * @returns 예약 현황 데이터 및 로딩 상태
 * @returns reservations - 날짜별 예약 현황 배열 (빈 배열이 기본값)
 * @returns isPending - 데이터 로딩 중이며 아직 데이터가 없는 상태
 * @returns isFetched - 데이터가 한 번 이상 fetch 되었는지 여부
 *
 * @example
 * ```tsx
 * // 2026년 1월 예약 현황 조회
 * const { reservations, isPending, isFetched } = useMonthlyReservations({
 *   activityId: 123,
 *   params: {
 *     year: "2026",
 *     month: "1",
 *   },
 * });
 *
 * // activityId가 0이면 API 호출 안함
 * const { reservations, isPending } = useMonthlyReservations({
 *   activityId: 0,  // enabled: false로 동작
 *   params: {
 *     year: "2026",
 *     month: "1",
 *   },
 * });
 * ```
 */
export const useMonthlyReservations = ({ activityId, params }: UseMonthlyReservationsParams) => {
  const queryParams: GetMyActivityReservationDashboardParams = {
    year: params.year.toString(),
    month: params.month.toString().padStart(2, '0'),
  };

  const userId = useUserStore((s) => s.user?.id);

  const { data, isPending, isFetched } = useQuery({
    queryKey: QUERY_KEYS.MY_ACTIVITY_RESERVATION_DASHBOARD(activityId, queryParams, userId),
    queryFn: () => getMyActivityReservationDashboard(activityId, queryParams),
    enabled: !!activityId && !!userId,
  });

  return {
    reservations: data || [],
    isPending,
    isFetched,
  };
};
