
import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, Star, Send, ThumbsUp, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { User, Lock, MessageCircle, Save, Camera, Edit } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { AuthModal } from '@/components/AuthModal';
import { UserMenu } from '@/components/UserMenu';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Review {
  id: string;
  content: string;
  rating: number;
  likes: number;
  created_at: string;
  profiles: {
    username: string;
    full_name: string;
    avatar_url: string;
  };
  review_likes: Array<{ user_id: string }>;
}

export const Reviews: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch user profile
  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setUserProfile(data);
      };
      fetchProfile();
    } else {
      setUserProfile(null);
    }
  }, [user]);

  // Fetch reviews
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles (username, full_name, avatar_url),
          review_likes (user_id)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Review[];
    }
  });

  // Submit review mutation
  const submitReviewMutation = useMutation({
    mutationFn: async () => {
      if (!user || !newReview.trim()) return;
      
      const { error } = await supabase
        .from('reviews')
        .insert({
          user_id: user.id,
          content: newReview,
          rating: newRating
        });
      
      if (error) throw error;
    },
    onSuccess: () => {
      setNewReview('');
      setNewRating(5);
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast({
        title: "Success!",
        description: "Your review has been posted.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Toggle like mutation
  const toggleLikeMutation = useMutation({
    mutationFn: async (reviewId: string) => {
      if (!user) return;

      const existingLike = await supabase
        .from('review_likes')
        .select()
        .eq('user_id', user.id)
        .eq('review_id', reviewId)
        .single();

      if (existingLike.data) {
        // Remove like
        await supabase
          .from('review_likes')
          .delete()
          .eq('user_id', user.id)
          .eq('review_id', reviewId);
      } else {
        // Add like
        await supabase
          .from('review_likes')
          .insert({
            user_id: user.id,
            review_id: reviewId
          });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    }
  });

  const handleSubmitReview = () => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    submitReviewMutation.mutate();
  };

  const handleLike = (reviewId: string) => {
    if (!user) {
      setShowAuthModal(true);
      return;
    }
    toggleLikeMutation.mutate(reviewId);
  };

  const handleJoinWhatsApp = () => {
    window.open('https://whatsapp.com/channel/0029VbAlEdC1Xquco8pVBD0Z', '_blank');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-starry-gold fill-current' : 'text-slate-400'}`}
      />
    ));
  };

  const hasUserLiked = (review: Review) => {
    return user && review.review_likes.some(like => like.user_id === user.id);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-starry-gold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Header */}
          <div className="text-center space-y-6 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold textured-gold">
              Reader Reviews
            </h1>
            <div className="w-24 h-1 bg-starry-gold mx-auto rounded-full"></div>
            <p className="text-xl text-slate-300">
              Share your thoughts and connect with fellow readers
            </p>
            
            {/* Auth Status */}
            <div className="flex justify-center">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-slate-300">Welcome back, {userProfile?.username || userProfile?.full_name}!</span>
                  <UserMenu profile={userProfile} />
                </div>
              ) : (
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  className="bg-starry-gold hover:bg-starry-bright-gold text-starry-deep-blue hover-glow"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In to Review
                </Button>
              )}
            </div>
          </div>

          {/* Write Review */}
          {user && (
            <Card className="glass-effect border-starry-gold/30 p-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-6 h-6 text-starry-gold" />
                  <h2 className="text-xl font-playfair font-semibold text-starry-gold">
                    Write Your Review
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-300">Rating:</span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setNewRating(i + 1)}
                        className="hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            i < newRating ? 'text-starry-gold fill-current' : 'text-slate-400'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={newReview}
                  onChange={(e) => setNewReview(e.target.value)}
                  placeholder="Share your thoughts about the novel..."
                  className="w-full h-32 bg-starry-night/50 border border-starry-gold/30 rounded-lg p-4 text-slate-200 placeholder-slate-400 focus:border-starry-gold focus:outline-none resize-none"
                />

                <Button
                  onClick={handleSubmitReview}
                  disabled={!newReview.trim() || submitReviewMutation.isPending}
                  className="bg-starry-gold hover:bg-starry-bright-gold text-starry-deep-blue hover-glow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {submitReviewMutation.isPending ? 'Posting...' : 'Submit Review'}
                </Button>
              </div>
            </Card>
          )}

          {/* Reviews List */}
          <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <h2 className="text-2xl font-playfair font-semibold text-starry-gold">
              What Readers Are Saying
            </h2>
            
            {isLoading ? (
              <div className="text-center text-slate-300">Loading reviews...</div>
            ) : reviews.length === 0 ? (
              <div className="text-center text-slate-300">No reviews yet. Be the first to share your thoughts!</div>
            ) : (
              reviews.map((review) => (
                <Card 
                  key={review.id} 
                  className="glass-effect border-starry-gold/20 p-6 hover-glow transition-all duration-300"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-starry-gold/20 rounded-full flex items-center justify-center">
                          <span className="text-starry-gold font-semibold">
                            {review.profiles.username?.[0]?.toUpperCase() || review.profiles.full_name?.[0]?.toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">
                            {review.profiles.username || review.profiles.full_name}
                          </h3>
                          <div className="flex items-center gap-2">
                            <div className="flex">{renderStars(review.rating)}</div>
                            <span className="text-sm text-slate-400">
                              {new Date(review.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-slate-200 leading-relaxed">{review.content}</p>

                    <div className="flex items-center gap-4 pt-2">
                      <button
                        onClick={() => handleLike(review.id)}
                        disabled={toggleLikeMutation.isPending}
                        className={`flex items-center gap-2 transition-colors ${
                          hasUserLiked(review)
                            ? 'text-starry-gold' 
                            : 'text-slate-400 hover:text-starry-gold'
                        }`}
                      >
                        <ThumbsUp className={`w-4 h-4 ${hasUserLiked(review) ? 'fill-current' : ''}`} />
                        <span className="text-sm">{review.review_likes.length}</span>
                      </button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* WhatsApp Channel Card */}
          <Card className="glass-effect border-starry-gold/30 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-3 text-starry-gold">
                <MessageCircle className="w-6 h-6" />
                Join Our WhatsApp Channel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-300 max-w-2xl mx-auto">
                Stay connected with the community! Join our WhatsApp channel for updates, 
                discussions, and exclusive content about "Beaten Into Kindness".
              </p>
              <Button
                onClick={handleJoinWhatsApp}
                className="bg-green-600 hover:bg-green-700 text-white hover-glow px-8 py-3"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Join WhatsApp Channel
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};
