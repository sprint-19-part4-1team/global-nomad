import type { Meta, StoryObj } from '@storybook/nextjs';
import { useArgs } from 'storybook/internal/preview-api';
import Tabs from '@/shared/components/tabs/content/Tabs';
import TabsContent from '@/shared/components/tabs/content/TabsContent';
import TabsList from '@/shared/components/tabs/content/TabsList';
import TabsTrigger from '@/shared/components/tabs/content/TabsTrigger';

/**
 * Tabs 컴포넌트 스토리 가이드
 *
 * ### 주요 특징
 * - Tabs는 여러 콘텐츠 영역을 전환할 수 있는 **컴파운드 컴포넌트**입니다.
 * - 내부 상태는 외부에서 제어되는 방식으로 동작합니다.
 * - 이 스토리는 실제 사용 예시를 기반으로 한 **인터랙션 확인용**입니다.
 *
 * ### **접근성 규칙**
 * - `TabsList`는 `role="tablist"`를 사용합니다.
 * - `TabsTrigger`는 `role="tab"`을 가지며, 선택 상태는 `aria-selected`로 표현됩니다.
 * - 활성화된 탭만 `tabIndex=0`을 가지며, 나머지는 `tabIndex=-1`로 관리됩니다.
 * - 각 `TabsTrigger`와 `TabsContent`는 `aria-controls` / `aria-labelledby`로 1:1 연결됩니다.
 * - 키보드로 `ArrowLeft / ArrowRight / Home / End`를 사용해 탭 간 이동이 가능합니다.
 *
 * ### 주의사항
 * - Storybook 환경에서는 URL(`searchParams`)을 사용하지 않습니다.
 * - 실제 서비스에서는 `useQueryParamState` 훅과 함께 사용하는 것을 권장합니다.
 *
 * ### 사용 예시
 * ```tsx
 *  const [tabValue, setTabValue] = useQueryParamState(TAB_QUERY_KEY, {
 *   defaultValue: 'request',
 *   removeParam: (v) => v === 'request',
 * });
 *
 * <Tabs value={value} onChangeValue={onChangeValue}>
 *  <TabsList>
 *    <TabsTrigger value='request'>
 *      <span>신청</span>
 *      <span className='pl-4'>0</span>
 *   </TabsTrigger>
 *   <TabsTrigger value='approve'>
 *      <span>승인</span>
 *      <span className='pl-4'>0</span>
 *    </TabsTrigger>
 *  </TabsList>
 *  <TabsContent value='request'>신청 탭</TabsContent>
 *  <TabsContent value='approve'>승인 탭</TabsContent>
 * </Tabs>
 * ```
 */
const meta: Meta<typeof Tabs> = {
  title: 'Shared/Tabs/Tabs',
  component: Tabs,
  argTypes: {
    value: {
      control: 'text',
      description: '현재 선택된 탭의 값',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    onChangeValue: {
      description: '탭 선택이 변경될 때 호출되는 콜백 함수',
      table: {
        type: {
          summary: '(value: string) => void',
        },
      },
    },
    className: {
      description: 'Tabs 루트에 적용할 추가 클래스',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    children: {
      description: '`TabsList`, `TabsTrigger`, `TabsContent`를 조합해서 전달',
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    value: 'request',
  },
  render: () => {
    const [{ value }, updateArgs] = useArgs();

    return (
      <div className='w-500'>
        <Tabs
          value={value}
          onChangeValue={(nextValue) => {
            updateArgs({ value: nextValue });
          }}>
          <TabsList>
            <TabsTrigger value='request'>
              <span>신청</span>
              <span className='pl-4'>0</span>
            </TabsTrigger>
            <TabsTrigger value='approve'>
              <span>승인</span>
              <span className='pl-4'>0</span>
            </TabsTrigger>
            <TabsTrigger value='reject'>
              <span>거절</span>
              <span className='pl-4'>0</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value='request'>신청 탭</TabsContent>
          <TabsContent value='approve'>승인 탭</TabsContent>
          <TabsContent value='reject'>거절 탭</TabsContent>
        </Tabs>
      </div>
    );
  },
};
