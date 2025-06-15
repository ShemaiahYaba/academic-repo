import React, { useEffect, useState } from "react";
import { getUserProfile, UserProfile } from "@/utils/getUserProfile";

interface UserCardProps {
  userEmail: string; // Firestore document ID (email)
}

const UserCard: React.FC<UserCardProps> = ({ userEmail }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching user profile for email:", userEmail);
        const profile = await getUserProfile({ email: userEmail });
        console.log("Fetched user profile:", profile);
        
        if (!profile) {
          setError("Failed to fetch user profile");
          return;
        }
        
        setUser(profile);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Error loading user profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userEmail]);

  if (loading) {
    return (
      <div className="w-[300px] p-4 bg-[#f5f6fa] rounded-xl shadow-md animate-pulse">
        <div className="w-20 h-20 rounded-full bg-gray-300 mb-3 mx-auto" />
        <div className="h-4 bg-gray-300 w-3/4 mx-auto rounded mb-2" />
        <div className="h-3 bg-gray-200 w-1/2 mx-auto rounded" />
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="w-[300px] p-4 bg-[#f5f6fa] rounded-xl shadow-md">
        <div className="text-red-500 text-center">
          {error || "Failed to load user profile"}
        </div>
      </div>
    );
  }

  return (
    <div className="w-[300px] p-4 bg-[#f5f6fa] rounded-xl shadow-md">
      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-3">
          {/* Profile Circle with Gradient Background */}
          <div className="relative w-20 h-20 mr-3">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-90" />
            <div className="absolute inset-0 rounded-full flex items-center justify-center text-3xl font-bold text-white">
              {user.initials || `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase()}
            </div>
          </div>
          <div>
            <div className="font-semibold text-xl mb-0.5">
              {user.firstName} {user.lastName}
            </div>
            <div className="text-xs text-gray-600">
              {user.researchField || "Researcher"}
            </div>
          </div>
        </div>
        <div className="text-gray-500 text-sm text-left mb-3 w-full">
          {user.bio || "No bio available."}
        </div>
        <div className="flex justify-between w-full">
          <div className="text-center flex-1">
            <div className="font-semibold text-base">
              {user.followersCount ?? 0}
            </div>
            <div className="text-gray-500 text-xs">Followers</div>
          </div>
          <div className="text-center flex-1">
            <div className="font-semibold text-base">
              {user.followingCount ?? 0}
            </div>
            <div className="text-gray-500 text-xs">Following</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
// Compare this snippet from src/pages/Journal/UploadJournal.tsx:
