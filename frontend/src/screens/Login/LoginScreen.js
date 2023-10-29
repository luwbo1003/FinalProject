import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../../styles";
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
  const { t, i18n } = useTranslation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [code, setCode] = useState("");
  const [uid, setUid] = useState("");
  const [otpFlag, setOtpFlag] = useState("");
  const [enableReturnHome, setEnableReturnHome] = useState(false);
  const sendVerification = async () => {
    try {
      const response = await fetch(
        "http://192.168.100.2:8083/api/generateOTP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber: phoneNumber }),
        }
      );

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
      Alert.alert(t("NotifyMessage.otpError"));
    }
  };

  const confirmCode = async () => {
    try {
      const response = await fetch("http://192.168.100.2:8083/api/verifyOTP", {
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

      Alert.alert(t("NotifyMessage.loginSuccess"));
      // setSession
      await fetch("http://192.168.100.2:8083/api/setSession", {
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
      Alert.alert(t("NotifyMessage.confirmError"));
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.login_title}>
          {t("ScreenTitle.loginScreenTitle")}
        </Text>
        <View style={styles.phone_frame}>
          <TextInput
            style={styles.phone_input}
            placeholder={t("InputPlaceholder.phoneNumber")}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity style={styles.btn_send} onPress={sendVerification}>
            <Text>{t("ButtonLabel.sendOtp")}</Text>
          </TouchableOpacity>
        </View>
        {otpFlag && (
          <>
            <View style={{ width: "100%", marginVertical: 24 }}>
              <TextInput
                placeholder={t("InputPlaceholder.otpCode")}
                onChangeText={setCode}
                keyboardType="number-pad"
                style={styles.otp_input}
              />
            </View>
            <TouchableOpacity style={styles.btn_login} onPress={confirmCode}>
              <Text style={styles.btn_text}>{t("ButtonLabel.confirmBtn")}</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.neutro01,
  },
  login_title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primary01,
    marginBottom: 70,
  },
  phone_frame: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  phone_input: {
    width: "65%",
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
  btn_send: {
    width: "30%",
    height: "100%",
    padding: 20,
    fontSize: 16,
    borderRadius: 8,
    outlineStyle: "none",
    shadowOffset: { width: 10, height: 10 },
    alignItems: "center",
    shadowOpacity: 1,
    shadowColor: "#c8c8c8",
    shadowRadius: 24,
    backgroundColor: colors.neutro02,
    lineHeight: 24,
  },
  otp_input: {
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
    width: "100%",
    padding: 20,
    borderRadius: 10,
    padding: 20,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: colors.primary01,
    lineHeight: 24,
    color: "white",
    marginTop: 20,
  },
  btn_text: {
    textAlign: "center",
    fontSize: 16,
    color: colors.primary04,
  },
});
