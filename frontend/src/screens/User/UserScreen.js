import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../../styles";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const UserScreen = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const [userId, setUserId] = React.useState(null);

  React.useEffect(() => {
    async function fetchUserId() {
      try {
        const storedUserId = await AsyncStorage.getItem("userID");
        if (storedUserId !== null) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Error fetching userID:", error);
      }
    }
    fetchUserId();
  }, []);

  const handleLogout = async () => {
    try {
      navigation.navigate(t("ScreenTitle.loginScreenTitle"));
      await AsyncStorage.removeItem("sessionId");
      setUserId(null);
    } catch (error) {
      console.error("Error removing userID:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.username}>{userId}</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.btn_logout}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  username: {
    fontSize: 24,
    marginTop: 10,
  },
  btn_logout: {
    width: "100%",
    padding: 20,
    borderRadius: 10,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: colors.primary01,
    lineHeight: 24,
    color: "white",
    marginTop: 20,
  },
});

export default UserScreen;
