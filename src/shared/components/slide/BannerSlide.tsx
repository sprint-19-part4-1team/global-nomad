'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useRandomActivities } from '@/features/main/queries/useRandomActivities';

export default function BannerSlide() {
  const { data: activities, isLoading } = useRandomActivities();
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
      className='mx-auto w-full'
      onMouseEnter={() => autoplay.current.stop()}
      onMouseLeave={() => autoplay.current.play()}>
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex'>
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className='h-40 min-w-0 flex-none basis-full animate-pulse bg-gray-200'
                />
              ))
            : activities?.map((activity) => (
                <Link
                  href={`/activity/${activity.id}`}
                  key={activity.id}
                  className='relative h-181 min-w-0 flex-none basis-full overflow-hidden rounded-12 text-center sm:h-375 sm:rounded-18 md:h-500 md:rounded-24'>
                  <Image
                    src={activity.bannerImageUrl}
                    alt={activity.title}
                    fill
                    sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    className='object-cover'
                  />
                  <strong className='sm:body-24 md:body-32 absolute bottom-48 block w-full text-center body-18 font-bold text-white sm:bottom-60 md:bottom-80'>
                    {activity.title}
                  </strong>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
}
