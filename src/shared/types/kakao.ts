/**
 * 카카오 공유하기 API의 `sendDefault` 메소드에 전달되는 인자 타입
 */
interface KakaoSharePayload {
  objectType: 'feed';
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl?: string;
      webUrl?: string;
    };
  };
  buttons?: {
    title: string;
    link: {
      mobileWebUrl?: string;
      webUrl?: string;
    };
  }[];
}

/**
 * 카카오 공유 SDK에서 사용하는 API의 타입 정의
 */
interface KakaoAPI {
  init: (apiKey: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendDefault: (payload: KakaoSharePayload) => void;
  };
}

/**
 * 카카오 API를 위한 전역 Window 인터페이스 확장
 * @global
 */
declare global {
  interface Window {
    /** 카카오 JavaScript API 객체 */
    kakao: any; // 지도용
    Kakao: KakaoAPI; // 공유 SDK용
  }
}

export {};
