import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateMyActivityReservationStatus } from '@/shared/apis/feature/myActivities';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { useUserStore } from '@/shared/stores/userStore';
import { UpdatableReservationStatus } from '@/shared/types/myActivities';

/**
 * 예약 상태 업데이트 파라미터 타입
 *
 * @property {number} activityId - 액티비티 ID
 * @property {number} reservationId - 예약 ID
 * @property {UpdatableReservationStatus} status - 변경할 예약 상태 (승인 또는 거절)
 * @property {number} scheduleId - 스케줄 ID
 * @property {string} date - 예약 날짜 (yyyy-MM-dd 형식)
 * @property {string} year - 예약 연도
 * @property {string} month - 예약 월
 */
interface UpdateReservationParams {
  activityId: number;
  reservationId: number;
  status: UpdatableReservationStatus;
  scheduleId: number;
  date: string;
  year: string;
  month: string;
}

/**
 * 예약 상태 업데이트 mutation 훅
 *
 * 예약 상태를 승인(Confirmed) 또는 거절(Declined)로 변경하고,
 * 변경 후 관련된 모든 쿼리를 무효화하여 UI를 자동으로 갱신합니다.
 *
 * @description
 * - 예약 상태를 승인 또는 거절로 변경
 * - 변경 후 관련된 모든 쿼리를 무효화하여 UI 자동 갱신
 * - 무효화 대상:
 *   1. 해당 activityId의 모든 예약 관련 쿼리
 *   2. 날짜별 스케줄 쿼리 (count 정보 갱신)
 *   3. 월별 예약 현황 쿼리 (달력 갱신)
 *
 * @returns {UseMutationResult} 예약 상태 업데이트 mutation 객체
 *
 * @example
 * ```tsx
 * const { mutate: updateStatus } = useUpdateReservationStatusMutation();
 *
 * updateStatus({
 *   activityId: 123,
 *   reservationId: 456,
 *   status: ReservationStatus.Confirmed,
 *   scheduleId: 789,
 *   date: '2024-01-15',
 *   year: '2024',
 *   month: '01',
 * });
 * ```
 */
export const useUpdateReservationStatusMutation = () => {
  const queryClient = useQueryClient();
  const userId = useUserStore((s) => s.user?.id);

  return useMutation({
    mutationFn: ({ activityId, reservationId, status }: UpdateReservationParams) =>
      updateMyActivityReservationStatus(activityId, reservationId, { status }),

    onSuccess: (_, variables) => {
      const { activityId, date, year, month } = variables;

      // 해당 activityId의 모든 예약 관련 쿼리 무효화
      queryClient.invalidateQueries({
        predicate: (query) => {
          const queryKey = query.queryKey;
          return queryKey[0] === 'myActivityReservations' && queryKey[1] === activityId;
        },
      });

      // 날짜별 스케줄 무효화 (count 정보 갱신)
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.MY_ACTIVITY_RESERVED_SCHEDULE(activityId, { date }, userId),
      });

      // 월별 예약 현황 무효화 (달력 갱신)
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.MY_ACTIVITY_RESERVATION_DASHBOARD(activityId, { year, month }, userId),
      });
    },
    onError: (error) => {
      // 에러 로깅
      console.error('예약 상태 업데이트 실패:', error);
      toast.error('예약 상태 변경에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
