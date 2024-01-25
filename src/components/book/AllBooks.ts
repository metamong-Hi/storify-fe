import { BooksData } from '@/types/books';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface BooksResponse {
    total: number;
    books: BooksData[];
}

async function GET(url: string): Promise<BooksResponse> {
    try {
        return (await fetch(url)).json();
    } catch (error: any) {
        return error.message;
    }
}

export async function getAllBooks(page: number, limit: number) {
    const data = await GET(`${API_URL}/api/books?page=${page}&limit=${limit}`);
    return data;
}
