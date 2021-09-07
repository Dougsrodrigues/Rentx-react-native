import React from "react";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImageSlider } from "../../components/ImageSlider";
import {
  Container,
  Header,
  CarImages,
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
import { getAccessoryIcon } from "../../utils/getAccessory";
import { StatusBar, StyleSheet } from "react-native";

export const useCar = () => {
  const {
    params: { car },
  } = useRoute<StackRoutesParamList<"CarDetails">>();
  return car;
};

export const CarDetails: React.FC = () => {
  const navigation = useNavigationHooks();

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    };
  });

  const car = useCar();

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrollY.value, [0, 100], [1, 0], Extrapolate.CLAMP),
    };
  });

  const handleConfirmRental = () => {
    navigation.navigate("Scheduling", { car });
  };

  const handleBackNavigator = () => {
    navigation.goBack();
  };

  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View style={[headerStyleAnimation, styles.header]}>
        <Header>
          <BackButton onPress={handleBackNavigator} style={styles.back} />
        </Header>

        <Animated.View style={sliderCarsStyleAnimation}>
          <ImageSlider imageUrl={car.photos} />
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: 120,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
      >
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
      </Animated.ScrollView>
      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={handleConfirmRental}
        />
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
  back: {
    marginTop: 24,
  },
});
