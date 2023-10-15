import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Modal from "react-native-modal";

const AddBtn_UI = ({ isVisible, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      style={styles.modal}
      onBackdropPress={onClose}
    >
      <View style={styles.modalContent}>
        <Text>Thêm thuốc ở đây</Text>
        <Button title="Nút thêm thuốc"/>
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
    backgroundColor: "white",
    padding: 16,
    height: "50%",
  },
});

export default AddBtn_UI;
