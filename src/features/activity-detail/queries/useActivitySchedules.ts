import { useQuery } from '@tanstack/react-query';
import { getYear, getMonth } from 'date-fns';
import { getActivitySchedules } from '@/shared/apis/feature/activities';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { ScheduleResponseDto } from '@/shared/types/activities';

/**
 * 체험 예약 가능일 조회 커스텀 훅
 *
 * @description
 * 특정 월의 체험 예약 가능한 스케줄을 조회합니다.
 * 월이 변경될 때마다 해당 월의 데이터를 자동으로 조회합니다.
 *
 * @param activityId - 체험 ID
 * @param currentMonth - 조회할 월 (Date 객체)
 * @returns React Query의 쿼리 결과 객체
 *
 * @example
 * ```tsx
 * const { data: schedules, isLoading } = useActivitySchedules('123', new Date('2026-01-01'));
 * ```
 */
export const useActivitySchedules = (activityId: string, currentMonth: Date) => {
  const year = String(getYear(currentMonth));
  const month = String(getMonth(currentMonth) + 1).padStart(2, '0');

  const { data, refetch } = useQuery<ScheduleResponseDto[]>({
    queryKey: QUERY_KEYS.ACTIVITY_AVAILABLE_SCHEDULE(Number(activityId), { year, month }),
    queryFn: () => getActivitySchedules(Number(activityId), { year, month }),
  });

  return {
    data,
    refetch,
  };
};
