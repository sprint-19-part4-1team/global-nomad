import type { InfiniteData, QueryObserverResult } from '@tanstack/react-query';
import type { RefObject } from 'react';
import ExperienceCard from '@/features/mypage/activity/components/experienceCard/ExperienceCard';
import MypageListSkeleton from '@/features/mypage/common/components/skeleton/MypageListSkeleton';
import EmptyState from '@/shared/components/empty-state/EmptyState';
import type { ActivityBasicDto } from '@/shared/types/activities';

type ActivitiesPage = {
  activities: ActivityBasicDto[];
  nextCursor?: number;
};

type ActivityListProps = {
  data?: InfiniteData<ActivitiesPage>;
  isPending: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  refetch: () => Promise<QueryObserverResult<InfiniteData<ActivitiesPage>, Error>>;
  observerRef: RefObject<HTMLDivElement | null>;
};

/**
 * ## ActivityList
 *
 * @description
 * - 마이페이지에서 사용자가 등록한 체험(Activity) 목록을 렌더링하는 컴포넌트입니다.
 * - React Query의 `useInfiniteQuery` 결과를 기반으로 무한 스크롤 목록을 구성합니다.
 * - 로딩, 에러, 빈 상태(Empty State)를 각각 분기 처리합니다.
 *
 * @param data - `useInfiniteQuery`로 조회한 체험 목록 데이터
 * @param isPending - 초기 데이터 로딩 여부
 * @param isError - 데이터 조회 실패 여부
 * @param isFetchingNextPage - 다음 페이지 데이터를 불러오는 중인지 여부
 * @param refetch - 데이터 재요청 함수 (에러 상태에서 재시도 용도)
 * @param observerRef - 무한 스크롤 감지를 위한 관찰 대상 DOM ref
 */
export default function ActivityList({
  data,
  isPending,
  isError,
  refetch,
  isFetchingNextPage,
  observerRef,
}: ActivityListProps) {
  const isEmpty = !data?.pages[0]?.activities.length;

  if (isError) {
    return (
      <EmptyState
        type='error'
        mainText='체험 목록을 불러오는데 실패했어요.'
        button={{ text: '다시 시도하기', onClick: () => refetch() }}
      />
    );
  }

  if (isPending) {
    return <MypageListSkeleton variant='activity' count={5} />;
  }

  if (isEmpty) {
    return <EmptyState mainText='아직 등록한 체험이 없어요.' type='experience' />;
  }

  return (
    <>
      <ul>
        {data.pages.map((page) =>
          page.activities.map((activity: ActivityBasicDto) => (
            <li key={activity.id} className='mt-20 sm:mt-24'>
              <ExperienceCard {...activity} />
            </li>
          ))
        )}
      </ul>

      <div ref={observerRef} className='h-10' />

      {isFetchingNextPage && <MypageListSkeleton variant='activity' count={1} />}
    </>
  );
}
