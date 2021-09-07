import React from "react";

import loadCar from "../../assets/loadCar.json";
import { Container } from "./styles";

import LottieView from "lottie-react-native";
export const LoadAnimation: React.FC = () => {
  return (
    <Container>
      <LottieView
        source={loadCar}
        autoPlay
        style={{ height: 200 }}
        resizeMode="contain"
        loop
      />
    </Container>
  );
};
