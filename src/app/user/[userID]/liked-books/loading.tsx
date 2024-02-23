import { SearchIcon } from '@/icons/SearchIcon';
import BookSkeleton from '@/components/skeleton/BookSkeleton';
import PaginationSkeleton from '@/components/skeleton/PaginationSkeleton';
import React from 'react';

export default function Loading() {
  const sortOptions = [
    { label: '최신순', value: 'recent' },
    { label: '좋아요순', value: 'like' },
    { label: '조회순', value: 'count' },
  ];

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col w-full pl-[4vw] pr-[4vw]">
        <div className="flex flex-col sm:flex-row justify-between items-center w-full p-8 ">
          <div role="tablist" className="tabs tabs-bordered relative justify-start mb-4 sm:mb-0">
            {sortOptions.map((option) => (
              <a
                role="tab"
                key={option.value}
                className={`tab whitespace-nowrap text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl ${'recent' === option.value ? 'tab-active' : ''}`}
              >
                <span className="p-1">{option.label}</span>
              </a>
            ))}
          </div>
          <div
            className={`hidden flex justify-center text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl p-5`}
          ></div>

          <div className="relative justify-end">
            <div className="flex border-2 rounded-full">
              <input
                className="form-input w-full bg-transparent py-1 sm:py-2 px-3 text-xs sm:text-xs md:text-sm lg:text-md xl:text-lg 2xl:text-xl focus:outline-none"
                id="search"
                type="search"
                placeholder="검색어를 입력하세요."
              />
              <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 focus:outline-none">
                <SearchIcon size={30} />
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-1 md:gap-4 2xl:gap-8">
          <BookSkeleton cnt={24} />
        </div>

        <div className="mt-10">
          <div className="text-xs sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl ">
            <PaginationSkeleton />
          </div>
        </div>
      </div>
    </div>
  );
}
