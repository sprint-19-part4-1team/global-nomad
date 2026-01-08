import { InfiniteData } from '@tanstack/react-query';
import ExperienceCard from '@/features/mypage/activity/components/experienceCard/ExperienceCard';
import MypageListSkeleton from '@/features/mypage/common/components/skeleton/MypageListSkeleton';
import EmptyState from '@/shared/components/empty-state/EmptyState';
import { ActivityBasicDto } from '@/shared/types/activities';

type ActivitiesPage = {
  activities: ActivityBasicDto[];
  nextCursor?: number;
};

type ActivityListProps = {
  data?: InfiniteData<ActivitiesPage>;
  isLoading: boolean;
  isFetchingNextPage: boolean;
  observerRef: React.RefObject<HTMLDivElement | null>;
  onDelete: () => void;
};

export default function ActivityList({
  data,
  isLoading,
  isFetchingNextPage,
  observerRef,
  onDelete,
}: ActivityListProps) {
  const isEmpty = !data?.pages[0]?.activities.length;

  if (isLoading) {
    return <MypageListSkeleton variant='activity' count={5} />;
  }

  if (isEmpty) {
    return <EmptyState mainText='체험이 없습니다.' type='experience' />;
  }

  return (
    <>
      <ul>
        {data.pages.map((page) =>
          page.activities.map((activity: any) => (
            <li key={activity.id} className='mt-20 sm:mt-24'>
              <ExperienceCard {...activity} onDelete={onDelete} />
            </li>
          ))
        )}
      </ul>

      <div ref={observerRef} className='h-10' />

      {isFetchingNextPage && <MypageListSkeleton variant='activity' count={2} />}
    </>
  );
}
