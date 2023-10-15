import React from "react";
import "intl-pluralrules";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./src/navigations/TabNavigator";
import { customTheme } from "./src/navigations/customTheme";
import "./i18n";

const App = () => {
  return (
    <NavigationContainer theme={customTheme}>
      <BottomTabNavigator />
    </NavigationContainer>
  );
};

export default App;
