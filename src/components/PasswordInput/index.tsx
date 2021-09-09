import React, { useState } from "react";
import Feather from "@expo/vector-icons/build/Feather";
import { useTheme } from "styled-components";

import { TextInputProps } from "react-native";

import {
  Container,
  InputText,
  IconContainer,
  ChangePasswordVisibleButton,
} from "./styles";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
}

export const PasswordInput: React.FC<InputProps> = ({ iconName, ...rest }) => {
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  function handlePasswordVisibleChange() {
    setIsPasswordVisible(!isPasswordVisible);
  }

  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text_detail} />
      </IconContainer>

      <InputText {...rest} secureTextEntry={isPasswordVisible} />

      <ChangePasswordVisibleButton onPress={handlePasswordVisibleChange}>
        <IconContainer withoutMargin>
          <Feather
            name={isPasswordVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text_detail}
          />
        </IconContainer>
      </ChangePasswordVisibleButton>
    </Container>
  );
};
