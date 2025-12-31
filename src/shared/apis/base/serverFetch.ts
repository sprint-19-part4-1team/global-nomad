/**
 * ## serverFetch
 * 서버 환경에서 사용하는 공통 fetch 유틸 함수
 *
 * @description
 * - Next.js API Route(BFF) 내부에서 백엔드 API를 호출하기 위한 함수입니다.
 * - 응답이 실패(`!res.ok`)일 경우, 상태 코드와 메시지를 포함한 에러를 throw 합니다.
 * - 성공 시 응답 body를 JSON으로 파싱하여 반환합니다.
 *
 * @param endpoint - 호출할 백엔드 API의 엔드포인트
 * @param options - fetch에 전달할 RequestInit 옵션
 * @returns 백엔드 API 응답 JSON 데이터
 *
 * @throws
 * `{ status: number; message: string }` 형태의 에러 객체
 */
export const serverFetch = async <T>(endpoint: string, options: RequestInit): Promise<T> => {
  const BASE_URL = process.env.API_URL;

  if (!BASE_URL) {
    throw new Error('API_URL 환경 변수가 설정되지 않았습니다.');
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!res.ok) {
    const error = await res.json();
    throw { status: res.status, message: error.message };
  }

  return res.json();
};
