import { Location } from '../types/Location';

// Define the cache interface
interface LocationCache {
  [searchTerm: string]: Location;
}

// Create a singleton cache instance
class LocationCacheManager {
  private static instance: LocationCacheManager;
  private cache: LocationCache = {};

  private constructor() {}

  public static getInstance(): LocationCacheManager {
    if (!LocationCacheManager.instance) {
      LocationCacheManager.instance = new LocationCacheManager();
    }
    return LocationCacheManager.instance;
  }

  /**
   * Get location for a specific search term from cache
   * @param searchTerm The search term used to find the location
   * @returns Location or undefined if not in cache
   */
  public getLocation(searchTerm: string): Location | undefined {
    return this.cache[searchTerm];
  }

  /**
   * Store location for a search term in cache
   * @param searchTerm The search term used to find the location
   * @param location Location to store
   */
  public setLocation(searchTerm: string, location: Location): void {
    this.cache[searchTerm] = location;
  }

  /**
   * Check if a search term exists in cache
   * @param searchTerm The search term
   * @returns Boolean indicating if search term is cached
   */
  public hasSearchTerm(searchTerm: string): boolean {
    return !!this.cache[searchTerm];
  }

  /**
   * Get all locations from cache
   * @returns Array of all locations
   */
  public getAllLocations(): Location[] {
    return Object.values(this.cache);
  }

  /**
   * Get all unique locations from cache (by ID)
   * @returns Array of unique locations
   */
  public getAllUniqueLocations(): Location[] {
    const allLocations = this.getAllLocations();
    const uniqueLocationsMap = new Map<number, Location>();
    
    allLocations.forEach(location => {
      if (!uniqueLocationsMap.has(location.id)) {
        uniqueLocationsMap.set(location.id, location);
      }
    });
    
    return Array.from(uniqueLocationsMap.values());
  }

  /**
   * Get all search terms in cache
   * @returns Array of search terms
   */
  public getAllSearchTerms(): string[] {
    return Object.keys(this.cache);
  }

  /**
   * Clear the entire cache
   */
  public clearCache(): void {
    this.cache = {};
  }
}

// Export a singleton instance
export const locationCache = LocationCacheManager.getInstance();