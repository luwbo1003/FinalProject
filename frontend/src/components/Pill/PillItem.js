import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../../styles";

export default function PillItem({ hour, min, mcName }) {
//   const [isDropdownVisible, setDropdownVisible] = useState(false);
//   const [selectedOption, setSelectedOption] = useState(null);

//   const dropdownOptions = ["Sửa", "Xóa"];
//   const openDropdown = () => {
//     setDropdownVisible(true);
//   };

//   const closeDropdown = () => {
//     setDropdownVisible(false);
//   };

//   const handleDropdownOptionSelect = (option) => {
//     setSelectedOption(option);
//     closeDropdown();
//   };

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {hour}:{min}
        </Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>...</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <Text>{mcName}</Text>
      </View>
      <TouchableOpacity style={styles.actionButton}>
        <Text style={styles.actionButtonText}>Uống</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    shadowRadius: 1,
    elevation: 5,
    marginBottom: 10
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
    backgroundColor: colors.primary01,
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
