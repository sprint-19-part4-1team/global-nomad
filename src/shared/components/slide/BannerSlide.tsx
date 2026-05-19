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

function PrevArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className='absolute top-1/2 left-20! z-6 -translate-y-1/2 rounded-full bg-black/40 p-6 text-white transition hover:bg-black/70'
      aria-label='이전 슬라이드'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-18 w-18'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 19l-7-7 7-7' />
      </svg>
    </button>
  );
}

function NextArrow({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className='absolute top-1/2 right-20! z-6 -translate-y-1/2 rounded-full bg-black/40 p-6 text-white transition hover:bg-black/70'
      aria-label='다음 슬라이드'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className='h-18 w-18'
        fill='none'
        viewBox='0 0 24 24'
        stroke='currentColor'>
        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
      </svg>
    </button>
  );
}

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
    dots: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    swipe: false,
    draggable: false,
  };

  if (isPending) {
    return (
      <Skeleton className='mx-auto h-181 w-full rounded-12 sm:h-375 sm:rounded-18 md:h-500 md:rounded-24' />
    );
  }

  return (
    <div className='mx-auto w-full'>
      <Slider {...settings}>
        <div>
          <div className='relative block h-181 overflow-hidden rounded-12 sm:h-375 sm:rounded-18 md:h-500 md:rounded-24'>
            <Image
              src='/banner-main.png'
              alt='메인 배너'
              fill
              priority
              sizes='100vw'
              className='object-cover'
              placeholder='blur'
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
        </div>
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
