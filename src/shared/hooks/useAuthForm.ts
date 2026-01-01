import { ChangeEvent, FocusEvent, useState, useMemo } from 'react';
import { validators } from '@/shared/utils/validators';

/**
 * 인증 폼의 값 타입
 *
 * @property {string} email - 이메일 주소
 * @property {string} password - 비밀번호
 * @property {string} [confirmPassword] - 비밀번호 확인 (회원가입 시)
 * @property {string} [nickname] - 닉네임 (회원가입 시)
 * @property {boolean} [termsAgreed] - 약관 동의 여부 (회원가입 시)
 */
type AuthFormValues = {
  email: string;
  password: string;
  confirmPassword?: string;
  nickname?: string;
  termsAgreed?: boolean;
  [key: string]: string | boolean | undefined;
};

/**
 * 인증 폼(로그인/회원가입) 관리를 위한 커스텀 훅
 * 폼 상태 관리, 유효성 검사 기능 제공
 *
 * @param {AuthFormValues} initialValues - 폼의 초기값 객체
 * @param {string} initialValues.email - 이메일 초기값
 * @param {string} initialValues.password - 비밀번호 초기값
 * @param {string} [initialValues.confirmPassword] - 비밀번호 확인 초기값 (회원가입 시)
 * @param {string} [initialValues.nickname] - 닉네임 초기값 (회원가입 시)
 * @param {boolean} [initialValues.termsAgreed] - 약관 동의 초기값 (회원가입 시)
 *
 * @returns {Object} 폼 관리 객체
 * @returns {AuthFormValues} return.values - 현재 폼 입력값들
 * @returns {Object} return.errors - 각 필드의 에러 메시지 (key: 필드명, value: 에러 메시지)
 * @returns {boolean} return.isValid - 폼 전체 유효성 여부 (submit 버튼 활성화용)
 * @returns {Function} return.handleChange - input 변경 핸들러
 * @returns {Function} return.handleBlur - input blur 핸들러 (유효성 검사 수행)
 *
 * @example
 * // 로그인 폼
 * const {
 *   values,
 *   errors,
 *   isValid,
 *   handleChange,
 *   handleBlur
 * } = useAuthForm({
 *   email: '',
 *   password: ''
 * });
 *
 * @example
 * // 회원가입 폼
 * const form = useAuthForm({
 *   email: '',
 *   password: '',
 *   confirmPassword: '',
 *   nickname: '',
 *   termsAgreed: false
 * });
 */
const useAuthForm = (initialValues: AuthFormValues) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof AuthFormValues, string>>>({});

  /**
   * 전체 폼의 유효성을 검사
   * - 모든 필드에 값이 있어야 함
   * - validators에 등록된 필드는 유효성 검사를 통과해야 함
   * - termsAgreed는 true여야 함
   *
   * @param {AuthFormValues} valuesToCheck - 검사할 폼 값 객체
   * @returns {boolean} 폼이 유효하면 true, 아니면 false
   */
  const checkFormValid = (valuesToCheck: AuthFormValues): boolean => {
    return (Object.keys(valuesToCheck) as Array<keyof AuthFormValues>).every((key) => {
      const value = valuesToCheck[key];

      // termsAgreed는 boolean이므로 별도 처리
      if (key === 'termsAgreed') {
        return value === true;
      }

      // 값이 없으면 invalid
      if (!value) {
        return false;
      }

      // validator가 있으면 에러 체크
      const validator = validators[key as keyof typeof validators];
      if (validator) {
        return !validator(value as string, valuesToCheck);
      }

      return true;
    });
  };

  // isValid를 useMemo로 계산 (파생 상태)
  const isValid = useMemo(() => checkFormValid(values), [values]);

  /**
   * input 값 변경 핸들러
   * - 입력된 값을 상태에 업데이트
   * - 해당 필드의 에러 메시지 초기화 (사용자가 수정 중일 때)
   *
   * @param {ChangeEvent<HTMLInputElement>} e - input 변경 이벤트
   *
   * @example
   * <input
   *   name="email"
   *   value={values.email}
   *   onChange={handleChange}
   * />
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    const newValues = { ...values, [name]: newValue };

    setValues(newValues);

    // 해당 필드의 에러 메시지 초기화
    if (errors[name as keyof AuthFormValues]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  /**
   * input blur 핸들러
   * - 필드가 validators에 등록되어 있으면 유효성 검사 수행
   * - 에러 메시지를 업데이트
   *
   * @param {FocusEvent<HTMLInputElement>} e - input blur 이벤트
   *
   * @example
   * <input
   *   name="email"
   *   value={values.email}
   *   onBlur={handleBlur}
   * />
   */
  const handleBlur = (e: FocusEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;

    // name이 validators의 키인지 확인
    if (name in validators) {
      const validatorKey = name as keyof typeof validators;
      // blur 시점의 최신 값을 포함한 values 생성
      const newValue = type === 'checkbox' ? checked : value;
      const currentValues = { ...values, [name]: newValue };
      const errorMsg = validators[validatorKey](value, currentValues);
      setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    }
  };

  return {
    values,
    errors,
    isValid,
    handleChange,
    handleBlur,
  };
};

export default useAuthForm;
