interface bodyData {
  imagePrompt?: string;
  imageUrl?: string;
  ttsUrl?: string;
  text?: string;
  _id?: string;
}

interface userData {
  _id?: string;
  userId?: string;
}

export interface BooksData {
  title?: string;
  _id?: string;
  storyId?: string;
  coverUrl?: string;
  thumbnail?: string;
  isPrivate?: boolean;
  likes?: [];
  likesCount?: number;
  dislikes?: [];
  dislikesCount?: number;
  createdAt?: string;
  imageStyle?: string;
  status?: string;
  count: number;
  rate?: number;
  userId?: userData;
  body?: { [key: number]: bodyData };
}
