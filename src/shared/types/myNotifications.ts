export interface GetMyNotificationsParams {
  cursorId?: number;
  size?: number;
}

export interface NotificationDto {
  id: number;
  teamId: string;
  userId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface NotificationResponse {
  cursorId: number;
  notifications: NotificationDto[];
  totalCount: number;
}
