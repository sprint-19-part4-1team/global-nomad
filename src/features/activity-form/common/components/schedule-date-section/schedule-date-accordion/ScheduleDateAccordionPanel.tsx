'use client';

import { useState } from 'react';
import {
  DURATION_OPTIONS,
  START_HOURS,
} from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/constants/schedule';
import useScheduleDateAccordionContext from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/hooks/useScheduleDateAccordion';
import ScheduleDurationRadio from '@/features/activity-form/common/components/schedule-date-section/schedule-duration-radio/ScheduleDurationRadio';
import ScheduleDurationRadioGroup from '@/features/activity-form/common/components/schedule-date-section/schedule-duration-radio/ScheduleDurationRadioGroup';
import ScheduleTimeSection from '@/features/activity-form/common/components/schedule-date-section/schedule-time-chip/ScheduleTimeSection';
import {
  SelectDropdown,
  SelectDropdownContent,
  SelectDropdownItem,
  SelectDropdownTrigger,
  SelectDropdownValue,
} from '@/shared/components/dropdown/select';
import Label from '@/shared/components/label/Label';
import { ScheduleTimeSlot } from '@/shared/types/activities';

interface ScheduleDateAccordionPanelProps {
  /** 선택한 날짜 */
  date: string;
  /** 예약 가능 시간대 목록 */
  times: ScheduleTimeSlot[];
  /** 시간 추가 핸들러 */
  onAddTime: (slot: ScheduleTimeSlot) => void;
  /** 시간 삭제 핸들러 */
  onRemoveTime: (startTime: string) => void;
}

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
 * <ScheduleDateAccordionPanel date={date} times={times} onAddTime={onAddTime} onRemoveTime={onRemoveTime} />
 * ```
 */
export default function ScheduleDateAccordionPanel({
  date,
  times,
  onAddTime,
  onRemoveTime,
}: ScheduleDateAccordionPanelProps) {
  const { isOpen, panelId, triggerId } = useScheduleDateAccordionContext();

  const [duration, setDuration] = useState<number | null>(null);
  const [startTime, setStartTime] = useState('');

  /**
   * 특정 시간이 이미 등록된 시간대들과 겹치는지 확인 (Dropdown 아이템 disabled 처리용)
   */
  const isTimeDisabled = (targetTime: string): boolean => {
    return times.some((slot) => {
      return targetTime >= slot.startTime && targetTime < slot.endTime;
    });
  };

  const handleDurationChange = (selectedDurationMinutes: number) => {
    if (!startTime) {
      return;
    }

    const startHour = Number(startTime.split(':')[0]);
    const endHourNum = startHour + selectedDurationMinutes / 60;
    const endTime = `${String(endHourNum).padStart(2, '0')}:00`;

    onAddTime({
      date,
      startTime,
      endTime,
    });

    setStartTime('');
    setDuration(null);
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
      <Label id='start-time' className='mb-8 inline-block' variant='form'>
        시작 시간
      </Label>

      <SelectDropdown value={startTime} onChangeValue={setStartTime}>
        <SelectDropdownTrigger ariaLabelledBy='start-time'>
          <SelectDropdownValue placeholder='시작 시간을 선택해 주세요.' />
        </SelectDropdownTrigger>
        <SelectDropdownContent>
          {START_HOURS.map((hour) => {
            const disabled = isTimeDisabled(hour);
            return (
              <SelectDropdownItem key={hour} value={hour} disabled={disabled}>
                {hour} {disabled && '(등록됨)'}
              </SelectDropdownItem>
            );
          })}
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
            onChange={() => handleDurationChange(value)}
          />
        ))}
      </ScheduleDurationRadioGroup>

      <ScheduleTimeSection times={times} onRemoveTime={onRemoveTime} />
    </div>
  );
}
