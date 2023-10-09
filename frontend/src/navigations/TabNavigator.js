import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStackNavigator, UserStackNavigator } from "./StackNavigator";
import AddPill from "../components/AddPill"; // Import component Modal

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackNavigator} options={{ headerShown: false }} />
        <Tab.Screen name="User" component={UserStackNavigator} options={{ headerShown: false }} />
      </Tab.Navigator>

      {/* Nút giữa */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "blue", // Màu nền của nút
          height: 50, // Điều chỉnh chiều cao của nút
        }}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: "white" }}>Show Modal</Text>
      </TouchableOpacity>

      {/* Modal */}
      <AddPill isVisible={modalVisible} onClose={() => setModalVisible(false)} />
    </View>
  );
};

export default BottomTabNavigator;
