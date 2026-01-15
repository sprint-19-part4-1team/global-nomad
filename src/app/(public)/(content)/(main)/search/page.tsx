import { Suspense } from 'react';
import ActivitySection from '@/features/main/components/activity-section/ActivitySection';
import SearchBar from '@/features/main/components/search-bar/SearchBar';
import Button from '@/shared/components/button/Button';
import Title from '@/shared/components/title/Title';

export default function SearchPage() {
  return (
    <>
      <Title responsive='lg' className='mt-30 mb-12 text-center sm:mt-62 sm:mb-36 md:mt-82'>
        무엇을 체험하고 싶으신가요?
      </Title>
      <Suspense fallback={null}>
        <div className='px-0 sm:px-40'>
          <SearchBar />
        </div>
        <ActivitySection />
      </Suspense>
      <Button href='/' variant='secondary' className='mx-auto mt-48'>
        전체목록으로
      </Button>
    </>
  );
}
