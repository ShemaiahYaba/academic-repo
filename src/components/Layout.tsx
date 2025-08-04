// components/Layout.tsx
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import LogoutButton from "@/components/LogoutButton";
import { AuthNavigation } from "@/components/AuthNavigation";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Access isAuthenticated directly from context

  return (
    <div className="min-h-screen flex flex-col">
      <AuthNavigation />
      <div className="flex flex-1">
        <div className="flex flex-col flex-1">
          <Navbar />

          <main className="flex-grow p-4 overflow-y-auto">{children}</main>

          {/* Footer */}
          <div className="relative">
            <Footer />
          </div>
        </div>
        {isAuthenticated && (
          <div className="fixed bottom-26 right-6 z-40">
            <LogoutButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Layout;
