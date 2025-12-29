import { baseFetcher } from '@/shared/apis/baseFetcher';
import type { ActivityListMethod, ActivityCategory, ActivitySortOption } from '@/shared/constants';

export interface GetActivitiesParams {
  method: ActivityListMethod;
  cursorId?: number;
  category?: ActivityCategory;
  keyword?: string;
  sort?: ActivitySortOption;
  page?: number;
  size?: number;
}
export interface CreateActivityBodyDto {
  title: string;
  category: ActivityCategory;
  description: string;
  price: number;
  address: string;
  schedules?: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
  bannerImageUrl: string;
  subImageUrls?: string[];
}
export interface GetActivitySchedulesParams {
  year: string;
  month: string;
}
export interface GetActivityReviewsParams {
  page?: number;
  size?: number;
}
export interface CreateReservationBodyDto {
  scheduleId: number;
  headCount: number;
}

// 체험 리스트 조회
export const getActivities = (params: GetActivitiesParams) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  return baseFetcher(`/activities?${searchParams.toString()}`, { method: 'GET' });
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
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  return baseFetcher(`/activities/${activityId}/available-schedules?${searchParams.toString()}`, {
    method: 'GET',
  });
};

// 체험 리뷰 조회
export const getActivityReviews = (activityId: number, params: GetActivityReviewsParams) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  return baseFetcher(`/activities/${activityId}/reviews?${searchParams.toString()}`, {
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

  return baseFetcher<{ imageUrl: string }>(`/activities/images`, {
    method: 'POST',
    body: formData,
  });
};
