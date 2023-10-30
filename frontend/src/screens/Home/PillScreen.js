import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPillByUserID } from "../../services/pillService";
import PillItem from "../../components/PillItem";

const PillScreen = () => {
  const [uid, setUid] = useState("");
  const [pill, setPill] = useState([]);

  // Fetch user ID from AsyncStorage
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
  }, []);

  // Fetch pill data based on the user's ID
  useEffect(() => {
    const fetchPillData = async () => {
      try {
        const response = await getPillByUserID(uid);
        setPill(response);
      } catch (error) {
        console.error("Error fetching pill:", error);
      }
    };
    if (uid) {
      fetchPillData();
    }
  }, [uid]);

  // Render individual pill items
  function renderPillItem({ item }) {
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
        renderItem={renderPillItem}
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
