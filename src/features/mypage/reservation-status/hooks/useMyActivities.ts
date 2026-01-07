import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getMyActivities } from '@/shared/apis/feature/myActivities';
import { QUERY_KEYS } from '@/shared/constants';
import { useUserStore } from '@/shared/stores/userStore';

/**
 * 내 체험 목록 조회 훅
 *
 * @description
 * - 사용자의 체험 목록을 조회
 * - 드롭다운 옵션 형태로 가공된 데이터 제공
 * - activityId로 title을 빠르게 찾을 수 있는 Map 제공
 *
 * @example
 * ```tsx
 * const { activityOptions, activityMap, isLoading, isError } = useMyActivities();
 * ```
 *
 * @returns 체험 목록 데이터 및 상태
 */
export const useMyActivities = () => {
  const userId = useUserStore((s) => s.user?.id);

  const { data, isLoading, isError, isFetched, isRefetching } = useQuery({
    queryKey: QUERY_KEYS.MY_ACTIVITIES({}, userId),
    queryFn: () => getMyActivities({}),
    enabled: !!userId,
  });

  // activityOptions가 변경될 때만 재생성
  const { activityOptions, activityMap } = useMemo(() => {
    const options = data?.activities || [];
    const map = new Map(options.map((opt) => [opt.id.toString(), opt.title]));
    return { activityOptions: options, activityMap: map };
  }, [data?.activities]);

  return {
    activityOptions,
    activityMap,
    isLoading,
    isError,
    isFetched,
    isRefetching,
  };
};
