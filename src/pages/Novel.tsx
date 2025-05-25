
import React from 'react';
import { Heart, Star, BookOpen } from 'lucide-react';

export const Novel: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold textured-gold">
              About the Novel
            </h1>
            <div className="w-24 h-1 bg-starry-gold mx-auto rounded-full"></div>
          </div>

          {/* Synopsis */}
          <div className="glass-effect rounded-2xl p-8 md:p-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-starry-gold" />
              <h2 className="text-2xl font-playfair font-semibold text-starry-gold">Synopsis</h2>
            </div>
            
            <div className="space-y-6 text-slate-200 leading-relaxed">
              <p className="text-lg">
                In a world where cruelty often begets cruelty, "Beaten Into Kindness" tells the extraordinary story of souls who discover that their greatest wounds can become the source of their deepest compassion.
              </p>
              
              <p>
                Through interconnected tales of struggle and redemption, we follow characters who have endured unimaginable hardships yet choose to respond with grace. Each story reveals how pain, when met with courage and understanding, can transform not just the sufferer but all those around them.
              </p>
              
              <p>
                This is not a story about victims, but about victors—people who refuse to let their circumstances define their character. It's about the revolutionary power of choosing kindness in the face of cruelty, love in the presence of hate, and hope despite despair.
              </p>
              
              <p className="text-starry-gold font-medium italic">
                "Beaten Into Kindness" challenges readers to examine their own responses to adversity and consider how our greatest trials might become our most powerful tools for healing the world.
              </p>
            </div>
          </div>

          {/* Themes */}
          <div className="grid md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {[
              {
                icon: Heart,
                title: "Resilience",
                description: "The incredible strength of the human spirit to endure and overcome."
              },
              {
                icon: Star,
                title: "Transformation",
                description: "How pain can become the catalyst for profound personal growth."
              },
              {
                icon: BookOpen,
                title: "Compassion",
                description: "The choice to respond to cruelty with kindness and understanding."
              }
            ].map((theme, index) => (
              <div key={theme.title} className="glass-effect rounded-xl p-6 hover-glow transition-all duration-300">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-starry-gold/20 rounded-full">
                    <theme.icon className="w-6 h-6 text-starry-gold" />
                  </div>
                  <h3 className="text-xl font-playfair font-semibold text-starry-gold">{theme.title}</h3>
                  <p className="text-slate-300">{theme.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Reading Experience */}
          <div className="glass-effect rounded-2xl p-8 md:p-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-2xl font-playfair font-semibold text-starry-gold mb-6">A Transformative Reading Experience</h2>
            <div className="space-y-4 text-slate-200">
              <p>
                This novel doesn't shy away from difficult truths, but it never wallows in darkness. Instead, it illuminates the path from suffering to wisdom, from bitterness to peace.
              </p>
              <p>
                Written with the belief that literature should not only entertain but also elevate, "Beaten Into Kindness" offers readers both an emotional journey and practical insights into the nature of forgiveness, resilience, and human connection.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
