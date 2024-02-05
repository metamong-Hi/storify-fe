'use client';

import React, { useMemo, useState } from 'react';

interface IProps {
  totalPage: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

function Pagination({ totalPage, paginate, currentPage }: IProps) {
  // useMemo should return the array of page numbers, and it needs to depend on maxPageNum
  const pageNumbers = useMemo(() => {
    const numbers = [];
    for (let i = 1; i <= totalPage; i++) {
      numbers.push(i);
    }
    return numbers;
  }, [totalPage]); // Depend on totalPage, as it's the source of truth for maxPageNum

  // visiblePageNumbers should depend on currentPage and pageNumbers
  const visiblePageNumbers = useMemo(() => {
    let startPage = currentPage - 2 > 0 ? currentPage - 2 : 1;
    let endPage = startPage + 4 <= totalPage ? startPage + 4 : totalPage;

    while (endPage - startPage < 4 && endPage < totalPage) {
      startPage = startPage - 1 > 0 ? startPage - 1 : 1;
      endPage = startPage + 4 <= totalPage ? startPage + 4 : totalPage;
    }

    return pageNumbers.slice(startPage - 1, endPage);
  }, [currentPage, pageNumbers, totalPage]);

  console.log(currentPage);

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
          {visiblePageNumbers.map((number: number) => {
            return (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`text-xs font-semibold flex w-full p-4 border-t border-b border-l border-gray-200 ${
                    currentPage === number ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
                  }`}
                >
                  {number}
                </button>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => paginate(Math.min(totalPage, currentPage + 1))}
              className={`text-xs font-semibold flex w-full p-4 border-t border-b border-l border-gray-200 bg-white text-gray-800 ${
                currentPage === totalPage ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              {'>'}
            </button>
          </li>
          <li>
            <button
              onClick={() => paginate(totalPage)}
              className={`last:mr-0 text-xs font-semibold flex w-full p-4 border-t border-b border-l border-r rounded-r-lg border-gray-200 bg-white text-gray-800 ${
                currentPage === totalPage ? 'cursor-not-allowed opacity-50' : ''
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
