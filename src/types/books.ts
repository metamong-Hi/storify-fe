export interface BooksData {
    title: string;
    _id: string;
    storyId: string;
    coverUrl: string;
    createdAt: string;
    count: number;
    rate: number;
    userId: {
        _id: string;
        username: string;
    };
    body: {
        [key: number]: {
            imagePrompt: string;
            imageUrl: string;
            ttsUrl: string;
            text: string;
            _id: string;
        };
    }[];
}
