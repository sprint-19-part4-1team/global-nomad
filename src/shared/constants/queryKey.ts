import {
  ActivityCategory,
  ActivityListMethod,
  ActivitySortOption,
} from '@/shared/constants/activities';
import { GetActivityReviewsParams, GetActivitySchedulesParams } from '@/shared/types/activities';
import {
  ActivityReservationStatus,
  GetMyActivityReservationDashboardParams,
  GetMyActivityReservedSchedulesParams,
} from '@/shared/types/myActivities';
import { ReservationStatus } from '@/shared/types/myReservations';

/** 공통 액티비티 쿼리키 */
export const ACTIVITIES_KEY = 'activities';

/**
 * ## QUERY_KEYS
 *
 * @description
 * 리액트 쿼리의 쿼리키 관리를 위한 상수 파일입니다.
 * 쿼리키는 하드 코딩하지 않고, 쿼리키 상수로 관리합니다.
 */
export const QUERY_KEYS = {
  /** 체험 리스트 조회 */
  ACTIVITIES: (params: {
    method: ActivityListMethod;
    category?: ActivityCategory;
    keyword?: string;
    sort?: ActivitySortOption;
    page?: number;
    size?: number;
  }) => [
    ACTIVITIES_KEY,
    {
      method: params.method,
      category: params?.category,
      keyword: params?.keyword,
      sort: params?.sort,
      page: params?.page,
      size: params?.size,
    },
  ],
  /** 체험 리스트 랜덤 조회 */
  RANDOM_ACTIVITIES: (count: number) => [ACTIVITIES_KEY, 'random', count],
  /** 체험 상세 조회 */
  ACTIVITY_DETAIL: (activityId: number) => ['activityDetail', activityId],
  /** 체험 예약 가능일 조회 */
  ACTIVITY_AVAILABLE_SCHEDULE: (activityId: number, params: GetActivitySchedulesParams) => [
    'activityAvailableSchedule',
    activityId,
    params,
  ],
  /** 체험 리뷰 조회 */
  ACTIVITY_REVIEWS: (activityId: number, params?: GetActivityReviewsParams) => [
    'activityReviews',
    activityId,
    params,
  ],
  /** 내 체험 리스트 조회 */
  MY_ACTIVITIES: (params?: { size?: number }, userId?: number) => {
    const key: unknown[] = ['myActivities'];
    if (params) {
      key.push({ size: params.size });
    }
    if (userId) {
      key.push(userId);
    }
    return key;
  },
  /** 내 체험 월별 예약 현황 조회 */
  MY_ACTIVITY_RESERVATION_DASHBOARD: (
    activityId: number,
    params: GetMyActivityReservationDashboardParams,
    userId?: number
  ) => ['myActivityReservationDashboard', activityId, params, userId],
  /** 내 체험 날짜별 예약 정보가 있는 스케줄 조회 */
  MY_ACTIVITY_RESERVED_SCHEDULE: (
    activityId: number,
    params: GetMyActivityReservedSchedulesParams,
    userId?: number
  ) => ['myActivityReservedSchedule', activityId, params, userId],
  /** 내 체험 예약 시간대별 예약 내역 조회 */
  MY_ACTIVITY_RESERVATIONS: (
    activityId: number,
    params: {
      scheduleId: number;
      status: ActivityReservationStatus;
      size?: number;
    },
    userId?: number
  ) => [
    'myActivityReservations',
    activityId,
    {
      scheduleId: params.scheduleId,
      status: params.status,
      size: params.size,
    },
    userId,
  ],
  /** 내 알림 리스트 조회 */
  MY_NOTIFICATIONS: (
    params?: {
      size?: number;
    },
    userId?: number
  ) => ['myNotifications', { size: params?.size }, userId],
  /** 내 예약 리스트 조회 */
  MY_RESERVATIONS: (
    userId?: number,
    params?: {
      status?: ReservationStatus;
      size?: number;
    }
  ) => [
    'myReservations',
    userId,
    {
      status: params?.status,
      size: params?.size,
    },
  ],
  /** 내 정보 조회 */
  MY_INFO: (userId?: number) => ['myInfo', userId],
} as const;
