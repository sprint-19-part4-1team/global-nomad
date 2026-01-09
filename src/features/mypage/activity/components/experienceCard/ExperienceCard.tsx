import Image from 'next/image';
import Icons from '@/assets/icons';
import { useActivityDelete } from '@/features/mypage/activity/hooks/useActivityDelete';
import Button from '@/shared/components/button/Button';
import Dialog from '@/shared/components/overlay/dialog/Dialog';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';
import RoundBox from '@/shared/components/round-box/RoundBox';
import { ActivityBasicDto } from '@/shared/types/activities';
import { formatValue } from '@/shared/utils/formatValue';

export type ActivitySummaryDto = Pick<
  ActivityBasicDto,
  'id' | 'title' | 'price' | 'rating' | 'reviewCount' | 'bannerImageUrl'
>;

/**
 * 활동 요약 정보를 카드 형태로 표시하기 위한 타입 및 컴포넌트
 *
 * @description
 * - 마이페이지 / 활동 관리 목록에서 사용되는 카드 UI
 * - `ActivityBasicDto` 중 카드 렌더링에 필요한 필드만 선별하여 사용
 * - 좌측에는 제목, 평점, 가격, 액션 버튼을 배치
 * - 우측에는 활동을 대표하는 배너 이미지를 표시
 * - 제목은 한 줄 말줄임 처리
 * - 수정/삭제와 같은 액션 처리를 위해 활동의 고유 id를 포함
 *
 * @property id - 활동을 식별하기 위한 고유 ID (수정 페이지 이동 등 액션에 사용)
 * @property title - 활동 제목
 * @property price - 1인 기준 가격
 * @property rating - 평균 평점
 * @property reviewCount - 리뷰 개수
 * @property bannerImageUrl - 카드 우측에 노출되는 배너 이미지 URL
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
 *   onDelete={onDelete}
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
  onDelete,
}: ActivitySummaryDto & { onDelete: () => void }) {
  const { showDeleteConfirm } = useActivityDelete(onDelete);

  const handleClickDelete = (id: number) => {
    showDeleteConfirm(id, (onConfirm) => (
      <Dialog
        message='체험을 삭제하시겠습니까?'
        cancelLabel='취소하기'
        confirmLabel='삭제하기'
        variant='confirm'
        onCancel={overlayStore.pop}
        onConfirm={onConfirm}
      />
    ));
  };

  return (
    <RoundBox className='flex w-full justify-between gap-24 bg-white px-16 py-24 shadow-card sm:px-20 sm:py-28 md:px-24 md:py-32'>
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
          <Button size='sm' href={`/activity/${id}/edit`} variant='secondary'>
            수정하기
          </Button>
          <Button size='sm' variant='negative' onClick={() => handleClickDelete(id)}>
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
