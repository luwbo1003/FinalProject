import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import {
  HomeStackNavigator,
  MedicationsStackNavigator,
  MoreStackNavigator,
} from "./StackNavigator";
import { colors } from "../../style";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: colors.primary02,
        },
        tabBarIcon: ({ size, focused }) => {
          let iconName;
          if (route.name === "HomeTab") {
            iconName = "home";
          } else if (route.name === "MedicationsTab") {
            iconName = "medkit";
          } else if (route.name === "MoreTab") {
            iconName = "ellipsis-horizontal";
          }
          const iconColor = focused ? colors.primary04 : colors.primary01;
          return <Icon name={iconName} size={size} color={iconColor} />;
        },
        tabBarActiveTintColor: colors.primary04,
        tabBarInactiveTintColor: colors.primary01,
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="MedicationsTab"
        component={MedicationsStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "Medications",
        }}
      />
      <Tab.Screen
        name="MoreTab"
        component={MoreStackNavigator}
        options={{
          headerShown: false,
          tabBarLabel: "More",
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
