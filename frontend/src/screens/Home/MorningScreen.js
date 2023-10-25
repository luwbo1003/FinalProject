import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const MorningScreen = () => {
  const deviceWidth = Dimensions.get("window").width;
  const navigation = useNavigation(); // Sử dụng useNavigation để lấy đối tượng navigation

  const navigateToDetailPill = () => {
    navigation.navigate("DetailPill"); // Điều hướng đến màn hình "DetailPill"
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={navigateToDetailPill}>
        <View style={styles.header}>
          <Text style={styles.headerText}>giờ - DD/MM/YY</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>...</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text>Text</Text>
        </View>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Uống</Text>
        </TouchableOpacity>
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
});

export default MorningScreen;
