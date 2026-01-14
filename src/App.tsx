import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./modules/auth/auth.page";
import FlowPage from "./modules/flow/flow.page";
import SplashScreen from "./components/SplashScreen";
import { useAuthStore } from "./modules/auth/auth.store";
import { useEffect } from "react";
import { useSplashStore } from "./hooks/splash.hook";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import DashboardPage from "./modules/dashboard/dashboard.page";

function App() {
  const checkToken = useAuthStore((s) => s.checkToken);
  const showSplash = useSplashStore((s) => s.showSplash);

  useEffect(() => {
    checkToken();
  }, [checkToken]);

  if (showSplash) {
    return <SplashScreen />;
  }
  if (showSplash) {
    return <SplashScreen />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="flow" element={<FlowPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;