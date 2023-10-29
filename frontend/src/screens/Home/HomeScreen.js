import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, StyleSheet } from "react-native";
import MainScreen from "./MainScreen";
import PickerDateScreen from "./PickerDateScreen";
import AddBtn from "../../components/AddBtn";
import { colors } from "../../../styles";
import { useTranslation } from "react-i18next";
import PillScreen from "./PillScreen";

const Tab = createMaterialTopTabNavigator();

const HomeScreen = () => {
  const { t, i18n } = useTranslation();
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary01,
          },
        }}
      >
        <Tab.Screen
          name={t("ScreenTitle.mainTabTitle")}
          component={PillScreen}
        />
        <Tab.Screen
          name={t("ScreenTitle.pickerDateTabTitle")}
          component={PickerDateScreen}
        />
      </Tab.Navigator>

      {/* -------------------------Nút thêm --------------------------- */}
      {/* <View style={styles.btnStyle}>
        <View style={styles.addBtn}>
          <AddBtn />
        </View>
      </View> */}
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
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});

export default HomeScreen;
