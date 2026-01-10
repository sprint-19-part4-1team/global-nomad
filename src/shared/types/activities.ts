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

/**
 * ## ScheduleTimeSlot
 *
 * @description
 * - 하나의 예약 가능한 시간 구간(Time Slot)을 표현하는 타입입니다.
 * - 날짜(`YYYY-MM-DD`)와 시작 시간(`startTime`)과 종료 시간(`endTime`)으로 구성됩니다.
 */
export interface ScheduleTimeSlot {
  date: string;
  startTime: string;
  endTime: string;
}

/** 체험 생성 타입 */
export interface CreateActivityBodyDto {
  title: string;
  category: ActivityCategory;
  description: string;
  price: number;
  address: string;
  schedules: ScheduleTimeSlot[];
  bannerImageUrl: string;
  subImageUrls: string[];
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
  cursorId: number | null;
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
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
}

/** 체험 이미지 업로드를 위한 이미지 URL */
export interface CreateActivityImageResponse {
  activityImageUrl: string;
}
