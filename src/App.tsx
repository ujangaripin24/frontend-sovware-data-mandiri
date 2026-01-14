import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./modules/auth/auth.page";
import FlowPage from "./modules/flow/flow.page";
import { useSplashStore } from "./modules/auth/auth.type";
import SplashScreen from "./components/SplashScreen";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const showSplash = useSplashStore((s) => s.showSplash);

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