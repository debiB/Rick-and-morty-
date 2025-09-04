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
      className="absolute top-full left-0 right-0 mt-2 z-50 max-h-72 overflow-y-auto rounded-xl shadow-lg animate-in fade-in-0 zoom-in-95 duration-100"
    >
      <Card className="border border-primary/20 overflow-hidden bg-background/95 backdrop-blur-sm">
        <CardContent className="p-3">
          <div className="flex justify-between items-center mb-3 px-1 border-b border-primary/10 pb-2">
            <h3 className="text-sm font-medium flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              Recent Interdimensional Searches
            </h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClearHistory}
              className="h-7 px-2 text-xs hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Clear All
            </Button>
          </div>
          <div className="space-y-0.5">
            {searchHistory.map((item, index) => (
              <div 
                key={`${item.searchTerm}-${index}`}
                className="flex items-center justify-between px-3 py-2.5 hover:bg-primary/5 rounded-lg cursor-pointer transition-colors group"
                onClick={() => onSelectHistory(item.searchTerm)}
              >
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-6 rounded-full bg-secondary/30 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div>
                    <span className="font-medium group-hover:text-primary transition-colors">{item.searchTerm}</span>
                    <p className="text-xs text-muted-foreground">{item.locationName}</p>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
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