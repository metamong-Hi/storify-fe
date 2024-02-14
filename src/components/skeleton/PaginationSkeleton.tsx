'use client';

import React from 'react';

const PaginationSkeleton = () => {
  const number = 3;

  return (
    <div className="flex justify-center items-center p-10 ">
      <div className="mt-10 ">
        <div className="flex justify-center items-center">
          <div className="block">
            <ul className="flex join pl-0 rounded list-none flex-wrap sm:flex-row md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
              <li>
                <div
                  className={`text-xs join-item btn font-semibold flex w-full p-4 border-t border-b border-l`}
                >
                  {'<<'}
                </div>
              </li>
              <li>
                <div
                  className={`last:mr-0 text-xs join-item btn font-semibold flex w-full p-4 border-t border-b border-l border-r rounded-r-lg`}
                >
                  {'<'}
                </div>
              </li>
              {new Array(number).fill('').map((_, i) => {
                return (
                  <li key={i}>
                    <div
                      className={`text-xs join-item btn font-semibold flex w-full p-4 skeleton `}
                    ></div>
                  </li>
                );
              })}
              <li>
                <div
                  className={`text-xs join-item btn font-semibold flex w-full p-4 border-t border-b border-l`}
                >
                  {'>'}
                </div>
              </li>
              <li>
                <div
                  className={`last:mr-0 text-xs join-item btn font-semibold flex w-full p-4 border-t border-b border-l border-r rounded-r-lg`}
                >
                  {'>>'}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaginationSkeleton;
