import { useQuery } from '@tanstack/react-query';
import { getYear, getMonth } from 'date-fns';
import { getActivitySchedules } from '@/shared/apis/feature/activities';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { ScheduleResponseDto } from '@/shared/types/activities';

/**
 * 체험 예약 가능일 조회 훅의 Props
 *
 * @property activityId - 체험 ID
 * @property currentMonth - 조회할 월 (Date 객체)
 */
type useActivitySchedulesProps = {
  activityId: number;
  currentMonth: Date;
};

/**
 * 체험 예약 가능일 조회 커스텀 훅
 *
 * @description
 * 특정 월의 체험 예약 가능한 스케줄을 조회합니다.
 * 월이 변경될 때마다 해당 월의 데이터를 자동으로 조회합니다.
 *
 * @param activityId - 체험 ID
 * @param currentMonth - 조회할 월 (Date 객체)
 *
 * @returns 스케줄 데이터 배열, 로딩 상태, 에러 상태를 포함한 객체
 * @returns data - 예약 가능한 스케줄 배열 (ScheduleResponseDto[])
 * @returns isPending - 데이터 로딩 여부
 * @returns isError - 에러 발생 여부
 *
 * @example
 * ```tsx
 * const { data: schedules, isPending, isError } = useActivitySchedules('123', new Date('2026-01-01'));
 * ```
 */
export const useActivitySchedules = ({ activityId, currentMonth }: useActivitySchedulesProps) => {
  const year = String(getYear(currentMonth));
  const month = String(getMonth(currentMonth) + 1).padStart(2, '0');

  const { data, isPending, isError } = useQuery<ScheduleResponseDto[]>({
    queryKey: QUERY_KEYS.ACTIVITY_AVAILABLE_SCHEDULE(activityId, { year, month }),
    queryFn: () => getActivitySchedules(activityId, { year, month }),
  });

  return {
    data,
    isPending,
    isError,
  };
};
