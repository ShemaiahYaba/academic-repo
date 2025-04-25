// routes/PublicRoutes.tsx
import { Route } from "react-router-dom";
import AuthForm from "../pages/AuthForm";

const PublicRoutes = () => (
  <>
    <Route path="/" element={<AuthForm />} />
    <Route path="/login" element={<AuthForm />} />
  </>
);

export default PublicRoutes;
