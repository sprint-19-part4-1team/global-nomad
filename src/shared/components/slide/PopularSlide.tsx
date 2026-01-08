'use client';

import { cva } from 'class-variance-authority';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import Icons from '@/assets/icons';

type PopularSlideProps = {
  slides: number[];
};

export const carouselButtonVariants = cva(
  'group relative flex h-54 w-54 cursor-pointer items-center justify-center rounded-full border bg-white duration-300',
  {
    variants: {
      direction: {
        next: '-right-27',
        prev: '-left-27',
      },
      disabled: {
        true: 'pointer-events-none opacity-0',
        false: 'border-[#b3b3b3] hover:border-gray-400 hover:shadow-sm',
      },
    },
    defaultVariants: {
      disabled: false,
    },
  }
);

export default function PopularSlide({ slides }: PopularSlideProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    loop: false,
  });

  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(true);

  const updateButtons = useCallback(() => {
    if (!emblaApi) {
      return;
    }
    setPrevDisabled(!emblaApi.canScrollPrev());
    setNextDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) {
      return;
    }

    updateButtons();
    emblaApi.on('select', updateButtons);
    emblaApi.on('reInit', updateButtons);
  }, [emblaApi, updateButtons]);

  return (
    <div className='relative mx-auto w-full'>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='popular flex'>
          {slides.map((slide) => (
            <div
              className='box-border min-w-0 flex-none basis-1/3 bg-gray-200 text-center sm:basis-1/2 md:basis-1/4'
              key={slide}>
              <div className='h-120'>{slide}</div>
            </div>
          ))}
        </div>
      </div>

      <div className='absolute top-0 hidden h-full w-full items-center justify-between sm:flex'>
        <button
          aria-label='이전 슬라이드로 이동'
          onClick={() => emblaApi?.scrollPrev()}
          disabled={prevDisabled}
          aria-hidden={prevDisabled}
          className={carouselButtonVariants({
            direction: 'prev',
            disabled: prevDisabled,
          })}>
          <Icons.ArrowLeft className='w-24 text-gray-950 transition-colors duration-300 group-hover:text-primary-600' />
        </button>

        <button
          aria-label='다음 슬라이드로 이동'
          onClick={() => emblaApi?.scrollNext()}
          disabled={nextDisabled}
          aria-hidden={nextDisabled}
          className={carouselButtonVariants({
            direction: 'next',
            disabled: nextDisabled,
          })}>
          <Icons.ArrowRight className='uration-300 w-24 text-gray-950 transition-colors group-hover:text-primary-600' />
        </button>
      </div>
    </div>
  );
}
