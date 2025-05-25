
import React, { useState, useEffect } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from './AppSidebar';
import { MusicPlayer } from './MusicPlayer';
import { MusicalNotes } from './MusicalNotes';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative overflow-hidden">
        {/* Van Gogh inspired background swirls */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="van-gogh-swirl absolute top-20 right-20 w-32 h-32"></div>
          <div className="van-gogh-swirl absolute bottom-32 left-16 w-24 h-24" style={{ animationDelay: '-5s' }}></div>
          <div className="van-gogh-swirl absolute top-1/2 left-1/3 w-16 h-16" style={{ animationDelay: '-10s' }}></div>
        </div>
        
        <AppSidebar />
        
        <main className="flex-1 relative">
          <div className="painterly-bg min-h-screen">
            {children}
          </div>
        </main>

        {/* Musical Notes Animation */}
        <MusicalNotes isPlaying={isPlaying} />
        
        {/* Floating Music Player */}
        <MusicPlayer onPlayStateChange={setIsPlaying} />
      </div>
    </SidebarProvider>
  );
};
