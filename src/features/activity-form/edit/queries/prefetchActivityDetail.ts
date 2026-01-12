import { QueryClient } from '@tanstack/react-query';
import { getActivityDetail } from '@/shared/apis/feature/activities';
import { QUERY_KEYS } from '@/shared/constants';
import { ActivityWithSubImagesAndSchedulesDto } from '@/shared/types/activities';

/**
 * ## prefetchActivityDetail
 *
 * @description
 * - 체험(Activity) 상세 정보를 React Query 캐시에 미리 로드하는 유틸 함수입니다.
 * - 서버 컴포넌트 또는 페이지 진입 전에 호출하여,
 *   클라이언트에서 즉시 캐시된 데이터를 사용할 수 있도록 합니다.
 *
 * @param queryClient - React Query QueryClient 인스턴스
 * @param activityId - 조회할 체험 ID
 *
 * @returns 프리패치된 체험 상세 데이터
 */
export const prefetchActivityDetail = async (queryClient: QueryClient, activityId: number) => {
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.ACTIVITY_DETAIL(activityId),
    queryFn: () => getActivityDetail(activityId),
  });

  return queryClient.getQueryData<ActivityWithSubImagesAndSchedulesDto>(
    QUERY_KEYS.ACTIVITY_DETAIL(activityId)
  );
};
