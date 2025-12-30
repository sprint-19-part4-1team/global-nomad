import { baseFetcher } from '@/shared/apis/baseFetcher';
import { createQueryString } from '@/shared/utils/createQueryString';

export interface GetMyNotificationsParams {
  cursorId?: number;
  size?: number;
}

// 내 알림 리스트 조회
export const getMyNotifications = (params: GetMyNotificationsParams) => {
  const queryString = createQueryString(params);
  return baseFetcher(`/my-notifications${queryString}`, { method: 'GET' });
};

// 내 알림 삭제
export const deleteNotification = (notificationId: number) => {
  return baseFetcher(`/my-notifications/${notificationId}`, {
    method: 'DELETE',
  });
};
