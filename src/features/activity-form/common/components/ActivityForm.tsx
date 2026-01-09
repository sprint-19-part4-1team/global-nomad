'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import ImageUploadField from '@/features/activity-form/common/components/image-section/ImageUploadField';
import ScheduleDateAccordion from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/ScheduleDateAccordion';
import ScheduleDateAccordionHeader from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/ScheduleDateAccordionHeader';
import ScheduleDateAccordionPanel from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/ScheduleDateAccordionPanel';
import ScheduleDateField from '@/features/activity-form/common/components/schedule-date-section/schedule-date-input/ScheduleDateField';
import type { ImageValue } from '@/features/activity-form/common/types/image';

// TODO: 구현 완료 후 tsDoc 추가 예정
export default function ActivityForm() {
  // TODO: 훅으로 분리 예정
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [scheduledDates, setScheduledDates] = useState<Date[]>([]);
  const [bannerImage, setBannerImage] = useState<File | null>(null);
  const [introImages, setIntroImages] = useState<(File | string)[]>([]);

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

  const handleAddDate = (date: Date) => {
    const isDuplicate = scheduledDates.some((d) => d.toDateString() === date.toDateString());

    if (isDuplicate) {
      toast.error('이미 추가된 날짜입니다.');
      return;
    }

    setScheduledDates((prev) => [...prev, date]);
  };

  const handleDeleteDate = (target: Date) => {
    setScheduledDates((prev) => prev.filter((d) => d.getTime() !== target.getTime()));
  };

  return (
    <form className='mt-24'>
      {/* TODO: 내부 UI 추가 예정, 전체 UI는 이후 이슈에서 진행할 예정입니다. */}
      <section className='my-24 sm:my-28 md:my-32'>
        <h3 className='sr-only'>예약 시간대</h3>
        <p className='mb-16 form-title'>예약 가능 시간대</p>
        <ScheduleDateField
          date={selectedDate}
          setDate={setSelectedDate}
          onAddDate={handleAddDate}
        />
        {/* TODO: 추가 시 해당 날짜로 포커스, 날짜별 정렬 추가 */}
        <div className='mt-16 flex flex-col gap-16'>
          {scheduledDates.map((date) => (
            <ScheduleDateAccordion key={date.toDateString()} defaultOpen>
              <ScheduleDateAccordionHeader date={date} onDelete={() => handleDeleteDate(date)} />
              <ScheduleDateAccordionPanel />
            </ScheduleDateAccordion>
          ))}
        </div>
      </section>
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
