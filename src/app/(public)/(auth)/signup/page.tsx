'use client';

import { FormEvent } from 'react';
import AuthCheckbox from '@/features/auth/components/AuthCheckbox';
import AuthForm from '@/features/auth/components/AuthForm';
import Button from '@/shared/components/button/Button';
import Input from '@/shared/components/input/Input';
import useAuthForm from '@/shared/hooks/useAuthForm';

export default function Signup() {
  const { values, errors, isValid, handleChange, handleBlur } = useAuthForm({
    validationType: 'signup',
    initialValues: {
      email: '',
      nickname: '',
      password: '',
      confirmPassword: '',
      termsAgreed: false,
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
        autoComplete='new-password'
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
      <AuthCheckbox
        id='termsAgreed'
        name='termsAgreed'
        termsAgreed={values.termsAgreed}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Button type='submit' disabled={!isValid} full>
        회원가입하기
      </Button>
    </AuthForm>
  );
}
