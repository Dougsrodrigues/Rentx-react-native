import { useNavigation } from "@react-navigation/native";
import React, { useMemo } from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { CarCard } from "../../components/CarCard";

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CardList,
} from "./styles";

export const Home: React.FC = () => {
  const navigation = useNavigation();

  const carDataOne = {
    branding: "Audi",
    name: "RS 5 Coupé",
    rent: {
      period: "Ao dia",
      price: "120",
    },

    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW4ivWJhEM56Hb89IVzJXjei87nIgvCeOpYt2RomEiAW9wfPfOZVjU0s4hF9Fnx3XmIw8&usqp=CAU",
  };

  const handleCarDetails = () => {
    navigation.navigate("CarDetails" as never);
  };

  const cardListMemo = useMemo(
    () => (
      <CardList
        keyExtractor={(item) => String(item)}
        data={[1, 2, 3, 4, 5, 6, 7, 8]}
        renderItem={({ item }) => (
          <CarCard data={carDataOne} onPress={handleCarDetails} />
        )}
      />
    ),
    []
  );

  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Header>
        <HeaderContent>
          <Logo width={RFValue(108)} height={RFValue(12)} />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>

      {cardListMemo}
    </Container>
  );
};
