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
    <Card className="overflow-hidden w-full max-w-xs">
      <div className="relative h-48 w-full">
        <Image
          src={character.image}
          alt={character.name}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 300px"
          priority
        />
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-lg">{character.name}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-2">
        <div className="flex items-center gap-2 mb-2">
          <span className={`inline-block w-3 h-3 rounded-full ${statusColor}`} />
          <span>{character.status}</span>
        </div>
        <p className="text-sm text-muted-foreground">{character.species}</p>
      </CardContent>
      <CardFooter className="p-4 pt-2 text-xs text-muted-foreground">
        <p>Last known location: {character.location.name}</p>
      </CardFooter>
    </Card>
  );
}