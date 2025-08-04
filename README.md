# Academic Repository - Global Context Management System

A production-grade Vite-based academic repository application with a comprehensive global context management system, robust error handling, and notification system optimized for Supabase authentication.

## Features

### 🔐 Authentication & Authorization
- **Session Management**: Automatic session persistence and refresh
- **Role-Based Access Control**: Admin, editor, and user roles with granular permissions
- **Profile Management**: User profile creation and updates
- **Protected Routes**: Route-level authentication and authorization guards

### 🎨 UI State Management
- **Theme Management**: Light, dark, and system theme support with localStorage persistence
- **Language Preferences**: Multi-language support (EN, ES, FR, DE)
- **Loading States**: Global and component-level loading indicators
- **Sidebar Management**: Responsive sidebar state management

### ⚠️ Error Handling
- **Comprehensive Error Types**: Authentication, network, validation, permission, and Supabase-specific errors
- **Automatic Error Categorization**: Severity levels and retry mechanisms
- **Error Boundaries**: React error boundary integration
- **Error Recovery**: User-friendly error messages with recovery suggestions

### 🔔 Notification System
- **Multiple Types**: Success, error, warning, and info notifications
- **Auto-dismiss**: Configurable duration with progress indicators
- **Positioning**: Multiple positions (top-right, bottom-left, etc.)
- **Queue Management**: Smooth animations and transition handling
- **Persistent Notifications**: For critical information

### 💾 Data Management
- **Caching System**: TTL-based data caching with automatic expiration
- **Real-time Subscriptions**: Supabase real-time integration
- **Optimistic Updates**: Better UX with immediate feedback
- **Data Synchronization**: Cache invalidation and refresh strategies

## Architecture

```
src/
├── lib/
│   └── supabase.ts              # Supabase client configuration
├── types/
│   ├── global.ts                # Global TypeScript types
│   └── supabase.ts              # Supabase database types
├── contexts/
│   ├── AuthContext.tsx          # Authentication context
│   ├── AuthProvider.tsx         # Authentication provider
│   ├── UIContext.tsx            # UI state context
│   ├── ErrorContext.tsx         # Error management context
│   ├── NotificationContext.tsx  # Notification context
│   └── DataContext.tsx          # Data caching context
├── providers/
│   └── AppProvider.tsx          # Main provider composition
├── components/
│   ├── NotificationToast.tsx    # Individual notification component
│   ├── NotificationContainer.tsx # Notification positioning
│   ├── ErrorBoundary.tsx        # React error boundary
│   ├── LoadingSpinner.tsx       # Loading indicators
│   └── ProtectedRoute.tsx       # Route protection
├── hooks/
│   ├── useSupabase.ts           # Supabase operations hook
│   └── useAcademicPapers.ts     # Domain-specific hook example
├── utils/
│   └── errorHandler.ts          # Error parsing and handling
└── examples/
    └── PaperUploadExample.tsx   # Usage example
```

## Quick Start

### 1. Setup Environment Variables

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Wrap Your App

```tsx
import { AppProvider } from '@/providers/AppProvider';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { NotificationContainer } from '@/components/NotificationContainer';

function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <YourApp />
        <NotificationContainer />
      </AppProvider>
    </ErrorBoundary>
  );
}
```

### 3. Use Contexts in Components

```tsx
import { useAuth } from '@/contexts/AuthContext';
import { useNotification } from '@/contexts/NotificationContext';
import { useUI } from '@/contexts/UIContext';

function MyComponent() {
  const { user, isAuthenticated, hasRole } = useAuth();
  const { success, error } = useNotification();
  const { theme, setTheme } = useUI();

  const handleAction = async () => {
    try {
      // Your logic here
      success('Success', 'Action completed successfully');
    } catch (err) {
      error('Error', 'Something went wrong');
    }
  };

  return (
    <div>
      {isAuthenticated && <p>Welcome, {user?.email}</p>}
      {hasRole('admin') && <p>Admin panel</p>}
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
    </div>
  );
}
```

## Usage Examples

### Authentication

```tsx
import { useAuth } from '@/contexts/AuthContext';

function LoginForm() {
  const { signIn, isLoading } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    const { user, error } = await signIn(email, password);
    if (error) {
      // Error is automatically handled and displayed
      console.error(error);
    }
  };
}
```

### Protected Routes

```tsx
import { ProtectedRoute } from '@/components/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={
        <ProtectedRoute requiredRole="editor">
          <AdminPanel />
        </ProtectedRoute>
      } />
      <Route path="/papers" element={
        <ProtectedRoute requiredPermission="read">
          <PapersList />
        </ProtectedRoute>
      } />
    </Routes>
  );
}
```

### Data Operations with Caching

```tsx
import { useSupabase } from '@/hooks/useSupabase';

function PapersList() {
  const { query } = useSupabase({ 
    cacheKey: 'papers', 
    cacheTTL: 5 * 60 * 1000 // 5 minutes
  });

  const fetchPapers = async () => {
    const { data, error } = await query(
      () => supabase.from('academic_papers').select('*'),
      'fetchPapers'
    );
    
    if (error) {
      // Error is automatically handled
      return;
    }
    
    // Use data
  };
}
```

### Real-time Subscriptions

```tsx
import { useData } from '@/contexts/DataContext';

function LivePapers() {
  const { subscribe, unsubscribe } = useData();

  useEffect(() => {
    const subscriptionId = subscribe(
      'academic_papers',
      'INSERT',
      (payload) => {
        console.log('New paper added:', payload.new);
      }
    );

    return () => unsubscribe(subscriptionId);
  }, [subscribe, unsubscribe]);
}
```

### Custom Domain Hooks

```tsx
import { useAcademicPapers } from '@/hooks/useAcademicPapers';

function PaperUpload() {
  const { createPaper } = useAcademicPapers();

  const handleUpload = async (paperData) => {
    const { data, error } = await createPaper(paperData);
    // Success/error notifications are automatically shown
  };
}
```

## Error Handling

The system automatically handles different types of errors:

- **Authentication Errors**: Invalid credentials, expired tokens
- **Network Errors**: Connection issues, timeouts
- **Validation Errors**: Form validation failures
- **Permission Errors**: Unauthorized access attempts
- **Supabase Errors**: Database operation failures

Errors are categorized by severity and can be retried automatically when appropriate.

## Notification System

Notifications support:

- **Auto-dismiss**: Configurable duration with progress bar
- **Manual dismissal**: Click to close
- **Multiple positions**: Top-right, bottom-left, etc.
- **Actions**: Buttons for user interaction
- **Persistent**: For critical information

```tsx
const { success, error, warning, info } = useNotification();

// Basic usage
success('Success', 'Operation completed');

// With custom options
error('Error', 'Something went wrong', {
  duration: 10000,
  persistent: true,
  actions: [
    {
      label: 'Retry',
      action: () => retryOperation(),
      variant: 'primary'
    }
  ]
});
```

## Contributing

1. Follow the established patterns for context providers
2. Use TypeScript for type safety
3. Implement proper error handling
4. Add notifications for user feedback
5. Use the caching system for data operations
6. Test with different user roles and permissions

## License

MIT License - see LICENSE file for details.
