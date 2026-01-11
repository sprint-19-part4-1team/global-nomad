'use client';

import { useQuery } from '@tanstack/react-query';
import { getMyNotifications } from '@/shared/apis/feature/myNotifications';
import { QUERY_KEYS } from '@/shared/constants';
import { useUserStore } from '@/shared/stores/userStore';
import { NotificationDto } from '@/shared/types/myNotifications';

export type NotificationStatus = 'confirmed' | 'declined';

export interface ParsedNotification {
  id: number;
  title: string;
  date: string;
  status: NotificationStatus;
  updatedAt: string;
}

/**
 * API content를 파싱하여 title, date, status를 추출합니다.
 * content 형식: "테스트 체험1(2026-01-13 12:00~13:00) 예약이 승인되었습니다."
 */
const parseNotificationContent = (notification: NotificationDto): ParsedNotification => {
  const { id, content, updatedAt } = notification;

  const match = content.match(/^(.+)\((.+)\)/);
  const [, title = '', date = ''] = match ?? [];
  const status: NotificationStatus = content.includes('승인') ? 'confirmed' : 'declined';

  return {
    id,
    title,
    date,
    status,
    updatedAt,
  };
};

/**
 * 알림 목록을 조회하는 query hook
 *
 * @param params.size - 조회할 알림 개수
 * @returns notifications - 파싱된 알림 목록 (title, date, status, updatedAt)
 */
export const useNotificationsQuery = (params?: { size?: number }) => {
  const userId = useUserStore((s) => s.user?.id);
  const size = params?.size;

  return useQuery({
    queryKey: QUERY_KEYS.MY_NOTIFICATIONS({ size }, userId),
    queryFn: () => getMyNotifications({ size }),
    enabled: !!userId,
    refetchInterval: 60000,
    select: (data) => ({
      ...data,
      notifications: data.notifications.map(parseNotificationContent),
    }),
  });
};
