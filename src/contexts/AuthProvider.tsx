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
   * Fetch user profile from database
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
   * Initialize authentication state
   */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const {
          data: { session: initialSession },
        } = await supabase.auth.getSession();

        if (initialSession?.user) {
          setUser(initialSession.user);
          setSession(initialSession);
          setProfile(await fetchUserProfile(initialSession.user.id));
        }
      } catch (err) {
        logError(parseSupabaseError(err as Error));
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

      if (session?.user) {
        setUser(session.user);
        setSession(session);

        // Just fetch profile (trigger handles creation)
        const userProfile = await fetchUserProfile(session.user.id);
        setProfile(userProfile);
      } else {
        setUser(null);
        setProfile(null);
        setSession(null);
      }

      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchUserProfile]);

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
   * Sign out
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

      setUser(null);
      setProfile(null);
      setSession(null);
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
