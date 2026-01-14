import { WithChildren } from '@/shared/types/common';

/**
 * ## ScheduleTimeFieldSet
 *
 * @description
 * - 예약 시간대 설정과 관련된 UI를 하나의 폼 영역으로 묶어주는 컨테이너 컴포넌트입니다.
 *
 * @param children
 * - 시간대 목록(`ul`) 또는 시간대가 없을 때 표시할 Empty 컴포넌트
 *
 * @example
 * ```tsx
 * // 시간대가 있는 경우
 * <ScheduleTimeFieldSet>
 *   <ul>
 *     <ScheduleTimeChip
 *       startTime="10:00"
 *       endTime="11:00"
 *       onRemove={removeTime}
 *     />
 *   </ul>
 * </ScheduleTimeFieldSet>
 * ```
 *
 * @example
 * ```tsx
 * // 시간대가 없는 경우
 * <ScheduleTimeFieldSet>
 *   <ScheduleTimeEmpty />
 * </ScheduleTimeFieldSet>
 * ```
 */
export default function ScheduleTimeFieldSet({ children }: WithChildren) {
  return (
    <fieldset className='mt-20 sm:mt-24'>
      <legend className='form-title'>등록된 시간대</legend>
      {children}
    </fieldset>
  );
}
