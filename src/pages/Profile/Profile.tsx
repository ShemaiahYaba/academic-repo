import React, { useState, useEffect } from "react";
import { supabase } from "@/supabaseClient"; // Import Supabase client
import { useAuth } from "@/contexts/AuthContext"; // Assuming you have an AuthContext to get the user
import { ProfileImageUpload } from "@/components/ProfileImageUpload"; // Importing modularized image upload component
import { ProfileForm } from "@/pages/Profile/ProfileForm"; // Importing the form component
import { marginLineHorizontal } from "@/constants/images";

const Profile: React.FC = () => {
  const { user } = useAuth(); // Get current user
  const [profileImage, setProfileImage] = useState<string | undefined>(
    "https://via.placeholder.com/150"
  );
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middlename: "",
    mobileNumber: "",
    bio: "",
    taxIdNumber: "",
    taxIdCountry: "Nigeria",
    residentialAddress: "",
    school: "",
    degree: "",
    fieldOfStudy: "",
    researchField: "",
  });

  // Fetch user profile from Supabase
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from("profiles") // Replace with your actual table name
          .select("*")
          .eq("user_id", user.id)
          .single(); // Fetch single record based on user ID

        if (data) {
          setFormData({
            ...data,
            taxIdCountry: data.taxIdCountry || "Nigeria", // Handle default value if needed
          });
          setProfileImage(data.profileImage || profileImage); // Set profile image if available
        }

        if (error) {
          console.error("Error fetching user profile:", error.message);
        }
      }
    };

    fetchUserProfile();
  }, [user, profileImage]);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const username = `@${formData.firstName.toLowerCase()}${formData.lastName.toLowerCase()}`;

      // Upsert user profile data in Supabase
      const { error } = await supabase.from("profiles").upsert(
        [
          {
            user_id: user.id, // Match by user_id
            username: username,
            ...formData, // Include all other form data
            profileImage: profileImage, // Include the profile image
          },
        ],
        { onConflict: "user_id" } // Ensure updating an existing profile if it exists
      );

      if (error) {
        throw error;
      }

      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="p-4">
      <div className="justify-center items-center flex flex-col">
        {/* Profile Image Section */}
        <ProfileImageUpload
          profileImage={profileImage}
          setProfileImage={setProfileImage}
        />

        <img
          className="py-4 mx-auto"
          src={marginLineHorizontal}
          alt="Divider"
        />

        {/* Profile Form */}
        <ProfileForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default Profile;
