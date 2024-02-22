import { BooksData } from '@/types/books';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface BooksResponse {
  total: number;
  books: BooksData[];
}

export interface GetParams {
  page: number;
  limit: number;
  sort: string;
  search: string;
}

async function GET(url: string): Promise<BooksResponse> {
  try {
    return (await fetch(url, { cache: 'no-store' })).json();
  } catch (error: any) {
    return error.message;
  }
}

export async function getUserLikedBooks() {
  if (typeof window === 'undefined') throw new Error('No token found');
  const token = sessionStorage.getItem('token');
  try {
    const response = await fetch(`${API_URL}/books/likes`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}`, Cache: 'no-store' },
    });
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error.message;
  }
}

export async function getAllBooks(page = 1, limit = 24, sort = '', search = '', id = '') {
  const data = await GET(
    `${API_URL}/books?page=${page}&limit=${limit}&title=${search}&sort=${sort}&userId=${id}`,
  );
  return data;
}

export async function getBooks(page = 1, limit = 24, sort = '', search = '', id = '', type = '') {
  if (type === 'liked') {
    const data = await getUserLikedBooks();

    return data;
  } else {
    return getAllBooks(page, limit, sort, search, id);
  }
}
