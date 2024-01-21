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
    const makeBookButton = {
        _id: 'makeBookButton',
        title: 'makeBookButton',
        userId: '',
        storyId: '',
    };
    const allBooks = [...data, makeBookButton];

    console.log(allBooks);
    const newBookShelves = [];
    for (let i = 0; i < allBooks.length; i += 6) {
        const shelfBooks = allBooks.slice(i, i + 6);

        if (shelfBooks.length < 6) {
            const placeholders = Array.from({ length: 6 - shelfBooks.length }, () => ({
                _id: '',
                title: '',
                userId: '',
                storyId: '',
            }));
            newBookShelves.push(shelfBooks.concat(placeholders));
        } else {
            newBookShelves.push(shelfBooks);
        }
    }

    console.log(newBookShelves);

    return newBookShelves;
}
