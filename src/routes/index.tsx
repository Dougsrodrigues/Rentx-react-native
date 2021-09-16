import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { StackRoutes } from "./stack.routes";
import { useAuth } from "../hooks/Auth";
import { AuthRoutes } from "./auth.routes";
import { BottomTabRoutes } from "./bottomTab.routes";

export const Routes: React.FC = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      {user ? <BottomTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
};
