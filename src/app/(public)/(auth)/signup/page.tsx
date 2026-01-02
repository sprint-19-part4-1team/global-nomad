'use client';

import { useRouter } from 'next/navigation';
import AuthCheckbox from '@/features/auth/components/AuthCheckbox';
import AuthForm from '@/features/auth/components/AuthForm';
import { signUp } from '@/shared/apis/feature/users';
import Button from '@/shared/components/button/Button';
import Input from '@/shared/components/input/Input';
import Dialog from '@/shared/components/overlay/dialog/Dialog';
import { overlayStore } from '@/shared/components/overlay/store/overlayStore';
import { COMMON_MESSAGE } from '@/shared/constants/errorMessages';
import useAuthForm from '@/shared/hooks/useAuthForm';
import { isApiError } from '@/shared/utils/errorGuards';

// TODO: 로그인한 상태일 때 회원가입 페이지 접속 시 안내 모달 띄우기

const SIGNUP_MESSAGE = {
  SUCCESS: '가입이 완료되었습니다.',
  DUPLICATE_EMAIL: '이미 사용 중인 이메일입니다.',
} as const;

export default function Signup() {
  const router = useRouter();
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

  const handleSubmit = async () => {
    if (!values.nickname) {
      return;
    }

    try {
      await signUp({ email: values.email, password: values.password, nickname: values.nickname });
      overlayStore.push(
        <Dialog
          message={SIGNUP_MESSAGE.SUCCESS}
          onClose={() => {
            overlayStore.pop();
            router.replace('/login');
          }}
        />
      );
    } catch (err: unknown) {
      let message: string = COMMON_MESSAGE.NETWORK_ERROR;

      if (isApiError(err)) {
        message = err.status === 409 ? SIGNUP_MESSAGE.DUPLICATE_EMAIL : err.message;
      }

      overlayStore.push(<Dialog message={message} onClose={() => overlayStore.pop()} />);
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
        label='닉네임'
        name='nickname'
        type='text'
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
        placeholder='비밀번호를 한 번 더 입력해 주세요.'
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
