import { Meta, StoryObj } from '@storybook/nextjs';
import Textarea from '@/shared/components/textarea/Textarea';

/**
 * Textarea 컴포넌트 스토리 가이드
 *
 * Textarea는 최대 글자 수 제한과 글자 수 카운터가 포함된 텍스트 입력 영역 컴포넌트입니다.<br/>
 * variant prop에 따라 체험 등록/수정용('activity')과 리뷰 작성용('review')으로 구분됩니다.
 *
 * ### 주요 특징
 * - activity/review 두 가지 variant로 사용 목적에 따른 스타일 분리
 * - maxLength를 통한 입력 글자 수 제한 및 카운터 표시
 * - errorMessage prop을 통한 유효성 검사 에러 표시
 * - label, placeholder를 통한 명확한 사용자 가이드 제공
 *
 * ### Props 설명
 * - `variant`: Textarea를 사용할 위치 ('activity'|'review')
 * - `label`: 텍스트 영역의 label 텍스트
 * - `name`: form 제출 시 사용될 텍스트 영역의 name
 * - `placeholder`: 텍스트 영역의 placeholder 텍스트
 * - `maxLength`: 텍스트 영역에 입력 가능한 최대 글자 수 ('activity': 1000 | 'review': 100)
 * - `errorMessage`: 에러 발생 시 표시될 메시지
 */

const meta: Meta<typeof Textarea> = {
  title: 'Shared/Textarea',
  component: Textarea,
  render: (args) => (
    <div className='w-400'>
      <Textarea {...args} />
    </div>
  ),
  argTypes: {
    variant: {
      control: 'select',
      options: ['activity', 'review'],
      description: "Textarea를 사용할 위치 ('activity': 체험 등록/수정용 | 'review': 리뷰 작성용)",
    },
    label: {
      control: 'text',
      description: '텍스트 영역의 label 텍스트',
    },
    name: {
      control: 'text',
      description: 'form 제출 시 사용될 텍스트 영역의 name',
    },
    placeholder: {
      control: 'text',
      description: '텍스트 영역의 placeholder 텍스트',
    },
    maxLength: {
      control: 'number',
      description: "텍스트 영역에 입력 가능한 최대 글자 수 ('activity': 1000 | 'review': 100)",
    },
    errorMessage: {
      control: 'text',
      description: '에러 발생 시 표시될 메시지',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

/**
 * 기본 상태 (체험 등록/수정용)
 * 최대 1000자 제한
 */
export const Default: Story = {
  args: {
    variant: 'activity',
    label: '설명',
    name: 'content',
    placeholder: '체험에 대한 설명을 입력해 주세요.',
    maxLength: 1000,
  },
};

/** 리뷰 작성용 Textarea
 *  최대 100자 제한
 */
export const Review: Story = {
  args: {
    variant: 'review',
    label: '소중한 경험을 들려주세요',
    name: 'comment',
    placeholder: '체험에서 느낀 경험을 자유롭게 남겨주세요.',
    maxLength: 100,
  },
};

/**
 * 에러 메시지 표시
 * 체험 등록/수정용인 경우에 에러 메시지 표시
 */
export const DisplayErrorMessage: Story = {
  args: {
    variant: 'activity',
    label: '설명',
    name: 'content',
    placeholder: '체험에 대한 설명을 입력해 주세요.',
    maxLength: 1000,
    errorMessage: '설명을 입력해 주세요.',
  },
};
