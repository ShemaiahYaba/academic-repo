import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';
import { LoadingSpinner } from './LoadingSpinner';

export const AuthStatus: React.FC = () => {
  const { user, profile, isAuthenticated, isInitialized, isLoading } = useAuth();
  const { success, error: showError } = useNotification();

  if (!isInitialized) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <LoadingSpinner size="small" />
          <span className="text-blue-600">Initializing authentication...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4 bg-yellow-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <span className="text-yellow-700">Not authenticated</span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 bg-blue-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <LoadingSpinner size="small" />
          <span className="text-blue-600">Loading user data...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-50 rounded-lg">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          <span className="text-green-700 font-medium">Authenticated</span>
        </div>
        
        {user && (
          <div className="ml-5 space-y-1 text-sm">
            <div>
              <span className="font-medium">Email:</span> {user.email}
            </div>
            {profile && (
              <>
                <div>
                  <span className="font-medium">Name:</span> {profile.first_name} {profile.last_name}
                </div>
                {profile.role && (
                  <div>
                    <span className="font-medium">Role:</span> {profile.role}
                  </div>
                )}
                {profile.username && (
                  <div>
                    <span className="font-medium">Username:</span> {profile.username}
                  </div>
                )}
              </>
            )}
            <div>
              <span className="font-medium">User ID:</span> {user.id}
            </div>
            <div>
              <span className="font-medium">Last Sign In:</span> {new Date(user.last_sign_in_at || '').toLocaleString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 