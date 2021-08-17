import React from "react";
import { useTheme } from "styled-components/native";
import { BackButton } from "../../components/BackButton";

import ArrowSvg from "../../assets/arrow.svg";

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateTitle,
  DateInfo,
  DateValue,
  Content,
  Footer,
} from "./styles";
import { StatusBar } from "react-native";
import { Button } from "../../components/Button";
import { Calendar } from "../../components/Calendar";

export const Scheduling: React.FC = () => {
  const theme = useTheme();
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton onPress={() => {}} color={theme.colors.shape} />
        <Title>
          Escolha uma {"\n"} data de início e {"\n"} fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected>18/06/2021</DateValue>
          </DateInfo>

          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={false}></DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>
      <Footer>
        <Button title="Confirmar" />
      </Footer>
    </Container>
  );
};
