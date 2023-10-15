import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, StyleSheet } from "react-native";
import MorningScreen from "./MorningScreen";
import NoonScreen from "./NoonScreen";
import EveningScreen from "./EveningScreen";

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Sáng" component={MorningScreen} />
        <Tab.Screen name="Trưa" component={NoonScreen} />
        <Tab.Screen name="Chiều" component={EveningScreen} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
