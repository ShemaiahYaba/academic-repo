// routes/ProtectedRoutes.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { lazy, Suspense } from "react";
import { useAuth } from "@/contexts/AuthProvider";

// ✅ Lazy-loaded pages
const Home = lazy(() => import("@/pages/Home"));
const Journals = lazy(() => import("@/pages/Journals"));
const Articles = lazy(() => import("@/pages/Articles/Articles"));
const Post = lazy(() => import("@/pages/Posts/Posts"));
const EditorialTeam = lazy(() => import("@/pages/EditorialTeam"));
const About = lazy(() => import("@/pages/About"));
const JournalDetail = lazy(() => import("@/pages/Journal/JournalDetails"));
const Notification = lazy(() => import("@/pages/Notification"));
const Profile = lazy(() => import("@/pages/Profile/Profile"));
const Support = lazy(() => import("@/pages/Support"));
const UploadJournal = lazy(() => import("@/pages/Journal/UploadJournal"));

// ✅ Route configuration
import type { UserRole } from "@/types/global";

const protectedRoutesConfig: {
  path: string;
  element: JSX.Element;
  requiredRole?: UserRole;
}[] = [
  { path: "/", element: <Home /> },
  { path: "/journals", element: <Journals /> },
  { path: "/articles", element: <Articles /> },
  { path: "/post", element: <Post /> },
  { path: "/editorialteam", element: <EditorialTeam /> },
  { path: "/about", element: <About /> },
  { path: "/journal/:id", element: <JournalDetail /> },
  { path: "/notifications", element: <Notification /> },
  { path: "/profile", element: <Profile /> },
  { path: "/support", element: <Support /> },
  { path: "/upload-journal", element: <UploadJournal />, requiredRole: "editor" },
];


const ProtectedRoutes = () => {
  console.log("ProtectedRoutes: Rendering...");
  const { isLoading, isInitialized } = useAuth();

  // ✅ Handle session restoration delay
  if (!isInitialized || isLoading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <Suspense fallback={<div className="loading-screen">Loading page...</div>}>
      <Routes>
        {protectedRoutesConfig.map(({ path, element, requiredRole }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute requiredRole={requiredRole}>
                <Layout>{element}</Layout>
              </ProtectedRoute>
            }
          />
        ))}
        {/* ✅ Redirect unknown protected paths */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default ProtectedRoutes;
