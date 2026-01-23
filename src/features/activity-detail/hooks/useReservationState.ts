import { useEffect, useState } from 'react';

/**
 * 예약 상태 관리 훅의 반환 타입
 *
 * @property selectedDate - 사용자가 선택한 예약 날짜
 * @property selectedScheduleId - 사용자가 선택한 스케줄 ID (시간대 식별자)
 * @property participantCount - 예약 참여 인원 수
 * @property showParticipantSection - 인원 선택 섹션 표시 여부 (바텀시트 모드에서 단계 전환용)
 * @property setSelectedDate - 선택된 날짜를 설정하는 함수
 * @property setSelectedScheduleId - 선택된 스케줄 ID를 설정하는 함수
 * @property setParticipantCount - 참여 인원 수를 설정하는 함수
 * @property setShowParticipantSection - 인원 선택 섹션 표시 여부를 설정하는 함수
 * @property handleDateSelect - 날짜 선택 시 호출되며, 시간 선택을 초기화하는 핸들러
 * @property handleBack - 뒤로가기 버튼 클릭 시 호출되는 핸들러 (인원 선택 → 날짜/시간 선택)
 * @property isDateTimeValid - 날짜와 시간이 모두 선택되었는지 검증
 * @property isValid - 예약에 필요한 모든 정보가 유효한지 검증 (날짜, 시간, 인원)
 */
interface UseReservationStateReturn {
  // 상태값
  selectedDate: Date | undefined;
  selectedScheduleId: number | null;
  participantCount: number;
  showParticipantSection: boolean;

  // 상태 변경 함수
  setSelectedDate: (date: Date | undefined) => void;
  setSelectedScheduleId: (id: number | null) => void;
  setParticipantCount: (count: number) => void;
  setShowParticipantSection: (show: boolean) => void;

  // 핸들러 함수
  handleDateSelect: (date: Date | undefined) => void;
  handleBack: () => void;

  // 유효성 검증
  isDateTimeValid: boolean;
  isValid: boolean;
}

/**
 * 예약 상태 관리 커스텀 훅
 *
 * 체험 예약에 필요한 모든 상태와 상태 변경 로직을 관리합니다.
 *
 * @description
 * 훅이 관리하는 주요 상태:
 * - 선택된 날짜 (selectedDate)
 * - 선택된 스케줄 ID/시간대 (selectedScheduleId)
 * - 참여 인원 수 (participantCount)
 * - 인원 선택 섹션 표시 여부 (showParticipantSection)
 *
 * 주요 기능:
 * - 날짜 선택 시 시간 자동 초기화
 * - 월 변경 시 모든 선택 상태 초기화 (useEffect 자동 처리)
 * - 단계별 UI 전환 지원 (날짜/시간 → 인원)
 * - 예약 가능 여부 유효성 검증
 *
 * @param currentMonth - 현재 달력에 표시 중인 월
 * @returns 예약 상태와 관련 함수들
 *
 * @example
 * ```tsx
 * const reservation = useReservationState(currentMonth);
 *
 * // 날짜 선택
 * reservation.handleDateSelect(new Date());
 *
 * // 유효성 검증
 * if (reservation.isValid) {
 *   // 예약 진행
 * }
 * ```
 */
const useReservationState = (currentMonth: Date): UseReservationStateReturn => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(null);
  const [participantCount, setParticipantCount] = useState(1);
  const [showParticipantSection, setShowParticipantSection] = useState(false);

  // 월이 변경되면 모든 선택 상태 초기화
  useEffect(() => {
    setSelectedDate(undefined);
    setSelectedScheduleId(null);
    setParticipantCount(1);
    setShowParticipantSection(false);
  }, [currentMonth]);

  // 날짜 선택 핸들러 - 날짜 변경 시 시간 초기화
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedScheduleId(null);
  };

  // 뒤로가기 핸들러 (인원 선택 → 날짜/시간 선택)
  const handleBack = () => {
    setShowParticipantSection(false);
  };

  // 유효성 검증
  const isDateTimeValid = Boolean(selectedDate && selectedScheduleId);
  const isValid = Boolean(selectedDate && selectedScheduleId && participantCount > 0);

  return {
    // 상태값
    selectedDate,
    selectedScheduleId,
    participantCount,
    showParticipantSection,

    // 상태 변경 함수
    setSelectedDate,
    setSelectedScheduleId,
    setParticipantCount,
    setShowParticipantSection,

    // 핸들러 함수
    handleDateSelect,
    handleBack,

    // 유효성 검증
    isDateTimeValid,
    isValid,
  };
};

export default useReservationState;
