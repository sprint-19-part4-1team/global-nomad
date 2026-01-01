'use client';

import { FormEvent } from 'react';
import icons from '@/assets/icons';
import AuthForm from '@/features/auth/components/AuthForm';
import Button from '@/shared/components/button/Button';
import Input from '@/shared/components/input/Input';
import Label from '@/shared/components/label/Label';
import useAuthForm from '@/shared/hooks/useAuthForm';

export default function Signup() {
  const { values, errors, isValid, handleChange, handleBlur } = useAuthForm({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false,
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log('회원가입 시도 : ', values);
  };

  return (
    <AuthForm onSubmit={handleSubmit}>
      <Input
        variant='authForm'
        label='이메일'
        name='email'
        type='email'
        autoComplete='email'
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='이메일을 입력해 주세요.'
        errorMessage={errors.email}
      />
      <Input
        variant='authForm'
        label='닉네임'
        name='nickname'
        type='nickname'
        autoComplete='nickname'
        value={values.nickname}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='닉네임을 입력해 주세요.'
        errorMessage={errors.nickname}
      />
      <Input
        variant='authForm'
        label='비밀번호'
        name='password'
        type='password'
        autoComplete='current-password'
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='8자 이상 대/소문자 조합으로 입력해 주세요.'
        errorMessage={errors.password}
      />
      <Input
        variant='authForm'
        label='비밀번호 확인'
        name='confirmPassword'
        type='password'
        autoComplete='new-password'
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='비밀번호를 한 번 더 입력해 주세요. '
        errorMessage={errors.confirmPassword}
      />
      <div className='relative flex gap-8'>
        <input
          type='checkbox'
          id='termsAgreed'
          name='termsAgreed'
          checked={values.termsAgreed}
          onChange={handleChange}
          onBlur={handleBlur}
          className='h-20 w-20 cursor-pointer appearance-none rounded-4 border border-gray-300 bg-white checked:border-none checked:bg-primary-500'
        />
        {values.termsAgreed && (
          <icons.Check className='pointer-events-none absolute inset-0 top-2 left-2 h-16 w-16 text-white' />
        )}
        <Label htmlFor='termsAgreed' variant='authForm' className='cursor-pointer'>
          이용약관에 동의합니다.
        </Label>
      </div>
      <Button type='submit' disabled={!isValid} full>
        회원가입하기
      </Button>
    </AuthForm>
  );
}
