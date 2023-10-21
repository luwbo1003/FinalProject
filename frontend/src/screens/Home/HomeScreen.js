import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { View, StyleSheet } from "react-native";
import MorningScreen from "./MorningScreen";
import NoonScreen from "./NoonScreen";
import EveningScreen from "./EveningScreen";
import PickerDate from "./PickerDate";
import AddBtn from "../../components/AddBtn";
import { colors } from "../../../styles";
import { useTranslation } from "react-i18next";

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
          name={t("ScreenTitle.morningTabTitle")}
          component={MorningScreen}
        />

        <Tab.Screen
          name={t("ScreenTitle.afternoonTabTitle")}
          component={NoonScreen}
        />
        <Tab.Screen
          name={t("ScreenTitle.eveningTabTitle")}
          component={EveningScreen}
        />

          <Tab.Screen
              name={t("ScreenTitle.pickerDate")}
              component={PickerDate}
          />
      </Tab.Navigator>

      {/* -------------------------Nút thêm --------------------------- */}
      {/*<View style={styles.btnStyle}>*/}
      {/*  <View style={styles.addBtn}>*/}
      {/*    <AddBtn />*/}
      {/*  </View>*/}
      {/*</View>*/}
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
