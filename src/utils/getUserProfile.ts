import { doc, getDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";

export interface UserProfile {
  firstName: string;
  lastName: string;
  username?: string;
  bio?: string;
  researchField?: string;
  followersCount?: number;
  followingCount?: number;
  initials: string;
}

export const getUserProfile = async (user: {
  email: string;
}): Promise<UserProfile | null> => {
  try {
    if (!user?.email) {
      console.error("No email provided");
      return null;
    }

    const userDocRef = doc(db, "users", user.email);
    const userSnap = await getDoc(userDocRef);

    if (!userSnap.exists()) {
      console.error("User data not found");
      return null;
    }

    const data = userSnap.data();
    const firstName = data.firstName || "";
    const lastName = data.lastName || "";
    
    // Always generate initials from first and last name
    const initials = `${firstName[0] || ""}${lastName[0] || ""}`.toUpperCase();

    return {
      firstName,
      lastName,
      username: data.username || "",
      bio: data.bio || "",
      researchField: data.researchField || "",
      followersCount: data.followersCount || 0,
      followingCount: data.followingCount || 0,
      initials,
    };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
};
