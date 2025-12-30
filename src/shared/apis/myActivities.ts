import { baseFetcher } from '@/shared/apis/baseFetcher';
import type { ActivityCategory } from '@/shared/constants';
import { createQueryString } from '@/shared/utils/createQueryString';

export interface GetMyActivitiesParams {
  cursorId?: number;
  size?: number;
}
export interface GetMyActivityReservationDashboardParams {
  year: string;
  month: string;
}
export interface GetMyActivityReservedSchedulesParams {
  date: string;
}
export interface GetMyActivityReservationsParams {
  cursorId?: number;
  size?: number;
  scheduleId: number;
  status: 'declined' | 'pending' | 'confirmed';
}
export interface UpdateMyActivityReservationBodyDto {
  status: 'declined' | 'confirmed';
}
export interface CreateScheduleBodyDto {
  date: string;
  startTime: string;
  endTime: string;
}
export interface UpdateMyActivityBodyDto {
  title?: string;
  category?: ActivityCategory;
  description?: string;
  price?: number;
  address?: string;
  bannerImageUrl?: string;
  subImageIdsToRemove?: number[];
  subImageUrlsToAdd?: string[];
  scheduleIdsToRemove?: number[];
  schedulesToAdd?: CreateScheduleBodyDto[];
}

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
