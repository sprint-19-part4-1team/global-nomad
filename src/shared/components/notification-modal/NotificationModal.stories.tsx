import type { Meta, StoryObj } from '@storybook/nextjs';
import { mockNotifications } from '@/shared/components/notification-modal/__mocks__/notifications';
import NotificationModal from './NotificationModal';

const meta: Meta<typeof NotificationModal> = {
  title: 'Shared/NotificationModal',
  component: NotificationModal,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'gray',
      values: [{ name: 'gray', value: '#F8F8F8' }],
    },
  },
  decorators: [
    (Story) => (
      <div className='p-24'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NotificationModal>;

export const Default: Story = {
  args: {
    notifications: mockNotifications,
  },
};
