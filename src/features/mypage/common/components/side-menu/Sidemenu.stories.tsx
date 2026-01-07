import type { Meta, StoryObj } from '@storybook/nextjs';
import Sidemenu from '@/features/mypage/common/components/side-menu/Sidemenu';
import { useUserStore } from '@/shared/stores/userStore';

/**
 * 마이페이지 사이드 메뉴 컴포넌트
 *
 * - 마이페이지 레이아웃 좌측에 고정되는 사이드바 UI로, 사용자 아바타와 마이페이지 내 주요 메뉴 링크를 제공합니다.
 *
 * ### 주요 기능
 * - 사용자 프로필 아바타 렌더링
 * - 마이페이지 관련 고정 메뉴 목록 표시
 * - 현재 URL 경로 기준 활성 메뉴 스타일 적용
 *
 * ### 사용 위치
 * - 마이페이지 공통 레이아웃의 좌측 영역
 * - 내 정보 / 예약 내역 / 체험 관리 / 예약 현황 페이지 이동
 *
 * ### 반응형 동작
 * - 모바일 화면에서는 숨김 처리
 * - 태블릿(sm) 이상 해상도에서만 노출
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

export const Default: Story = {
  decorators: [
    (Story) => {
      useUserStore.setState({
        user: {
          id: 1,
          email: 'test@example.com',
          nickname: '테스트',
          profileImageUrl: null,
          createdAt: '2025-12-24T08:50:57.848Z',
          updatedAt: '2025-12-24T08:50:57.848Z',
        },
        hasHydrated: true,
      });
      return <Story />;
    },
  ],
};
