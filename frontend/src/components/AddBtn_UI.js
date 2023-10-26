// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
// } from "react-native";
// import Modal from "react-native-modal";
// import { colors } from "../../styles";
// import { useTranslation } from "react-i18next";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// import SelectDropdown from "react-native-select-dropdown";

// const SelectDropdownComponent = () => {
//   const [selectedItem, setSelectedItem] = useState("");

//   const data = ["Option 1", "Option 2", "Option 3"];

//   return (
//     <View>
//       <Text>Select an option:</Text>
//       <SelectDropdown
//         data={data}
//         onSelect={(selectedItem, index) => {
//           setSelectedItem(selectedItem);
//         }}
//         defaultButtonText="Select Option"
//         buttonTextAfterSelection={(selectedItem, index) => {
//           return selectedItem;
//         }}
//         rowTextForSelection={(item, index) => {
//           return item;
//         }}
//       />
//       <Text>Selected: {selectedItem}</Text>
//     </View>
//   );
// };

// const AddBtn_UI = ({ isVisible, onClose }) => {
//   const { t, i18n } = useTranslation();
//   return (
//     <Modal
//       isVisible={!isVisible}
//       style={styles.modal}
//       onBackdropPress={onClose}
//     >
//       <View style={styles.modalContent}>
//         <TouchableOpacity style={styles.btnClose}>
//           <Icon name="close" style={styles.closeIcon} onPress={onClose} />
//         </TouchableOpacity>
//         <TextInput
//           style={styles.input}
//           placeholder={t("InputPlaceholder.medName")}
//         />
//         <View>
//           <SelectDropdownComponent />
//         </View>
//         <TouchableOpacity style={styles.btnAdd}>
//           <Text style={styles.btnLabel}>{t("ButtonLabel.addBtn")}</Text>
//         </TouchableOpacity>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modal: {
//     justifyContent: "flex-end",
//     margin: 0,
//   },
//   modalContent: {
//     backgroundColor: colors.primary04,
//     padding: 24,
//     height: "90%",
//   },
//   btnAdd: {
//     backgroundColor: colors.primary01,
//     height: 48,
//     borderRadius: 8,
//     justifyContent: "center",
//   },
//   btnLabel: {
//     color: colors.primary04,
//     textTransform: "uppercase",
//     fontSize: 16,
//     textAlign: "center",
//   },
//   btnClose: {
//     flex: 1,
//     flexDirection: "row",
//     justifyContent: "flex-end",
//   },
//   closeIcon: {
//     fontSize: 24,
//     color: colors.primary01,
//   },
//   input: {
//     width: "100%",
//     height: 56,
//     fontSize: 16,
//     backgroundColor: colors.neutro01,
//     borderWidth: 0,
//     borderColor: "transparent",
//     borderRadius: 8,
//     paddingHorizontal: 12,
//     margin: 12,
//   },
// });

// export default AddBtn_UI;
