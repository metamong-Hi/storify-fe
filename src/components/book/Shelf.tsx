import React, { useEffect, useState, useRef, useCallback, RefObject } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import 'tailwindcss/tailwind.css';
import { BooksData } from '@/types/books';
import MakeBookButton from './MakeBookButton';

const Shelf: React.FC<BooksData> = (prop) => {
    console.log(prop);

    return <div className="flex justify-center items-center "></div>;
};

export default Shelf;
