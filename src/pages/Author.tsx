
import React from 'react';
import { User, Heart, BookOpen } from 'lucide-react';

export const Author: React.FC = () => {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold textured-gold">
              About the Author
            </h1>
            <div className="w-24 h-1 bg-starry-gold mx-auto rounded-full"></div>
          </div>

          {/* Author Profile */}
          <div className="glass-effect rounded-2xl p-8 md:p-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Author Portrait */}
              <div className="text-center">
                <div className="w-48 h-48 mx-auto bg-starry-gold/20 rounded-full flex items-center justify-center border-2 border-starry-gold/30 hover-glow transition-all duration-300">
                  <User className="w-24 h-24 text-starry-gold" />
                </div>
                <h2 className="text-2xl font-playfair font-bold text-starry-gold mt-4">
                  Yazid Wiliadi
                </h2>
                <p className="text-slate-400 italic">Author & Storyteller</p>
              </div>

              {/* Bio */}
              <div className="md:col-span-2 space-y-4">
                <h3 className="text-xl font-playfair font-semibold text-starry-gold">Biography</h3>
                <div className="space-y-4 text-slate-200 leading-relaxed">
                  <p>
                    Yazid Wiliadi is a passionate storyteller who believes in the transformative power of literature. Drawing from a deep well of human experience and observation, Yazid crafts narratives that challenge readers to look beyond surface appearances and discover the profound truths that lie beneath.
                  </p>
                  <p>
                    With a background that spans diverse cultures and communities, Yazid brings a unique perspective to contemporary fiction. Their writing is characterized by its emotional depth, psychological insight, and unwavering belief in the human capacity for growth and redemption.
                  </p>
                  <p className="text-starry-gold italic">
                    "I write because I believe that stories have the power to heal, to transform, and to remind us of our shared humanity."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Writing Philosophy */}
          <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="glass-effect rounded-xl p-6 hover-glow transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <Heart className="w-6 h-6 text-starry-gold" />
                <h3 className="text-xl font-playfair font-semibold text-starry-gold">Writing Philosophy</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Every story should serve a purpose beyond entertainment. Literature has the responsibility to illuminate truth, foster empathy, and inspire positive change in both individuals and society.
              </p>
            </div>

            <div className="glass-effect rounded-xl p-6 hover-glow transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-6 h-6 text-starry-gold" />
                <h3 className="text-xl font-playfair font-semibold text-starry-gold">Literary Approach</h3>
              </div>
              <p className="text-slate-300 leading-relaxed">
                Combining psychological realism with emotional authenticity, creating characters that feel genuine and situations that resonate with universal human experiences.
              </p>
            </div>
          </div>

          {/* Inspiration */}
          <div className="glass-effect rounded-2xl p-8 md:p-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <h2 className="text-2xl font-playfair font-semibold text-starry-gold mb-6">What Inspired "Beaten Into Kindness"</h2>
            <div className="space-y-4 text-slate-200 leading-relaxed">
              <p>
                The inspiration for this novel came from observing the remarkable resilience of individuals who have faced tremendous adversity yet emerged with their capacity for love and kindness not only intact but strengthened.
              </p>
              <p>
                In a world that often seems divided by anger and fear, I wanted to explore the radical possibility that our deepest wounds might actually become our greatest sources of wisdom and compassion—if we choose to let them.
              </p>
              <blockquote className="border-l-4 border-starry-gold pl-6 italic text-lg text-starry-gold">
                "This Novel is for everyone who has ever wondered if their pain serves a purpose, and for those who dare to believe that kindness is not weakness, but the highest form of strength."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
