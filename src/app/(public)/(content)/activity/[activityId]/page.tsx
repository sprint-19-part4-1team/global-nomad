import Link from 'next/link';
import Icons from '@/assets/icons';
import ActivityAdminControls from '@/features/activity-detail/components/ActivityAdminControls';
import ActivityContentTitle from '@/features/activity-detail/components/ActivityContentTitle';
import ActivityImageGrid from '@/features/activity-detail/components/ActivityImageGrid';
import ActivityLocation from '@/features/activity-detail/components/ActivityLocation';
import ActivityNotice from '@/features/activity-detail/components/ActivityNotice';
import ActivityTitle from '@/features/activity-detail/components/ActivityTitle';
import ActivityReservation from '@/features/activity-detail/components/reservation/ActivityReservation';
import ActivityReviewList from '@/features/activity-detail/components/review/ActivityReviewList';
import { ROUTE_PATHS } from '@/features/activity-detail/constants/routePaths';
import { formatRating } from '@/features/activity-detail/utils/formatRating';
import { parseAddress } from '@/features/activity-detail/utils/parseAddress';
import { layoutContainer } from '@/shared/constants/';
import { cn } from '@/shared/utils/cn';

// TODO: API 연동 후 삭제
const DUMMY_ACTIVITY = {
  id: 7,
  userId: 2895,
  title: '함께 배우면 즐거운 스트릿댄스',
  description: '둠칫 둠칫 두둠칫',
  category: '투어',
  price: 10000,
  address: '[06236] 서울 강남구 테헤란로26길 14 | 역삼동, 위워크빌딩',
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

// TODO: API 연동 후 삭제
const DUMMY_REVIEW = {
  averageRating: 4.625,
  totalCount: 8,
  reviews: [
    {
      id: 1,
      user: {
        profileImage: null,
        nickname: '여행러버',
        id: 101,
      },
      activityId: 1,
      rating: 5,
      content:
        '정말 최고의 체험이었어요! 가이드님도 친절하시고 코스도 알차게 구성되어 있어서 너무 만족스러웠습니다.',
      createdAt: '2026-01-09T14:20:00.000Z',
      updatedAt: '2026-01-09T14:20:00.000Z',
    },
    {
      id: 2,
      user: {
        profileImage: null,
        nickname: '모험가',
        id: 102,
      },
      activityId: 1,
      rating: 5,
      content: '가족들과 함께 참여했는데 모두 즐거워했어요. 특히 아이들이 너무 좋아했습니다!',
      createdAt: '2026-01-08T10:15:30.000Z',
      updatedAt: '2026-01-08T10:15:30.000Z',
    },
    {
      id: 3,
      user: {
        profileImage: null,
        nickname: '자연이좋아',
        id: 103,
      },
      activityId: 1,
      rating: 4,
      content: '전반적으로 만족스러웠습니다. 시간이 조금 짧았지만 충분히 즐길 수 있었어요.',
      createdAt: '2026-01-07T16:45:22.000Z',
      updatedAt: '2026-01-07T16:45:22.000Z',
    },
    {
      id: 4,
      user: {
        profileImage: null,
        nickname: '힐링중',
        id: 104,
      },
      activityId: 1,
      rating: 5,
      content:
        '스트레스가 완전히 풀렸어요. 경치도 아름답고 프로그램도 알차서 재충전하기 딱 좋았습니다.',
      createdAt: '2026-01-06T09:30:15.000Z',
      updatedAt: '2026-01-06T09:30:15.000Z',
    },
    {
      id: 5,
      user: {
        profileImage: null,
        nickname: '액티비티마니아',
        id: 105,
      },
      activityId: 1,
      rating: 5,
      content: '기대 이상이었어요! 사진도 많이 찍고 추억도 많이 만들었습니다. 강추합니다!',
      createdAt: '2026-01-05T13:20:40.000Z',
      updatedAt: '2026-01-05T13:20:40.000Z',
    },
    {
      id: 6,
      user: {
        profileImage: null,
        nickname: '첫체험',
        id: 106,
      },
      activityId: 1,
      rating: 4,
      content:
        '처음 해보는 체험이었는데 생각보다 어렵지 않고 재미있었어요. 초보자에게도 추천합니다.',
      createdAt: '2026-01-04T11:10:25.000Z',
      updatedAt: '2026-01-04T11:10:25.000Z',
    },
    {
      id: 7,
      user: {
        profileImage: null,
        nickname: '주말나들이',
        id: 107,
      },
      activityId: 1,
      rating: 5,
      content: '주말에 가족들과 다녀왔는데 모두 만족했어요. 가성비도 좋고 시설도 깨끗했습니다.',
      createdAt: '2026-01-03T15:55:18.000Z',
      updatedAt: '2026-01-03T15:55:18.000Z',
    },
    {
      id: 8,
      user: {
        profileImage: null,
        nickname: '재방문예정',
        id: 108,
      },
      activityId: 1,
      rating: 4,
      content: '날씨가 좋아서 더 즐거웠던 것 같아요. 다음 시즌에 다시 방문할 계획입니다!',
      createdAt: '2026-01-02T12:40:50.000Z',
      updatedAt: '2026-01-02T12:40:50.000Z',
    },
  ],
};

export default async function ActivityDetail({
  params,
}: {
  params: Promise<{ activityId: string }>;
}) {
  const { activityId } = await params;

  const { userId, category, title, description, price, subImages, reviewCount } = DUMMY_ACTIVITY;

  const address = parseAddress(DUMMY_ACTIVITY.address);
  const rating = formatRating(DUMMY_ACTIVITY.rating);

  return (
    <main
      className={cn(
        layoutContainer({
          maxWidth: 1200,
          paddingX: 'wide',
          paddingTop: 'lg',
        }),
        'flex flex-col gap-16 sm:gap-24 lg:gap-26'
      )}>
      <div className='w-fit'>
        <Link
          href={ROUTE_PATHS.MAIN}
          className='flex gap-4 body-14 font-semibold text-gray-950 hover:text-primary-600 sm:gap-8 sm:body-16'>
          <Icons.ArrowLeft aria-hidden='true' className='h-24 w-24' />
          <span>메인으로</span>
        </Link>
      </div>
      <div className='gap-x-40 lg:grid lg:grid-cols-[1fr_410px]'>
        {/* 이미지 */}
        <ActivityImageGrid subImages={subImages} />

        {/* 제목 */}
        <div className='mt-20 mb-24 sm:mt-24 sm:mb-40 lg:col-start-2 lg:row-span-4 lg:row-start-1 lg:my-0'>
          <ActivityTitle
            category={category}
            title={title}
            address={address}
            rating={rating}
            reviewCount={reviewCount}
          />
          <ActivityAdminControls activityId={Number(activityId)} userId={userId} />
          <ActivityNotice userId={userId} />
          <aside className='hidden lg:block'>
            <ActivityReservation activityId={activityId} userId={userId} price={price} />
          </aside>
        </div>

        {/* 설명 */}
        <div className='flex flex-col gap-8 border-t border-gray-100 py-20 sm:pt-44 sm:pb-40 lg:border-t-0 lg:py-40'>
          <ActivityContentTitle>체험 설명</ActivityContentTitle>
          <div className='mb-20 sm:mb-0'>{description}</div>
        </div>

        {/* 지도 */}
        <ActivityLocation address={address} />

        {/* 후기 */}
        <ActivityReviewList reviewData={DUMMY_REVIEW} />
      </div>
      {/* 모바일: 하단 고정 예약 바 */}
      <div className='lg:hidden'>
        <ActivityReservation activityId={activityId} userId={userId} price={price} />
      </div>
    </main>
  );
}
