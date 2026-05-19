'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Slider from 'react-slick';
import { useRandomActivities } from '@/features/main/queries/useRandomActivities';
import Skeleton from '@/shared/components/skeleton/Skeleton';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { BLUR_DATA_URL } from '@/shared/constants';

export default function BannerSlide() {
  const [failedIds, setFailedIds] = useState<Set<number>>(new Set());
  const { data: activities, isPending } = useRandomActivities();

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    swipe: false,
    draggable: false,
  };

  if (isPending) {
    return (
      <Skeleton className='mx-auto h-181 w-full rounded-12 sm:h-375 sm:rounded-18 md:h-500 md:rounded-24' />
    );
  }

  return (
    <div className='mx-auto w-full overflow-hidden rounded-12 sm:rounded-18 md:rounded-24'>
      <Slider {...settings}>
        {activities?.map((activity) => (
          <div key={activity.id}>
            <Link
              href={`/activity/${activity.id}`}
              className='relative block h-181 overflow-hidden rounded-12 text-center sm:h-375 sm:rounded-18 md:h-500 md:rounded-24'>
              <Image
                src={failedIds.has(activity.id) ? '/fallback.png' : activity.bannerImageUrl}
                alt={activity.title}
                fill
                priority
                sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                className='object-cover brightness-50 transition hover:brightness-100'
                placeholder='blur'
                blurDataURL={BLUR_DATA_URL}
                onError={() => setFailedIds((prev) => new Set(prev).add(activity.id))}
              />
              <strong className='absolute bottom-48 block w-full text-center heading-18 font-bold text-white sm:bottom-60 sm:heading-24 md:bottom-80 md:heading-32'>
                {activity.title}
              </strong>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
