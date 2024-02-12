'use client';
import BooksPage from '@/components/book/BooksPage';

const Page = ({ params }: { params: { userID: string } }) => {
  return (
    <div className="flex justify-center items-center p-8">
      <BooksPage userId={params.userID} />
    </div>
  );
};

export default Page;
