import { useInfiniteQuery } from '@tanstack/react-query';
import { getActivities } from '@/shared/apis/feature/activities';
import { ActivitySortOption, QUERY_KEYS } from '@/shared/constants';

type GetActivitiesParamsWithCursor = {
  method: 'cursor';
  cursorId?: number;
  size: number;
  sort: ActivitySortOption;
};

const getActivitiesWithCursor = (params: GetActivitiesParamsWithCursor) => {
  return getActivities(params);
};

export const usePopularActivities = () => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.ACTIVITIES({
      method: 'offset',
    }),
    queryFn: async ({ pageParam }) => {
      const isFirstPage = pageParam === undefined;
      return await getActivitiesWithCursor({
        method: 'cursor',
        sort: 'most_reviewed',
        cursorId: pageParam,
        size: isFirstPage ? 4 : 1,
      });
    },
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => {
      return lastPage.cursorId;
    },
    staleTime: 1000 * 60 * 5,
  });
};
