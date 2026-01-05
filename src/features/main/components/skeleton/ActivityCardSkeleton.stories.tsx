import { Meta, StoryObj } from '@storybook/nextjs';
import ActivityCardSkeleton from '@/features/main/components/skeleton/ActivityCardSkeleton';

/**
 * ActivityCardSkeleton 컴포넌트 스토리 가이드
 *
 * ActivityCardSkeleton은 메인 화면의 체험 카드 로딩 상태를 표시하는 스켈레톤 UI 컴포넌트입니다.<br/>
 * 이미지, 제목, 별점, 가격 정보의 로딩 상태를 시각적으로 표현합니다.
 *
 * ### 주요 특징
 * - 두 가지 크기 변형 제공 (default: 328x243px, popular: 131x243px)
 * - 실제 카드와 동일한 구조로 로딩 상태 표현
 * - animate-pulse를 통한 자연스러운 로딩 애니메이션 제공
 * - 접근성을 위한 ARIA 속성 포함 (role, aria-busy, aria-label)
 *
 * ### Props 설명
 * - `variant`: 카드 스타일 변형 ('default': 기본 크기, 'popular': 작은 크기)
 * - `className`: 추가 CSS 클래스명 (선택)
 */
const meta: Meta<typeof ActivityCardSkeleton> = {
  title: 'Features/Main/ActivityCardSkeleton',
  component: ActivityCardSkeleton,
  render: (args) => <ActivityCardSkeleton {...args} />,
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'popular'],
      description: '카드 스타일 변형 ("default": 328x243px, "popular": 131x243px)',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스명',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActivityCardSkeleton>;

/**
 * 기본
 *
 * 메인 화면의 일반 체험 카드 로딩 상태를 표시하는 기본 크기(328x243px) Skeleton입니다. </br>
 * 모든 섹션의 체험 카드 리스트에 사용됩니다.
 */
export const Default: Story = {
  args: {
    variant: 'default',
  },
};

/**
 * 인기 체험
 *
 * 메인 화면의 인기 체험 섹션의 카드 로딩 상태를 표시하는 작은 크기(131x243px) Skeleton입니다. </br>
 * 인기 체험 섹션의 체험 카드 리스트에 사용됩니다.
 */
export const Popular: Story = {
  args: {
    variant: 'popular',
  },
};
