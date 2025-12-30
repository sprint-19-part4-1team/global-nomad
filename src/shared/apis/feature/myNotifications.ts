import { baseFetcher } from '@/shared/apis/base/baseFetcher';
import type { GetMyNotificationsParams } from '@/shared/types/myNotifications.types';
import { createQueryString } from '@/shared/utils/createQueryString';

/**
 * 내 알림 리스트 조회 API
 *
 * @param params - 내 알림 리스트 조회를 위한 쿼리 파라미터
 * @returns 내 알림 리스트 조회 API 응답 Promise
 */
export const getMyNotifications = (params: GetMyNotificationsParams) => {
  const queryString = createQueryString(params);
  return baseFetcher(`/my-notifications${queryString}`, { method: 'GET' });
};

/**
 * 내 알림 삭제 API
 *
 * @param notificationId - 삭제할 알림 ID
 * @returns 내 알림 삭제 API 응답 Promise
 */
export const deleteNotification = (notificationId: number) => {
  return baseFetcher(`/my-notifications/${notificationId}`, {
    method: 'DELETE',
  });
};
