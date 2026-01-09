'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyActivities } from '@/shared/apis/feature/myActivities';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { useUserStore } from '@/shared/stores/userStore';

/**
 * ## useMyActivitiesInfiniteQuery
 *
 * @description 내 체험 리스트를 조회하는 query (무한 스크롤)
 */
export const useMyActivitiesInfiniteQuery = (size: number = 10) => {
  const userId = useUserStore((s) => s.user?.id);

  return useInfiniteQuery({
    queryKey: QUERY_KEYS.MY_ACTIVITIES({ size }, userId),
    queryFn: ({ pageParam }) =>
      getMyActivities({
        cursorId: pageParam,
        size,
      }),
    enabled: !!userId,
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.cursorId,
    staleTime: 5 * 60 * 1000,
  });
};
