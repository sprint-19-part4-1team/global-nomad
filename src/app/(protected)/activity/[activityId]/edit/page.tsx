import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import EditActivityForm from '@/features/activity-form/edit/components/EditActivityForm';
import { prefetchActivityDetail } from '@/features/activity-form/edit/queries/prefetchActivityDetail';
import { validateActivityOwner } from '@/features/activity-form/edit/utils/validateActivityOwner';
import Title from '@/shared/components/title/Title';
import { getQueryClient } from '@/shared/utils/getQueryClient';

export const metadata: Metadata = {
  title: '내 체험 수정',
};

interface ActivityEditProps {
  params: Promise<{ activityId: string }>;
}

export default async function ActivityEdit({ params }: ActivityEditProps) {
  const { activityId } = await params;
  const id = Number(activityId);
  const queryClient = getQueryClient();

  const activity = await prefetchActivityDetail(queryClient, id);

  if (!activity) {
    notFound();
  }

  const isOwner = await validateActivityOwner(activity?.userId);

  if (!isOwner) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Title responsive='md'>내 체험 수정</Title>
      <EditActivityForm activityId={id} />
    </HydrationBoundary>
  );
}
