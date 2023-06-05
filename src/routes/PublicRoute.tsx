import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ReactNode } from "react";

interface PublicRouteProps {
  children: ReactNode;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const { user } = useAuth();
  if (user) {
    return <Navigate to="/" replace={true} />;
  }
  return <>{children}</>;
}
