import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home } from "../screens/Home";

import { RouteProp } from "@react-navigation/native";
import { MyCars } from "../screens/MyCars";
import { StackRoutes } from "./stack.routes";

import HomeSvg from "../assets/homeTab.svg";
import CarSvg from "../assets/carTab.svg";
import PeopleSvg from "../assets/peopleTab.svg";
import { useTheme } from "styled-components";
import { Platform } from "react-native";

export type BottomTabRoutesParams = {
  Home: undefined;
  Profile: undefined;
  MyCars: undefined;
  StackRoutes: undefined;
};

const BottomTabs = createBottomTabNavigator<BottomTabRoutesParams>();

export type StackRoutesParamList<T extends keyof BottomTabRoutesParams> =
  RouteProp<BottomTabRoutesParams, T>;

export function BottomTabRoutes() {
  const theme = useTheme();
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.main,
        tabBarInactiveTintColor: theme.colors.text_detail,
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 20 : 0,
          height: 78,
          backgroundColor: theme.colors.background_primary,
        },
      }}
    >
      <BottomTabs.Screen
        name="Home"
        component={StackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg width={24} height={24} fill={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <PeopleSvg width={24} height={24} fill={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}
