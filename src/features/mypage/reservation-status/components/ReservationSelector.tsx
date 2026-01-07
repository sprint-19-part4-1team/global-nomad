'use client';

import { useState, useEffect } from 'react';
import ReservationCalendar from '@/features/mypage/reservation-status/components/ReservationCalendar';
import ReservationCalendarSkeleton from '@/features/mypage/reservation-status/components/skeleton/ReservationCalendarSkeleton';
import ReservationSkeleton from '@/features/mypage/reservation-status/components/skeleton/ReservationSkeleton';
import { useMonthlyReservations } from '@/features/mypage/reservation-status/hooks/useMonthlyReservations';
import { useMyActivities } from '@/features/mypage/reservation-status/hooks/useMyActivities';
import {
  SelectDropdown,
  SelectDropdownContent,
  SelectDropdownItem,
  SelectDropdownTrigger,
  SelectDropdownValue,
} from '@/shared/components/dropdown/select';
import EmptyState from '@/shared/components/empty-state/EmptyState';

/**
 * 체험 선택 및 예약 현황 조회 컴포넌트
 *
 * @description
 * - 사용자의 체험 목록을 드롭다운으로 표시
 * - 선택된 체험의 월별 예약 현황을 달력으로 표시
 * - 체험 변경 또는 월 변경 시 자동으로 예약 데이터 조회
 *
 * @example
 * ```tsx
 * <ReservationSelector />
 * ```
 *
 * @returns 렌더링된 예약 선택 컴포넌트
 */
export default function ReservationSelector() {
  // 달력에 표시할 현재 월 (년/월 정보 포함)
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 현재 선택된 체험 ID (드롭다운 value)
  const [selectedActivityId, setSelectedActivityId] = useState<string>('');

  // 내 체험 목록 조회
  const { activityOptions, activityMap, isLoading, isError, isFetched, isRefetching } =
    useMyActivities();

  // 월별 예약 현황 조회 (selectedActivityId와 currentMonth가 변경될 때 자동 재조회)
  const {
    reservations,
    isLoading: isLoadingReservations,
    isFetched: isFetchedReservations,
  } = useMonthlyReservations({
    activityId: Number(selectedActivityId),
    params: {
      year: currentMonth.getFullYear().toString(),
      month: (currentMonth.getMonth() + 1).toString(),
    },
  });

  // 체험 목록이 로드되면 첫 번째 체험을 자동 선택
  useEffect(() => {
    if (activityOptions.length > 0 && !selectedActivityId) {
      const firstActivityId = activityOptions[0].id.toString();
      setSelectedActivityId(firstActivityId);
    }
  }, [activityOptions, selectedActivityId]);

  // 초기 로딩 또는 refetch 중일 때 스켈레톤 표시
  if (isLoading || isRefetching) {
    return <ReservationSkeleton />;
  }

  // 에러일 때 안내 메시지 표시
  if (isError) {
    return (
      <div className='mb-80 sm:mb-100 lg:mb-0'>
        <EmptyState
          type='error'
          mainText='체험 목록을 불러오는데 실패했어요.'
          button={{ text: '다시 시도하기', onClick: () => window.location.reload() }}
        />
      </div>
    );
  }

  // 체험이 없을 때 안내 메시지 표시
  if (isFetched && activityOptions.length === 0) {
    return (
      <div className='mb-80 sm:mb-100 lg:mb-0'>
        <EmptyState
          type='experience'
          mainText='아직 등록한 체험이 없어요.'
          button={{ text: '체험 등록하기', href: '/activities' }}
        />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-28 sm:gap-24 lg:gap-32'>
      {/* 체험 목록 드롭다운 */}
      <SelectDropdown
        onChangeValue={(value) => setSelectedActivityId(value)}
        triggerId='activity-select'
        value={selectedActivityId}>
        <SelectDropdownTrigger>
          <SelectDropdownValue placeholder='체험 선택' render={(value) => activityMap.get(value)} />
        </SelectDropdownTrigger>

        <SelectDropdownContent>
          {activityOptions.map((activity) => (
            <SelectDropdownItem key={activity.id} value={activity.id.toString()}>
              {activity.title}
            </SelectDropdownItem>
          ))}
        </SelectDropdownContent>
      </SelectDropdown>

      {/* 선택된 체험의 월별 예약 현황 표시 달력 */}
      {!isFetchedReservations && isLoadingReservations ? (
        <ReservationCalendarSkeleton />
      ) : (
        <ReservationCalendar
          reservations={reservations}
          currentMonth={currentMonth}
          onMonthChange={setCurrentMonth}
        />
      )}
    </div>
  );
}
