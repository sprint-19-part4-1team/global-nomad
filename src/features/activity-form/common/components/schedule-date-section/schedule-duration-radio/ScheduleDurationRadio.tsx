import Icons from '@/assets/icons';
import { cn } from '@/shared/utils/cn';

interface ScheduleDurationRadioProps {
  /** 화면에 표시할 체험 시간 라벨 */
  label: string;
  /** 라디오 그룹을 구분하기 위한 name 값 */
  name: string;
  /** 선택 시 전달되는 체험 시간 값 (분 단위) */
  value: number;
  /** 현재 라디오 선택 여부 */
  checked: boolean;
  /** 라디오 선택 시 호출되는 콜백 함수 */
  onChange: (value: number) => void;
  /** 비활성화 여부 */
  disabled?: boolean;
}

const itemStyle =
  'group-has-[input:checked]:text-primary-500 group-has-[input:disabled]:text-white';

/**
 * ## ScheduleDurationRadio
 *
 * @description
 * - 체험 시간 선택을 위한 커스텀 라디오 버튼 컴포넌트입니다.
 *
 * @example
 * ```tsx
 * <ScheduleDurationRadio
 *   name="duration"
 *   label="1시간"
 *   value={60}
 *   checked={duration === 60}
 *   onChange={setDuration}
 * />
 * ```
 */
export default function ScheduleDurationRadio({
  label,
  name,
  value,
  checked,
  onChange,
  disabled = false,
}: ScheduleDurationRadioProps) {
  return (
    <label className='group'>
      <input
        type='radio'
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        disabled={disabled}
        className='peer sr-only'
      />
      <span className='flex w-100 cursor-pointer items-center justify-between rounded-full border border-gray-200 bg-white px-16 py-9 peer-checked:border-primary-500 peer-checked:bg-primary-100 peer-disabled:cursor-not-allowed peer-disabled:border-0 peer-disabled:bg-gray-50 sm:py-11'>
        <span className={cn('body-14 font-semibold text-gray-700 sm:body-16', itemStyle)}>
          {label}
        </span>
        <Icons.Check aria-hidden='true' className={cn('h-16 w-16 text-gray-200', itemStyle)} />
      </span>
    </label>
  );
}
