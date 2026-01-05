import type { Meta, StoryObj } from '@storybook/nextjs';
import Footer from '@/shared/components/footer/Footer';

/**
 * Footer 컴포넌트
 *
 * Storybook에서 전역 레이아웃 하단 UI를 설명하고 확인하기 위한 푸터 컴포넌트입니다.
 * 실제 서비스에서는 모든 페이지 하단에 공통으로 사용됩니다.
 *
 * ### 역할
 * - 서비스 팀 정보 및 저작권 정보 노출
 * - 협업 및 문서용 외부 링크 제공
 * - 소셜/협업 채널 접근 아이콘 제공
 *
 * ### 포함 요소
 * - GitHub Discussions / Wiki 텍스트 링크
 * - YouTube, GitHub, Notion 아이콘 링크
 *
 * ### Storybook 확인 포인트
 * - 페이지 하단에 자연스럽게 배치되는지
 * - hover 시 텍스트 및 아이콘 컬러 전환
 * - 반응형 환경에서 레이아웃 유지 여부
 * - `className` 변경 시 여백/배경 등 스타일이 정상적으로 확장되는지
 *
 * ### 구현 특징
 * - 외부 링크는 새 탭으로 열림
 * - Tailwind CSS 기반 스타일링
 * - 전역 레이아웃 컴포넌트로 사용 가능하며,
 *   `className` prop을 통해 외부에서 스타일 확장 가능
 */

const meta: Meta<typeof Footer> = {
  title: 'Shared/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    className: {
      control: 'text',
      description: 'Footer 루트 요소에 추가로 적용할 Tailwind class',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {
    className: '',
  },
};
