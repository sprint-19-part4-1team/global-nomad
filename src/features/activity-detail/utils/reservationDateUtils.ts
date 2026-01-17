import { startOfDay } from 'date-fns';
import { ScheduleResponseDto } from '@/shared/types/activities';
import { formatDateForDisplay } from '@/shared/utils/dateUtil';

/**
 * 날짜와 시간 정보를 조합하여 표시용 문자열을 생성합니다.
 *
 * 예약 확인 화면이나 선택 완료 후 표시되는 날짜/시간 정보를
 * 사용자 친화적인 형식으로 조합합니다.
 * 날짜나 시간 정보가 없는 경우 빈 문자열을 반환합니다.
 *
 * @param date - 날짜 객체
 * @param timeInfo - 시간 정보 객체
 * @param timeInfo.startTime - 시작 시간 (HH:MM 형식)
 * @param timeInfo.endTime - 종료 시간 (HH:MM 형식)
 * @returns 조합된 날짜/시간 문자열, 정보가 없으면 빈 문자열
 */
export const formatDateTimeForDisplay = (
  date: Date | undefined,
  timeInfo: { startTime: string; endTime: string } | undefined
): string => {
  if (!date || !timeInfo) {
    return '';
  }
  return `${formatDateForDisplay(date)} ${timeInfo.startTime} - ${timeInfo.endTime}`;
};

/**
 * 스케줄 배열을 날짜별 시간대 맵으로 변환합니다.
 *
 * API에서 받은 스케줄 데이터를 날짜를 키로 하는 객체로 변환하여
 * 특정 날짜의 예약 가능한 시간대를 빠르게 조회할 수 있도록 합니다.
 * reduce를 사용하여 O(n) 시간 복잡도로 변환합니다.
 *
 * @param schedules - 스케줄 배열
 * @returns 날짜 문자열을 키로 하는 시간대 배열 맵
 */
export const getSchedulesByDate = (schedules: ScheduleResponseDto[]) => {
  return schedules.reduce(
    (acc, schedule) => {
      acc[schedule.date] = schedule.times;
      return acc;
    },
    {} as Record<string, Array<{ id: number; startTime: string; endTime: string }>>
  );
};

/**
 * 현재 시간 이후의 시간대만 필터링합니다.
 *
 * 선택된 날짜가 오늘인 경우, 현재 시간 이후의 시간대만 반환합니다.
 * 오늘이 아닌 경우에는 모든 시간대를 그대로 반환합니다.
 *
 * @param times - 시간대 배열
 * @param selectedDate - 선택된 날짜
 * @param now - 현재 시간 (상위 컴포넌트에서 전달)
 * @returns 필터링된 시간대 배열
 */
export const filterTimesByNow = (
  times: Array<{ id: number; startTime: string; endTime: string }>,
  selectedDate: Date | undefined,
  now: Date
): Array<{ id: number; startTime: string; endTime: string }> => {
  if (!selectedDate) {
    return times;
  }

  const today = startOfDay(now);
  const selectedDay = startOfDay(selectedDate);

  // 선택된 날짜가 오늘이 아니면 모든 시간대 반환
  if (selectedDay.getTime() !== today.getTime()) {
    return times;
  }

  // 오늘인 경우, 현재 시간 이후의 시간대만 필터링
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeInMinutes = currentHour * 60 + currentMinute;

  return times.filter((time) => {
    const [startHour, startMinute] = time.startTime.split(':').map(Number);
    const startTimeInMinutes = startHour * 60 + startMinute;

    return startTimeInMinutes > currentTimeInMinutes;
  });
};

/**
 * 오늘 이후의 예약 가능한 날짜 목록을 반환합니다.
 *
 * 전체 스케줄에서 기준 날짜(일반적으로 오늘) 이후의 날짜만 필터링하여
 * Date 객체 배열로 반환합니다. 이 배열은 달력 컴포넌트에서
 * 선택 가능한 날짜를 표시하는 데 사용됩니다.
 *
 * 오늘 날짜의 경우, 현재 시간 이후의 예약 가능한 시간대가 있는 경우에만 포함됩니다.
 *
 * @param schedules - 스케줄 배열
 * @param today - 기준 날짜 (일반적으로 오늘 날짜)
 * @param now - 현재 시간 (상위 컴포넌트에서 전달)
 * @returns 예약 가능한 날짜 배열 (기준 날짜 포함, 이후 날짜만)
 */
export const getAvailableDates = (
  schedules: ScheduleResponseDto[],
  today: Date,
  now: Date
): Date[] => {
  return schedules
    .filter((schedule) => {
      const scheduleDate = new Date(schedule.date);

      // 과거 날짜는 제외
      if (scheduleDate < today) {
        return false;
      }

      // filterTimesByNow를 사용하여 현재 시간 이후 시간대 확인
      const availableTimes = filterTimesByNow(schedule.times, scheduleDate, now);

      return availableTimes.length > 0;
    })
    .map((schedule) => new Date(schedule.date));
};
