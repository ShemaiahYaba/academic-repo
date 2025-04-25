// routes/AppRoutes.tsx
import { Suspense, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthProvider";
import { supabase } from "../supabaseClient";
import Preloader from "../components/Preloader";

import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsAuthenticated(!!session);
        console.log("Auth change:", _event, session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthProvider>
      <Suspense fallback={<Preloader />}>
        <Routes>
          {isAuthenticated ? <ProtectedRoutes /> : <PublicRoutes />}
          <Route
            path="*"
            element={<Navigate to={isAuthenticated ? "/" : "/"} />}
          />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
};

export default AppRoutes;
