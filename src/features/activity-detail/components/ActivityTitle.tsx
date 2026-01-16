'use client';

import Icons from '@/assets/icons';
import { useKakaoShare } from '@/features/activity-detail/hooks/useKakaoShare';
import { copyToClipboard } from '@/features/activity-detail/utils/copyToClipboard';
import { formatRating } from '@/features/activity-detail/utils/formatRating';
import {
  ActionDropdown,
  ActionDropdownContent,
  ActionDropdownItem,
  ActionDropdownTrigger,
} from '@/shared/components/dropdown/action';
import Title from '@/shared/components/title/Title';

/**
 * 체험 타이틀 컴포넌트의 Props
 * @property activityId - 체험ID
 * @property title - 체험 제목
 * @property category - 체험 카테고리
 * @property address - 체험 장소 주소
 * @property bannerImageUrl - 체험 배너 이미지
 * @property reviewCount - 리뷰 개수
 * @property rating - 평점 (별점)
 */
interface ActivityTitleProps {
  activityId: number;
  title: string;
  category: string;
  address: string;
  bannerImageUrl: string;
  reviewCount: number;
  rating: number;
}

/**
 * 체험 타이틀 표시 컴포넌트
 *
 * 체험의 카테고리, 제목, 평점, 리뷰 수, 주소 정보를 표시하며,
 * 공유 기능(카카오톡 공유, URL 복사)을 제공하는 드롭다운 메뉴를 포함합니다.
 *
 * @description
 * 컴포넌트는 다음과 같은 정보를 표시합니다.
 * - 카테고리: 상단에 작은 텍스트로 표시
 * - 제목: 반응형 크기의 h2 헤딩으로 표시
 * - 평점 및 리뷰 수: 별 아이콘과 함께 표시
 * - 주소: 위치 아이콘과 함께 표시
 * - 공유 메뉴: 우측 상단의 공유 버튼을 통해 접근
 *
 * @param props - 컴포넌트 props
 * @returns 렌더링된 체험 상세 타이틀 영역
 *
 * @example
 * ```tsx
 * <ActivityTitle
 *   category="문화 · 예술"
 *   title="한강 서울 야경 투어"
 *   address="서울시 용산구 이촌동"
 *   rating={4.5}
 *   reviewCount={128}
 * />
 * ```
 */
export default function ActivityTitle({
  activityId,
  title,
  category,
  address,
  bannerImageUrl,
  reviewCount,
  rating,
}: ActivityTitleProps) {
  const { shareKakao } = useKakaoShare();

  /** 카카오톡 공유 핸들러 */
  const handleShareKakao = () => {
    shareKakao({
      title,
      imageUrl: bannerImageUrl,
      reviewCount,
      rating: formatRating(rating),
      path: `activity/${activityId}`,
    });
  };

  /** URL 복사 핸들러 */
  const handleUrlCopy = async () => {
    await copyToClipboard(window.location.href, 'URL이 복사되었습니다');
  };

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <span className='body-13 text-gray-700 sm:body-14'>{category}</span>
        <ActionDropdown>
          <ActionDropdownTrigger aria-label='공유 메뉴 열기'>
            <Icons.Share aria-hidden='true' className='h-24 w-24' />
          </ActionDropdownTrigger>

          <ActionDropdownContent className='right-0 left-auto'>
            <ActionDropdownItem onClick={handleShareKakao}>카카오톡 공유</ActionDropdownItem>
            <ActionDropdownItem onClick={handleUrlCopy}>URL 복사</ActionDropdownItem>
          </ActionDropdownContent>
        </ActionDropdown>
      </div>
      <div className='flex flex-col gap-8 sm:gap-17'>
        <Title as='h2' responsive='md'>
          {title}
        </Title>
        <div className='flex flex-col gap-10 body-14 text-gray-700'>
          <div className='flex items-center gap-6'>
            <Icons.Star aria-hidden='true' className='h-16 w-16 text-yellow-500' />
            <span>
              {rating} ({reviewCount})
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Icons.Location aria-hidden='true' className='h-16 w-16 text-gray-700' />
            <span>{address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
