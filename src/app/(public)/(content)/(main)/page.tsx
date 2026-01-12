import { Suspense } from 'react';
import AllActivity from '@/app/(public)/(content)/(main)/components/all-activity/AllActivity';
import SearchBar from '@/features/main/components/search-bar/SearchBar';
import EmptyState from '@/shared/components/empty-state/EmptyState';
import BannerSlide from '@/shared/components/slide/BannerSlide';
import PopularSlide from '@/shared/components/slide/PopularSlide';
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
          <SearchBar />
        </Suspense>

        <Title responsive='lg' className='mt-55 mb-14 sm:mt-92 sm:mb-16 md:mb-20'>
          🔥 인기 체험
        </Title>
        <PopularSlide />

        <Suspense fallback={null}>
          <AllActivity />
        </Suspense>

        <EmptyState
          button={{
            href: '/activity/new',
            text: '체험 등록하기',
          }}
          mainText={`멋진 체험을 기다리는 중이에요.
체험을 등록해보세요!`}
          type='experience'
        />

        <div />
      </div>
    </main>
  );
}
