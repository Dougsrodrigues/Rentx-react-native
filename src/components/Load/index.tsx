import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components/native";

interface LoadProps {
  color?: string;
  size?: number;
}

export const Load: React.FC<LoadProps> = ({ color, size }) => {
  const theme = useTheme();
  return (
    <ActivityIndicator
      color={color ? color : theme.colors.main}
      size={size ? size : "large"}
      style={{ flex: 1 }}
    />
  );
};
