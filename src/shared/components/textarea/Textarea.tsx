'use client';

import { useId, ChangeEventHandler, FocusEventHandler } from 'react';
import Label from '@/shared/components/label/Label';
import { cn } from '@/shared/utils/cn';

/**
 * Textarea 컴포넌트의 Props
 *
 * @property {('form' | 'review')} variant - 텍스트 영역의 스타일 변형 (form: 체험 등록/수정용, review: 리뷰 작성용)
 * @property {string} label - 텍스트 영역의 label 텍스트
 * @property {string} name - form 제출 시 사용될 텍스트 영역의 name
 * @property {string} placeholder - 텍스트 영역의 placeholder 텍스트
 * @property {string} value - 텍스트 영역의 현재 값
 * @property {ChangeEventHandler<HTMLTextAreaElement>} onChange - 텍스트 변경 이벤트 핸들러
 * @property {FocusEventHandler<HTMLTextAreaElement>} [onBlur] - 텍스트 영역에서 포커스가 벗어날 때 호출되는 이벤트 핸들러
 * @property {number} maxLength - 텍스트 영역에 입력 가능한 최대 글자 수
 * @property {string} [errorMessage] - 에러 발생 시 표시될 메시지
 */
interface TextareaProps {
  variant: 'form' | 'review';
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onBlur?: FocusEventHandler<HTMLTextAreaElement>;
  maxLength: number;
  errorMessage?: string;
}

/**
 * variant별 스타일 설정 객체
 * - form: 활동 등록 페이지용 스타일
 * - review: 리뷰 작성 페이지용 스타일
 */
const TEXTAREA_VARIANTS = {
  form: {
    container: 'gap-6 sm:gap-8',
    textareaBox: 'text-gray-800 shadow-input sm:gap-12',
  },
  review: {
    container: 'gap-16',
    textareaBox: 'gap-8 text-gray-900 shadow-card sm:gap-12',
  },
} as const;

/**
 * Textarea 컴포넌트
 *
 * 최대 글자 수 제한과 글자 수 카운터가 포함된 텍스트 입력 영역 컴포넌트입니다.
 * variant prop에 따라 'form'와 'review' 두 가지 스타일을 제공합니다.
 *
 * @param {TextareaProps} props - 컴포넌트 props
 * @returns {JSX.Element} Textarea 컴포넌트
 *
 * @example
 * ```tsx
 * <Textarea
 *   variant='form'
 *   label='설명'
 *   name='content'
 *   placeholder='체험에 대한 설명을 입력해 주세요.'
 *   value={content}
 *   onChange={(e) => setContent(e.target.value)}
 *   onBlur={(e) => validateText(e.target.value)}
 *   maxLength={1000}
 *   errorMessage='설명을 입력해 주세요.'
 * />
 * ```
 *
 */
export default function Textarea({
  variant,
  label,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  maxLength,
  errorMessage,
}: TextareaProps) {
  // 접근성을 위한 고유 ID 생성
  const textareaId = useId();

  // 현재 variant에 해당하는 스타일 추출
  const { container, textareaBox } = TEXTAREA_VARIANTS[variant];

  // 현재 입력된 글자 수
  const textCount = value.length;

  // 최대 글자 수 초과 여부
  const isOverMax = textCount > maxLength;

  return (
    <div className={cn('field-container', container)}>
      <Label htmlFor={textareaId} variant={variant}>
        {label}
      </Label>
      <div
        className={cn(
          'field-box flex-col gap-8 border p-16',
          textareaBox,
          isOverMax || errorMessage ? 'border-field-error' : 'border-field-default'
        )}>
        <textarea
          id={textareaId}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={5}
          maxLength={maxLength + 1}
          className='scrollbar-custom w-full resize-none field-placeholder focus:ring-0 focus:outline-none'
        />
        <div className='w-full text-right body-14 font-medium text-gray-400'>
          글자수:
          <span
            className={cn(
              'inline-block w-fit pl-4',
              isOverMax ? 'text-red-500' : 'text-primary-500'
            )}>
            {textCount}
          </span>
          /{maxLength}
        </div>
      </div>
      {errorMessage && <p className='field-error-message'>{errorMessage}</p>}
    </div>
  );
}
