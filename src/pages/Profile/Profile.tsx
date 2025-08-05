import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { useNotification } from "@/contexts/NotificationContext";
import { useUI } from "@/contexts/UIContext";
import { useSupabase } from "@/hooks/useSupabase";
import { ProfileImageUpload } from "@/components/ProfileImageUpload";
import { marginLineHorizontal } from "@/constants/images";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import type { Database } from "@/types/supabase";
import { ProfileForm } from "./ProfileForm";

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
    firstName: "",
    lastName: "",
    middlename: "",
    fullName:"",
    mobileNumber: "",
    bio: "",
    school: "",
    degree: "",
    fieldOfStudy: "",
    researchField: "",
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
          setFormData(prev => ({
            ...prev,
            fullName: data.full_name || "",
            email: data.email || user.email || "",
            // Map other fields if available in data
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            middlename: data.middlename || "",
            mobileNumber: data.mobile_number || "",
            bio: data.bio || "",
            school: data.school || "",
            degree: data.degree || "",
            fieldOfStudy: data.field_of_study || "",
            researchField: data.research_field || "",
          }));
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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
        
        {/* Profile Form */}
        <div className="w-full max-w-md">
          <ProfileForm
            formData={formData}
            handleChange={handleInputChange}
            handleSubmit={handleSaveProfile}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
