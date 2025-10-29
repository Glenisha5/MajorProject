
import React, { useState } from 'react';
import { SearchIcon } from './icons/Icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl mx-auto">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g., 'backyard patio' or 'fix squeaky door'"
        className="w-full px-5 py-3 text-white bg-gray-800 border border-gray-700 rounded-l-full focus:ring-2 focus:ring-amber-500 focus:border-amber-500 focus:outline-none transition-all duration-300"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="px-6 py-3 bg-amber-500 text-gray-900 font-semibold rounded-r-full hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-amber-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
        disabled={isLoading}
      >
        <SearchIcon className="w-5 h-5" />
        <span className="sr-only">Search</span>
      </button>
    </form>
  );
};

export default SearchBar;
