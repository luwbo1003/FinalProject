import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import MedicationsScreen from "../screens/Medications/MedicationsScreen";
import MoreScreen from "../screens/More/MoreScreen";
import { colors } from "../../style";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.primary02,
          },
          headerTitleStyle: {
            color: colors.primary04,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const MedicationsStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Medications"
        component={MedicationsScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.primary02,
          },
          headerTitleStyle: {
            color: colors.primary04,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const MoreStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="More"
        component={MoreScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.primary02,
          },
          headerTitleStyle: {
            color: colors.primary04,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export { HomeStackNavigator, MedicationsStackNavigator, MoreStackNavigator };
