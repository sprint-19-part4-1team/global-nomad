import { ReservationStatus } from '@/shared/types/myReservations';

export const RESERVATION_STATUSES = [
  ReservationStatus.Pending,
  ReservationStatus.Canceled,
  ReservationStatus.Declined,
  ReservationStatus.Confirmed,
  ReservationStatus.Completed,
] as const;

export const RESERVATION_STATUS_LABEL: Record<ReservationStatus, string> = {
  [ReservationStatus.Pending]: '예약 완료',
  [ReservationStatus.Canceled]: '예약 취소',
  [ReservationStatus.Declined]: '예약 거절',
  [ReservationStatus.Confirmed]: '예약 승인',
  [ReservationStatus.Completed]: '체험 완료',
};

/** 공통: 상태별 배경색 */
export const statusBackgroundVariants: Record<ReservationStatus, string> = {
  [ReservationStatus.Pending]: 'bg-green-100',
  [ReservationStatus.Canceled]: 'bg-gray-100',
  [ReservationStatus.Declined]: 'bg-red-100',
  [ReservationStatus.Confirmed]: 'bg-dark-green-100',
  [ReservationStatus.Completed]: 'bg-primary-200',
};

/** 공통: 상태별 글자색 */
export const statusTextVariants: Record<ReservationStatus, string> = {
  [ReservationStatus.Pending]: 'text-green-500',
  [ReservationStatus.Canceled]: 'text-gray-500',
  [ReservationStatus.Declined]: 'text-red-500',
  [ReservationStatus.Confirmed]: 'text-dark-green-500',
  [ReservationStatus.Completed]: 'text-primary-600',
};
