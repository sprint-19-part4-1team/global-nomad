import { baseFetcher } from '@/shared/apis/base/baseFetcher';
import type {
  GetMyActivitiesParams,
  GetMyActivityReservationDashboardParams,
  GetMyActivityReservedSchedulesParams,
  GetMyActivityReservationsParams,
  UpdateMyActivityReservationBodyDto,
  UpdateMyActivityBodyDto,
} from '@/shared/types/myActivities.types';
import { createQueryString } from '@/shared/utils/createQueryString';

/**
 * 내 체험 리스트 조회 API
 *
 * @param params - 내 체험 리스트 조회를 위한 쿼리 파라미터
 * @returns 내 체험 리스트 조회 API 응답 Promise
 */
export const getMyActivities = (params: GetMyActivitiesParams) => {
  const queryString = createQueryString(params);

  return baseFetcher(`/my-activities${queryString}`, {
    method: 'GET',
  });
};

/**
 * 내 체험 월별 예약 현황 조회 API
 *
 * @param activityId - 조회할 체험 ID
 * @param params - 월별 예약 현황 조회를 위한 쿼리 파라미터
 * @returns 내 체험 월별 예약 현황 조회 API 응답 Promise
 */
export const getMyActivityReservationDashboard = (
  activityId: number,
  params: GetMyActivityReservationDashboardParams
) => {
  const queryString = createQueryString(params);

  return baseFetcher(`/my-activities/${activityId}/reservation-dashboard${queryString}`, {
    method: 'GET',
  });
};

/**
 * 내 체험 날짜별 예약 정보가 있는 스케줄 조회 API
 *
 * @param activityId - 조회할 체험 ID
 * @param params - 날짜별 예약 스케줄 조회를 위한 쿼리 파라미터
 * @returns 내 체험 날짜별 예약 스케줄 조회 API 응답 Promise
 */
export const getMyActivityReservedSchedules = (
  activityId: number,
  params: GetMyActivityReservedSchedulesParams
) => {
  const queryString = createQueryString(params);

  return baseFetcher(`/my-activities/${activityId}/reserved-schedule${queryString}`, {
    method: 'GET',
  });
};

/**
 * 내 체험 예약 시간대별 예약 내역 조회 API
 *
 * @param activityId - 조회할 체험 ID
 * @param params - 예약 내역 조회를 위한 쿼리 파라미터
 * @returns 내 체험 예약 내역 조회 API 응답 Promise
 */
export const getMyActivityReservations = (
  activityId: number,
  params: GetMyActivityReservationsParams
) => {
  const queryString = createQueryString(params);

  return baseFetcher(`/my-activities/${activityId}/reservations${queryString}`, {
    method: 'GET',
  });
};

/**
 * 내 체험 예약 상태 업데이트 API
 *
 * @param activityId - 체험 ID
 * @param reservationId - 예약 ID
 * @param data - 예약 상태 업데이트에 필요한 정보
 * @returns 내 체험 예약 상태 업데이트 API 응답 Promise
 */
export const updateMyActivityReservationStatus = (
  activityId: number,
  reservationId: number,
  data: UpdateMyActivityReservationBodyDto
) => {
  return baseFetcher(`/my-activities/${activityId}/reservations/${reservationId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

/**
 * 내 체험 삭제 API
 *
 * @param activityId - 삭제할 체험 ID
 * @returns 내 체험 삭제 API 응답 Promise
 */
export const deleteMyActivity = (activityId: number) => {
  return baseFetcher(`/my-activities/${activityId}`, { method: 'DELETE' });
};

/**
 * 내 체험 수정 API
 *
 * @param activityId - 수정할 체험 ID
 * @param data - 체험 수정에 필요한 정보
 * @returns 내 체험 수정 API 응답 Promise
 */
export const updateMyActivity = (activityId: number, data: UpdateMyActivityBodyDto) => {
  return baseFetcher(`/my-activities/${activityId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};
