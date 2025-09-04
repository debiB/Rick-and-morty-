'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import SearchHistoryDropdown from './SearchHistoryDropdown';
import { SearchHistoryItem } from '../types/SearchHistory';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  searchHistory: SearchHistoryItem[];
  onClearHistory: () => void;
}

export default function SearchBar({ onSearch, isLoading, searchHistory, onClearHistory }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      setIsDropdownVisible(false);
    }
  };

  const handleSelectHistory = (searchTerm: string) => {
    setQuery(searchTerm);
    onSearch(searchTerm);
    setIsDropdownVisible(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchBarRef} className="relative md:w-7/12 w-full">
      <form onSubmit={handleSubmit} className="flex gap-2 w-full">
        <Input
          type="text"
          placeholder="Enter a location name (e.g., Earth)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsDropdownVisible(true)}
          className="flex-1 text-lg p-6 rounded-full"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !query.trim()} className="text-lg p-6 rounded-full">
          {isLoading ? 'Searching...' : 'Search'}
        </Button>
      </form>
      
      <SearchHistoryDropdown
        searchHistory={searchHistory}
        onSelectHistory={handleSelectHistory}
        onClearHistory={onClearHistory}
        isVisible={isDropdownVisible && searchHistory.length > 0}
      />
    </div>
  );
}