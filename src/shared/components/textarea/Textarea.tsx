'use client';

import { useId, useState } from 'react';
import { cn } from '@/shared/utils/cn';

interface TextareaProps {
  variant: 'activity' | 'review';
  label: string;
  name: string;
  placeholder: string;
  maxLength: number;
  errorMessage?: string;
}

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

export default function Textarea({
  variant,
  label,
  name,
  placeholder,
  maxLength,
  errorMessage,
}: TextareaProps) {
  const textareaId = useId();
  const [text, setText] = useState('');

  const { container, labelStyle, textareaBox, textCountStyle } = TEXTAREA_VARIANTS[variant];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    setText(e.target.value);
  };

  const textCount = text.length;
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
