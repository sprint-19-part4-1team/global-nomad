import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { createReview } from '@/shared/apis/feature/myReservations';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { CreateReviewBodyDto, ReservationStatus } from '@/shared/types/myReservations';

interface UseCreateReviewMutationParams {
  userId?: number;
  status?: ReservationStatus;
  size?: number;
  onClose?: () => void;
}

interface CreateReviewVariables extends CreateReviewBodyDto {
  reservationId: number;
}

export const useCreateReviewMutation = ({
  userId,
  status,
  size = 4,
  onClose,
}: UseCreateReviewMutationParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reservationId, rating, content }: CreateReviewVariables) => {
      return createReview(reservationId, { rating, content });
    },

    onSuccess: () => {
      toast.success('리뷰가 작성되었습니다.');
      onClose?.();

      if (!userId) {
        return;
      }

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.MY_RESERVATIONS(userId, { status, size }),
      });
    },

    onError: () => {
      toast.error('리뷰 작성에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
  });
};
