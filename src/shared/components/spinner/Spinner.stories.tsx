import type { Meta, StoryObj } from '@storybook/nextjs';
import { ReactNode } from 'react';
import Spinner from '@/shared/components/spinner/Spinner';

/**
 * Spinner 컴포넌트 스토리 가이드
 *
 * ### **주요 특징**
 * - 간단한 로딩 상태를 표현하기 위한 스피너 컴포넌트입니다.
 * - 부모 요소의 `color` 값을 상속하여 스피너의 색상이 결정됩니다.
 * - 크기(`size`)와 두께(`borderWidth`)를 조절할 수 있습니다.
 *
 * ### **사용 규칙**
 * - `size` 대비 `borderWidth`가 과도하게 크면 스피너가 원형이 아닌 파이 형태로 보일 수 있어서 적절한 조절이 필요합니다.
 * - 스피너의 `size`가 작을수록 `borderWidth`는 얇게 설정하는 것을 권장합니다.
 */
const meta: Meta<typeof Spinner> = {
  title: 'Shared/Spinner',
  component: Spinner,
  globals: {
    backgrounds: { value: 'dark' },
  },
  argTypes: {
    size: {
      control: { type: 'number' },
      description: '스피너 크기(px)',
      defaultValue: 16,
    },
    borderWidth: {
      control: { type: 'number' },
      description: '스피너 테두리 두께(px)',
      defaultValue: 16,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

/** 스토리 렌더용 배경 */
const SpinnerWrapper = ({ children }: { children: ReactNode }) => (
  <div className='flex items-center gap-20 text-primary-500'>{children}</div>
);

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: '기본 스피너 형태입니다.',
      },
    },
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      description: {
        story: '`size` 값에 따라 달라지는 스피너 크기를 비교합니다. ',
      },
    },
  },
  render: () => (
    <SpinnerWrapper>
      <Spinner size={12} />
      <Spinner size={16} />
      <Spinner size={32} borderWidth={5} />
    </SpinnerWrapper>
  ),
};

export const BorderWidth: Story = {
  parameters: {
    docs: {
      description: {
        story: '`borderWidth` 값에 따른 스피너 두께 변화를 비교합니다. ',
      },
    },
  },
  render: () => (
    <SpinnerWrapper>
      <Spinner size={24} borderWidth={1} />
      <Spinner size={24} borderWidth={2} />
      <Spinner size={24} borderWidth={3} />
    </SpinnerWrapper>
  ),
};
