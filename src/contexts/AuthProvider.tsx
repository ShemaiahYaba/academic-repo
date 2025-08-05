// src/contexts/AuthProvider.tsx
import {
  useEffect,
  useState,
  useCallback,
  useRef,
  createContext,
  useContext,
} from "react";
import { supabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";
import type { AuthContextType, UserProfile, AppError, UserRole } from "@/types/global";
import { parseSupabaseError, logError } from "@/utils/errorHandler";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const lastUserIdRef = useRef<string | null>(null);

  const navigate = useNavigate();
  const isAuthenticated = !!user && !!profile;

  // Clear browser session cache
  const clearBrowserCache = useCallback(() => {
    console.log("Clearing all browser session cache...");
    localStorage.clear();
    sessionStorage.clear();
    indexedDB.deleteDatabase("supabase.auth.token");
  }, []);

  // Sign out user completely
  const signOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Error during sign out:", err);
    } finally {
      setUser(null);
      setProfile(null);
      setSession(null);
      clearBrowserCache();
      navigate("/login");
    }
  }, [clearBrowserCache, navigate]);

  // Fetch user profile
  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data, error, status } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error && status !== 406) throw error;
      return data as UserProfile | null;
    } catch (err) {
      logError(parseSupabaseError(err as Error));
      return null;
    }
  }, []);

  // Sign up new user
  const signUp = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) return { user: null, error: parseSupabaseError(error) };
      return { user: data.user ?? null, error: null };
    } catch (err) {
      return { user: null, error: parseSupabaseError(err as Error) };
    }
  }, []);

  // Sign in existing user
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) return { user: null, error: parseSupabaseError(error) };
      return { user: data.user ?? null, error: null };
    } catch (err) {
      return { user: null, error: parseSupabaseError(err as Error) };
    }
  }, []);

  // Reset password
  const resetPassword = useCallback(async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      return { error: error ? parseSupabaseError(error) : null };
    } catch (err) {
      return { error: parseSupabaseError(err as Error) };
    }
  }, []);

  // Update user profile
  const updateProfile = useCallback(
    async (updates: Partial<UserProfile>) => {
      if (!user) {
        return {
          profile: null,
          error: {
            message: "User not authenticated",
            severity: "medium",
            category: "authentication",
            timestamp: new Date(),
            retryable: false,
            retryCount: 0,
            maxRetries: 0,
          } as AppError,
        };
      }
      try {
        const { data, error } = await supabase
          .from("profiles")
          .update(updates)
          .eq("id", user.id)
          .select()
          .single();

        if (error) return { profile: null, error: parseSupabaseError(error) };
        setProfile(data);
        return { profile: data as UserProfile, error: null };
      } catch (err) {
        return { profile: null, error: parseSupabaseError(err as Error) };
      }
    },
    [user]
  );

  // Refresh session manually
  const refreshSession = useCallback(async () => {
    const { data, error } = await supabase.auth.refreshSession();
    if (!error && data.session) {
      setSession(data.session);
      setUser(data.session.user);
    }
  }, []);

  // Role-based permissions
  const hasRole = useCallback(
    (role: string) => profile?.role === role,
    [profile]
  );

  const hasPermission = useCallback(
    (_permission: string): boolean => {
      if (!profile || !profile.role) return false;

      const permissions: Record<UserRole, string[]> = {
        admin: ["*"],
        editor: ["read", "write", "moderate", "delete_own", "upload_journal"],
        user: ["read", "write_own", "delete_own"],
      };

      const userPermissions = permissions[profile.role] || [];
      return (
        userPermissions.includes("*") || userPermissions.includes(_permission)
      );
    },
    [profile]
  );

  // Handle session changes
  // Robust session/profile handler: always resolves isInitialized
  const handleSessionChange = useCallback(
    async (newSession: Session | null) => {
      try {
        if (!newSession?.user) {
          setUser(null);
          setProfile(null);
          setSession(null);
          lastUserIdRef.current = null;
          setIsInitialized(true);
          setIsLoading(false);
          return;
        }
        // Avoid duplicate fetch
        if (lastUserIdRef.current === newSession.user.id) {
          setIsInitialized(true);
          setIsLoading(false);
          return;
        }
        setIsLoading(true);
        const userProfile = await fetchUserProfile(newSession.user.id);
        if (userProfile) {
          setUser(newSession.user);
          setProfile(userProfile);
          setSession(newSession);
          lastUserIdRef.current = newSession.user.id;
        } else {
          setUser(null);
          setProfile(null);
          setSession(null);
          lastUserIdRef.current = null;
        }
      } finally {
        setIsInitialized(true);
        setIsLoading(false);
      }
    },
    [fetchUserProfile]
  );

  // Initialize authentication
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      if (isMounted) {
        handleSessionChange(initialSession);
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        if (isMounted) {
          handleSessionChange(newSession);
        }
      }
    );
    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [handleSessionChange]);

  const contextValue: AuthContextType = {
    user,
    profile,
    session,
    isAuthenticated,
    isLoading,
    isInitialized,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,
    refreshSession,
    hasRole,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
