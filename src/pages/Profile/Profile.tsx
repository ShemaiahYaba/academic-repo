import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { useNotification } from "@/contexts/NotificationContext";
import { useUI } from "@/contexts/UIContext";
import { useSupabase } from "@/hooks/useSupabase";
import { ProfileImageUpload } from "@/components/ProfileImageUpload";
import { marginLineHorizontal } from "@/constants/images";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import type { Database } from "@/types/supabase";

const DEFAULT_PROFILE_IMAGE = "https://via.placeholder.com/150";

type Profile = Database['public']['Tables']['profiles']['Row'];

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { success, error: showError } = useNotification();
  const { setLoading } = useUI();
  const { supabase, query, mutate } = useSupabase();
  
  const [profileImage, setProfileImage] = useState<string | undefined>(
    DEFAULT_PROFILE_IMAGE
  );
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load existing user profile on mount
  useEffect(() => {
    if (!user) return;

    const loadUserProfile = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await query<Profile>(
          async () => await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single(),
          'loadUserProfile'
        );

        if (error) throw error;

        if (data) {
          setFormData({
            fullName: data.full_name || "",
            email: data.email || user.email || "",
          });
          setProfileImage(data.avatar_url || DEFAULT_PROFILE_IMAGE);
        }
      } catch (error) {
        showError("Profile Load Error", "Failed to load profile data.");
        console.error("Error loading profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [user, query, supabase, showError]);

  // Handle field input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save form to Supabase
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await mutate<Profile>(
        async () => await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            email: formData.email,
            full_name: formData.fullName,
            avatar_url: profileImage,
            updated_at: new Date().toISOString(),
          })
          .select()
          .single(),
        'saveUserProfile',
        'Profile saved successfully!'
      );

      if (error) throw error;
      success("Profile Saved", "Profile saved successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      showError("Profile Save Error", "Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="lg" text="Loading profile..." />
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-col items-center">
        <ProfileImageUpload
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />
        <img className="py-4" src={marginLineHorizontal} alt="Divider" />
        
        {/* Simple Profile Form */}
        <div className="w-full max-w-md">
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
