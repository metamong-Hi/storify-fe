'use client';

import React from 'react';

import { EyeIcon } from '../../../public/icons/EyeIcon';
import { HeartIcon } from '../../../public/icons/HeartIcon';
interface Props {
  cnt: number;
}
const BookSkeleton = ({ cnt }: Props) => {
  return (
    <div className="flex justify-center flex-wrap gap-4 p-4 mx-auto">
      <div className="flex flex-wrap justify-center gap-7 ">
        {new Array(cnt).fill('').map((_, i) => (
          <div
            key={i}
            className="bg-opacity-10 skeleton backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-shadow hover:shadow-2xl"
          >
            <div className="object-center skeleton transition-transform duration-500 hover:scale-105 w-[280px] h-[280px]"></div>

            <div className="p-4 ">
              <div className="flex truncate justify-center text-align-center">
                <div className="flex justify-center text-sm sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl font-bold">
                  <div className="text-center w-[250px] skeleton"></div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 ">
                <div className="flex items-center rounded-4xl space-x-2 hover:bg-black/10 cursor-pointer">
                  <div className="w-8 h-8 skeleton rounded-full"></div>
                  <span className="w-12 h-4 skeleton"></span>
                </div>
                <div className="flex justify-end items-center mt-1">
                  <div className="flex items-center space-x-2">
                    <EyeIcon className="w-4 h-4 text-gray-500" />
                    <span className="w-6 h-4 skeleton"></span>
                  </div>
                  <div className="flex items-center  ml-2">
                    <button className={`btn btn-ghost btn-circle btn-sm  `}>
                      <HeartIcon height={20} width={20} className={``} />
                    </button>
                    <span className="w-6 h-4 skeleton"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSkeleton;
