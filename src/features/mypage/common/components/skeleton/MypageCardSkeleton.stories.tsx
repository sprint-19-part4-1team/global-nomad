import { Meta, StoryObj } from '@storybook/nextjs';
import MypageCardSkeleton from '@/features/mypage/common/components/skeleton/MypageCardSkeleton';

/**
 * MypageCardSkeleton 컴포넌트 스토리 가이드
 *
 * MypageCardSkeleton은 마이페이지의 예약/내 체험 카드 로딩 상태를 표시하는 스켈레톤 UI 컴포넌트입니다.<br/>
 * 예약 내역과 내 체험 관리의 로딩 상태를 시각적으로 표현합니다.
 *
 * ### 주요 특징
 * - 두 가지 레이아웃 변형 제공 (reservation: 이미지가 카드 밖, activity: 이미지가 카드 안)
 * - 실제 카드와 동일한 구조로 로딩 상태 표현
 * - animate-pulse를 통한 자연스러운 로딩 애니메이션 제공
 * - 접근성을 위한 ARIA 속성 포함 (role, aria-busy, aria-label)
 *
 * ### Props 설명
 * - `variant`: 카드 스타일 변형 ('reservation': 예약 카드, 'activity': 내 체험 카드)
 * - `className`: 추가 CSS 클래스명 (선택)
 */
const meta: Meta<typeof MypageCardSkeleton> = {
  title: 'Features/Mypage/Common/MypageCardSkeleton',
  component: MypageCardSkeleton,
  render: (args) => (
    <div className='w-327 bg-gray-500 px-20 py-20 sm:w-486 lg:w-642'>
      <MypageCardSkeleton {...args} />
    </div>
  ),
  argTypes: {
    variant: {
      control: 'select',
      options: ['reservation', 'activity'],
      description:
        '카드 스타일 변형 ("reservation": 예약 카드 - 이미지가 카드 밖, "activity": 내 체험 카드 - 이미지가 카드 안)',
    },
    className: {
      control: 'text',
      description: '추가 CSS 클래스명',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MypageCardSkeleton>;

/**
 * 예약 내역
 *
 * 마이페이지의 예약 내역 카드 로딩 상태를 표시하는 Skeleton입니다. </br>
 * 이미지가 카드 밖 오른쪽에 위치하며, 뱃지, 제목, 예약 정보, 버튼 영역을 포함합니다.
 */
export const Reservation: Story = {
  args: {
    variant: 'reservation',
  },
};

/**
 * 내 체험 관리
 *
 * 마이페이지의 내 체험 관리 카드 로딩 상태를 표시하는 Skeleton입니다. </br>
 * 이미지가 카드 안 오른쪽에 위치하며, 제목, 별점, 가격, 버튼 영역을 포함합니다.
 */
export const Activity: Story = {
  args: {
    variant: 'activity',
  },
};
