import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createReview } from '@/shared/apis/feature/myReservations';
import { ACTIVITIES_KEY, QUERY_KEYS } from '@/shared/constants/queryKey';
import { ActivityBasicDto, GetActivitiesResponse } from '@/shared/types/activities';
import { CreateReviewBodyDto, ReservationStatus } from '@/shared/types/myReservations';

interface UseCreateReviewMutationParams {
  activityId: number;
  status?: ReservationStatus;
  size?: number;
  onClose?: () => void;
}

interface CreateReviewVariables extends CreateReviewBodyDto {
  reservationId: number;
}

export const useCreateReviewMutation = ({
  activityId,
  status,
  size = 4,
  onClose,
}: UseCreateReviewMutationParams) => {
  const queryClient = useQueryClient();

  const updateActivitiesCache = (newRating: number) => {
    const updateActivity = (activity: ActivityBasicDto) =>
      activity.id === activityId
        ? {
            ...activity,
            reviewCount: activity.reviewCount + 1,
            rating:
              (activity.rating * activity.reviewCount + newRating) / (activity.reviewCount + 1),
          }
        : activity;

    // 일반 쿼리 캐시 수정 (useActivities)
    queryClient.setQueriesData<GetActivitiesResponse>({ queryKey: [ACTIVITIES_KEY] }, (oldData) => {
      if (!oldData?.activities) {
        return oldData;
      }

      return {
        ...oldData,
        activities: oldData.activities.map(updateActivity),
      };
    });

    // InfiniteQuery 캐시 수정 (usePopularActivities)
    queryClient.setQueriesData<InfiniteData<GetActivitiesResponse>>(
      { queryKey: QUERY_KEYS.ACTIVITIES({ method: 'cursor' }) },
      (oldData) => {
        if (!oldData?.pages) {
          return oldData;
        }

        return {
          ...oldData,
          pages: oldData.pages.map((page) => ({
            ...page,
            activities: page.activities.map(updateActivity),
          })),
        };
      }
    );
  };

  return useMutation({
    mutationFn: ({ reservationId, rating, content }: CreateReviewVariables) => {
      return createReview(reservationId, { rating, content });
    },

    onSuccess: (data, variables) => {
      toast.success('리뷰가 작성되었습니다.');
      onClose?.();

      updateActivitiesCache(variables.rating);

      if (!data.userId) {
        return;
      }

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.MY_RESERVATIONS(data.userId, { status, size }),
      });
    },

    onError: (error) => {
      toast.error(error.message || '리뷰 작성에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
  });
};
