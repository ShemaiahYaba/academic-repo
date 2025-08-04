# Authentication Workflow Documentation

## Overview

The authentication workflow has been completely refactored to provide a production-ready, type-safe, and scalable authentication system using Supabase. This system includes comprehensive error handling, notifications, role-based access control, and real-time session management.

## Features

### ✅ Complete Authentication Flow
- **User Registration**: Email/password signup with email verification
- **User Login**: Secure authentication with session persistence
- **Password Reset**: Email-based password recovery
- **Session Management**: Automatic token refresh and session persistence
- **Profile Management**: User profile creation and updates
- **Logout**: Secure session termination

### ✅ Role-Based Access Control (RBAC)
- **User Roles**: `user`, `editor`, `admin`
- **Permission System**: Granular permissions for different actions
- **Route Protection**: Automatic route-level authorization
- **Component-Level Protection**: Conditional rendering based on permissions

### ✅ Error Handling & Notifications
- **Comprehensive Error Parsing**: Supabase-specific error handling
- **User-Friendly Messages**: Context-aware error messages
- **Toast Notifications**: Success, error, warning, and info notifications
- **Loading States**: Visual feedback during authentication operations

### ✅ Type Safety
- **Full TypeScript Support**: Complete type definitions for all auth operations
- **Supabase Integration**: Type-safe database operations
- **Context Types**: Strongly typed context providers

## Architecture

### File Structure
```
src/
├── contexts/
│   ├── AuthContext.tsx          # Authentication context and hook
│   ├── AuthProvider.tsx         # Authentication provider implementation
│   ├── UIContext.tsx           # UI state management
│   ├── ErrorContext.tsx        # Error handling context
│   └── NotificationContext.tsx # Notification system
├── components/
│   ├── ProtectedRoute.tsx      # Route-level authentication
│   ├── AuthStatus.tsx          # Authentication status display
│   ├── AuthNavigation.tsx      # Navigation with auth state
│   ├── LoadingSpinner.tsx      # Loading indicators
│   └── LogoutButton.tsx        # Logout functionality
├── hooks/
│   ├── useSupabase.ts          # Supabase operations wrapper
│   └── useAcademicPapers.ts    # Domain-specific data operations
├── lib/
│   └── supabase.ts            # Supabase client configuration
├── types/
│   ├── global.ts              # Global type definitions
│   └── supabase.ts            # Database type definitions
├── utils/
│   ├── errorHandler.ts        # Error parsing and handling
│   ├── storage.ts             # Local storage utilities
│   └── validation.ts          # Form validation utilities
└── examples/
    ├── AuthWorkflowExample.tsx # Complete authentication example
    └── CompleteExample.tsx     # Full system integration example
```

## Usage Examples

### Basic Authentication

```typescript
import { useAuth } from '@/contexts/AuthContext';

const MyComponent = () => {
  const { 
    user, 
    profile, 
    isAuthenticated, 
    signIn, 
    signOut 
  } = useAuth();

  const handleLogin = async () => {
    try {
      await signIn('user@example.com', 'password');
      // User is now authenticated
    } catch (error) {
      // Error is automatically handled and displayed
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>Welcome, {profile?.first_name}!</p>
          <button onClick={signOut}>Logout</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};
```

### Protected Routes

```typescript
import { ProtectedRoute } from '@/components/ProtectedRoute';

// Basic protection - requires authentication
<ProtectedRoute>
  <MyComponent />
</ProtectedRoute>

// Role-based protection
<ProtectedRoute requiredRole="editor">
  <AdminPanel />
</ProtectedRoute>

// Permission-based protection
<ProtectedRoute requiredPermission="manage:users">
  <UserManagement />
</ProtectedRoute>
```

### Notifications

```typescript
import { useNotification } from '@/contexts/NotificationContext';

const MyComponent = () => {
  const { success, error, warning, info } = useNotification();

  const handleAction = async () => {
    try {
      // Perform action
      success('Action completed successfully!');
    } catch (err) {
      error('Action failed. Please try again.');
    }
  };

  return (
    <button onClick={handleAction}>
      Perform Action
    </button>
  );
};
```

### Error Handling

```typescript
import { useError } from '@/contexts/ErrorContext';

const MyComponent = () => {
  const { addError, getErrorsByCategory } = useError();

  const handleError = (error: Error) => {
    addError({
      id: 'unique-error-id',
      message: error.message,
      category: 'authentication',
      severity: 'error',
      retryable: true
    });
  };

  const authErrors = getErrorsByCategory('authentication');
  
  return (
    <div>
      {authErrors.map(error => (
        <div key={error.id}>{error.message}</div>
      ))}
    </div>
  );
};
```

## Authentication States

### State Management
The authentication system manages several key states:

- **`isInitialized`**: Whether the auth system has finished initializing
- **`isAuthenticated`**: Whether a user is currently logged in
- **`isLoading`**: Whether an auth operation is in progress
- **`user`**: The current Supabase user object
- **`profile`**: The user's profile data from the database
- **`session`**: The current authentication session

### State Flow
1. **Initialization**: System checks for existing session
2. **Authentication**: User signs in/up
3. **Session Management**: Automatic token refresh
4. **Profile Loading**: User profile data is fetched
5. **Authorization**: Role and permission checks

## Role-Based Access Control

### User Roles
- **`user`**: Basic authenticated user
- **`editor`**: Can moderate content and upload journals
- **`admin`**: Full administrative access

### Permission System
```typescript
// Check if user has a specific role
const isAdmin = hasRole('admin');

// Check if user has a specific permission
const canDeleteArticles = hasPermission('delete:articles');

// Permission mapping (defined in AuthProvider)
const permissionMap = {
  'user': ['read:articles', 'write:articles'],
  'editor': ['read:articles', 'write:articles', 'delete:articles', 'upload:journals'],
  'admin': ['read:articles', 'write:articles', 'delete:articles', 'manage:users']
};
```

## Error Handling

### Error Categories
- **`authentication`**: Login, signup, session errors
- **`network`**: Connection and timeout errors
- **`validation`**: Form and data validation errors
- **`permission`**: Authorization and access control errors
- **`supabase`**: Supabase-specific errors

### Error Severity
- **`error`**: Critical errors that prevent operation
- **`warning`**: Non-critical issues that should be addressed
- **`info`**: Informational messages

### Automatic Features
- **Error Parsing**: Supabase errors are automatically parsed
- **User-Friendly Messages**: Technical errors are converted to user-friendly messages
- **Retry Logic**: Retryable errors are automatically retried with exponential backoff
- **Error Logging**: All errors are logged for debugging

## Notifications

### Notification Types
- **`success`**: Green notifications for successful operations
- **`error`**: Red notifications for errors
- **`warning`**: Yellow notifications for warnings
- **`info`**: Blue notifications for informational messages

### Features
- **Auto-dismiss**: Notifications automatically disappear after a configurable time
- **Manual dismissal**: Users can manually dismiss notifications
- **Queue management**: Multiple notifications are queued and displayed properly
- **Positioning**: Notifications can be positioned in different corners
- **Actions**: Notifications can include action buttons

## Database Schema

### Profiles Table
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  middle_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  school TEXT,
  degree TEXT,
  field_of_study TEXT,
  research_field TEXT,
  mobile_number TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Row Level Security (RLS)
```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policy for users to read their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Policy for users to update their own profile
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Policy for admins to manage all profiles
CREATE POLICY "Admins can manage all profiles" ON profiles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

## Environment Variables

Required environment variables:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Testing the Authentication Workflow

### 1. Visit the Auth Example
Navigate to `/auth-example` to see the complete authentication workflow in action.

### 2. Test User Registration
1. Fill out the sign-up form
2. Check your email for verification
3. Verify your email address
4. Sign in with your credentials

### 3. Test Role-Based Access
1. Create users with different roles (user, editor, admin)
2. Test the role and permission checks
3. Verify that protected routes work correctly

### 4. Test Error Handling
1. Try signing in with invalid credentials
2. Test network disconnection scenarios
3. Verify that error messages are user-friendly

### 5. Test Notifications
1. Perform various actions to trigger notifications
2. Test different notification types
3. Verify auto-dismiss and manual dismissal

## Production Considerations

### Security
- ✅ Email verification required for new accounts
- ✅ Secure password requirements
- ✅ Session management with automatic refresh
- ✅ Row Level Security (RLS) enabled
- ✅ Input validation and sanitization

### Performance
- ✅ Lazy loading of components
- ✅ Optimized re-renders with React.memo
- ✅ Efficient state management
- ✅ Caching of user data

### Scalability
- ✅ Modular architecture
- ✅ Type-safe operations
- ✅ Extensible permission system
- ✅ Real-time capabilities

### Monitoring
- ✅ Comprehensive error logging
- ✅ User action tracking
- ✅ Performance monitoring
- ✅ Security event logging

## Troubleshooting

### Common Issues

1. **Authentication not working**
   - Check environment variables
   - Verify Supabase project configuration
   - Check browser console for errors

2. **Notifications not showing**
   - Ensure NotificationContainer is rendered
   - Check notification context setup
   - Verify CSS classes are loaded

3. **Protected routes not working**
   - Check ProtectedRoute component implementation
   - Verify role and permission configurations
   - Check authentication state

4. **Profile not loading**
   - Check database schema
   - Verify RLS policies
   - Check user permissions

### Debug Mode
Enable debug mode by setting:
```typescript
localStorage.setItem('debug', 'auth:*');
```

This will log detailed authentication information to the console.

## Migration Guide

### From Firebase to Supabase
1. Update environment variables
2. Replace Firebase imports with Supabase
3. Update database schema
4. Test authentication flow
5. Update any Firebase-specific code

### From Basic Auth to Full System
1. Install new dependencies
2. Add context providers to main.tsx
3. Update components to use new hooks
4. Add error boundaries
5. Test all authentication flows

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the error logs
3. Test with the provided examples
4. Check Supabase documentation
5. Review the TypeScript types for guidance 