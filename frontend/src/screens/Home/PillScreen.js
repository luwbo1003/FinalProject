import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPillByUserID } from "../../services/pillService";

const PillScreen = () => {
  const [mcName, setMcName] = useState("");
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");
  const [uid, setUid] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUid = await AsyncStorage.getItem("userID");
        setUid(storedUid);

        const response = await getPillByUserID(uid);
        setMcName(response.MCId1.MCName);
        setHour(response.MCId1.Time.idTime1.hour);
        setMin(response.MCId1.Time.idTime1.min);
        setDropdownOptions(["Sửa", "Xóa"]);
        console.log(response);
      } catch (error) {
        console.error("Error fetching pill:", error);
      }
    };
    fetchData();
  }, [uid]);

  const openDropdown = () => {
    setDropdownVisible(true);
  };

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  const handleDropdownOptionSelect = (option) => {
    setSelectedOption(option);
    closeDropdown();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {hour}:{min}
          </Text>
          <TouchableOpacity style={styles.editButton} onPress={openDropdown}>
            <Text style={styles.editButtonText}>...</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text>{mcName}</Text>
        </View>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Uống</Text>
        </TouchableOpacity>
        {isDropdownVisible && (
          <View style={styles.dropdownContainer}>
            <FlatList
              data={dropdownOptions}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleDropdownOptionSelect(item)}>
                  <Text style={styles.dropdownItem}>{item}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        )}
        {selectedOption && <Text>Đã chọn: {selectedOption}</Text>}
      </TouchableOpacity>
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
  card: {
    width: Dimensions.get("window").width - 20,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 16,
  },
  editButton: {
    backgroundColor: "lightgray",
    borderRadius: 15,
    padding: 5,
  },
  editButtonText: {
    fontSize: 20,
  },
  content: {
    marginVertical: 10,
  },
  actionButton: {
    backgroundColor: "blue",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
  },
  dropdownContainer: {
    position: "absolute",
    top: 40,
    right: 10,
    backgroundColor: "white",
    borderColor: "lightgray",
    borderWidth: 1,
    borderRadius: 10,
  },
  dropdownItem: {
    padding: 15,
    fontSize: 18,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
  },
});

export default PillScreen;
