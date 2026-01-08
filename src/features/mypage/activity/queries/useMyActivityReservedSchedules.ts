import { useQuery } from '@tanstack/react-query';
import { getMyActivityReservedSchedules } from '@/shared/apis/feature/myActivities';
import { QUERY_KEYS } from '@/shared/constants';
import { GetMyActivityReservedSchedulesParams } from '@/shared/types/myActivities';

// TODO: 체험 승인/대기 중에는 삭제 불가능 구현 예정
export const useMyActivityReservedSchedules = (
  activityId: number,
  params: GetMyActivityReservedSchedulesParams,
  userId?: number,
  options?: {
    enabled?: boolean;
  }
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.MY_ACTIVITY_RESERVED_SCHEDULE, activityId, params, userId],
    queryFn: () => getMyActivityReservedSchedules(activityId, params),
    enabled: options?.enabled,
  });
};
