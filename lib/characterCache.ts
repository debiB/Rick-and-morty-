import { Character } from '../types/Character';

// Define the cache interface
interface CharacterCache {
  [locationName: string]: Character[];
}

// Create a singleton cache instance
class CharacterCacheManager {
  private static instance: CharacterCacheManager;
  private cache: CharacterCache = {};

  private constructor() {}

  public static getInstance(): CharacterCacheManager {
    if (!CharacterCacheManager.instance) {
      CharacterCacheManager.instance = new CharacterCacheManager();
    }
    return CharacterCacheManager.instance;
  }

  /**
   * Get characters for a specific location from cache
   * @param locationName The name of the location
   * @returns Array of characters or undefined if not in cache
   */
  public getCharacters(locationName: string): Character[] | undefined {
    return this.cache[locationName];
  }

  /**
   * Store characters for a location in cache
   * @param locationName The name of the location
   * @param characters Array of characters to store
   */
  public setCharacters(locationName: string, characters: Character[]): void {
    this.cache[locationName] = characters;
  }

  /**
   * Check if a location exists in cache
   * @param locationName The name of the location
   * @returns Boolean indicating if location is cached
   */
  public hasLocation(locationName: string): boolean {
    return !!this.cache[locationName];
  }

  /**
   * Get all characters from all locations
   * @returns Array of all characters
   */
  public getAllCharacters(): Character[] {
    return Object.values(this.cache).flat();
  }

  /**
   * Get all unique characters from all locations
   * @returns Array of unique characters
   */
  public getAllUniqueCharacters(): Character[] {
    const allCharacters = this.getAllCharacters();
    const uniqueCharactersMap = new Map<number, Character>();
    
    allCharacters.forEach(character => {
      if (!uniqueCharactersMap.has(character.id)) {
        uniqueCharactersMap.set(character.id, character);
      }
    });
    
    return Array.from(uniqueCharactersMap.values());
  }

  /**
   * Clear the entire cache
   */
  public clearCache(): void {
    this.cache = {};
  }
}

// Export a singleton instance
export const characterCache = CharacterCacheManager.getInstance();