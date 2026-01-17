import Icons from '@/assets/icons';

interface ScheduleTimeChipProps {
  /** 예약 시작 시간 */
  startTime: string;
  /** 예약 종료 시간 */
  endTime: string;
  /** 시간 삭제 버튼 클릭 시 호출되는 콜백 함수 */
  onRemove: () => void;
}

/**
 * ## ScheduleTimeChip
 *
 * @description
 * - 선택된 예약 시간을 시각적으로 표시하는 칩(Chip) 컴포넌트입니다.
 * - 시간 텍스트와 함께 삭제 버튼을 제공하여 사용자가 개별 시간 항목을 제거할 수 있도록 합니다.
 * @example
 * ```tsx
 * <ScheduleTimeChip
 *   startTime="10:00" endTime="11:00"
 *   onRemove={() => removeTime("10:00 ~ 11:00")}
 * />
 * ```
 */
export default function ScheduleTimeChip({ startTime, endTime, onRemove }: ScheduleTimeChipProps) {
  return (
    <li className='inline-flex rounded-full bg-gray-25 p-8 pl-12 body-13 font-semibold text-gray-800 sm:body-14'>
      <time dateTime={startTime}>{startTime}</time>
      <span className='mx-4'>~</span>
      <time dateTime={endTime}>{endTime}</time>
      <button
        type='button'
        aria-label={`예약 시간 ${startTime}부터 ${endTime}까지 삭제`}
        onClick={onRemove}
        className='ml-10 h-24 w-24 text-gray-400'>
        <Icons.Close aria-hidden='true' />
      </button>
    </li>
  );
}
