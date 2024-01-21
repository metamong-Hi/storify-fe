import { BooksData } from '@/types/books';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function GET(url: string): Promise<BooksData[]> {
    try {
        return (await fetch(url)).json();
    } catch (error: any) {
        return error.message;
    }
}

export async function getAllBooks() {
    const data = await GET(API_URL + '/api/books');
    console.log(data);

    const newBookShelves = [];
    for (let i = 0; i < data.length; i += 6) {
        const shelfBooks = data.slice(i, i + 6);
        while (shelfBooks.length < 6) {
            shelfBooks.push({
                _id: '',
                title: '',
                userId: '',
                storyId: '',
            });
        }
        newBookShelves.push(shelfBooks);
    }
    console.log(newBookShelves);

    return newBookShelves;
}
