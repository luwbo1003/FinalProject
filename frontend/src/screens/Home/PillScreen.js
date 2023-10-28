import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

const PillScreen = () => {
  const [mcName, setMcName] = useState("");
  const [hour, setHour] = useState("");
  const [min, setMin] = useState("");

  useEffect(() => {
    fetch("/api/getPillData")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data && data.MCName) {
          setMcName(data.MCName);
          setHour(data.Time.idTime.hour);
          setMin(data.Time.idTime.min);
        } else {
          // Hiển thị thông báo lỗi hoặc thực hiện hành động khác tùy ý
          console.error("Không tìm thấy data");
          // Ví dụ: Hiển thị thông báo lỗi cho người dùng
          alert("Không tìm thấy data");
        }
      })
      .catch((error) => {
        console.error("Lỗi trong quá trình truy cập dữ liệu", error);
        alert("Lỗi trong quá trình truy cập dữ liệu");
      });
  }, []);
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{hour}:{min}</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>{mcName}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text>{mcName}</Text>
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

export default PillScreen;
