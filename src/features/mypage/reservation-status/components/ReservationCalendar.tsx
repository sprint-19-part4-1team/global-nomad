'use client';

import { useQueryClient } from '@tanstack/react-query';
import { format, addMonths, subMonths, isSameMonth, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { toast } from 'react-toastify';
import Icons from '@/assets/icons';
import ReservationDetailPanel from '@/features/mypage/reservation-status/components/panel/ReservationDetailPanel';
import ReservationBadge from '@/features/mypage/reservation-status/components/ReservationBadge';
import {
  CALENDAR_STYLE,
  WEEK_DAYS,
} from '@/features/mypage/reservation-status/constants/calendarConfig';
import { useReservationCalendar } from '@/features/mypage/reservation-status/hooks/useReservationCalendar';
import { getMyActivityReservedSchedules } from '@/shared/apis/feature/myActivities';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';
import Title from '@/shared/components/title/Title';
import { QUERY_KEYS } from '@/shared/constants';
import { useUserStore } from '@/shared/stores/userStore';
import { FindReservationsByMonthResponseDto } from '@/shared/types/myActivities';
import { cn } from '@/shared/utils/cn';
import { formatDateToString } from '@/shared/utils/dateUtil';

/**
 * ReservationCalendar 컴포넌트의 Props
 *
 * @property {string} selectedActivityId - 현재 선택된 체험 ID
 * @property {readonly FindReservationsByMonthResponseDto[]} reservations - 표시할 예약 데이터 배열
 * @property {Date} currentMonth - 현재 표시 중인 월
 * @property {(newMonth: Date) => void} onMonthChange - 월 변경 시 호출되는 콜백 함수
 */
interface ReservationCalendarProps {
  selectedActivityId: string;
  reservations: readonly FindReservationsByMonthResponseDto[];
  currentMonth: Date;
  onMonthChange: (newMonth: Date) => void;
}

/**
 * 체험 예약 현황을 표시하는 월간 달력 컴포넌트
 *
 * 월 단위로 예약 현황을 시각적으로 표시하고,
 * 예약이 있는 날짜를 클릭하면 상세 정보를 확인할 수 있습니다.
 *
 * @description
 * - 월 단위로 예약 현황을 시각적으로 표시
 * - 각 날짜별로 완료/승인/예약 건수 표시
 * - 이전/다음 달 네비게이션 지원 (2026년 1월 ~ 현재 달 +4개월)
 * - 예약이 있는 날짜는 클릭 가능 (hover 효과)
 * - 오늘 날짜는 primary-500 테두리 표시
 * - 클릭 시 ReservationDetailPanel 오버레이 표시
 *
 * @param {ReservationCalendarProps} props - ReservationCalendar 컴포넌트 props
 * @returns {JSX.Element} 렌더링된 달력 컴포넌트
 *
 * @example
 * ```tsx
 * const reservations = [
 *   {
 *     date: '2026-01-05',
 *     reservations: { completed: 1, confirmed: 2, pending: 1 }
 *   }
 * ];
 *
 * <ReservationCalendar
 *   selectedActivityId="123"
 *   reservations={reservations}
 *   currentMonth={new Date()}
 *   onMonthChange={(newMonth) => setCurrentMonth(newMonth)}
 * />
 * ```
 */
export default function ReservationCalendar({
  selectedActivityId,
  reservations,
  currentMonth,
  onMonthChange,
}: ReservationCalendarProps) {
  const queryClient = useQueryClient();
  const userId = useUserStore((s) => s.user?.id);

  const { today, canGoPrevMonth, canGoNextMonth, calendarDays, getReservationForDateMemo } =
    useReservationCalendar({
      reservations,
      currentMonth,
    });

  /**
   * 날짜 클릭 핸들러
   *
   * 예약이 있는 날짜를 클릭했을 때 overlayStore를 통해 예약 상세 패널을 오버레이로 표시합니다.
   *
   * @param {Date} date - 클릭된 날짜
   */
  const handleDateClick = async (date: Date) => {
    const reservation = getReservationForDateMemo(date);

    if (!reservation) {
      toast.info('해당 날짜에 예약 내역이 없습니다.');
      return;
    }

    // 예약 현황에 대기 또는 승인이 있는지 확인
    const hasActiveReservations =
      reservation.reservations.pending > 0 || reservation.reservations.confirmed > 0;

    // 예약 상세 패널 표시 여부
    let shouldOpenPanel = hasActiveReservations;

    // 예약 현황에 대기 또는 승인이 없다면 일별 스케줄 조회를 하여 거절이 있는지 확인
    if (!hasActiveReservations) {
      try {
        const formattedDate = formatDateToString(date);

        // React Query 캐시 활용하여 일별 스케줄 조회
        const schedules = await queryClient.fetchQuery({
          queryKey: QUERY_KEYS.MY_ACTIVITY_RESERVED_SCHEDULE(
            Number(selectedActivityId),
            { date: formattedDate },
            userId
          ),
          queryFn: () =>
            getMyActivityReservedSchedules(Number(selectedActivityId), { date: formattedDate }),
        });

        // 예약 현황에 거절이 있는지 확인
        const hasDeclined = schedules.some((schedule) => (schedule.count.declined ?? 0) > 0);

        if (hasDeclined) {
          shouldOpenPanel = true;
        } else {
          // 완료만 있는 경우 토스트 표시
          toast.info('완료된 예약만 있습니다.');
        }
      } catch (error) {
        console.error('예약 정보를 불러오는 중 오류 발생:', error);
        toast.error('예약 정보를 불러오는 중 오류가 발생했습니다.');
      }
    }

    if (shouldOpenPanel) {
      overlayStore.push(
        <ReservationDetailPanel
          activityId={selectedActivityId}
          date={date}
          onClose={() => overlayStore.pop()}
        />
      );
    }
  };

  return (
    <div className='-mx-24 flex w-screen flex-col gap-8 bg-white sm:mx-auto sm:w-full sm:gap-30 sm:rounded-24 sm:pt-20 sm:pb-10 sm:shadow-card'>
      {/* 헤더 */}
      <div className='flex items-center justify-center gap-8 sm:gap-30'>
        <button
          onClick={() => canGoPrevMonth && onMonthChange(subMonths(currentMonth, 1))}
          className={CALENDAR_STYLE.MONTH_BTN}
          aria-label='이전 달'
          disabled={!canGoPrevMonth}>
          <Icons.CaretLeft
            aria-hidden='true'
            className={`w-full ${canGoPrevMonth ? 'text-gray-950' : 'text-gray-300'}`}
          />
        </button>
        <Title as='h3' responsive='md' className='text-gray-950'>
          {format(currentMonth, 'yyyy년 M월', { locale: ko })}
        </Title>
        <button
          onClick={() => canGoNextMonth && onMonthChange(addMonths(currentMonth, 1))}
          className={CALENDAR_STYLE.MONTH_BTN}
          aria-label='다음 달'
          disabled={!canGoNextMonth}>
          <Icons.CaretRight
            aria-hidden='true'
            className={`w-full ${canGoNextMonth ? 'text-gray-950' : 'text-gray-300'}`}
          />
        </button>
      </div>

      <div role='grid' aria-label='예약 현황 표시 달력' className='flex flex-col gap-4 sm:gap-12'>
        {/* 요일 헤더 */}
        <div role='row' className='grid grid-cols-7'>
          {WEEK_DAYS.map((day, idx) => (
            <div
              key={idx}
              role='columnheader'
              className='p-12 text-center body-13 font-bold text-gray-900 sm:body-16'>
              {day}
            </div>
          ))}
        </div>

        <div role='row' className='grid grid-cols-7'>
          {calendarDays.map((day, index) => {
            const reservation = getReservationForDateMemo(day);
            const isCurrentMonthDay = isSameMonth(day, currentMonth);
            const isToday = isSameDay(day, today);
            const hasReservation = reservation && isCurrentMonthDay;

            return (
              <div
                key={index}
                role='gridcell'
                aria-label={format(day, 'yyyy년 M월 d일', { locale: ko })}
                onClick={() => hasReservation && handleDateClick(day)}
                className={cn(
                  'flex h-104 flex-col items-center gap-6 border-t px-4 pt-10 pb-6 sm:h-124 sm:gap-4 sm:px-12 sm:pt-14 sm:pb-10',
                  index < 7 ? 'border-gray-100' : 'border-gray-50',
                  {
                    'outline-2 -outline-offset-2 outline-primary-500': isToday,
                    'cursor-pointer': hasReservation,
                  }
                )}>
                <div className='relative flex'>
                  <span
                    className={`body-12 sm:body-16 ${!isCurrentMonthDay ? 'text-gray-300' : 'text-gray-800'}`}>
                    {format(day, 'd')}
                  </span>
                  {hasReservation && (
                    <div className='absolute left-12 size-4 rounded-full bg-red-500 sm:left-20 sm:size-6' />
                  )}
                </div>

                {hasReservation && <ReservationBadge reservation={reservation} />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
