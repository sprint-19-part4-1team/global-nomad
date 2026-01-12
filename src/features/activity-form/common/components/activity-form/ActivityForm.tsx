'use client';

import { FormEvent } from 'react';
import AddressSection from '@/features/activity-form/common/components/address-section/AddressSection';
import BasicInfoSection from '@/features/activity-form/common/components/basic-info-section/BasicInfoSection';
import ImageSection from '@/features/activity-form/common/components/image-section/ImageSection';
import ScheduleDateSection from '@/features/activity-form/common/components/schedule-date-section/ScheduleDateSection';
import { useActivityForm } from '@/features/activity-form/common/hooks/useActivityForm';
import Button from '@/shared/components/button/Button';

interface ActivityFormProps {
  /**
   * useActivityForm 훅의 리턴 객체
   *
   * - basicInfo: 기본 정보 입력 폼 상태 및 핸들러
   * - addressInfo: 주소 입력 폼 상태 및 핸들러
   * - scheduleInfo: 예약 가능 날짜/시간대 폼 상태 및 핸들러
   * - imageInfo: 이미지 업로드 폼 상태 및 핸들러
   * - isAllValid: 전체 폼 유효성 여부
   */
  formState: ReturnType<typeof useActivityForm>;
  /** 폼 제출 시 호출되는 콜백 함수 */
  onSubmit: () => void;
  /** 제출 버튼에 표시될 텍스트 */
  submitButtonText: string;
  /** 폼 제출 진행 여부 */
  isSubmitting: boolean;
}

/**
 * ## ActivityForm
 *
 * @description
 * - 체험(Activity) 등록/수정을 위한 메인 폼 컴포넌트입니다.
 * - `useActivityForm` 훅을 사용하여 폼 상태 및 유효성을 관리합니다.
 * - 모든 필드가 유효할 경우에만 제출 버튼이 활성화됩니다.
 */
export default function ActivityForm({
  formState,
  onSubmit,
  submitButtonText,
  isSubmitting,
}: ActivityFormProps) {
  const { basicInfo, addressInfo, scheduleInfo, imageInfo, isAllValid } = formState;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!isAllValid || isSubmitting) {
      return;
    }

    onSubmit();
  };

  return (
    <form
      className='mt-24 flex flex-col gap-24 sm:mt-32 sm:gap-28 md:gap-32'
      onSubmit={handleSubmit}>
      <BasicInfoSection basicInfo={basicInfo} />
      <AddressSection addressInfo={addressInfo} />
      <ScheduleDateSection scheduleInfo={scheduleInfo} />
      <ImageSection imageInfo={imageInfo} />
      <Button
        type='submit'
        disabled={!isAllValid}
        isLoading={isSubmitting}
        className='mx-auto mt-0 sm:mt-4 md:mt-0'>
        {submitButtonText}
      </Button>
    </form>
  );
}
