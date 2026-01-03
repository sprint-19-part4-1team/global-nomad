import Link from 'next/link';
import AuthBackButton from '@/features/auth/components/terms/AuthBackButton';
import Title from '@/shared/components/title/Title';

type TermsSection =
  | {
      title: string;
      paragraphs: string[];
    }
  | {
      title: string;
      paragraphs: string[];
      list: string[];
    }
  | {
      title: string;
      paragraphs: string[];
      type: 'team';
    };

/* 약관 내용 정의 */
const TERMS_CONTENT: TermsSection[] = [
  {
    title: '제1조 (목적)',
    paragraphs: [
      '본 약관은 GlobalNomad(이하 “서비스”)의 이용과 관련하여 서비스와 이용자 간의 기본적인 사항을 안내하는 것을 목적으로 합니다.',
      '본 서비스는 학습 및 포트폴리오 목적의 팀 프로젝트로 제작된 웹 서비스이며, 실제 상업적 운영을 위한 서비스가 아님을 명확히 합니다.',
    ],
  },
  {
    title: '제2조 (서비스 소개)',
    paragraphs: [
      'GlobalNomad는 사용자가 체험 제공자와 체험 예약자 역할을 모두 수행할 수 있는 체험 예약 플랫폼 형태의 웹 서비스입니다.',
      '서비스는 다음과 같은 기능을 제공합니다.',
    ],
    list: [
      '체험 상품 등록, 조회, 수정, 삭제',
      '캘린더 뷰를 통한 예약 가능 날짜 설정',
      '지도 뷰를 활용한 체험 위치 확인',
      '체험 상품 예약 및 예약 승인 및 취소 관리',
    ],
  },
  {
    title: '제3조 (제작자 정보)',
    paragraphs: ['본 서비스는 학습 및 프로젝트 목적을 위해 아래 팀원들이 공동 제작하였습니다.'],
    type: 'team',
  },
  {
    title: '제4조 (프로젝트 성격 및 유의사항)',
    paragraphs: [],
    list: [
      '본 서비스는 학습 및 시연을 목적으로 제작된 팀 프로젝트입니다.',
      '서비스 내 데이터는 테스트용 예시 데이터입니다.',
      '실제 결제 및 법적 계약은 이루어지지 않습니다.',
      '실제 운영 환경을 가정한 서비스와는 일부 차이가 있을 수 있습니다.',
    ],
  },
  {
    title: '제5조 (서비스 변경 및 종료)',
    paragraphs: [
      '본 서비스는 프로젝트 진행 상황에 따라 일부 기능이 변경되거나 종료될 수 있습니다.',
    ],
  },
  {
    title: '제6조 (약관의 효력)',
    paragraphs: ['본 약관은 서비스 화면에 게시함으로써 효력이 발생합니다.'],
  },
];

/* styles */
const sectionClass = 'p-4';
const sectionTitleProps = { as: 'h3', size: '18' } as const;
const bodyTextClass = 'mt-8 body-16';
const listClass = 'mt-8 flex list-disc flex-col gap-4 pl-16';
const listItemClass = 'pl-4';
const dividerClass = 'mt-40 text-gray-100';

/* data */
const TEAM_MEMBERS = [
  { name: '강지현', github: 'https://github.com/Jihyun0522' },
  { name: '이아름', github: 'https://github.com/aahreum' },
  { name: '조대원', github: 'https://github.com/looks32' },
  { name: '최우석', github: 'https://github.com/chldntjr1321' },
];

// export const metadata: Metadata = {
//   title: '이용약관',
// };

export default function Terms() {
  return (
    <div className='flex flex-col gap-40'>
      <Title>GlobalNomad 서비스 이용약관</Title>

      <p className='-mt-20 rounded-12 bg-gray-25 p-24 font-medium text-gray-600'>
        이 서비스는 실제 운영 서비스가 아닌 학습용 프로젝트입니다.
        <br />본 페이지는 학습 목적의 팀 프로젝트로 제작된 서비스에 대한 안내용 이용약관입니다.
      </p>

      {TERMS_CONTENT.map((section, index) => (
        <div key={section.title}>
          <section className={sectionClass}>
            <Title {...sectionTitleProps}>{section.title}</Title>

            {section.paragraphs.map((text) => (
              <p key={text} className={bodyTextClass}>
                {text}
              </p>
            ))}

            {'list' in section && section.list && (
              <ul className={listClass}>
                {section.list.map((item) => (
                  <li key={item} className={listItemClass}>
                    {item}
                  </li>
                ))}
              </ul>
            )}

            {'type' in section && section.type === 'team' && (
              <ul className={listClass}>
                {TEAM_MEMBERS.map((member) => (
                  <li key={member.github} className={listItemClass}>
                    <span className='font-medium'>{member.name}</span>
                    <Link
                      href={member.github}
                      target='_blank'
                      className='pl-8 font-medium text-primary-500 underline transition-colors duration-500 hover:text-primary-600'>
                      GitHub
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {index < TERMS_CONTENT.length - 1 && <hr className={dividerClass} />}
        </div>
      ))}

      <span className='body-14 font-semibold text-gray-500'>© 2026 Sprint 19기 1팀</span>

      <AuthBackButton />
    </div>
  );
}
