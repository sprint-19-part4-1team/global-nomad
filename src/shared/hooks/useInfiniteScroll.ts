import { useEffect, useRef } from 'react';

/**
 * 무한 스크롤 훅의 매개변수 타입
 *
 * @property hasNextPage - 다음 페이지 존재 여부
 * @property isFetchingNextPage - 다음 페이지 로딩 중 여부
 * @property fetchNextPage - 다음 페이지를 가져오는 함수
 * @property [threshold=0.1] - Intersection Observer의 임계값 (0~1 사이의 값)
 */
interface UseInfiniteScrollProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  threshold?: number;
}

/**
 * Intersection Observer를 사용한 무한 스크롤 커스텀 훅
 *
 * 스크롤이 특정 요소에 도달했을 때 자동으로 다음 페이지를 로드합니다.
 * 반환된 ref를 관찰하고 싶은 요소에 연결하면 됩니다.
 *
 * @param props - 훅 설정 객체
 * @param props.hasNextPage - 다음 페이지 존재 여부
 * @param props.isFetchingNextPage - 다음 페이지 로딩 중 여부
 * @param props.fetchNextPage - 다음 페이지를 가져오는 함수
 * @param [props.threshold=0.1] - 요소가 뷰포트에 얼마나 보여야 트리거될지 설정 (0~1)
 *
 * @returns observerRef - Intersection Observer를 연결할 ref
 *
 * @example
 * ```tsx
 * const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(...);
 * const observerRef = useInfiniteScroll({
 *   hasNextPage,
 *   isFetchingNextPage,
 *   fetchNextPage,
 *   threshold: 0.5
 * });
 *
 * return (
 *   <div>
 *     {items.map(item => <Item key={item.id} {...item} />)}
 *     <div ref={observerRef} />
 *   </div>
 * );
 * ```
 */
const useInfiniteScroll = ({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold = 0.1,
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targetElement = observerRef.current;

    // 옵저버 대상이 없거나, 더 이상 가져올 페이지가 없거나, 이미 로딩 중인 경우 종료
    if (!targetElement || !hasNextPage || isFetchingNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // 요소가 뷰포트에 보이고, 다음 페이지가 있을 때 fetchNextPage 실행
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold }
    );

    observer.observe(targetElement);

    // cleanup: 컴포넌트 언마운트 시 옵저버 해제
    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, threshold]);

  return observerRef;
};

export default useInfiniteScroll;
