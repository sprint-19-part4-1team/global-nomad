import type { Meta, StoryObj } from '@storybook/nextjs';
import Title from './Title';

/**
 * Title 컴포넌트 스토리 가이드
 *
 * - `size`(고정)와 `responsive`(반응형 프리셋)는 동시에 사용할 수 없습니다.
 * - `size`와 `responsive`를 모두 지정하지 않으면 `size="32"`가 적용됩니다.
 * - `responsive`를 지정한 경우에는 기본 `size`가 자동으로 붙지 않습니다.
 *
 * 참고: Tailwind v4의 `@utility foo-*`는 `*` 자리에 들어갈 값들을 오름차순으로 정렬합니다.
 * - 따라서 `heading-18 → heading-20 → heading-24 → heading-32` 순서로 CSS가 생성됩니다.
 * - `className`으로 `heading-*`을 덮어쓰려 해도, 선언 순서상 덮어쓰기가 어려울 수 있습니다.
 *   (이 경우에는 `size`/`responsive`를 조정하거나, 더 구체적인 선택자를 사용하세요.)
 */

const meta: Meta<typeof Title> = {
  title: 'Shared/Title',
  component: Title,
  render: (args) => <Title {...args} />,
  argTypes: {
    as: {
      control: 'select',
      options: ['h2', 'h3', 'h4', 'h5', 'h6'],
      description: '렌더링할 HTML 태그 (`h2` ~ `h6`)',
    },
    size: {
      control: 'select',
      options: ['32', '24', '20', '18'],
      description: '고정 폰트 크기(heading-* 토큰). `responsive`와 동시에 사용할 수 없습니다.',
    },
    responsive: {
      control: 'select',
      options: ['lg', 'md', 'sm'],
      description: '반응형 폰트 프리셋. `size`와 동시에 사용할 수 없습니다.',
    },
    weight: {
      control: 'select',
      options: ['bold', 'semibold', 'medium', 'normal'],
      description: '폰트 두께',
    },
    className: {
      control: 'text',
      description:
        '추가 커스텀 스타일(레이아웃/여백/색상 등). 필요 시 타이포그래피도 className으로 보완할 수 있습니다.',
    },
    children: {
      control: 'text',
      description: '타이틀 텍스트 내용',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Title>;

export const Default: Story = {
  args: {
    as: 'h2',
    children: '🔥 인기 체험',
  },
};

export const FixedSize: Story = {
  args: {
    as: 'h2',
    size: '24',
    weight: 'bold',
    children: '고정 크기 타이틀 (size=24)',
  },
};

export const ResponsivePreset: Story = {
  args: {
    as: 'h2',
    responsive: 'lg',
    weight: 'bold',
    children: '반응형 프리셋 타이틀 (responsive=lg)',
  },
};
