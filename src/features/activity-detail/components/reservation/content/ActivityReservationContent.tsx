'use client';

import Icons from '@/assets/icons';
import ActivityReservationDateTimeSection from '@/features/activity-detail/components/reservation/content/ActivityReservationDateTimeSection';
import ActivityReservationHeadCounter from '@/features/activity-detail/components/reservation/content/ActivityReservationHeadCounter';
import useReservationState from '@/features/activity-detail/hooks/useReservationState';
import {
  formatDateTimeForDisplay,
  getSchedulesByDate,
} from '@/features/activity-detail/utils/reservationDateUtils';
import Button from '@/shared/components/button/Button';
import Title from '@/shared/components/title/Title';
import { CreateReservationBodyDto, ScheduleResponseDto } from '@/shared/types/activities';
import { formatDateToString } from '@/shared/utils/dateUtil';
import { formatValue } from '@/shared/utils/formatValue';

/**
 * 체험 예약 콘텐츠 컴포넌트의 Props
 * @property {number} price - 1인당 체험 가격
 * @property {ScheduleResponseDto[]} schedules - 예약 가능한 스케줄 목록
 * @property {() => void} [onClose] - 바텀시트 닫기 핸들러
 * @property {(info: CreateReservationBodyDto & { dateTime: string }) => void} [onConfirm] - 바텀시트 확인 핸들러
 * @property {() => void} [onReservation] - 데스크톱 예약 버튼 핸들러
 * @property {boolean} [isBottomSheet] - 바텀시트 모드 여부 (기본값: false)
 */
interface ActivityReservationContentProps {
  price: number;
  schedules: ScheduleResponseDto[];
  onClose?: () => void;
  onConfirm?: (info: CreateReservationBodyDto & { dateTime: string }) => void;
  onReservation?: () => void;
  isBottomSheet?: boolean;
}

/**
 * 체험 예약 콘텐츠 컴포넌트
 *
 * 체험 예약을 위한 날짜, 시간, 인원 선택 UI를 제공하며,
 * 데스크톱과 모바일(바텀시트) 환경에서 다른 레이아웃으로 동작합니다.
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
 *   price={50000}
 *   schedules={schedules}
 *   onReservation={() => handleReservation()}
 *   isBottomSheet={false}
 * />
 *
 * // 바텀시트 모드
 * <ActivityReservationContent
 *   price={50000}
 *   schedules={schedules}
 *   onClose={() => setIsOpen(false)}
 *   onConfirm={(info) => handleConfirm(info)}
 *   isBottomSheet={true}
 * />
 * ```
 */
export default function ActivityReservationContent({
  price,
  schedules,
  onClose,
  onConfirm,
  onReservation,
  isBottomSheet = false,
}: ActivityReservationContentProps) {
  // 커스텀 훅으로 모든 상태 관리
  const reservation = useReservationState();

  const totalPrice = price * reservation.participantCount;

  // 선택된 시간 정보 찾기 (유틸 함수 활용)
  const schedulesByDate = getSchedulesByDate(schedules);
  const availableTimes = reservation.selectedDate
    ? schedulesByDate[formatDateToString(reservation.selectedDate)] || []
    : [];

  const selectedTimeInfo = availableTimes.find((t) => t.id === reservation.selectedScheduleId);
  const selectedDateTime = formatDateTimeForDisplay(reservation.selectedDate, selectedTimeInfo);

  // 바텀시트에서 날짜/시간 선택이 완료되면 해당 영역 숨김
  const showDateTimeSection = isBottomSheet ? !reservation.showParticipantSection : true;

  // 확인 버튼 핸들러 (바텀시트 - 날짜/시간 선택 단계)
  const handleDateTimeConfirm = () => {
    if (!reservation.isDateTimeValid) {
      return;
    }
    reservation.setShowParticipantSection(true);
  };

  // 확인 버튼 핸들러 (바텀시트 - 인원 선택 단계)
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

  // 예약하기 버튼 핸들러 (데스크톱)
  const handleReservation = () => {
    if (!reservation.isValid || !reservation.selectedScheduleId) {
      return;
    }

    console.log({
      scheduleId: reservation.selectedScheduleId,
      headCount: reservation.participantCount,
    });

    if (onReservation) {
      onReservation();
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
          <ActivityReservationDateTimeSection
            selectedDate={reservation.selectedDate}
            onDateSelect={reservation.handleDateSelect}
            selectedScheduleId={reservation.selectedScheduleId}
            onScheduleSelect={reservation.setSelectedScheduleId}
            schedules={schedules}
            currentMonth={reservation.currentMonth}
            onMonthChange={reservation.handleMonthChange}
            isBottomSheet={isBottomSheet}
          />
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
