import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "styled-components/native";

import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceDetails,
  RentalPriceLabel,
  RentalPriceQuota,
  RentalPriceTotal,
} from "./styles";

import { Button } from "../../components/Button";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigationHooks } from "../../hooks/NavigationHooks";

import { getAccessoryIcon } from "../../utils/getAccessory";
import { useRoute } from "@react-navigation/native";
import { StackRoutesParamList } from "../../routes/stack.routes";
import { useEffect } from "react";
import { getPlatformDate } from "../../utils/getPlataformDate";
import { format } from "date-fns";
import { api } from "../../services/api";
import { Alert } from "react-native";

interface RentalPeriod {
  start: string;
  end: string;
}

interface GetCarByIdPeriod {
  id: string;
  unavailable_dates: string[];
}

const useCar = () => {
  const {
    params: { car, dates },
  } = useRoute<StackRoutesParamList<"SchedulingDetails">>();
  return { car, dates };
};

export const SchedulingDetails: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>(
    {} as RentalPeriod
  );
  const theme = useTheme();
  const navigation = useNavigationHooks();
  const { car, dates } = useCar();

  const rentTotal = Number(dates.length * car.rent.price);

  const handleConfirmRental = async () => {
    setLoading(true);
    const schedulesByCar = await api.get<GetCarByIdPeriod>(
      `/schedules_bycars/${car.id}`
    );

    const unavailableDates = [...schedulesByCar.data.unavailable_dates];

    Promise.all([
      api.post("schedules_byuser", {
        user_id: 1,
        car,
        startDate: rentalPeriod.start,
        endDate: rentalPeriod.end,
      }),
      api.put(`/schedules_bycars/${car.id}`, {
        id: car.id,
        unavailable_dates: unavailableDates,
      }),
    ])
      .then(() => {
        navigation.navigate("SchedulingComplete" as never);
      })
      .catch(() => {
        Alert.alert("Não foi possível agendar.");
      })
      .finally(() => setLoading(false));
  };

  const handleBackNavigator = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setRentalPeriod({
      start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
      end: format(
        getPlatformDate(new Date(dates[dates.length - 1])),
        "dd/MM/yyyy"
      ),
    });
  }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={handleBackNavigator} />
      </Header>

      <CarImages>
        <ImageSlider imageUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>
          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          {car?.accessories &&
            car.accessories.map((accessory) => (
              <Accessory
                name={accessory.name}
                icon={getAccessoryIcon(accessory.type)}
                key={accessory.type}
              />
            ))}
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.start}</DateValue>
          </DateInfo>

          <Feather
            name="chevron-right"
            size={RFValue(10)}
            color={theme.colors.shape}
          />

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.end}</DateValue>
          </DateInfo>
        </RentalPeriod>

        <RentalPrice>
          <RentalPriceLabel>Total</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
            <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button
          loading={loading}
          title="Alugar Agora"
          onPress={handleConfirmRental}
          color={theme.colors.success}
        />
      </Footer>
    </Container>
  );
};
