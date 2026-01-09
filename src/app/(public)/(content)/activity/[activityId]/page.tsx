import { layoutContainer } from '@/shared/constants/';

export default async function ActivityDetail({
  params,
}: {
  params: Promise<{ activityId: string }>;
}) {
  const { activityId } = await params;

  return (
    <main
      className={layoutContainer({
        maxWidth: 1200,
        paddingX: 'wide',
        paddingTop: 'lg',
      })}>
      activityId : {activityId}
    </main>
  );
}
