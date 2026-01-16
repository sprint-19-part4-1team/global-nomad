'use client';

import { format } from 'date-fns';
import { useEffect, useRef } from 'react';
import ScheduleDateAccordion from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/ScheduleDateAccordion';
import ScheduleDateAccordionHeader from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/ScheduleDateAccordionHeader';
import ScheduleDateAccordionPanel from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/ScheduleDateAccordionPanel';
import ScheduleDateField from '@/features/activity-form/common/components/schedule-date-section/schedule-date-input/ScheduleDateField';
import { useScheduleForm } from '@/features/activity-form/common/hooks/useScheduleForm';

interface ScheduleDateSectionProps {
  /**
   * useScheduleForm의 리턴 타입
   *
   * - selectedDate: 현재 선택된 날짜
   * - setSelectedDate: 날짜 선택 상태 업데이트 함수
   * - accordionDates: 아코디언으로 표시되는 날짜 문자열 배열 (yyyy-MM-dd)
   * - scheduleDates: 날짜별 예약 시간대 목록
   * - handleAddDate: 날짜 추가 핸들러
   * - handleAddTimeSlot: 특정 날짜 시간대 추가 핸들러
   * - handleRemoveTimeSlot: 특정 날짜 시간대 삭제 핸들러
   * - handleRemoveDate: 날짜(아코디언) 삭제 핸들러
   */
  scheduleInfo: ReturnType<typeof useScheduleForm>;
}

/**
 * ## ScheduleDateSection
 *
 * @description
 * - 체험(Activity) 생성/수정 폼에서 예약 가능 날짜 및 시간대 설정을 담당하는 섹션 컴포넌트입니다.
 * - 날짜를 선택하면 해당 날짜에 대한 예약 가능 시간대를 아코디언 형태로 관리할 수 있습니다.
 * - 날짜 추가 시, 새로 생성된 아코디언으로 자동 스크롤 및 포커싱을 제공합니다.
 * - 실제 일정 데이터 상태 관리는 `useScheduleForm` 훅에서 처리합니다.
 */
export default function ScheduleDateSection({ scheduleInfo }: ScheduleDateSectionProps) {
  const {
    selectedDate,
    setSelectedDate,
    accordionDates,
    scheduleDates,
    handleAddDate: addDate,
    handleAddTimeSlot,
    handleRemoveTimeSlot,
    handleRemoveDate,
  } = scheduleInfo;

  const accordionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const lastAddedDateRef = useRef<string | null>(null);

  /**
   * 새로 추가된 날짜 아코디언이 있을 때 해당 아코디언으로 자동 스크롤 및 포커스 이동
   */
  useEffect(() => {
    const targetDate = lastAddedDateRef.current;
    if (!targetDate) {
      return;
    }

    const targetEl = accordionRefs.current[targetDate];
    if (!targetEl) {
      return;
    }

    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    targetEl.focus();
    lastAddedDateRef.current = null;
  }, [accordionDates]);

  const handleAddDate = (date: Date) => {
    const dateString = format(date, 'yyyy-MM-dd');

    // 상태 업데이트를 통한 리렌더링 이후 새로 생긴 DOM을 찾아서 포커스 하기 위해 미리 기록
    if (!accordionDates.includes(dateString)) {
      lastAddedDateRef.current = dateString;
    }

    addDate(date);
  };

  return (
    <fieldset className='flex flex-col gap-16'>
      <legend className='form-title'>예약 가능 시간대</legend>
      <ScheduleDateField date={selectedDate} setDate={setSelectedDate} onAddDate={handleAddDate} />
      <div className='flex flex-col gap-16'>
        {accordionDates.map((date) => (
          <div
            key={date}
            ref={(el) => {
              accordionRefs.current[date] = el;
            }}
            tabIndex={-1}
            className='rounded-18 focus:outline focus:outline-primary-500'>
            <ScheduleDateAccordion key={date} defaultOpen>
              <ScheduleDateAccordionHeader
                date={new Date(date)}
                onDelete={() => handleRemoveDate(date)}
              />
              <ScheduleDateAccordionPanel
                date={date}
                times={scheduleDates.filter((s) => s.date === date)}
                onAddTime={handleAddTimeSlot}
                onRemoveTime={(startTime) => handleRemoveTimeSlot(date, startTime)}
              />
            </ScheduleDateAccordion>
          </div>
        ))}
      </div>
    </fieldset>
  );
}
