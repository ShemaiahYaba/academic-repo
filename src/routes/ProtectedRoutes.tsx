// routes/ProtectedRoutes.tsx
import { Route, Routes } from "react-router-dom";
import Layout from "@/components/Layout";
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
          <Layout>
            <Home />
          </Layout>
        }
      />
      <Route
        path="/journals"
        element={
          <Layout>
            <Journals />
          </Layout>
        }
      />
      <Route
        path="/articles"
        element={
          <Layout>
            <Articles />
          </Layout>
        }
      />
      <Route
        path="/post"
        element={
          <Layout>
            <Post />
          </Layout>
        }
      />
      <Route
        path="/editorialteam"
        element={
          <Layout>
            <EditorialTeam />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <About />
          </Layout>
        }
      />
      <Route
        path="/journal/:id"
        element={
          <Layout>
            <JournalDetail />
          </Layout>
        }
      />
      <Route
        path="/notifications"
        element={
          <Layout>
            <Notification />
          </Layout>
        }
      />
      <Route
        path="/profile"
        element={
          <Layout>
            <Profile />
          </Layout>
        }
      />
      <Route
        path="/support"
        element={
          <Layout>
            <Support />
          </Layout>
        }
      />
      <Route
        path="/upload-journal"
        element={
          <Layout>
            <UploadJournal />
          </Layout>
        }
      />
    </Routes>
  </>
);

export default ProtectedRoutes;
