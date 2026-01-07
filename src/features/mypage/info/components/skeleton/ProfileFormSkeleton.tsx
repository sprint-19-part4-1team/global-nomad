import Skeleton from '@/shared/components/skeleton/Skeleton';

/**
 * ## ProfileFormSkeleton
 *
 * @description
 * - 마이페이지 내 정보 수정 폼에서 사용하는 스켈레톤 컴포넌트
 */
export default function ProfileFormSkeleton() {
  return (
    <div className='mt-24 sm:mt-32'>
      <div className='flex flex-col gap-24 sm:gap-32 md:flex-row'>
        <div className='flex flex-col'>
          {/* Label */}
          <Skeleton className='h-24 w-90 rounded-4' />
          {/* Profile Image */}
          <Skeleton className='mx-6 my-8 h-120 w-120 rounded-full' />
          {/* Button */}
          <Skeleton className='h-38 w-132 rounded-8' />
        </div>
        <div className='flex flex-1 flex-col gap-24'>
          {Array.from({ length: 2 }).map((_, idx) => (
            <div key={idx}>
              <Skeleton className='h-24 w-60 rounded-4' />
              <Skeleton className='mt-8 h-50 w-full rounded-16 sm:h-56' />
            </div>
          ))}
        </div>
      </div>
      <Skeleton className='mx-auto mt-24 h-48 w-160 rounded-16' />
    </div>
  );
}
