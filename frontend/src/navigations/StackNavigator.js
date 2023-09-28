import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import MedicationsScreen from "../screens/Medications/MedicationsScreen";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

const MedicationsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Medications" component={MedicationsScreen} />
    </Stack.Navigator>
  );
};

export { HomeStackNavigator, MedicationsStackNavigator };
