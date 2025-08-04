// contexts/AuthProvider.tsx
import { useEffect, useState, useCallback } from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { AuthContext } from "./AuthContext";
import type {
  AuthContextType,
  UserProfile,
  UserRole,
  AppError,
} from "@/types/global";
import { parseSupabaseError, logError } from "@/utils/errorHandler";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const isAuthenticated = !!user;

  /**
   * Clears all local session data from the browser.
   * This is a comprehensive cleanup to prevent stale sessions.
   */
  const clearBrowserCache = () => {
    localStorage.clear();
    sessionStorage.clear();
    indexedDB.deleteDatabase("supabase-auth-modal"); // Corrected DB name
    console.log("Browser cache cleared.");
  };

  /**
   * Fetch user profile from the database.
   * This is a critical step to validate the session.
   */
  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        logError(parseSupabaseError(error));
        return null;
      }
      return data;
    } catch (err) {
      logError(parseSupabaseError(err as Error));
      return null;
    }
  }, []);

  /**
   * Sign out the user and clear all session data.
   * This function is now the single source of truth for logging out.
   */
  const signOut = useCallback(async (): Promise<{ error: AppError | null }> => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        const appError = parseSupabaseError(error);
        logError(appError);
        return { error: appError };
      }

      // Clear all application state
      setUser(null);
      setProfile(null);
      setSession(null);

      // FIX: Clear all browser storage to prevent stale sessions.
      clearBrowserCache();

      return { error: null };
    } catch (err) {
      const appError = parseSupabaseError(err as Error);
      logError(appError);
      return { error: appError };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Initialize and validate the authentication state on app load.
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Attempt to get the session from Supabase's cache
        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession();

        if (initialSession?.user) {
          // FIX: Validate the session by fetching the user's profile.
          const userProfile = await fetchUserProfile(initialSession.user.id);

          if (userProfile) {
            // If the profile exists, the session is valid.
            setUser(initialSession.user);
            setSession(initialSession);
            setProfile(userProfile);
          } else {
            // If no profile is found, the session is stale. Sign out.
            console.warn("No profile found for the current session. Signing out.");
            await signOut();
          }
        }
      } catch (err) {
        logError(parseSupabaseError(err as Error));
        // If there's an error, ensure the user is signed out.
        await signOut();
      } finally {
        setIsInitialized(true);
        setIsLoading(false);
      }
    };

    initializeAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.id);

      if (event === "SIGNED_IN" && session?.user) {
        // FIX: On sign-in, validate the session before setting the user state.
        const userProfile = await fetchUserProfile(session.user.id);
        if (userProfile) {
          setUser(session.user);
          setSession(session);
          setProfile(userProfile);
        } else {
          console.warn("Profile not found after sign-in. Signing out.");
          await signOut();
        }
      } else if (event === "SIGNED_OUT") {
        // On sign-out, clear all state and cache.
        setUser(null);
        setProfile(null);
        setSession(null);
        clearBrowserCache();
      }

      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchUserProfile, signOut]);

  // ... (the rest of the provider remains the same)
  /**
   * Sign up (relies on Supabase trigger for profile creation)
   */
  const signUp = useCallback(
    async (
      email: string,
      password: string
    ): Promise<{ user: User; error: AppError | null }> => {
      try {
        setIsLoading(true);

        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error || !data.user) {
          const appError = error
            ? parseSupabaseError(error)
            : parseSupabaseError(new Error("User creation failed"));
          logError(appError);
          throw appError;
        }

        // Allow small delay for trigger to insert profile
        let userProfile = null;
        for (let i = 0; i < 3; i++) {
          userProfile = await fetchUserProfile(data.user.id);
          if (userProfile) break;
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        setProfile(userProfile);

        return { user: data.user, error: null };
      } catch (err) {
        const appError = parseSupabaseError(err as Error);
        logError(appError);
        throw appError;
      } finally {
        setIsLoading(false);
      }
    },
    [fetchUserProfile]
  );

  /**
   * Sign in
   */
  const signIn = useCallback(
    async (
      email: string,
      password: string
    ): Promise<{ user: User | null; error: AppError | null }> => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          const appError = parseSupabaseError(error);
          logError(appError);
          return { user: null, error: appError };
        }

        if (data.user) {
          setUser(data.user);
          setSession(data.session);
          const userProfile = await fetchUserProfile(data.user.id);
          setProfile(userProfile);
        }

        return { user: data.user, error: null };
      } catch (err) {
        const appError = parseSupabaseError(err as Error);
        logError(appError);
        return { user: null, error: appError };
      } finally {
        setIsLoading(false);
      }
    },
    [fetchUserProfile]
  );

  /**
   * Reset password
   */
  const resetPassword = useCallback(
    async (email: string): Promise<{ error: AppError | null }> => {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });

        if (error) {
          const appError = parseSupabaseError(error);
          logError(appError);
          return { error: appError };
        }

        return { error: null };
      } catch (err) {
        const appError = parseSupabaseError(err as Error);
        logError(appError);
        return { error: appError };
      }
    },
    []
  );

  /**
   * Update profile
   */
  const updateProfile = useCallback(
    async (
      updates: Partial<UserProfile>
    ): Promise<{ profile: UserProfile; error: AppError | null }> => {
      if (!user) {
        const appError = parseSupabaseError(
          new Error("User not authenticated")
        );
        logError(appError);
        throw appError;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .update(updates)
          .eq("id", user.id)
          .select()
          .single();

        if (error || !data) {
          const appError = parseSupabaseError(
            error ?? new Error("Profile update failed")
          );
          logError(appError);
          throw appError;
        }

        setProfile(data);
        return { profile: data, error: null };
      } catch (err) {
        const appError = parseSupabaseError(err as Error);
        logError(appError);
        throw appError;
      }
    },
    [user]
  );

  /**
   * Refresh session
   */
  const refreshSession = useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.refreshSession();

      if (error) {
        logError(parseSupabaseError(error));
        return;
      }

      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
      }
    } catch (err) {
      logError(parseSupabaseError(err as Error));
    }
  }, []);

  /**
   * Role and permission utilities
   */
  const hasRole = useCallback(
    (role: UserRole): boolean => {
      return profile?.role === role;
    },
    [profile]
  );

  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!profile) return false;

      const permissions: Record<UserRole, string[]> = {
        admin: ["*"],
        editor: ["read", "write", "moderate", "delete_own", "upload_journal"],
        user: ["read", "write_own", "delete_own"],
      };

      const userPermissions = permissions[profile.role] || [];
      return (
        userPermissions.includes("*") || userPermissions.includes(permission)
      );
    },
    [profile]
  );

  const contextValue: AuthContextType = {
    user,
    profile,
    session,
    isAuthenticated,
    isLoading,
    isInitialized,
    signUp,
    signIn,
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