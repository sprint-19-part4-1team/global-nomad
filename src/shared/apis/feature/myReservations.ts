import { bffFetch } from '@/shared/apis/base/bffFetch';
import type {
  GetMyReservationsParams,
  UpdateMyReservationBodyDto,
  CreateReviewBodyDto,
} from '@/shared/types/myReservations';
import { createQueryString } from '@/shared/utils/createQueryString';

/**
 * 내 예약 리스트 조회 API (BFF)
 *
 * @param params - 내 예약 리스트 조회를 위한 쿼리 파라미터
 * @returns 내 예약 리스트 조회 API 응답 Promise
 */
export const getMyReservations = (params: GetMyReservationsParams) => {
  const queryString = createQueryString(params);
  return bffFetch(`/my-reservations${queryString}`, { method: 'GET' });
};

/**
 * 내 예약 수정(취소) API (BFF)
 *
 * @param reservationId - 수정할 예약 ID
 * @param data - 예약 수정(취소)에 필요한 정보
 * @returns 내 예약 수정 API 응답 Promise
 */
export const updateMyReservation = (reservationId: number, data: UpdateMyReservationBodyDto) => {
  return bffFetch(`/my-reservations/${reservationId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

/**
 * 내 예약 리뷰 작성 API (BFF)
 *
 * @param reservationId - 리뷰를 작성할 예약 ID
 * @param data - 리뷰 작성에 필요한 정보
 * @returns 내 예약 리뷰 작성 API 응답 Promise
 */
export const createReview = (reservationId: number, data: CreateReviewBodyDto) => {
  return bffFetch(`/my-reservations/${reservationId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};
