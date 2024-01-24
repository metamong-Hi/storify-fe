import React from 'react';

interface PaginationProps {
    currentPage: number;
    setPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, setPage }) => {
    return (
        <div className="flex mt-4 space-x-2">
            {currentPage > 1 && (
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out"
                    onClick={() => setPage(currentPage - 1)}
                >
                    Previous
                </button>
            )}
            <button
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out"
                onClick={() => setPage(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};
export default Pagination;
