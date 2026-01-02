import { VALIDATION_MESSAGES } from '@/shared/constants/validationMessages';
import {
  NICKNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  VALIDATION_PATTERNS,
} from '@/shared/constants/validationPatterns';

/**
 * 필수 입력 검사
 *
 * @param {string} value - 검사할 값
 * @param {string} message - 에러 메시지
 * @returns {string} 에러 메시지 또는 빈 문자열
 */
export const isRequired = (value: string, message: string): string => {
  return !value || value.trim().length === 0 ? message : '';
};

/**
 * 이메일 형식 검사
 *
 * @param {string} value - 검사할 이메일
 * @returns {string} 에러 메시지 또는 빈 문자열
 */
const validateEmailFormat = (value: string): string => {
  return VALIDATION_PATTERNS.EMAIL.test(value) ? '' : VALIDATION_MESSAGES.EMAIL.INVALID;
};

/**
 * 비밀번호 형식 검사 (길이 + 형식)
 * - 최소 8자 이상
 * - 영문 대소문자 조합 (숫자 선택)
 *
 * @param {string} value - 검사할 비밀번호
 * @returns {string} 에러 메시지 또는 빈 문자열
 */
const validatePasswordFormat = (value: string): string => {
  if (value.length < PASSWORD_MIN_LENGTH) {
    return VALIDATION_MESSAGES.PASSWORD.SHORT;
  }
  return VALIDATION_PATTERNS.PASSWORD.test(value) ? '' : VALIDATION_MESSAGES.PASSWORD.INVALID;
};

/**
 * 닉네임 형식 검사
 * - 완성된 한글, 영문, 숫자 허용 (공백 제외)
 * - 10자 이하
 *
 * @param {string} value - 검사할 닉네임
 * @returns {string} 에러 메시지 또는 빈 문자열
 */
const validateNicknameFormat = (value: string): string => {
  if (value.length > NICKNAME_MAX_LENGTH) {
    return VALIDATION_MESSAGES.NICKNAME.LONG;
  }
  return VALIDATION_PATTERNS.NICKNAME.test(value) ? '' : VALIDATION_MESSAGES.NICKNAME.INVALID;
};

/**
 * 유효성 검사 타입
 *
 * @property {'login'} login - 로그인 페이지용 검사 (필수 입력만 확인)
 * @property {'signup'} signup - 회원가입 페이지용 검사 (필수 입력 + 형식 검사)
 */
type ValidationType = 'login' | 'signup';

/**
 * 유효성 검사 함수들
 * 각 함수는 에러 메시지를 반환하며, 유효한 경우 빈 문자열 반환
 */
export const validators = {
  /**
   * 이메일 유효성 검사
   *
   * @param {string} value - 검사할 이메일
   * @param {ValidationType} type - 검사 타입 ('login' | 'signup')
   * @returns {string} 에러 메시지 또는 빈 문자열
   *
   * @description
   * - login: 필수 입력만 확인
   * - signup: 필수 입력 + 이메일 형식 확인
   *
   * @example
   * // 로그인
   * validators.email('test', 'login') // ''
   * validators.email('', 'login') // '이메일을 입력해 주세요.'
   *
   * // 회원가입
   * validators.email('test@example.com', 'signup') // ''
   * validators.email('', 'signup') // '이메일을 입력해 주세요.'
   * validators.email('invalid-email', 'signup') // '이메일 형식으로 입력해 주세요.'
   */
  email: (value: string, type: ValidationType = 'signup'): string => {
    if (type === 'login') {
      // 로그인: 필수 입력만 체크
      return isRequired(value, VALIDATION_MESSAGES.EMAIL.REQUIRED);
    }
    // 회원가입: 필수 + 이메일 형식 체크
    return isRequired(value, VALIDATION_MESSAGES.EMAIL.REQUIRED) || validateEmailFormat(value);
  },

  /**
   * 비밀번호 유효성 검사
   *
   * @param {string} value - 검사할 비밀번호
   * @param {ValidationType} type - 검사 타입 ('login' | 'signup')
   * @returns {string} 에러 메시지 또는 빈 문자열
   *
   * @description
   * - login: 필수 입력만 확인
   * - signup: 필수 입력 + 8자 이상 + 영문 대소문자 조합 (숫자 선택)
   *
   * @example
   * // 로그인
   * validators.password('pass', 'login') // ''
   * validators.password('', 'login') // '비밀번호를 입력해 주세요.'
   *
   * // 회원가입
   * validators.password('Password', 'signup') // ''
   * validators.password('Password123', 'signup') // ''
   * validators.password('', 'signup') // '비밀번호를 입력해 주세요.'
   * validators.password('Pass', 'signup') // '8자 이상 입력해주세요.'
   * validators.password('password123', 'signup') // '영문 대/소문자 조합으로 입력해 주세요.'
   */
  password: (value: string, type: ValidationType = 'signup'): string => {
    if (type === 'login') {
      return isRequired(value, VALIDATION_MESSAGES.PASSWORD.REQUIRED);
    }

    return (
      isRequired(value, VALIDATION_MESSAGES.PASSWORD.REQUIRED) || validatePasswordFormat(value)
    );
  },

  /**
   * 비밀번호 확인 유효성 검사
   * - 원본 비밀번호와 일치 여부 확인
   * - 회원가입 전용 필드
   *
   * @param {string} value - 검사할 비밀번호 확인 값
   * @param {Object} values - 전체 폼 값 객체
   * @param {string} values.password - 원본 비밀번호
   * @returns {string} 에러 메시지 또는 빈 문자열
   *
   * @example
   * validators.confirmPassword('Password123', { password: 'Password123' }) // ''
   * validators.confirmPassword('Different', { password: 'Password123' }) // '비밀번호와 동일하게 입력해 주세요.'
   */
  confirmPassword: (value: string, values: { password: string }): string => {
    return value === values.password ? '' : VALIDATION_MESSAGES.PASSWORD.MISMATCH;
  },

  /**
   * 닉네임 유효성 검사
   * - 필수 입력 확인
   * - 10자 이하
   * - 완성된 한글, 영문, 숫자만 허용 (공백, 특수문자, 자음/모음 제외)
   * - 회원가입 전용 필드
   *
   * @param {string} value - 검사할 닉네임
   * @returns {string} 에러 메시지 또는 빈 문자열
   *
   * @example
   * validators.nickname('홍길동') // ''
   * validators.nickname('User123') // ''
   * validators.nickname('') // '닉네임을 입력해주세요.'
   * validators.nickname('홍길동1234567890') // '10자 이하로 입력해 주세요.'
   * validators.nickname('ㅎㄱㄷ') // '닉네임 형식을 확인해주세요.'
   * validators.nickname('홍길동@') // '닉네임 형식을 확인해주세요.'
   */
  nickname: (value: string): string => {
    return (
      isRequired(value, VALIDATION_MESSAGES.NICKNAME.REQUIRED) || validateNicknameFormat(value)
    );
  },
};
