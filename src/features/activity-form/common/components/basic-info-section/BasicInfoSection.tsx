import CategorySelect from '@/features/activity-form/common/components/basic-info-section/CategorySelect';
import { useBasicInfoForm } from '@/features/activity-form/common/hooks/useBasicInfoForm';
import Input from '@/shared/components/input/Input';
import Textarea from '@/shared/components/textarea/Textarea';

interface BasicInfoSectionProps {
  /**
   * useBasicInfoForm의 리턴 타입
   * formData - 기본 정보 폼 데이터 객체
   * updateFormData - 특정 필드의 값을 변경하기 위한 핸들러
   * validateBasicFormField - 포커스 이탈 시 특정 필드에 대한 유효성 검사를 수행하는 함수
   * basicFormErrors - 필드별 에러 메시지 객체
   */
  basicInfo: ReturnType<typeof useBasicInfoForm>;
}

/**
 * ## BasicInfoSection
 *
 * @description
 *
 * -체험(Activity) 생성/수정 폼에서 기본 정보 입력 영역을 담당하는 섹션 컴포넌트입니다.
 * - 제목, 카테고리, 설명, 가격 입력 필드를 포함합니다.
 * - 각 필드는 상위 컴포넌트에서 제어되는 컴포넌트입니다.
 */
export default function BasicInfoSection({ basicInfo }: BasicInfoSectionProps) {
  const { formData, updateFormData, validateBasicFormField, basicFormErrors } = basicInfo;
  const { title, category, description, price } = formData;

  return (
    <fieldset className='flex flex-col gap-24 sm:gap-28 md:gap-32'>
      <legend className='sr-only'>체험 기본 정보</legend>
      <Input
        variant='form'
        label='제목'
        name='title'
        type='text'
        value={title}
        onChange={(e) => updateFormData('title', e.target.value)}
        onBlur={() => validateBasicFormField('title')}
        errorMessage={basicFormErrors.title}
        placeholder='제목을 입력해 주세요.'
      />
      <CategorySelect
        value={category}
        onChange={(value) => updateFormData('category', value)}
        onBlur={() => validateBasicFormField('category')}
        errorMessage={basicFormErrors.category}
      />
      <Textarea
        variant='form'
        label='설명'
        name='description'
        value={description}
        maxLength={1000}
        onChange={(e) => updateFormData('description', e.target.value)}
        onBlur={() => validateBasicFormField('description')}
        errorMessage={basicFormErrors.description}
        placeholder='체험에 대한 설명을 입력해주세요.'
      />
      <Input
        variant='form'
        label={
          <>
            가격 <span className='font-normal'>(원)</span>
          </>
        }
        name='price'
        type='number'
        value={price}
        onChange={(e) => updateFormData('price', e.target.value)}
        onBlur={() => validateBasicFormField('price')}
        errorMessage={basicFormErrors.price}
        placeholder='체험 금액을 입력해 주세요.'
      />
    </fieldset>
  );
}
