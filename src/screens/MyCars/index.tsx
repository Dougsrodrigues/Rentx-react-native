import React, { useLayoutEffect, useMemo, useState } from "react";
import { Alert, StatusBar } from "react-native";
import { useTheme } from "styled-components/native";
import { BackButton } from "../../components/BackButton";
import { CarCard } from "../../components/CarCard";
import { CarDTO } from "../../dtos/CarDTO";
import { useNavigationHooks } from "../../hooks/NavigationHooks";
import { api } from "../../services/api";
import { AntDesign } from "@expo/vector-icons";

import {
  Container,
  Header,
  SubTitle,
  Title,
  Content,
  Appointments,
  AppointmentTitle,
  AppointmentQuantity,
  CardList,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from "./styles";
import { Load } from "../../components/Load";

export interface CarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export const MyCars: React.FC = () => {
  const theme = useTheme();

  const navigation = useNavigationHooks();
  const [cars, setCars] = useState<CarProps[]>([]);

  const [loading, setLoading] = useState(true);

  const handleCarDetails = (car: CarDTO) =>
    navigation.navigate("CarDetails", { car });

  const cardListMemo = useMemo(
    () => (
      <CarWrapper>
        <CardList
          keyExtractor={(item) => String(item.id)}
          data={cars}
          renderItem={({ item }) => (
            <>
              <CarCard
                data={item.car}
                onPress={() => handleCarDetails(item.car)}
              />
              <CarFooter>
                <CarFooterTitle>Período</CarFooterTitle>
                <CarFooterPeriod>
                  <CarFooterDate>{item.startDate}</CarFooterDate>
                  <AntDesign
                    name="arrowright"
                    size={20}
                    color={theme.colors.title}
                    style={{ marginHorizontal: 10 }}
                  />
                  <CarFooterDate>{item.endDate}</CarFooterDate>
                </CarFooterPeriod>
              </CarFooter>
            </>
          )}
        />
      </CarWrapper>
    ),
    [cars]
  );

  useLayoutEffect(() => {
    const getCars = async () => {
      try {
        const { data } = await api.get("/schedules_byuser?user_id=1");
        setCars(data);
      } catch (error) {
        Alert.alert("error ao tentar carregar a pagina");
      } finally {
        setLoading(false);
      }
    };

    getCars();
  }, []);

  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton color={theme.colors.shape} />
        <Title>Seus agendamentos, {"\n"}estão aqui</Title>
        <SubTitle>Conforto, segurança e praticidade</SubTitle>
      </Header>

      <Content>
        <Appointments>
          <AppointmentTitle>Agendamentos feitos</AppointmentTitle>
          <AppointmentQuantity>{cars.length}</AppointmentQuantity>
        </Appointments>
        {loading ? <Load /> : cardListMemo}
      </Content>
    </Container>
  );
};
