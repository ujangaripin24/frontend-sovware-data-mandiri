import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "./modules/auth/auth.page";
import FlowPage from "./modules/flow/flow.page";
import { HeroUIProvider } from '@heroui/react';

function App() {
  return (
    <HeroUIProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/flow" element={<FlowPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </HeroUIProvider>
  );
}

export default App;