import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import ProductAnalytics from "./components/ProductAnalytics";
import SessionReplay from "./components/SessionReplay";
import EffortAnalysis from "./components/EffortAnalysis";
import DashboardPage from "./components/Dashboard/DashboardPage";
import AuthPage from "./components/Auth/AuthPage";
import routes from "tempo-routes";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product-analytics" element={<ProductAnalytics />} />
          <Route path="/session-replay" element={<SessionReplay />} />
          <Route path="/effort-analysis" element={<EffortAnalysis />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<AuthPage initialTab="login" />} />
          <Route path="/signup" element={<AuthPage initialTab="signup" />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
