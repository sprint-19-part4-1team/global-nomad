import { useQuery } from '@tanstack/react-query';
import { getActivityReviews } from '@/shared/apis/feature/activities';
import { QUERY_KEYS } from '@/shared/constants';
import { GetActivityReviewsParams, GetActivityReviewsResponse } from '@/shared/types/activities';

/**
 * 체험 리뷰 목록 조회 훅의 Props
 *
 * @property {number} activityId - 조회할 체험 ID
 * @property {GetActivityReviewsParams} params - 리뷰 조회 파라미터 (페이지, 사이즈 등)
 */
type useActivityReviewsProps = {
  activityId: number;
  params: GetActivityReviewsParams;
};

/**
 * 체험 리뷰 목록 조회 커스텀 훅
 *
 * @description
 * 특정 체험의 리뷰 목록을 페이지네이션과 함께 조회합니다.
 * 페이지가 변경될 때마다 해당 페이지의 리뷰 데이터를 자동으로 조회합니다.
 * React Query를 통해 데이터 캐싱 및 상태 관리가 자동으로 처리됩니다.
 *
 * @param activityId - 체험 ID
 * @param params - 페이지네이션 파라미터 (page, size)
 *
 * @returns 리뷰 데이터를 포함한 객체
 * @returns data - 리뷰 응답 데이터 (GetActivityReviewsResponse)
 * @returns isPending - 데이터 로딩 여부
 * @returns isError - 에러 발생 여부
 *
 * @example
 * ```tsx
 * const { data: reviewData } = useActivityReviews({
 *   activityId: 123,
 *   params: { page: 1, size: 3 }
 * });
 *
 * if (reviewData) {
 *   console.log(reviewData.totalCount); // 전체 리뷰 개수
 *   console.log(reviewData.reviews); // 현재 페이지의 리뷰 목록
 *   console.log(reviewData.averageRating); // 평균 평점
 * }
 * ```
 */
export const useActivityReviews = ({ activityId, params }: useActivityReviewsProps) => {
  const { data, isPending, isError } = useQuery<GetActivityReviewsResponse>({
    queryKey: QUERY_KEYS.ACTIVITY_REVIEWS(activityId, params),
    queryFn: () => getActivityReviews(activityId, params),
    enabled: !!activityId,
  });

  return {
    data,
    isPending,
    isError,
  };
};
