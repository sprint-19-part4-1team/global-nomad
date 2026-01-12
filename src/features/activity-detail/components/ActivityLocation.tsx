'use client';

import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import Icons from '@/assets/icons';
import ActivityContentTitle from '@/features/activity-detail/components/ActivityContentTitle';

/**
 * 카카오맵 API를 위한 전역 Window 인터페이스 확장
 * @global
 */
declare global {
  interface Window {
    /** 카카오맵 JavaScript API 객체 */
    kakao: any;
  }
}

/**
 * 카카오맵 Geocoder 검색 결과 타입
 */
interface KakaoGeocoderResult {
  /** 위도 (문자열) */
  y: string;
  /** 경도 (문자열) */
  x: string;
  /** 주소명 */
  address_name?: string;
}

/**
 * 카카오맵 Geocoder 상태 타입
 */
type KakaoGeocoderStatus = 'OK' | 'ZERO_RESULT' | 'ERROR';

/**
 * 체험 위치 정보 컴포넌트의 Props
 * @property {string} address - 표시할 주소
 */
interface ActivityLocationProps {
  address: string;
}

/**
 * 카카오맵 커스텀 마커의 HTML 컨텐츠를 생성합니다.
 *
 * @param {string} address - 마커에 표시할 주소
 * @param {string} iconHTML - 마커 아이콘의 HTML 문자열
 * @returns {string} 마커 HTML 컨텐츠
 */
const createMarkerContent = (address: string, iconHTML: string): string => {
  return `
    <div class="relative inline-block w-fit">
      <div class="flex items-center gap-8 rounded-20 border-2 border-primary-600 bg-white p-6 body-14 font-semibold whitespace-nowrap text-gray-900 shadow-card">
        <div class="flex h-32 w-32 shrink-0 items-center justify-center rounded-full bg-primary-600 px-6 py-4">
          ${iconHTML}
        </div>
        <span>${address}</span>
      </div>
      <div class="absolute -bottom-7 left-1/2 h-0 w-0 -translate-x-1/2 border-t-8 border-r-8 border-l-8 border-t-primary-600 border-r-transparent border-l-transparent"></div>
      <div class="absolute -bottom-4 left-1/2 h-0 w-0 -translate-x-1/2 border-t-7 border-r-7 border-l-7 border-t-white border-r-transparent border-l-transparent"></div>
    </div>
  `;
};

/**
 * 체험 위치를 카카오맵으로 표시하는 컴포넌트
 *
 * 주소를 기반으로 카카오맵 API를 사용하여 지도를 렌더링하고,
 * 커스텀 마커로 위치를 표시합니다.
 *
 * @component
 * @param {ActivityLocationProps} props - 컴포넌트 props
 * @returns {JSX.Element} 위치 정보 섹션
 *
 * @example
 * ```tsx
 * <ActivityLocation address="서울특별시 강남구 테헤란로 123" />
 * ```
 */
export default function ActivityLocation({ address }: ActivityLocationProps) {
  /** 카카오맵이 렌더링될 DOM 요소 참조 */
  const mapRef = useRef<HTMLDivElement>(null);
  /** 마커에 사용될 아이콘 요소 참조 */
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 이미 스크립트가 로드되었는지 확인
    const existingScript = document.querySelector(`script[src^="//dapi.kakao.com/v2/maps/sdk.js"]`);

    let map: any = null;
    let handleResize: (() => void) | null = null;

    const initializeMap = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current || !iconRef.current) {
          return;
        }

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(
          address,
          (result: KakaoGeocoderResult[], status: KakaoGeocoderStatus) => {
            if (status === window.kakao.maps.services.Status.OK && result.length > 0) {
              const coords = new window.kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));

              const options = {
                center: coords,
                level: 3,
              };

              map = new window.kakao.maps.Map(mapRef.current, options);
              map.setZoomable(false);

              const iconHTML = iconRef.current?.innerHTML || '';
              const markerContent = createMarkerContent(address, iconHTML);

              const customOverlay = new window.kakao.maps.CustomOverlay({
                position: coords,
                content: markerContent,
                yAnchor: 1.1,
              });

              customOverlay.setMap(map);

              handleResize = () => {
                map.relayout();
                map.setCenter(coords);
              };

              window.addEventListener('resize', handleResize);
            } else {
              toast.error('주소 검색에 실패했습니다');
            }
          }
        );
      });
    };

    // 스크립트가 이미 존재하면 바로 초기화
    if (existingScript) {
      // kakao 객체가 이미 로드되었는지 확인
      if (window.kakao && window.kakao.maps) {
        initializeMap();
      } else {
        // 스크립트는 있지만 아직 로드 중인 경우
        existingScript.addEventListener('load', initializeMap);
      }
    } else {
      // 스크립트가 없으면 새로 추가
      const script = document.createElement('script');
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&libraries=services&autoload=false`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = initializeMap;
    }

    // 클린업: 이벤트 리스너만 제거
    return () => {
      if (handleResize) {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [address]);

  return (
    <section className='flex flex-col gap-8 border-t border-gray-100 py-20 sm:py-40'>
      <ActivityContentTitle>오시는 길</ActivityContentTitle>
      <button
        aria-label='주소 복사'
        onClick={() => {
          // TODO: 실제 주소 복사 기능 연결 후 삭제
          console.log('주소 복사');
        }}
        className='flex w-fit cursor-pointer items-center gap-4 body-14 font-semibold text-gray-600 transition-colors hover:text-gray-900'>
        <span>{address}</span>
        <Icons.Copy aria-hidden='true' className='h-24 w-24' />
      </button>
      {/* 숨겨진 아이콘 (지도 마커용) */}
      <div ref={iconRef} className='hidden'>
        <Icons.Location aria-hidden='true' className='text-white' />
      </div>
      <div ref={mapRef} className='h-180 w-full rounded-16 sm:h-450 sm:rounded-24' />
    </section>
  );
}
