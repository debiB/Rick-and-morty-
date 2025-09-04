'use client';

import { useState, useEffect, useRef } from 'react';
import { SearchHistoryItem } from '../types/SearchHistory';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Clock, X } from 'lucide-react';

interface SearchHistoryDropdownProps {
  searchHistory: SearchHistoryItem[];
  onSelectHistory: (searchTerm: string) => void;
  onClearHistory: () => void;
  isVisible: boolean;
}

export default function SearchHistoryDropdown({
  searchHistory,
  onSelectHistory,
  onClearHistory,
  isVisible
}: SearchHistoryDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Format the timestamp to a readable format
  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isVisible || searchHistory.length === 0) {
    return null;
  }

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-full left-0 right-0 mt-1 z-50 max-h-60 overflow-y-auto rounded-md shadow-lg"
    >
      <Card>
        <CardContent className="p-2">
          <div className="flex justify-between items-center mb-2 px-2">
            <h3 className="text-sm font-medium">Recent Searches</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearHistory}
              className="h-8 px-2 text-xs"
            >
              Clear All
            </Button>
          </div>
          <div className="space-y-1">
            {searchHistory.map((item, index) => (
              <div 
                key={`${item.searchTerm}-${index}`}
                className="flex items-center justify-between px-3 py-2 hover:bg-accent rounded-md cursor-pointer"
                onClick={() => onSelectHistory(item.searchTerm)}
              >
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{item.searchTerm}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatTime(item.timestamp)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}