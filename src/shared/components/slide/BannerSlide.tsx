'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useRandomActivities } from '@/features/main/queries/useRandomActivities';
import Skeleton from '@/shared/components/skeleton/Skeleton';

export default function BannerSlide() {
  const { data: activities, isPending } = useRandomActivities();
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
          {isPending ? (
            <>
              <Skeleton className='h-181 w-full rounded-12 sm:h-375 sm:rounded-18 md:h-500 md:rounded-24' />
            </>
          ) : (
            activities?.map((activity) => (
              <Link
                href={`/activity/${activity.id}`}
                key={activity.id}
                className='relative h-181 min-w-0 flex-none basis-full overflow-hidden rounded-12 text-center sm:h-375 sm:rounded-18 md:h-500 md:rounded-24'>
                <Image
                  src={activity.bannerImageUrl}
                  alt={activity.title}
                  fill
                  priority
                  sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                  className='object-cover brightness-50 transition hover:brightness-100'
                />
                <strong className='absolute bottom-48 block w-full text-center heading-18 font-bold text-white sm:bottom-60 sm:heading-24 md:bottom-80 md:heading-32'>
                  {activity.title}
                </strong>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
