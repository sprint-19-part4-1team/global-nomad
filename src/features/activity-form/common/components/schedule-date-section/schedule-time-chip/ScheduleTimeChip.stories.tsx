import { Meta, StoryObj } from '@storybook/nextjs';
import ScheduleTimeChip from '@/features/activity-form/common/components/schedule-date-section/schedule-time-chip/ScheduleTimeChip';

/**
 * ScheduleTimeChip 컴포넌트 스토리 가이드
 *
 * ### **주요 특징**
 * - 선택된 예약 시간을 시각적으로 표시하는 칩(Chip) 컴포넌트입니다.
 * - 시간 텍스트와 함께 삭제 버튼을 제공합니다.
 */
const meta: Meta<typeof ScheduleTimeChip> = {
  title: 'features/activity-form/ScheduleTimeChip',
  component: ScheduleTimeChip,
  argTypes: {
    onRemove: {
      action: 'remove clicked',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ScheduleTimeChip>;

export const Default: Story = {
  args: {
    startTime: '10:00',
    endTime: '11:00',
  },
};
