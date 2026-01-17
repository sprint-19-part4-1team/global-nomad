import { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { fn } from 'storybook/test';
import ScheduleDateAccordion from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/ScheduleDateAccordion';
import ScheduleDateAccordionHeader from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/ScheduleDateAccordionHeader';
import ScheduleDateField from '@/features/activity-form/common/components/schedule-date-section/schedule-date-input/ScheduleDateField';

/**
 * ScheduleDateField 컴포넌트 스토리 가이드
 *
 * ### 주요 특징
 * - 날짜 선택을 위한 입력 필드 + DatePicker UI를 제공합니다.
 * - ➕ 버튼을 통해 선택된 날짜를 확정합니다.
 *
 * ### 안내 사항
 * - 날짜 목록(아코디언)은 이 컴포넌트 내부가 아닌
 *   상위 컴포넌트 상태에서 관리됩니다.
 * - 본 스토리에서는 실제 사용 시나리오를 가정하여
 *   상위 상태를 함께 구성합니다.
 */
const meta: Meta<typeof ScheduleDateField> = {
  title: 'Features/ActivityForm/ScheduleDateField',
  component: ScheduleDateField,
};

export default meta;

type Story = StoryObj<typeof ScheduleDateField>;

/**
 * 기본 상태의 ScheduleDateField입니다.
 *
 * - 날짜를 선택할 수 있는 입력 필드만 렌더링됩니다.
 * - ➕ 버튼은 날짜를 선택하기 전까지 비활성화되어 있습니다.
 */
export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date | undefined>(undefined);

    return (
      <div className='h-400 w-500'>
        <ScheduleDateField date={date} setDate={setDate} onAddDate={fn()} />
      </div>
    );
  },
};

/**
 * 날짜를 추가하면 아코디언이 생성되는 예제입니다.
 *
 * - ➕ 버튼 클릭 시 선택된 날짜가 확정됩니다.
 * - 확정된 날짜는 아코디언 목록으로 렌더링됩니다.
 * - 실제 ActivityForm에서의 사용 흐름을 가정한 스토리입니다.
 */
export const WithAccordion: Story = {
  render: () => {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>();
    const [dates, setDates] = useState<Date[]>([]);

    const handleAddDate = (date: Date) => {
      setDates((prev) => [...prev, date]);
    };

    const handleDeleteDate = (target: Date) => {
      setDates((prev) => prev.filter((d) => d.getTime() !== target.getTime()));
    };

    return (
      <div className='flex h-400 w-500 flex-col gap-16 py-24'>
        <ScheduleDateField
          date={selectedDate}
          setDate={setSelectedDate}
          onAddDate={handleAddDate}
        />

        {dates.map((date) => (
          <ScheduleDateAccordion key={date.toISOString()}>
            <ScheduleDateAccordionHeader date={date} onDelete={() => handleDeleteDate(date)} />
          </ScheduleDateAccordion>
        ))}
      </div>
    );
  },
};
