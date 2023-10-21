import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
// import PillScreen from "../screens/Pill/PillScreen";
import UserScreen from "../screens/User/UserScreen";
import { colors } from "../../styles";
import { useTranslation } from "react-i18next";
import LoginScreen from "../screens/Login/LoginScreen";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  const { t, i18n } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={t("ScreenTitle.homeScreenTitle")}
        name={t("Home")}
        name={t("123123")}
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
  const { t, i18n } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={t("13vasdf123")}
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
const LoginStackNavigator = () => {
  const { t, i18n } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={t("123123123")}
        component={LoginScreen}
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
export { HomeStackNavigator, UserStackNavigator,LoginStackNavigator };
