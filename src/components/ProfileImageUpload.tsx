import React from "react";
import { camera } from "../constants/images";

interface ProfileImageUploadProps {
  profileImage: string | undefined;
  setProfileImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
  profileImage,
  setProfileImage,
}) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string); // Update profile image with the uploaded file
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative flex mb-6">
      <img
        src={profileImage}
        alt="Profile Picture"
        className="w-40 h-40 rounded-full border-2 border-gray-300"
      />
      <label
        htmlFor="profileImageUpload"
        className="absolute bottom-0 left-27 bg-white p-1 rounded-full cursor-pointer"
      >
        <img src={camera} className="w-4 h-4 object-contain" />
        <input
          type="file"
          id="profileImageUpload"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>
    </div>
  );
};
