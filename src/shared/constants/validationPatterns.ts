/**
 * 로그인/회원가입 폼 입력값 검증에 사용되는 정규표현식 패턴
 *
 * @constant
 * @type {Object}
 * @property {RegExp} EMAIL - 이메일 형식 검증 정규식
 * @property {RegExp} PASSWORD - 비밀번호 형식 검증 정규식 (영문 대소문자 조합 + 8자 이상, 숫자 선택)
 * @property {RegExp} NICKNAME - 닉네임 형식 검증 정규식 (완성된 한글/영문/숫자, 공백 제외, 1-10자)
 */
export const VALIDATION_PATTERNS = {
  /** 이메일 형식 검증 정규식 */
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  /** 비밀번호 형식 검증 정규식 (영문 대소문자 조합 숫자 선택) */
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]$/,
  /** 닉네임 형식 검증 정규식 (완성된 한글/영문/숫자, 공백 제외, 1-10자) */
  NICKNAME: /^[가-힣a-zA-Z0-9]{1,10}$/,
} as const;

/**
 * 비밀번호 최소 길이
 * @constant
 * @type {number}
 * @default 8
 */
export const PASSWORD_MIN_LENGTH = 8 as const;
