import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icons from '@/assets/icons';
import ActivityContentTitle from '@/features/activity-detail/components/ActivityContentTitle';
import ActivityImageGrid from '@/features/activity-detail/components/ActivityImageGrid';
import ActivityLocation from '@/features/activity-detail/components/ActivityLocation';
import ActivityNotice from '@/features/activity-detail/components/ActivityNotice';
import ActivityTitle from '@/features/activity-detail/components/ActivityTitle';
import ActivityAdminControls from '@/features/activity-detail/components/admin-controls/ActivityAdminControls';
import ActivityReservation from '@/features/activity-detail/components/reservation/ActivityReservation';
import ActivityReviewList from '@/features/activity-detail/components/review/ActivityReviewList';
import { ROUTE_PATHS } from '@/features/activity-detail/constants/routePaths';
import { formatRating } from '@/features/activity-detail/utils/formatRating';
import { parseAddress } from '@/features/activity-detail/utils/parseAddress';
import { getActivityDetail } from '@/shared/apis/feature/activities';
import { layoutContainer } from '@/shared/constants/';
import { cn } from '@/shared/utils/cn';

/**
 * 체험 상세 페이지 params 타입
 *
 * @property params.activityId - 체험 ID
 */
type ActivityDetailParams = {
  params: Promise<{ activityId: string }>;
};

/**
 * 체험 상세 페이지의 메타데이터를 생성
 *
 * SEO 최적화 및 소셜 미디어 공유를 위해 체험 정보를 기반으로 동적 메타데이터를 설정합니다.
 *
 * @param params.activityId - 조회할 체험 ID
 * @returns 페이지 메타데이터 (title, description, openGraph)
 */
export async function generateMetadata({ params }: ActivityDetailParams): Promise<Metadata> {
  const { activityId } = await params;
  try {
    const activity = await getActivityDetail(Number(activityId));

    return {
      title: activity.title,
      description: activity.description,
      openGraph: {
        title: activity.title,
        description: activity.description,
        images: activity.bannerImageUrl,
      },
    };
  } catch {
    return {
      title: '페이지를 찾을 수 없습니다',
      description: '요청하신 체험을 찾을 수 없습니다.',
    };
  }
}

export default async function ActivityDetail({ params }: ActivityDetailParams) {
  const { activityId: activityIdString } = await params;
  const activityId = Number(activityIdString);

  let activity;
  try {
    // 체험 상세 조회
    activity = await getActivityDetail(Number(activityId));
  } catch {
    notFound();
  }

  const { userId, category, title, description, price, bannerImageUrl, subImages, reviewCount } =
    activity;
  const address = parseAddress(activity.address);
  const rating = formatRating(activity.rating);

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
            title={title}
            description={description}
            category={category}
            address={address}
            bannerImageUrl={bannerImageUrl}
            reviewCount={reviewCount}
            rating={rating}
          />
          <ActivityAdminControls activityId={activityId} userId={userId} />
          <ActivityNotice userId={userId} />
          <aside className='hidden lg:block'>
            <ActivityReservation activityId={activityId} userId={userId} price={price} />
          </aside>
        </div>

        {/* 설명 */}
        <div className='flex flex-col gap-8 border-t border-gray-100 py-20 sm:pt-44 sm:pb-40 lg:border-t-0 lg:py-40'>
          <ActivityContentTitle>체험 설명</ActivityContentTitle>
          <div className='mb-20 whitespace-pre-wrap sm:mb-0'>{description}</div>
        </div>

        {/* 지도 */}
        <ActivityLocation address={address} />

        {/* 후기 */}
        <ActivityReviewList activityId={activityId} />
      </div>
      {/* 모바일: 하단 고정 예약 바 */}
      <div className='lg:hidden'>
        <ActivityReservation activityId={activityId} userId={userId} price={price} />
      </div>
    </main>
  );
}
