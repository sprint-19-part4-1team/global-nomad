/**
 * ## ScheduleTimeSlot
 *
 * @description
 * - 하나의 예약 가능한 시간 구간(Time Slot)을 표현하는 타입입니다.
 * - 날짜(`YYYY-MM-DD`)와 시작 시간(`startTime`)과 종료 시간(`endTime`)으로 구성됩니다.
 */
export interface ScheduleTimeSlot {
  date: string;
  startTime: string;
  endTime: string;
}
