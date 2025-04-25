// routes/AppRoutes.tsx
import { Suspense, useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthProvider";
import { supabase } from "@/supabaseClient";
import Preloader from "@/components/Preloader";

import ProtectedRoutes from "@/routes/ProtectedRoutes";
import PublicRoutes from "@/routes/PublicRoutes";

const AppRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }: { data: { session: import('@supabase/supabase-js').Session | null } }) => {
      const session: import('@supabase/supabase-js').Session | null = data.session;
      setIsAuthenticated(!!session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event: import('@supabase/supabase-js').AuthChangeEvent, session: import('@supabase/supabase-js').Session | null) => {
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
