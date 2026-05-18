'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BLUR_DATA_URL } from '@/shared/constants';

export default function CardImage({ src, alt }: { src: string; alt: string }) {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [src]);

  return (
    <Image
      src={isError ? '/fallback.png' : src}
      fill
      alt={alt}
      className='h-3/4! object-cover transition-transform duration-300 group-hover:scale-150'
      sizes='(min-width: 1024px) 262px, (min-width: 768px) 331px, 328px '
      placeholder='blur'
      blurDataURL={BLUR_DATA_URL}
      onError={() => setIsError(true)}
    />
  );
}
