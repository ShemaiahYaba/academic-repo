import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "@/providers/AppProvider";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { NotificationContainer } from "@/components/NotificationContainer";
import { GlobalLoadingSpinner } from "@/components/LoadingSpinner";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <BrowserRouter>
      <AppProvider>
        <App />
        <NotificationContainer />
        <GlobalLoadingSpinner />
      </AppProvider>
    </BrowserRouter>
  </ErrorBoundary>
);
