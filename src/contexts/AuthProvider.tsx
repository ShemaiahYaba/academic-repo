
// contexts/AuthProvider.tsx
import {
  useEffect,
  useState,
  useCallback,
  createContext,
  useContext,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import type { AuthContextType, UserProfile, AppError } from "@/types/global";
import { parseSupabaseError, logError } from "@/utils/errorHandler";
import { useNavigate } from "react-router-dom";

// Create the AuthContext with a default undefined value
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

  /**
   * FIX: A single, robust function to clear all session data from the browser.
   * This is crucial for preventing stale data from causing issues.
   * Supabase uses localStorage and sometimes IndexedDB for session persistence.
   */
  const clearBrowserCache = useCallback(() => {
    console.log("Clearing all browser session cache...");
    localStorage.clear();
    sessionStorage.clear();
    // Supabase's default DB name for auth is 'supabase.auth.token'
    // but clearing all indexedDBs is safer if the name changes.
    indexedDB.open("supabase.auth.token").onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      db.close();
      indexedDB.deleteDatabase("supabase.auth.token");
    };
  }, []);

  /**
   * FIX: The signOut function is now the single source of truth for logging out.
   * It calls the Supabase client, clears React state, and wipes the browser cache.
   */
  const signOut = useCallback(async () => {
    console.log("Signing out and clearing session...");
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setSession(null);
    clearBrowserCache();
    // Redirect to login to ensure a clean state.
    navigate("/login");
  }, [clearBrowserCache, navigate]);

  /**
   * Fetches the user profile from the database.
   * This function is the core of our session validation logic.
   * @param userId - The ID of the user to fetch.
   * @returns The user profile or null if not found or on error.
   */
  const fetchUserProfile = useCallback(async (userId: string) => {
    try {
      const { data, error, status } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      // If RLS prevents access or the row doesn't exist, Supabase returns an error.
      if (error && status !== 406) {
        // 406 is a "Not Acceptable" error when single() finds no rows, which is expected.
        throw error;
      }

      return data; // Returns profile data or null
    } catch (err) {
      logError(parseSupabaseError(err as Error));
      return null;
    }
  }, []);

  /**
   * FIX: The main initialization and session validation logic.
   * This runs only once when the component mounts.
   */
  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);

      // 1. Attempt to get the session from Supabase's cache.
      const { data: { session: initialSession } } = await supabase.auth.getSession();

      // 2. Validate the session.
      if (initialSession?.user) {
        const userProfile = await fetchUserProfile(initialSession.user.id);

        // 3. If a profile exists, the session is valid.
        if (userProfile) {
          setUser(initialSession.user);
          setProfile(userProfile);
          setSession(initialSession);
        } else {
          // 4. If no profile, the session is stale or invalid. Force sign-out.
          console.warn("Session found, but no matching profile. Forcing sign-out.");
          await signOut();
        }
      }

      setIsInitialized(true);
      setIsLoading(false);
    };

    initializeAuth();

    /**
     * FIX: The onAuthStateChange listener now acts as a real-time session guard.
     */
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        setIsLoading(true);
        console.log(`Auth event: ${event}`);

        if (event === "SIGNED_IN" && newSession?.user) {
          const userProfile = await fetchUserProfile(newSession.user.id);
          if (userProfile) {
            setUser(newSession.user);
            setProfile(userProfile);
            setSession(newSession);
          } else {
            // This can happen during signup if the profile trigger is slow.
            // Or if a user signs in but their profile was deleted.
            console.warn("SIGNED_IN event, but no profile found. Waiting or signing out.");
            // Optional: Add a small delay/retry here for new signups.
            // For now, we treat it as invalid.
            await signOut();
          }
        } else if (event === "SIGNED_OUT") {
          await signOut();
        } else if (event === "TOKEN_REFRESHED" && newSession?.user) {
          // A token refresh is a good time to re-validate the session.
          const userProfile = await fetchUserProfile(newSession.user.id);
          if (!userProfile) {
            console.warn("Token refreshed, but profile is gone. Forcing sign-out.");
            await signOut();
          } else {
            // Session is still valid, update state.
            setSession(newSession);
            setUser(newSession.user);
            setProfile(userProfile);
          }
        }
        setIsLoading(false);
      }
    );

    // Cleanup the subscription on component unmount.
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
    signOut,
    // Include other methods like signIn, signUp if they are defined here
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

/**
 * Custom hook to use the AuthContext.
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
