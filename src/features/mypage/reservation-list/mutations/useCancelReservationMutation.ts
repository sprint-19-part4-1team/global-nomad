import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateMyReservation } from '@/shared/apis/feature/myReservations';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { ReservationStatus } from '@/shared/types/myReservations';

interface UseCancelReservationMutationParams {
  userId?: number;
  status?: ReservationStatus;
  size?: number;
  onClose?: () => void;
}

export const useCancelReservationMutation = ({
  userId,
  status,
  size = 4,
  onClose,
}: UseCancelReservationMutationParams) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reservationId: number) => {
      return updateMyReservation(reservationId, {
        status: ReservationStatus.Canceled,
      });
    },

    onSuccess: () => {
      toast.success('예약이 취소되었습니다.');
      onClose?.();

      if (!userId) {
        return;
      }

      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.MY_RESERVATIONS(userId, { status, size }),
      });
    },

    onError: () => {
      toast.error('예약 취소에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
  });
};
