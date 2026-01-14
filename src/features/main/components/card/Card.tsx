import Image from 'next/image';
import Link from 'next/link';
import Icons from '@/assets/icons';
import { ActivityBasicDto } from '@/shared/types/activities';
import { formatValue } from '@/shared/utils/formatValue';

export type ActivitySummaryDto = Pick<
  ActivityBasicDto,
  'id' | 'title' | 'price' | 'rating' | 'reviewCount' | 'bannerImageUrl'
>;

/**
 * 액티비티 요약 카드 컴포넌트
 *
 * @description
 * 액티비티 목록 화면에서 사용되는 카드 UI 컴포넌트.
 * 배너 이미지, 제목, 평점/리뷰 수, 가격 정보를 표시하며
 * 클릭 시 해당 액티비티의 상세 페이지로 이동한다.
 *
 * Next.js `Link`를 사용해 CSR 기반 페이지 전환을 지원한다.
 *
 * @param props - 액티비티 카드에 표시할 데이터
 * @param props.id - 액티비티 고유 ID (상세 페이지 경로 생성에 사용)
 * @param props.bannerImageUrl - 카드 배너 이미지 URL
 * @param props.title - 액티비티 제목
 * @param props.rating - 평균 평점
 * @param props.reviewCount - 리뷰 개수
 * @param props.price - 1인 기준 가격
 *
 * @example
 * ```tsx
 * <Card
 *   id={1}
 *   bannerImageUrl="/images/activity.jpg"
 *   title="제주 서핑 클래스"
 *   rating={4.8}
 *   reviewCount={120}
 *   price={35000}
 * />
 * ```
 */

export default function Card({
  id,
  bannerImageUrl,
  title,
  rating,
  reviewCount,
  price,
}: ActivitySummaryDto) {
  return (
    <Link
      href={`/activity/${id}`}
      title={title}
      className='group relative block overflow-hidden rounded-18 shadow-card sm:rounded-32'>
      <div className='relative min-h-242 rounded-18 sm:min-h-423 sm:rounded-32 md:min-h-366'>
        <Image
          src={bannerImageUrl}
          fill
          alt={title}
          className='h-3/4! object-cover transition-transform duration-300 group-hover:scale-150'
          sizes='(min-width: 1024px) 262px, (min-width: 768px) 331px, 328px '
        />
      </div>
      <div className='absolute bottom-0 w-full rounded-18 bg-white px-17 py-16 sm:rounded-32 sm:px-30 sm:py-20'>
        <strong className='transition-color block truncate body-14 font-semibold text-gray-950 duration-300 group-hover:text-primary-600 sm:body-18'>
          {title}
        </strong>
        <div className='mt-2 flex items-center body-13 text-gray-500 sm:body-14'>
          <Icons.Star className='h-12 w-12 text-yellow-500 sm:h-20 sm:w-20' />
          <span
            className='ml-4 inline-block font-medium text-gray-950'
            aria-label={`평점 ${rating}점`}>
            {rating}
          </span>
          <span className='ml-2 inline-block' aria-label={`리뷰 ${reviewCount}개`}>
            ({reviewCount})
          </span>
        </div>
        <div className='mt-8 body-13 font-medium text-gray-400 sm:mt-16 sm:body-16'>
          <strong className='mr-4 inline-block body-14 font-bold text-gray-950 sm:body-18'>
            ₩ {formatValue(price)}
          </strong>
          / 인
        </div>
      </div>
    </Link>
  );
}
