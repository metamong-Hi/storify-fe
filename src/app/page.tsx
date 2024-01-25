import Link from 'next/link';
export default function Home() {
  return (
    <main className="flex justify-center items-center">
      <div className="flex justify-center items-center">
        <Link href="/allbooks">AllBooks</Link>
      </div>
    </main>
  );
}
