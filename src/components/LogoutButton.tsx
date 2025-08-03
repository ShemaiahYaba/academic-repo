// components/LogoutButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/contexts/NotificationContext";
import { useUI } from "@/contexts/UIContext";
import { MdOutlineLogout } from "react-icons/md";

const LogoutButton: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { success, error: showError } = useNotification();
  const { setLoading } = useUI();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signOut();
      success("You have been successfully logged out.");
      navigate("/login", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        showError("Error logging out: " + error.message);
      } else {
        showError("An error occurred while logging out.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md cursor-pointer p-0 border-none"
      aria-label="Logout"
      style={{
        animation: "pulse-shadow 1.2s infinite",
      }}
    >
      <MdOutlineLogout size={24} className="text-gray-500" />
      <style>
        {`
          @keyframes pulse-shadow {
            0% {
              box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
            }
            50% {
              box-shadow: 0 2px 16px 4px rgba(0, 0, 0, 0.25);
            }
            100% {
              box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
            }
          }
        `}
      </style>
    </button>
  );
};

export default LogoutButton;
