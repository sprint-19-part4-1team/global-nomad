import type { ActivityCategory } from '@/shared/constants';
import type { ActivityBasicDto } from '@/shared/types/activities';

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

/** 내 체험 리스트 조회 리스폰스 */
export interface MyActivitiesResponse {
  cursorId: number;
  totalCount: number;
  activities: ActivityBasicDto[];
}

/** 내 체험 월별 예약 현황 조회 리스폰스 */
export interface FindReservationsByMonthResponseDto {
  date: string;
  reservations: {
    pending: number;
    confirmed: number;
    completed: number;
  };
}

/** 내 체험 날짜별 예약 정보가 있는 스케줄 조회 리스폰스 */
export interface ReservedScheduleResponseDto {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: {
    declined: number;
    confirmed: number;
    pending: number;
  };
}

export interface ReservationWithUserResponseDto {
  id: number;
  nickname: string;
  userId: number;
  teamId: string;
  activityId: number;
  scheduleId: number;
  // TODO: API 연동 시 리스폰스 타입 확인해서 status 변경 필요. 스웨거 기준 {}만 있어서 기재를 못했습니다..
  status: {};
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

/** 내 체험 예약 시간대별 예약 내역 조회 리스폰스 타입 */
export interface GetMyActivityReservationsResponse {
  cursorId: number;
  totalCount: number;
  reservations: ReservationWithUserResponseDto[];
}
