import ReservationList from '@/features/mypage/reservation-status/components/panel/ReservationList';
import ReservationItemSkeleton from '@/features/mypage/reservation-status/components/skeleton/ReservationItemSkeleton';
import { useReservationTabContent } from '@/features/mypage/reservation-status/hooks/useReservationTabContent';
import { ActivityReservationStatus } from '@/shared/types/myActivities';

/**
 * 예약 탭 컨텐츠 컴포넌트의 Props 타입
 *
 * @property {string} activityId - 체험 ID
 * @property {string} scheduleId - 스케줄 ID
 * @property {string} date - 예약 날짜 (yyyy-MM-dd 형식)
 * @property {ActivityReservationStatus} currentTab - 현재 선택된 탭 상태
 */
interface ReservationTabContentProps {
  activityId: string;
  scheduleId: string;
  date: string;
  currentTab: ActivityReservationStatus;
}

/**
 * 예약 상태별 탭 컨텐츠 컴포넌트
 *
 * 단일 탭의 예약 내역을 표시합니다.
 * 무한 스크롤을 지원하며, 데이터 로딩 중에는 스켈레톤을 표시합니다.
 *
 * @param {ReservationTabContentProps} props - 컴포넌트 Props
 * @returns 예약 상태별 탭 컨텐츠 컴포넌트
 *
 * @example
 * ```tsx
 * <TabsContent value={ReservationStatus.Pending}>
 *   <ReservationTabContent
 *     activityId="123"
 *     scheduleId="456"
 *     date="2024-01-15"
 *     currentTab={ReservationStatus.Pending}
 *   />
 * </TabsContent>
 * ```
 */
export default function ReservationTabContent({
  activityId,
  scheduleId,
  date,
  currentTab,
}: ReservationTabContentProps) {
  const { reservations, isPending, hasNextPage, isFetchingNextPage, observerRef } =
    useReservationTabContent({
      activityId,
      scheduleId,
      currentTab,
    });

  // 초기 로딩 중
  if (isPending) {
    return <ReservationItemSkeleton />;
  }

  // 예약 내역이 없는 경우
  if (reservations.length === 0) {
    return (
      <div className='flex justify-center py-20 body-14 sm:body-16'>
        <p className='text-gray-500'>예약 내역이 없습니다.</p>
      </div>
    );
  }

  // 예약 내역 목록 표시
  return (
    <>
      <ReservationList
        activityId={Number(activityId)}
        scheduleId={Number(scheduleId)}
        date={date}
        reservations={reservations}
      />
      {/* 무한 스크롤을 위한 옵저버 및 로딩 인디케이터 */}
      {hasNextPage && (
        <div ref={observerRef}>{isFetchingNextPage && <ReservationItemSkeleton />}</div>
      )}
    </>
  );
}
