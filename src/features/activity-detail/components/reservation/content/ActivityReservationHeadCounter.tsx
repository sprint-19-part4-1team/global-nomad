import Icons from '@/assets/icons';
import ActivityReservationContentTitle from '@/features/activity-detail/components/reservation/content/ActivityReservationContentTitle';

/**
 * 체험 예약 인원 카운터 컴포넌트의 Props
 * @property {number} count - 현재 선택된 인원 수
 * @property {(count: number) => void} onCountChange - 인원 수 변경 핸들러
 * @property {number} [minCount] - 최소 인원 수 (기본값: 1)
 * @property {number} [maxCount] - 최대 인원 수 (기본값: 30)
 */
interface ActivityReservationHeadCounterProps {
  count: number;
  onCountChange: (count: number) => void;
  minCount?: number;
  maxCount?: number;
}

/**
 * 체험 예약 인원 카운터 컴포넌트
 *
 * 체험 예약 시 참여 인원 수를 증가/감소할 수 있는 카운터를 제공합니다.
 * 최소 인원 수 이하로는 감소할 수 없고, 최대 인원 수 이상으로는 증가할 수 없도록 제한됩니다.
 *
 * @description
 * 컴포넌트는 다음과 같은 기능을 제공합니다:
 * - 인원 증가: Plus 버튼을 클릭하여 인원 수 1씩 증가
 * - 인원 감소: Minus 버튼을 클릭하여 인원 수 1씩 감소
 * - 최소 인원 제한: minCount 이하로 감소 불가, 버튼 비활성화
 * - 최대 인원 제한: maxCount 이상으로 증가 불가, 버튼 비활성화
 * - 접근성: aria-label을 통한 스크린 리더 지원
 * - 타이틀: "참여 인원 수" 레이블 표시
 *
 * @param {ActivityReservationHeadCounterProps} props - 컴포넌트 props
 * @returns {JSX.Element} 렌더링된 인원 카운터
 *
 * @example
 * ```tsx
 * <ActivityReservationHeadCounter
 *   count={2}
 *   onCountChange={(count) => setHeadCount(count)}
 *   minCount={1}
 *   maxCount={30}
 * />
 * ```
 */
export default function ActivityReservationHeadCounter({
  count,
  onCountChange,
  minCount = 1,
  maxCount = 30,
}: ActivityReservationHeadCounterProps) {
  const handleDecrement = () => {
    onCountChange(Math.max(minCount, count - 1));
  };

  const handleIncrement = () => {
    onCountChange(Math.min(maxCount, count + 1));
  };

  return (
    <div className='flex items-center justify-between'>
      <ActivityReservationContentTitle>참여 인원 수</ActivityReservationContentTitle>
      <div className='flex h-48 w-144 items-center justify-between rounded-12 border border-gray-100 px-10'>
        <button
          onClick={handleDecrement}
          className='p-10'
          disabled={count <= minCount}
          aria-label='인원 감소'>
          <Icons.Minus aria-hidden='true' className='text-700 h-20 w-20' />
        </button>
        <span className='h-40 w-40 p-8 text-center body-16 font-bold text-gray-700'>{count}</span>
        <button
          onClick={handleIncrement}
          className='p-10'
          disabled={count >= maxCount}
          aria-label='인원 증가'>
          <Icons.Plus aria-hidden='true' className='text-700 h-20 w-20' />
        </button>
      </div>
    </div>
  );
}
