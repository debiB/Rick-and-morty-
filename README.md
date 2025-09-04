# Rick and Morty Explorer

A Next.js application that allows users to search for locations from the Rick and Morty universe and view characters from those locations. The app also generates fun facts about characters using the Gemini API.

## Features

- Search for locations by name
- View characters from a specific location
- Display character details (name, image, species, status)
- Generate fun facts about characters using Gemini AI
- Keep track of all characters searched so far (in memory)

## Approach to the Problem

I approached this project with a focus on creating user-friendly interface that leverages modern web technologies while maintaining good performance. The key aspects of my approach were:

1. **API Integration**: Used RTK Query for efficient data fetching with automatic caching to minimize API calls to the Rick and Morty API.

2. **In-Memory Caching**: Implemented custom cache managers for both locations and characters to improve performance and reduce redundant API calls.

3. **Component-Based Architecture**: Built reusable UI components following the principles of atomic design to ensure maintainability and consistency.

4. **AI Integration**: Incorporated Gemini AI to enhance the user experience by generating dynamic content about characters.

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Library**: shadcn/ui components
- **State Management**: RTK Query for API calls
- **AI Integration**: Google Generative AI (Gemini)

## Project Structure

```
/types
  Character.ts - Character type definitions
  Location.ts - Location type definitions

/lib
  api.ts - RTK Query services for Rick and Morty API and Gemini API
  store.ts - Redux store configuration
  hooks.ts - Custom Redux hooks

/components
  SearchBar.tsx - Search input component
  CharacterCard.tsx - Character display card
  CharacterList.tsx - List of character cards
  Providers.tsx - Redux provider wrapper

/app
  page.tsx - Main application page
  layout.tsx - Root layout with providers
```

## Model/Structure

I chose a model structure that closely mirrors the Rick and Morty API data structure while adding custom caching layers:

### Data Models

#### Character
Represents a character from the Rick and Morty universe with properties like name, status, species, image, etc.

#### Location
Represents a location from the Rick and Morty universe with properties like name, type, dimension, and residents.

### Cache Structure

I implemented two singleton cache managers:

1. **LocationCacheManager**: Maps search terms to location results to avoid redundant API calls when users search for the same location multiple times.

2. **CharacterCacheManager**: Stores characters by location name, allowing quick access to previously fetched character data and tracking all unique characters encountered during the session.

## AI Prompt

The application uses the following prompt to generate fun facts about characters:

```
Write a short, interesting one-sentence fun fact about Rick and Morty character ${character.name}, who is a ${character.species} and has a status of ${character.status}
```

## What Works, What Doesn't, and Future Improvements

### What Works Well

- **Efficient API Integration**: RTK Query provides automatic caching and refetching strategies
- **In-Memory Caching**: Custom cache managers reduce API calls and improve performance
- **Responsive UI**: The application works well across different screen sizes
- **AI Integration**: Gemini API successfully generates interesting facts about characters

### Current Limitations

- **Limited Error Handling**: The application does not robustly handle API failures
- **Basic UI Design**: The interface is functional but could be more visually engaging
- **In-Memory Only**: All data is lost on page refresh as there's no persistent storage
- **No Testing**: Lacks unit and integration tests

### Future Improvements

- Add persistent storage for search history (localStorage or database)
- Add more detailed character information and filtering options
- Improve error handling with user-friendly messages and fallback UI
- Add comprehensive test coverage
- Enhance the UI with animations and more interactive elements
- Add more AI-generated content options and allow users to customize prompts
