// routes/AppRoutes.tsx
import { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import PublicRoutes from "@/routes/PublicRoutes";

const AppRoutes = () => {
  console.log("AppRoutes: Rendering...");
  const { isAuthenticated, isInitialized } = useAuth();

  // Show loading spinner while auth state is being initialized
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Initializing..." />
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner size="lg" text="Loading..." />}>
      <Routes>
        {isAuthenticated ? (
          <Route path="/*" element={<ProtectedRoutes />} />
        ) : (
          <Route path="/*" element={<PublicRoutes />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
