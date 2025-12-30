import { baseFetcher } from '@/shared/apis/baseFetcher';
import type {
  CreateActivityBodyDto,
  CreateReservationBodyDto,
  GetActivitiesParams,
  GetActivityReviewsParams,
  GetActivitySchedulesParams,
} from '@/shared/types/activities.types';
import { createQueryString } from '@/shared/utils/createQueryString';

// 체험 리스트 조회
export const getActivities = (params: GetActivitiesParams) => {
  const queryString = createQueryString(params);
  return baseFetcher(`/activities${queryString}`, { method: 'GET' });
};

// 체험 등록
export const createActivity = (data: CreateActivityBodyDto) => {
  return baseFetcher(`/activities`, { method: 'POST', body: JSON.stringify(data) });
};

// 체험 상세 조회
export const getActivityDetail = (activityId: number) => {
  return baseFetcher(`/activities/${activityId}`, { method: 'GET' });
};

// 체험 예약 가능일 조회
export const getActivitySchedules = (activityId: number, params: GetActivitySchedulesParams) => {
  const queryString = createQueryString(params);
  return baseFetcher(`/activities/${activityId}/available-schedule${queryString}`, {
    method: 'GET',
  });
};

// 체험 리뷰 조회
export const getActivityReviews = (activityId: number, params: GetActivityReviewsParams) => {
  const queryString = createQueryString(params);
  return baseFetcher(`/activities/${activityId}/reviews${queryString}`, {
    method: 'GET',
  });
};

// 체험 예약 신청
export const createActivityReservation = (activityId: number, data: CreateReservationBodyDto) => {
  return baseFetcher(`/activities/${activityId}/reservations`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

// 체험 이미지 url 생성
export const createActivityImage = (image: File) => {
  const formData = new FormData();
  formData.append('image', image);

  return baseFetcher<{ imageUrl: string }>('/activities/images', {
    method: 'POST',
    body: formData,
  });
};
