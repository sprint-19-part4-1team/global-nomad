import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

/**
 * 카카오톡 공유에 필요한 파라미터
 * @property title - 공유할 콘텐츠의 제목
 * @property imageUrl - 공유할 콘텐츠의 대표 이미지 URL
 * @property reviewCount - 공유할 콘텐츠의 리뷰 개수
 * @property rating - 공유할 콘텐츠의 평점 (별점)
 * @property path - 공유할 페이지
 */
interface ShareKakaoParams {
  title: string;
  imageUrl: string;
  reviewCount: number;
  rating: number;
  path: string;
}

/** 카카오 공유 SDK 스크립트 URL */
const KAKAO_SHARE_SDK_URL = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';

/** 카카오 공유 SDK 무결성 해시값 */
const KAKAO_SHARE_SDK_INTEGRITY =
  'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4';

/**
 * 카카오 공유 SDK를 초기화하고 공유 기능을 제공하는 커스텀 훅
 *
 * @returns isReady: SDK 준비 완료 여부, shareKakao: 카카오톡 공유 함수
 *
 * @example
 * ```tsx
 * const { isReady, shareKakao } = useKakaoShare();
 *
 * const handleShare = () => {
 *   shareKakao({
 *     title: '제목',
 *     description: '설명',
 *     imageUrl: 'https://example.com/image.jpg'
 *   });
 * };
 * ```
 */
export function useKakaoShare() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
    if (!KAKAO_JS_KEY) {
      return;
    }

    // 카카오 공유 SDK 소스 경로 (지도 SDK와 별개의 파일)
    const existingScript = document.querySelector(`script[src="${KAKAO_SHARE_SDK_URL}"]`);

    /**
     * 카카오 SDK를 초기화하고 준비 상태를 업데이트
     * window.Kakao(대문자) 객체를 사용하여 지도 SDK(window.kakao)와의 충돌을 방지
     */
    const initializeKakao = () => {
      const Kakao = window.Kakao;
      if (Kakao && !Kakao.isInitialized()) {
        // 중복 초기화 방지를 위해 isInitialized 체크 후 init 실행
        Kakao.init(KAKAO_JS_KEY);
      }
      setIsReady(true);
    };

    if (window.Kakao) {
      // 이미 객체가 전역에 존재하면 즉시 초기화
      initializeKakao();
    } else if (existingScript) {
      // 스크립트 태그는 있지만 아직 로드 중이면 'load' 이벤트 리스너 등록
      existingScript.addEventListener('load', initializeKakao);
    } else {
      // 스크립트가 아예 없으면 새로 생성하여 DOM에 주입
      const script = document.createElement('script');
      script.src = KAKAO_SHARE_SDK_URL;
      // 보안을 위한 무결성(integrity) 체크 - 일치하지 않으면 브라우저가 로드를 차단함
      script.integrity = KAKAO_SHARE_SDK_INTEGRITY;
      script.crossOrigin = 'anonymous';
      script.async = true;
      script.onload = initializeKakao;
      document.head.appendChild(script);
    }

    return () => {
      if (existingScript) {
        existingScript.removeEventListener('load', initializeKakao);
      }
    };
  }, []);

  /**
   * 카카오톡으로 콘텐츠를 공유하는 함수
   *
   * @param params - 공유할 콘텐츠 정보
   * @param params.title - 공유할 제목
   * @param params.imageUrl - 공유할 이미지 URL
   * @param params.reviewCount - 공유할 리뷰 개수
   * @param params.rating - 공유할 평점 (별점)
   * @param params.path - 공유할 페이지
   */
  const shareKakao = ({ title, imageUrl, reviewCount, rating, path }: ShareKakaoParams) => {
    // SDK 로드 여부 확인
    if (!isReady || !window.Kakao) {
      toast.error('공유 기능을 준비 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      window.Kakao.Share.sendCustom({
        templateId: Number(process.env.NEXT_PUBLIC_KAKAO_TEMPLATE_ID),
        templateArgs: {
          TITLE: title,
          BANNER_IMAGE: imageUrl,
          REVIEW_COUNT: reviewCount,
          RATING: rating,
          URL: process.env.NEXT_PUBLIC_SITE_URL,
          PATH: path,
        },
      });
    } catch (error) {
      console.error('카카오톡 공유 실패:', error);
      toast.error('카카오톡 공유에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return { isReady, shareKakao };
}
