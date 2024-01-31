'use client';

import Link from 'next/link';

import React, { useMemo, useState, useRef } from 'react';

interface IProps {
  totalPage: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

function Pagination({ totalPage, paginate, currentPage }: IProps) {
  const pageNumbers: number[] = [];
  const maxPageNum = totalPage;

  for (let i = 1; i <= maxPageNum; i++) {
    pageNumbers.push(i);
  }

  const updatePageNumbers = (page: number) => {
    let startPage = page - 3 > 1 ? page - 3 : 1;
    let endPage = startPage + 5 > maxPageNum ? maxPageNum : startPage + 5;

    while (endPage - startPage < 5 && startPage > 1) {
      startPage--;
    }

    return pageNumbers.slice(startPage - 1, endPage);
  };

  const [, setCurrentNumbers] = useState(updatePageNumbers(1));

  const visiblePageNumbers = updatePageNumbers(currentPage);

  const handleClick = (number: number) => {
    setCurrentNumbers(updatePageNumbers(number));
    paginate(number);
  };

  return (
    <div className="flex justify-center items-center">
      <nav className="block">
        <ul className="flex pl-0 rounded list-none flex-wrap">
          <li>
            <button
              onClick={() => paginate(1)}
              className={`first:ml-0 text-xs font-semibold flex w-full p-4 border-t border-b border-l rounded-l-lg border-gray-200 bg-white text-gray-800 ${
                currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              {'<<'}
            </button>
          </li>
          <li>
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              className={`text-xs font-semibold flex w-full p-4 border-t border-b border-l border-gray-200 bg-white text-gray-800 ${
                currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              {'<'}
            </button>
          </li>
          {visiblePageNumbers.map((number) => {
            return (
              <li key={number}>
                <button
                  onClick={() => handleClick(number)}
                  className={`text-xs font-semibold flex w-full p-4 border-t border-b border-l border-gray-200 bg-white text-gray-800 ${
                    currentPage === number ? 'bg-gray-300' : ''
                  }`}
                >
                  {number}
                </button>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => paginate(Math.min(maxPageNum, currentPage + 1))}
              className={`text-xs font-semibold flex w-full p-4 border-t border-b border-l border-gray-200 bg-white text-gray-800 ${
                currentPage === maxPageNum ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              {'>'}
            </button>
          </li>
          <li>
            <button
              onClick={() => paginate(maxPageNum)}
              className={`last:mr-0 text-xs font-semibold flex w-full p-4 border-t border-b border-l border-r rounded-r-lg border-gray-200 bg-white text-gray-800 ${
                currentPage === maxPageNum ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              {'>>'}
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Pagination;
