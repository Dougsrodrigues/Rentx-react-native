import React from "react";

import GasolineSvg from "../../assets/gasoline.svg";

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

interface Car {
  branding: string;
  name: string;
  rent: {
    period: string;
    price: string;
  };
  thumbnail: string;
}

interface CarCardProps {
  data: Car;
}

export const CarCard: React.FC<CarCardProps> = ({ data }) => {
  return (
    <Container>
      <Details>
        <Branding>{data.branding}</Branding>
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
