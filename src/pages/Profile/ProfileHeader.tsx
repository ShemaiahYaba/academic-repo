// src/components/ProfileHeader.tsx

import React from "react";
import { camera } from "@/constants/images";

interface ProfileHeaderProps {
  fullName: string;
  username: string;
  profileImage: string | null;
  setProfileImage: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  fullName,
  username,
  profileImage,
  setProfileImage,
}) => {
  return (
    <div className="flex items-center gap-4 p-4 mb-4">
      <div className="justify-center items-center flex flex-col">
        <div className="relative flex mb-6">
          <img
            src={profileImage || ""}
            alt="Profile Picture"
            className="w-35 h-35 rounded-full border-2 border-gray-300"
          />
          <label
            htmlFor="profileImageUpload"
            className="absolute bottom-0 left-24 bg-white p-1 rounded-full cursor-pointer"
          >
            <img src={camera} className="w-4 h-4 object-contain" />
            <input
              type="file"
              id="profileImageUpload"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    setProfileImage(reader.result as string);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold">{fullName || "Loading..."}</h1>
        <p className="font-light">{username || "..."}</p>
      </div>
    </div>
  );
};
