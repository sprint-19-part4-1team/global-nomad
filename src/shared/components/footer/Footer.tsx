import Link from 'next/link';
import Icons from '@/assets/icons';

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
 *
 * @returns 전역 푸터 UI
 */

export default function Footer() {
  return (
    <footer className='mt-80 w-full border-t border-gray-100 sm:mt-48 lg:mt-180'>
      <div className='mx-auto flex h-128 w-full max-w-1520 items-center justify-between bg-white px-24 sm:h-144 sm:px-40 md:px-10 lg:px-0'>
        <span className='body-14 font-semibold text-gray-400'>&copy;FE 19기 1팀</span>
        <ul className='flex items-center'>
          <li>
            <Link
              href='https://github.com/orgs/sprint-19-part4-1team/discussions'
              title='코드잇 FE19기 파트4 1팀 discussions페이지로 이동'
              target='_blank'
              className='transition-color body-14 font-medium text-gray-400 transition duration-500 after:ml-15 after:content-["·"] hover:text-primary-600'>
              Discussions
            </Link>
          </li>
          <li>
            <Link
              href='https://github.com/sprint-19-part4-1team/global-nomad/wiki'
              title='코드잇 FE19기 파트4 1팀 wiki페이지로 이동'
              target='_blank'
              className='transition-color ml-15 body-14 font-medium text-gray-400 transition duration-500 hover:text-primary-600'>
              Wiki
            </Link>
          </li>
        </ul>
        <ul className='flex items-center gap-16'>
          <li>
            <Link
              href='https://www.youtube.com/'
              title='코드잇 FE19기 파트4 1팀 시연영상페이지로 이동'
              target='_blank'>
              <Icons.Youtube className='transition-color h-25 w-25 text-gray-400 transition duration-500 hover:text-red-500' />
            </Link>
          </li>
          <li>
            <Link
              href='https://github.com/sprint-19-part4-1team/global-nomad'
              title='코드잇 FE19기 파트4 1팀 github페이지로 이동'
              target='_blank'>
              <Icons.Github className='transition-color h-25 w-25 text-gray-400 transition duration-500 hover:text-gray-950' />
            </Link>
          </li>
          <li>
            <Link
              href='https://www.notion.so/ahahahahreum/2c35213dcd4c80a99a16de00a56a8b70?source=copy_link'
              title='코드잇 FE19기 파트4 1팀 notion페이지로 이동'
              target='_blank'>
              <Icons.Notion className='transition-color h-25 w-25 text-gray-400 transition duration-500 hover:text-gray-950' />
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
