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
import { Zap } from 'lucide-react';

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
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-primary">
        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
          <Zap className="h-5 w-5 text-primary" />
        </div>
        Characters from <span className="text-secondary font-extrabold">{locationName}</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-in fade-in-50 duration-500">
        {currentCharacters.map((character, index) => (
          <div 
            key={character.id} 
            className="animate-in fade-in-0 slide-in-from-bottom-3 duration-300"
            style={{ animationDelay: `${index * 75}ms` }}
          >
            <CharacterCard character={character} />
          </div>
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination className="mt-10">
          <PaginationContent className="bg-background/80 backdrop-blur-sm py-2 px-4 rounded-full border border-primary/10 shadow-md">
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                size="default"
                className="hover:text-primary hover:bg-primary/5 transition-colors"
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
                      className={`${number === currentPage ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-primary/10 hover:text-primary'} transition-colors font-medium`}
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
                className="hover:text-primary hover:bg-primary/5 transition-colors"
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}