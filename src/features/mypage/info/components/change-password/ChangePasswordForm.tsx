'use client';

import { FormEvent, useState } from 'react';
import { useChangePasswordForm } from '@/features/mypage/info/hooks/useChangePasswordForm';
import Button from '@/shared/components/button/Button';
import Input from '@/shared/components/input/Input';

interface ChangePasswordFormProps {
  userEmail: string;
}

/**
 * ## ChangePasswordForm
 *
 * @description
 * - 마이페이지 내 정보 수정에서 사용하는 비밀번호 변경 폼입니다.
 *
 * @param {string} userEmail - 로그인한 유저 이메일
 */
export default function ChangePasswordForm({ userEmail }: ChangePasswordFormProps) {
  const { values, errors, isValid, handleChange, handleBlur } = useChangePasswordForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 비밀번호 변경 API 연동 예정
    setIsSubmitting(false);
    console.log('변경 폼 제출!');
  };

  return (
    <form className='mt-20 flex flex-col items-center gap-24 sm:mt-32' onSubmit={handleSubmit}>
      {/* 접근성용 username input */}
      <input
        type='text'
        name='username'
        autoComplete='username'
        value={userEmail}
        readOnly
        className='sr-only'
      />
      {/* 실제 비밀번호 폼 */}
      <Input
        variant='authForm'
        label='새 비밀번호'
        name='newPassword'
        type='password'
        autoComplete='new-password'
        value={values.newPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='새 비밀번호를 입력해 주세요.'
        errorMessage={errors.newPassword}
      />
      <Input
        variant='authForm'
        label='새 비밀번호 확인'
        name='confirmPassword'
        type='password'
        autoComplete='new-password'
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='새 비밀번호를 한 번 더 입력해 주세요.'
        errorMessage={errors.confirmPassword}
      />
      {/* TODO: API 연동 시 버튼 조건 추가 */}
      <Button type='submit' disabled={!isValid} isLoading={isSubmitting} className='w-160'>
        변경하기
      </Button>
    </form>
  );
}
