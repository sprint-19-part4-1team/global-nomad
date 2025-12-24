import type { Meta, StoryObj } from '@storybook/nextjs';
import { AvatarFallback, AvatarImage } from '@/shared/components/avatar';
import Avatar from '@/shared/components/avatar/Avatar';
import { User } from '@/shared/types/user';

/**
 * Storybook에서 Avatar 컴포넌트를 제어하기 위한 Props 타입
 *
 * Avatar와 하위 컴포넌트(AvatarImage, AvatarFallback)의 props를 결합한 형태
 *
 * @property {User} user - 사용자 정보
 * @property {'sm' | 'md' | 'lg'} [size] - 아바타 크기
 * @property {string} [className] - Avatar 컨테이너 추가 스타일
 * @property {string} [imageClassName] - AvatarImage 추가 스타일
 * @property {string} [fallbackClassName] - AvatarFallback 추가 스타일
 */
interface AvatarStoryProps {
  user: User;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
}

/**
 * Avatar 컴포넌트 스토리 가이드
 *
 * Avatar는 헤더와 마이페이지에서 사용하는 사용자 프로필 이미지 컴포넌트입니다.
 *
 * ### 주요 특징
 * - 3가지 크기 지원 (sm: 30px, md: 70px/120px(반응형), lg: 120px)
 * - Context API를 통한 상태 관리로 이미지 로딩 실패 시 자동 Fallback 표시
 * - Avatar와 하위 컴포넌트 각각 독립적인 스타일링 가능
 *
 * ### Props 설명
 * - `user`: 필수 사용자 정보 (id, nickname, profileImageUrl 등)
 * - `size`: 아바타 크기 ('sm' | 'md' | 'lg')
 * - `className`: Avatar 컨테이너의 추가 스타일 (마진, 테두리 등)
 * - `imageClassName`: AvatarImage의 추가 스타일 (필터, 투명도 등)
 * - `fallbackClassName`: AvatarFallback의 추가 스타일 (색상, 크기 등)
 */

const meta: Meta<AvatarStoryProps> = {
  title: 'shared/Avatar',
  render: (args) => {
    const { user, size, className, imageClassName, fallbackClassName } = args;
    return (
      <Avatar user={user} size={size} className={className}>
        <AvatarImage className={imageClassName} />
        <AvatarFallback className={fallbackClassName} />
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
    // AvatarImage pops
    imageClassName: {
      control: 'text',
      description: 'AvatarImage 추가 스타일 (필터, 투명도 등)',
    },
    // AvatarFallback pops
    fallbackClassName: {
      control: 'text',
      description: 'AvatarFallback 추가 스타일 (필터, 투명도 등)',
    },
  },
};

export default meta;
type Story = StoryObj<AvatarStoryProps>;

// Mock 사용자 데이터 - 프로필 이미지 없음
const defaultUser: User = {
  id: 1,
  email: 'test@example.com',
  nickname: '테스트',
  profileImageUrl: null,
  createdAt: '2025-12-24T08:50:57.848Z',
  updatedAt: '2025-12-24T08:50:57.848Z',
};

// Mock 사용자 데이터 - 프로필 이미지 있음
const withImageUser: User = {
  id: 1,
  email: 'test@example.com',
  nickname: '이미지 테스트',
  profileImageUrl: 'https://github.com/shadcn.png',
  createdAt: '2025-12-24T08:50:57.848Z',
  updatedAt: '2025-12-24T08:50:57.848Z',
};

/**
 * 기본 상태 (프로필 이미지 없음)
 * Fallback 아이콘이 표시됩니다
 */
export const Default: Story = {
  args: {
    user: defaultUser,
    size: 'sm',
    className: '',
    imageClassName: '',
    fallbackClassName: '',
  },
};

/**
 * 프로필 이미지가 있는 경우
 * 사용자의 프로필 이미지가 표시됩니다
 */
export const WithImage: Story = {
  args: {
    user: withImageUser,
    size: 'md',
    className: '',
    imageClassName: '',
    fallbackClassName: '',
  },
};

/**
 * 크기별 비교
 * sm, md, lg 크기를 한눈에 비교할 수 있습니다
 */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <Avatar user={defaultUser} size='sm'>
        <AvatarImage />
        <AvatarFallback />
      </Avatar>
      <Avatar user={defaultUser} size='md'>
        <AvatarImage />
        <AvatarFallback />
      </Avatar>
      <Avatar user={defaultUser} size='lg'>
        <AvatarImage />
        <AvatarFallback />
      </Avatar>
    </div>
  ),
};
