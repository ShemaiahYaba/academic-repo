import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import { LoadingSpinner } from "./LoadingSpinner";
import type { UserRole } from "@/types/global";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
  requiredPermission?: string;
  fallbackPath?: string;
}

export const ProtectedRoute = ({
  children,
  requiredRole,
  requiredPermission,
  fallbackPath = "/login",
}: ProtectedRouteProps) => {
  const {
    isAuthenticated,
    isInitialized,
    isLoading,
    hasRole,
    hasPermission,
  } = useAuth();
  const location = useLocation();

  // ✅ Show a loading state while authentication initializes
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  // ✅ Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // ✅ Check required role (strict UserRole check)
  if (requiredRole && !(hasRole?.(requiredRole) ?? false)) {
    return <AccessDenied message="You don't have the required role to access this page." />;
  }

  // ✅ Check required permission
  if (requiredPermission && !(hasPermission?.(requiredPermission) ?? false)) {
    return <AccessDenied message="You don't have the required permission to access this page." />;
  }

  // ✅ Render protected content
  return <>{children}</>;
};

/**
 * Access Denied Component
 * --------------------------------
 * Centralized component for displaying access errors.
 */
const AccessDenied = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-semibold text-red-600 mb-4">Access Denied</h2>
      <p className="mb-2 text-gray-700">{message}</p>
      <p className="mb-6 text-gray-500 text-sm">
        If you believe this is an error, please contact the administrator.
      </p>
      <button
        onClick={() => window.history.back()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition mb-2"
      >
        Go Back
      </button>
    </div>
  );
};
