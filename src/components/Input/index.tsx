import React from "react";
import Feather from "@expo/vector-icons/build/Feather";
import { useTheme } from "styled-components";

import { TextInputProps } from "react-native";

import { Container, InputText, IconContainer } from "./styles";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
}

export const Input: React.FC<InputProps> = ({ iconName, ...rest }) => {
  const theme = useTheme();
  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </IconContainer>

      <InputText {...rest} />
    </Container>
  );
};
