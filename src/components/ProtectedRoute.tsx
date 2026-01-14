import { Navigate } from "react-router-dom";
import { useAuthStore } from "../modules/auth/auth.store";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, token, logout } = useAuthStore();

  if (!token || !isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (Date.now() > token.expiresAt) {
    logout();
    return <Navigate to="/" replace />;
  }

  return children;
};

export { ProtectedRoute };