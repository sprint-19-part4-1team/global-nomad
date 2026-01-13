import { useEffect } from 'react';
import ActivityReservationContent from '@/features/activity-detail/components/reservation/content/ActivityReservationContent';
import Backdrop from '@/shared/components/overlay/primitives/backdrop/Backdrop';
import OverlayPortal from '@/shared/components/overlay/primitives/overlay-portal/OverlayPortal';
import OverlaySurface from '@/shared/components/overlay/primitives/overlay-surface/OverlaySurface';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';
import { CreateReservationBodyDto } from '@/shared/types/activities';

/**
 * 체험 예약 바텀시트 컴포넌트의 Props
 *
 * @property {string} activityId - 체험 ID
 * @property {number} price - 1인당 체험 가격
 * @property {(info: CreateReservationBodyDto & { dateTime: string }) => void} onConfirm - 예약 확인 핸들러
 */
interface ActivityReservationBottomSheetProps {
  activityId: string;
  price: number;
  onConfirm: (info: CreateReservationBodyDto & { dateTime: string }) => void;
}

/**
 * 체험 예약 바텀시트 컴포넌트
 *
 * 모바일, 태블릿 환경에서 화면 하단에 표시되는 예약 UI를 제공하며,
 * 오버레이 포털을 통해 렌더링됩니다.
 *
 * @description
 * 컴포넌트는 다음과 같은 기능을 제공합니다.
 * - 바텀시트 UI: 화면 하단에서 올라오는 시트 형태의 예약 인터페이스
 * - 백드롭: 바텀시트 외부 영역을 어둡게 표시
 * - 반응형 자동 닫기: 화면 크기가 1024px(lg) 이상으로 변경되면 자동으로 닫힘
 * - 오버레이 관리: `overlayStore`를 통한 오버레이 상태 관리
 * - 높이 제한: 최대 높이 700px로 제한하여 컨텐츠가 화면을 넘지 않도록 함
 * - 포털 렌더링: OverlayPortal을 통해 DOM 트리의 최상위에 렌더링
 * - 자체 데이터 조회: 내부에서 독립적으로 스케줄 데이터를 조회하여 월 변경 시 즉시 반영
 *
 * @param {ActivityReservationBottomSheetProps} props - 컴포넌트 props
 * @returns {JSX.Element} 렌더링된 바텀시트 오버레이
 *
 * @example
 * ```tsx
 * <ActivityReservationBottomSheet
 *   activityId="123"
 *   price={50000}
 *   onConfirm={(info) => {
 *     console.log('예약 정보:', info);
 *     overlayStore.pop();
 *   }}
 * />
 * ```
 */
export default function ActivityReservationBottomSheet({
  activityId,
  price,
  onConfirm,
}: ActivityReservationBottomSheetProps) {
  useEffect(() => {
    /** 화면 크기 변경 감지 핸들러 */
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
          activityId={activityId}
          price={price}
          onClose={() => overlayStore.pop()}
          onConfirm={onConfirm}
          isBottomSheet
        />
      </OverlaySurface>
    </OverlayPortal>
  );
}
