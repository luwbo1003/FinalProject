import React, { useState } from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStackNavigator, UserStackNavigator } from "./StackNavigator";


const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackNavigator} options={{ headerShown: false }} />
        <Tab.Screen name="User" component={UserStackNavigator} options={{ headerShown: false }} />
      </Tab.Navigator>
    </View>
  );
};

export default BottomTabNavigator;
