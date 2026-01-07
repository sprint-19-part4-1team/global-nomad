import type { Meta, StoryObj } from '@storybook/nextjs';
import { ReservationStatus } from '@/shared/types/myReservations';
import { RESERVATION_STATUSES } from '../constants/common';
import { ReservationStatusBadge } from './ReservationStatusBadge';

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
