import type { Meta, StoryObj } from '@storybook/nextjs';
import { ReservationStatusBadge } from '@/features/mypage/common/components/reservation-status-badge/ReservationStatusBadge';
import { RESERVATION_STATUSES } from '@/features/mypage/reservation-list/constants/common';
import { ReservationStatus } from '@/shared/types/myReservations';

const meta: Meta<typeof ReservationStatusBadge> = {
  title: 'Features/Mypage/Reservation-List/ReservationStatusBadge',
  component: ReservationStatusBadge,
  args: {
    status: ReservationStatus.Pending,
  },
  argTypes: {
    status: {
      control: 'select',
      options: RESERVATION_STATUSES,
    },
  },
};

export default meta;

type Story = StoryObj<typeof ReservationStatusBadge>;

export const Default: Story = {};

export const AllStatuses: Story = {
  render: () => (
    <div className='flex flex-wrap gap-8'>
      {RESERVATION_STATUSES.map((status) => (
        <ReservationStatusBadge key={status} status={status} />
      ))}
    </div>
  ),
};
