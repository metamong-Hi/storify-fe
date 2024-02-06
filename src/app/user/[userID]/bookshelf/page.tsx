'use client';

import { getUserBooks } from '@/components/book/AllBooks';
import BooksPage from '@/components/book/BooksPage';

const Page = ({ params }: { params: { userID: string } }) => {
  const userId = params.userID;
  console.log('userId', userId);

  return (
    <div className="container flex justify-center items-center p-5">
      <BooksPage userId={userId} />
    </div>
  );
};

export default Page;
