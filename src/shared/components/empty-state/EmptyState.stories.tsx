import type { Meta, StoryObj } from '@storybook/nextjs';
import EmptyState from './EmptyState';

/**
 * 데이터가 존재하지 않을 때(Empty State) 사용자에게
 * 안내 메시지와 상황에 맞는 아이콘을 보여주는 컴포넌트입니다.
 *
 * `type` 값에 따라 버튼 노출 여부와 아이콘이 달라집니다.
 *
 * ## Props
 * - `type`
 *   - 빈 상태의 사용 목적
 *   - `'experience' | 'review'`
 *
 * - `mainText`
 *   - 아이콘 하단에 표시되는 안내 문구
 *
 * - `button` (선택)
 *   - `experience` 타입에서만 사용할 수 있는 액션 버튼
 *   - `href`: 버튼 클릭 시 이동할 경로
 *   - `text`: 버튼에 표시될 텍스트
 *
 * ## 타입별 동작
 * - `experience`
 *   - 체험 데이터가 없을 때 사용
 *   - 버튼을 선택적으로 표시할 수 있음
 *
 * - `review`
 *   - 리뷰 데이터가 없을 때 사용
 *   - 버튼은 표시되지 않음
 *
 * ## 사용 예시
 * ```tsx
 * <EmptyState
 *   type="experience"
 *   mainText="체험이 없습니다."
 *   button={{ href: '/', text: '홈으로 가기' }}
 * />
 *
 * <EmptyState
 *   type="experience"
 *   mainText="체험이 없습니다."
 * />
 *
 * <EmptyState
 *   type="review"
 *   mainText="리뷰가 없습니다."
 * />
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
    button: {
      href: '/',
      text: '체험 등록하기',
    },
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
