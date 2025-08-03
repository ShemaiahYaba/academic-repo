// src/pages/UploadJournal.tsx

import React, { useState, useEffect } from "react";
import { db } from "@/utils/firebase";
import { useAuth } from "@/contexts/AuthContext"; // Ensure Firebase is configured properly
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import getDoc
import { ProfileHeader } from "@/pages/Profile/ProfileHeader";
import { JournalForm } from "@/pages/Journal/JournalForm";
import { marginLineHorizontal } from "@/constants/images";

const UploadJournal: React.FC = () => {
  const [userData, setUserData] = useState<{
    fullName: string;
    username: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    overview: "",
    issn: "",
    keywords: "",
    subject: "",
    documentLink: "",
  });
  const { user } = useAuth(); // user could potentially be null
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) {
          setError("User not authenticated");
          return;
        }

        const userDocRef = doc(db, "users", user.email!); // Use Supabase user ID
        const userSnap = await getDoc(userDocRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          const fullName = `${userData.firstName || ""} ${
            userData.lastName || ""
          }`;
          const username = userData.username || "";

          setUserData({ fullName, username });
        } else {
          setError("User data not found");
        }
      } catch {
        setError("Error fetching user data");
      }
    };

    // Only fetch user data if `user` is not null
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!userData) {
        setError("User data is missing");
        setLoading(false);
        return;
      }

      if (!userData.username) {
        setError("Username is missing. Please update your profile.");
        setLoading(false);
        return;
      }

      const {
        title,
        authors,
        overview,
        issn,
        keywords,
        subject,
        documentLink,
      } = formData;

      if (
        !title ||
        !authors ||
        !overview ||
        !issn ||
        !keywords ||
        !subject ||
        !documentLink
      ) {
        setError("All fields are required");
        setLoading(false);
        return;
      }

      // Using user's email as the document ID
      if (!user || !user.email) {
        setError("User is not authenticated or email is missing.");
        setLoading(false);
        return;
      }
      const journalDocRef = doc(db, "journals", user.email); // Use email as the document ID

      await setDoc(journalDocRef, {
        title,
        authors,
        overview,
        issn,
        keywords,
        subject,
        documentLink,
        username: userData.username,
        createdAt: new Date(),
      });

      setFormData({
        title: "",
        authors: "",
        overview: "",
        issn: "",
        keywords: "",
        subject: "",
        documentLink: "",
      });

      alert("Journal uploaded successfully!");
    } catch {
      setError("Failed to upload journal. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ProfileHeader
        fullName={userData?.fullName || ""}
        username={userData?.username || ""}
        profileImage={profileImage}
        setProfileImage={setProfileImage}
      />
      <img
        className="pt-2 mx-auto px-4"
        src={marginLineHorizontal}
        alt="Divider"
      />
      <JournalForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default UploadJournal;
