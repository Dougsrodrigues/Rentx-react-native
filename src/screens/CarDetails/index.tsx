import React from "react";
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
} from "./styles";

export const CarDetails: React.FC = () => {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>

      <CarImages>
        <ImageSlider
          imageUrl={[
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW4ivWJhEM56Hb89IVzJXjei87nIgvCeOpYt2RomEiAW9wfPfOZVjU0s4hF9Fnx3XmIw8&usqp=CAU",
          ]}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>Lamborghini</Brand>
            <Name>Huracan</Name>
          </Description>
          <Rent>
            <Period>Ao dia</Period>
            <Price>R$ 580</Price>
          </Rent>
        </Details>

        <About>
          lorem ipsum dolor sit amet,lorem ipsum dolor sit amet ,lorem ipsum
          dolor sit amet,lorem ipsum dolor sit amet ,lorem ipsum dolor sit
          amet,lorem ipsum dolor sit amet ,lorem ipsum dolor sit amet,lorem
          ipsum dolor sit amet
        </About>
      </Content>
    </Container>
  );
};
