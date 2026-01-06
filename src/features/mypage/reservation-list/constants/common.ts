import { cva } from 'class-variance-authority';

export const RESERVATION_STATUSES = [
  'pending',
  'confirmed',
  'declined',
  'canceled',
  'completed',
] as const;
export type ReservationStatusType = (typeof RESERVATION_STATUSES)[number];

export const RESERVATION_STATUS_LABEL: Record<ReservationStatusType, string> = {
  pending: '예약 완료',
  confirmed: '예약 승인',
  declined: '예약 거절',
  canceled: '예약 취소',
  completed: '체험 완료',
};

/** 공통: 상태별 배경색 */
export const statusBackgroundVariants = cva('', {
  variants: {
    status: {
      pending: 'bg-green-100',
      confirmed: 'bg-dark-green-100',
      declined: 'bg-red-100',
      canceled: 'bg-gray-100',
      completed: 'bg-primary-200',
    },
  },
});

/** 공통: 상태별 글자색 */
export const statusTextVariants = cva('', {
  variants: {
    status: {
      pending: 'text-green-500',
      confirmed: 'text-dark-green-500',
      declined: 'text-red-400',
      canceled: 'text-gray-500',
      completed: 'text-primary-600',
    },
  },
});
