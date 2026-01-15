import { useQuery } from '@tanstack/react-query';
import { pickRandom } from '@/features/main/utils/pickRandom';
import { getActivities } from '@/shared/apis/feature/activities';
import { QUERY_KEYS } from '@/shared/constants';

export const useRandomActivities = () => {
  return useQuery({
    queryKey: QUERY_KEYS.RANDOM_ACTIVITIES(5),
    queryFn: async () => {
      const data = await getActivities({
        method: 'offset',
        page: 1,
        size: 9999,
      });

      return pickRandom(data.activities, 5);
    },
    staleTime: 1000 * 60 * 5,
  });
};
