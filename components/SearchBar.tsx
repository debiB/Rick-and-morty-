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
    <div ref={searchBarRef} className="relative md:w-7/12 w-full max-w-2xl mx-auto">
      <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-30 blur-sm"></div>
      <form onSubmit={handleSubmit} className="relative flex gap-2 w-full bg-background/80 backdrop-blur-sm rounded-full p-1 shadow-lg border border-primary/20">
        <div className="relative flex-1 flex items-center">
          <span className="absolute left-4 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
          </span>
          <Input
            type="text"
            placeholder="Search for a dimension or planet (e.g., Earth C-137)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsDropdownVisible(true)}
            className="flex-1 text-lg pl-12 pr-4 py-6 rounded-full border-none focus-visible:ring-primary/30 focus-visible:ring-offset-0"
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          disabled={isLoading || !query.trim()} 
          className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-all hover:shadow-md hover:shadow-primary/20"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching...
            </>
          ) : 'Search'}
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