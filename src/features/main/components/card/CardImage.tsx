'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function CardImage({ src, alt }: { src: string; alt: string }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      fill
      alt={alt}
      className='h-3/4! object-cover transition-transform duration-300 group-hover:scale-150'
      sizes='(min-width: 1024px) 262px, (min-width: 768px) 331px, 328px '
      placeholder='blur'
      blurDataURL='data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=='
      onError={() => setImgSrc('/fallback.png')}
    />
  );
}
