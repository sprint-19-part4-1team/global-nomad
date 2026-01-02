'use client';

import { FormEvent } from 'react';
import AuthForm from '@/features/auth/components/AuthForm';
import Button from '@/shared/components/button/Button';
import Input from '@/shared/components/input/Input';
import useAuthForm from '@/shared/hooks/useAuthForm';

export default function Login() {
  const { values, errors, isValid, handleChange, handleBlur } = useAuthForm({
    validationType: 'login',
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    console.log('회원가입 시도 : ', values, e);
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
        label='비밀번호'
        name='password'
        type='password'
        autoComplete='current-password'
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder='비밀번호를 입력해 주세요.'
        errorMessage={errors.password}
      />
      <Button type='submit' disabled={!isValid} full>
        로그인 하기
      </Button>
    </AuthForm>
  );
}
