import Button from '@/shared/components/button/Button';
import Title from '@/shared/components/title/Title';
import { cn } from '@/shared/utils/cn';

interface MypageSectionHeaderProps {
  title: string;
  description: string;
  btn?: boolean;
}

/**
 * 마이페이지 섹션 상단에 사용되는 헤더 컴포넌트
 *
 * 제목(title), 설명(description), 선택적인 버튼 영역(btn)을 렌더링합니다.
 * 버튼 유무에 따라 반응형 padding과 레이아웃이 자동으로 조절됩니다.
 *
 * ---
 * 📐 레이아웃 동작
 * - `btn === true`
 *   - `sm` 이상 해상도에서 우측 버튼 영역을 위한 여백(`sm:pr-140`) 확보
 *   - 버튼 영역은 우측 상단에 absolute로 배치
 * - `btn === false | undefined`
 *   - 모든 해상도에서 우측 padding 없음
 *
 *
 * @param title - 섹션의 메인 제목 텍스트
 * @param description - 섹션 설명 텍스트
 * @param btn - 우측 상단 버튼 영역 노출 여부
 *
 * @example
 * ```tsx
 * <MypageSectionHeader
 *   title="내 정보"
 *   description="나의 예약 현황을 확인할 수 있습니다."
 *   btn
 * />
 * ```
 *
 * @example
 * ```tsx
 * <MypageSectionHeader
 *   title="예약 내역"
 *   description="나의 예약 현황을 확인할 수 있습니다."
 * />
 * ```
 */

export default function MypageSectionHeader({ title, description, btn }: MypageSectionHeaderProps) {
  return (
    <div className={cn('relative pr-0', btn ? 'sm:pr-140' : 'sm:pr-0')}>
      <Title responsive='md' className='text-gray-950'>
        {title}
      </Title>
      <p className='mt-10 body-14 font-medium whitespace-pre-line text-gray-600 sm:body-16'>
        {description}
      </p>
      {btn && (
        <div className='absolute top-0 right-0 hidden w-135 sm:block'>
          <Button href='/activity/new' size='lg'>
            체험 등록하기
          </Button>
        </div>
      )}
    </div>
  );
}
