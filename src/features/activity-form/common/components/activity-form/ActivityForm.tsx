'use client';

import { FormEvent } from 'react';
import AddressSection from '@/features/activity-form/common/components/address-section/AddressSection';
import BasicInfoSection from '@/features/activity-form/common/components/basic-info-section/BasicInfoSection';
import ImageSection from '@/features/activity-form/common/components/image-section/ImageSection';
import ScheduleDateSection from '@/features/activity-form/common/components/schedule-date-section/ScheduleDateSection';
import { useActivityForm } from '@/features/activity-form/common/hooks/useActivityForm';
import Button from '@/shared/components/button/Button';
import { ActivityWithSubImagesAndSchedulesDto } from '@/shared/types/activities';

interface ActivityFormProps {
  /** 폼 초기값 (수정 폼에서 전달) */
  initialData?: ActivityWithSubImagesAndSchedulesDto;
}

/**
 * ## ActivityForm
 *
 * @description
 * - 체험(Activity) 등록/수정을 위한 메인 폼 컴포넌트입니다.
 * - `useActivityForm` 훅을 사용하여 폼 상태 및 유효성을 관리합니다.
 * - 모든 필드가 유효할 경우에만 제출 버튼이 활성화됩니다.
 */
export default function ActivityForm({ initialData }: ActivityFormProps) {
  const { basicInfo, addressInfo, scheduleInfo, imageInfo, isAllValid, getActivityRequest } =
    useActivityForm(initialData);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isAllValid) {
      return;
    }

    // TODO: 체험 등록, 수정 API 연결
    const payload = getActivityRequest();
    console.log('최종 데이터:', payload);
  };

  return (
    <form
      className='mt-24 flex flex-col gap-24 sm:mt-32 sm:gap-28 md:gap-32'
      onSubmit={handleSubmit}>
      <BasicInfoSection basicInfo={basicInfo} />
      <AddressSection addressInfo={addressInfo} />
      <ScheduleDateSection scheduleInfo={scheduleInfo} />
      <ImageSection imageInfo={imageInfo} />
      <Button type='submit' disabled={!isAllValid} className='mx-auto mt-0 sm:mt-4 md:mt-0'>
        체험 등록하기
      </Button>
    </form>
  );
}
