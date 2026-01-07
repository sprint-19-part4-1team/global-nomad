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
 * - userId가 없으면 API 호출하지 않음 (enabled 옵션)
 *
 * @returns 체험 목록 데이터 및 상태
 * @returns activityOptions - 체험 목록 배열 (id, title 등 포함)
 * @returns activityMap - activityId(문자열)를 키로 title을 값으로 하는 Map 객체
 * @returns isLoading - 초기 로딩 중 여부
 * @returns isError - 에러 발생 여부
 * @returns isFetched - 데이터가 한 번 이상 fetch 되었는지 여부
 * @returns isRefetching - 백그라운드에서 재조회 중 여부
 * @returns refetch - 수동으로 데이터를 다시 가져오는 함수
 *
 * @example
 * ```tsx
 * const {
 *   activityOptions,
 *   activityMap,
 *   isLoading,
 *   isError,
 *   refetch
 * } = useMyActivities();
 *
 * // 드롭다운 옵션으로 사용
 * activityOptions.map(activity => <option key={activity.id}>{activity.title}</option>)
 *
 * // Map으로 빠른 조회
 * const title = activityMap.get('123'); // activityId가 123인 체험의 title
 * ```
 */
export const useMyActivities = () => {
  const userId = useUserStore((s) => s.user?.id);

  const { data, isLoading, isError, isFetched, isRefetching, refetch } = useQuery({
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
    refetch,
  };
};
