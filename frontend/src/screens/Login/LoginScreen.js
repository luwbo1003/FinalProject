import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [uid, setUid] = useState("");

  const sendVerification = async () => {
    try {
      const response = await fetch("http://192.168.1.22:8083/generateOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber }),
      });
  
      if (!response.ok) {
        throw new Error("Đã xảy ra lỗi khi gửi mã OTP.");
      }
  
      const data = await response.json();
      const { otpId } = data;
  
      // Lưu trữ UID trong bộ nhớ cục bộ hoặc AsyncStorage
      // Để sử dụng sau khi xác nhận mã OTP
      setUid(otpId);
      setPhoneNumber("");
    } catch (error) {
      console.error(error);
      Alert.alert("Đã xảy ra lỗi khi gửi mã OTP.");
    }
  };

  const confirmCode = async () => {
    try {
      console.log(uid,code)
      const response = await fetch("http://192.168.1.22:8083/verifyOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otpId:uid, otpCode:code }),
      });
  
      if (!response.ok) {
        throw new Error("Đã xảy ra lỗi khi xác nhận mã OTP.");
      }
  
      console.log(response);
      // Xác nhận mã OTP thành công
      // Thực hiện các hành động tiếp theo sau đăng nhập thành công
      setCode("");
      Alert.alert("Đăng nhập thành công. Chào mừng trở lại trang chủ.");
    } catch (error) {
      console.error(error);
      Alert.alert("Đã xảy ra lỗi khi xác nhận mã OTP.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.otpText}>Đăng nhập bằng OTP</Text>
      <TextInput
        placeholder="Nhập số điện thoại của bạn"
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.sendVerification} onPress={sendVerification}>
        <Text style={styles.buttonText}>Gửi mã OTP</Text>
      </TouchableOpacity>
      <TextInput
        placeholder="Xác nhận OTP"
        onChangeText={setCode}
        keyboardType="number-pad"
        style={styles.textInput}
      />
      <TouchableOpacity style={styles.sendCode} onPress={confirmCode}>
        <Text style={styles.buttonText}>Nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 20,
    fontSize: 24,
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },
  sendVerification: {
    padding: 20,
    borderRightColor: "#3498db",
    borderRadius: 10,
  },
  sendCode: {
    padding: 20,
    borderRightColor: "#9b59b6",
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
  },
  otpText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    margin: 20,
  },
});