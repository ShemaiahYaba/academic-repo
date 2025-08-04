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
  const fetchUserProfile = useCallback(
    async (userId: string): Promise<UserProfile | null> => {
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
    },
    []
  );

  /**
   * Create user profile in database
   */
  const createUserProfile = useCallback(
    async (
      userId: string,
      email: string,
      profileData?: Partial<UserProfile>
    ): Promise<UserProfile | null> => {
      try {
        const newProfile: Partial<UserProfile> = {
          id: userId,
          email,
          role: "user",
          ...profileData,
        };

        const { data, error } = await supabase
          .from("profiles")
          .insert([newProfile])
          .select()
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
    },
    []
  );

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

        let userProfile = await fetchUserProfile(session.user.id);
        if (!userProfile) {
          userProfile = await createUserProfile(
            session.user.id,
            session.user.email!
          );
        }
        setProfile(userProfile);
      } else {
        setUser(null);
        setProfile(null);
        setSession(null);
      }

      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [fetchUserProfile, createUserProfile]);

  /**
   * Sign up
   */
  const signUp = useCallback(
    async (
      email: string,
      password: string,
      profileData?: Partial<UserProfile>
    ): Promise<{ user: User; error: AppError | null }> => {
      try {
        setIsLoading(true);

        const { data, error } = await supabase.auth.signUp({ email, password });

        if (error || !data.user) {
          const appError = error
            ? parseSupabaseError(error)
            : parseSupabaseError(new Error("User creation failed"));
          logError(appError);
          // Throw to ensure user is never null
          throw appError;
        }

        const userProfile = await createUserProfile(
          data.user.id,
          email,
          profileData
        );
        setProfile(userProfile);
        return { user: data.user, error: null };
      } catch (err) {
        const appError = parseSupabaseError(err as Error);
        logError(appError);
        // Throwing here would break the contract, so return a dummy user or rethrow
        // But to match the type, we must throw
        throw appError;
      } finally {
        setIsLoading(false);
      }
    },
    [createUserProfile]
  );

  /**
   * Sign in
   */
  const signIn = useCallback(
    async (
      email: string,
      password: string
    ): Promise<{ user: User; error: AppError | null }> => {
      try {
        setIsLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error || !data.user) {
          const appError = error
            ? parseSupabaseError(error)
            : parseSupabaseError(new Error("Sign in failed"));
          logError(appError);
          throw appError;
        }

        setProfile(await fetchUserProfile(data.user.id));
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
