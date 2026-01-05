import MypageCardSkeleton from '@/features/mypage/components/skeleton/MypageCardSkeleton';
import { cn } from '@/shared/utils/cn';

/**
 * 마이페이지 리스트의 간격 설정
 * @constant
 */
const LIST_GAP = {
  reservation: 'gap-24',
  activity: 'gap-20 sm:gap-24',
} as const;

/**
 * MypageListSkeleton 컴포넌트의 Props
 *
 * @property {'reservation' | 'activity'} variant - 리스트 스타일 변형 ('reservation': 예약 내역, 'activity': 내 체험 관리)
 * @property {number} [count=4] - 표시할 스켈레톤 카드의 개수
 * @property {string} [className] - 추가 CSS 클래스명
 */
interface MypageListSkeletonProps {
  /** 리스트 스타일 변형 ('reservation': 예약 내역, 'activity': 내 체험 관리) */
  variant: 'reservation' | 'activity';
  /** 표시할 스켈레톤 카드의 개수 */
  count?: number;
  /** 추가 CSS 클래스명 */
  className?: string;
}

/**
 * 마이페이지 리스트 로딩 상태를 표시하는 스켈레톤 UI 컴포넌트
 *
 * 예약 내역 또는 내 체험 관리 리스트의 로딩 상태를 시각적으로 표현합니다.
 * variant에 따라 다른 간격과 스타일이 적용됩니다.
 *
 * @param props - 컴포넌트 props
 * @param props.variant - 리스트 스타일 변형 ('reservation' 또는 'activity')
 * @param props.count - 표시할 스켈레톤 카드의 개수 (기본값: 4)
 * @param props.className - 추가 CSS 클래스명 (선택)
 *
 * @returns {JSX.Element} MypageListSkeleton 컴포넌트
 *
 * @example
 * ```tsx
 * import DelayedSuspense from '@/shared/components/delayed-suspense/DelayedSuspense';
 *
 * function ReservationPage() {
 *   return (
 *     <DelayedSuspense fallback={<MypageListSkeleton variant="reservation" count={3} />}>
 *       <ReservationList />
 *     </DelayedSuspense>
 *   );
 * }
 *
 * function MyActivitiesPage() {
 *   return (
 *     <DelayedSuspense fallback={<MypageListSkeleton variant="activity" count={5} />}>
 *       <MyActivitiesList />
 *     </DelayedSuspense>
 *   );
 * }
 * ```
 */
export default function MypageListSkeleton({
  variant,
  count = 4,
  className,
}: MypageListSkeletonProps) {
  return (
    <div className={cn('flex flex-col', LIST_GAP[variant], className)}>
      {Array.from({ length: count }).map((_, i) => (
        <MypageCardSkeleton key={i} variant={variant} />
      ))}
    </div>
  );
}
