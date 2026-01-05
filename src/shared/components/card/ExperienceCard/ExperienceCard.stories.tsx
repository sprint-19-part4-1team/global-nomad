import type { Meta, StoryObj } from '@storybook/nextjs';
import ExperienceCard from './ExperienceCard';

/**
 * 내 체험 관리에서 사용되는 카드 컴포넌트
 *
 * - 사용자가 등록한 활동을 카드 형태로 요약 표시하는 컴포넌트
 * - 마이페이지 / 활동 관리 목록 화면에서 사용
 * - 좌측에는 활동 정보(제목, 평점, 가격, 액션 버튼)
 * - 우측에는 반응형 배너 이미지 표시
 *
 * ### UI 특징
 * - 제목은 한 줄 말줄임 처리
 * - 이미지 영역은 고정 크기 + 반응형 대응
 * - 수정 / 삭제 버튼을 통한 액션 제공
 *
 * ### 사용 예
 * ```tsx
 * <ExperienceCard
 *   title="서핑 원데이 클래스"
 *   price={50000}
 *   rating={4.8}
 *   reviewCount={128}
 *   bannerImageUrl="/images/surfing.jpg"
 * />
 * ```
 */

const meta: Meta<typeof ExperienceCard> = {
  title: 'Shared/Card/ExperienceCard',
  component: ExperienceCard,
  tags: ['autodocs'],
  args: {
    title: '서핑 원데이 클래스',
    price: 50000,
    rating: 4.8,
    reviewCount: 128,
    bannerImageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f',
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ExperienceCard>;

export const Default: Story = {};
