// routes/PublicRoutes.tsx
import { Route, Routes } from "react-router-dom";
import AuthForm from "@/pages/AuthForm";
import { AuthWorkflowExample } from "@/examples/AuthWorkflowExample";

const PublicRoutes = () => (
  <>
    <Routes>
      <Route path="/" element={<AuthForm />} />
      <Route path="/login" element={<AuthForm />} />
      <Route path="/auth-example" element={<AuthWorkflowExample />} />
    </Routes>
  </>
);

export default PublicRoutes;
