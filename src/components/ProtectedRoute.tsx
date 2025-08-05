import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import { LoadingSpinner } from './LoadingSpinner';
import type { UserRole } from '@/types/global';

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
  fallbackPath = '/login' 
}: ProtectedRouteProps) => {
  const { isAuthenticated, isInitialized, isLoading, hasRole, hasPermission } = useAuth();
  const location = useLocation();

  // Show loading spinner while auth is initializing
  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // Check role requirement
  if (requiredRole && (!hasRole || !hasRole(requiredRole))) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have the required role to access this page.
          </p>
        </div>
      </div>
    );
  }

  // Check permission requirement
  if (requiredPermission && (!hasPermission || !hasPermission(requiredPermission))) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            You don't have the required permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}; 