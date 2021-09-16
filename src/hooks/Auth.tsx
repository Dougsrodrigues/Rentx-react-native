import React, { createContext, useState, useContext } from "react";
import { api } from "../services/api";

interface User {
  id: string;
  email: string;
  name: string;
  driven_license: string;
  avatar: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  return context;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState<AuthState>({} as AuthState);

  const signIn = async ({ email, password }: SignInCredentials) => {
    const { data } = await api.post("/sessions", {
      email,
      password,
    });

    const { token, user } = data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  };

  return (
    <AuthContext.Provider value={{ user: data.user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
