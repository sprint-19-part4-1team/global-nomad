'use client';

import { ReactNode, useId, useState } from 'react';
import { ScheduleDateAccordionContext } from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/context/ScheduleDateAccordion';

interface ScheduleDateAccordionProps {
  /** 아코디언을 구성하는 하위 컴포넌트들 (Header, Panel) */
  children: ReactNode;
  /** 아코디언의 초기 열림 상태 */
  defaultOpen?: boolean;
}

/**
 * ## ScheduleDateAccordion
 *
 * @description
 * - 날짜 단위 스케줄 설정을 위한 아코디언의 Root 컴포넌트입니다.
 * - 아코디언의 열림/닫힘 상태(`isOpen`)를 내부 상태로 관리하고,
 *   해당 상태를 Context를 통해 하위 컴포넌트(Header, Panel)에 공유합니다.
 *
 * @example
 * ```tsx
 * <ScheduleDateAccordion defaultOpen={true}>
 *   <ScheduleDateAccordionHeader date="2025-01-20" onDelete={() => removeScheduleDate(id)} />
 *   <ScheduleDateAccordionPanel />
 * </ScheduleDateAccordion>
 * ```
 */
export default function ScheduleDateAccordion({
  children,
  defaultOpen = false,
}: ScheduleDateAccordionProps) {
  const baseId = useId();
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <ScheduleDateAccordionContext
      value={{ isOpen, setIsOpen, triggerId: `${baseId}-trigger`, panelId: `${baseId}-panel` }}>
      <fieldset>{children}</fieldset>
    </ScheduleDateAccordionContext>
  );
}
