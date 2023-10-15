import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, StyleSheet } from "react-native";
import MorningScreen from "./MorningScreen";
import NoonScreen from "./NoonScreen";
import EveningScreen from "./EveningScreen";
import AddBtn from "../../components/AddBtn";


const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Sáng" component={MorningScreen} />
        <Tab.Screen name="Trưa" component={NoonScreen} />
        <Tab.Screen name="Chiều" component={EveningScreen} />
      </Tab.Navigator>

      {/* -------------------------Nút thêm --------------------------- */}
      <View style={styles.btnStyle}>
        <View style={styles.addBtn}>
          <AddBtn />
        </View>
      </View>
      {/* --------------------------Nút thêm -------------------------- */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addBtn: {
    width: 100,
    height: 100,
  },
  btnStyle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
});

export default HomeScreen;
