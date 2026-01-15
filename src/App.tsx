import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./modules/auth/auth.page";
import SplashScreen from "./components/SplashScreen";
import { useAuthStore } from "./modules/auth/auth.store";
import { useEffect } from "react";
import { useSplashStore } from "./hooks/splash.hook";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import DashboardPage from "./modules/dashboard/dashboard.page";
import AlertModalExpireToken from "./modules/auth/components/AlertModalExpireToken";
import DesignClassPage from "./modules/design/design-class.page";
import MonitorPage from "./modules/monitor/monitor.page";
import UserPage from "./modules/user/user.page";

function App() {
  const checkToken = useAuthStore((s) => s.checkToken);
  const showSplash = useSplashStore((s) => s.showSplash);

  useEffect(() => {
    checkToken();
    const interval = setInterval(checkToken, 10_000);
    return () => clearInterval(interval);
  }, [checkToken]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      <BrowserRouter>
        <AlertModalExpireToken />
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
            <Route path="design" element={<DesignClassPage />} />
            <Route path="monitor" element={<MonitorPage />} />
            <Route path="user" element={<UserPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App;