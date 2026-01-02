import { bffFetch } from '@/shared/apis/base/bffFetch';
import type {
  GetMyNotificationsParams,
  NotificationResponse,
} from '@/shared/types/myNotifications';
import { createQueryString } from '@/shared/utils/createQueryString';

/**
 * 내 알림 리스트 조회 API (BFF)
 *
 * @param params - 내 알림 리스트 조회를 위한 쿼리 파라미터
 * @returns 내 알림 리스트 조회 API 응답 Promise
 */
export const getMyNotifications = (
  params: GetMyNotificationsParams
): Promise<NotificationResponse> => {
  const queryString = createQueryString(params);
  return bffFetch<NotificationResponse>(`/my-notifications${queryString}`, { method: 'GET' });
};

/**
 * 내 알림 삭제 API (BFF)
 *
 * @param notificationId - 삭제할 알림 ID
 * @returns 내 알림 삭제 API 응답 Promise
 */
export const deleteNotification = (notificationId: number): Promise<void> => {
  return bffFetch<void>(`/my-notifications/${notificationId}`, { method: 'DELETE' });
};
