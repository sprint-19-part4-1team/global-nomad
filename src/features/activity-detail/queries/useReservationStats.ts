import { useQueries } from '@tanstack/react-query';
import { addDays, differenceInCalendarMonths, addMonths, isWithinInterval } from 'date-fns';
import { useMemo } from 'react';
import { getMyActivityReservationDashboard } from '@/shared/apis/feature/myActivities';
import { QUERY_KEYS } from '@/shared/constants';
import { useUserStore } from '@/shared/stores/userStore';

/**
 * 예약 통계 타입
 * @property confirmedCount - 확정된 예약 수
 * @property pendingCount - 대기 중인 예약 수
 */
type ReservationStats = {
  confirmedCount: number;
  pendingCount: number;
};

/**
 * useReservationStats 훅의 매개변수 타입
 * @property activityId - 조회할 체험의 ID
 * @property enabled - 쿼리 활성화 여부 (기본값: true)
 */
type UseReservationStatsParams = {
  activityId: number;
  enabled?: boolean;
};

/**
 * 60일 이내 예약 통계 조회 훅
 *
 * @description
 * - 60일 이내의 모든 월별 예약 현황을 조회
 * - confirmed와 pending 예약 수를 집계
 * - useQueries를 사용하여 여러 월의 데이터를 병렬로 효율적으로 조회
 * - 60일 기간이 걸치는 월의 개수를 자동으로 계산하여 최소한의 API 호출만 수행
 * - enabled 옵션을 통해 조건부로 쿼리를 실행할 수 있음
 *
 * @param params - 조회 파라미터
 * @param params.activityId - 체험 ID
 * @param params.enabled - 쿼리 활성화 여부 (기본값: true)
 * @returns 예약 통계 및 로딩 상태
 *
 * @example
 * ```tsx
 * const { confirmedCount, pendingCount, isPending } = useReservationStats({
 *   activityId: 123,
 *   enabled: isOwner
 * });
 * ```
 */
export const useReservationStats = ({ activityId, enabled = true }: UseReservationStatsParams) => {
  const userId = useUserStore((s) => s.user?.id);

  const todayString = new Date().toDateString();

  // 오늘 날짜와 60일 후 날짜 계산
  const { today, endDate } = useMemo(() => {
    const today = new Date();
    const endDate = addDays(today, 60);
    return { today, endDate };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayString]);

  // 조회해야 할 년-월 목록 생성 (실제 필요한 월만 계산)
  const monthsToQuery = useMemo(() => {
    const monthCount = differenceInCalendarMonths(endDate, today) + 1;
    const months: { year: string; month: string }[] = [];

    for (let i = 0; i < monthCount; i++) {
      const targetMonth = addMonths(today, i);
      months.push({
        year: targetMonth.getFullYear().toString(),
        month: (targetMonth.getMonth() + 1).toString(),
      });
    }

    return months;
  }, [today, endDate]);

  // useQueries로 여러 월의 데이터를 병렬로 조회
  const queries = useQueries({
    queries: monthsToQuery.map((params) => ({
      queryKey: QUERY_KEYS.MY_ACTIVITY_RESERVATION_DASHBOARD(
        activityId,
        {
          year: params.year,
          month: params.month.padStart(2, '0'),
        },
        userId
      ),
      queryFn: () =>
        getMyActivityReservationDashboard(activityId, {
          year: params.year,
          month: params.month.padStart(2, '0'),
        }),
      enabled: !!activityId && !!userId && enabled,
    })),
  });

  // 모든 데이터가 로딩되었는지 확인
  const isPending = queries.some((query) => query.isPending);

  // 60일 이내 데이터만 필터링하고 통계 집계
  const stats: ReservationStats = useMemo(() => {
    if (isPending) {
      return { confirmedCount: 0, pendingCount: 0 };
    }

    let confirmedCount = 0;
    let pendingCount = 0;

    queries.forEach((query) => {
      const reservations = query.data || [];

      reservations.forEach((reservation) => {
        const reservationDate = new Date(reservation.date);

        // 날짜가 오늘 ~ 60일 이내인지 확인
        if (isWithinInterval(reservationDate, { start: today, end: endDate })) {
          confirmedCount += reservation.reservations.confirmed || 0;
          pendingCount += reservation.reservations.pending || 0;
        }
      });
    });

    return { confirmedCount, pendingCount };
  }, [queries, isPending, today, endDate]);

  return {
    ...stats,
    isPending,
  };
};
