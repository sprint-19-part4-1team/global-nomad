import { ChangeEvent, FocusEvent, useCallback, useMemo, useState } from 'react';
import { validators } from '@/shared/utils/validators';

type ChangePasswordValues = {
  newPassword: string;
  confirmPassword: string;
};

type ChangePasswordErrors = Partial<Record<keyof ChangePasswordValues, string>>;

/**
 * ## useChangePasswordForm
 *
 * @description
 * - 마이페이지 내 정보 수정에서 사용하는 비밀번호 변경 폼 유효성 검사 훅입니다.
 */
export const useChangePasswordForm = () => {
  const [values, setValues] = useState<ChangePasswordValues>({
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<ChangePasswordErrors>({});

  /**
   * 단일 필드 유효성 검사
   */
  const validateField = useCallback(
    (name: keyof ChangePasswordValues, value: string, values: ChangePasswordValues): string => {
      if (name === 'newPassword') {
        return validators.password(value);
      }

      if (name === 'confirmPassword') {
        return validators.confirmPassword('changePassword', value, {
          password: values.newPassword,
        });
      }

      return '';
    },
    []
  );

  /**
   * 폼 전체 유효성 여부
   */
  const isValid = useMemo(() => {
    return (
      Boolean(values.newPassword)
      && Boolean(values.confirmPassword)
      && !validateField('newPassword', values.newPassword, values)
      && !validateField('confirmPassword', values.confirmPassword, values)
    );
  }, [values, validateField]);

  /**
   * input change 핸들러
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ChangePasswordValues;

    const nextValues: ChangePasswordValues = {
      ...values,
      [fieldName]: value,
    };

    setValues(nextValues);

    setErrors((prevErrors) => {
      const nextErrors: ChangePasswordErrors = {
        ...prevErrors,
        [fieldName]: undefined,
      };

      if (nextValues.confirmPassword) {
        const confirmError = validateField(
          'confirmPassword',
          nextValues.confirmPassword,
          nextValues
        );

        nextErrors.confirmPassword = confirmError || undefined;
      }

      return nextErrors;
    });
  };

  /**
   * input blur 핸들러
   */
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const fieldName = name as keyof ChangePasswordValues;

    const error = validateField(fieldName, value, values);

    setErrors((prev) => ({
      ...prev,
      [fieldName]: error || undefined,
    }));
  };

  return {
    values,
    errors,
    isValid,
    handleChange,
    handleBlur,
  };
};
