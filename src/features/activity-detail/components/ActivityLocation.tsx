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
 * 체험 위치 정보 컴포넌트의 Props
 * @property {string} address - 표시할 주소
 */
interface ActivityLocationProps {
  address: string;
}

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
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&libraries=services&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        if (!mapRef.current || !iconRef.current) {
          return;
        }

        const geocoder = new window.kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result: any, status: any) => {
          if (status === window.kakao.maps.services.Status.OK) {
            const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

            const options = {
              center: coords,
              level: 3,
              draggable: false, // 드래그 방지
              scrollwheel: false, // 마우스 휠 줌 방지
              disableDoubleClick: true, // 더블클릭 줌 방지
              disableDoubleClickZoom: true, // 더블클릭 줌 방지
            };

            const map = new window.kakao.maps.Map(mapRef.current, options);
            map.setZoomable(false);

            const iconHTML = iconRef.current?.innerHTML || '';

            const markerContent = `
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

            const customOverlay = new window.kakao.maps.CustomOverlay({
              position: coords,
              content: markerContent,
              yAnchor: 1.1,
            });

            customOverlay.setMap(map);

            // 리사이즈 이벤트 핸들러
            const handleResize = () => {
              map.relayout(); // 지도 크기 재계산
              map.setCenter(coords); // 중심 좌표 재설정
            };

            window.addEventListener('resize', handleResize);

            // 클린업 함수에서 이벤트 리스너 제거
            return () => {
              window.removeEventListener('resize', handleResize);
            };
          } else {
            toast.error('주소 검색에 실패했습니다');
          }
        });
      });
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [address]);

  return (
    <section className='flex flex-col gap-8 border-t border-gray-100 py-20 sm:py-40'>
      <ActivityContentTitle>오시는 길</ActivityContentTitle>
      <button
        aria-label='주소 복사'
        className='flex w-fit items-center gap-4 body-14 font-semibold text-gray-600 transition-colors hover:text-gray-900'>
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
