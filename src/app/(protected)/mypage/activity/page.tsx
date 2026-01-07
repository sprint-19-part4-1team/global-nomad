'use client';

import { useEffect, useRef } from 'react';
import ExperienceCard from '@/features/mypage/activity/components/ExperienceCard/ExperienceCard';
import { useMyActivitiesInfiniteQuery } from '@/features/mypage/activity/queries/useMyActivitiesInfiniteQuery';
import MypageSectionHeader from '@/features/mypage/common/components/mypage-section-header/MypageSectionHeader';
import MypageListSkeleton from '@/features/mypage/common/components/skeleton/MypageListSkeleton';
import Button from '@/shared/components/button/Button';
import EmptyState from '@/shared/components/empty-state/EmptyState';

export default function MypageActivity() {
  const observerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMyActivitiesInfiniteQuery(5);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    });

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // 데이터 없을 때
  const isEmpty = !data?.pages[0]?.activities.length;

  return (
    <>
      <MypageSectionHeader
        title='내 체험 관리'
        description={`체험을 등록하거나 수정 및 삭제가 가능합니다.
단, 체험 승인/대기 중일 때는 삭제를 할 수 없습니다.`}
        btn
      />
      <div className='mt-24 sm:mt-32'>
        {isLoading ? (
          <MypageListSkeleton variant='activity' count={5} />
        ) : isEmpty ? (
          <EmptyState mainText='체험이 없습니다.' type='experience' />
        ) : (
          <>
            <ul>
              {data?.pages.map((page) =>
                page.activities.map((activity) => (
                  <li className='mt-20 sm:mt-24' key={activity.id}>
                    <ExperienceCard
                      id={activity.id}
                      title={activity.title}
                      rating={activity.rating}
                      price={activity.price}
                      reviewCount={activity.reviewCount}
                      bannerImageUrl={activity.bannerImageUrl}
                    />
                  </li>
                ))
              )}
            </ul>

            <div ref={observerRef} className='h-10' />

            {isFetchingNextPage && <MypageListSkeleton variant='activity' count={2} />}
          </>
        )}
      </div>

      <div ref={observerRef} className='h-10' />

      {isFetchingNextPage && <MypageListSkeleton variant='activity' count={2} />}

      <Button
        full
        href='/activity/new'
        size='lg'
        className='fixed bottom-16 z-2 block w-full max-w-[calc(100%-48px)] sm:hidden'>
        체험 등록하기
      </Button>
    </>
  );
}
