import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "styled-components";
import { BorderlessButtonProps } from "react-native-gesture-handler";

import { Container } from "./styles";
import { useNavigation } from "@react-navigation/native";

interface BackButtonProps extends BorderlessButtonProps {
  color?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({
  color,
  onPress,
  ...rest
}) => {
  const navigation = useNavigation();

  const handleBackNavigator = () => {
    navigation.goBack();
  };
  const theme = useTheme();
  return (
    <Container {...rest} onPress={onPress ? onPress : handleBackNavigator}>
      <MaterialIcons
        name="chevron-left"
        size={24}
        color={color && theme.colors.text}
      />
    </Container>
  );
};
