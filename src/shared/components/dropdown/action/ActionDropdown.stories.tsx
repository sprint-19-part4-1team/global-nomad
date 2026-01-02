import type { Meta, StoryObj } from '@storybook/nextjs';
import Avatar from '@/shared/components/avatar/Avatar';
import AvatarFallback from '@/shared/components/avatar/AvatarFallback';
import AvatarImage from '@/shared/components/avatar/AvatarImage';
import {
  ActionDropdown,
  ActionDropdownTrigger,
  ActionDropdownContent,
  ActionDropdownItem,
} from '@/shared/components/dropdown/action';
import { UserServiceResponseDto } from '@/shared/types/user';

/**
 * ActionDropdown 컴포넌트 스토리 가이드
 *
 * ### 주요 특징
 * - ActionDropdown은 클릭 시 액션 메뉴를 표시하는 **메뉴형 드롭다운**입니다.
 * - Trigger / Content / Item으로 구성된 **컴파운드 패턴**을 사용합니다.
 * - SelectDropdown과 동일한 DropdownBase 인프라를 사용하지만,
 *   **선택 값이 아닌 즉시 실행 액션**을 목적으로 합니다.
 *
 * ### **접근성 규칙**
 * - Trigger는 `button` 요소이며 `aria-haspopup="menu"`를 가집니다.
 * - 메뉴의 열림 상태는 `aria-expanded`로 전달됩니다.
 * - 메뉴 컨테이너는 `role="menu"`,
 *   각 아이템은 `role="menuitem"`을 사용합니다.
 * - Trigger 내부에 아이콘만 존재하는 경우,
 *   `aria-label`을 통해 의미 있는 레이블을 제공합니다.
 *
 * ### 사용 예시
 * ```tsx
 * <ActionDropdown>
 *   <ActionDropdownTrigger aria-label="유저 메뉴 열기">
 *     <Avatar />
 *   </ActionDropdownTrigger>
 *   <ActionDropdownContent>
 *     <ActionDropdownItem onClick={logout}>로그아웃</ActionDropdownItem>
 *     <ActionDropdownItem onClick={goMyPage}>마이페이지</ActionDropdownItem>
 *   </ActionDropdownContent>
 * </ActionDropdown>
 * ```
 */
const meta: Meta<typeof ActionDropdown> = {
  title: 'Shared/Dropdown/ActionDropdown',
  component: ActionDropdown,
  argTypes: {
    children: {
      description:
        '`ActionDropdownTrigger`, `ActionDropdownContent`, `ActionDropdownItem`을 조합하여 전달',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActionDropdown>;

/**
 * 테스트용 유저 데이터
 */
const DEFAULT_USER: UserServiceResponseDto = {
  id: 1,
  email: 'test@example.com',
  nickname: '유저',
  profileImageUrl: null,
  createdAt: '2025-12-24T08:50:57.848Z',
  updatedAt: '2025-12-24T08:50:57.848Z',
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: `
기본적인 ActionDropdown 예제입니다.
- 메뉴 아이템 클릭 시 드롭다운이 닫힌 후 액션이 실행됩니다.
        `,
      },
    },
  },
  render: () => {
    return (
      <div className='h-90'>
        <ActionDropdown>
          <ActionDropdownTrigger className='flex items-center gap-10' aria-label='유저 메뉴 열기'>
            <Avatar user={DEFAULT_USER}>
              <AvatarImage />
              <AvatarFallback />
            </Avatar>
            <span className='body-14 font-medium text-gray-950'>{DEFAULT_USER.nickname}</span>
          </ActionDropdownTrigger>

          <ActionDropdownContent className='-left-20'>
            <ActionDropdownItem onClick={() => console.log('로그아웃')}>
              로그아웃
            </ActionDropdownItem>
            <ActionDropdownItem onClick={() => console.log('마이페이지')}>
              마이페이지
            </ActionDropdownItem>
          </ActionDropdownContent>
        </ActionDropdown>
      </div>
    );
  },
};

export const IconOnlyTrigger: Story = {
  parameters: {
    docs: {
      description: {
        story: `
아이콘만 사용하는 ActionDropdown 트리거 예제입니다.

- Trigger 내부에 텍스트가 없는 경우,
  반드시 \`aria-label\`을 제공해야 합니다.
- 시각적으로는 아이콘만 보이지만,
  스크린 리더 사용자에게는 명확한 의미가 전달됩니다.
        `,
      },
    },
  },
  render: () => {
    return (
      <div className='h-90'>
        <ActionDropdown>
          <ActionDropdownTrigger aria-label='유저 메뉴 열기'>
            <Avatar user={DEFAULT_USER}>
              <AvatarImage />
              <AvatarFallback />
            </Avatar>
          </ActionDropdownTrigger>

          <ActionDropdownContent className='-left-40'>
            <ActionDropdownItem onClick={() => console.log('로그아웃')}>
              로그아웃
            </ActionDropdownItem>
            <ActionDropdownItem onClick={() => console.log('마이페이지')}>
              마이페이지
            </ActionDropdownItem>
          </ActionDropdownContent>
        </ActionDropdown>
      </div>
    );
  },
};
