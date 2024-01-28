import dynamic from 'next/dynamic';

const BooksPage = dynamic(() => import('../../components/book/BooksPage'), {
  ssr: false,
});

export default function Page() {
  return <BooksPage />;
}
