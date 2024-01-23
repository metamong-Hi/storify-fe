export interface BooksData {
    title: string;
    _id: string;
    userId: string;
    storyId: string;
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
