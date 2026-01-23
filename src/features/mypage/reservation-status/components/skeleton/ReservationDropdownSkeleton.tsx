import Skeleton from '@/shared/components/skeleton/Skeleton';

/**
 * 예약 현황 드롭다운의 로딩 스켈레톤 컴포넌트
 *
 * @description
 * - 예약 현황 페이지의 드롭다운 선택기 로딩 상태를 표시합니다.
 * - 반응형 높이를 적용하여 다양한 화면 크기에 대응합니다 (모바일: 50px, 데스크톱: 54px).
 * - 실제 드롭다운 컴포넌트와 동일한 크기로 레이아웃 시프트를 방지합니다.
 *
 * @returns 드롭다운 형태의 스켈레톤 컴포넌트
 *
 * @example
 * ```tsx
 * {isLoadingActivities ? (
 *   <ReservationDropdownSkeleton />
 * ) : (
 *   <ActivityDropdown />
 * )}
 * ```
 */
export default function ReservationDropdownSkeleton() {
  return <Skeleton className='h-56 w-full rounded-16' />;
}
