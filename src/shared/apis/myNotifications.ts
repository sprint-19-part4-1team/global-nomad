import { baseFetcher } from '@/shared/apis/baseFetcher';

export interface GetMyNotificationsParams {
  cursorId?: number;
  size?: number;
}

export const getMyNotifications = (params: GetMyNotificationsParams) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  return baseFetcher(`/my-notifications${searchParams.toString()}`, { method: 'GET' });
};

export const deleteNotification = (notificationId: number) => {
  return baseFetcher(`/my-notifications/${notificationId}`, {
    method: 'DELETE',
  });
};
