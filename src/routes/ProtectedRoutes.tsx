// routes/ProtectedRoutes.tsx
import { Route } from "react-router-dom";
import Layout from "../components/Layout";
import Home from "../pages/Home";
import Journals from "../pages/Journals";
import Articles from "../pages/Articles";
import Post from "../pages/Post";
import EditorialTeam from "../pages/EditorialTeam";
import About from "../pages/About";
import JournalDetail from "../pages/Journal/JournalDetails";
import Notification from "../pages/Notification";
import Profile from "../pages/Profile/Profile";
import Support from "../pages/Support";
import UploadJournal from "../pages/Journal/UploadJournal";

const ProtectedRoutes = () => (
  <>
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
  </>
);

export default ProtectedRoutes;
