'use client';
import { useState, useEffect } from 'react';

const useSessionStorage = (find: string) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    let someValue = sessionStorage.getItem(find);
    setValue(someValue || '');
  }, [find]);

  return value;
};

export default useSessionStorage;
