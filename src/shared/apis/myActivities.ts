import { baseFetcher } from '@/shared/apis/baseFetcher';
import type {
  GetMyActivitiesParams,
  GetMyActivityReservationDashboardParams,
  GetMyActivityReservedSchedulesParams,
  GetMyActivityReservationsParams,
  UpdateMyActivityReservationBodyDto,
  UpdateMyActivityBodyDto,
} from '@/shared/types/myActivities.types';
import { createQueryString } from '@/shared/utils/createQueryString';

// 내 체험 리스트 조회
export const getMyActivities = (params: GetMyActivitiesParams) => {
  const queryString = createQueryString(params);

  return baseFetcher(`/my-activities${queryString}`, {
    method: 'GET',
  });
};

// 내 체험 월별 예약 현황 조회
export const getMyActivityReservationDashboard = (
  activityId: number,
  params: GetMyActivityReservationDashboardParams
) => {
  const queryString = createQueryString(params);

  return baseFetcher(`/my-activities/${activityId}/reservation-dashboard${queryString}`, {
    method: 'GET',
  });
};

// 내 체험 날짜별 예약 정보(신청, 승인, 거절)가 있는 스케줄 조회
export const getMyActivityReservedSchedules = (
  activityId: number,
  params: GetMyActivityReservedSchedulesParams
) => {
  const queryString = createQueryString(params);

  return baseFetcher(`/my-activities/${activityId}/reserved-schedule${queryString}`, {
    method: 'GET',
  });
};

// 내 체험 예약 시간대별 예약 내역 조회
export const getMyActivityReservations = (
  activityId: number,
  params: GetMyActivityReservationsParams
) => {
  const queryString = createQueryString(params);

  return baseFetcher(`/my-activities/${activityId}/reservations${queryString}`, {
    method: 'GET',
  });
};

// 내 체험 예약 상태(승인, 거절) 업데이트
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

// 내 체험 삭제
export const deleteMyActivity = (activityId: number) => {
  return baseFetcher(`/my-activities/${activityId}`, { method: 'DELETE' });
};

// 내 체험 수정
export const updateMyActivity = (activityId: number, data: UpdateMyActivityBodyDto) => {
  return baseFetcher(`/my-activities/${activityId}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};
