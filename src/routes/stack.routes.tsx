import React, { FC } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { SchedulingComplete } from "../screens/SchedulingComplete";

import { CarDTO } from "../dtos/CarDTO";
import { RouteProp } from "@react-navigation/native";
import { MyCars } from "../screens/MyCars";
import { Splash } from "../screens/Splash";

export type StackRoutesParams = {
  Splash: undefined;
  Home: undefined;
  CarDetails: { car: CarDTO };
  Scheduling: { car: CarDTO };
  SchedulingDetails: {
    car: CarDTO;
    dates: string[];
  };
  SchedulingComplete: undefined;
  MyCars: undefined;
};

const Screen = createNativeStackNavigator<StackRoutesParams>();

export type StackRoutesParamList<T extends keyof StackRoutesParams> = RouteProp<
  StackRoutesParams,
  T
>;

export function StackRoutes() {
  return (
    <Screen.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <Screen.Screen name="Splash" component={Splash} />
      <Screen.Screen
        name="Home"
        component={Home}
        options={{ gestureEnabled: false }}
      />
      <Screen.Screen name="CarDetails" component={CarDetails} />
      <Screen.Screen name="Scheduling" component={Scheduling} />
      <Screen.Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen.Screen name="SchedulingComplete" component={SchedulingComplete} />
      <Screen.Screen name="MyCars" component={MyCars} />
    </Screen.Navigator>
  );
}
