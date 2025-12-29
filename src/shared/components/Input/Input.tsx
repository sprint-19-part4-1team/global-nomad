import { ChangeEventHandler, HTMLInputTypeAttribute, MouseEventHandler, useId } from 'react';
import Icons from '@/assets/icons';
import Label from '@/shared/components/label/Label';
import usePasswordVisibility from '@/shared/hooks/usePasswordVisibility';
import { cn } from '@/shared/utils/cn';

/**
 * Input 컴포넌트의 Props
 *
 * @property {('authForm' | 'form')} variant - Input의 스타일 변형 (authForm: 로그인 / 회원가입 등 유저 관련 폼, form: 체험 등록 / 수정 폼)
 * @property {string} label - Input의 label 텍스트
 * @property {string} name - form 제출 시 사용될 Input의 name
 * @property {HTMLInputTypeAttribute} type - Input의 타입 (text, email, password 등)
 * @property {('email' | 'username' | 'current-password' | 'new-password' | 'street-address' | 'transaction-amount' | 'off')} [autoComplete='off'] - 브라우저 자동완성 동작 제어
 * @property {string | number} value - Input의 현재 값
 * @property {ChangeEventHandler<HTMLInputElement>} onChange - 값 변경 이벤트 핸들러
 * @property {string} placeholder - Input의 placeholder 텍스트
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
    | 'username'
    | 'current-password'
    | 'new-password'
    | 'street-address'
    | 'transaction-amount'
    | 'off';
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  onClick?: MouseEventHandler<HTMLElement>;
  errorMessage?: string;
}

/**
 * Input 컴포넌트
 *
 * Label, Input field, Error message를 포함한 완전한 form input 컴포넌트입니다.
 * 비밀번호 타입일 경우 표시/숨기기 토글 버튼이 자동으로 추가되며,
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
 * ```
 *
 */
export default function Input({
  variant,
  label,
  name,
  type,
  autoComplete = 'off',
  value,
  onChange,
  placeholder,
  onClick,
  errorMessage,
}: InputProps) {
  // 접근성을 위한 고유 ID 생성
  const inputId = useId();

  // 비밀번호 표시/숨기기 상태 및 토글 함수
  const { isPasswordVisible, handlePasswordVisibility } = usePasswordVisibility();

  // 비밀번호 타입일 경우 표시 상태에 따라 실제 input type 결정
  const inputType = type === 'password' ? (isPasswordVisible ? 'text' : 'password') : type;

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
          errorMessage ? 'border-red-500' : 'border-gray-100 focus-within:border-primary-500'
        )}>
        <input
          id={inputId}
          name={name}
          type={inputType}
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className='min-w-0 flex-1 bg-transparent outline-none placeholder:text-gray-400'
        />

        {type === 'password' && (
          <button
            type='button'
            aria-label={passwordLabelText}
            onClick={handlePasswordVisibility}
            className='h-24 w-24 shrink-0 text-gray-400'>
            {isPasswordVisible ? <Icons.Eye /> : <Icons.EyeOff />}
          </button>
        )}
      </div>

      {errorMessage && (
        <p className='body-13 font-medium text-red-500 sm:body-14'>{errorMessage}</p>
      )}
    </div>
  );
}
