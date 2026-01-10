import { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import { fn } from 'storybook/test';
import ScheduleDateAccordion from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/ScheduleDateAccordion';
import ScheduleDateAccordionHeader from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/ScheduleDateAccordionHeader';
import ScheduleDateAccordionPanel from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/ScheduleDateAccordionPanel';

/**
 * ScheduleDateAccordion 컴포넌트 스토리 가이드
 *
 * ### 주요 특징
 * - 날짜 단위 스케줄 설정을 위한 아코디언 컴포넌트입니다.
 * - Root / Header / Panel로 분리된 Compound Component 구조입니다.
 * - 접근성을 고려한 `aria-expanded`, `aria-controls`,
 *   `role="region"` 패턴을 따릅니다.
 *
 * ### 안내 사항
 * - `defaultOpen`은 아코디언의 **초기 열림 상태**를 결정하는 props입니다.
 * - Storybook Controls에서 값을 변경해도
 *   이미 마운트된 컴포넌트의 열림 상태는 변경되지 않습니다.
 * - 실제 열림/닫힘 상태는 사용자 인터랙션(헤더 클릭)에 의해
 *   내부 상태(`isOpen`)로 관리됩니다.
 */
const meta: Meta<typeof ScheduleDateAccordion> = {
  title: 'Features/ActivityForm/ScheduleDateAccordion',
  component: ScheduleDateAccordion,
  args: {
    defaultOpen: false,
  },
};

export default meta;

type Story = StoryObj<typeof ScheduleDateAccordion>;

/**
 * 기본 상태의 ScheduleDateAccordion입니다.
 *
 * - 닫힌 상태로 시작합니다.
 * - 헤더 클릭 시 패널이 열리고 닫힙니다.
 */
export const Default: Story = {
  render: () => {
    return (
      <div className='w-500'>
        <ScheduleDateAccordion>
          <ScheduleDateAccordionHeader date={new Date('2026-01-10')} onDelete={fn()} />
          <ScheduleDateAccordionPanel />
        </ScheduleDateAccordion>
      </div>
    );
  },
};

/**
 * 처음부터 열려 있는 상태의 ScheduleDateAccordion입니다.
 *
 * - `defaultOpen` 옵션을 통해 초기 열림 상태를 설정할 수 있습니다.
 */
export const DefaultOpen: Story = {
  render: () => {
    return (
      <div className='w-500'>
        <ScheduleDateAccordion defaultOpen>
          <ScheduleDateAccordionHeader date={new Date('2026-01-10')} onDelete={fn()} />
          <ScheduleDateAccordionPanel />
        </ScheduleDateAccordion>
      </div>
    );
  },
};

/**
 * 여러 날짜 아코디언을 나열한 예제입니다.
 *
 * - 실제 폼에서 날짜별 스케줄을 관리하는 상황을 가정한 예시입니다.
 */
export const MultipleAccordions: Story = {
  render: () => {
    const [dates, setDates] = useState([new Date('2026-01-09'), new Date('2026-01-10')]);

    return (
      <div className='flex w-500 flex-col gap-16'>
        {dates.map((date) => (
          <ScheduleDateAccordion key={date.toDateString()}>
            <ScheduleDateAccordionHeader
              date={date}
              onDelete={() => setDates((prev) => prev.filter((d) => d !== date))}
            />
            <ScheduleDateAccordionPanel />
          </ScheduleDateAccordion>
        ))}
      </div>
    );
  },
};
