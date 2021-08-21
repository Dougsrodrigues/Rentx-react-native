import React, { memo, useMemo } from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import GasolineSvg from "../../assets/gasoline.svg";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoryIcon } from "../../utils/getAccessory";

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
  const MotorIcon = getAccessoryIcon(data.fuel_type);

  return (
    <Container {...rest}>
      <Details>
        <Branding>{data.brand}</Branding>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data?.rent?.period}</Period>
            <Price>{`R$ ${data?.rent?.price}`}</Price>
          </Rent>

          <Type>
            <MotorIcon />
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
