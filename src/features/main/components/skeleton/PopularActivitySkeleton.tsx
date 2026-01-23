import ActivityCardSkeleton from '@/features/main/components/skeleton/ActivityCardSkeleton';

/**
 * 인기 체험 목록의 스켈레톤 로딩 UI 컴포넌트
 *
 * @description
 * 인기 체험 데이터를 불러오는 동안 표시되는 플레이스홀더 UI입니다.
 * 반응형 디자인을 지원하며, 화면 크기에 따라 표시되는 카드 수가 자동으로 조정됩니다.
 *
 * @remarks
 * - 모바일: 2.5개의 카드 표시
 * - 태블릿 (sm): 2개의 카드 표시
 * - 데스크톱 (lg): 4개의 카드 표시
 * - 가로 스크롤 지원 (스크롤바 숨김 처리)
 * - 접근성을 위한 ARIA 속성 포함
 *
 * @returns PopularActivitySkeleton 컴포넌트
 *
 * @example
 * ```tsx
 * import DelayedSuspense from '@/shared/components/delayed-suspense/DelayedSuspense';
 *
 * function PopularActivitiesPage() {
 *   return (
 *     <DelayedSuspense fallback={<PopularActivitySkeleton />}>
 *       <PopularActivityList />
 *     </DelayedSuspense>
 *   );
 * }
 * ```
 */
export default function PopularActivitySkeleton() {
  return (
    <section
      className='scrollbar-hidden overflow-x-auto'
      aria-busy='true'
      aria-label='인기 체험 로딩 중'>
      <div className='flex w-full gap-12 sm:gap-20 lg:gap-24' aria-hidden='true'>
        <ActivityCardSkeleton variant='popular' className='shrink-0' />
        <ActivityCardSkeleton variant='popular' className='shrink-0' />
        <ActivityCardSkeleton variant='popular' className='shrink-0 sm:hidden lg:block' />
        <ActivityCardSkeleton variant='popular' className='hidden shrink-0 lg:block' />
      </div>
    </section>
  );
}
