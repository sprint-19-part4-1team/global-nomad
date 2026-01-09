import { ReactNode } from 'react';

interface ScheduleDurationRadioGroupProps {
  /** 라디오 그룹 제목 */
  legend: string;
  /** 라디오 옵션 컴포넌트들 */
  children: ReactNode;
  /** fieldset에 적용할 스타일 */
  className?: string;
}

/**
 * ## ScheduleDurationRadioGroup
 *
 * @description
 * - 체험 시간 선택을 위한 라디오 버튼 그룹 컴포넌트입니다.
 * - 선택 상태 및 변경 로직은 상위 컴포넌트에서 제어하며, 본 컴포넌트는 레이아웃과 그룹 역할만 담당합니다.
 *
 * @example
 * ```tsx
 * <ScheduleDurationRadioGroup legend="체험시간">
 *   <ScheduleDurationRadio
 *     name="duration"
 *     label="1시간"
 *     value={60}
 *     checked={duration === 60}
 *     onChange={setDuration}
 *   />
 *   <ScheduleDurationRadio
 *     name="duration"
 *     label="2시간"
 *     value={120}
 *     checked={duration === 120}
 *     onChange={setDuration}
 *   />
 * </ScheduleDurationRadioGroup>
 * ```
 */
export default function ScheduleDurationRadioGroup({
  children,
  legend,
  className,
}: ScheduleDurationRadioGroupProps) {
  return (
    <fieldset className={className}>
      <legend className='form-title'>{legend}</legend>
      <div className='mt-6 flex gap-12 sm:mt-8'>{children}</div>
    </fieldset>
  );
}
