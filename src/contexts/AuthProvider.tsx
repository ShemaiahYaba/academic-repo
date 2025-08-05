// src/contexts/AuthProvider.tsx

import {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";
import { supabase } from "@/lib/supabase";
import type { User, Session } from "@supabase/supabase-js";
import type { AuthContextType, UserProfile, AppError } from "@/types/global";
import { parseSupabaseError, logError } from "@/utils/errorHandler";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const navigate = useNavigate();
  const isAuthenticated = !!user && !!profile;

  // 🔹 Clears browser cache to avoid stale sessions
  const clearBrowserCache = useCallback(() => {
    console.log("Clearing all browser session cache...");
    localStorage.clear();
    sessionStorage.clear();
    indexedDB.deleteDatabase("supabase.auth.token");
  }, []);

  // 🔹 Handles sign out completely
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

  // 🔹 Fetch user profile from DB
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

  // 🔹 Sign up new user
  const signUp = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        return { user: null, error: parseSupabaseError(error) };
      }
      return { user: data.user ?? null, error: null };
    } catch (err) {
      return { user: null, error: parseSupabaseError(err as Error) };
    }
  }, []);

  // 🔹 Sign in existing user
  const signIn = useCallback(async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        return { user: null, error: parseSupabaseError(error) };
      }
      return { user: data.user ?? null, error: null };
    } catch (err) {
      return { user: null, error: parseSupabaseError(err as Error) };
    }
  }, []);

  // 🔹 Reset password
  const resetPassword = useCallback(async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      return { error: error ? parseSupabaseError(error) : null };
    } catch (err) {
      return { error: parseSupabaseError(err as Error) };
    }
  }, []);

  // 🔹 Update user profile
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

        if (error) {
          return { profile: null, error: parseSupabaseError(error) };
        }
        setProfile(data);
        return { profile: data as UserProfile, error: null };
      } catch (err) {
        return { profile: null, error: parseSupabaseError(err as Error) };
      }
    },
    [user]
  );

  // 🔹 Refresh session manually
  const refreshSession = useCallback(async () => {
    const { data, error } = await supabase.auth.refreshSession();
    if (!error && data.session) {
      setSession(data.session);
      setUser(data.session.user);
    }
  }, []);

  // 🔹 Role-based access control
  const hasRole = useCallback(
    (role: string) => profile?.role === role,
    [profile]
  );

  const hasPermission = useCallback(
    (_permission: string): boolean => {
      if (!profile) return false;

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

  // 🔹 Initialize authentication
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);

      const {
        data: { session: initialSession },
      } = await supabase.auth.getSession();

      if (initialSession?.user) {
        const userProfile = await fetchUserProfile(initialSession.user.id);
        if (userProfile) {
          setUser(initialSession.user);
          setProfile(userProfile);
          setSession(initialSession);
        } else {
          await signOut();
        }
      }

      setIsInitialized(true);
      setIsLoading(false);
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      console.log(`Auth event: ${event}`);
      setIsLoading(true);

      if (event === "SIGNED_IN" && newSession?.user) {
        const userProfile = await fetchUserProfile(newSession.user.id);
        if (userProfile) {
          setUser(newSession.user);
          setProfile(userProfile);
          setSession(newSession);
        } else {
          await signOut();
        }
      } else if (event === "SIGNED_OUT") {
        await signOut();
      } else if (event === "TOKEN_REFRESHED" && newSession?.user) {
        const userProfile = await fetchUserProfile(newSession.user.id);
        if (userProfile) {
          setUser(newSession.user);
          setProfile(userProfile);
          setSession(newSession);
        } else {
          await signOut();
        }
      }

      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [fetchUserProfile, signOut]);

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
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
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
