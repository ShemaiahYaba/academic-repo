import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ProfileImageUpload } from "@/components/ProfileImageUpload";
import { ProfileForm } from "@/pages/Profile/ProfileForm";
import { marginLineHorizontal } from "@/constants/images";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

const DEFAULT_PROFILE_IMAGE = "https://via.placeholder.com/150";

const Profile: React.FC = () => {
  const { user } = useAuth();
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

  // Load existing user profile on mount
  useEffect(() => {
    if (!user) return;

    const loadUserProfile = async () => {
      const userRef = doc(db, "users", user.email!);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setFormData((prev) => ({
          ...prev,
          ...data,
          taxIdCountry: data.taxIdCountry || "Nigeria",
        }));
        setProfileImage(data.profileImage || DEFAULT_PROFILE_IMAGE);
      }
    };

    loadUserProfile();
  }, [user]);

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

  // Manually save form to Firestore
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const userRef = doc(db, "users", user.email!);
      await setDoc(userRef, {
        ...formData,
        profileImage,
      });
      alert("Profile saved successfully!");
    } catch (err) {
      console.error("Error saving profile:", err);
      alert("Failed to save profile.");
    }
  };

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
