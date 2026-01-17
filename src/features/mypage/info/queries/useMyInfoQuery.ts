'use client';

import { useQuery } from '@tanstack/react-query';
import { getMyInfo } from '@/shared/apis/feature/users';
import { QUERY_KEYS } from '@/shared/constants';
import { useUserStore } from '@/shared/stores/userStore';

/**
 * ## useMyInfoQuery
 *
 * @description 유저 정보를 가져오는 query
 */
export const useMyInfoQuery = () => {
  const userId = useUserStore((s) => s.user?.id);

  return useQuery({
    queryKey: QUERY_KEYS.MY_INFO(userId),
    queryFn: getMyInfo,
    staleTime: 5 * 60 * 1000,
    enabled: !!userId,
  });
};
