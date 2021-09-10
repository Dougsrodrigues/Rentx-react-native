import React, { useState } from "react";
import Feather from "@expo/vector-icons/build/Feather";
import { useTheme } from "styled-components";

import { TextInputProps } from "react-native";

import { Container, InputText, IconContainer } from "./styles";

interface InputProps extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export const Input: React.FC<InputProps> = ({ iconName, value, ...rest }) => {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);

  const [isFilled, setIsFilled] = useState(false);

  function handleInputIsFocus() {
    setIsFocused(true);
  }

  function handleInputBlur() {
    setIsFocused(false);

    setIsFilled(!!value);
  }

  return (
    <Container>
      <IconContainer isFocused={isFocused}>
        <Feather
          name={iconName}
          size={24}
          color={
            isFocused || isFilled ? theme.colors.main : theme.colors.text_detail
          }
        />
      </IconContainer>

      <InputText
        onFocus={handleInputIsFocus}
        onBlur={handleInputBlur}
        isFocused={isFocused}
        {...rest}
      />
    </Container>
  );
};
