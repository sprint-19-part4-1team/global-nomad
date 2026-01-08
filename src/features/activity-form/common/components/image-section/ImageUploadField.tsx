'use client';

import { ChangeEvent, useRef } from 'react';
import { toast } from 'react-toastify';
import ImageActionSlot from '@/features/activity-form/common/components/image-section/ImageActionSlot';
import ImageItem from '@/features/activity-form/common/components/image-section/ImageItem';
import ImageSlotContent from '@/features/activity-form/common/components/image-section/ImageSlotContent';
import { ImageValue } from '@/features/activity-form/common/types/image';
import { isDuplicateImageFile } from '@/features/activity-form/common/utils/isDuplicateImageFile';
import Label from '@/shared/components/label/Label';
import { MAX_ACTIVITY_IMAGE_SIZE } from '@/shared/constants';
import { cn } from '@/shared/utils/cn';
import { validateImageFile } from '@/shared/utils/fileUpload';

interface ImageUploadFieldProps {
  /** 라벨 텍스트 */
  label: string;
  /** 업로드 가능한 최대 이미지 개수 */
  maxCount: number;
  /** 라벨 옆에 표시될 보조 안내 문구 */
  helperText?: string;
  /** 현재 선택된 이미지 값 */
  value: ImageValue;
  /** 이미지 추가 시 호출되는 콜백 */
  onChange: (value: ImageValue) => void;
  /** 이미지 삭제 시 호출되는 콜백 */
  onRemove: (index?: number) => void;
}

/**
 * ## ImageUploadField
 *
 * @description
 * - 이미지 업로드 및 미리보기를 위한 공용 필드 컴포넌트입니다.
 * - 단일 이미지와 다중 이미지 업로드 케이스를 모두 지원합니다.
 * - 이미지 추가, 삭제, 중복 검사, 업로드 제한 검증 로직을 포함합니다.
 */
export default function ImageUploadField({
  label,
  maxCount,
  helperText,
  value,
  onChange,
  onRemove,
}: ImageUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const count = Array.isArray(value) ? value.length : value ? 1 : 0;

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (!validateImageFile(file, MAX_ACTIVITY_IMAGE_SIZE)) {
      e.target.value = '';
      return;
    }

    if (isDuplicateImageFile(value, file)) {
      toast.info('이미 선택한 이미지입니다.');
      e.target.value = '';
      return;
    }

    if (Array.isArray(value)) {
      if (value.length >= maxCount) {
        e.target.value = '';
        return;
      }

      onChange([...value, file]);
    } else {
      onChange(file);
    }

    e.target.value = '';
  };

  return (
    <div className='flex flex-col gap-8 sm:gap-10'>
      <Label variant='form' className='flex'>
        {label} (
        <span className={cn(count > 0 ? 'text-primary-500' : 'text-red-500')}>{count}</span>/
        {maxCount})
        {helperText && (
          <small className='inline-block pl-4 body-12 font-semibold text-red-500'>
            {helperText}
          </small>
        )}
      </Label>

      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        className='sr-only'
        onChange={handleChange}
      />

      <div className='grid grid-cols-2 gap-14 sm:flex sm:gap-16'>
        {!Array.isArray(value) && (
          <ImageItem>
            <ImageActionSlot ariaLabel={`${label} 등록`} onClick={handleClick}>
              <ImageSlotContent
                value={value}
                onRemove={value ? () => onRemove() : undefined}
                sizes='128px'
              />
            </ImageActionSlot>
          </ImageItem>
        )}

        {Array.isArray(value) && (
          <>
            {value.map((img, index) => (
              <ImageItem
                key={img instanceof File ? `${img.name}-${img.size}-${img.lastModified}` : img}>
                <ImageActionSlot ariaLabel={`${label} 등록`} onClick={handleClick}>
                  <ImageSlotContent
                    value={img}
                    onRemove={() => onRemove(index)}
                    sizes='(max-width: 640px) calc((100vw - 14px) / 2), 128px'
                  />
                </ImageActionSlot>
              </ImageItem>
            ))}

            {value.length < maxCount && (
              <ImageItem>
                <ImageActionSlot ariaLabel={`${label} 등록`} onClick={handleClick}>
                  <ImageSlotContent value={null} />
                </ImageActionSlot>
              </ImageItem>
            )}
          </>
        )}
      </div>
    </div>
  );
}
