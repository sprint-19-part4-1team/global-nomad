'use client';

import { format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import Icons from '@/assets/icons';
import { useDailyReservations } from '@/features/mypage/reservation-status/queries/useDailyReservations';
import Backdrop from '@/shared/components/overlay/primitives/backdrop/Backdrop';
import OverlayPortal from '@/shared/components/overlay/primitives/overlay-portal/OverlayPortal';
import OverlaySurface from '@/shared/components/overlay/primitives/overlay-surface/OverlaySurface';
import { Tabs, TabsContent } from '@/shared/components/tabs';
import Title from '@/shared/components/title/Title';
import useOutsideClick from '@/shared/hooks/useOutsideClick';
import { ActivityReservationStatus } from '@/shared/types/myActivities';
import { ReservationStatus } from '@/shared/types/myReservations';
import { formatDateToString } from '@/shared/utils/dateUtil';
import ReservationTabButtons from './ReservationTabButtons';
import ReservationTabContent from './ReservationTabContent';
import ReservationTimeDropdown from './ReservationTimeDropdown';

/**
 * 예약 상세 패널 컴포넌트의 Props 타입
 *
 * @property activityId - 액티비티 ID
 * @property date - 선택된 날짜
 * @property onClose - 패널 닫기 콜백 함수
 */
interface ReservationDetailPanelProps {
  activityId: string;
  date: Date;
  onClose: () => void;
}

/**
 * 예약 상세 패널 컴포넌트
 *
 * 특정 날짜의 예약 내역을 시간대별로 조회하고,
 * 예약 상태별(신청/승인/거절)로 관리할 수 있는 패널을 제공합니다.
 *
 * @description
 * - 우측에서 열리는 오버레이 패널
 * - 선택된 날짜의 모든 스케줄 시간대를 드롭다운으로 선택 가능
 * - 각 시간대별 예약 상태(신청/승인/거절) 개수 표시
 * - 패널이 열릴 때마다 신청 탭으로 초기화
 *
 * @param props - 컴포넌트 Props
 * @returns 예약 상세 패널 컴포넌트
 *
 * @example
 * ```tsx
 * <ReservationDetailPanel
 *   activityId="123"
 *   date={new Date('2024-01-15')}
 *   onClose={() => console.log('패널 닫힘')}
 * />
 * ```
 */
export default function ReservationDetailPanel({
  activityId,
  date,
  onClose,
}: ReservationDetailPanelProps) {
  const surfaceRef = useRef<HTMLDivElement>(null);

  const [selectedScheduleId, setSelectedScheduleId] = useState<string>('');
  const [tabValue, setTabValue] = useState<ActivityReservationStatus>(ReservationStatus.Pending);

  const formattedDate = formatDateToString(date);

  // 선택된 날짜의 스케줄 목록 조회
  const { schedules, isPending: isSchedulesPending } = useDailyReservations({
    activityId: Number(activityId),
    params: {
      date: formattedDate,
    },
  });

  // 패널이 열릴 때마다 신청 탭으로 초기화
  useEffect(() => {
    setTabValue(ReservationStatus.Pending);
  }, []);

  // 스케줄 목록이 로드되거나 변경되면 선택된 스케줄의 유효성 검증
  useEffect(() => {
    if (schedules.length > 0) {
      // 현재 선택된 스케줄이 목록에 있는지 확인
      const isSelectedScheduleValid = schedules.some(
        (s) => s.scheduleId.toString() === selectedScheduleId
      );

      // 유효하지 않으면 첫 번째 스케줄로 설정
      if (!isSelectedScheduleValid) {
        setSelectedScheduleId(schedules[0].scheduleId.toString());
      }
    } else {
      // 스케줄이 없으면 선택 해제
      setSelectedScheduleId('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schedules]);

  useOutsideClick(surfaceRef, onClose);

  // 화면에 표시할 날짜 포맷 (예: 24년 01월 15일)
  const displayDate = format(date, 'yy년 MM월 dd일');

  // 현재 선택된 스케줄의 예약 개수 정보
  const scheduleCount = schedules.find(
    (s) => s.scheduleId.toString() === selectedScheduleId
  )?.count;

  return (
    <OverlayPortal>
      <div role='dialog'>
        <Backdrop />
        <OverlaySurface ref={surfaceRef} position='right' variant='panel'>
          <div className='flex h-full w-full flex-col gap-12 px-24 py-30 sm:gap-16 sm:p-32 sm:pb-48'>
            {/* 헤더: 날짜 표시 및 닫기 버튼 */}
            <div className='flex w-full items-center justify-between'>
              <Title as='h3' size='18' className='sm:heading-20'>
                {displayDate}
              </Title>
              <button
                onClick={onClose}
                aria-label={`${displayDate} 예약 상세 패널 닫기`}
                className='h-24 w-24 sm:h-40 sm:w-40'>
                <Icons.Close aria-hidden='true' />
              </button>
            </div>

            <Tabs
              value={tabValue}
              onChangeValue={(value) => setTabValue(value as ActivityReservationStatus)}>
              <div className='flex flex-col gap-20 sm:gap-32'>
                {/* 예약 상태별 탭 버튼 (신청/승인/거절) */}
                <ReservationTabButtons scheduleCount={scheduleCount} />

                {/* 시간대 선택 드롭다운 */}
                <ReservationTimeDropdown
                  schedules={schedules}
                  selectedScheduleId={selectedScheduleId}
                  onChangeSchedule={setSelectedScheduleId}
                  isPending={isSchedulesPending}
                />

                {/* 예약 내역 섹션 */}
                <div className='flex flex-col gap-12'>
                  <Title as='h4' responsive='sm'>
                    예약 내역
                  </Title>

                  {/* 각 탭의 독립적인 컨텐츠 */}
                  <TabsContent value={ReservationStatus.Pending} className='mt-0 sm:mt-0'>
                    <ReservationTabContent
                      activityId={activityId}
                      scheduleId={selectedScheduleId}
                      date={formattedDate}
                      currentTab={ReservationStatus.Pending}
                    />
                  </TabsContent>

                  <TabsContent value={ReservationStatus.Confirmed} className='mt-0 sm:mt-0'>
                    <ReservationTabContent
                      activityId={activityId}
                      scheduleId={selectedScheduleId}
                      date={formattedDate}
                      currentTab={ReservationStatus.Confirmed}
                    />
                  </TabsContent>

                  <TabsContent value={ReservationStatus.Declined} className='mt-0 sm:mt-0'>
                    <ReservationTabContent
                      activityId={activityId}
                      scheduleId={selectedScheduleId}
                      date={formattedDate}
                      currentTab={ReservationStatus.Declined}
                    />
                  </TabsContent>
                </div>
              </div>
            </Tabs>
          </div>
        </OverlaySurface>
      </div>
    </OverlayPortal>
  );
}
