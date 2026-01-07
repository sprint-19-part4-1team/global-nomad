import type { Meta, StoryObj } from '@storybook/nextjs';
import { ReservationStatus } from '@/shared/types/myReservations';
import ReservationCard from './ReservationCard';

const meta: Meta<typeof ReservationCard> = {
  title: 'features/mypage/reservation-list/ReservationCard',
  component: ReservationCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
마이페이지 예약 목록에서 사용되는 예약 카드 컴포넌트입니다.

### 표시 정보
- 예약 상태(배지)
- 체험 제목
- 일정(날짜 + 시작/종료 시간)
- 총 결제 금액
- 예약 인원

### 상태별 UI
- **Pending**: "예약 취소" 버튼 표시
- **Completed + reviewSubmitted=false**: "후기 작성" 버튼 표시
- **Completed + reviewSubmitted=true**: 이미지 오버레이 + 완료 아이콘 표시
`,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className='w-642 max-w-[90vw]'>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    date: {
      control: { type: 'text' },
      description: '예약 날짜 (YYYY-MM-DD)',
    },
    status: {
      control: { type: 'select' },
      options: [...Object.values(ReservationStatus), 'canceled'],
      description: '예약 상태',
    },
  },
};

export default meta;

type Story = StoryObj<typeof ReservationCard>;

const baseArgs = {
  title: '함께 배우면 즐거운 스트릿 댄스',
  date: '2026-01-07',
  startTime: '10:00',
  endTime: '12:00',
  totalPrice: 50000,
  headCount: 2,
  imageUrl: '/og-default.png',
};

export const Canceled: Story = {
  args: {
    ...baseArgs,
    status: 'canceled' as ReservationStatus,
    reviewSubmitted: false,
  },
};

export const Pending: Story = {
  args: {
    ...baseArgs,
    status: ReservationStatus.Pending,
    reviewSubmitted: false,
    onCancel: () => {},
  },
};

export const CompletedNoReview: Story = {
  args: {
    ...baseArgs,
    status: ReservationStatus.Completed,
    reviewSubmitted: false,
    onWriteReview: () => {},
  },
};

export const CompletedWithReview: Story = {
  args: {
    ...baseArgs,
    status: ReservationStatus.Completed,
    reviewSubmitted: true,
  },
};
