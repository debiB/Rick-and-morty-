'use client';

import { useState, useEffect } from 'react';
import { useGetLocationByNameQuery, useGetCharactersByIdsQuery, generateFunFact } from '../lib/api';
import { Character } from '../types/Character';
import { Location } from '../types/Location';
import { SearchHistoryItem } from '../types/SearchHistory';
import SearchBar from '../components/SearchBar';
import CharacterList from '../components/CharacterList';
import CharacterCard from '../components/CharacterCard';
import Navbar from '../components/Navbar';
import LocationCacheStatus from '../components/LocationCacheStatus';
import { Card, CardContent } from '../components/ui/card';
import { locationCache } from '../lib/locationCache';

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [funFact, setFunFact] = useState('');
  const [isGeneratingFact, setIsGeneratingFact] = useState(false);
  const [characterHistory, setCharacterHistory] = useState<Character[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const [currentLocationName, setCurrentLocationName] = useState<string>('');
  const [cachedLocation, setCachedLocation] = useState<Location | null>(null);
  
  // Query for location data
  const { data: locationData, isLoading: isLocationLoading, error: locationError } = 
    useGetLocationByNameQuery(searchTerm, { skip: !searchTerm });
  
  // Get location name if available
  const locationName = locationData?.results?.[0]?.name || '';
  
  // Check if we have cached location for this search term
  useEffect(() => {
    if (searchTerm && locationCache.hasSearchTerm(searchTerm)) {
      // Use cached location
      const location = locationCache.getLocation(searchTerm);
      if (location) {
        setCachedLocation(location);
      }
    } else {
      // Reset cached location when searching for a new term
      setCachedLocation(null);
    }
  }, [searchTerm]);
  
  // Use either fetched location or cached location
  const activeLocation = locationData?.results?.[0] || cachedLocation;
  
  // Extract resident IDs from location data
  const residentIds = activeLocation?.residents.map(url => {
    const parts = url.split('/');
    return parseInt(parts[parts.length - 1]);
  }) || [];
  
  // Query for character data using the resident IDs
  const { data: characters, isLoading: isCharactersLoading } = 
    useGetCharactersByIdsQuery(residentIds, { 
      skip: residentIds.length === 0
    });
  
  // Handle search
  const handleSearch = (query: string) => {
    setSearchTerm(query);
    
    // Check if this search term is already in history to avoid duplicates
    const existingIndex = searchHistory.findIndex(item => item.searchTerm.toLowerCase() === query.toLowerCase());
    
    if (existingIndex !== -1) {
      // Move the existing item to the top and update timestamp
      const updatedHistory = [...searchHistory];
      const item = updatedHistory.splice(existingIndex, 1)[0];
      item.timestamp = Date.now();
      updatedHistory.unshift(item);
      setSearchHistory(updatedHistory);
    }
    // New search terms will be added when location data is fetched
  };
  
  // Clear search history
  const handleClearHistory = () => {
    setSearchHistory([]);
  };
  
  // Generate fun fact and update cache when characters are loaded
  useEffect(() => {
    const generateFact = async () => {
      if (characters && characters.length > 0) {
        setIsGeneratingFact(true);
        try {
          const fact = await generateFunFact(characters[0]);
          setFunFact(fact);
        } catch (error) {
          console.error('Error generating fun fact:', error);
          setFunFact(`Fun fact: ${characters[0].name} is too mysterious for AI to generate facts about.`);
        } finally {
          setIsGeneratingFact(false);
        }
        
        // Update character history with new characters
        setCharacterHistory(prev => {
          const existingIds = new Set(prev.map(c => c.id));
          const newCharacters = characters.filter(c => !existingIds.has(c.id));
          return [...prev, ...newCharacters];
        });
        
        // Set current location name
        if (activeLocation) {
          setCurrentLocationName(activeLocation.name);
          
          // Store location in cache if it's newly fetched
          if (locationData?.results?.[0] && searchTerm && !locationCache.hasSearchTerm(searchTerm)) {
            locationCache.setLocation(searchTerm, locationData.results[0]);
            
            // Add to search history if it's a new search
            setSearchHistory(prev => {
              // Check if this search term already exists
              const existingIndex = prev.findIndex(item => 
                item.searchTerm.toLowerCase() === searchTerm.toLowerCase()
              );
              
              if (existingIndex !== -1) {
                // Update existing entry
                const updatedHistory = [...prev];
                updatedHistory[existingIndex] = {
                  searchTerm,
                  locationName: activeLocation.name,
                  timestamp: Date.now()
                };
                return updatedHistory;
              } else {
                // Add new entry at the beginning
                return [{
                  searchTerm,
                  locationName: activeLocation.name,
                  timestamp: Date.now()
                }, ...prev];
              }
            });
          }
        }
      }
    };
    
    generateFact();
  }, [characters, activeLocation, locationData, searchTerm]);
  
  const isLoading = isLocationLoading || isCharactersLoading;
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8 px-4">
      
      <div className={`flex flex-col items-center mb-8 ${characters && characters.length > 0 ? '' : 'h-[50vh] justify-center'}`}>
        <SearchBar 
          onSearch={handleSearch} 
          isLoading={isLoading} 
          searchHistory={searchHistory}
          onClearHistory={handleClearHistory}
        />
      </div>
      
      {characters && characters.length > 0 && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-2">Fun Fact</h2>
            {isGeneratingFact ? (
              <p className="italic text-gray-500">Fetching fun fact...</p>
            ) : (
              <p>{funFact}</p>
            )}
          </CardContent>
        </Card>
      )}
      
      {locationError && (
        <div className="text-center text-red-500 mb-8">
          <p>Error: Location not found. Try another search term.</p>
        </div>
      )}
      
      {characters && (
        <CharacterList 
          characters={characters} 
          locationName={currentLocationName} 
        />
      )}
      
      {characterHistory.length > 0 && !characters?.length && (
        <CharacterList characters={characterHistory} locationName="Search History" />
      )}
    </div>
    <LocationCacheStatus />
    </>
  );
}
