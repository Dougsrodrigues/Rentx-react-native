import React, { useLayoutEffect, useMemo, useState, useEffect } from "react";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";

import { StatusBar, StyleSheet, BackHandler } from "react-native";
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
} from "./styles";

import { CarDTO } from "../../dtos/CarDTO";
import { LoadAnimation } from "../../components/LoadAnimation";
import { useNavigationHooks } from "../../hooks/NavigationHooks";
import { useTheme } from "styled-components/native";
import { RectButton, PanGestureHandler } from "react-native-gesture-handler";

export const Home: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigationHooks();
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);
  const myCarButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value },
      ],
    };
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any) {
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },

    onActive(event, ctx: any) {
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },

    onEnd() {
      positionX.value = withSpring(0);
      positionY.value = withSpring(0);
    },
  });

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

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", () => true);
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
          {!loading && <TotalCars>Total de {cars.length} carros</TotalCars>}
        </HeaderContent>
      </Header>

      {loading ? <LoadAnimation /> : cardListMemo}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarButtonStyle,
            {
              position: "absolute",
              bottom: 13,
              right: 22,
            },
          ]}
        >
          <ButtonAnimated
            onPress={handleOpenMyCars}
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons
              name="ios-car-sport"
              size={32}
              color={theme.colors.shape}
            />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
};

const ButtonAnimated = Animated.createAnimatedComponent(RectButton);

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
