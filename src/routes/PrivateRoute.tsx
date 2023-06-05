import { ReactNode, useContext } from "react";
import { AuthContext } from "../context/auth";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/signup" />;
  }
  return <>{children}</>;
}
