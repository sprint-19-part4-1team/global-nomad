import type { Meta, StoryObj } from '@storybook/nextjs';
import TabsLink from './TabsLink';
import TabsNav from './TabsNav';

/**
 * TabsNav 컴포넌트 스토리 가이드
 * - TabsNav / TabsLink는 탭 형태의 **페이지 이동을 목적으로 하는 네비게이션 컴포넌트**입니다.
 * - Storybook 환경에서는 실제 라우트 이동이 발생하지 않도록 구성되어 있지 않으므로,
 * 이 스토리는 **동작 테스트용이 아닌 스타일 및 사용 예시 확인용**으로 제공합니다.
 * - 활성 상태(isActive)는 상위 컴포넌트에서 제어됩니다.
 * - 실제 사용 시에는 `usePathname`를 통해 활성 여부를 판단하세요.
 *
 * ### **주요 특징**
 * - TabsNav는 탭 형태로 스타일링된 **페이지 이동용 네비게이션 컨테이너**입니다.
 * - 내부에는 `TabsLink` 컴포넌트를 조합해 사용합니다.
 * - ARIA Tabs 패턴을 사용하지 않으며, 시맨틱한 `nav` 기반 네비게이션입니다.
 *
 * ### **접근성 규칙**
 * - `nav` 태그와 `aria-label`을 필수로 사용합니다.
 * - 현재 페이지는 `TabsLink`의 `aria-current="page"`로 표현합니다.
 *
 * ### **사용 예시**
 * ```tsx
 * 'use client';
 *
 *import { usePathname } from 'next/navigation';
 *import { TabsLink, TabsNav } from '@/shared/components/tabs';
 *
 *export default function MypageTab() {
 * const pathname = usePathname();
 *
 * return (
 *    <TabsNav ariaLabel='마이페이지 섹션'>
 *     <TabsLink href='/mypage/info' isActive={pathname === '/mypage/info'}>
 *        내 정보
 *     </TabsLink>
 *      <TabsLink href='/mypage/reservation-list' isActive={pathname === '/mypage/reservation-list'}>
 *        예약 내역
 *       </TabsLink>
 *   </TabsNav>
 * );
 *}
 * ```
 */
const meta: Meta<typeof TabsNav> = {
  title: 'Shared/Tabs/TabsNav',
  component: TabsNav,
  argTypes: {
    children: {
      control: 'text',
      description: '네비게이션 내부에 렌더링될 TabsLink 컴포넌트들',
      table: {
        type: {
          summary: `ReactNode`,
        },
      },
    },
    ariaLabel: {
      control: 'text',
      description: '스크린리더 사용자에게 제공될 네비게이션의 목적 설명',
      table: {
        type: {
          summary: `string`,
        },
      },
    },
    className: {
      control: 'text',
      description: '추가 커스텀 스타일',
      table: {
        type: {
          summary: `string`,
        },
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof TabsNav>;

export const Default: Story = {
  render: (args) => (
    <TabsNav ariaLabel='마이페이지 섹션' className={args.className}>
      <TabsLink href='/mypage/info' isActive>
        내 정보
      </TabsLink>
      <TabsLink href='/mypage/reservation-list' isActive={false}>
        예약 내역
      </TabsLink>
    </TabsNav>
  ),
};
