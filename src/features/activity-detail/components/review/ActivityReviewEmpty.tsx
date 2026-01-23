import ActivityContentTitle from '@/features/activity-detail/components/ActivityContentTitle';
import EmptyState from '@/shared/components/empty-state/EmptyState';
import Skeleton from '@/shared/components/skeleton/Skeleton';
import { cn } from '@/shared/utils/cn';

/**
 * 리뷰 상태 컴포넌트의 Props
 *
 * @property [state='empty'] - 표시할 상태 ('empty' | 'pending' | 'error')
 * @property [className] - 추가 CSS 클래스명
 */
interface ActivityReviewEmptyProps {
  state?: 'empty' | 'pending' | 'error';
  className?: string;
}

/**
 * 리뷰가 없거나 로딩 중이거나 에러일 때 표시하는 컴포넌트
 *
 * @component
 * @param props - 컴포넌트 props
 * @returns 빈 상태 섹션
 *
 * @example
 * ```tsx
 * <ActivityReviewEmpty />
 * <ActivityReviewEmpty state="loading" />
 * <ActivityReviewEmpty state="error" />
 * ```
 */
export default function ActivityReviewEmpty({
  state = 'empty',
  className,
}: ActivityReviewEmptyProps) {
  return (
    <section
      className={cn(
        'flex flex-col gap-24 border-t border-gray-100 pt-20 pb-20 sm:gap-40 sm:pt-40',
        className
      )}>
      <div className='flex flex-col gap-8'>
        <div className='flex items-center gap-8'>
          <ActivityContentTitle>체험 후기</ActivityContentTitle>
          {state === 'empty' && (
            <span className='body-14 font-bold text-gray-600 sm:body-16'>0개</span>
          )}
        </div>
        {state === 'empty' && <EmptyState mainText='아직 등록된 후기가 없어요' type='review' />}
        {state === 'pending' && <Skeleton className='h-222 w-327 rounded-24 sm:w-694 lg:w-670' />}
        {state === 'error' && (
          <div className='flex w-full justify-center py-20 body-16 font-medium tracking-[-0.4px] text-gray-400'>
            후기를 불러오는 데 실패했어요
          </div>
        )}
      </div>
    </section>
  );
}
