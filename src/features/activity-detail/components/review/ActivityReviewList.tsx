'use client';

import { useMemo } from 'react';
import Icons from '@/assets/icons';
import ActivityContentTitle from '@/features/activity-detail/components/ActivityContentTitle';
import ActivityReviewItem from '@/features/activity-detail/components/review/ActivityReviewItem';
import { formatRating } from '@/features/activity-detail/utils/formatRating';
import { formatSatisfaction } from '@/features/activity-detail/utils/formatSatisfaction';
import Pagination from '@/shared/components/pagination/Pagination';
import Title from '@/shared/components/title/Title';
import useQueryParamState from '@/shared/hooks/useQueryParamState';
import { GetActivityReviewsResponse } from '@/shared/types/activities';
import { cn } from '@/shared/utils/cn';
import { formatValue } from '@/shared/utils/formatValue';
import { parsePageQueryParam } from '@/shared/utils/parsePageQueryParam';

/**
 * 체험 리뷰 목록 컴포넌트의 Props
 *
 * @property {GetActivityReviewsResponse} reviewData - 리뷰 데이터 (평균 평점, 총 개수, 리뷰 목록)
 * @property {string} [className] - 추가 CSS 클래스명
 */
interface ActivityReviewListProps {
  reviewData: GetActivityReviewsResponse;
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
 * **주요 기능**
 * - 평균 평점: 숫자와 만족도 텍스트(예: "매우 만족")로 표시
 * - 총 리뷰 개수: 포맷팅된 숫자로 표시
 * - 리뷰 목록: 페이지당 3개씩 표시
 * - 페이지네이션: URL 쿼리 파라미터 `page`를 통한 페이지 관리
 *
 * **상태 관리 패턴**
 * - 페이지 상태를 이 컴포넌트에서 관리하고 `Pagination` 컴포넌트에 props로 전달
 * - 단일 진실 공급원(Single Source of Truth): URL 상태를 한 곳에서만 읽고 관리
 * - 1페이지일 경우 URL에 쿼리 파라미터를 표시하지 않음 (`/activity/123` 형태)
 * - 2페이지 이상일 경우에만 표시 (`/activity/123?page=2` 형태)
 *
 * **클라이언트 측 페이지네이션**
 * - 모든 리뷰 데이터를 한 번에 받아와 클라이언트에서 페이지네이션 처리
 * - `useMemo`를 사용하여 현재 페이지에 해당하는 리뷰만 필터링
 *
 * @param {ActivityReviewListProps} props - 컴포넌트 props
 * @returns {JSX.Element} 렌더링된 체험 리뷰 목록 섹션
 *
 * @example
 * ```tsx
 * <ActivityReviewList
 *   reviewData={{
 *     averageRating: 4.5,
 *     totalCount: 128,
 *     reviews: [
 *       { id: 1, rating: 5, content: '정말 좋았어요!', ... },
 *       // ...
 *     ]
 *   }}
 * />
 * ```
 */
export default function ActivityReviewList({ reviewData, className }: ActivityReviewListProps) {
  const { totalCount, reviews } = reviewData;
  const averageRating = formatRating(reviewData.averageRating);
  const count = formatValue(totalCount);

  // 페이지 상태를 최상위에서 관리 (Lifting State Up)
  const [currentPage, setCurrentPage] = useQueryParamState<number>('reviewPage', {
    defaultValue: 1,
    parse: parsePageQueryParam,
    removeParam: (v) => v === 1, // 1페이지는 URL에 표시하지 않음
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
