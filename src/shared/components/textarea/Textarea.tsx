'use client';

import { useId, useState } from 'react';
import { cn } from '@/shared/utils/cn';

/**
 * Textarea 컴포넌트의 Props
 *
 * @property {('activity' | 'review')} variant - 텍스트 영역의 스타일 변형 (activity: 체험 등록/수정용, review: 리뷰 작성용)
 * @property {string} label - 텍스트 영역의 label 텍스트
 * @property {string} name - form 제출 시 사용될 텍스트 영역의 name
 * @property {string} placeholder - 텍스트 영역의 placeholder 텍스트
 * @property {number} maxLength - 텍스트 영역에 입력 가능한 최대 글자 수
 * @property {string} [errorMessage] - 에러 발생 시 표시될 메시지
 */
interface TextareaProps {
  variant: 'activity' | 'review';
  label: string;
  name: string;
  placeholder: string;
  maxLength: number;
  errorMessage?: string;
}

/**
 * variant별 스타일 설정 객체
 * - activity: 활동 등록 페이지용 스타일
 * - review: 리뷰 작성 페이지용 스타일
 */
const TEXTAREA_VARIANTS = {
  activity: {
    container: 'gap-6 sm:gap-8',
    labelStyle: 'body-14 sm:body-16',
    textareaBox: 'text-gray-800 shadow-input sm:gap-12',
    textCountStyle: 'w-36',
  },
  review: {
    container: 'gap-16',
    labelStyle: 'text-center body-16 sm:body-18',
    textareaBox: 'text-gray-900 gap-8 sm:gap-12 ',
    textCountStyle: 'w-27',
  },
} as const;

/**
 * Textarea 컴포넌트
 *
 * 최대 글자 수 제한과 글자 수 카운터가 포함된 텍스트 입력 영역 컴포넌트입니다.
 * variant prop에 따라 'activity'와 'review' 두 가지 스타일을 제공합니다.
 *
 * @param {TextareaProps} props - 컴포넌트 props
 * @returns {JSX.Element} Textarea 컴포넌트
 *
 * @example
 * ```tsx
 * <Textarea
 *   variant='activity'
 *   label='설명'
 *   name='content'
 *   placeholder='체험에 대한 설명을 입력해 주세요.'
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
  maxLength,
  errorMessage,
}: TextareaProps) {
  // 접근성을 위한 고유 ID 생성
  const textareaId = useId();

  // 입력된 텍스트 상태 관리
  const [text, setText] = useState('');

  // 현재 variant에 해당하는 스타일 추출
  const { container, labelStyle, textareaBox, textCountStyle } = TEXTAREA_VARIANTS[variant];

  /**
   * 텍스트 입력 변경 핸들러
   *
   * @param {React.ChangeEvent<HTMLTextAreaElement>} e - 변경 이벤트
   */
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  // 현재 입력된 글자 수
  const textCount = text.length;

  // 최대 글자 수 초과 여부
  const isOverMax = textCount > maxLength;

  return (
    <div className={cn('flex w-full flex-col', container)}>
      <label htmlFor={textareaId} className={cn('font-bold text-gray-950', labelStyle)}>
        {label}
      </label>
      <div
        className={cn(
          'transition-color flex w-full flex-col gap-8 rounded-12 border p-16 body-14 sm:body-16',
          textareaBox,
          isOverMax || errorMessage
            ? 'border-red-500'
            : 'border-gray-100 focus-within:border-primary-500'
        )}>
        <textarea
          id={textareaId}
          name={name}
          placeholder={placeholder}
          rows={5}
          onChange={handleChange}
          className='w-full resize-none placeholder-gray-400 focus:ring-0 focus:outline-none'
        />
        <div className='w-full text-right body-14 font-medium text-gray-400'>
          글자수:
          <span
            className={cn(
              'inline-block',
              textCountStyle,
              isOverMax ? 'text-red-500' : 'text-primary-500'
            )}>
            {textCount}
          </span>
          /{maxLength}
        </div>
      </div>
      {errorMessage && (
        <div className='body-13 font-medium text-red-500 sm:body-14'>{errorMessage}</div>
      )}
    </div>
  );
}
