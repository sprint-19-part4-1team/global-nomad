'use client';

import { useMemo } from 'react';
import Icons from '@/assets/icons';
import ActivityContentTitle from '@/features/activity-detail/components/ActivityContentTitle';
import ActivityReviewItem from '@/features/activity-detail/components/review/ActivityReviewItem';
import { formatSatisfaction } from '@/features/activity-detail/utils/formatSatisfaction';
import Pagination from '@/shared/components/pagination/Pagination';
import Title from '@/shared/components/title/Title';
import useQueryParamState from '@/shared/hooks/useQueryParamState';
import { GetActivityReviewsResponse } from '@/shared/types/activities';
import { cn } from '@/shared/utils/cn';
import { formatValue } from '@/shared/utils/formatValue';

/**
 * 체험 리뷰 목록 컴포넌트의 Props
 * @property {GetActivityReviewsResponse} reivewData - 리뷰 데이터 (평균 평점, 총 개수, 리뷰 목록)
 * @property {string} [className] - 추가 CSS 클래스명
 */
interface ActivityReviewListProps {
  reivewData: GetActivityReviewsResponse;
  className?: string;
}

/**
 * 페이지당 표시할 리뷰 아이템 개수
 */
const ITEMS_PER_PAGE = 3;

/**
 * 체험 리뷰 목록 표시 컴포넌트
 *
 * 체험에 대한 전체 리뷰 목록을 페이지네이션과 함께 표시하며,
 * 평균 평점, 총 리뷰 개수, 만족도 평가를 포함합니다.
 *
 * @description
 * 컴포넌트는 다음과 같은 기능을 제공합니다:
 * - 평균 평점: 숫자와 만족도 텍스트(예: "매우 만족")로 표시
 * - 총 리뷰 개수: 포맷팅된 숫자로 표시
 * - 리뷰 목록: 페이지당 3개씩 표시
 * - 페이지네이션: URL 쿼리 파라미터를 통한 페이지 관리
 *
 * @param {ActivityReviewListProps} props - 컴포넌트 props
 * @returns {JSX.Element} 렌더링된 체험 리뷰 목록 섹션
 *
 * @example
 * ```tsx
 * <ActivityReviewList
 *   reivewData={{
 *     averageRating: 4.5,
 *     totalCount: 128,
 *     reviews: [...]
 *   }}
 * />
 * ```
 */
export default function ActivityReviewList({ reivewData, className }: ActivityReviewListProps) {
  const { averageRating, totalCount, reviews } = reivewData;
  const count = formatValue(totalCount);

  const [currentPage] = useQueryParamState<number>('page', {
    defaultValue: 1,
    parse: (v) => {
      const n = Number(v);
      if (!Number.isFinite(n) || n <= 0) {
        return 1;
      }
      return Math.floor(n);
    },
    removeParam: (v) => v === 1,
    replace: false,
    scroll: false,
  });

  // 현재 페이지에 표시할 리뷰 계산
  const paginatedReviews = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return reviews.slice(startIndex, endIndex);
  }, [reviews, currentPage]);

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
              <div className='body-14 font-bold text-gray-950 sm:body-16'>
                {formatSatisfaction(averageRating)}
              </div>
            </div>
            <div className='flex items-center gap-2'>
              <Icons.Star aria-hidden='true' className='h-16 w-16 text-yellow-500' />
              <span className='body-13 font-medium text-gray-600 sm:body-14'>{count}개 후기</span>
            </div>
          </div>
          <div className='flex flex-col gap-20'>
            {paginatedReviews.map((review) => (
              <ActivityReviewItem key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        <Pagination totalCount={totalCount} itemsPerPage={ITEMS_PER_PAGE} />
      </div>
    </section>
  );
}
