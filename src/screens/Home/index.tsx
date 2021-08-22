import React, { useLayoutEffect, useMemo, useState } from "react";
import { StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { Ionicons } from "@expo/vector-icons";

import Logo from "../../assets/logo.svg";
import { api } from "../../services/api";
import { CarCard } from "../../components/CarCard";

import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CardList,
  MyCarsButton,
} from "./styles";

import { CarDTO } from "../../dtos/CarDTO";
import { Load } from "../../components/Load";
import { useNavigationHooks } from "../../hooks/NavigationHooks";
import { useTheme } from "styled-components/native";

export const Home: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigationHooks();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const handleCarDetails = (car: CarDTO) =>
    navigation.navigate("CarDetails", { car });

  const handleOpenMyCars = () => {
    navigation.navigate("MyCars");
  };

  const cardListMemo = useMemo(
    () => (
      <CardList
        keyExtractor={(item) => String(item.id)}
        data={cars}
        renderItem={({ item }) => (
          <CarCard data={item} onPress={() => handleCarDetails(item)} />
        )}
      />
    ),
    [cars]
  );

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
          <TotalCars>Total de {cars.length} carros</TotalCars>
        </HeaderContent>
      </Header>

      {loading ? <Load /> : cardListMemo}

      <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
      </MyCarsButton>
    </Container>
  );
};
