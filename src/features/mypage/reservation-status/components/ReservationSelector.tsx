'use client';

import { useState, useEffect, useMemo } from 'react';
import ReservationCalendar from '@/features/mypage/reservation-status/components/ReservationCalendar';
import {
  SelectDropdown,
  SelectDropdownContent,
  SelectDropdownItem,
  SelectDropdownTrigger,
  SelectDropdownValue,
} from '@/shared/components/dropdown/select';
import { FindReservationsByMonthResponseDto } from '@/shared/types/myActivities';

// TODO: 더미 데이터, API 연동 후 지우기
// 내 체험 조회 더미 데이터
export const DUMMY_MY_ACTIVITIES = {
  activities: [
    {
      id: 6575,
      userId: 2927,
      title: '함께 배우면 즐거운 스트릿댄스',
    },
    {
      id: 6580,
      userId: 2927,
      title: '제주도 바다 스노쿨링 체험',
    },
  ],
  totalCount: 2,
  cursorId: null,
} as const;

// 2025년 1월 예약 현황 더미 데이터
export const DUMMY_RESERVATION_DATA_JAN = [
  {
    date: '2026-01-05',
    reservations: {
      completed: 1,
      confirmed: 2,
      pending: 1,
    },
  },
  {
    date: '2026-01-08',
    reservations: {
      completed: 3,
      confirmed: 1,
      pending: 0,
    },
  },
  {
    date: '2026-01-12',
    reservations: {
      completed: 2,
      confirmed: 2,
      pending: 2,
    },
  },
  {
    date: '2026-01-15',
    reservations: {
      completed: 0,
      confirmed: 3,
      pending: 1,
    },
  },
  {
    date: '2026-01-18',
    reservations: {
      completed: 1,
      confirmed: 1,
      pending: 0,
    },
  },
  {
    date: '2026-01-22',
    reservations: {
      completed: 2,
      confirmed: 0,
      pending: 3,
    },
  },
  {
    date: '2026-01-25',
    reservations: {
      completed: 4,
      confirmed: 2,
      pending: 1,
    },
  },
  {
    date: '2026-01-28',
    reservations: {
      completed: 1,
      confirmed: 3,
      pending: 0,
    },
  },
] as const;

// 2026년 2월 예약 현황 더미 데이터
export const DUMMY_RESERVATION_DATA_FEB = [
  {
    date: '2026-02-03',
    reservations: {
      completed: 2,
      confirmed: 1,
      pending: 1,
    },
  },
  {
    date: '2026-02-07',
    reservations: {
      completed: 1,
      confirmed: 2,
      pending: 0,
    },
  },
  {
    date: '2026-02-09',
    reservations: {
      completed: 2,
      confirmed: 1,
      pending: 0,
    },
  },
  {
    date: '2026-02-10',
    reservations: {
      completed: 0,
      confirmed: 3,
      pending: 1,
    },
  },
  {
    date: '2026-02-11',
    reservations: {
      completed: 1,
      confirmed: 2,
      pending: 2,
    },
  },
  {
    date: '2026-02-12',
    reservations: {
      completed: 3,
      confirmed: 0,
      pending: 1,
    },
  },
  {
    date: '2026-02-15',
    reservations: {
      completed: 1,
      confirmed: 1,
      pending: 0,
    },
  },
  {
    date: '2026-02-18',
    reservations: {
      completed: 2,
      confirmed: 2,
      pending: 1,
    },
  },
  {
    date: '2026-02-20',
    reservations: {
      completed: 0,
      confirmed: 1,
      pending: 3,
    },
  },
  {
    date: '2026-02-23',
    reservations: {
      completed: 3,
      confirmed: 1,
      pending: 1,
    },
  },
  {
    date: '2026-02-25',
    reservations: {
      completed: 4,
      confirmed: 1,
      pending: 0,
    },
  },
] as const;

// TODO: API 연동 시 실제 데이터로 교체
// 현재는 체험별, 월별로 다른 더미 데이터를 보여주기 위한 임시 로직
const getReservationData = (
  activityId: string,
  month: Date
): FindReservationsByMonthResponseDto[] => {
  const monthNumber = month.getMonth() + 1; // 0-based → 1-based

  // 체험 6575: 1월 데이터만 있음
  if (activityId === '6575') {
    return monthNumber === 1 ? [...DUMMY_RESERVATION_DATA_JAN] : [];
  }

  // 체험 6580: 2월 데이터만 있음
  if (activityId === '6580') {
    return monthNumber === 2 ? [...DUMMY_RESERVATION_DATA_FEB] : [];
  }

  // 그 외 체험은 빈 배열
  return [];
};

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
  const activityOptions = DUMMY_MY_ACTIVITIES.activities.map((activity) => ({
    id: activity.id,
    title: activity.title,
  }));

  // ID→제목 매핑을 위한 Map (O(1) 조회 성능)
  // activityOptions가 변경될 때만 재생성하여 불필요한 계산 방지
  const activityMap = useMemo(
    () => new Map(activityOptions.map((opt) => [opt.id.toString(), opt.title])),
    [activityOptions]
  );

  // 현재 선택된 체험 ID (드롭다운 value)
  const [selectedActivityId, setSelectedActivityId] = useState<string>(
    activityOptions[0]?.id.toString() || ''
  );

  // 달력에 표시할 현재 월 (년/월 정보 포함)
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 선택된 체험의 월별 예약 현황 데이터
  const [reservations, setReservations] = useState<FindReservationsByMonthResponseDto[]>([]);

  // 체험 ID 또는 월이 바뀔 때마다 API 호출
  useEffect(() => {
    const fetchReservations = async () => {
      const year = currentMonth.getFullYear();
      const month = currentMonth.getMonth() + 1;

      console.log(`API 호출: 체험 ${selectedActivityId}, ${year}년 ${month}월`);

      // TODO: 실제 API 호출로 교체
      // const data = await api.getReservationsByMonth(selectedActivityId, year, month);
      // setReservations(data);

      // TODO: 임시 더미 데이터 사용
      const data = getReservationData(selectedActivityId, currentMonth);
      setReservations(data);
    };

    fetchReservations();
  }, [selectedActivityId, currentMonth]);

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
      <ReservationCalendar
        reservations={reservations}
        currentMonth={currentMonth}
        onMonthChange={setCurrentMonth}
      />
    </div>
  );
}
