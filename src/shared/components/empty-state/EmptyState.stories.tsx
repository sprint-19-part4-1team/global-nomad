import type { Meta, StoryObj } from '@storybook/nextjs';
import EmptyState from './EmptyState';

/**
 * 데이터가 존재하지 않는 경우 사용자에게 안내 문구와 액션 버튼을 제공하는 컴포넌트입니다!
 *
 * - type: 사용처 유형 (`experience` | `review`)
 * - mainText: 아이콘 하단에 표시될 텍스트
 * - btnURL: (선택) 버튼을 누르면 이동시킬 경로
 * - btnText: (선택) 버튼에 표시될 텍스트
 *
 * ###사용 예시
 * ```tsx
 * <EmptyState type='experience' mainText='체험이 없음요' btnURL='/' btnText='홈으로 가기' />
 * <EmptyState type='experience' mainText='체험도 없고 버튼도 없음요' />
 * <EmptyState type='review' mainText='리뷰가 없음요' />
 * ```
 */

const meta: Meta<typeof EmptyState> = {
  title: 'Shared/EmptyState',
  component: EmptyState,
  parameters: {},
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['experience', 'review'],
      description: '빈 상태 유형 (experience | review)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof EmptyState>;

export const ExperienceWithButton: Story = {
  name: 'experience(버튼 있음)',
  args: {
    type: 'experience',
    mainText: '체험이 없습니다.',
    btnURL: '/',
    btnText: '체험 등록하기',
  },
};

export const ExperienceWithoutButton: Story = {
  name: 'experience(버튼 없음)',
  args: {
    type: 'experience',
    mainText: '체험이 없습니다. (버튼 없음)',
  },
};

export const Review: Story = {
  name: 'review',
  args: {
    type: 'review',
    mainText: '리뷰가 없습니다.',
  },
};
