import { baseFetcher } from '@/shared/apis/baseFetcher';

export interface GetMyNotificationsParams {
  cursorId?: number;
  size?: number;
}

// 내 알림 리스트 조회
export const getMyNotifications = (params: GetMyNotificationsParams) => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      searchParams.append(key, String(value));
    }
  });

  return baseFetcher(`/my-notifications?${searchParams.toString()}`, { method: 'GET' });
};

// 내 알림 삭제
export const deleteNotification = (notificationId: number) => {
  return baseFetcher(`/my-notifications/${notificationId}`, {
    method: 'DELETE',
  });
};
