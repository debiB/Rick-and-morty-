import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Character, CharacterResponse } from '../types/Character';
import { Location, LocationResponse } from '../types/Location';

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

// Create the API service
export const rickAndMortyApi = createApi({
  reducerPath: 'rickAndMortyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://rickandmortyapi.com/api' }),
  endpoints: (builder) => ({
    getLocationByName: builder.query<LocationResponse, string>({
      query: (name) => `/location/?name=${name}`,
    }),
    getCharactersByIds: builder.query<Character[], number[]>({
      query: (ids) => `/character/${ids.join(',')}`,
      // Transform the response to handle both single character and array responses
      transformResponse: (response: Character | Character[]) => {
        return Array.isArray(response) ? response : [response];
      },
    }),
  }),
});

// Generate a fun fact about a character using Gemini API
export async function generateFunFact(character: Character): Promise<string> {
  try {
    // Use gemini-1.0-pro instead of gemini-pro
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-pro' });
    
    const prompt = `Write a short, interesting one-sentence fun fact about Rick and Morty character ${character.name}, who is a ${character.species} and has a status of ${character.status}.
`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error generating fun fact:', error);
    return `Fun fact: ${character.name} is too cool for AI-generated facts right now.`;
  }
}

// Export hooks
export const {
  useGetLocationByNameQuery,
  useGetCharactersByIdsQuery,
} = rickAndMortyApi;