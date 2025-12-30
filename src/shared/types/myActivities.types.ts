import type { ActivityCategory } from '@/shared/constants';

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
