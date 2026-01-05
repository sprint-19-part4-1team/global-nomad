import type { Meta, StoryObj } from '@storybook/nextjs';
import MypageSectionHeader from '@/features/mypage/components/mypage-section-header/MypageSectionHeader';

/**
 * 마이페이지 섹션 상단에 사용되는 헤더 컴포넌트
 *
 * 제목(title), 설명(description), 선택적인 버튼 영역(btn)을 렌더링합니다.
 * 버튼 유무에 따라 반응형 padding과 레이아웃이 자동으로 조절됩니다.
 *
 * @param title - 섹션의 메인 제목 텍스트
 * @param description - 섹션 설명 텍스트
 * @param btn - 우측 상단 버튼 영역 노출 여부
 *
 * @example
 * ```tsx
 * <MypageSectionHeader
 *   title="내 정보"
 *   description="회원 정보를 확인할 수 있습니다. 필요 시 수정도 가능합니다."}
 *   btn
 * />
 * ```
 */

const meta: Meta<typeof MypageSectionHeader> = {
  title: 'Features/Mypage/MypageSectionHeader',
  component: MypageSectionHeader,
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    title: {
      control: 'text',
      description: '섹션의 메인 제목',
    },
    description: {
      control: 'text',
      description: '섹션 설명 텍스트 (줄바꿈 가능)',
    },
    btn: {
      control: 'boolean',
      description: '우측 상단 버튼 영역 노출 여부',
    },
  },
};

export default meta;

type Story = StoryObj<typeof MypageSectionHeader>;

export const Default: Story = {
  args: {
    title: '내 정보',
    description: '회원 정보를 확인할 수 있습니다.',
    btn: false,
  },
};

/**
 * 버튼이 있는 경우
 * sm 이상 해상도에서 우측 여백이 추가됨
 */
export const WithButton: Story = {
  args: {
    title: '체험 관리',
    description: '체험을 등록하거나 수정 및 삭제가 가능합니다.',
    btn: true,
  },
};
