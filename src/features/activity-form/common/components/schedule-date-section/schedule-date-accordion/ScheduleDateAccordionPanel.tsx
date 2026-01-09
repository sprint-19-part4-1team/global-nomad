'use client';

import { useRef, useState } from 'react';
import {
  DURATION_OPTIONS,
  START_HOURS,
} from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/constants/schedule';
import useScheduleDateAccordionContext from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/hooks/useScheduleDateAccordion';
import ScheduleDurationRadio from '@/features/activity-form/common/components/schedule-date-section/schedule-duration-radio/ScheduleDurationRadio';
import ScheduleDurationRadioGroup from '@/features/activity-form/common/components/schedule-date-section/schedule-duration-radio/ScheduleDurationRadioGroup';
import ScheduleTimeSection from '@/features/activity-form/common/components/schedule-date-section/schedule-time-chip/ScheduleTimeSection';
import type { ScheduleTimeSlot } from '@/features/activity-form/common/types/schedule';
import {
  SelectDropdown,
  SelectDropdownContent,
  SelectDropdownItem,
  SelectDropdownTrigger,
  SelectDropdownValue,
} from '@/shared/components/dropdown/select';
import Label from '@/shared/components/label/Label';

/**
 * ## ScheduleDateAccordionPanel
 *
 * @description
 * - 날짜별 스케줄 설정을 위한 아코디언 패널 컴포넌트입니다.
 * - 선택한 시작 시간, 체험 시간(duration), 등록된 시간대 목록을
 *   하나의 UI 영역으로 구성하여 제공합니다.
 * - 아코디언이 열려 있는 경우에만 렌더링되며, 닫힌 상태에서는 `null`을 반환합니다.
 *
 * @example
 * ```tsx
 * <ScheduleDateAccordionPanel />
 * ```
 */
export default function ScheduleDateAccordionPanel() {
  const { isOpen, panelId, triggerId } = useScheduleDateAccordionContext();

  const dropdownTriggerRef = useRef<null | HTMLButtonElement>(null);

  // TODO: state 분리, 시간 유효성 검사 로직 구현 예정
  const [duration, setDuration] = useState<number | null>(null);
  const [startTime, setStartTime] = useState('');
  const [times, setTimes] = useState<ScheduleTimeSlot[]>([]);

  const handleRemoveTime = (index: number) => {
    setTimes((prev) => prev.filter((_, i) => i !== index));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      id={panelId}
      role='region'
      aria-labelledby={triggerId}
      className='rounded-b-16 border border-gray-100 px-20 py-24'>
      <Label
        id='start-time'
        className='mb-8 inline-block'
        variant='form'
        onClick={() => dropdownTriggerRef.current?.focus()}>
        시작 시간
      </Label>
      <SelectDropdown value={startTime} onChangeValue={setStartTime}>
        <SelectDropdownTrigger ariaLabelledBy='start-time' ref={dropdownTriggerRef}>
          <SelectDropdownValue placeholder='시작 시간을 선택해 주세요.' />
        </SelectDropdownTrigger>
        <SelectDropdownContent>
          {START_HOURS.map((hour) => (
            <SelectDropdownItem key={hour} value={hour}>
              {hour}
            </SelectDropdownItem>
          ))}
        </SelectDropdownContent>
      </SelectDropdown>
      <ScheduleDurationRadioGroup legend='체험시간' className='mt-24'>
        {DURATION_OPTIONS.map(({ label, value }) => (
          <ScheduleDurationRadio
            key={value}
            name='duration'
            label={label}
            value={value}
            disabled={!startTime}
            checked={duration === value}
            onChange={setDuration}
          />
        ))}
      </ScheduleDurationRadioGroup>
      <ScheduleTimeSection times={times} onRemoveTime={handleRemoveTime} />
    </div>
  );
}
