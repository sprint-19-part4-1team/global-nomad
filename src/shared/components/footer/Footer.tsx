import { cva } from 'class-variance-authority';
import Link from 'next/link';
import Icons from '@/assets/icons';
import { cn } from '@/shared/utils/cn';

interface FooterProps {
  className?: string;
}

export const TEXT_LINKS = [
  {
    href: 'https://github.com/orgs/sprint-19-part4-1team/discussions',
    title: '코드잇 FE19기 파트4 1팀 discussions페이지로 이동',
    label: 'Discussions',
    withDot: true,
  },
  {
    href: 'https://github.com/sprint-19-part4-1team/global-nomad/wiki',
    title: '코드잇 FE19기 파트4 1팀 wiki페이지로 이동',
    label: 'Wiki',
    withDot: false,
  },
] as const;

export const ICON_LINKS = [
  {
    href: 'https://www.youtube.com/',
    title: '코드잇 FE19기 파트4 1팀 시연영상페이지로 이동',
    Icon: Icons.Youtube,
    hoverClass: 'hover:text-red-500',
  },
  {
    href: 'https://github.com/sprint-19-part4-1team/global-nomad',
    title: '코드잇 FE19기 파트4 1팀 github페이지로 이동',
    Icon: Icons.Github,
    hoverClass: 'hover:text-gray-950',
  },
  {
    href: 'https://www.notion.so/ahahahahreum/2c35213dcd4c80a99a16de00a56a8b70?source=copy_link',
    title: '코드잇 FE19기 파트4 1팀 notion페이지로 이동',
    Icon: Icons.Notion,
    hoverClass: 'hover:text-gray-950',
  },
] as const;

export const textLinkVariants = cva(
  'body-14 font-medium text-gray-400 transition-colors duration-500 hover:text-primary-600',
  {
    variants: {
      withDot: {
        true: 'after:ml-15 after:content-["·"]',
        false: 'ml-15',
      },
    },
    defaultVariants: {
      withDot: false,
    },
  }
);

/**
 * 전역 푸터 컴포넌트
 *
 * 서비스 하단에 고정적으로 노출되며,
 * 팀 정보, 외부 문서 링크(GitHub Discussions, Wiki),
 * 그리고 소셜/협업 채널(YouTube, GitHub, Notion) 아이콘을 제공합니다.
 *
 * ### 구성 요소
 * - 팀 저작권 정보 표시
 * - GitHub Discussions / Wiki 외부 링크
 * - YouTube, GitHub, Notion 아이콘 링크
 *
 * ### 특징
 * - `next/link`를 사용해 외부 링크를 새 탭으로 오픈
 * - Tailwind CSS 기반 반응형 레이아웃 적용
 * - 아이콘 hover 시 컬러 트랜지션 제공
 * - `className` prop을 통해 외부에서 여백, 배경 등 스타일 확장 가능
 *
 * @returns 전역 푸터 UI
 */

export default function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        'relative mt-80 w-full border-t border-gray-100 sm:mt-48 lg:mt-180',
        className
      )}>
      <div className='mx-auto flex h-128 w-full max-w-1520 items-center justify-between bg-white px-24 sm:h-144 sm:px-40 md:px-10 lg:px-0'>
        <span className='mt-74 body-14 font-semibold text-gray-400 sm:mt-0'>&copy;FE 19기 1팀</span>
        <ul className='absolute top-30 left-1/2 flex -translate-x-1/2 items-center sm:static sm:top-0 sm:translate-x-0'>
          {TEXT_LINKS.map(({ href, title, label, withDot }) => (
            <li key={href}>
              <Link
                href={href}
                title={title}
                target='_blank'
                className={textLinkVariants({ withDot })}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className='mt-76 flex items-center gap-16 sm:mt-0'>
          {ICON_LINKS.map(({ href, title, Icon, hoverClass }) => (
            <li key={href}>
              <Link href={href} title={title} target='_blank'>
                <Icon
                  className={cn(
                    'h-25 w-25 text-gray-400 transition-colors duration-500',
                    hoverClass
                  )}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
