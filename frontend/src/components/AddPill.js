import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import Modal from "react-native-modal";

const AddPill = ({ isVisible, onClose }) => {
  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <View style={styles.modalContent}>
        <Text>Thêm thuốc ở đây</Text>
        <Button title="Nút thêm thuốc" onPress={onClose} />
        <Button title="Close" onPress={onClose} />
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

export default AddPill;
