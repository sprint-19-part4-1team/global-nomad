import ActivityContentTitle from '@/features/activity-detail/components/ActivityContentTitle';
import EmptyState from '@/shared/components/empty-state/EmptyState';
import { cn } from '@/shared/utils/cn';

/**
 * 리뷰 빈 상태 컴포넌트의 Props
 *
 * @property {string} [className] - 추가 CSS 클래스명
 */
interface ActivityReviewEmptyProps {
  className?: string;
}

/**
 * 리뷰가 없을 때 표시하는 빈 상태 컴포넌트
 *
 * @component
 * @param {ActivityReviewEmptyProps} props - 컴포넌트 props
 * @returns {JSX.Element} 빈 상태 섹션
 *
 * @example
 * ```tsx
 * <ActivityReviewEmpty />
 * ```
 */
export default function ActivityReviewEmpty({ className }: ActivityReviewEmptyProps) {
  return (
    <section
      className={cn(
        'flex flex-col gap-24 border-t border-gray-100 pt-20 pb-20 sm:gap-40 sm:pt-40',
        className
      )}>
      <div className='flex flex-col gap-8'>
        <div className='flex items-center gap-8'>
          <ActivityContentTitle>체험 후기</ActivityContentTitle>
          <span className='body-14 font-bold text-gray-600 sm:body-16'>0개</span>
        </div>
        <EmptyState mainText='아직 등록된 후기가 없어요' type='review' />
      </div>
    </section>
  );
}
