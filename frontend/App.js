import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./src/navigations/TabNavigator";
import { customTheme } from "./src/navigations/customeTheme";

const App = () => {
  return (
    <NavigationContainer theme={customTheme}>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default App;
