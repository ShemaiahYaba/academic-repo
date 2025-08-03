// components/LogoutButton.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/contexts/NotificationContext";
import { useUI } from "@/contexts/UIContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { MdOutlineLogout } from "react-icons/md";

const LogoutButton: React.FC = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { success, error: showError } = useNotification();
  const { setLoading } = useUI();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Set both local and global loading states
    setIsLoggingOut(true);
    setLoading(true, "Signing out...");
    
    try {
      await signOut();
      success("Successfully Logged Out", "You have been signed out of your account");
      navigate("/login", { replace: true });
    } catch (error) {
      if (error instanceof Error) {
        showError("Logout Failed", `Error logging out: ${error.message}`);
      } else {
        showError("Logout Failed", "An unexpected error occurred while logging out");
      }
    } finally {
      setIsLoggingOut(false);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className={`
        relative bg-white rounded-full w-12 h-12 flex items-center justify-center 
        shadow-lg cursor-pointer p-0 border-2 border-gray-100
        hover:shadow-xl hover:border-gray-200 hover:scale-105
        disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100
        transition-all duration-200 ease-in-out
        ${isLoggingOut ? 'animate-pulse' : ''}
      `}
      aria-label="Logout"
      title="Sign out of your account"
    >
      {isLoggingOut ? (
        <LoadingSpinner size="sm" />
      ) : (
        <MdOutlineLogout 
          size={20} 
          className="text-gray-600 hover:text-red-500 transition-colors duration-200" 
        />
      )}
      
      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          Sign Out
        </div>
        <div className="w-2 h-2 bg-gray-800 transform rotate-45 absolute top-full left-1/2 -translate-x-1/2 -mt-1"></div>
      </div>
    </button>
  );
};

export default LogoutButton;
