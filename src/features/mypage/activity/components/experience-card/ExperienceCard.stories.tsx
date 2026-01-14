import type { Meta, StoryObj } from '@storybook/nextjs';
import ExperienceCard from './ExperienceCard';

/**
 * 내 체험 관리에서 사용되는 카드 컴포넌트
 *
 * - 사용자가 등록한 활동을 카드 형태로 요약 표시합니다.
 * - 마이페이지 / 활동 관리 목록 화면에서 사용됩니다.
 * - 카드 전체 클릭 또는 키보드 입력을 통해 활동 상세 페이지로 이동할 수 있습니다.
 *
 * ### 구성
 * - 좌측: 활동 정보 (제목, 평점, 가격, 액션 버튼)
 * - 우측: 활동을 대표하는 배너 이미지
 *
 * ### UI 특징
 * - 제목은 한 줄 말줄임 처리
 * - 카드 전체가 클릭 가능한 버튼 역할을 수행
 * - 수정 / 삭제 버튼 제공
 * - 삭제 시 확인 다이얼로그를 오버레이로 표시
 *
 * ### 사용 예
 * ```tsx
 * <ExperienceCard
 *   id={1}
 *   title="서핑 원데이 클래스"
 *   price={50000}
 *   rating={4.8}
 *   reviewCount={128}
 *   bannerImageUrl="/images/surfing.jpg"
 * />
 * ```
 */
const meta: Meta<typeof ExperienceCard> = {
  title: 'Features/Mypage/Activity/ExperienceCard',
  component: ExperienceCard,
  tags: ['autodocs'],
  args: {
    id: 123,
    title: '서핑 원데이 클래스',
    price: 50000,
    rating: 4.8,
    reviewCount: 128,
    bannerImageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f',
  },
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <div className='w-680'>
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ExperienceCard>;

export const Default: Story = {};
