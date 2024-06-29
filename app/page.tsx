import Greeting from '@/components/greeting/greeting';

export default function Home() {
  return (
    <div className="flex h-full w-full items-center justify-center pb-64 pt-12 md:pb-28 md:pt-0">
      <Greeting />
    </div>
  );
}
