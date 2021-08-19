import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import GasolineSvg from "../../assets/gasoline.svg";
import { CarDTO } from "../../dtos/CarDTO";

import {
  Container,
  Details,
  Branding,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from "./styles";

interface CarCardProps extends RectButtonProps {
  data: CarDTO;
}

export const CarCard: React.FC<CarCardProps> = ({ data, ...rest }) => {
  return (
    <Container {...rest}>
      <Details>
        <Branding>{data.brand}</Branding>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>

          <Type>
            <GasolineSvg />
          </Type>
        </About>
      </Details>

      <CarImage
        resizeMode="contain"
        source={{
          uri: data.thumbnail,
        }}
      />
    </Container>
  );
};
