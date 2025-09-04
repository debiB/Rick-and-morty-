import { characterCache } from '../lib/characterCache';
import { useState, useEffect } from 'react';
import { Character } from '../types/Character';

// Define a type for the cache structure
type CacheType = {
  [locationName: string]: Character[];
};

export default function CacheStatus() {
  const [cacheEntries, setCacheEntries] = useState<{location: string, count: number}[]>([]);
  const [expanded, setExpanded] = useState(false);

  // Update cache status every second
  useEffect(() => {
    const updateCacheStatus = () => {
      // Access the private cache through a hack (for debugging only)
      const cache = (characterCache as unknown as { cache: CacheType }).cache;
      if (cache) {
        const entries = Object.entries(cache).map(([location, characters]) => ({
          location,
          count: (characters as Character[]).length
        }));
        setCacheEntries(entries);
      }
    };

    // Initial update
    updateCacheStatus();
    
    // Set interval for updates
    const interval = setInterval(updateCacheStatus, 1000);
    
    // Clean up
    return () => clearInterval(interval);
  }, []);

  if (cacheEntries.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg shadow-lg z-50 max-w-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold">Cache Status</h3>
        <button 
          onClick={() => setExpanded(!expanded)}
          className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded"
        >
          {expanded ? 'Hide' : 'Show'}
        </button>
      </div>
      
      {expanded && (
        <div className="text-xs space-y-1">
          {cacheEntries.map((entry, index) => (
            <div key={index} className="flex justify-between">
              <span className="truncate mr-2">{entry.location}:</span>
              <span className="font-mono">{entry.count} characters</span>
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-gray-700">
            <span className="font-mono">
              Total unique: {characterCache.getAllUniqueCharacters().length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}