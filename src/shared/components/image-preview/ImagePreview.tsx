'use client';

import Image from 'next/image';
import { ReactNode, useEffect, useRef } from 'react';
import Icons from '@/assets/icons';
import { cn } from '@/shared/utils/cn';

interface ImagePreviewProps {
  /** 서버에서 전달받은 이미지 URL */
  src?: string;
  /** 사용자가 등록한 이미지 파일 */
  file?: File | null;
  /** 이미지 대체 텍스트 */
  alt?: string;
  /** 이미지 wrapper에 적용할 추가 클래스 */
  className?: string;
  /** 이미지가 없을 때 렌더링할 fallback UI */
  fallback?: ReactNode;
  /** 전달되면 이미지 삭제 버튼을 표시하고 클릭 시 호출됨 */
  onRemove?: () => void;
}

/**
 * ## ImagePreview
 *
 * @description
 * - 이미지 미리보기를 담당하는 공통 UI 컴포넌트입니다.
 * - 로컬 파일(File) 또는 서버 이미지(src)를 받아 이미지를 렌더링합니다.
 * - 이미지가 없는 경우 fallback UI를 렌더링할 수 있습니다.
 * - `onRemove`가 전달되면 이미지 삭제 버튼을 함께 표시합니다.
 *
 * @remarks
 * - `file`이 전달되면 `URL.createObjectURL`을 사용해 미리보기 URL을 생성하며,
 *   컴포넌트 언마운트 또는 파일 변경 시 `URL.revokeObjectURL`로 자원을 정리합니다.
 * - `file`과 `src`가 동시에 전달되면 `file`이 우선적으로 사용됩니다.
 *
 * @example
 * ```tsx
 * <ImagePreview
 *   file={file}
 *   onRemove={() => setFile(null)}
 *   fallback={<AddImageCard />}
 * />
 * ```
 */
export default function ImagePreview({
  src,
  file,
  alt = '미리보기 이미지',
  className,
  fallback,
  onRemove,
}: ImagePreviewProps) {
  const objectUrlRef = useRef<string | null>(null);

  /** URL.createObjectURL 자원 정리 */
  useEffect(() => {
    if (!file) {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
      }
      return;
    }

    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;

    return () => {
      URL.revokeObjectURL(url);
      objectUrlRef.current = null;
    };
  }, [file]);

  let imageSrc: string;

  if (file && objectUrlRef.current) {
    imageSrc = objectUrlRef.current;
  } else if (src) {
    imageSrc = src;
  } else {
    return fallback ?? null;
  }

  return (
    <div className='relative h-full w-full'>
      <div className={cn('relative h-full w-full overflow-hidden', className)}>
        <Image fill src={imageSrc} alt={alt} className='object-cover' />
      </div>
      {onRemove && (
        <button
          type='button'
          onClick={onRemove}
          aria-label='이미지 삭제'
          className='absolute -top-6 -right-4 z-10 flex h-26 w-26 cursor-pointer items-center justify-center rounded-full bg-gray-950 text-white'>
          <Icons.Close aria-hidden={'true'} className='h-20 w-20' />
        </button>
      )}
    </div>
  );
}
