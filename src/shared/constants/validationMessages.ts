/**
 * 폼 유효성 검사 에러 메시지 상수
 *
 * @description
 * 로그인/회원가입, 체험 등록/수정 폼 유효성 검사에 사용되는 오류 메시지 상수
 *
 * @constant
 * @type {Object}
 */
export const VALIDATION_MESSAGES = {
  /**
   * 이메일 관련 검증 메시지
   * @property {string} REQUIRED - 이메일 미입력 시 메시지
   * @property {string} INVALID - 이메일 형식 오류 시 메시지
   */
  EMAIL: {
    REQUIRED: '이메일을 입력해 주세요.',
    INVALID: '이메일 형식으로 입력해 주세요.',
  },
  /**
   * 비밀번호 관련 검증 메시지
   * @property {string} REQUIRED - 비밀번호 미입력 시 메시지
   * @property {string} SHORT - 비밀번호 길이 부족 시 메시지
   * @property {string} INVALID - 비밀번호 형식 오류 시 메시지
   * @property {string} MISMATCH - 비밀번호 불일치 시 메시지
   */
  PASSWORD: {
    REQUIRED: '비밀번호를 입력해 주세요.',
    SHORT: '8자 이상 입력해주세요.',
    INVALID: '영문 대/소문자 조합으로 입력해 주세요.',
    MISMATCH: '비밀번호와 동일하게 입력해 주세요.',
    NEW_MISMATCH: '새 비밀번호와 동일하게 입력해 주세요.',
  },
  /**
   * 닉네임 관련 검증 메시지
   * @property {string} REQUIRED - 닉네임 미입력 시 메시지
   * @property {string} LONG - 닉네임 길이 초과 시 메시지
   * @property {string} INVALID - 닉네임 형식 오류 시 메시지
   */
  NICKNAME: {
    REQUIRED: '닉네임을 입력해주세요.',
    LONG: '10자 이하로 입력해 주세요.',
    INVALID: '닉네임 형식을 확인해주세요.',
  },
  /** 체험 등록/수정 폼 검증 메세지 */
  TITLE: {
    /** 체험 제목 미입력 시 메시지 */
    REQUIRED: '제목을 입력해 주세요.',
    /** 최대 글자 제한 */
    MAX: '20자 이하로 입력해 주세요.',
  },
  CATEGORY: {
    /** 체험 카테고리 미선택 시 메시지 */
    REQUIRED: '카테고리를 선택해 주세요.',
  },
  DESCRIPTION: {
    /** 체험 설명 미입력 시 메시지 */
    REQUIRED: '설명을 입력해 주세요.',
  },
  PRICE: {
    /** 체험 가격 미입력 시 메시지 */
    REQUIRED: '가격을 입력해 주세요.',
    /** 체험 가격 최소값 안내 메세지 */
    MIN_AMOUNT: '1,000원 이상으로 입력해 주세요.',
    /** 체험 가격 최대값 안내 메세지 */
    MAX_AMOUNT: '999,999원 이하로 입력해 주세요.',
  },
  ADDRESS: {
    /** 체험 주소 미입력 시 메시지 */
    REQUIRED: '주소를 입력해 주세요.',
  },
  DATE: {
    /** 예약 가능한 날짜 미선택 시 메시지 */
    REQUIRED: '예약 가능한 날짜를 선택해 주세요.',
  },
} as const;
