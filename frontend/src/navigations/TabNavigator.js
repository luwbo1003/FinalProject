import React, { useState } from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  HomeStackNavigator,
  LoginStackNavigator,
  UserStackNavigator,
} from "./StackNavigator";
import { colors } from "../../styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { t, i18n } = useTranslation();
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: colors.primary02,
          },
          tabBarIcon: ({ size, focused }) => {
            let iconName;

            if (route.name === t("ScreenTitle.homeScreenTitle")) {
              iconName = "home";
            } else if (route.name === t("ScreenTitle.medicationScreenTitle")) {
              iconName = "pill";
            } else if (route.name === t("ScreenTitle.userScreenTitle")) {
              iconName = "account";
            }
            //else if (route.name === t("ScreenTitle.userScreenTitle")) {
            //   iconName = "account";
            // }
            const iconColor = focused ? colors.primary04 : colors.primary01;

            return <Icon name={iconName} size={size} color={iconColor} />;
          },
          tabBarActiveTintColor: colors.primary04,
          tabBarInactiveTintColor: colors.primary01,
        })}
      >
        <Tab.Screen
          name={t("ScreenTitle.homeScreenTitle")}
          component={HomeStackNavigator}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name={t("ScreenTitle.userScreenTitle")}
          component={UserStackNavigator}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator;
