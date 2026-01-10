/**
 * 평균 평점을 기반으로 만족도 문구를 반환합니다
 *
 * @param {number} averageRating - 평균 평점 (0~5)
 * @returns {string} 만족도 문구
 *
 * @example
 * getSatisfactionLabel(5);    // "매우 만족"
 * getSatisfactionLabel(4.5);  // "만족"
 * getSatisfactionLabel(3.2);  // "보통"
 * getSatisfactionLabel(2.7);  // "불만족"
 * getSatisfactionLabel(1.5);  // "매우 불만족"
 */
export const formatSatisfaction = (averageRating: number): string => {
  if (averageRating === 5) {
    return '매우 만족';
  }
  if (averageRating >= 4) {
    return '만족';
  }
  if (averageRating >= 3) {
    return '보통';
  }
  if (averageRating >= 2) {
    return '불만족';
  }
  return '매우 불만족';
};
