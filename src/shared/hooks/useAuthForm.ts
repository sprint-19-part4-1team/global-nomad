import { ChangeEvent, FocusEvent, useState, useMemo, useCallback } from 'react';
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
 * 유효성 검사 타입
 *
 * @property {'login'} login - 로그인 페이지용 검사
 * @property {'signup'} signup - 회원가입 페이지용 검사
 */
type ValidationType = 'login' | 'signup';

/**
 * 인증 폼 Props 타입
 *
 * @property {ValidationType} validationType - 유효성 검사 타입
 * @property {AuthFormValues} initialValues - 폼의 초기값 객체
 */
type AuthFormProps = {
  validationType: ValidationType;
  initialValues: AuthFormValues;
};

/**
 * 인증 폼(로그인/회원가입) 관리를 위한 커스텀 훅
 * 폼 상태 관리, 유효성 검사, 에러 메시지 관리 기능 제공
 *
 * @param {AuthFormProps} props - 훅 설정 객체
 * @param {ValidationType} props.validationType - 유효성 검사 타입 ('login' | 'signup')
 * @param {AuthFormValues} props.initialValues - 폼의 초기값 객체
 * @param {string} props.initialValues.email - 이메일 초기값
 * @param {string} props.initialValues.password - 비밀번호 초기값
 * @param {string} [props.initialValues.confirmPassword] - 비밀번호 확인 초기값 (회원가입 시)
 * @param {string} [props.initialValues.nickname] - 닉네임 초기값 (회원가입 시)
 * @param {boolean} [props.initialValues.termsAgreed] - 약관 동의 초기값 (회원가입 시)
 *
 * @returns {Object} 폼 관리 객체
 * @returns {AuthFormValues} return.values - 현재 폼 입력값들
 * @returns {Partial<Record<keyof AuthFormValues, string>>} return.errors - 각 필드의 에러 메시지 객체
 * @returns {boolean} return.isValid - 폼 전체 유효성 여부 (모든 필드가 유효하고 필수값이 입력되었을 때 true)
 * @returns {(e: ChangeEvent<HTMLInputElement>) => void} return.handleChange - input 변경 핸들러 (값 업데이트 및 에러 초기화)
 * @returns {(e: FocusEvent<HTMLInputElement>) => void} return.handleBlur - input blur 핸들러 (유효성 검사 수행 및 에러 설정)
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
 *   validationType: 'login',
 *   initialValues: {
 *     email: '',
 *     password: ''
 *   }
 * });
 *
 * @example
 * // 회원가입 폼
 * const form = useAuthForm({
 *   validationType: 'signup',
 *   initialValues: {
 *     email: '',
 *     password: '',
 *     confirmPassword: '',
 *     nickname: '',
 *     termsAgreed: false
 *   }
 * });
 */
const useAuthForm = ({ validationType, initialValues }: AuthFormProps) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof AuthFormValues, string>>>({});

  /**
   * 개별 필드의 유효성을 검사
   *
   * @param {string} name - 검사할 필드명
   * @param {string | boolean | undefined} value - 검사할 필드값
   * @param {AuthFormValues} allValues - 전체 폼 값 (confirmPassword 검사 시 password와 비교용)
   * @returns {string} 에러 메시지 (유효하면 빈 문자열)
   */
  const validateField = useCallback(
    (name: string, value: string | boolean | undefined, allValues: AuthFormValues): string => {
      switch (name) {
        case 'email':
          return validators.email(value as string, validationType);
        case 'password':
          return validators.password(value as string, validationType);
        case 'confirmPassword':
          return validators.confirmPassword(value as string, allValues as { password: string });
        case 'nickname':
          return validators.nickname(value as string);
        default:
          return '';
      }
    },
    [validationType]
  );

  /**
   * 전체 폼의 유효성을 검사
   * - 모든 필드에 값이 있어야 함
   * - validators에 등록된 필드는 유효성 검사를 통과해야 함
   * - termsAgreed는 true여야 함 (회원가입 시)
   *
   * @param {AuthFormValues} valuesToCheck - 검사할 폼 값 객체
   * @returns {boolean} 폼이 유효하면 true, 아니면 false
   */
  const checkFormValid = useCallback(
    (valuesToCheck: AuthFormValues): boolean => {
      return (Object.keys(valuesToCheck) as Array<keyof AuthFormValues>).every((key) => {
        const value = valuesToCheck[key];

        if (key === 'termsAgreed') {
          return value === true;
        }

        if (!value) {
          return false;
        }

        return !validateField(key as string, value, valuesToCheck);
      });
    },
    [validateField]
  );

  // isValid를 useMemo로 계산 (파생 상태)
  const isValid = useMemo(() => checkFormValid(values), [values, checkFormValid]);

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

    // 회원가입 페이지에서 비밀번호가 변경되고, 비밀번호 확인에 값이 있을 때 재검증
    if (validationType === 'signup' && name === 'password' && newValues.confirmPassword) {
      const confirmError = validateField('confirmPassword', newValues.confirmPassword, newValues);
      setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
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

    // blur 시점의 최신 값을 포함한 values 생성
    const newValue = type === 'checkbox' ? checked : value;
    const currentValues = { ...values, [name]: newValue };

    const errorMsg = validateField(name, newValue, currentValues);

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
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
