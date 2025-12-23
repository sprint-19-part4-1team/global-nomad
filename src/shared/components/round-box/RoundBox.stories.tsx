import type { Meta, StoryObj } from '@storybook/nextjs';
import RoundBox from './RoundBox';

/**
 * RoundBox 컴포넌트 스토리 가이드
 *
 * - RoundBox는 레이아웃/컨테이너 역할의 공통 컴포넌트입니다.
 * - radius prop을 통해 디자인 시스템에서 정의된 곡률만 선택할 수 있습니다.
 *
 * 사용 규칙
 * - radius는 '24' | '32' 중 하나만 허용됩니다.
 * - className은 레이아웃/배경/여백 등 컨테이너 스타일 확장 용도로 사용합니다.
 */

const meta: Meta<typeof RoundBox> = {
  title: 'Shared/RoundBox',
  component: RoundBox,
  tags: ['autodocs'],
  argTypes: {
    radius: {
      control: 'select',
      options: ['24', '32'],
      description: "테두리 곡률 ('24' | '32')",
    },
    className: {
      control: 'text',
      description: '추가 컨테이너 스타일 (레이아웃/여백/배경 등)',
    },
    children: {
      control: 'text',
      description: 'RoundBox 내부 콘텐츠',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RoundBox>;

export const Default: Story = {
  args: {
    radius: '24',
    className: 'p-10 bg-gray-50',
    children: '컨텐츠 영역',
  },
};

export const Radius32: Story = {
  args: {
    radius: '32',
    className: 'p-10 bg-gray-50',
    children: 'Radius 32',
  },
};
