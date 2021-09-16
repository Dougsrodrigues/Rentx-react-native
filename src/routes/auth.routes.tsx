import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Confirmation } from "../screens/Confirmation";

import { RouteProp } from "@react-navigation/native";
import { Splash } from "../screens/Splash";
import { SignIn } from "../screens/SignIn";
import { SignUpFirstStep } from "../screens/SignUp/SignUpFirstStep";
import {
  SignUpSecondStep,
  UserPropsSignInFirstStep,
} from "../screens/SignUp/SignUpSecondStep";

export type AuthRoutesParams = {
  Splash: undefined;
  SignIn: undefined;
  SignUpFirstStep: undefined;
  SignUpSecondStep: {
    user: UserPropsSignInFirstStep;
  };
  Confirmation: {
    title: string;
    message: string;
    nextScreenRoute: "Home" | "SignIn";
  };
  MyCars: undefined;
};

const Screen = createNativeStackNavigator<AuthRoutesParams>();

export type StackRoutesParamList<T extends keyof AuthRoutesParams> = RouteProp<
  AuthRoutesParams,
  T
>;

export function AuthRoutes() {
  return (
    <Screen.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Splash"
    >
      <Screen.Screen name="Splash" component={Splash} />
      <Screen.Screen name="SignIn" component={SignIn} />
      <Screen.Screen name="SignUpFirstStep" component={SignUpFirstStep} />
      <Screen.Screen name="SignUpSecondStep" component={SignUpSecondStep} />
      <Screen.Screen name="Confirmation" component={Confirmation} />
    </Screen.Navigator>
  );
}
