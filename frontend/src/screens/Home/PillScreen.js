import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPillByUserID } from "../../services/pillService";
import PillItem from "../../components/PillItem";

const PillScreen = () => {
  const [uid, setUid] = useState("");
  const [pill, setPill] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUid = await AsyncStorage.getItem("userID");
        setUid(storedUid);
      } catch (error) {
        console.error("Error fetching userID:", error);
      }
    };
    fetchData();
  }, []); // Mảng phụ thuộc rỗng để chỉ gọi một lần khi component được render

  useEffect(() => {
    const fetchPillData = async () => {
      try {
        const response = await getPillByUserID(uid);
        setPill(response);
      } catch (error) {
        console.error("Error fetching pill:", error);
      }
    };
    fetchPillData();
  }, [uid]);
  console.log(pill);

  function renderMealItem(itemData) {
    const item = itemData.item;

    const pillItemProps = {
      mcName: item.MCName,
      hour: item.hour,
      min: item.min,
    };
    return <PillItem {...pillItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={pill}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMealItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});

export default PillScreen;
