'use client';

import Icons from '@/assets/icons';
import {
  ActionDropdown,
  ActionDropdownContent,
  ActionDropdownItem,
  ActionDropdownTrigger,
} from '@/shared/components/dropdown/action';
import Title from '@/shared/components/title/Title';

/**
 * 체험 타이틀 컴포넌트의 Props
 * @property {string} category - 체험 카테고리
 * @property {string} title - 체험 제목
 * @property {number} rating - 평점 (별점)
 * @property {number} reviewCount - 리뷰 개수
 * @property {string} address - 체험 장소 주소
 */
interface ActivityTitleProps {
  category: string;
  title: string;
  rating: number;
  reviewCount: number;
  address: string;
}

/**
 * 체험 타이틀 표시 컴포넌트
 *
 * 체험의 카테고리, 제목, 평점, 리뷰 수, 주소 정보를 표시하며,
 * 공유 기능(카카오톡 공유, URL 복사)을 제공하는 드롭다운 메뉴를 포함합니다.
 *
 * @description
 * 컴포넌트는 다음과 같은 정보를 표시합니다:
 * - 카테고리: 상단에 작은 텍스트로 표시
 * - 제목: 반응형 크기의 h2 헤딩으로 표시
 * - 평점 및 리뷰 수: 별 아이콘과 함께 표시
 * - 주소: 위치 아이콘과 함께 표시
 * - 공유 메뉴: 우측 상단의 공유 버튼을 통해 접근
 *
 * @param {ActivityTitleProps} props - 컴포넌트 props
 * @returns {JSX.Element} 렌더링된 체험 상세 타이틀 영역
 *
 * @example
 * ```tsx
 * <ActivityTitle
 *   category="문화 · 예술"
 *   title="한강 서울 야경 투어"
 *   rating={4.5}
 *   reviewCount={128}
 *   address="서울시 용산구 이촌동"
 * />
 * ```
 */
export default function ActivityTitle({
  category,
  title,
  rating,
  reviewCount,
  address,
}: ActivityTitleProps) {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <span className='body-13 text-gray-700 sm:body-14'>{category}</span>
        <ActionDropdown>
          <ActionDropdownTrigger aria-label='공유 메뉴 열기'>
            <Icons.Share className='h-24 w-24 text-gray-950' />
          </ActionDropdownTrigger>

          <ActionDropdownContent className='-left-88'>
            <ActionDropdownItem onClick={() => console.log('카카오톡 공유')}>
              카카오톡 공유
            </ActionDropdownItem>
            <ActionDropdownItem onClick={() => console.log('URL 복사')}>
              URL 복사
            </ActionDropdownItem>
          </ActionDropdownContent>
        </ActionDropdown>
      </div>
      <div className='flex flex-col gap-8 sm:gap-17'>
        <Title as='h2' responsive='md' className='text-gray-950'>
          {title}
        </Title>
        <div className='flex flex-col gap-10 body-14 text-gray-700'>
          <div className='flex items-center gap-6'>
            <Icons.Star className='h-16 w-16 text-yellow-500' />
            <span>
              {rating} ({reviewCount})
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Icons.Location className='h-16 w-16 text-gray-700' />
            <span>{address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
