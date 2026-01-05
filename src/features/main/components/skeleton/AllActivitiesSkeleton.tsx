import ActivityCardSkeleton from '@/features/main/components/skeleton/ActivityCardSkeleton';

/**
 * 모든 체험 목록의 스켈레톤 로딩 UI 컴포넌트
 *
 * @description
 * 모든 체험 데이터를 불러오는 동안 표시되는 플레이스홀더 UI입니다.
 * 반응형 디자인을 지원하며, 화면 크기에 따라 레이아웃과 카드 수가 자동으로 조정됩니다.
 *
 * @remarks
 * - 모바일: 세로 배치, 4개의 카드 표시 (gap: 24px)
 * - 태블릿 (sm): 2열 그리드 배치, 4개의 카드 표시 (가로 gap: 20px, 세로 gap: 24px)
 * - 데스크탑 (lg): 가로 배치, 8개의 카드 표시 (가로 gap: 24px, 세로 섹션 간 gap: 30px)
 * - 가로 스크롤 지원 (스크롤바 숨김 처리)
 * - 접근성을 위한 ARIA 속성 포함
 *
 * @example
 * ```tsx
 * import DelayedSuspense from '@/shared/components/delayed-suspense/DelayedSuspense';
 *
 * function AllActivitiesPage() {
 *   return (
 *     <DelayedSuspense fallback={<AllActivitiesSkeleton />}>
 *       <AllActivitiesList />
 *     </DelayedSuspense>
 *   );
 * }
 * ```
 *
 * @returns 모든 체험 스켈레톤 UI 섹션
 */
export default function AllActivitiesSkeleton() {
  return (
    // TODO: 실제 디자인에 맞춰 스켈레톤 스타일(크기·레이아웃) 조정 필요
    <section
      className='scrollbar-hidden overflow-x-auto'
      role='status'
      aria-busy='true'
      aria-label='모든 체험 로딩 중'>
      <div className='flex flex-col lg:gap-30'>
        <div className='flex flex-col gap-24 sm:grid sm:grid-cols-2 sm:gap-x-20 sm:gap-y-24 lg:flex lg:flex-row lg:gap-24'>
          {Array.from({ length: 4 }).map((_, i) => (
            <ActivityCardSkeleton key={i} variant='default' className='shrink-0' />
          ))}
        </div>
        <div className='hidden gap-24 lg:flex'>
          {Array.from({ length: 4 }).map((_, i) => (
            <ActivityCardSkeleton key={`desktop-${i}`} variant='default' className='shrink-0' />
          ))}
        </div>
      </div>
    </section>
  );
}
