'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Icons from '@/assets/icons';
import {
  ActionDropdown,
  ActionDropdownContent,
  ActionDropdownItem,
  ActionDropdownTrigger,
} from '@/shared/components/dropdown/action';
import Title from '@/shared/components/title/Title';

/**
 * 체험 타이틀 컴포넌트의 Props
 * @property title - 체험 제목
 * @property description - 체험 설명
 * @property category - 체험 카테고리
 * @property address - 체험 장소 주소
 * @property bannerImageUrl - 체험 배너 이미지
 * @property reviewCount - 리뷰 개수
 * @property rating - 평점 (별점)
 */
interface ActivityTitleProps {
  title: string;
  description: string;
  category: string;
  address: string;
  bannerImageUrl: string;
  reviewCount: number;
  rating: number;
}

/**
 * 체험 타이틀 표시 컴포넌트
 *
 * 체험의 카테고리, 제목, 평점, 리뷰 수, 주소 정보를 표시하며,
 * 공유 기능(카카오톡 공유, URL 복사)을 제공하는 드롭다운 메뉴를 포함합니다.
 *
 * @description
 * 컴포넌트는 다음과 같은 정보를 표시합니다.
 * - 카테고리: 상단에 작은 텍스트로 표시
 * - 제목: 반응형 크기의 h2 헤딩으로 표시
 * - 평점 및 리뷰 수: 별 아이콘과 함께 표시
 * - 주소: 위치 아이콘과 함께 표시
 * - 공유 메뉴: 우측 상단의 공유 버튼을 통해 접근
 *
 * @param props - 컴포넌트 props
 * @returns 렌더링된 체험 상세 타이틀 영역
 *
 * @example
 * ```tsx
 * <ActivityTitle
 *   category="문화 · 예술"
 *   title="한강 서울 야경 투어"
 *   address="서울시 용산구 이촌동"
 *   rating={4.5}
 *   reviewCount={128}
 * />
 * ```
 */
export default function ActivityTitle({
  title,
  description,
  category,
  address,
  bannerImageUrl,
  reviewCount,
  rating,
}: ActivityTitleProps) {
  /** 카카오 SDK 초기화 완료 여부 상태 */
  const [isKakaoReady, setIsKakaoReady] = useState(false);

  useEffect(() => {
    const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY;
    if (!KAKAO_JS_KEY) {
      return;
    }

    // 카카오 공유 SDK 소스 경로 (지도 SDK와 별개의 파일)
    const scriptSrc = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js';
    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

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
      setIsKakaoReady(true);
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
      script.src = scriptSrc;
      // 보안을 위한 무결성(integrity) 체크 - 일치하지 않으면 브라우저가 로드를 차단함
      script.integrity = 'sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4';
      script.crossOrigin = 'anonymous';
      script.async = true;
      script.onload = initializeKakao;
      document.head.appendChild(script);
    }
  }, []);

  /** 카카오톡 공유 핸들러 */
  const handleShareKakao = () => {
    // SDK 로드 여부 확인
    if (!isKakaoReady || !window.Kakao) {
      toast.error('공유 기능을 준비 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    try {
      window.Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title,
          description,
          imageUrl: bannerImageUrl,
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        buttons: [
          {
            title: '보러 가기',
            link: {
              mobileWebUrl: window.location.href,
              webUrl: window.location.href,
            },
          },
        ],
      });
    } catch (error) {
      console.error('카카오톡 공유 실패:', error);
      toast.error('카카오톡 공유에 실패했습니다. 다시 시도해주세요.');
    }
  };

  /** URL 복사 핸들러 */
  const handleUrlCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('URL이 복사되었습니다');
    } catch (error) {
      console.error('URL 복사 실패:', error);
      toast.error('URL 복사에 실패했습니다');
    }
  };

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex items-center justify-between'>
        <span className='body-13 text-gray-700 sm:body-14'>{category}</span>
        <ActionDropdown>
          <ActionDropdownTrigger aria-label='공유 메뉴 열기'>
            <Icons.Share aria-hidden='true' className='h-24 w-24 text-gray-950' />
          </ActionDropdownTrigger>

          <ActionDropdownContent className='right-0 left-auto'>
            <ActionDropdownItem onClick={handleShareKakao}>카카오톡 공유</ActionDropdownItem>
            <ActionDropdownItem onClick={handleUrlCopy}>URL 복사</ActionDropdownItem>
          </ActionDropdownContent>
        </ActionDropdown>
      </div>
      <div className='flex flex-col gap-8 sm:gap-17'>
        <Title as='h2' responsive='md' className='text-gray-950'>
          {title}
        </Title>
        <div className='flex flex-col gap-10 body-14 text-gray-700'>
          <div className='flex items-center gap-6'>
            <Icons.Star aria-hidden='true' className='h-16 w-16 text-yellow-500' />
            <span>
              {rating} ({reviewCount})
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <Icons.Location aria-hidden='true' className='h-16 w-16 text-gray-700' />
            <span>{address}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
