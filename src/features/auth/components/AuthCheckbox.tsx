import Link from 'next/link';
import { ChangeEventHandler, FocusEventHandler } from 'react';
import Icons from '@/assets/icons';
import Label from '@/shared/components/label/Label';

/**
 * 인증 폼에서 사용되는 체크박스 컴포넌트의 Props
 *
 * @property {string} id - 체크박스 input 요소의 고유 ID
 * @property {string} name - 체크박스 input 요소의 name 속성
 * @property {boolean | undefined} termsAgreed - 체크박스의 체크 상태
 * @property {ChangeEventHandler<HTMLInputElement>} [onChange] - 체크박스 값 변경 시 호출되는 핸들러
 * @property {FocusEventHandler<HTMLInputElement>} [onBlur] - 체크박스가 포커스를 잃을 때 호출되는 핸들러
 */
interface AuthCheckboxProps {
  id: string;
  name: string;
  termsAgreed: boolean | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

/**
 * 이용약관 동의를 위한 커스텀 체크박스 컴포넌트
 *
 * 체크 상태에 따라 스타일이 변경되며, 체크 아이콘과 레이블을 포함합니다.
 * peer 상태를 활용하여 체크 시 아이콘이 표시되고 배경색이 변경됩니다.
 *
 * @param {AuthCheckboxProps} props - 컴포넌트 props
 * @param {string} props.id - 체크박스의 고유 ID (label의 htmlFor와 연결)
 * @param {string} props.name - 폼 제출 시 사용될 input의 name
 * @param {boolean} props.termsAgreed - 현재 체크박스의 체크 여부
 * @param {ChangeEventHandler<HTMLInputElement>} [props.onChange] - 체크 상태 변경 핸들러
 * @param {FocusEventHandler<HTMLInputElement>} [props.onBlur] - 포커스 아웃 핸들러
 *
 * @returns {JSX.Element} 이용약관 동의 체크박스 컴포넌트
 *
 * @example
 * ```tsx
 * <AuthCheckbox
 *   id="termsAgreed"
 *   name="termsAgreed"
 *   termsAgreed={values.termsAgreed}
 *   onChange={handleChange}
 *   onBlur={handleBlur}
 * />
 * ```
 */
export default function AuthCheckbox({
  id,
  name,
  termsAgreed,
  onChange,
  onBlur,
}: AuthCheckboxProps) {
  return (
    <div className='relative flex gap-8'>
      <input
        id={id}
        name={name}
        type='checkbox'
        checked={termsAgreed}
        onChange={onChange}
        onBlur={onBlur}
        className='peer h-20 w-20 cursor-pointer appearance-none self-center rounded-4 border border-gray-300 bg-white checked:border-none checked:bg-primary-500'
      />
      <Icons.Check className='pointer-events-none absolute inset-0 top-4 left-2 h-16 w-16 text-white peer-has-checked:hidden' />
      <Label htmlFor={id} variant='authForm' className='cursor-pointer'>
        <Link
          href={'/terms'}
          target='_blank'
          className='text-primary-500 underline underline-offset-2 hover:text-primary-600'
          onClick={(e) => e.stopPropagation()}>
          이용약관
        </Link>
        에 동의합니다.
      </Label>
    </div>
  );
}
