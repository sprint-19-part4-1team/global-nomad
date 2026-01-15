// app/(main)/page.tsx (메인 페이지)
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import ActivitySection from '@/features/main/components/activity-section/ActivitySection';
import SearchBar from '@/features/main/components/search-bar/SearchBar';
import { pickRandom } from '@/features/main/utils/pickRandom';
import { getActivities } from '@/shared/apis/feature/activities';
import BannerSlide from '@/shared/components/slide/BannerSlide';
import PopularSlide from '@/shared/components/slide/PopularSlide';
import Title from '@/shared/components/title/Title';
import { QUERY_KEYS } from '@/shared/constants/';
import { getQueryClient } from '@/shared/utils/getQueryClient';

export default async function Home() {
  const queryClient = getQueryClient();

  // prefetch 로직들...
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.RANDOM_ACTIVITIES(5),
    queryFn: async () => {
      const data = await getActivities({
        method: 'offset',
        page: 1,
        size: 9999,
      });
      return pickRandom(data.activities, 5);
    },
    staleTime: 1000 * 60 * 5,
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['activities', 'popular'],
    queryFn: async ({ pageParam }) => {
      const isFirstPage = pageParam === undefined;
      return await getActivities({
        method: 'cursor',
        cursorId: pageParam as number | undefined,
        sort: 'most_reviewed',
        size: isFirstPage ? 4 : 1,
      });
    },
    initialPageParam: undefined,
    staleTime: 1000 * 60 * 5,
  });

  await queryClient.prefetchQuery({
    queryKey: [
      'activities',
      {
        method: 'offset',
        page: 1,
        size: 8,
        category: undefined,
        keyword: undefined,
        sort: 'latest',
      },
    ],
    queryFn: () =>
      getActivities({
        method: 'offset',
        page: 1,
        size: 8,
        sort: 'latest',
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BannerSlide />
      <Title responsive='lg' className='mt-30 mb-12 text-center sm:mt-62 sm:mb-36 md:mt-82'>
        무엇을 체험하고 싶으신가요?
      </Title>
      <Suspense fallback={null}>
        <div className='px-0 sm:px-40'>
          <SearchBar />
        </div>
        <Title responsive='lg' className='mt-55 mb-14 sm:mt-92 sm:mb-16 md:mb-20'>
          🔥 인기 체험
        </Title>
        <PopularSlide />
        <ActivitySection />
      </Suspense>
      <div />
    </HydrationBoundary>
  );
}
