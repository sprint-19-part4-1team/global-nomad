'use client';

import { format } from 'date-fns';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import AddressField from '@/features/activity-form/common/components/address-section/AddressSection';
import BasicInfoSection from '@/features/activity-form/common/components/basic-info-section/BasicInfoSection';
import { useBasicInfoForm } from '@/features/activity-form/common/components/basic-info-section/hooks/useBasicInfoForm';
import ImageUploadField from '@/features/activity-form/common/components/image-section/ImageUploadField';
import ScheduleDateAccordion from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/ScheduleDateAccordion';
import ScheduleDateAccordionHeader from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/ScheduleDateAccordionHeader';
import ScheduleDateAccordionPanel from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/ScheduleDateAccordionPanel';
import ScheduleDateField from '@/features/activity-form/common/components/schedule-date-section/schedule-date-input/ScheduleDateField';
import type { ImageValue } from '@/features/activity-form/common/types/image';
import Button from '@/shared/components/button/Button';
import { ScheduleTimeSlot } from '@/shared/types/activities';

// TODO: 구현 완료 후 tsDoc 추가 예정
export default function ActivityForm() {
  // TODO: 훅으로 분리 예정
  const {
    formData,
    updateFormData,
    isValid: isBasicFormValid,
    validateField: validateBasicFormField,
    errors: basicFormErrors,
  } = useBasicInfoForm();
  const [address, setAddress] = useState<string>('');
  const [detailAddress, setDetailAddress] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [accordionDates, setAccordionDates] = useState<string[]>([]);
  const [scheduleDates, setScheduleDates] = useState<ScheduleTimeSlot[]>([]);
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
    const dateString = format(date, 'yyyy-MM-dd');

    const isDuplicate = accordionDates.includes(dateString);

    if (isDuplicate) {
      toast.error('이미 추가된 날짜입니다.');
      return;
    }

    setAccordionDates((prev) =>
      [...prev, dateString].sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(
      'title: ',
      formData.title,
      'category: ',
      formData.category,
      'decription: ',
      formData.description,
      'price: ',
      formData.price,
      address,
      detailAddress,
      selectedDate,
      scheduleDates,
      bannerImage,
      introImages
    );
  };

  return (
    <form
      className='mt-24 flex flex-col gap-24 sm:mt-32 sm:gap-28 md:gap-32'
      onSubmit={handleSubmit}>
      <BasicInfoSection
        formData={formData}
        onChange={updateFormData}
        validateField={validateBasicFormField}
        errors={basicFormErrors}
      />
      <AddressField
        address={address}
        setAddress={setAddress}
        detailAddress={detailAddress}
        setDetailAddress={setDetailAddress}
      />
      <fieldset>
        <legend className='mb-16 form-title'>예약 가능 시간대</legend>
        <ScheduleDateField
          date={selectedDate}
          setDate={setSelectedDate}
          onAddDate={handleAddDate}
        />
        {/* TODO: 날짜 추가 시 해당하는 아코디언으로 포커스 */}
        <div className='mt-16 flex flex-col gap-16'>
          {accordionDates.map((date) => (
            <ScheduleDateAccordion key={date} defaultOpen>
              <ScheduleDateAccordionHeader
                date={new Date(date)}
                onDelete={() => {
                  // 날짜 제거
                  setAccordionDates((prev) => prev.filter((d) => d !== date));

                  // 해당 날짜의 시간 슬롯도 제거
                  setScheduleDates((prev) => prev.filter((s) => s.date !== date));
                }}
              />
              <ScheduleDateAccordionPanel />
            </ScheduleDateAccordion>
          ))}
        </div>
      </fieldset>
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
      <Button type='submit' disabled={!isBasicFormValid} className='mx-auto mt-0 sm:mt-4 md:mt-0'>
        체험 등록하기
      </Button>
    </form>
  );
}
