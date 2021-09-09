import React from "react";
import { useTheme } from "styled-components";
import { Load } from "../Load";

import { Container, Title } from "./styles";

interface ButtonProps {
  title: string;
  enabled?: boolean;
  color?: string;
  onPress: () => void;
  loading?: boolean;
  light?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  color,
  enabled = true,
  loading = false,
  light = false,
  ...rest
}) => {
  const theme = useTheme();
  return (
    <Container {...rest} color={color} enabled={enabled} loading={loading}>
      {loading ? (
        <Load color={theme.colors.shape} size={10} />
      ) : (
        <Title light={light}>{title}</Title>
      )}
    </Container>
  );
};
