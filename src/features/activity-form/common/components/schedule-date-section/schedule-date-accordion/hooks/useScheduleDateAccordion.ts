import { useContext } from 'react';
import { ScheduleDateAccordionContext } from '@/features/activity-form/common/components/schedule-date-section/schedule-date-accordion/context/ScheduleDateAccordion';

/**
 * ## useScheduleDateAccordionContext
 *
 * @description
 * ScheduleDateAccordionContext를 사용하기 위한 커스텀 훅입니다.
 * ScheduleDateAccordionContext 외부에서 호출하면 에러가 발생합니다.
 */
const useScheduleDateAccordionContext = () => {
  const context = useContext(ScheduleDateAccordionContext);

  if (!context) {
    throw new Error('ScheduleDateAccordionContextt 내부에서 사용하세요.');
  }

  return context;
};

export default useScheduleDateAccordionContext;
