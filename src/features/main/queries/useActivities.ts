import { useQuery } from '@tanstack/react-query';
import { getActivities } from '@/shared/apis/feature/activities';
import { GetActivitiesParams } from '@/shared/types/activities';

export const useActivities = (params: GetActivitiesParams) => {
  return useQuery({
    queryKey: ['activities', params],
    queryFn: () => getActivities(params),
    select: (data) => data,
  });
};
