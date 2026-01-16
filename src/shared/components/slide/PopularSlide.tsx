'use client';

import { useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '@/features/main/components/card/Card';
import { usePopularActivities } from '@/features/main/queries/usePopularActivities';
import CarouselButton from '@/shared/components/slide/CarouselButton';

export default function PopularSlide() {
  const getSlidesToShow = () => {
    if (typeof window === 'undefined') {
      return 4;
    }

    const width = window.innerWidth;
    if (width < 640) {
      return 2.5;
    } // 모바일
    if (width < 768) {
      return 2;
    } // 태블릿
    return 4; // PC
  };

  const sliderRef = useRef<Slider>(null);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePopularActivities();
  const [currentSlide, setCurrentSlide] = useState(0);

  const allActivities = data?.pages.flatMap((page) => page.activities) ?? [];

  // next 버튼 클릭(swipe)시
  const checkAndFetchNextPage = async (slideIndex: number) => {
    const isNearEnd = slideIndex >= allActivities.length - 5;

    if (isNearEnd && hasNextPage && !isFetchingNextPage) {
      await fetchNextPage();
    }
  };

  const handleNextClick = async () => {
    await checkAndFetchNextPage(currentSlide + 1);
    sliderRef.current?.slickNext();
  };

  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

  useEffect(() => {
    setSlidesToShow(getSlidesToShow());

    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
      if (sliderRef.current) {
        sliderRef.current.slickGoTo(currentSlide); // 첫 슬라이드로 이동
        setCurrentSlide(currentSlide); // 상태도 초기화
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 버튼 상태 관리
  const isPrevDisabled = currentSlide === 0;
  const isNextDisabled = !hasNextPage && currentSlide >= allActivities.length - slidesToShow;

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    afterChange: async (index: number) => {
      setCurrentSlide(index);
      await checkAndFetchNextPage(index);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          // slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          // slidesToShow: 2.5,
          swipe: true,
          swipeToSlide: true,
          touchThreshold: 10,
        },
      },
    ],
  };

  return (
    <div className='popular relative'>
      <Slider ref={sliderRef} {...settings} className='-mr-24 sm:-mr-20 md:-mr-24'>
        {allActivities.map((activity, index) => (
          <div
            key={`${activity.id}-${index}`}
            className='box-border min-w-156 flex-none pr-12 sm:pr-20 md:pr-24'>
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
      </Slider>

      <CarouselButton
        direction='prev'
        onClick={() => sliderRef.current?.slickPrev()}
        disabled={isPrevDisabled}
      />

      <CarouselButton direction='next' onClick={handleNextClick} disabled={isNextDisabled} />
    </div>
  );
}
