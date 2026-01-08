'use client';

import ActivityList from '@/features/mypage/activity/components/activityList/ActivityList';
import { useInfiniteScroll } from '@/features/mypage/activity/hooks/useInfiniteScroll';
import { useMyActivitiesInfiniteQuery } from '@/features/mypage/activity/queries/useMyActivitiesInfiniteQuery';
import MypageSectionHeader from '@/features/mypage/common/components/mypage-section-header/MypageSectionHeader';
import Button from '@/shared/components/button/Button';

export default function MypageActivity() {
  const PAGE_SIZE = 5;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch } =
    useMyActivitiesInfiniteQuery(PAGE_SIZE);

  const observerRef = useInfiniteScroll({
    enabled: hasNextPage && !isFetchingNextPage,
    onIntersect: fetchNextPage,
  });

  return (
    <>
      <MypageSectionHeader
        title='내 체험 관리'
        description={`체험을 등록하거나 수정 및 삭제가 가능합니다.
단, 체험 승인/대기 중일 때는 삭제를 할 수 없습니다.`}
        btn
      />

      <div className='mt-24 sm:mt-32'>
        <ActivityList
          data={data}
          isLoading={isLoading}
          isFetchingNextPage={isFetchingNextPage}
          observerRef={observerRef}
          onDelete={refetch}
        />
      </div>

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
