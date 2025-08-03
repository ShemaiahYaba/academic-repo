// routes/ProtectedRoutes.tsx
import { Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { lazy } from "react";

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

const ProtectedRoutes = () => (
  <>
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Home />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/journals"
        element={
          <ProtectedRoute>
            <Layout>
              <Journals />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/articles"
        element={
          <ProtectedRoute>
            <Layout>
              <Articles />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/post"
        element={
          <ProtectedRoute>
            <Layout>
              <Post />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/editorialteam"
        element={
          <ProtectedRoute>
            <Layout>
              <EditorialTeam />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/about"
        element={
          <ProtectedRoute>
            <Layout>
              <About />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/journal/:id"
        element={
          <ProtectedRoute>
            <Layout>
              <JournalDetail />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Layout>
              <Notification />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Layout>
              <Profile />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/support"
        element={
          <ProtectedRoute>
            <Layout>
              <Support />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload-journal"
        element={
          <ProtectedRoute requiredRole="admin">
            <Layout>
              <UploadJournal />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  </>
);

export default ProtectedRoutes;
