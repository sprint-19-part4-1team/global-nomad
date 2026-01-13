'use client';

import { Suspense, useState } from 'react';
import AllActivity from '@/features/main/components/all-activity/AllActivity';
import { useActivityFilters } from '@/features/main/hooks/useActivityFilters';
import EmptyState from '@/shared/components/empty-state/EmptyState';
import PopularSlide from '@/shared/components/slide/PopularSlide';
import Title from '@/shared/components/title/Title';

export default function ActivitySection() {
  const [isEmptyResult, setIsEmptyResult] = useState(false);

  const { keyword, activities } = useActivityFilters();

  return (
    <>
      {!isEmptyResult && !keyword && (
        <>
          <Title responsive='lg' className='mt-55 mb-14 sm:mt-92 sm:mb-16 md:mb-20'>
            🔥 인기 체험
          </Title>
          <PopularSlide />
        </>
      )}

      {keyword && (
        <div className='mt-46 text-gray-950 sm:mt-72 md:mt-90'>
          <div className='body-18'>
            <strong>{keyword}</strong> 으로 검색한 결과입니다.
          </div>
          <div className='mt-10 body-16 font-medium text-gray-700'>
            총 {activities?.length}개의 결과가 있습니다.
          </div>
        </div>
      )}

      <Suspense fallback={null}>
        <AllActivity onEmptyChange={setIsEmptyResult} />
      </Suspense>

      {/* 검색결과 없을 때 */}
      {isEmptyResult && <EmptyState mainText='검색 결과가 없어요.' type='experience' />}
    </>
  );
}
