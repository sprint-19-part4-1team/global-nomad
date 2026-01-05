'use client';

import {
  ChangeEventHandler,
  FocusEventHandler,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  MouseEventHandler,
  useId,
} from 'react';
import Icons from '@/assets/icons';
import Label from '@/shared/components/label/Label';
import usePasswordVisibility from '@/shared/hooks/usePasswordVisibility';
import { cn } from '@/shared/utils/cn';
import { formatValue } from '@/shared/utils/formatValue';

/**
 * Input 컴포넌트의 Props 인터페이스
 *
 * @interface InputProps
 * @extends {Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'value' | 'onChange'>}
 *
 * @property {('authForm' | 'form')} variant - Input의 스타일 변형
 *   - `authForm`: 로그인/회원가입 등 인증 관련 폼에서 사용
 *   - `form`: 체험 등록/수정 등 일반 폼에서 사용
 * @property {string} [divClassName] - Input 컨테이너 div에 적용될 추가 CSS 클래스
 * @property {string} label - Input 위에 표시될 label 텍스트
 * @property {string} [inputClassName] - Input 요소에 적용될 추가 CSS 클래스
 * @property {string} name - form 제출 시 사용될 Input의 name 속성
 *   - `address` 포함 시: 검색 아이콘이 자동으로 표시됨
 * @property {HTMLInputTypeAttribute} type - Input의 타입
 *   - `text`: 일반 텍스트 입력
 *   - `email`: 이메일 입력
 *   - `password`: 비밀번호 입력 (표시/숨기기 토글 버튼 자동 추가)
 *   - `number`: 숫자 입력 (천단위 콤마 포맷팅 자동 적용, 내부적으로 text 타입으로 처리)
 *   - 기타 HTML input type 지원
 * @property {('email' | 'nickname' | 'current-password' | 'new-password' | 'street-address' | 'transaction-amount' | 'off')} [autoComplete='off']
 *   - 브라우저 자동완성 동작 제어
 *   - `address` 포함 시: 검색 아이콘이 자동으로 표시됨
 *   - 기본값: `'off'`
 * @property {boolean} [disabled] - Input 비활성화 여부
 *   - `true`: 입력 불가 상태 (회색 배경 처리)
 *   - 기본값: `false`
 * @property {string | number} value - Input의 현재 값 (제어 컴포넌트로 동작)
 * @property {ChangeEventHandler<HTMLInputElement>} [onChange] - 값 변경 시 호출되는 이벤트 핸들러
 *   - `type='number'`인 경우: 콤마가 제거된 순수 숫자 문자열이 전달됨
 * @property {FocusEventHandler<HTMLInputElement>} [onBlur] - Input에서 포커스가 벗어날 때 호출되는 이벤트 핸들러
 *   - 유효성 검증을 수행하는 용도로 주로 사용
 * @property {string} [placeholder] - Input의 placeholder 텍스트 (입력 전 표시되는 안내 문구)
 * @property {MouseEventHandler<HTMLElement>} [onClick] - Input 컨테이너 클릭 시 호출되는 이벤트 핸들러
 *   - 주소 검색 모달 열기 등의 용도로 사용
 * @property {string} [errorMessage] - 유효성 검증 실패 시 표시될 에러 메시지
 *   - 값이 존재하면 Input 하단에 빨간색 텍스트로 표시
 *   - Input 테두리가 빨간색으로 변경됨
 */
interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'onChange'
> {
  variant: 'authForm' | 'form';
  divClassName?: string;
  label: string;
  inputClassName?: string;
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
  value: string | number | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  errorMessage?: string;
}

/**
 * Input 컴포넌트
 *
 * Label, Input field, Error message를 포함한 완전한 form input 컴포넌트입니다.
 * 제어 컴포넌트(Controlled Component) 방식으로 동작합니다.
 *
 * @description
 * ### 주요 기능
 *
 * 1. 비밀번호 표시/숨기기 토글
 *    - `type='password'`일 경우 눈 모양 아이콘 버튼이 자동으로 추가됩니다.
 *    - 클릭 시 비밀번호를 텍스트로 표시하거나 숨길 수 있습니다.
 *
 * 2. 숫자 입력 자동 포맷팅
 *    - `type='number'`일 경우
 *      - 화면에는 천단위 콤마가 적용된 형태로 표시됩니다 (예: 1,000,000).
 *      - 내부적으로 `text` 타입으로 변환되어 처리됩니다 (HTML `input[type=number]`는 콤마를 지원하지 않음).
 *      - 부모 컴포넌트의 `onChange`에는 콤마가 제거된 순수 숫자 문자열이 전달됩니다 (예: "1000000").
 *      - 숫자가 아닌 문자 입력은 자동으로 무시됩니다.
 *
 * 3. 주소 검색 아이콘 자동 표시
 *    - `name` 또는 `autoComplete`에 `'address'`가 포함된 경우 검색 아이콘이 자동으로 표시됩니다.
 *    - `onClick` 핸들러와 함께 사용하여 주소 검색 기능을 구현할 수 있습니다.
 *
 * 4. 에러 상태 자동 처리
 *    - `errorMessage`가 존재할 때 빨간색 테두리로 변경됩니다.
 *    - 에러 메시지는 Input 하단에 빨간색 텍스트로 표시됩니다.
 *
 * 5. **접근성(Accessibility) 지원**
 *    - `useId` 훅을 사용하여 label과 input을 연결하는 고유 ID가 자동 생성됩니다.
 *    - 비밀번호 토글 버튼에 적절한 `aria-label`이 자동으로 설정됩니다.
 *    - 아이콘에 `aria-hidden` 또는 `aria-label` 속성이 적용됩니다.
 *
 * @param {InputProps} props - 컴포넌트 props
 * @returns {JSX.Element} Input 컴포넌트
 *
 * @example
 * // 이메일 입력 예시
 * <Input
 *   variant='authForm'
 *   label='이메일'
 *   name='email'
 *   type='email'
 *   autoComplete='email'
 *   value={email}
 *   onChange={(e) => {
 *     setEmail(e.target.value);
 *     setEmailError("");
 *   }}
 *   onBlur={(e) => validateEmail(e.target.value)}
 *   placeholder='이메일을 입력해주세요.'
 *   errorMessage={emailError}
 * />
 *
 * @example
 * // 비밀번호 입력 예시 (표시/숨기기 토글 버튼 자동 추가)
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
 * @example
 * // 숫자 입력 예시 (천단위 콤마 자동 포맷팅)
 * <Input
 *   variant='form'
 *   label='가격'
 *   name='price'
 *   type='number'
 *   value={price}
 *   onChange={(e) => setPrice(e.target.value)} // "1000000" 형태로 전달됨
 *   placeholder='가격을 입력해주세요.'
 * />
 *
 * @example
 * // 주소 입력 예시 (검색 아이콘 자동 표시, 주소 검색 모달과 연동)
 * <Input
 *   variant='form'
 *   label='주소'
 *   name='address'
 *   type='text'
 *   autoComplete='street-address'
 *   value={address}
 *   onChange={(e) => setAddress(e.target.value)}
 *   placeholder='우편 번호 검색'
 *   onClick={handleAddressSearch}
 *   readOnly
 *   aria-expanded={isPopupOpen}
 *   aria-haspopup='dialog'
 *   aria-controls='address-popup'
 *   aria-readonly='true'
 * />
 *
 * @example
 * // 비활성화된 Input 예시
 * <Input
 *   variant='authForm'
 *   label='이메일'
 *   name='email'
 *   type='email'
 *   disabled={true}
 *   value='test@test.com'
 * />
 */
export default function Input({
  variant,
  divClassName,
  label,
  inputClassName,
  name,
  type,
  autoComplete = 'off',
  disabled,
  value,
  onChange,
  onBlur,
  placeholder,
  onClick,
  errorMessage,
  ...props
}: InputProps) {
  // 접근성을 위한 고유 ID 생성
  const inputId = useId();

  // 비밀번호 표시/숨기기 상태 및 토글 함수
  const { isPasswordVisible, handlePasswordVisibility } = usePasswordVisibility();

  /**
   * props로 받은 type에 따라 실제 input 요소에 적용될 type을 결정하는 함수
   *
   * @description
   * - `password` 타입: 표시/숨기기 상태(`isPasswordVisible`)에 따라 `'text'` 또는 `'password'` 반환
   * - `number` 타입: 천단위 콤마 포맷팅을 위해 `'text'`로 변환
   *   (HTML `input[type=number]`는 콤마를 지원하지 않고 숫자만 입력 가능)
   * - 그 외 타입: props로 받은 원본 type 그대로 반환
   *
   * @returns {string} 실제 input 요소에 적용될 type ('text', 'password', 'email' 등)
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
   * @description
   * ### `type='number'`인 경우의 처리 로직:
   * 1. 입력값에서 모든 콤마를 제거합니다.
   * 2. 빈 문자열이거나 순수 숫자만 포함된 경우에만 처리를 진행합니다.
   *    - 유효하지 않은 입력(문자 포함, 특수문자 등)은 무시됩니다.
   * 3. 새로운 합성 이벤트(synthetic event)를 생성하여 콤마가 제거된 순수 숫자 문자열을 전달합니다.
   *    - 예: 화면에는 "1,000,000"으로 표시되지만, onChange에는 "1000000"이 전달됩니다.
   * 4. 부모 컴포넌트의 `onChange` 핸들러를 호출합니다.
   *
   * ### 그 외 타입인 경우:
   * - props로 받은 `onChange` 핸들러를 그대로 호출하여 입력값을 전달합니다.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - 변경 이벤트 객체
   * @returns {void}
   */
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    // number 타입이 아니면 props의 onChange를 그대로 전달
    if (type !== 'number') {
      onChange?.(e);
      return;
    }

    // 입력값에서 모든 콤마 제거 (천단위 구분 기호 제거)
    const value = e.target.value.replaceAll(',', '');

    // 빈 값이거나 숫자만 있는 경우만 처리 (문자/특수문자 입력 차단)
    if (value === '' || /^\d+$/.test(value)) {
      // 새로운 합성 이벤트 객체 생성 (콤마가 제거된 순수 숫자 문자열로)
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          name: e.target.name,
          value: value, // 콤마 제거된 순수 숫자 문자열
        },
      } as React.ChangeEvent<HTMLInputElement>;

      // 부모 컴포넌트의 onChange 호출
      onChange?.(syntheticEvent);
    }
    // 유효하지 않은 입력(문자, 특수문자 등)은 무시됨
  };

  // 화면에 표시될 값 결정
  // - number 타입: formatValue 함수로 천단위 콤마 포맷팅 적용 (예: "1000000" → "1,000,000")
  // - 그 외 타입: props로 받은 원본 값 그대로 사용
  const displayValue = type === 'number' ? formatValue(value) || '' : value;

  // 비밀번호 토글 버튼의 접근성 레이블 (스크린 리더용)
  const passwordLabelText = isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기';

  return (
    <div className={cn('input-container', divClassName)}>
      <Label htmlFor={inputId} variant={variant}>
        {label}
      </Label>

      <div
        onClick={onClick}
        className={cn(
          'input-box',
          // 에러 메시지가 있을 때 빨간색 테두리 표시
          errorMessage ? 'border-field-error' : 'border-field-default',
          // 비활성화 상태일 때 회색 배경 표시
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
          onBlur={onBlur}
          placeholder={placeholder}
          className={cn('input-base', inputClassName)}
          {...props}
        />

        {/* 비밀번호 타입일 경우 표시/숨기기 토글 버튼 렌더링 */}
        {type === 'password' && (
          <button
            type='button'
            aria-label={passwordLabelText}
            onClick={handlePasswordVisibility}
            className='input-icon cursor-pointer'>
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

      {/* 에러 메시지가 있을 경우 Input 하단에 빨간색 텍스트로 표시 */}
      {errorMessage && <p className='field-error-message'>{errorMessage}</p>}
    </div>
  );
}
