import { Suspense, useEffect } from "react";
import { useRoutes, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home";
import ProductAnalytics from "./components/ProductAnalytics";
import SessionReplay from "./components/SessionReplay";
import EffortAnalysis from "./components/EffortAnalysis";
import DashboardPage from "./components/Dashboard/DashboardPage";
import AuthPage from "./components/Auth/AuthPage";
import ProductPage from "./components/ProductFeatures/ProductPage";
import NotFound from "./components/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingSpinner from "./components/LoadingSpinner";
import { AuthProvider } from "./contexts/AuthContext";
import { trackPageView } from "./utils/analytics";
import routes from "tempo-routes";

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    // Track page views for analytics
    trackPageView(location.pathname);
  }, [location]);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" text="Loading application..." />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-analytics" element={<ProductAnalytics />} />
        <Route path="/session-replay" element={<SessionReplay />} />
        <Route path="/effort-analysis" element={<EffortAnalysis />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/login" element={<AuthPage initialTab="login" />} />
        <Route path="/signup" element={<AuthPage initialTab="signup" />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </Suspense>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
