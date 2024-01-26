interface bodyData {
    imagePrompt: string;
    imageUrl: string;
    ttsUrl: string;
    text: string;
    _id: string;
}

interface userData {
    _id: string;
    username: string;
}

export interface BooksData {
    title: string;
    _id: string;
    storyId: string;
    coverUrl: string;
    createdAt: string;
    count: number;
    rate: number;
    userId: userData;
    body: { [key: number]: bodyData };
}
