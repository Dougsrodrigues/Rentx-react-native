import React from "react";
import { useWindowDimensions } from "react-native";

import { Container, Content, Title, Message, Footer } from "./styles";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";
import { ConfirmButton } from "../../components/ConfirmButton";

export const SchedulingComplete: React.FC = () => {
  const { width, height } = useWindowDimensions();

  return (
    <Container>
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>Carro Alugado</Title>

        <Message>
          Agora você so precisa ir {"\n"} até a concessonaria da RENTX
        </Message>
      </Content>

      <Footer>
        <ConfirmButton title="OK" />
      </Footer>
    </Container>
  );
};
