import { User, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
}

interface AuthProps {
  children: ReactNode;
}

// create context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: false,
});

// create provider
export const AuthProvider = ({ children }: AuthProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsLoading(false);
    });

    return subscriber;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
      }}
    >
      {!isLoading && children}
    </AuthContext.Provider>
  );
};
