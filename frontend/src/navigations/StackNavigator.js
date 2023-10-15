import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
// import PillScreen from "../screens/Pill/PillScreen";
import UserScreen from "../screens/User/UserScreen";
import { colors } from "../../styles";

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

// const PillStackNavigator = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Pill" component={PillScreen} />
//     </Stack.Navigator>
//   );
// };

const UserStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="User"
        component={UserScreen}
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
export { HomeStackNavigator, UserStackNavigator };
