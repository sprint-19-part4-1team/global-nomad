import { format } from 'date-fns';
import { useState } from 'react';
import { toast } from 'react-toastify';
import type { DetailSchedulesType, ScheduleTimeSlot } from '@/shared/types/activities';

/**
 * ## useScheduleForm
 *
 * @description
 * - 체험(Activity) 생성/수정 폼에서 예약 가능 날짜 및 시간대 상태를 관리하는 훅입니다.
 * - 날짜별 아코디언 목록과 각 날짜에 대한 예약 가능 시간대를 관리합니다.
 * - 중복 날짜 및 겹치는 시간대에 대한 유효성 검사를 수행합니다.
 *
 * @param initialSchedules
 * - 수정 화면에서 사용될 초기 예약 일정 목록
 * - `{ id, date, startTime, endTime }` 형태의 배열
 *
 * @returns
 * - selectedDate: 현재 선택된 날짜
 * - setSelectedDate: 날짜 선택 상태 업데이트 함수
 * - accordionDates: 아코디언으로 표시되는 날짜 문자열 배열 (`yyyy-MM-dd`)
 * - scheduleDates: 날짜별 예약 시간대 목록
 * - handleAddDate: 날짜 추가 핸들러
 * - handleAddTimeSlot: 특정 날짜 시간대 추가 핸들러
 * - handleRemoveTimeSlot: 특정 날짜 시간대 삭제 핸들러
 * - handleRemoveDate: 날짜(아코디언) 삭제 핸들러
 * - isScheduleValid: 예약 가능 시간대 유효성 여부
 */
export const useScheduleForm = (initialSchedules: DetailSchedulesType[] = []) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [accordionDates, setAccordionDates] = useState<string[]>(() => {
    const dates = initialSchedules.map((s) => s.date);
    return Array.from(new Set(dates)).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  });
  const [scheduleDates, setScheduleDates] = useState<ScheduleTimeSlot[]>(() =>
    initialSchedules.map(({ date, startTime, endTime }) => ({
      date,
      startTime,
      endTime,
    }))
  );

  const handleAddDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');
    if (accordionDates.includes(dateString)) {
      toast.error('이미 추가된 날짜입니다.');
      return;
    }
    setAccordionDates((prev) =>
      [...prev, dateString].sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    );
  };

  const handleAddTimeSlot = (newSlot: ScheduleTimeSlot) => {
    const isDuplicated = scheduleDates.some(
      (slot) =>
        slot.date === newSlot.date
        && newSlot.startTime < slot.endTime // 새로운 시작 시간이 기존 종료 시간보다 빨라야 함
        && slot.startTime < newSlot.endTime // 기존 시작이 새 종료보다 빨라야 함
    );

    if (isDuplicated) {
      toast.error('해당 날짜에 겹치는 시간대가 이미 존재합니다.');
      return;
    }

    setScheduleDates((prev) =>
      [...prev, newSlot].sort((a, b) => {
        if (a.date !== b.date) {
          return a.date.localeCompare(b.date);
        }
        return a.startTime.localeCompare(b.startTime);
      })
    );
  };

  const handleRemoveTimeSlot = (date: string, startTime: string) => {
    setScheduleDates((prev) =>
      prev.filter((slot) => !(slot.date === date && slot.startTime === startTime))
    );
  };

  const handleRemoveDate = (date: string) => {
    setAccordionDates((prev) => prev.filter((d) => d !== date));
    setScheduleDates((prev) => prev.filter((s) => s.date !== date));
  };

  const isScheduleValid = scheduleDates.length > 0;

  return {
    selectedDate,
    setSelectedDate,
    accordionDates,
    setAccordionDates,
    scheduleDates,
    handleAddDate,
    handleAddTimeSlot,
    handleRemoveTimeSlot,
    handleRemoveDate,
    isScheduleValid,
  };
};
