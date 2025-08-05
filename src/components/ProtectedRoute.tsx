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
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
          Access Denied
        </h2>
        <p className="text-gray-600 dark:text-gray-400">{message}</p>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
          If you believe this is an error, please contact the administrator.
        </p>
      </div>
    </div>
  );
};
