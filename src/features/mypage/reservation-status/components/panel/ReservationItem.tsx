import { useState } from 'react';
import { ReservationStatusBadge } from '@/features/mypage/common/components/reservation-status-badge/ReservationStatusBadge';
import { useUpdateReservationStatusMutation } from '@/features/mypage/reservation-status/mutations/useReservationStatusMutations';
import Button from '@/shared/components/button/Button';
import { ActivityReservationStatus } from '@/shared/types/myActivities';
import { ReservationStatus } from '@/shared/types/myReservations';

/**
 * 예약 내역 컴포넌트의 Props 타입
 *
 * @property {number} activityId - 체험 ID
 * @property {number} reservationId - 예약 ID
 * @property {string} nickname - 예약자 닉네임
 * @property {number} headCount - 예약 인원 수
 * @property {ActivityReservationStatus} status - 예약 상태
 * @property {number} scheduleId - 스케줄 ID
 * @property {string} date - 예약 날짜 (yyyy-MM-dd 형식)
 * @property {Array<{ id: number; status: ReservationStatus }>} [allReservationsInSchedule] - 동일 스케줄의 모든 예약 목록
 * @property {boolean} [isAnyApproving] - 다른 예약이 승인 처리 중인지 여부
 * @property {(id: number | null) => void} [onApprovingChange] - 승인 처리 상태 변경 콜백
 */
interface ReservationItemProps {
  activityId: number;
  reservationId: number;
  nickname: string;
  headCount: number;
  status: ActivityReservationStatus;
  scheduleId: number;
  date: string;
  allReservationsInSchedule?: Array<{ id: number; status: ReservationStatus }>;
  isAnyApproving?: boolean;
  onApprovingChange?: (id: number | null) => void;
}

/**
 * 예약 정보 필드 스타일 상수
 *
 * 닉네임 및 인원 정보를 표시하는 필드의 스타일을 정의합니다.
 */
const infoFieldStyles = {
  container: 'flex items-center body-14 sm:body-16',
  label: 'font-bold text-gray-500',
  value: 'font-medium',
};

/**
 * 예약 내역 컴포넌트
 *
 * 개별 예약 정보를 표시하고, 예약 상태에 따라
 * 승인/거절 버튼 또는 상태 뱃지를 표시합니다.
 *
 * @description
 * - 신청(Pending) 상태: 승인/거절 버튼 표시
 * - 승인(Confirmed) 또는 거절(Declined) 상태: 상태 뱃지 표시
 * - 승인 시 동일 스케줄의 다른 신청 상태 예약들을 자동으로 거절 처리
 * - 승인 처리 중에는 모든 예약의 승인/거절 버튼 비활성화
 * - 거절 처리 중에는 해당 예약의 승인/거절 버튼만 비활성화 (다른 예약은 활성화 유지)
 * - Promise.allSettled를 사용하여 Race Condition 안전하게 처리
 *
 * @param {ReservationItemProps} props - 컴포넌트 Props
 * @returns 예약 내역 컴포넌트
 *
 * @example
 * ```tsx
 * <ReservationItem
 *   activityId={123}
 *   reservationId={456}
 *   nickname="홍길동"
 *   headCount={3}
 *   status={ReservationStatus.Pending}
 *   scheduleId={789}
 *   date="2024-01-15"
 *   allReservationsInSchedule={[...]}
 *   isAnyApproving={false}
 *   onApprovingChange={setApprovingReservationId}
 * />
 * ```
 */
export default function ReservationItem({
  activityId,
  reservationId,
  nickname,
  headCount,
  status,
  scheduleId,
  date,
  allReservationsInSchedule = [],
  isAnyApproving = false,
  onApprovingChange,
}: ReservationItemProps) {
  const [isDeclining, setIsDeclining] = useState(false);
  const { mutate: updateStatus, mutateAsync: updateStatusAsync } =
    useUpdateReservationStatusMutation();

  /**
   * 예약 승인 처리 함수
   *
   * 현재 예약을 승인 상태로 변경하고,
   * 동일 스케줄의 다른 신청 상태 예약들을 자동으로 거절 처리합니다.
   *
   * 처리 순서
   * 1. 현재 예약을 승인 상태로 변경 (await)
   * 2. 동일 스케줄의 다른 대기 중인 예약들을 필터링
   * 3. Promise.allSettled를 사용하여 모든 거절 요청을 병렬로 처리
   *    - 일부 예약이 이미 처리되어 실패해도 다른 요청은 계속 진행
   *    - "pending이 아닙니다" 에러는 무시 (정상적인 Race Condition)
   * 4. 모든 처리가 완료되면 isProcessing 상태 해제
   *
   * @async
   */
  const handleApprove = async () => {
    // 중복 처리 방지
    if (isAnyApproving) {
      return;
    }

    // 승인 처리 시작 알림
    onApprovingChange?.(reservationId);

    const [year, month] = date.split('-');

    try {
      // 1단계: 현재 예약을 승인 상태로 변경
      await updateStatusAsync({
        activityId,
        reservationId,
        status: ReservationStatus.Confirmed,
        scheduleId,
        date,
        year,
        month,
      });

      // 2단계: 동일 스케줄의 다른 신청 상태 예약 필터링
      const otherPendingReservations = allReservationsInSchedule.filter(
        (r) => r.id !== reservationId && r.status === ReservationStatus.Pending
      );

      // 3단계: 다른 대기 중인 예약들이 있는 경우, 모두 거절 처리
      if (otherPendingReservations.length > 0) {
        // Promise.allSettled를 사용하여 모든 거절 요청을 병렬로 처리
        // 이미 처리된 예약(pending 아님)에 대한 400 에러는 정상적인 상황
        await Promise.allSettled(
          otherPendingReservations.map((reservation) =>
            updateStatusAsync({
              activityId,
              reservationId: reservation.id,
              status: ReservationStatus.Declined,
              scheduleId,
              date,
              year,
              month,
            })
          )
        );
      }
    } catch (error) {
      // 1단계 승인 처리 중 오류 발생 시
      // useUpdateReservationStatusMutation의 onError에서 토스트 메시지 처리됨
      console.error('예약 승인 처리 중 오류 발생:', error);
    } finally {
      // 성공/실패 여부와 관계없이 항상 처리 상태 해제
      onApprovingChange?.(null);
    }
  };

  /**
   * 예약 거절 처리 함수
   *
   * 현재 예약을 거절 상태로 변경합니다.
   */
  const handleDecline = () => {
    // 중복 처리 방지
    if (isDeclining) {
      return;
    }
    setIsDeclining(true);

    const [year, month] = date.split('-');

    updateStatus(
      {
        activityId,
        reservationId,
        status: ReservationStatus.Declined,
        scheduleId,
        date,
        year,
        month,
      },
      {
        // 성공/실패 여부와 관계없이 처리 상태 해제
        onSettled: () => {
          setIsDeclining(false);
        },
      }
    );
  };

  return (
    <div className='flex w-full justify-between rounded-16 border border-gray-100 bg-white p-16'>
      {/* 예약 정보 영역 */}
      <div className='flex flex-col gap-8 sm:gap-10'>
        {/* 닉네임 필드 */}
        <div className={`${infoFieldStyles.container} gap-8`}>
          <span className={infoFieldStyles.label}>닉네임</span>
          <span className={infoFieldStyles.value}>{nickname}</span>
        </div>
        {/* 인원 필드 */}
        <div className={`${infoFieldStyles.container} gap-22`}>
          <span className={infoFieldStyles.label}>인원</span>
          <span className={infoFieldStyles.value}>{headCount}명</span>
        </div>
      </div>

      {/* 액션 버튼 또는 상태 뱃지 영역 */}
      <div className='flex items-center gap-6 sm:gap-8'>
        {status === ReservationStatus.Pending ? (
          <>
            {/* 신청 상태: 승인/거절 버튼 */}
            <Button
              variant='secondary'
              size='sm'
              onClick={handleApprove}
              disabled={isAnyApproving || isDeclining}>
              승인하기
            </Button>
            <Button
              variant='negative'
              size='sm'
              onClick={handleDecline}
              disabled={isDeclining || isAnyApproving}>
              거절하기
            </Button>
          </>
        ) : (
          /* 승인/거절 상태: 상태 뱃지 */
          <ReservationStatusBadge status={status} />
        )}
      </div>
    </div>
  );
}
