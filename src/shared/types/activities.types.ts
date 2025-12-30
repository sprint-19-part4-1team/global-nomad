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
