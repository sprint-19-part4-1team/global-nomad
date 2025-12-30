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
 * @property {string} name - form 제출 시 사용될 Input의 name (주소 관련 input은 'address' 포함 시 검색 아이콘 표시)
 * @property {HTMLInputTypeAttribute} type - Input의 타입 (text, email, password, number 등)
 * @property {('email' | 'nickname' | 'current-password' | 'new-password' | 'street-address' | 'transaction-amount' | 'off')} [autoComplete='off'] - 브라우저 자동완성 동작 제어 ('address' 포함 시 검색 아이콘 표시)
 * @property {boolean} [disabled] - Input 비활성화 여부
 * @property {string | number} value - Input의 현재 값
 * @property {ChangeEventHandler<HTMLInputElement>} [onChange] - 값 변경 이벤트 핸들러
 * @property {string} [placeholder] - Input의 placeholder 텍스트
 * @property {MouseEventHandler<HTMLDivElement>} [onClick] - Input 컨테이너(div) 클릭 이벤트 핸들러
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
 *
 * 주요 기능:
 * - 비밀번호 타입(type='password')일 경우 표시/숨기기 토글 버튼이 자동으로 추가됩니다.
 * - 숫자 타입(type='number')일 경우:
 *   - 내부적으로 text 타입으로 변환되어 천단위 콤마 포맷팅이 자동으로 적용됩니다.
 *   - 부모 컴포넌트에는 콤마가 제거된 순수 숫자 문자열이 전달됩니다.
 * - 주소 관련 input(name 또는 autoComplete에 'address' 포함)일 경우 검색 아이콘이 자동으로 표시됩니다.
 * - 에러 상태에 따라 테두리 색상이 자동으로 변경됩니다.
 * - 접근성을 위한 고유 ID가 자동으로 생성됩니다.
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
 * // 비밀번호 입력 (표시/숨기기 토글 버튼 자동 추가)
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
 * // 숫자 입력 (천단위 콤마 자동 포맷팅, text 타입으로 내부 변환)
 * <Input
 *   variant='form'
 *   label='가격'
 *   name='price'
 *   type='number'
 *   value={price}
 *   onChange={(e) => setPrice(e.target.value)} // 콤마가 제거된 순수 숫자 문자열 전달
 *   placeholder='가격을 입력해주세요.'
 * />
 *
 * // 주소 입력 (검색 아이콘 자동 표시)
 * <Input
 *   variant='form'
 *   label='주소'
 *   name='address'
 *   type='text'
 *   autoComplete='street-address'
 *   value={address}
 *   onChange={(e) => setAddress(e.target.value)}
 *   onClick={handleAddressSearch}
 *   placeholder='주소를 검색해주세요.'
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
   * @returns {HTMLInputTypeAttribute | 'text' | 'password'} 실제 input 요소에 적용될 type
   *
   * @remarks
   * - password 타입: 표시/숨기기 상태(isPasswordVisible)에 따라 'text' 또는 'password' 반환
   * - number 타입: 천단위 콤마 포맷팅을 위해 'text'로 변환 (HTML input type='number'는 콤마를 지원하지 않음)
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
   *   - 유효하지 않은 입력(문자 포함 등)은 무시됨
   * - 그 외 타입: onChange 핸들러를 그대로 호출하여 입력값 전달
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
      // 새로운 이벤트 객체 생성 (콤마가 제거된 값으로)
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
    <div className='input-container'>
      <Label htmlFor={inputId} variant={variant}>
        {label}
      </Label>

      <div
        onClick={onClick}
        className={cn(
          'input-box',
          errorMessage && isFocus === false ? 'border-input-error' : 'border-input-default',
          disabled && 'input-disabled'
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
          className='input-base'
        />

        {/* 비밀번호 타입일 경우 표시/숨기기 토글 버튼 렌더링 */}
        {type === 'password' && (
          <button
            type='button'
            aria-label={passwordLabelText}
            onClick={handlePasswordVisibility}
            className='input-icon'>
            {isPasswordVisible ? (
              <Icons.Eye aria-hidden='true' />
            ) : (
              <Icons.EyeOff aria-hidden='true' />
            )}
          </button>
        )}

        {/* 주소 관련 input일 경우 검색 아이콘 렌더링 */}
        {((type !== 'password' && name.includes('address'))
          || autoComplete?.includes('address')) && (
          <Icons.Search aria-label='주소 검색 아이콘' className='input-icon' />
        )}
      </div>

      {/* 에러 메시지가 있을 경우 하단에 표시 */}
      {errorMessage && <p className='input-error-message'>{errorMessage}</p>}
    </div>
  );
}
