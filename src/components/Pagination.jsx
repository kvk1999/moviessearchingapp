import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination flex justify-center items-center space-x-4 mt-5">
      <button onClick={handlePrevious} disabled={currentPage === 1} className="bg-blue-500 text-white px-4 py-2 rounded">
        Previous
      </button>
      <span className="text-white">Page {currentPage} of {totalPages}</span>
      <button onClick={handleNext} disabled={currentPage === totalPages} className="bg-blue-500 text-white px-4 py-2 rounded">
        Next
      </button>
    </div>
  );
};

export default Pagination;

