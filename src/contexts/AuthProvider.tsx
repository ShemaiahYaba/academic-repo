// contexts/AuthProvider.tsx
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { AuthContext } from "./AuthContext";
import { signUp, signIn, signOut, getCurrentUser } from "../hooks/useAuth"; // Import hooks
import { User } from "@supabase/supabase-js"; // Import User type from supabase-js

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Determine if the user is authenticated based on the `user` state
  const isAuthenticated = user !== null;

  useEffect(() => {
    // Check for the initial session and set the user
    getCurrentUser().then((response) => setUser(response.data?.user ?? null));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null); // Update the user state based on session changes
    });

    return () => subscription.unsubscribe(); // Clean up the listener when component unmounts
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated, // Provide isAuthenticated based on user state
        signUp: async (email: string, password: string) => {
          const response = await signUp(email, password);
          if (!response.data?.user) {
            throw new Error("User not found after sign up");
          }
          return response.data.user;
        },
        signIn: async (email: string, password: string) => {
          const response = await signIn(email, password);
          if (!response.data?.user) {
            throw new Error("User not found after sign in");
          }
          return response.data.user;
        },
        signOut: async () => {
          await signOut();
          setUser(null);
        },
        resetPassword: async () => {
          // Implement your reset password logic here, or call a function from useAuth
          // Example: await resetPassword(email);
          throw new Error("resetPassword not implemented");
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
