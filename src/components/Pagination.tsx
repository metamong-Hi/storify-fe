'use client';

import React, { useMemo, useState } from 'react';

interface IProps {
  totalPage: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

function Pagination({ totalPage, paginate, currentPage }: IProps) {
  const pageNumbers = useMemo(() => {
    const numbers = [];
    for (let i = 1; i <= totalPage; i++) {
      numbers.push(i);
    }
    return numbers;
  }, [totalPage]);

  const visiblePageNumbers = useMemo(() => {
    let startPage = currentPage - 2 > 0 ? currentPage - 2 : 1;
    let endPage = startPage + 4 <= totalPage ? startPage + 4 : totalPage;

    while (endPage - startPage < 4 && endPage < totalPage) {
      startPage = startPage - 1 > 0 ? startPage - 1 : 1;
      endPage = startPage + 4 <= totalPage ? startPage + 4 : totalPage;
    }

    return pageNumbers.slice(startPage - 1, endPage);
  }, [currentPage, pageNumbers, totalPage]);

  return (
    <div className="flex justify-center items-center">
      <nav className="block">
        <ul className="flex join pl-0 rounded list-none flex-wrap sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row items-center">
          <li>
            <button
              onClick={() => paginate(1)}
              className={`btn first:ml-0 text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl join-item font-semibold flex w-full px-2 py-1 sm:px-4 sm:py-2 border-t border-b border-l rounded-l-lg ${
                currentPage === 1 ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              {'<<'}
            </button>
          </li>
          <li>
            <button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              className={`btn text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl join-item font-semibold flex w-full px-2 py-1 sm:px-4 sm:py-2 border-t border-b border-l  ${
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
                  className={`text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl join-item btn font-semibold flex w-full px-3 py-1 sm:px-4 sm:py-2 ${
                    currentPage === number ? 'btn-active' : ''
                  } `}
                >
                  {number}
                </button>
              </li>
            );
          })}
          <li>
            <button
              onClick={() => paginate(Math.min(totalPage, currentPage + 1))}
              className={`text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl join-item btn font-semibold flex w-full px-2 py-1 sm:px-4 sm:py-2 border-t border-b border-l  ${
                currentPage === totalPage ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              {'>'}
            </button>
          </li>
          <li>
            <button
              onClick={() => paginate(totalPage)}
              className={`last:mr-0 text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl join-item btn font-semibold flex w-full px-2 py-1 sm:px-4 sm:py-2 border-t border-b border-l border-r rounded-r-lg  ${
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
