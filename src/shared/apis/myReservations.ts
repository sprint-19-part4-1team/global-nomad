import { baseFetcher } from '@/shared/apis/baseFetcher';
import type {
  GetMyReservationsParams,
  UpdateMyReservationBodyDto,
  CreateReviewBodyDto,
} from '@/shared/types/myReservations.types';
import { createQueryString } from '@/shared/utils/createQueryString';

// 내 예약 리스트 조회
export const getMyReservations = (params: GetMyReservationsParams) => {
  const queryString = createQueryString(params);
  return baseFetcher(`/my-reservations${queryString}`, { method: 'GET' });
};

// 내 예약 수정(취소)
export const updateMyReservation = (reservationId: number, data: UpdateMyReservationBodyDto) => {
  return baseFetcher(`/my-reservations/${reservationId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

// 내 예약 리뷰 작성
export const createReview = (reservationId: number, data: CreateReviewBodyDto) => {
  return baseFetcher(`/my-reservations/${reservationId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
