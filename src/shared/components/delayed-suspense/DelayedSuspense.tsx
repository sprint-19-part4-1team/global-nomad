'use client';

import { Suspense, ReactNode, useState, useEffect, useRef } from 'react';

/**
 * DelayedSuspense 컴포넌트의 Props
 *
 * @property fallback - 로딩 중 표시할 스켈레톤 컴포넌트
 * @property [minDuration=1000] - 최소 표시 시간 (밀리초)
 * @property children - 실제 콘텐츠
 */
interface DelayedSuspenseProps {
  /** 로딩 중 표시할 스켈레톤 컴포넌트 */
  fallback: ReactNode;
  /** 최소 표시 시간 (밀리초, 기본값: 1000) */
  minDuration?: number;
  /** 실제 콘텐츠 */
  children: ReactNode;
}

/**
 * 최소 로딩 시간을 보장하고 fade-in 효과를 제공하는 Suspense 래퍼 컴포넌트
 *
 * @description
 * 데이터 로딩이 빠르게 완료되어도 최소 시간 동안 스켈레톤을 표시하여
 * 깜빡임 현상을 방지하고, 콘텐츠 전환 시 부드러운 fade-in 효과를 제공합니다.
 * children은 즉시 렌더링되어 데이터 fetching이 지연되지 않습니다.
 *
 * @param props - 컴포넌트 props
 * @returns DelayedSuspense 컴포넌트
 *
 * @example
 * ```tsx
 * // 기본 사용 (1000ms 최소 표시)
 * <DelayedSuspense fallback={<PopularActivitySkeleton />}>
 *   <PopularActivityList />
 * </DelayedSuspense>
 *
 * // 커스텀 최소 시간 설정
 * <DelayedSuspense fallback={<ActivitySkeleton />} minDuration={800}>
 *   <ActivityList />
 * </DelayedSuspense>
 * ```
 */
export default function DelayedSuspense({
  fallback,
  minDuration = 1000,
  children,
}: DelayedSuspenseProps) {
  // 최소 시간이 경과했는지 여부
  const [isShow, setIsShow] = useState(false);
  // 컴포넌트 마운트 시점을 기록 (최소 시간 계산용)
  const startTime = useRef(Date.now());

  // 최소 표시 시간 타이머
  useEffect(() => {
    // 경과 시간 계산
    const elapsed = Date.now() - startTime.current;

    // 최소 표시 시간에서 경과 시간을 뺀 나머지 시간 계산
    const remaining = Math.max(0, minDuration - elapsed);

    // 남은 시간 후에 표시 가능 상태로 변경
    const timer = setTimeout(() => setIsShow(true), remaining);

    // cleanup: 컴포넌트 언마운트 시 타이머 제거
    return () => clearTimeout(timer);
  }, [minDuration]);

  return (
    <Suspense fallback={fallback}>
      {/* children은 항상 렌더링되어 즉시 데이터 fetching 시작 */}
      {/* Suspense가 resolve되면 이 부분이 렌더링됨 */}
      <div className={isShow ? 'animate-fadeIn' : 'hidden'}>{children}</div>
      {/* isShow가 false면 fallback 추가 표시 (로딩 완료 후 최소 시간 보장) */}
      {!isShow && fallback}
    </Suspense>
  );
}
