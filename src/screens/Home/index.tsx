import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useMemo, useState } from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import Logo from "../../assets/logo.svg";
import { api } from "../../services/api";
import { CarCard } from "../../components/CarCard";

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CardList,
} from "./styles";
import { CarDTO } from "../../dtos/CarDTO";
import { Load } from "../../components/Load";

export const Home: React.FC = () => {
  const navigation = useNavigation();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCarDetails = () => {
    navigation.navigate("CarDetails" as never);
  };

  useLayoutEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await api.get<CarDTO[]>("/cars");
        setCars(data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const cardListMemo = useMemo(
    () => (
      <CardList
        keyExtractor={(item) => String(item.id)}
        data={cars}
        renderItem={({ item }) => (
          <CarCard data={item} onPress={handleCarDetails} />
        )}
      />
    ),
    [cars]
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

      {loading ? <Load /> : cardListMemo}
    </Container>
  );
};
