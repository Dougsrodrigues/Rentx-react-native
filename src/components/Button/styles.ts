import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface ContainerButtonProps {
  color?: string;
  enabled?: boolean;
  loading?: boolean;
}

interface ButtonTextPros {
  light?: boolean;
}

export const Container = styled(RectButton)<ContainerButtonProps>`
  width: 100%;

  padding: 19px;

  margin-bottom: 8px;

  align-items: center;
  justify-content: center;

  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.main};

  ${({ enabled, loading }) =>
    (!enabled || loading) &&
    css`
      opacity: 0.5;
    `}
`;
export const Title = styled.Text<ButtonTextPros>`
  font-family: ${({ theme }) => theme.fonts.primary_500};
  font-size: ${RFValue(15)}px;
  color: ${({ theme, light }) =>
    light ? theme.colors.header : theme.colors.shape};
`;
