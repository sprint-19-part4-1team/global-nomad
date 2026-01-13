import { Suspense } from 'react';
import ActivitySection from '@/app/(public)/(content)/(main)/components/activitySection/ActivitySection';
import SearchBar from '@/features/main/components/search-bar/SearchBar';
import BannerSlide from '@/shared/components/slide/BannerSlide';
import Title from '@/shared/components/title/Title';
import { layoutContainer } from '@/shared/constants/';

export default function Home() {
  return (
    <main
      className='min-h-[calc(100dvh-130px-80px)] sm:min-h-[calc(100dvh-146px-100px)] lg:min-h-[calc(100dvh-146px-180px)]'
      style={{
        background:
          'url("/cloud.png") center top /cover no-repeat, linear-gradient(180deg, rgba(201, 228, 255, 1) 0%, rgba(228, 241, 255, 1) 29%, rgba(254, 254, 255, 1) 100%)',
      }}>
      <div
        className={layoutContainer({
          maxWidth: 1200,
          paddingX: 'wide',
          paddingTop: 'md',
        })}>
        <BannerSlide />
        <Title responsive='lg' className='mt-30 mb-12 text-center sm:mt-62 sm:mb-36 md:mt-82'>
          무엇을 체험하고 싶으신가요?
        </Title>
        <Suspense fallback={null}>
          <div className='px-0 sm:px-40'>
            <SearchBar />
          </div>
        </Suspense>

        <ActivitySection />

        <div />
      </div>
    </main>
  );
}
