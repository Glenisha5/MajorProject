import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface DIYSearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const DIYSearchBar: React.FC<DIYSearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-2xl mx-auto gap-2">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g., 'backyard patio' or 'fix squeaky door'"
        className="flex-1"
        disabled={isLoading}
      />
      <Button
        type="submit"
        disabled={isLoading}
        className="gap-2"
      >
        <Search className="w-4 h-4" />
        Search
      </Button>
    </form>
  );
};

export default DIYSearchBar;
