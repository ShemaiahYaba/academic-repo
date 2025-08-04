import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';
import { useUI } from '@/contexts/UIContext';
import { LoadingSpinner } from './LoadingSpinner';

export const AuthStatus: React.FC = () => {
  const { 
    user, 
    profile, 
    isAuthenticated, 
    isInitialized, 
    isLoading,
    refreshSession,
    hasRole 
  } = useAuth();
  const { success, error: showError } = useNotification();
  const { setLoading } = useUI();

  const handleRefreshSession = async () => {
    setLoading(true);
    try {
      await refreshSession();
      success('Session Refreshed', 'Your session has been refreshed successfully');
    } catch (err) {
      showError('Session Refresh Failed', 'Failed to refresh your session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isInitialized) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
        <div className="flex items-center space-x-3">
          <LoadingSpinner size="sm" />
          <div>
            <span className="text-blue-700 font-medium">Initializing authentication...</span>
            <p className="text-blue-600 text-sm">Please wait while we set up your session</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
          <div>
            <span className="text-yellow-700 font-medium">Not authenticated</span>
            <p className="text-yellow-600 text-sm">Please sign in to access your account</p>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm">
        <div className="flex items-center space-x-3">
          <LoadingSpinner size="sm" />
          <div>
            <span className="text-blue-700 font-medium">Loading user data...</span>
            <p className="text-blue-600 text-sm">Fetching your profile information</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg shadow-sm">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-700 font-medium">Authenticated</span>
          </div>
          <button
            onClick={handleRefreshSession}
            className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
            title="Refresh session"
          >
            Refresh
          </button>
        </div>
        
        {user && (
          <div className="ml-6 space-y-2 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <span className="ml-2 text-gray-600">{user.email}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">User ID:</span>
                <span className="ml-2 text-gray-600 font-mono text-xs">{user.id}</span>
              </div>
            </div>
            
            {profile && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <div>
                    <span className="font-medium text-gray-700">Name:</span>
                    <span className="ml-2 text-gray-600">
                      {profile.full_name || `${profile.first_name} ${profile.last_name}`}
                    </span>
                  </div>
                  {profile.username && (
                    <div>
                      <span className="font-medium text-gray-700">Username:</span>
                      <span className="ml-2 text-gray-600">@{profile.username}</span>
                    </div>
                  )}
                </div>
                
                {profile.role && (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-700">Role:</span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      profile.role === 'admin' 
                        ? 'bg-red-100 text-red-700' 
                        : profile.role === 'editor'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {profile.role}
                    </span>
                    {hasRole('admin') && (
                      <span className="text-xs text-gray-500">(Admin privileges)</span>
                    )}
                  </div>
                )}
                
                {profile.avatar_url && (
                  <div className="pt-2 border-t border-green-200">
                    <h4 className="font-medium text-gray-700 mb-1">Profile:</h4>
                    <div className="flex items-center space-x-2">
                      <img 
                        src={profile.avatar_url} 
                        alt="Profile" 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-xs text-gray-600">Avatar uploaded</span>
                    </div>
                  </div>
                )}
              </>
            )}
            
            <div className="pt-2 border-t border-green-200">
              <div className="text-xs text-gray-500">
                <span className="font-medium">Last Sign In:</span> {new Date(user.last_sign_in_at || '').toLocaleString()}
              </div>
              {user.created_at && (
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Member Since:</span> {new Date(user.created_at).toLocaleDateString()}
                </div>
              )}
              {profile?.created_at && (
                <div className="text-xs text-gray-500">
                  <span className="font-medium">Profile Created:</span> {new Date(profile.created_at).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 