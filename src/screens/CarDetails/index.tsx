import React from "react";
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
  About,
  Accessories,
  Footer,
} from "./styles";

import { Button } from "../../components/Button";
import { useNavigationHooks } from "../../hooks/NavigationHooks";
import { useRoute } from "@react-navigation/native";
import { StackRoutesParamList } from "../../routes/stack.routes";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessory";

export const useCar = () => {
  const {
    params: { car },
  } = useRoute<StackRoutesParamList<"CarDetails">>();
  return car as CarDTO;
};

export const CarDetails: React.FC = () => {
  const navigation = useNavigationHooks();

  const car = useCar();

  const handleConfirmRental = () => {
    navigation.navigate("Scheduling", { car });
  };

  const handleBackNavigator = () => {
    navigation.goBack();
  };

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

        <About>{car.about}</About>
      </Content>
      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
};
