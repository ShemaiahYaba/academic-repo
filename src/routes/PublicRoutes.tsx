// routes/PublicRoutes.tsx
import { Route, Routes } from "react-router-dom";
import AuthForm from "@/pages/AuthForm";

const PublicRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/login" element={<AuthForm />} />
    </Routes>
  </>
);

export default PublicRoutes;
