import React from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { colors } from "../../styles";
import { useTranslation } from "react-i18next";

const AddBtn_UI = ({ isVisible, onClose }) => {
  const { t, i18n } = useTranslation();
  return (
    <Modal isVisible={isVisible} style={styles.modal} onBackdropPress={onClose}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.btnAdd}>
          <Text style={styles.btnLabel}>{t("ButtonLabel.addBtn")}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: colors.primary04,
    padding: 24,
    height: "75%",
  },
  btnAdd: {
    backgroundColor: colors.primary01,
    height: 48,
    borderRadius: 8,
    justifyContent: "center",
  },
  btnLabel: {
    color: colors.primary04,
    textTransform: "uppercase",
    fontSize: 16,
    textAlign: "center",
  },
});

export default AddBtn_UI;
