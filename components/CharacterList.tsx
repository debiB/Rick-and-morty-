import { useState } from 'react';
import { Character } from '../types/Character';
import CharacterCard from './CharacterCard';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

interface CharacterListProps {
  characters: Character[];
  locationName: string;
}

export default function CharacterList({ characters, locationName }: CharacterListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 8;
  
  if (!characters.length) {
    return (
      <div className="text-center py-8">
        <p>No characters found for this location.</p>
      </div>
    );
  }
  
  // Calculate pagination values
  const totalPages = Math.ceil(characters.length / charactersPerPage);
  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);
  
  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  // Handle page changes
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Characters from {locationName}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentCharacters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                size="default"
              />
            </PaginationItem>
            
            {pageNumbers.map(number => {
              // Show first page, current page, last page, and one page before and after current
              if (
                number === 1 ||
                number === totalPages ||
                (number >= currentPage - 1 && number <= currentPage + 1)
              ) {
                return (
                  <PaginationItem key={number}>
                    <PaginationLink 
                      isActive={number === currentPage}
                      onClick={() => handlePageChange(number)}
                      size="default"
                    >
                      {number}
                    </PaginationLink>
                  </PaginationItem>
                );
              } else if (
                (number === 2 && currentPage > 3) ||
                (number === totalPages - 1 && currentPage < totalPages - 2)
              ) {
                return (
                  <PaginationItem key={number}>
                    <PaginationEllipsis />
                  </PaginationItem>
                );
              }
              return null;
            })}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                size="default"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}