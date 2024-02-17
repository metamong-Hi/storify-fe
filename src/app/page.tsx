import Home from '@/components/home/Home';
import Intro1 from '@/components/home/intro/Intro1';
import Intro3 from '@/components/home/intro/Intro3';
import Intro4 from '@/components/home/intro/Intro4';

export default function Page() {
  return (
    <div className="flex flex-col items-center ">
      <Home />
      <Intro1 />
      <Intro3 />
      <Intro4 />
    </div>
  );
}
