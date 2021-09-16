import React from "react";
import { StatusBar, useWindowDimensions } from "react-native";

import { useRoute } from "@react-navigation/core";
import { Container, Content, Title, Message, Footer } from "./styles";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { ConfirmButton } from "../../components/ConfirmButton";
import { useNavigation } from "@react-navigation/native";
import { StackRoutesParamList } from "../../routes/stack.routes";

export const useConfirmationParams = () => {
  const {
    params: { title, message, nextScreenRoute },
  } = useRoute<StackRoutesParamList<"Confirmation">>();
  return { title, message, nextScreenRoute };
};

export const Confirmation: React.FC = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const { title, message, nextScreenRoute } = useConfirmationParams();

  const handleConfirmRental = () => {
    navigation.navigate(nextScreenRoute as never);
  };

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" onPress={handleConfirmRental} />
      </Footer>
    </Container>
  );
};
