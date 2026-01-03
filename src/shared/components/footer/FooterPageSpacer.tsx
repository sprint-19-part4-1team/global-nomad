'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/shared/utils/cn';

/**
 * 특정 페이지에서 플로팅 UI가 있을 경우 Footer와의 간격을 확보하기 위한 스페이서 컴포넌트입니다.
 * `usePathname`을 사용해 현재 경로를 감지하고, `FOOTER_SPACER_RULES`에 정의된 규칙에 따라 동적으로 높이를 조절합니다.
 * 모바일 화면에서만 동작하며, 데스크탑에서는 높이가 0이 됩니다.
 */
const FOOTER_SPACER_RULES = [
  {
    match: (pathname: string) => pathname === '/mypage/activity',
    height: 'h-74',
  },
  {
    match: (pathname: string) => /^\/activity\/\d+$/.test(pathname),
    height: 'h-142',
  },
] as const;

export function FooterPageSpacer() {
  const pathname = usePathname();

  const matchedRule = FOOTER_SPACER_RULES.find((rule) => rule.match(pathname));

  return (
    <div
      aria-hidden
      className={cn(
        'overflow-hidden transition-[height] duration-300 motion-reduce:transition-none',
        matchedRule?.height ?? 'h-0',
        'sm:h-0'
      )}
    />
  );
}
