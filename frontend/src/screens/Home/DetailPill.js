import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { getMedicineListByUserID } from "../../services/pillService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MedicineItem from "../../components/MedicineItem";

const DetailPillScreen = () => {
  const [uid, setUid] = useState("");
  const [medicine, setMedicine] = useState([]);

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
    const fetchMedicineData = async () => {
      try {
        const response = await getMedicineListByUserID(uid);
        setMedicine(response);
      } catch (error) {
        console.error("Error fetching pill:", error);
      }
    };
    if (uid) {
      fetchMedicineData();
    }
  }, [uid]);

  function renderMedicineItem({ item }) {
    const medicineItemProps = {
      name: item.name,
      quantity: item.quantity,
    };
    return <MedicineItem {...medicineItemProps} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={medicine}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMedicineItem}
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

export default DetailPillScreen;
