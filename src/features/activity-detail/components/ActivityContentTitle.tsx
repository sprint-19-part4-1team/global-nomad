import { PropsWithChildren } from 'react';

/**
 * 체험 상세 페이지 컨텐츠 영역 타이틀 컴포넌트
 *
 * 체험 상세 페이지 내의 각 섹션(체험 설명, 예약 정보, 리뷰 등)을
 * 구분하는 제목을 표시하는 컴포넌트입니다.
 *
 * @returns 렌더링된 체험 상세 페이지 컨텐츠 타이틀
 *
 * @example
 * ```tsx
 * <ActivityContentTitle>체험 설명</ActivityContentTitle>
 * ```
 */
export default function ActivityContentTitle({ children }: PropsWithChildren) {
  return <h3 className='body-16 font-bold sm:heading-18'>{children}</h3>;
}
