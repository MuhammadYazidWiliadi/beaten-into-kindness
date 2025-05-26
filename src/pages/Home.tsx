
import React from 'react';
import { ChevronRight, Book } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <div className="container mx-auto px-6 pt-20 pb-12 relative z-10">
        <div className="text-center space-y-8 animate-fade-in-up">
          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-playfair font-bold textured-gold leading-tight">
              BEATEN
            </h1>
            <h2 className="text-4xl md:text-6xl font-playfair font-bold textured-gold">
              INTO
            </h2>
            <h3 className="text-6xl md:text-8xl font-playfair font-bold textured-gold">
              KINDNESS
            </h3>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-slate-300 font-merriweather max-w-2xl mx-auto leading-relaxed">
            A journey through darkness into light, where pain transforms into compassion and broken souls find their way to healing.
          </p>

          {/* Author */}
          <p className="text-lg text-starry-gold font-playfair font-semibold">
            by Yazid Wiliadi
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a
              href="https://www.wattpad.com/story/394999344-beaten-into-kindness"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-starry-deep-blue hover:bg-starry-deep-blue/90 text-starry-gold px-8 py-4 rounded-lg font-semibold text-lg hover-glow transition-all duration-300 flex items-center gap-2 group"
            >
              Read now
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link 
              to="/novel"
              className="bg-starry-gold hover:bg-starry-bright-gold text-starry-deep-blue px-8 py-4 rounded-lg font-semibold text-lg hover-glow transition-all duration-300 flex items-center gap-2 group"
            >
              <Book className="w-5 h-5" />
              Explore the Story
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/author"
              className="glass-effect border border-starry-gold/30 text-starry-gold px-8 py-4 rounded-lg font-semibold text-lg hover-glow transition-all duration-300 flex items-center gap-2 group"
            >
              Meet the Author
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Decorative Quote */}
        <div className="mt-20 text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <blockquote className="text-2xl md:text-3xl font-playfair italic text-slate-300 max-w-4xl mx-auto leading-relaxed">
            "Sometimes the greatest kindness comes from those who have known the deepest pain"
          </blockquote>
        </div>
      </div>

      {/* Background Art Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 w-2 h-2 bg-starry-gold rounded-full animate-float"></div>
        <div className="absolute top-1/3 right-20 w-3 h-3 bg-starry-bright-gold rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-starry-gold rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-starry-bright-gold rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </div>
  );
};
