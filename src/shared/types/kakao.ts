/**
 * 카카오 API를 위한 전역 Window 인터페이스 확장
 * @global
 */
declare global {
  interface Window {
    /** 카카오 JavaScript API 객체 */
    kakao: any;
  }
}

export {};
