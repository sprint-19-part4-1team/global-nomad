import type { ActivityListMethod, ActivityCategory, ActivitySortOption } from '@/shared/constants';
import type { ReservationStatus } from '@/shared/types/myReservations';

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

export interface ActivityBasicDto {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
}

/** 체험 리스트 조회 API */
export interface GetActivitiesResponse {
  cursorId: number;
  totalCount: number;
  activities: ActivityBasicDto[];
}

export interface SubImagesType {
  imageUrl: string;
  id: number;
}

/** 체험 예약 가능일 조회 리스폰스 */
export interface ScheduleResponseDto {
  times: {
    endTime: string;
    startTime: string;
    id: number;
  };
  date: string;
}

/** 체험 등록 /내 체험 수정 리스폰스 */
export interface ActivityWithSchedulesResponseDto {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createAt: string;
  updateAt: string;
  subImages: SubImagesType[];
  schedules: ScheduleResponseDto[];
}

export interface DetailSchedulesType {
  endTime: string;
  startTime: string;
  date: string;
  id: number;
}

/** 체험 상세 조회 리스폰스 */
export interface ActivityWithSubImagesAndSchedulesDto {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createAt: string;
  updateAt: string;
  subImages: SubImagesType[];
  schedules: DetailSchedulesType[];
}

export interface ReviewServiceResponseDto {
  id: number;
  user: {
    profileImage: string | null;
    nickname: string;
    id: number;
  };
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

/** 체험 리뷰 조회 리스폰스 */
export interface GetActivityReviewsResponse {
  averageRating: number;
  totalCount: number;
  reviews: ReviewServiceResponseDto[];
}

/** 체험 예약 신청, 내 체험 예약 상태 업데이트 리스폰스 */
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
  createAt: string;
  updateAt: string;
}

/** 체험 이미지 업로드를 위한 이미지 URL */
export interface CreateActivityImageResponse {
  activityImageUrl: string;
}
