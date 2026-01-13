import { useInfiniteQuery } from '@tanstack/react-query';
import { getActivities } from '@/shared/apis/feature/activities';

type GetActivitiesParamsWithCursor = {
  method: 'cursor';
  cursorId?: number;
  size: number;
};

const getActivitiesWithCursor = (params: GetActivitiesParamsWithCursor) => {
  return getActivities(params);
};

export const usePopularActivities = () => {
  return useInfiniteQuery({
    queryKey: ['activities', 'popular'],
    queryFn: async ({ pageParam }) => {
      const isFirstPage = pageParam === undefined;

      return await getActivitiesWithCursor({
        method: 'cursor',
        cursorId: pageParam,
        size: isFirstPage ? 4 : 1, // ⭐ 핵심
      });
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.cursorId;
    },
    staleTime: 1000 * 60 * 5,
  });
};
