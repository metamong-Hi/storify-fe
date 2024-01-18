import Image from 'next/image';
import Header from '@/components/Header';
import ThreeScene from '@/components/ThreeScene';
import BookShelves from '@/components/book/BookShelves';
export default function Home() {
    return (
        <div className="flex flex-col h-screen">
            <BookShelves />
            {/* <ThreeScene /> */}
        </div>
    );
}
