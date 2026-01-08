'use client';

import { useState } from 'react';
import ImageUploadField from '@/features/activity-form/common/components/image-section/ImageUploadField';
import ScheduleDurationRadio from '@/features/activity-form/common/components/schedule-date-section/schedule-duration-radio/ScheduleDurationRadio';
import ScheduleDurationRadioGroup from '@/features/activity-form/common/components/schedule-date-section/schedule-duration-radio/ScheduleDurationRadioGroup';
import ScheduleTimeChip from '@/features/activity-form/common/components/schedule-date-section/schedule-time-chip/ScheduleTimeChip';
import type { ImageValue } from '@/features/activity-form/common/types/image';

// TODO: 구현 완료 후 tsDoc 추가 예정
export default function ActivityForm() {
  // TODO: 훅으로 분리 예정
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [introImages, setIntroImages] = useState<(File | string)[]>([]);
  const [duration, setDuration] = useState<number | null>(null);

  const handleBannerChange = (value: ImageValue) => {
    if (value instanceof File) {
      setBannerImage(value);
    }
  };

  const handleIntroImagesChange = (value: ImageValue) => {
    if (Array.isArray(value)) {
      setIntroImages(value);
    }
  };

  return (
    <form className='mt-24 sm:mt-32'>
      <ScheduleDurationRadioGroup legend='체험시간' className='mb-80'>
        <ScheduleDurationRadio
          name='radio'
          label='1시간'
          value={60}
          checked={duration === 60}
          onChange={setDuration}
        />
        <ScheduleDurationRadio
          name='radio'
          label='2시간'
          value={120}
          checked={duration === 120}
          onChange={setDuration}
        />
      </ScheduleDurationRadioGroup>
      <ScheduleTimeChip
        startTime='06:00'
        endTime='07:00'
        onRemove={() => console.log('시간 삭제')}
      />

      {/* TODO: 내부 UI 추가 예정, 전체 UI는 이후 이슈에서 진행할 예정입니다. */}
      <section className='flex flex-col gap-24 sm:gap-28 md:gap-32'>
        <h3 className='sr-only'>이미지</h3>

        <ImageUploadField
          id='banner-image'
          label='배너 이미지'
          maxCount={1}
          value={bannerImage}
          onChange={handleBannerChange}
          onRemove={() => setBannerImage(null)}
        />

        <ImageUploadField
          id='intro-image'
          label='소개 이미지'
          maxCount={4}
          helperText='* 최소 1장 등록'
          value={introImages}
          onChange={handleIntroImagesChange}
          onRemove={(index) => setIntroImages((prev) => prev.filter((_, i) => i !== index))}
        />
      </section>
    </form>
  );
}
