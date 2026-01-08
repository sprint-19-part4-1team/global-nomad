/**
 * ## ScheduleTimeEmpty
 *
 * @description
 * - 아직 등록된 예약 시간대가 없을 때 표시되는 빈 상태(Empty State) 안내 컴포넌트입니다.
 * - 시간대 설정 영역(`ScheduleTimeFieldSet`) 내부에서 사용되며,
 *   사용자에게 현재 선택된 시간대가 없음을 시각적으로 안내합니다.
 *
 * @example
 * ```tsx
 * <ScheduleTimeFieldSet>
 *   <ScheduleTimeEmpty />
 * </ScheduleTimeFieldSet>
 * ```
 */
export default function ScheduleTimeEmpty() {
  return (
    <div className='mt-6 gap-12 rounded-8 bg-gray-25 px-16 py-8 body-14 font-medium text-gray-500 sm:mt-8'>
      아직 등록된 시간대가 없습니다.
    </div>
  );
}
