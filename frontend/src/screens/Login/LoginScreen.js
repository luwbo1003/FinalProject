import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

const generateSessionId = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const sessionIdLength = 10;
  let sessionId = "";

  for (let i = 0; i < sessionIdLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    sessionId += characters.charAt(randomIndex);
  }

  return sessionId;
};

const LoginScreen = ({ handleLoginProps }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [uid, setUid] = useState("");
  const [otpFlag, setOtpFlag] = useState("");
  const [enableReturnHome, setEnableReturnHome] = useState(false);
  const sendVerification = async () => {
    try {
      const response = await fetch("http://192.168.1.17:8083/generateOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: phoneNumber }),
      });

      if (!response.ok) {
        throw new Error("Đã xảy ra lỗi khi gửi mã OTP.");
      }

      const data = await response.json();
      console.log(data);
      const { userId } = data;

      // Lưu trữ UID trong bộ nhớ cục bộ hoặc AsyncStorage
      // Để sử dụng sau khi xác nhận mã OTP
      setUid(userId);
      setOtpFlag(true);
    } catch (error) {
      console.error(error);
      Alert.alert("Đã xảy ra lỗi khi gửi mã OTP.");
    }
  };

  const confirmCode = async () => {
    try {
      const response = await fetch("http://192.168.1.17:8083/verifyOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: phoneNumber, otpCode: code }),
      });

      if (!response.ok) {
        throw new Error("Đã xảy ra lỗi khi xác nhận mã OTP.");
      }

      // Xác nhận mã OTP thành công
      // Thực hiện các hành động tiếp theo sau đăng nhập thành công
      setCode("");
      const sessionID = generateSessionId();
      await AsyncStorage.setItem("userID", uid);
      await AsyncStorage.setItem("sessionId", sessionID);
      await AsyncStorage.setItem("phoneNumber", phoneNumber);

      Alert.alert("Đăng nhập thành công. Chào mừng trở lại trang chủ.");

      // setSession
      await fetch("http://192.168.1.17:8083/api/setSession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionID,
          userId: uid,
          phoneNumber: phoneNumber,
        }),
      });
      setEnableReturnHome(true);
      handleLoginProps(true);
    } catch (error) {
      console.error(error);
      Alert.alert("Đã xảy ra lỗi khi xác nhận mã OTP.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.otpText}>Đăng nhập bằng OTP</Text>
      <View style={styles.phone_content}>
        <TextInput
          style={styles.phone}
          placeholder="Số điện thoại"
          onChangeText={setPhoneNumber}
          // keyboardType="phone-pad"
        />
        <TouchableOpacity onPress={sendVerification}>
          <Text style={styles.sendVerification}>Gửi OTP</Text>
        </TouchableOpacity>
      </View>
      {otpFlag && (
        <>
          <View style={{ width: "100%", marginVertical: 25 }}>
            <TextInput
              placeholder="Xác nhận OTP"
              onChangeText={setCode}
              keyboardType="number-pad"
              style={styles.OTP}
            />
          </View>
          <TouchableOpacity style={{ width: "100%" }} onPress={confirmCode}>
            <Text style={styles.btn_login}>Đăng nhập</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#efefef",
  },
  phone_content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  phone: {
    width: "70%",
    padding: 20,
    fontSize: 18,
    borderRadius: 10,
    outlineStyle: "none",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowColor: "#c8c8c8",
    shadowRadius: 24,
    backgroundColor: "#f5f5f5",
    lineHeight: 16,
    marginRight: 15,
  },
  sendVerification: {
    padding: 20,
    fontSize: 16,
    borderRadius: 10,
    outlineStyle: "none",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowColor: "#c8c8c8",
    shadowRadius: 24,
    backgroundColor: "#f5f5f5",
    lineHeight: 24,
  },
  OTP: {
    padding: 20,
    fontSize: 18,
    borderRadius: 10,
    outlineStyle: "none",
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 1,
    shadowColor: "#c8c8c8",
    shadowRadius: 24,
    backgroundColor: "#f5f5f5",
  },

  btn_login: {
    padding: 20,
    borderRadius: 10,
    padding: 20,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: "#274c77",
    lineHeight: 24,
    color: "white",
    marginTop: 20,
  },
  goBackButton: {
    padding: 20,
    backgroundColor: "#27ae60",
    borderRadius: 10,
    marginTop: 30,
  },
  buttonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
  otpText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 70,
  },
});
