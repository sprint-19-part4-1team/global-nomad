'use client';

import { cva } from 'class-variance-authority';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import Icons from '@/assets/icons';
import Card from '@/features/main/components/card/Card';
import { usePopularActivities } from '@/features/main/queries/usePopularActivities';

const INITIAL_COUNT = 4;

export const carouselButtonVariants = cva(
  'hidden sm:flex group absolute top-1/2 -mt-27 flex h-54 w-54 items-center justify-center rounded-full border bg-white duration-300',
  {
    variants: {
      direction: {
        next: '-right-27',
        prev: '-left-27',
      },
      disabled: {
        true: 'pointer-events-none opacity-0',
        false: 'border-[#b3b3b3] hover:border-gray-400 hover:shadow-sm cursor-pointer',
      },
    },
  }
);

export default function PopularSlide() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    loop: false,
  });

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [prevDisabled, setPrevDisabled] = useState(true);

  const { data, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePopularActivities();

  // 모든 페이지의 activities를 하나의 배열로 합치기
  const activities = data?.pages.flatMap((page) => page.activities) ?? [];
  const visibleActivities = activities.slice(0, visibleCount);

  // 더 보여줄 데이터가 있는지 확인
  const hasMoreToShow = visibleCount < activities.length || hasNextPage;

  const updateButtons = useCallback(() => {
    if (!emblaApi) {
      return;
    }
    setPrevDisabled(!emblaApi.canScrollPrev());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }
    updateButtons();
    emblaApi.on('select', updateButtons);
    emblaApi.on('reInit', updateButtons);
  }, [emblaApi, updateButtons]);

  // visibleCount가 변경될 때 Embla reInit
  useEffect(() => {
    if (!emblaApi) {
      return;
    }
    emblaApi.reInit();
  }, [emblaApi, visibleCount]);

  const handleNext = () => {
    if (!emblaApi) {
      return;
    }

    // 상태 업데이트 로직
    const currentIndex = emblaApi.selectedScrollSnap();
    const totalSlides = emblaApi.scrollSnapList().length;
    const nextIndex = currentIndex + 1;

    // 다음 위치가 끝에 가까우면 미리 데이터 준비
    if (nextIndex >= totalSlides - 2) {
      if (visibleCount < activities.length) {
        setVisibleCount((prev) => prev + 1);
      } else if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }

    // 한 박자 쉬고 스크롤 실행 (상태 업데이트 후 reInit 대기)
    setTimeout(() => {
      emblaApi?.scrollNext();
    }, 50);
  };

  if (isPending) {
    return <div>인기체험 로딩중...</div>;
  }

  return (
    <>
      <div className='relative mx-auto w-full'>
        <div ref={emblaRef} className='overflow-hidden'>
          {/* mr-24 */}
          <div className='-mr-12 flex sm:-mr-20 md:-mr-24'>
            {visibleActivities.map((activity) => (
              //  basis-1/4 pr-24
              <div
                key={activity.id}
                className='box-border min-w-0 flex-none basis-1/3 pr-12 sm:basis-1/2 sm:pr-20 md:basis-1/4 md:pr-24'>
                <Card
                  id={activity.id}
                  bannerImageUrl={activity.bannerImageUrl}
                  title={activity.title}
                  rating={activity.rating}
                  reviewCount={activity.reviewCount}
                  price={activity.price}
                />
              </div>
            ))}
            {isFetchingNextPage && (
              <div className='box-border flex min-w-0 flex-none basis-1/4 items-center justify-center pr-24'>
                인기체험 로딩중...
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => emblaApi?.scrollPrev()}
          disabled={prevDisabled}
          className={carouselButtonVariants({
            direction: 'prev',
            disabled: prevDisabled,
          })}>
          <Icons.ArrowLeft className='w-24 text-gray-950 transition-colors duration-300 group-hover:text-primary-600' />
        </button>

        <button
          onClick={handleNext}
          disabled={!hasMoreToShow}
          className={carouselButtonVariants({
            direction: 'next',
            disabled: !hasMoreToShow,
          })}>
          <Icons.ArrowRight className='w-24 text-gray-950 transition-colors duration-300 group-hover:text-primary-600' />
        </button>
      </div>
    </>
  );
}
