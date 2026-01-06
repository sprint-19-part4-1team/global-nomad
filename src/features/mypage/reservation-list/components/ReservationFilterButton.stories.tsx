import type { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import {
  RESERVATION_STATUSES,
  ReservationStatusType,
} from '@/features/mypage/reservation-list/constants/common';
import ReservationFilterButton from './ReservationFilterButton';

const meta: Meta<typeof ReservationFilterButton> = {
  title: 'Features/Mypage/Reservation-List/ReservationFilterButton',
  component: ReservationFilterButton,
  argTypes: {
    status: {
      control: 'select',
      options: RESERVATION_STATUSES,
    },
    isActive: {
      control: 'boolean',
    },
    onSelect: {
      action: 'onSelect',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ReservationFilterButton>;

/**
 * 단일 버튼 상태 확인용
 */
export const Default: Story = {
  args: {
    status: 'pending',
    isActive: false,
  },
};

/**
 * 실제 화면과 동일한 인터랙션 확인용
 * - 하나만 active
 * - 클릭 시 선택 상태 변경
 */
export const Interactive: Story = {
  render: () => {
    const [selectedStatus, setSelectedStatus] = useState<ReservationStatusType | null>(null);

    return (
      <div className='flex gap-8'>
        {RESERVATION_STATUSES.map((status) => (
          <ReservationFilterButton
            key={status}
            status={status}
            isActive={selectedStatus === status}
            onSelect={setSelectedStatus}
          />
        ))}
      </div>
    );
  },
};
