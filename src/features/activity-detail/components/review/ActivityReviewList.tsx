'use client';

import Icons from '@/assets/icons';
import ActivityContentTitle from '@/features/activity-detail/components/ActivityContentTitle';
import ActivityReviewEmpty from '@/features/activity-detail/components/review/ActivityReviewEmpty';
import ActivityReviewItem from '@/features/activity-detail/components/review/ActivityReviewItem';
import { ITEMS_PER_PAGE } from '@/features/activity-detail/constants/pagination';
import { useActivityReviews } from '@/features/activity-detail/queries/useActivityReviews';
import { formatRating } from '@/features/activity-detail/utils/formatRating';
import { formatSatisfaction } from '@/features/activity-detail/utils/formatSatisfaction';
import Pagination from '@/shared/components/pagination/Pagination';
import Title from '@/shared/components/title/Title';
import useQueryParamState from '@/shared/hooks/useQueryParamState';
import { cn } from '@/shared/utils/cn';
import { formatValue } from '@/shared/utils/formatValue';
import { parsePageQueryParam } from '@/shared/utils/parsePageQueryParam';

/**
 * 체험 리뷰 목록 컴포넌트의 Props
 *
 * @property activityId - 체험 ID
 * @property [className] - 추가 CSS 클래스명
 */
interface ActivityReviewListProps {
  activityId: number;
  className?: string;
}

/**
 * 체험 리뷰 목록을 페이지네이션과 함께 표시하는 컴포넌트
 *
 * 평균 평점, 만족도, 리뷰 목록을 표시하며,
 * URL 쿼리 파라미터를 통해 페이지 상태를 관리합니다.
 *
 * @component
 * @param props - 컴포넌트 props
 * @returns 리뷰 목록 섹션
 *
 * @example
 * ```tsx
 * <ActivityReviewList activityId={123} />
 * ```
 */
export default function ActivityReviewList({ activityId, className }: ActivityReviewListProps) {
  // 페이지 상태를 최상위에서 관리 (Lifting State Up)
  const [currentPage, setCurrentPage] = useQueryParamState<number>('reviewPage', {
    defaultValue: 1,
    parse: parsePageQueryParam,
    removeParam: (v) => v === 1, // 1페이지는 URL에 표시하지 않음
    replace: false,
    scroll: false,
  });

  // API를 통해 리뷰 데이터 조회
  const {
    data: reviewData,
    isPending,
    isError,
  } = useActivityReviews({
    activityId,
    params: {
      page: currentPage,
      size: ITEMS_PER_PAGE,
    },
  });

  // 로딩 상태
  if (isPending) {
    return <ActivityReviewEmpty state='pending' className={className} />;
  }

  // 에러 상태
  if (isError) {
    return <ActivityReviewEmpty state='error' className={className} />;
  }

  // 빈 상태
  if (!reviewData || reviewData.totalCount === 0) {
    return <ActivityReviewEmpty className={className} />;
  }

  const { totalCount, reviews, averageRating: rawAverageRating } = reviewData;
  const averageRating = formatRating(rawAverageRating);
  const count = formatValue(totalCount);

  return (
    <section
      className={cn(
        'flex flex-col gap-24 border-t border-gray-100 pt-20 pb-20 sm:gap-40 sm:pt-40',
        className
      )}>
      <div className='flex flex-col gap-8'>
        <div className='flex items-center gap-8'>
          <ActivityContentTitle>체험 후기</ActivityContentTitle>
          <span className='body-14 font-bold text-gray-600 sm:body-16'>{count}개</span>
        </div>
        <div className='flex flex-col gap-30'>
          <div className='flex flex-col items-center gap-6'>
            <div className='flex flex-col items-center gap-2'>
              <Title as='h4' size='24' className='sm:heading-32'>
                {averageRating}
              </Title>
              <div className='body-14 font-bold sm:body-16'>
                {formatSatisfaction(averageRating)}
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Icons.Star aria-hidden='true' className='h-16 w-16 text-yellow-500' />
              <span className='body-13 font-medium text-gray-600 sm:body-14'>{count}개 후기</span>
            </div>
          </div>
          <div className='flex flex-col gap-20'>
            {reviews.map((review) => (
              <ActivityReviewItem key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <Pagination
          totalCount={totalCount}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}
