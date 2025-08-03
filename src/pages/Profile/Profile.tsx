import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/contexts/NotificationContext";
import { useUI } from "@/contexts/UIContext";
import { useSupabase } from "@/hooks/useSupabase";
import { ProfileImageUpload } from "@/components/ProfileImageUpload";
import { ProfileForm } from "@/pages/Profile/ProfileForm";
import { marginLineHorizontal } from "@/constants/images";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const DEFAULT_PROFILE_IMAGE = "https://via.placeholder.com/150";

const Profile: React.FC = () => {
  const { user, profile } = useAuth();
  const { success, error: showError } = useNotification();
  const { setLoading } = useUI();
  const { query, mutate } = useSupabase();
  
  const [profileImage, setProfileImage] = useState<string | undefined>(
    DEFAULT_PROFILE_IMAGE
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middlename: "",
    mobileNumber: "",
    bio: "",
    school: "",
    degree: "",
    fieldOfStudy: "",
    researchField: "",
    username: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load existing user profile on mount
  useEffect(() => {
    if (!user) return;

    const loadUserProfile = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await query(
          'profiles',
          'select',
          { eq: { column: 'id', value: user.id } }
        );

        if (error) throw error;

        if (data && data.length > 0) {
          const profileData = data[0];
          setFormData((prev) => ({
            ...prev,
            firstName: profileData.first_name || "",
            lastName: profileData.last_name || "",
            middlename: profileData.middle_name || "",
            mobileNumber: profileData.mobile_number || "",
            bio: profileData.bio || "",
            school: profileData.school || "",
            degree: profileData.degree || "",
            fieldOfStudy: profileData.field_of_study || "",
            researchField: profileData.research_field || "",
            username: profileData.username || "",
          }));
          setProfileImage(profileData.avatar_url || DEFAULT_PROFILE_IMAGE);
        }
      } catch (error) {
        showError("Failed to load profile data.");
        console.error("Error loading profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserProfile();
  }, [user, query, showError]);

  // Handle field input change (no autosave)
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    const updatedForm = {
      ...formData,
      [name]: value,
    };

    // If first or last name changed, regenerate username
    if (name === "firstName" || name === "lastName") {
      const firstName = name === "firstName" ? value : formData.firstName;
      const lastName = name === "lastName" ? value : formData.lastName;
      updatedForm.username = `@${firstName.toLowerCase()}${lastName.toLowerCase()}`;
    }

    setFormData(updatedForm);
  };

  // Manually save form to Supabase
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await mutate(
        'profiles',
        'upsert',
        {
          id: user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          middle_name: formData.middlename,
          mobile_number: formData.mobileNumber,
          bio: formData.bio,
          school: formData.school,
          degree: formData.degree,
          field_of_study: formData.fieldOfStudy,
          research_field: formData.researchField,
          username: formData.username,
          avatar_url: profileImage,
          updated_at: new Date().toISOString(),
        }
      );

      if (error) throw error;
      success("Profile saved successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      showError("Failed to save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="large" text="Loading profile..." />
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
        <ProfileForm
          formData={formData}
          handleChange={handleInputChange}
          handleSubmit={handleSaveProfile}
        />
      </div>
    </div>
  );
};

export default Profile;
