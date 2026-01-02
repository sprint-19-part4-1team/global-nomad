'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AuthForm from '@/features/auth/components/AuthForm';
import { login } from '@/shared/apis/feature/auth';
import Button from '@/shared/components/button/Button';
import Input from '@/shared/components/input/Input';
import Dialog from '@/shared/components/overlay/dialog/Dialog';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';
import { COMMON_MESSAGE } from '@/shared/constants/errorMessages';
import useAuthForm from '@/shared/hooks/useAuthForm';
import { useUserStore } from '@/shared/stores/userStore';
import { isApiError } from '@/shared/utils/errorGuards';

// TODO: 로그인한 상태일 때 로그인 페이지 접속 시 안내 모달 띄우기
export default function Login() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const [isSubmitting, setSubmitting] = useState(false);
  const { values, errors, isValid, handleChange, handleBlur } = useAuthForm({
    validationType: 'login',
    initialValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async () => {
    if (isSubmitting) {
      return;
    }

    setSubmitting(true);

    try {
      const userData = await login({ email: values.email, password: values.password });
      setUser(userData);
      router.replace('/');
    } catch (err: unknown) {
      let message: string = COMMON_MESSAGE.NETWORK_ERROR;

      if (isApiError(err)) {
        message = err.message;
      }

      overlayStore.push(<Dialog message={message} onClose={() => overlayStore.pop()} />);
    } finally {
      setSubmitting(false);
    }
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
      <Button type='submit' isLoading={isSubmitting} disabled={!isValid} full>
        로그인 하기
      </Button>
    </AuthForm>
  );
}
