import { useQuery } from '@tanstack/react-query';
import { getActivityDetail } from '@/shared/apis/feature/activities';
import { QUERY_KEYS } from '@/shared/constants';

/**
 * ## useActivityDetailQuery
 *
 * @description
 * - 특정 체험(Activity)의 상세 정보를 조회하는 쿼리 훅입니다.
 * - 서버 컴포넌트에서 prefetch된 데이터를 Hydration 받아 즉시 데이터를 반환합니다.
 * - 전달받은 `id`를 기반으로 `QUERY_KEYS.ACTIVITY_DETAIL` 캐시 키를 생성합니다.
 *
 * @param id - 상세 정보를 조회할 체험 ID
 */
export const useActivityDetailQuery = (id: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.ACTIVITY_DETAIL(id),
    queryFn: () => getActivityDetail(id),
  });
};
