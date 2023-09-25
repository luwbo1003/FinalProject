import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import BottomTabNavigator from "./src/navigations/TabNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <BottomTabNavigator />
    </NavigationContainer>
  );
}
