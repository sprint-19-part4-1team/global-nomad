import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { KeyboardEvent, MouseEvent } from 'react';
import Icons from '@/assets/icons';
import Button from '@/shared/components/button/Button';
import ActivityDeleteDialog from '@/shared/components/overlay/dialog/variants/ActivityDeleteDialog';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';
import RoundBox from '@/shared/components/round-box/RoundBox';
import { ActivityBasicDto } from '@/shared/types/activities';
import { formatValue } from '@/shared/utils/formatValue';

export type ActivitySummaryDto = Pick<
  ActivityBasicDto,
  'id' | 'title' | 'price' | 'rating' | 'reviewCount' | 'bannerImageUrl'
>;

/**
 * ## ExperienceCard
 *
 * @description
 * - 마이페이지 / 활동 관리 목록에서 사용되는 활동 요약 카드 컴포넌트입니다.
 * - 활동의 핵심 정보(제목, 평점, 가격)를 카드 형태로 요약하여 표시합니다.
 * - 카드 전체를 클릭하거나 Enter / Space 키를 통해
 *   활동 상세 페이지로 이동할 수 있습니다.
 *
 * @remarks
 * - 수정 / 삭제 버튼은 카드 내부 액션으로 제공되며,
 *   삭제 시에는 확인 다이얼로그(`ActivityDeleteDialog`)를 오버레이로 표시합니다.
 * - 카드 우측에는 활동을 대표하는 배너 이미지를 표시합니다.
 * - 접근성을 위해 `role="button"`과 키보드 이벤트를 처리합니다.
 *
 * @params id - 활동을 식별하기 위한 고유 ID (상세/수정/삭제 액션에 사용)
 * @params title - 활동 제목 (한 줄 말줄임 처리)
 * @params price - 1인 기준 가격
 * @params rating - 평균 평점
 * @params reviewCount - 리뷰 개수
 * @params bannerImageUrl - 카드 우측에 노출되는 배너 이미지 URL
 *
 * @example
 * ```tsx
 * <ExperienceCard
 *   id={1}
 *   title="서핑 원데이 클래스"
 *   price={50000}
 *   rating={4.8}
 *   reviewCount={128}
 *   bannerImageUrl="/images/surfing.jpg"
 * />
 * ```
 */
export default function ExperienceCard({
  id,
  title,
  price,
  rating,
  reviewCount,
  bannerImageUrl,
}: ActivitySummaryDto) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/activity/${id}`);
  };

  const handleDeleteClick = (e: MouseEvent) => {
    e.stopPropagation();
    overlayStore.push(<ActivityDeleteDialog activityId={id} />);
  };

  const handleEditClick = (e: MouseEvent) => {
    e.stopPropagation();
    router.push(`/activity/${id}/edit`);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.currentTarget !== e.target) {
      return;
    }

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };

  return (
    <RoundBox
      role='button'
      tabIndex={0}
      aria-label={`${title} 상세 페이지로 이동`}
      onKeyDown={handleKeyDown}
      className='flex w-full cursor-pointer justify-between gap-24 bg-white px-16 py-24 shadow-card sm:px-20 sm:py-28 md:px-24 md:py-32'
      onClick={handleCardClick}>
      <div className='min-w-0 flex-1'>
        <strong className='block truncate body-14 text-gray-950 sm:body-16 md:body-18'>
          {title}
        </strong>
        <div className='mt-4 flex body-13 text-gray-500 sm:mt-8 sm:body-14 md:body-16'>
          <Icons.Star className='w-16 text-yellow-500' />
          <span className='ml-4 inline-block font-medium' aria-label={`평점 ${rating}점`}>
            {rating}
          </span>
          <span className='ml-2 inline-block' aria-label={`리뷰 ${reviewCount}개`}>
            ({reviewCount})
          </span>
        </div>
        <div className='mt-8 body-13 font-medium text-gray-400 sm:body-14 md:mt-12 md:body-16'>
          <strong className='mr-4 inline-block body-14 font-bold text-gray-950 sm:body-16 md:body-18'>
            ₩ {formatValue(price)}
          </strong>
          / 인
        </div>
        <div className='mt-12 flex gap-8 sm:mt-16 md:mt-20'>
          <Button size='sm' variant='secondary' onClick={handleEditClick}>
            수정하기
          </Button>
          <Button size='sm' variant='negative' onClick={handleDeleteClick}>
            삭제하기
          </Button>
        </div>
      </div>
      <div className='relative h-72 w-72 shrink-0 overflow-hidden rounded-16 sm:h-140 sm:w-140 sm:rounded-24 md:h-152 md:w-152'>
        <Image
          src={bannerImageUrl}
          alt={title}
          fill
          sizes='(min-width: 768px) 152px, (min-width: 640px) 140px, 72px'
          className='object-cover'
        />
      </div>
    </RoundBox>
  );
}
