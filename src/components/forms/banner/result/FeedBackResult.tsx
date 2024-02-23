import React from 'react';
import Link from 'next/link';
import Title from '../../writing/Title';

const FeedBackResult: React.FC = () => {
  return (
    <div className="w-[90vw] sm:w-[85vw] md:w-[80vw] lg:w-[75vw] xl:w-[70vw]">
      <Title line1="소중한 의견 감사드립니다." line2="더 나은 StORIFY로 보답하겠습니다." />
      <div className="divider"></div>
      <Link href="/" passHref>
        <button className="btn btn-outline xl:btn-lg btn-success font-bold border-2">
          홈으로 가기
        </button>
      </Link>
    </div>
  );
};
export default FeedBackResult;