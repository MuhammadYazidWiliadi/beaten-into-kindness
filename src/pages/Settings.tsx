
import React, { useState, useEffect } from 'react';
import { User, Lock, MessageCircle, Save, Camera, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const Settings: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Profile state
  const [profile, setProfile] = useState({
    username: '',
    full_name: '',
    avatar_url: ''
  });

  // Password state
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Fetch user profile
  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (data) {
          setProfile({
            username: data.username || '',
            full_name: data.full_name || '',
            avatar_url: data.avatar_url || ''
          });
        }
      };
      fetchProfile();
    }
  }, [user]);

  // Handle file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;
      
      console.log('Uploading file:', fileName);

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, {
          upsert: true
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      console.log('Public URL:', data.publicUrl);

      setProfile(prev => ({ ...prev, avatar_url: data.publicUrl }));
      
      // Update the profile in the database
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: data.publicUrl })
        .eq('id', user.id);

      if (updateError) {
        console.error('Profile update error:', updateError);
        throw updateError;
      }
      
      toast({
        title: "Success!",
        description: "Avatar uploaded successfully.",
      });
    } catch (error: any) {
      console.error('File upload error:', error);
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async () => {
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update({
          username: profile.username,
          full_name: profile.full_name,
          avatar_url: profile.avatar_url,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your profile has been updated.",
      });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Change password mutation
  const changePasswordMutation = useMutation({
    mutationFn: async () => {
      if (passwords.newPassword !== passwords.confirmPassword) {
        throw new Error("New passwords don't match");
      }

      if (passwords.newPassword.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      const { error } = await supabase.auth.updateUser({
        password: passwords.newPassword
      });

      if (error) throw error;
    },
    onSuccess: () => {
      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      toast({
        title: "Success!",
        description: "Your password has been changed.",
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

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfileMutation.mutate();
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    changePasswordMutation.mutate();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-playfair font-bold text-starry-gold mb-4">
            Access Denied
          </h1>
          <p className="text-slate-300">Please log in to access settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Van Gogh inspired stars */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Large swirling stars */}
        <div className="absolute top-10 left-20 w-3 h-3 bg-starry-gold rounded-full animate-float opacity-80"></div>
        <div className="absolute top-32 right-16 w-2 h-2 bg-starry-bright-gold rounded-full animate-float opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-48 left-1/3 w-4 h-4 bg-starry-moon-gold rounded-full animate-float opacity-70" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-20 right-1/3 w-2 h-2 bg-starry-gold rounded-full animate-float opacity-90" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-60 right-20 w-3 h-3 bg-starry-bright-gold rounded-full animate-float opacity-75" style={{ animationDelay: '1.5s' }}></div>
        
        {/* Medium stars */}
        <div className="absolute bottom-32 left-16 w-2 h-2 bg-starry-gold rounded-full animate-float opacity-60" style={{ animationDelay: '2.5s' }}></div>
        <div className="absolute bottom-48 right-32 w-2 h-2 bg-starry-moon-gold rounded-full animate-float opacity-80" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-3 h-3 bg-starry-bright-gold rounded-full animate-float opacity-70" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute bottom-60 right-1/4 w-2 h-2 bg-starry-gold rounded-full animate-float opacity-85" style={{ animationDelay: '1.8s' }}></div>
        
        {/* Small scattered stars */}
        <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-starry-gold rounded-full animate-float opacity-60" style={{ animationDelay: '2.2s' }}></div>
        <div className="absolute top-3/4 right-1/5 w-1 h-1 bg-starry-bright-gold rounded-full animate-float opacity-50" style={{ animationDelay: '3.5s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-1 h-1 bg-starry-moon-gold rounded-full animate-float opacity-70" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/3 right-2/3 w-1 h-1 bg-starry-gold rounded-full animate-float opacity-65" style={{ animationDelay: '0.3s' }}></div>
        
        {/* Additional mobile-friendly stars */}
        <div className="absolute top-40 left-8 w-2 h-2 bg-starry-bright-gold rounded-full animate-float opacity-75 md:hidden" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute bottom-40 right-8 w-1 h-1 bg-starry-gold rounded-full animate-float opacity-60 md:hidden" style={{ animationDelay: '2.8s' }}></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold textured-gold">
              Settings
            </h1>
            <div className="w-24 h-1 bg-starry-gold mx-auto rounded-full"></div>
            <p className="text-xl text-slate-300">
              Manage your account and preferences
            </p>
          </div>

          {/* Profile Picture Section */}
          <Card className="glass-effect border-starry-gold/30 animate-fade-in-up text-center">
            <CardContent className="pt-8 pb-6">
              <div className="relative inline-block">
                <div className="w-32 h-32 mx-auto mb-4 relative">
                  {profile.avatar_url ? (
                    <img 
                      src={profile.avatar_url} 
                      alt="Profile Picture" 
                      className="w-full h-full rounded-full object-cover border-4 border-starry-gold/50"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-starry-gold/20 border-4 border-starry-gold/50 flex items-center justify-center">
                      <User className="w-12 h-12 text-starry-gold" />
                    </div>
                  )}
                  <label className="absolute bottom-0 right-0 bg-starry-gold hover:bg-starry-bright-gold text-starry-deep-blue p-2 rounded-full cursor-pointer hover-glow transition-all duration-300">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <h2 className="text-2xl font-playfair font-bold text-starry-gold mb-2">
                  {profile.full_name || profile.username || 'User'}
                </h2>
                <p className="text-slate-400">
                  {user.email}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
            {/* Profile Settings */}
            <Card className="glass-effect border-starry-gold/30 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-starry-gold">
                  <Edit className="w-6 h-6" />
                  Edit Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                      Username
                    </label>
                    <input
                      id="username"
                      type="text"
                      value={profile.username}
                      onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                      className="w-full bg-starry-night/50 border border-starry-gold/30 rounded-lg p-3 text-slate-200 placeholder-slate-400 focus:border-starry-gold focus:outline-none"
                      placeholder="Enter your username"
                    />
                  </div>

                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-2">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      value={profile.full_name}
                      onChange={(e) => setProfile(prev => ({ ...prev, full_name: e.target.value }))}
                      className="w-full bg-starry-night/50 border border-starry-gold/30 rounded-lg p-3 text-slate-200 placeholder-slate-400 focus:border-starry-gold focus:outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={updateProfileMutation.isPending}
                    className="w-full bg-starry-gold hover:bg-starry-bright-gold text-starry-deep-blue hover-glow"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {updateProfileMutation.isPending ? 'Saving...' : 'Save Profile'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Password Settings */}
            <Card className="glass-effect border-starry-gold/30 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-starry-gold">
                  <Lock className="w-6 h-6" />
                  Change Password
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-slate-300 mb-2">
                      New Password
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      value={passwords.newPassword}
                      onChange={(e) => setPasswords(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full bg-starry-night/50 border border-starry-gold/30 rounded-lg p-3 text-slate-200 placeholder-slate-400 focus:border-starry-gold focus:outline-none"
                      placeholder="Enter new password"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      value={passwords.confirmPassword}
                      onChange={(e) => setPasswords(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full bg-starry-night/50 border border-starry-gold/30 rounded-lg p-3 text-slate-200 placeholder-slate-400 focus:border-starry-gold focus:outline-none"
                      placeholder="Confirm new password"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={changePasswordMutation.isPending}
                    className="w-full bg-starry-gold hover:bg-starry-bright-gold text-starry-deep-blue hover-glow"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    {changePasswordMutation.isPending ? 'Changing...' : 'Change Password'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
