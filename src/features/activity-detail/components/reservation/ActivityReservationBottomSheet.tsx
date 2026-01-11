import { useEffect } from 'react';
import ActivityReservationContent from '@/features/activity-detail/components/reservation/content/ActivityReservationContent';
import Backdrop from '@/shared/components/overlay/primitives/backdrop/Backdrop';
import OverlayPortal from '@/shared/components/overlay/primitives/overlay-portal/OverlayPortal';
import OverlaySurface from '@/shared/components/overlay/primitives/overlay-surface/OverlaySurface';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';
import { CreateReservationBodyDto, ScheduleResponseDto } from '@/shared/types/activities';

/**
 * 체험 예약 바텀시트 컴포넌트의 Props
 * @property {number} price - 1인당 체험 가격
 * @property {ScheduleResponseDto[]} schedules - 예약 가능한 스케줄 목록
 * @property {(info: CreateReservationBodyDto & { dateTime: string }) => void} onConfirm - 예약 확인 핸들러
 */
interface ActivityReservationBottomSheetProps {
  price: number;
  schedules: ScheduleResponseDto[];
  onConfirm: (info: CreateReservationBodyDto & { dateTime: string }) => void;
}

/**
 * 체험 예약 바텀시트 컴포넌트
 *
 * 모바일, 테블릿 환경에서 화면 하단에 표시되는 예약 UI를 제공하며,
 * 오버레이 포털을 통해 렌더링됩니다.
 *
 * @description
 * 컴포넌트는 다음과 같은 기능을 제공합니다.
 * - 바텀시트 UI: 화면 하단에서 올라오는 시트 형태의 예약 인터페이스
 * - 백드롭: 바텀시트 외부 영역을 어둡게 표시
 * - 반응형 자동 닫기: 화면 크기가 1024px(lg) 이상으로 변경되면 자동으로 닫힘
 * - 오버레이 관리: overlayStore를 통한 오버레이 상태 관리
 * - 높이 제한: 최대 높이 700px로 제한하여 컨텐츠가 화면을 넘지 않도록 함
 * - 포털 렌더링: OverlayPortal을 통해 DOM 트리의 최상위에 렌더링
 *
 * @param {ActivityReservationBottomSheetProps} props - 컴포넌트 props
 * @returns {JSX.Element} 렌더링된 바텀시트 오버레이
 *
 * @example
 * ```tsx
 * <ActivityReservationBottomSheet
 *   price={50000}
 *   schedules={[
 *     {
 *       id: 1,
 *       date: '2026-01-15',
 *       startTime: '10:00',
 *       endTime: '12:00',
 *       count: 5
 *     }
 *   ]}
 *   onConfirm={(info) => {
 *     console.log('예약 정보:', info);
 *     // API 호출 등의 처리
 *   }}
 * />
 * ```
 */
export default function ActivityReservationBottomSheet({
  price,
  schedules,
  onConfirm,
}: ActivityReservationBottomSheetProps) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        overlayStore.pop();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <OverlayPortal>
      <Backdrop />
      <OverlaySurface position='bottom' variant='sheet' className='z-10 h-auto max-h-700'>
        <ActivityReservationContent
          price={price}
          schedules={schedules}
          onClose={() => overlayStore.pop()}
          onConfirm={onConfirm}
          isBottomSheet
        />
      </OverlaySurface>
    </OverlayPortal>
  );
}
