import { Meta, StoryObj } from '@storybook/nextjs';
import Skeleton from './Skeleton';

/**
 * Skeleton 컴포넌트 스토리 가이드
 *
 * Skeleton은 콘텐츠 로딩 중 표시되는 애니메이션 플레이스홀더 컴포넌트입니다.<br/>
 * className을 통해 크기와 스타일을 지정하여 다양한 형태의 스켈레톤을 생성할 수 있습니다.
 *
 * ### 주요 특징
 * - className을 통한 width, height, border-radius, 배경색 등 스타일링 지원
 * - animate-pulse를 통한 자연스러운 로딩 애니메이션 제공
 * - 텍스트 라인, 박스, 원형 아바타 등 다양한 형태로 활용 가능
 *
 * ### Props 설명
 * - `className`: CSS 클래스 (width, height, border-radius, 배경색 등) (필수)
 */

const meta: Meta<typeof Skeleton> = {
  title: 'Shared/Skeleton',
  component: Skeleton,
  render: (args) => <Skeleton {...args} />,
  argTypes: {
    className: {
      control: 'text',
      description: 'CSS 클래스 (width, height, border-radius, 배경색 등을 지정)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

/**
 * 기본 상태
 *
 * 가장 기본적인 형태의 Skeleton입니다.
 */
export const Default: Story = {
  args: {
    className: 'h-36 w-76',
  },
};

/**
 * 정사각형 Box
 *
 * 이미지나 썸네일 영역을 표시하는 박스형 Skeleton입니다.
 * rounded-24를 통해 둥근 모서리가 적용됩니다.
 */
export const Box: Story = {
  args: {
    className: 'h-152 w-152 rounded-24',
  },
};

/**
 * 텍스트 Line
 *
 * 텍스트 로딩을 표시하는 라인형 Skeleton입니다.
 * 제목, 본문 등 다양한 텍스트 영역에 활용할 수 있습니다.
 */
export const Line: Story = {
  args: {
    className: 'h-26 w-200 rounded',
  },
};

/**
 * 원형 Avatar
 *
 * 사용자 프로필 이미지 영역 등을 표시하는 원형 Skeleton입니다.
 * rounded-full을 통해 완전한 원형으로 표시됩니다.
 */
export const Avatar: Story = {
  args: {
    className: 'h-60 w-60 rounded-full',
  },
};
