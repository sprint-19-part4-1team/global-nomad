import type { Meta, StoryObj } from '@storybook/nextjs';
import Avatar from '@/shared/components/avatar/Avatar';

interface AvatarStoryProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  src?: string;
  name?: string;
  imageClassName?: string;
}

const meta: Meta<AvatarStoryProps> = {
  title: 'shared/Avatar',
  render: (args) => {
    const { size, className, src, name } = args;
    return (
      <Avatar size={size} className={className}>
        <Avatar.Image src={src} name={name} />
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
