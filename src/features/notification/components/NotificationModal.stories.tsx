import type { Meta, StoryObj } from '@storybook/nextjs';
import type { Notification } from './NotificationItem';
import NotificationModal from './NotificationModal';

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: '스트릿댄스 체험',
    date: '2026-01-12 10:00~11:00',
    status: 'confirmed',
    updatedAt: '2026-01-12T01:00:00.000Z',
  },
  {
    id: 2,
    title: '스트릿 댄스 체험험',
    date: '2026-01-11 10:00~11:00',
    status: 'declined',
    updatedAt: '2026-01-11T01:00:00.000Z',
  },
];

const meta: Meta<typeof NotificationModal> = {
  title: 'Shared/NotificationModal',
  component: NotificationModal,
  parameters: {},
  decorators: [
    (Story) => (
      <div className='relative h-400 w-800 bg-gray-50 p-24'>
        <div className='absolute top-0 right-0'>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NotificationModal>;

export const Default: Story = {
  args: {
    notifications: mockNotifications,
    onDeleteAll: async () => {},
    onDeleteOne: (id: number) => {
      void id;
    },
  },
};
