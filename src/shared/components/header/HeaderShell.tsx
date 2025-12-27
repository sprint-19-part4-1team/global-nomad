'use client';

import { cva } from 'class-variance-authority';
import { ReactNode, useEffect, useState } from 'react';

interface HeaderShellProps {
  children: ReactNode;
}

/**
 * 전역 헤더의 레이아웃과 스크롤 상태에 따른 스타일을 관리하는 래퍼 컴포넌트
 *
 * - 화면 상단에 고정(`fixed`)된 헤더 컨테이너 역할
 * - 스크롤이 발생하면 배경색과 그림자 스타일을 자동으로 변경
 * - 실제 헤더 UI는 `children`으로 주입받아 렌더링
 *
 * 스타일 관리는 `class-variance-authority(cva)`를 사용하여
 * 스크롤 상태(`scrolled`)에 따른 클래스를 선언적으로 정의합니다.
 *
 * @example
 * ```tsx
 * <HeaderShell>
 *   <Header />
 * </HeaderShell>
 * ```
 */

const headerVariants = cva('fixed top-0 z-5 w-full transition-bg duration-200', {
  variants: {
    scrolled: {
      true: 'bg-white shadow-sm',
      false: 'bg-transparent',
    },
  },
  defaultVariants: {
    scrolled: false,
  },
});

/**
 * 스크롤 위치에 따라 헤더 스타일을 전환하는 클라이언트 컴포넌트
 *
 * - `window.scrollY`를 기준으로 스크롤 여부를 판단
 * - 스크롤이 0보다 클 경우 `scrolled = true`
 * - 스크롤 이벤트는 마운트 시 등록되고 언마운트 시 정리됨
 *
 * @param props - HeaderShell 컴포넌트의 props
 * @param props.children - 헤더 내부에 표시할 React 노드
 */

export default function HeaderShell({ children }: HeaderShellProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div className={headerVariants({ scrolled })}>{children}</div>;
}
