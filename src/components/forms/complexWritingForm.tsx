'use client';
import React, { useState, useEffect } from 'react';
import MediumImageButton from '../buttons/mediumImageButton';
import Link from 'next/link';
// import { useRouter } from 'next/router';
interface ComplexWritingFormProps {
    destination: string;
    text: string;
    setText: React.Dispatch<React.SetStateAction<string>>;
    textAreaRef: React.RefObject<HTMLTextAreaElement>;
}
const ComplexWritingForm: React.FC<ComplexWritingFormProps> = ({
    text,
    setText,
    destination,
    textAreaRef,
}) => {
    const [accumulatedText, setAccumulatedText] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(event.target.value);
    };
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendPostRequest(accumulatedText + text);
    };
    let token: string | null;
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token');
    }
    const sendPostRequest = async (finalText: string) => {
        try {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/stories/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ message: finalText }),
            });
            if (response.ok) {
                console.log('Story submitted successfully');
            } else {
                console.error('Failed to submit story');
            }
        } catch (error) {
            console.error('Error submitting story:', error);
        }
    };
    return (
        <form className="w-full max-w-lg" onSubmit={handleSubmit}>
            <textarea
                ref={textAreaRef}
                id="story"
                name="story"
                rows={10}
                className="w-full bg-white text-gray-800 text-2xl border border-gray-300 rounded-lg shadow-sm p-2 leading-loose focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={text}
                onChange={handleChange}
                style={{
                    backgroundSize: '100% 2em',
                    backgroundImage:
                        'linear-gradient(to bottom, transparent 1.9em, #000 1.9em, #000 0.5em, transparent 2em )',
                }}
            />
            <div className="flex justify-end mt-4">
                {' '}
                {/* Flex container for right alignment */}
                <Link href={destination} passHref>
                    <MediumImageButton imageSrc="/Images/buttons/redArrow.png" alt="Submit" />
                </Link>
            </div>
        </form>
    );
};
export default ComplexWritingForm;
