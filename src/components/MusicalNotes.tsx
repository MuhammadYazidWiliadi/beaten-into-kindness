
import React from 'react';
import { Music } from 'lucide-react';

interface MusicalNotesProps {
  isPlaying: boolean;
}

export const MusicalNotes: React.FC<MusicalNotesProps> = ({ isPlaying }) => {
  if (!isPlaying) return null;

  return (
    <div className="fixed top-6 right-6 z-40 pointer-events-none">
      <div className="relative">
        <Music className="w-6 h-6 text-starry-gold animate-musical-note" />
        <Music 
          className="w-4 h-4 text-starry-bright-gold absolute -top-2 -right-2 animate-musical-note" 
          style={{ animationDelay: '0.5s' }}
        />
        <Music 
          className="w-5 h-5 text-starry-gold absolute -bottom-3 -left-3 animate-musical-note" 
          style={{ animationDelay: '1s' }}
        />
      </div>
    </div>
  );
};
