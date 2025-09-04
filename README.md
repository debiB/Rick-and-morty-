# Rick and Morty Explorer

A Next.js application that allows users to search for locations from the Rick and Morty universe and view characters from those locations. The app also generates fun facts about characters using the Gemini API.

## Features

- Search for locations by name
- View characters from a specific location
- Display character details (name, image, species, status)
- Generate fun facts about characters using Gemini AI
- Keep track of all characters searched so far (in memory)

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

## Models

### Character
Represents a character from the Rick and Morty universe with properties like name, status, species, image, etc.

### Location
Represents a location from the Rick and Morty universe with properties like name, type, dimension, and residents.

## AI Prompt

The application uses the following prompt to generate fun facts about characters:

```
Write a short, interesting one-sentence fun fact about Rick and Morty character ${character.name}, who is a ${character.species} and has a status of ${character.status}
```

## Limitations

Limited error handling for API failures: The application currently does not robustly handle errors that may occur during API calls. Improvements could include user-friendly error messages, retries, or fallback UI.

Basic UI design: The current interface is plain and minimal. Enhancements could include improved styling, layout adjustments, and visual feedback to create a more engaging user experience.


## Potential Improvements

- Add persistent storage for search history (localStorage or database)
- Add more detailed character information and filtering options
- Improve error handling and loading states
- Add unit and integration tests
- Add more AI-generated content options
