import HomeDesign from '@/components/home/design';
import Intro1 from '@/components/home/intro/Intro1';

const HomePage = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <HomeDesign />
      <Intro1 />
    </div>
  );
};

export default HomePage;
