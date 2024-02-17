import HomeDesign from '@/components/home/HomeDesign';
import Intro1 from '@/components/home/intro/Intro1';
import Intro3 from '@/components/home/intro/Intro2';
import Intro4 from '@/components/home/intro/Intro3';

export default function Page() {
  return (
    <div className="flex flex-col items-center ">
      <HomeDesign />
      <Intro1 />
      <Intro3 />
      <Intro4 />
    </div>
  );
}
