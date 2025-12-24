import Button from '@/shared/components/button/Button';

export default function Home() {
  return (
    <div>
      메인페이지!(dev)
      <div className='mt-20 flex flex-col gap-20 p-16'>
        <Button disabled={true}>야호호</Button>
        <Button>야호호</Button>
        <Button full={true}>야호호</Button>
        <Button theme='secondary' size='md'>
          야호호
        </Button>
        <Button theme='negative' size='sm'>
          야호호
        </Button>
      </div>
    </div>
  );
}
