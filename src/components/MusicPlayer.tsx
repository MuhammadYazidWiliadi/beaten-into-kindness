import React, { useState, useEffect, useRef } from 'react';
import { Music, Play, Pause, SkipForward, SkipBack } from 'lucide-react';

interface Track {
  id: string;
  name: string;
  artist: string;
  audio_url: string;
}

interface MusicPlayerProps {
  onPlayStateChange?: (isPlaying: boolean) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ onPlayStateChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playlist: Track[] = [
    { id: '1', name: 'The Winner Takes It All', artist: 'ABBA', audio_url: '/music/music1.mp3' },
    { id: '2', name: 'Headlock', artist: 'Imogen Heap', audio_url: '/music/music2.mp3' },
    { id: '3', name: 'Mask Off', artist: 'Future', audio_url: '/music/music3.mp3' },
  ];

  const currentTrack = playlist[currentTrackIndex];

  // Auto set src when track changes
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = currentTrack.audio_url;
    if (isPlaying) {
      audioRef.current.play().catch(err => console.error(err));
    }
  }, [currentTrack]);

  // Auto play on load (once)
  useEffect(() => {
    const handleAutoPlay = () => {
      if (audioRef.current) {
        audioRef.current.src = currentTrack.audio_url;
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => console.warn('Auto-play blocked by browser:', err));
      }
    };

    handleAutoPlay();
  }, []); // only once on mount

  // Sync play/pause
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(err => console.error(err));
    } else {
      audioRef.current.pause();
    }
    onPlayStateChange?.(isPlaying);
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying(prev => !prev);
  const nextTrack = () => setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  const prevTrack = () => setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div 
        className={`glass-effect rounded-xl transition-all duration-300 ${
          isExpanded ? 'w-80 h-96' : 'w-16 h-16'
        }`}
      >
        <audio ref={audioRef} />
        {isExpanded ? (
          <div className="p-4 h-full flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-starry-gold font-playfair font-semibold">Now Playing</h3>
              <button 
                onClick={() => setIsExpanded(false)}
                className="text-slate-400 hover:text-starry-gold transition-colors"
              >
                ×
              </button>
            </div>

            <div className="mb-4">
              <h4 className="text-white font-medium truncate">{currentTrack.name}</h4>
              <p className="text-slate-400 text-sm truncate">{currentTrack.artist}</p>
            </div>

            <div className="flex items-center justify-center gap-4 mb-4">
              <button onClick={prevTrack} className="text-slate-400 hover:text-starry-gold transition-colors hover:scale-110">
                <SkipBack className="w-5 h-5" />
              </button>
              <button 
                onClick={togglePlay}
                className="bg-starry-gold hover:bg-starry-bright-gold text-starry-deep-blue p-3 rounded-full hover-glow transition-all"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </button>
              <button onClick={nextTrack} className="text-slate-400 hover:text-starry-gold transition-colors hover:scale-110">
                <SkipForward className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <h4 className="text-starry-gold font-medium mb-2 text-sm">Playlist</h4>
              <div className="space-y-2">
                {playlist.map((track, index) => (
                  <button
                    key={track.id}
                    onClick={() => setCurrentTrackIndex(index)}
                    className={`w-full text-left p-2 rounded-lg transition-colors ${
                      currentTrackIndex === index 
                        ? 'bg-starry-gold/20 text-starry-gold' 
                        : 'text-slate-300 hover:bg-starry-blue/20 hover:text-white'
                    }`}
                  >
                    <div className="text-sm font-medium truncate">{track.name}</div>
                    <div className="text-xs opacity-70 truncate">{track.artist}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <button 
            onClick={() => setIsExpanded(true)}
            className="w-full h-full flex items-center justify-center hover-glow transition-all"
          >
            <Music className="w-6 h-6 text-starry-gold animate-float" />
          </button>
        )}
      </div>
    </div>
  );
};
