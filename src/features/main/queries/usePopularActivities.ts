import { useInfiniteQuery } from '@tanstack/react-query';
import { getActivities } from '@/shared/apis/feature/activities';

type GetActivitiesParamsWithCursor = {
  method: 'cursor';
  cursorId?: number;
  size: number;
};

const getActivitiesWithCursor = (params: GetActivitiesParamsWithCursor) => {
  return getActivities(params as any);
};

export const usePopularActivities = () => {
  return useInfiniteQuery({
    queryKey: ['activities', 'popular'],
    queryFn: async ({ pageParam }) => {
      return await getActivitiesWithCursor({
        method: 'cursor',
        cursorId: pageParam,
        size: 9999,
      });
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.cursorId;
    },
    staleTime: 1000 * 60 * 5,
  });
};
