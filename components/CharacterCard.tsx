import Image from 'next/image';
import { Character } from '../types/Character';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';

interface CharacterCardProps {
  character: Character;
}

export default function CharacterCard({ character }: CharacterCardProps) {
  // Status badge color
  const statusColor = {
    Alive: 'bg-green-500',
    Dead: 'bg-red-500',
    unknown: 'bg-gray-500',
  }[character.status] || 'bg-gray-500';

  return (
    <Card className="overflow-hidden w-full max-w-xs hover-scale border-2 border-primary/20 shadow-lg">
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent z-10"></div>
        <Image
          src={character.image}
          alt={character.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 300px"
          priority
          className="transition-transform duration-700 hover:scale-110"
        />
      </div>
      <CardHeader className="p-4 pb-2 bg-gradient-to-r from-primary/5 to-secondary/5">
        <CardTitle className="text-lg font-bold">{character.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-2">
        <div className="flex items-center gap-2 mb-2">
          <span className={`inline-block w-3 h-3 rounded-full ${statusColor} portal-glow`} />
          <span className="font-medium">{character.status}</span>
        </div>
        <p className="text-sm text-muted-foreground font-medium">{character.species}</p>
      </CardContent>
      <CardFooter className="p-4 pt-2 text-xs text-muted-foreground bg-gradient-to-r from-secondary/5 to-primary/5">
        <p className="flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Last known location: {character.location.name}
        </p>
      </CardFooter>
    </Card>
  );
}