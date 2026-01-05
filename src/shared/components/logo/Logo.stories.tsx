import type { Meta, StoryObj } from '@storybook/nextjs';
import Logo from './Logo';

/**
 * Logo 컴포넌트 스토리 가이드
 *
 * - Logo는 로그인과 header를 분리하여 사용합니다.
 * - 화면크기에 따라 다른 svg가 보입니다.
 *
 * 사용 규칙
 * - variant는 'header' | 'login' 중 하나만 허용됩니다.
 * - 기본 값은 header 입니다.
 */

const meta: Meta<typeof Logo> = {
  title: 'Shared/Logo',
  component: Logo,
  argTypes: {
    variant: {
      control: 'select',
      options: ['header', 'login'],
      description: "로고를 사용할 위치 ('header' | 'login')",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    variant: 'header',
  },
};

export const Login: Story = {
  args: {
    variant: 'login',
  },
};
