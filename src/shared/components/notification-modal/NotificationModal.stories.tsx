import type { Meta, StoryObj } from '@storybook/nextjs';
import { mockNotifications } from '@/shared/components/notification-modal/__mocks__/notifications';
import NotificationModal from './NotificationModal';

const meta: Meta<typeof NotificationModal> = {
  title: 'Shared/NotificationModal',
  component: NotificationModal,
  parameters: {},
  decorators: [
    (Story) => (
      <div className='p-24'>
        <div id='overlay-root'>
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
    onDeleteAll: async () => {
      // storybook debug
    },
    onDeleteOne: async (id: number) => {
      // storybook debug
      void id;
    },
  },
};
