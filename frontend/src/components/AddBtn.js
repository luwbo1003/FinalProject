import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import AddBtn_UI from "./AddBtn_UI";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../../styles";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";

export default function AddBtn() {
  const { t, i18n } = useTranslation();
  const [pop, setPop] = useState(false);
  const [btnAddMed] = useState(new Animated.Value(0));
  const [btnAddReminder] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const handleAddReminderBtn = () => {
    navigation.navigate(t("ScreenTitle.pickerDateScreenTitle"));
  };
  const popIn = () => {
    setPop(true);
    Animated.timing(btnAddMed, {
      toValue: 70,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(btnAddReminder, {
      toValue: 20,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  const popOut = () => {
    setPop(false);
    Animated.timing(btnAddMed, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    Animated.timing(btnAddReminder, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };
  return (
    <View>
      <Animated.View style={{ bottom: btnAddMed }}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.iconContainer}>
            <Icon name="pill" color={colors.primary04} size={30} />
            <Text>Tao thuoc</Text>
          </View>
        </TouchableOpacity>
        <AddBtn_UI
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </Animated.View>
      <Animated.View style={{ bottom: btnAddReminder, right: btnAddMed }}>
        <TouchableOpacity
          style={styles.btnContainer}
          onPress={handleAddReminderBtn}
        >
          <View style={styles.iconContainer}>
            <Icon name="calendar" color={colors.primary04} size={30} />
            <Text>Tao lic nhac</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity
        style={styles.btnContainer}
        onPress={() => {
          pop === false ? popIn() : popOut();
        }}
      >
        <View style={styles.iconContainer}>
          <Icon name="plus" color={colors.primary04} size={30} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    position: "absolute",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary01,
    width: 65,
    height: 65,
  },
});
