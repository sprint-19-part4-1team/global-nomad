export enum ReservationStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Declined = 'declined',
  Canceled = 'canceled',
  Completed = 'completed',
}

export interface GetMyReservationsParams {
  cursorId?: number;
  size?: number;
  status?: ReservationStatus;
}
export interface UpdateMyReservationBodyDto {
  status: 'canceled';
}
export interface CreateReviewBodyDto {
  rating: number;
  content: string;
}

export interface ReservationWithActivityResponseDto {
  id: number;
  teamId: string;
  userId: number;
  activity: {
    bannerImageUrl: string;
    title: string;
    id: number;
  };
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

/** 내 예약 리스트 조회 리스폰스 */
export interface GetMyReservationsResponse {
  cursorId: number | null;
  reservations: ReservationWithActivityResponseDto[];
  totalCount: number;
}

/** 내 예약 수정 리스폰스 */
export interface ReservationResponseDto {
  id: number;
  teamId: string;
  userId: number;
  activityId: number;
  scheduleId: number;
  status: ReservationStatus;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

/** 내 예약 리뷰 작성 리스폰스 */
export interface CreateReviewResponse {
  updatedAt: string;
  createdAt: string;
  content: string;
  rating: number;
  userId: number;
  activityId: number;
  teamId: string;
  id: number;
}
