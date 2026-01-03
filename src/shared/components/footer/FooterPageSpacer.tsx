'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/shared/utils/cn';

/**
 * footer 하단 여백 규칙
 * - 특정 페이지에서만 모바일 하단 safe-space 확보용
 */
const FOOTER_SPACER_RULES = [
  {
    name: 'mypage-activity',
    match: (pathname: string) => pathname === '/mypage/activity',
    height: 'h-74',
  },
  {
    name: 'activity-detail',
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
