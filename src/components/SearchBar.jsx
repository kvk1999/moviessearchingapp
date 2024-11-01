import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [input, setInput] = useState('');
  const [year, setYear] = useState('');

  const handleSearch = () => {
    console.log('Search Input:', input);
    console.log('Year:', year);
    onSearch(input, year);
  };

  return (
    <div className="search-bar flex flex-col md:flex-row items-center justify-center gap-4">
      <input
        type="text"
        placeholder="Search by title or IMDb ID"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          console.log('Input changed:', e.target.value); // Debugging log
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }
        }}
        className="border rounded px-4 py-2"
      />
      <input
        type="text"
        placeholder="Year (optional)"
        value={year}
        onChange={(e) => {
          setYear(e.target.value);
          console.log('Year changed:', e.target.value); // Debugging log
        }}
        className="border rounded px-4 py-2"
      />
      <button onClick={handleSearch} className="bg-yellow-400 px-4 py-2 rounded text-black">
        Search
      </button>
    </div>
  );
};

export default SearchBar;
