import CategorySelect from '@/features/activity-form/common/components/basic-info-section/CategorySelect';
import type { BasicInfo } from '@/features/activity-form/common/types/activityFormType';
import Input from '@/shared/components/input/Input';
import Textarea from '@/shared/components/textarea/Textarea';

interface BasicInfoSectionProps {
  /** 기본 정보 폼 데이터 객체 */
  formData: BasicInfo;
  /** 특정 필드의 값을 변경하기 위한 핸들러 */
  onChange: (field: keyof BasicInfo, value: string) => void;
  /** 포커스 이탈 시 특정 필드에 대한 유효성 검사를 수행하는 함수 */
  validateField: (field: keyof BasicInfo) => void;
  /** 필드별 에러 메시지 객체 */
  errors: Partial<Record<keyof BasicInfo, string>>;
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
export default function BasicInfoSection({
  formData,
  onChange,
  validateField,
  errors,
}: BasicInfoSectionProps) {
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
        onChange={(e) => onChange('title', e.target.value)}
        onBlur={() => validateField('title')}
        errorMessage={errors.title}
        placeholder='제목을 입력해 주세요.'
      />
      <CategorySelect
        value={category}
        onChange={(value) => onChange('category', value)}
        onBlur={() => validateField('category')}
        errorMessage={errors.category}
      />
      <Textarea
        variant='form'
        label='설명'
        name='description'
        value={description}
        maxLength={1000}
        onChange={(e) => onChange('description', e.target.value)}
        onBlur={() => validateField('description')}
        errorMessage={errors.description}
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
        onChange={(e) => onChange('price', e.target.value)}
        onBlur={() => validateField('price')}
        errorMessage={errors.price}
        placeholder='체험 금액을 입력해 주세요.'
      />
    </fieldset>
  );
}
