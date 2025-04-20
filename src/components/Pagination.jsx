import React from 'react'

function Pagination({ pageNumber, NextFn, PrevFn }) {
  return (
    <div className="flex gap-4 items-center">
      <button
        onClick={PrevFn}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-all duration-300 shadow-md"
      >
        ⬅️ Prev
      </button>

      <span className="text-white font-semibold text-xl">{pageNumber}</span>

      <button
        onClick={NextFn}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-all duration-300 shadow-md"
      >
        Next ➡️
      </button>
    </div>
  );
}

export default Pagination;
