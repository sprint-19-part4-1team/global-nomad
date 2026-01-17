import { Meta, StoryObj } from '@storybook/nextjs';
import { useState } from 'react';
import ScheduleDurationRadio from '@/features/activity-form/common/components/schedule-date-section/schedule-duration-radio/ScheduleDurationRadio';
import ScheduleDurationRadioGroup from '@/features/activity-form/common/components/schedule-date-section/schedule-duration-radio/ScheduleDurationRadioGroup';

/**
 * ScheduleDurationRadio 컴포넌트 스토리 가이드
 *
 * ### 주요 특징
 * - 체험 시간을 선택하기 위한 커스텀 라디오 버튼 컴포넌트입니다.
 * - 기본 `<input type="radio" />`를 스타일링하여 구현되었습니다.
 * - `fieldset + legend` 기반의 그룹 컴포넌트와 함께 사용하는 것을 권장합니다.
 * - 선택 상태(`checked`)는 상위 컴포넌트에서 제어하는 방식입니다.
 */
const meta: Meta = {
  title: 'Features/ActivityForm/ScheduleDurationRadio',
  component: ScheduleDurationRadio,
  argTypes: {
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    value: { control: 'number' },
    label: { control: 'text' },
    onChange: { action: 'changed' },
  },
  args: {
    label: '1시간',
    name: 'duration',
    value: 60,
    disabled: false,
    checked: false,
  },
};

export default meta;

type Story = StoryObj<typeof ScheduleDurationRadio>;

/**
 * 기본 상태의 ScheduleDurationRadio 컴포넌트입니다.
 *
 * - Storybook Controls 패널을 통해 `label`, `checked`, `disabled` 등의 props를 직접 변경해볼 수 있습니다.
 * - 컴포넌트의 개별 동작과 스타일을 빠르게 확인하기 위한 스토리입니다.
 */
export const Default: Story = {};

/**
 * ScheduleDurationRadio의 주요 상태들을 한 번에 확인하기 위한 스토리입니다.
 *
 * - 상태별 스타일 확인 용도라서 컨트롤되지 않습니다.
 * - 기본 상태, 선택된 상태, 비활성 상태
 */
export const AllStates: Story = {
  render: () => {
    return (
      <div className='flex gap-12'>
        <ScheduleDurationRadio
          name='duration-all'
          label='1시간'
          value={60}
          checked={false}
          onChange={() => {}}
        />
        <ScheduleDurationRadio
          name='duration-all'
          label='2시간'
          value={120}
          checked
          onChange={() => {}}
        />
        <ScheduleDurationRadio
          name='duration-all'
          label='3시간'
          value={180}
          checked={false}
          disabled
          onChange={() => {}}
        />
      </div>
    );
  },
};

/**
 * ScheduleDurationRadioGroup과 함께 사용한 실제 사용 예제입니다.
 *
 * - 여러 개의 ScheduleDurationRadio를 하나의 그룹으로 묶어 사용합니다.
 * - 선택 상태는 상위 컴포넌트의 상태로 관리됩니다.
 */
export const WithGroup: Story = {
  render: () => {
    const [duration, setDuration] = useState<number>(60);

    return (
      <ScheduleDurationRadioGroup legend='체험시간'>
        <ScheduleDurationRadio
          name='duration'
          label='1시간'
          value={60}
          checked={duration === 60}
          onChange={setDuration}
        />
        <ScheduleDurationRadio
          name='duration'
          label='2시간'
          value={120}
          checked={duration === 120}
          onChange={setDuration}
        />
      </ScheduleDurationRadioGroup>
    );
  },
};
