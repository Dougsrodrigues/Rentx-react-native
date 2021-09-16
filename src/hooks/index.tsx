import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { AuthProvider } from "./Auth";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <SafeAreaProvider>
    <AuthProvider>{children}</AuthProvider>
  </SafeAreaProvider>
);
