import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyReservations } from '@/shared/apis/feature/myReservations';
import { QUERY_KEYS } from '@/shared/constants/queryKey';
import { useUserStore } from '@/shared/stores/userStore';
import type { GetMyReservationsResponse, ReservationStatus } from '@/shared/types/myReservations';

interface UseMyReservationsQueryParams {
  status?: ReservationStatus;
  size?: number;
}

/**
 * 내 예약 리스트(커서 기반) 조회 훅
 *
 * - cursorId 기반으로 다음 페이지를 불러옵니다.
 * - status/size가 바뀌면 캐시가 분리됩니다.
 */
export const useMyReservationsQuery = ({ status, size = 4 }: UseMyReservationsQueryParams) => {
  const userId = useUserStore((s) => s.user?.id);

  return useInfiniteQuery<GetMyReservationsResponse>({
    queryKey: QUERY_KEYS.MY_RESERVATIONS(userId, {
      status,
      size,
    }),
    queryFn: ({ pageParam }) =>
      getMyReservations({
        cursorId: typeof pageParam === 'number' ? pageParam : undefined,
        size,
        status,
      }),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: (lastPage) => lastPage.cursorId ?? undefined,
    enabled: !!userId,
  });
};
