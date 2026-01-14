import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./modules/auth/auth.page";
import FlowPage from "./modules/flow/flow.page";
import SplashScreen from "./components/SplashScreen";
import { useAuthStore } from "./modules/auth/auth.store";
import { useEffect } from "react";
import { useSplashStore } from "./hooks/splash.hook";
import { ProtectedRoute } from "./components/ProtectedRoute";

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
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <FlowPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;