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
