import type { Meta, StoryObj } from '@storybook/nextjs';
import { User } from '@/shared/types/user';
import Header from './Header';

/**
 * Header 컴포넌트 스토리
 *
 * - 전역 상단 헤더 컴포넌트
 * - 로그인 상태에 따라 서로 다른 UI를 렌더링합니다.
 * - 화면 크기에 따라 일부 크기가 변경됩니다.
 *
 * 상태 구분
 * - 비로그인: 로그인 / 회원가입 버튼 노출합니다.
 * - 로그인: 알림 영역 + 아바타 + 닉네임 노출합니다.
 */

const meta: Meta<typeof Header> = {
  title: 'Shared/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isLoggedIn: {
      control: 'boolean',
      description: '로그인 여부 확인',
    },
    nickname: {
      control: 'text',
      description: '사용자 닉네임',
    },
    user: {
      control: false,
      description: '로그인한 사용자 정보',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

// mockdata
const mockUser: User = {
  createdAt: '2025-12-24T08:50:57.848Z',
  email: 'test@example.com',
  id: 1,
  nickname: '테스트',
  profileImageUrl: null,
  updatedAt: '2025-12-24T08:50:57.848Z',
};

export const Guest: Story = {
  args: {
    isLoggedIn: false,
  },
  argTypes: {
    isLoggedIn: {
      table: { disable: true },
    },
    nickname: {
      table: { disable: true },
    },
  },
};

export const LoggedIn: Story = {
  args: {
    isLoggedIn: true,
    user: mockUser,
    nickname: mockUser.nickname,
  },
};
