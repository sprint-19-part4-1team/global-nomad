import { publicFetch } from '@/shared/apis/base/publicFetch';
import type {
  ActivityWithSchedulesResponseDto,
  ActivityWithSubImagesAndSchedulesDto,
  CreateActivityBodyDto,
  CreateActivityImageResponse,
  CreateReservationBodyDto,
  GetActivitiesParams,
  GetActivitiesResponse,
  GetActivityReviewsParams,
  GetActivityReviewsResponse,
  GetActivitySchedulesParams,
  ScheduleResponseDto,
} from '@/shared/types/activities';
import { ReservationResponseDto } from '@/shared/types/myReservations';
import { createQueryString } from '@/shared/utils/createQueryString';

/**
 * 체험 리스트 조회 API
 *
 * @param params - 체험 리스트 조회를 위한 쿼리 파라미터
 * @returns 체험 리스트 조회 API 응답 Promise
 */
export const getActivities = (params: GetActivitiesParams): Promise<GetActivitiesResponse> => {
  const queryString = createQueryString(params);
  return publicFetch<GetActivitiesResponse>(`/activities${queryString}`, { method: 'GET' });
};

/**
 * 체험 등록 API
 *
 * @param data - 체험 등록에 필요한 정보
 * @returns 체험 등록 API 응답 Promise
 */
export const createActivity = (
  data: CreateActivityBodyDto
): Promise<ActivityWithSchedulesResponseDto> => {
  return publicFetch<ActivityWithSchedulesResponseDto>(`/activities`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * 체험 상세 조회 API
 *
 * @param activityId - 조회할 체험 ID
 * @returns 체험 상세 조회 API 응답 Promise
 */
export const getActivityDetail = (
  activityId: number
): Promise<ActivityWithSubImagesAndSchedulesDto> => {
  return publicFetch<ActivityWithSubImagesAndSchedulesDto>(`/activities/${activityId}`, {
    method: 'GET',
  });
};

/**
 * 체험 예약 가능일 조회 API
 *
 * @param activityId - 조회할 체험 ID
 * @param params - 예약 가능일 조회를 위한 쿼리 파라미터
 * @returns 체험 예약 가능일 조회 API 응답 Promise
 */
export const getActivitySchedules = (
  activityId: number,
  params: GetActivitySchedulesParams
): Promise<ScheduleResponseDto> => {
  const queryString = createQueryString(params);
  return publicFetch<ScheduleResponseDto>(
    `/activities/${activityId}/available-schedule${queryString}`,
    {
      method: 'GET',
    }
  );
};

/**
 * 체험 리뷰 조회 API
 *
 * @param activityId - 조회할 체험 ID
 * @param params - 체험 리뷰 조회를 위한 쿼리 파라미터
 * @returns 체험 리뷰 조회 API 응답 Promise
 */
export const getActivityReviews = (
  activityId: number,
  params: GetActivityReviewsParams
): Promise<GetActivityReviewsResponse> => {
  const queryString = createQueryString(params);
  return publicFetch<GetActivityReviewsResponse>(
    `/activities/${activityId}/reviews${queryString}`,
    {
      method: 'GET',
    }
  );
};

/**
 * 체험 예약 신청 API
 *
 * @param activityId - 체험 ID
 * @param data - 체험 예약 신청에 필요한 정보
 * @returns 체험 예약 신청 API 응답 Promise
 */
export const createActivityReservation = (
  activityId: number,
  data: CreateReservationBodyDto
): Promise<ReservationResponseDto> => {
  return publicFetch<ReservationResponseDto>(`/activities/${activityId}/reservations`, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * 체험 이미지 업로드를 위한 이미지 URL 생성 API
 *
 * @param image - 업로드할 체험 이미지 파일
 * @returns 체험 이미지 URL 생성 API 응답 Promise
 */
export const createActivityImage = (image: File): Promise<CreateActivityImageResponse> => {
  const formData = new FormData();
  formData.append('image', image);

  return publicFetch<CreateActivityImageResponse>('/activities/images', {
    method: 'POST',
    body: formData,
  });
};
