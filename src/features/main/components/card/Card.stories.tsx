import type { Meta, StoryObj } from '@storybook/nextjs';
import Card from './Card';

/**
 * Activity Card 컴포넌트
 *
 * @description
 * 액티비티 목록 화면에서 사용되는 요약 카드 컴포넌트입니다.
 * 배너 이미지, 제목, 평점/리뷰 수, 가격 정보를 한 번에 보여주며
 * 카드 전체를 클릭하면 해당 액티비티의 상세 페이지로 이동합니다.
 *
 * ---
 *
 * ### UI 구성
 * - 상단: 액티비티 배너 이미지
 * - 하단: 제목, 평점 / 리뷰 수, 1인 기준 가격
 *
 * ### UX 포인트
 * - 카드 전체가 클릭 영역
 * - 제목은 한 줄 말줄임 처리
 * - 가격은 숫자 포맷(`formatValue`) 적용
 *
 * ### 사용 예
 * ```tsx
 * <Card
 *   id={1}
 *   bannerImageUrl="/images/activity.jpg"
 *   title="제주 서핑 클래스"
 *   rating={4.8}
 *   reviewCount={120}
 *   price={35000}
 * />
 * ```
 */
const meta: Meta<typeof Card> = {
  title: 'Features/Main/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '액티비티 목록에서 사용되는 카드 컴포넌트로, 이미지 · 제목 · 평점 · 가격 정보를 요약해서 보여줍니다.',
      },
    },
  },
  args: {
    id: 1,
    bannerImageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f',
    title: '제주 서핑 원데이 클래스',
    rating: 4.8,
    reviewCount: 128,
    price: 35000,
  },
  decorators: [
    (Story) => (
      <div className='w-320 overflow-hidden rounded-18 sm:rounded-32'>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {};
