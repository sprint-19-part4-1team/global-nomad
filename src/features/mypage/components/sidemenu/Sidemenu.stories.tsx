import type { Meta, StoryObj } from '@storybook/nextjs';
import Sidemenu from '@/features/mypage/components/sidemenu/Sidemenu';
import { User } from '@/shared/types/user.type';

/**
 * 마이페이지 사이드 메뉴 컴포넌트
 *
 * 마이페이지 레이아웃의 좌측에 위치하는 사이드바 UI입니다.
 * 사용자 아바타와 함께 마이페이지 내 주요 이동 메뉴를 제공합니다.
 *
 * ### 특징
 * - 사용자 프로필 아바타 표시
 * - 마이페이지 관련 메뉴 목록 렌더링
 * - 현재 경로에 따라 활성 메뉴 스타일 적용
 *
 * ### 사용 시나리오
 * - 마이페이지 공통 레이아웃
 * - 내 정보 / 예약 내역 / 체험 관리 등 이동
 *
 * ⚠️ 모바일 뷰에서는 숨김 처리되며,
 * 태블릿(sm) 이상 해상도에서만 노출됩니다.
 */

const meta: Meta<typeof Sidemenu> = {
  title: 'Features/Mypage/Sidemenu',
  component: Sidemenu,
  argTypes: {
    user: {
      control: false,
      description: '로그인한 사용자 정보',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Sidemenu>;

// mockdata
const MOCK_USER: User = {
  createdAt: '2025-12-24T08:50:57.848Z',
  email: 'test@example.com',
  id: 1,
  nickname: '테스트',
  profileImageUrl: null,
  updatedAt: '2025-12-24T08:50:57.848Z',
};

export const Default: Story = {
  args: {
    user: MOCK_USER,
  },
};
