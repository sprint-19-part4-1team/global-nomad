'use client';

import { ChangeEventHandler, HTMLInputTypeAttribute, MouseEventHandler, useId } from 'react';
import Icons from '@/assets/icons';
import Label from '@/shared/components/label/Label';
import useFocus from '@/shared/hooks/useFocus';
import usePasswordVisibility from '@/shared/hooks/usePasswordVisibility';
import { cn } from '@/shared/utils/cn';
import { formatValue } from '@/shared/utils/formatValue';

/**
 * Input 컴포넌트의 Props
 *
 * @property {('authForm' | 'form')} variant - Input의 스타일 변형 (authForm: 로그인 / 회원가입 등 유저 관련 폼, form: 체험 등록 / 수정 폼)
 * @property {string} label - Input의 label 텍스트
 * @property {string} name - form 제출 시 사용될 Input의 name
 * @property {HTMLInputTypeAttribute} type - Input의 타입 (text, email, password, number 등)
 * @property {('email' | 'nickname' | 'current-password' | 'new-password' | 'street-address' | 'transaction-amount' | 'off')} [autoComplete='off'] - 브라우저 자동완성 동작 제어
 * @property {boolean} [disabled] - Input 비활성화 여부
 * @property {string | number} value - Input의 현재 값
 * @property {ChangeEventHandler<HTMLInputElement>} [onChange] - 값 변경 이벤트 핸들러
 * @property {string} [placeholder] - Input의 placeholder 텍스트
 * @property {MouseEventHandler<HTMLElement>} [onClick] - Input 컨테이너 클릭 이벤트 핸들러
 * @property {string} [errorMessage] - 에러 발생 시 표시될 메시지 (존재하면 빨간색 테두리와 함께 하단에 표시)
 */
interface InputProps {
  variant: 'authForm' | 'form';
  label: string;
  name: string;
  type: HTMLInputTypeAttribute;
  autoComplete?:
    | 'email'
    | 'nickname'
    | 'current-password'
    | 'new-password'
    | 'street-address'
    | 'transaction-amount'
    | 'off';
  disabled?: boolean;
  value: string | number;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  errorMessage?: string;
}

/**
 * Input 컴포넌트
 *
 * Label, Input field, Error message를 포함한 완전한 form input 컴포넌트입니다.
 * 비밀번호 타입일 경우 표시/숨기기 토글 버튼이 자동으로 추가되며,
 * number 타입일 경우 천단위 콤마 포맷팅이 자동으로 적용됩니다.
 * 에러 상태에 따라 테두리 색상이 자동으로 변경됩니다.
 *
 * @param {InputProps} props - 컴포넌트 props
 * @returns {JSX.Element} Input 컴포넌트
 *
 * @example
 * ```tsx
 * // 이메일 입력
 * <Input
 *   variant='authForm'
 *   label='이메일'
 *   name='email'
 *   type='email'
 *   autoComplete='email'
 *   value={email}
 *   onChange={(e) => setEmail(e.target.value)}
 *   placeholder='이메일을 입력해주세요.'
 *   errorMessage='이메일을 입력해주세요.'
 * />
 *
 * // 비밀번호 입력
 * <Input
 *   variant='authForm'
 *   label='비밀번호'
 *   name='password'
 *   type='password'
 *   autoComplete='current-password'
 *   value={password}
 *   onChange={(e) => setPassword(e.target.value)}
 *   placeholder='비밀번호를 입력해주세요.'
 * />
 *
 * // 숫자 입력 (천단위 콤마 자동 포맷팅)
 * <Input
 *   variant='form'
 *   label='가격'
 *   name='price'
 *   type='number'
 *   value={price}
 *   onChange={(e) => setPrice(e.target.value)}
 *   placeholder='가격을 입력해주세요.'
 * />
 *
 * // 비활성화된 Input
 * <Input
 *   variant='authForm'
 *   label='이메일'
 *   name='email'
 *   type='email'
 *   disabled={true}
 *   value='test@test.com'
 * />
 * ```
 *
 */
export default function Input({
  variant,
  label,
  name,
  type,
  autoComplete = 'off',
  disabled,
  value,
  onChange,
  placeholder,
  onClick,
  errorMessage,
}: InputProps) {
  // 접근성을 위한 고유 ID 생성
  const inputId = useId();

  const { isFocus, onFocus, onBlur } = useFocus();

  // 비밀번호 표시/숨기기 상태 및 토글 함수
  const { isPasswordVisible, handlePasswordVisibility } = usePasswordVisibility();

  /**
   * props로 받은 type에 따라 실제 input 요소에 적용될 type을 결정하는 함수
   *
   * @returns {string} 실제 input 요소에 적용될 type
   *
   * @remarks
   * - password 타입: 표시/숨기기 상태(isPasswordVisible)에 따라 'text' 또는 'password' 반환
   * - number 타입: 천단위 콤마 포맷팅을 위해 'text'로 변환
   * - 그 외 타입: 원본 type 그대로 반환
   */
  const getInputType = () => {
    if (type === 'password') {
      return isPasswordVisible ? 'text' : 'password';
    }
    if (type === 'number') {
      return 'text';
    }
    return type;
  };

  /**
   * Input 값 변경 이벤트 핸들러
   *
   * @remarks
   * - number 타입인 경우:
   *   - 입력값에서 콤마를 제거하고 숫자만 추출
   *   - 빈 값이거나 숫자만 있는 경우에만 처리 (붙여넣기 공격 방지)
   *   - 부모 컴포넌트에는 콤마가 제거된 순수 숫자 문자열 전달
   * - 그 외 타입: onChange 핸들러를 그대로 호출
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - 변경 이벤트 객체
   * @returns {void} 반환값 없음. 부모 컴포넌트의 onChange를 호출하여 값 전달
   *
   */
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    // number 타입이 아니면 prop의 onChange를 그대로 전달하고 종료
    if (type !== 'number') {
      onChange?.(e);
      return;
    }

    // 입력값에서 콤마 제거
    const value = e.target.value.replaceAll(',', '');

    // 빈 값이거나 숫자만 있는 경우만 처리
    if (value === '' || /^\d+$/.test(value)) {
      // 새로운 이벤트 객체 생성
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          name: e.target.name,
          value: value,
        },
      } as React.ChangeEvent<HTMLInputElement>;

      onChange?.(syntheticEvent);
    }
  };

  // number 타입일 경우 천단위 콤마 포맷팅 적용, 그 외는 원본 값 사용
  const displayValue = type === 'number' ? formatValue(value) || '' : value;

  // 비밀번호 토글 버튼의 접근성 레이블
  const passwordLabelText = isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기';

  return (
    <div className='flex w-full flex-col gap-6 sm:gap-8'>
      <Label htmlFor={inputId} variant={variant}>
        {label}
      </Label>

      <div
        onClick={onClick}
        className={cn(
          'transition-color flex w-full gap-16 rounded-12 border px-16 py-12 body-14 font-normal text-gray-800 shadow-input sm:rounded-16 sm:py-15 sm:body-16',
          errorMessage && isFocus === false
            ? 'border-red-500'
            : 'border-gray-100 focus-within:border-primary-500',
          disabled && 'bg-gray-25 text-gray-400'
        )}>
        <input
          id={inputId}
          name={name}
          type={getInputType()}
          autoComplete={autoComplete}
          disabled={disabled}
          value={displayValue}
          onChange={handleChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className='min-w-0 flex-1 bg-transparent outline-none placeholder:text-gray-400'
        />

        {type === 'password' && (
          <button
            type='button'
            aria-label={passwordLabelText}
            onClick={handlePasswordVisibility}
            className='h-24 w-24 shrink-0 cursor-pointer text-gray-400'>
            {isPasswordVisible ? (
              <Icons.Eye aria-hidden='true' />
            ) : (
              <Icons.EyeOff aria-hidden='true' />
            )}
          </button>
        )}
      </div>

      {errorMessage && (
        <p className='body-13 font-medium text-red-500 sm:body-14'>{errorMessage}</p>
      )}
    </div>
  );
}
