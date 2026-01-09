import { ReservationStatus } from '@/shared/types/myReservations';

export const RESERVATION_EMPTY_TEXT: Record<ReservationStatus, string> = {
  [ReservationStatus.Pending]: '아직 예약한 체험이 없어요.',
  [ReservationStatus.Canceled]: '예약을 취소한 내역이 없어요.',
  [ReservationStatus.Declined]: '거절된 예약이 없어요.',
  [ReservationStatus.Confirmed]: '아직 승인된 예약이 없어요.',
  [ReservationStatus.Completed]: '완료된 체험이 없어요.',
};
