import ActivityAdminControls from '@/features/activity-detail/components/ActivityAdminControls';
import ActivityTitle from '@/features/activity-detail/components/ActivityTitle';
import ActivityReservation from '@/features/activity-detail/components/reservation/ActivityReservation';
import { layoutContainer } from '@/shared/constants/';

// TODO: API 연동 후 삭제
const DUMMY_ACTIVITY = {
  id: 7,
  userId: 2895,
  title: '함께 배우면 즐거운 스트릿댄스',
  description: '둠칫 둠칫 두둠칫',
  category: '투어',
  price: 10000,
  address: '서울특별시 강남구 테헤란로 427',
  bannerImageUrl:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/a.png',
  subImages: [
    {
      id: 1,
      imageUrl:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/globalnomad/activity_registration_image/b.png',
    },
  ],
  schedules: [
    {
      id: 1,
      date: '2023-12-01',
      startTime: '12:00',
      endTime: '13:00',
    },
    {
      id: 2,
      date: '2023-12-05',
      startTime: '12:00',
      endTime: '13:00',
    },
  ],
  reviewCount: 5,
  rating: 4.74,
  createdAt: '2023-12-31T21:28:50.589Z',
  updatedAt: '2023-12-31T21:28:50.589Z',
};

export default async function ActivityDetail({
  params,
}: {
  params: Promise<{ activityId: string }>;
}) {
  const { activityId } = await params;

  const { userId, category, title, price, address, reviewCount, rating } = DUMMY_ACTIVITY;

  return (
    <main
      className={layoutContainer({
        maxWidth: 1200,
        paddingX: 'wide',
        paddingTop: 'lg',
      })}>
      <div className='flex flex-col gap-24 lg:flex-row'>
        {/* 왼쪽: 컨텐츠 영역 */}
        <div className='flex-1 lg:w-670' />
      </div>

      <div className='w-full lg:w-410'>
        <ActivityTitle
          category={category}
          title={title}
          rating={rating}
          reviewCount={reviewCount}
          address={address}
        />
        <ActivityAdminControls activityId={Number(activityId)} userId={userId} />

        {/* 오른쪽: 예약 영역 (데스크톱에서만 표시) */}
        <aside className='hidden lg:block lg:w-384'>
          <ActivityReservation activityId={activityId} userId={userId} price={price} />
        </aside>
      </div>

      {/* 모바일: 하단 고정 예약 바 */}
      <div className='lg:hidden'>
        <ActivityReservation activityId={activityId} userId={userId} price={price} />
      </div>
    </main>
  );
}
