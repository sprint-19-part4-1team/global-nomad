import type { Meta, StoryObj } from '@storybook/nextjs';
import Avatar from '@/shared/components/avatar/Avatar';

/**
 * Storybook에서 Avatar 컴포넌트를 제어하기 위한 Props 타입
 * Avatar와 Avatar.Image의 props를 결합한 형태
 */
interface AvatarStoryProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  src?: string;
  name?: string;
  imageClassName?: string;
}

/**
 * Avatar 컴포넌트 스토리 가이드
 *
 * Avatar는 헤더와 마이페이지에서 사용하는 사용자 프로필 이미지 컴포넌트입니다.
 *
 * ### 주요 특징
 * - 3가지 크기 지원 (sm: 30px, md: 70px, lg: 120px)
 * - 이미지 없을 시 자동 Fallback 아이콘 표시
 * - Avatar와 Avatar.Image 각각 독립적인 스타일링 가능
 *
 * ### 사용 규칙
 * - `size` : 'sm' | 'md' | 'lg' 중 하나만 지정 가능
 * - `className` : Avatar 컨테이너의 추가 스타일 (마진, 테두리 등)
 * - `src` : 이미지 URL (없으면 Fallback 아이콘 자동 표시)
 * - `name` : 접근성 레이블 (기본값: '유저 아바타')
 * - `imageClassName` : Avatar.Image의 추가 스타일 (필터, 투명도 등)
 */

const meta: Meta<AvatarStoryProps> = {
  title: 'shared/Avatar',
  render: (args) => {
    const { size, className, src, name, imageClassName } = args;
    return (
      <Avatar size={size} className={className}>
        <Avatar.Image src={src} name={name} className={imageClassName} />
      </Avatar>
    );
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: "Avatar 크기 ('sm' | 'md' | 'lg')",
    },
    className: {
      control: 'text',
      description: 'Avatar 추가 스타일 (마진, 테두리, 그림자 등)',
    },
    // Avatar.Image pops
    src: {
      control: 'text',
      description: 'Avatar 이미지 SRC (비어 있으면 Fallback 아이콘 표시)',
    },
    name: {
      control: 'text',
      description: "Avatar 이미지 대체 텍스트 (비어 있으면 '유저 아바타' 설정)",
    },
    imageClassName: {
      control: 'text',
      description: 'Avatar.Image 추가 스타일 (필터, 투명도 등)',
    },
  },
};

export default meta;
type Story = StoryObj<AvatarStoryProps>;

export const Default: Story = {
  args: {
    size: 'sm',
    className: '',
    src: '',
    name: '유저 아바타',
    imageClassName: '',
  },
};

export const WithImage: Story = {
  args: {
    size: 'md',
    className: '',
    src: 'https://github.com/shadcn.png',
    name: 'Test',
    imageClassName: '',
  },
};
