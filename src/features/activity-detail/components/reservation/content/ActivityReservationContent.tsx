'use client';

import { startOfMonth } from 'date-fns';
import { useState } from 'react';
import Icons from '@/assets/icons';
import ActivityReservationDateTimeSection from '@/features/activity-detail/components/reservation/content/ActivityReservationDateTimeSection';
import ActivityReservationHeadCounter from '@/features/activity-detail/components/reservation/content/ActivityReservationHeadCounter';
import useReservationState from '@/features/activity-detail/hooks/useReservationState';
import { useActivitySchedules } from '@/features/activity-detail/queries/useActivitySchedules';
import {
  formatDateTimeForDisplay,
  getSchedulesByDate,
} from '@/features/activity-detail/utils/reservationDateUtils';
import Button from '@/shared/components/button/Button';
import Skeleton from '@/shared/components/skeleton/Skeleton';
import Title from '@/shared/components/title/Title';
import { CreateReservationBodyDto } from '@/shared/types/activities';
import { formatDateToString } from '@/shared/utils/dateUtil';
import { formatValue } from '@/shared/utils/formatValue';

/**
 * 체험 예약 콘텐츠 컴포넌트의 Props
 *
 * @property {number} activityId - 체험 ID
 * @property {number} price - 1인당 체험 가격
 * @property {() => void} [onClose] - 바텀시트 닫기 핸들러 (바텀시트 모드에서만 사용)
 * @property {(info: CreateReservationBodyDto & { dateTime: string }) => void} [onConfirm] - 바텀시트 확인 핸들러 (바텀시트 모드에서만 사용)
 * @property {(info: CreateReservationBodyDto) => void | Promise<void>} [onReservation] - 데스크톱 예약 버튼 핸들러 (데스크톱 모드에서만 사용)
 * @property {boolean} [isBottomSheet] - 바텀시트 모드 여부 (기본값: false)
 */
interface ActivityReservationContentProps {
  activityId: number;
  price: number;
  onClose?: () => void;
  onConfirm?: (info: CreateReservationBodyDto & { dateTime: string }) => void;
  onReservation?: (info: CreateReservationBodyDto) => void | Promise<void>;
  isBottomSheet?: boolean;
}

/**
 * 체험 예약 콘텐츠 컴포넌트
 *
 * 체험 예약을 위한 날짜, 시간, 인원 선택 UI를 제공하며,
 * 데스크톱과 모바일(바텀시트) 환경에서 다른 레이아웃으로 동작합니다.
 * 각 컴포넌트가 자체적으로 스케줄 데이터를 조회하여 월 변경 시 즉시 반영됩니다.
 *
 * @description
 * 컴포넌트는 다음과 같은 기능을 제공합니다.
 * - 날짜/시간 선택: 예약 가능한 날짜와 시간대 선택
 * - 인원 선택: 참여 인원 수 증가/감소
 * - 총 금액 계산: 선택한 인원 수에 따른 총 금액 자동 계산
 * - 반응형 UI: 데스크톱과 바텀시트 모드에 따라 다른 레이아웃
 * - 바텀시트 2단계 플로우: 날짜/시간 선택 → 인원 선택
 * - 유효성 검증: 필수 정보가 모두 선택되어야 예약 가능
 * - 뒤로가기 기능: 바텀시트에서 인원 선택 단계에서 날짜/시간 선택으로 복귀
 * - 자체 데이터 조회: 내부에서 스케줄 데이터를 조회하여 월 변경 시 즉시 새 데이터 반영
 * - 월 변경 시 자동 초기화: 달력 월이 변경되면 선택 상태 자동 초기화
 * - 예약 성공 시 초기화: 데스크톱 모드에서 예약 성공 시 모든 상태를 초기값으로 리셋
 *
 * 데스크톱 모드에서는 모든 옵션이 한 화면에 표시되며,
 * 바텀시트 모드에서는 날짜/시간 선택과 인원 선택이 단계별로 표시됩니다.
 *
 * @param {ActivityReservationContentProps} props - 컴포넌트 props
 * @returns {JSX.Element} 렌더링된 예약 콘텐츠
 *
 * @example
 * ```tsx
 * // 데스크톱 모드
 * <ActivityReservationContent
 *   activityId={123}
 *   price={50000}
 *   onReservation={async (info) => {
 *     await createReservation(info);
 *   }}
 *   isBottomSheet={false}
 * />
 *
 * // 바텀시트 모드
 * <ActivityReservationContent
 *   activityId={123}
 *   price={50000}
 *   onClose={() => overlayStore.pop()}
 *   onConfirm={(info) => {
 *     setReservationInfo(info);
 *     overlayStore.pop();
 *   }}
 *   isBottomSheet={true}
 * />
 * ```
 */
export default function ActivityReservationContent({
  activityId,
  price,
  onClose,
  onConfirm,
  onReservation,
  isBottomSheet = false,
}: ActivityReservationContentProps) {
  // 현재 달력에 표시 중인 월
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));

  // 체험의 예약 가능일 조회
  const {
    data: schedules,
    isLoading,
    isError,
  } = useActivitySchedules({ activityId, currentMonth });

  // 커스텀 훅으로 모든 상태 관리 (currentMonth를 전달하여 월 변경 시 자동 초기화)
  const reservation = useReservationState(currentMonth);

  const totalPrice = price * reservation.participantCount;

  // 선택된 시간 정보 찾기
  const schedulesByDate = getSchedulesByDate(schedules || []);
  const availableTimes = reservation.selectedDate
    ? schedulesByDate[formatDateToString(reservation.selectedDate)] || []
    : [];

  const selectedTimeInfo = availableTimes.find((t) => t.id === reservation.selectedScheduleId);
  const selectedDateTime = formatDateTimeForDisplay(reservation.selectedDate, selectedTimeInfo);

  // 바텀시트에서 날짜/시간 선택이 완료되면 해당 영역 숨김
  const showDateTimeSection = isBottomSheet ? !reservation.showParticipantSection : true;

  /** 확인 버튼 핸들러 (바텀시트 - 날짜/시간 선택 단계) */
  const handleDateTimeConfirm = () => {
    if (!reservation.isDateTimeValid) {
      return;
    }
    reservation.setShowParticipantSection(true);
  };

  /** 확인 버튼 핸들러 (바텀시트 - 인원 선택 단계) */
  const handleFinalConfirm = () => {
    if (!reservation.isValid || !reservation.selectedScheduleId) {
      return;
    }

    if (onConfirm) {
      onConfirm({
        scheduleId: reservation.selectedScheduleId,
        headCount: reservation.participantCount,
        dateTime: selectedDateTime,
      });
    }
  };

  /** 예약하기 버튼 핸들러 (데스크톱) */
  const handleReservation = async () => {
    if (!reservation.isValid || !reservation.selectedScheduleId) {
      return;
    }

    if (onReservation) {
      await onReservation({
        scheduleId: reservation.selectedScheduleId,
        headCount: reservation.participantCount,
      });

      // 예약 성공 시 모든 상태 초기화
      setCurrentMonth(startOfMonth(new Date()));
    }
  };

  return (
    <div className='flex flex-col gap-30 rounded-t-24 bg-white p-24 pb-18 shadow-card lg:rounded-b-24 lg:border lg:border-gray-100 lg:p-30 lg:pb-30'>
      <div className='flex flex-col gap-8 lg:gap-24'>
        {/* 헤더 - 바텀시트에서만 표시 */}
        {isBottomSheet && onClose && (
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-8'>
              {reservation.showParticipantSection && (
                <button
                  onClick={reservation.handleBack}
                  aria-label='뒤로가기'
                  className='h-24 w-24 text-gray-900'>
                  <Icons.ArrowLeft aria-hidden='true' />
                </button>
              )}
              <Title as='h4' size='18'>
                {reservation.showParticipantSection ? <>인원</> : <>날짜</>}
              </Title>
            </div>
            <button
              onClick={onClose}
              aria-label='예약 패널 닫기'
              className='h-24 w-24 text-gray-900'>
              <Icons.Close aria-hidden='true' />
            </button>
          </div>
        )}

        {/* 헤더 - 데스크톱에서만 표시 */}
        {!isBottomSheet && (
          <div className='flex items-center gap-5'>
            <Title as='h4' size='24' className='tracking-[-0.6px] text-gray-950'>
              ₩ {formatValue(price)}
            </Title>
            <Title as='h4' size='20' className='tracking-[-0.5px] text-gray-600'>
              / 인
            </Title>
          </div>
        )}

        {/* 날짜 & 시간 선택 영역 */}
        {showDateTimeSection && (
          <>
            {isLoading ? (
              <Skeleton className='h-396 sm:h-300 lg:h-428' />
            ) : isError ? (
              <div className='mx-auto mb-10 body-16 font-medium tracking-[-0.4px] text-gray-400'>
                예약 가능일을 불러오는 데 실패했습니다.
              </div>
            ) : (
              <ActivityReservationDateTimeSection
                selectedDate={reservation.selectedDate}
                onDateSelect={reservation.handleDateSelect}
                selectedScheduleId={reservation.selectedScheduleId}
                onScheduleSelect={reservation.setSelectedScheduleId}
                schedules={schedules || []}
                currentMonth={currentMonth}
                onMonthChange={setCurrentMonth}
                isBottomSheet={isBottomSheet}
              />
            )}
          </>
        )}

        {/* 인원 선택 영역 */}
        {(reservation.showParticipantSection || !isBottomSheet) && (
          <div className='flex flex-col gap-20'>
            {isBottomSheet && (
              <div className='body-16 font-medium text-gray-700'>예약할 인원을 선택해주세요.</div>
            )}
            {/* 참가 인원 */}
            <ActivityReservationHeadCounter
              count={reservation.participantCount}
              onCountChange={reservation.setParticipantCount}
            />

            {/* 버튼 - 데스크톱에서만 표시 */}
            {!isBottomSheet && (
              <div className='flex items-center justify-between border-t border-gray-100 py-10 pt-20'>
                <div className='flex gap-6'>
                  <Title as='h5' size='20' className='tracking-[-0.5px] text-gray-600'>
                    총 합계
                  </Title>
                  <Title as='h5' size='20' className='tracking-[-0.5px] text-gray-950'>
                    ₩ {totalPrice.toLocaleString()}
                  </Title>
                </div>
                <Button
                  size='lg'
                  onClick={handleReservation}
                  disabled={!reservation.isValid}
                  className='py-14'>
                  예약하기
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 버튼 - 바텀시트에서는 항상 표시 */}
      {isBottomSheet && (
        <Button
          full
          onClick={reservation.showParticipantSection ? handleFinalConfirm : handleDateTimeConfirm}
          disabled={
            reservation.showParticipantSection ? !reservation.isValid : !reservation.isDateTimeValid
          }>
          확인
        </Button>
      )}
    </div>
  );
}
