/**
 * ## ApiError 타입 정의
 *
 * @description
 * API 요청 실패 시 사용되는 에러 객체 형태입니다.
 * HTTP 상태 코드와 사용자에게 전달할 메시지를 포함합니다.
 */
type ApiError = {
  status: number;
  message: string;
};

/**
 * ## isRecord
 * 객체 타입인지 여부를 판별하는 타입 가드
 *
 * @description
 * - 전달된 값이 null이 아닌 객체인지 확인합니다.
 * - unknown 타입을 안전하게 Record<string, unknown>으로 좁히기 위해 사용됩니다.
 *
 * @param value - 검사할 값
 * @returns value가 객체인 경우 true
 */
export const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

/**
 * ## isApiError
 * ApiError 타입인지 여부를 판별하는 타입 가드
 *
 * @description
 * - 전달된 에러가 ApiError 구조를 만족하는지 런타임에서 검증합니다.
 * - status(number), message(string) 속성을 모두 가지고 있는지 확인합니다.
 *
 * @param err - 검사할 에러 값 (unknown)
 * @returns err가 ApiError인 경우 true
 */
export const isApiError = (err: unknown): err is ApiError => {
  if (!isRecord(err)) {
    return false;
  }

  return typeof err.message === 'string' && typeof err.status === 'number';
};
