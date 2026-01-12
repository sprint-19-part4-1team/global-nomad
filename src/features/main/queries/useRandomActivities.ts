import { useQuery } from '@tanstack/react-query';
import { pickRandom } from '@/features/main/utils/pickRandom';
import { getActivities } from '@/shared/apis/feature/activities';

export const useRandomActivities = () => {
  return useQuery({
    queryKey: ['activities', 'random', 5],
    queryFn: () =>
      getActivities({
        method: 'offset',
        page: 1,
        size: 9999,
      }),
    select: (data) => pickRandom(data.activities, 5),
    staleTime: 1000 * 60 * 5,
  });
};
