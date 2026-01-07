'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useRef } from 'react';

export default function BannerSlide() {
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
      stopOnMouseEnter: false,
      stopOnInteraction: false,
    })
  );

  const [emblaRef] = useEmblaCarousel({ loop: true }, [autoplay.current]);

  return (
    <div
      className='relative mx-auto w-full'
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.play()}>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex'>
          <div className='min-w-0 flex-none basis-full bg-gray-200 text-center'>Slide 1</div>
          <div className='min-w-0 flex-none basis-full bg-gray-200 text-center'>Slide 2</div>
          <div className='min-w-0 flex-none basis-full bg-gray-200 text-center'>Slide 3</div>
        </div>
      </div>
    </div>
  );
}
