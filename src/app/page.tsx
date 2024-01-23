import Image from 'next/image';
import Header from '@/components/Header';
import BookShelves from '@/components/book/BookShelves';
export default function Home() {
    return (
        <main
            className="flex justify-center items-center bg-no-repeat"
            style={{
                backgroundImage: 'url("images/backGround/brickBackground.jpg")',
                backgroundSize: 'fill',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'bottom',
            }}
        >
            <div className="flex justify-center items-center">
                <BookShelves />
            </div>
        </main>
    );
}
