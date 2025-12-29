import { baseFetcher } from '@/shared/apis/baseFetcher';

export interface GetMyReservationsParams {
  cursorId?: number;
  size?: number;
  status?: 'pending' | 'confirmed' | 'declined' | 'canceled' | 'completed';
}
export interface UpdateMyReservationBodyDto {
  status: 'canceled';
}
export interface CreateReviewBodyDto {
  rating: number;
  content: string;
}

export const getMyReservations = (params: GetMyReservationsParams) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  return baseFetcher(`/my-reservations?${searchParams.toString()}`, { method: 'GET' });
};

export const updateMyReservation = (reservationId: number, data: UpdateMyReservationBodyDto) => {
  return baseFetcher(`/my-reservations/${reservationId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

export const createReview = (reservationId: number, data: CreateReviewBodyDto) => {
  return baseFetcher(`/my-reservations/${reservationId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
