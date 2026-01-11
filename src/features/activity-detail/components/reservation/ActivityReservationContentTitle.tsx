import { PropsWithChildren } from 'react';

/**
 * 체험 상세 페이지 예약 영역의 타이틀 컴포넌트
 *
 * 체험 예약 섹션 내에서 각 항목의 제목을 표시하는 컴포넌트입니다.
 *
 * @param {PropsWithChildren} props - 컴포넌트 props
 * @param {React.ReactNode} props.children - 표시할 제목 텍스트
 * @returns {JSX.Element} 렌더링된 체험 상세 페이지 예약 영역 타이틀
 *
 * @example
 * ```tsx
 * <ActivityReservationContentTitle>
 *   예약 날짜
 * </ActivityReservationContentTitle>
 * ```
 */
export default function ActivityReservationContentTitle({ children }: PropsWithChildren) {
  return <h5 className='body-16 font-bold text-gray-950'>{children}</h5>;
}
