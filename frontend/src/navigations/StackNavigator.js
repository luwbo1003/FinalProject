import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import UserScreen from "../screens/User/UserScreen";
import PickerDateScreen from "../screens/Home/PickerDateScreen";
import { colors } from "../../styles";
import { useTranslation } from "react-i18next";
import LoginScreen from "../screens/Login/LoginScreen";

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  const { t, i18n } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"Home"}
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
      <Stack.Screen
        name={t("ScreenTitle.pickerDateScreenTitle")}
        component={PickerDateScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.primary02,
          },
          headerTitleStyle: {
            color: colors.primary04,
          },
          headerTintColor: colors.primary04,
        }}
      />
      {/* <Stack.Screen
        name="DetailPill" // Thêm màn hình "DetailPill" vào Stack.Navigator
        component={DetailPill}
      /> */}
    </Stack.Navigator>
  );
};

const UserStackNavigator = () => {
  const { t, i18n } = useTranslation();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={t("ScreenTitle.userScreenTitle")}
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
export { HomeStackNavigator, UserStackNavigator, LoginStackNavigator };
