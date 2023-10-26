import React, { useState } from "react";
import { PushTime } from "../../services/Test";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";

const Test = () => {
  const [customMedicines, setCustomMedicines] = useState([]);

  const addCustomMedicines = () => {
    setCustomMedicines((prevCustomMedicines) => [
      ...prevCustomMedicines,
      { name: "value", quantity: "1" },
    ]);
  };

  const onIputMedicineNameHandler = (value, index) => {
    const updatedCustomMedicines = [...customMedicines];
    updatedCustomMedicines[index].name = value;
    setCustomMedicines(updatedCustomMedicines);
  };

  const onInputMedicineQuantityHandler = (value, index) => {
    const updatedCustomMedicines = [...customMedicines];
    updatedCustomMedicines[index].quantity = value;
    setCustomMedicines(updatedCustomMedicines);
  };

  const deleteMedicine = (index) => {
    const updatedCustomMedicines = [...customMedicines];
    updatedCustomMedicines.splice(index, 1);
    setCustomMedicines(updatedCustomMedicines);
  };

  const check = () => {
    const reducedCustomMedicines = customMedicines.reduce(
      (acc, customField, index) => {
        acc["time_" + index] = {
          name: customField.name,
          quantity: customField.quantity,
        };
        return acc;
      },
      {}
    );

    for (let i = 0; i < customMedicines.length; i++) {
      console.log(customMedicines[i].name);
      console.log(customMedicines[i].quantity);
    }
  };

  const handleCreateMedicine = async () => {
    const reducedCustomMedicines = customMedicines.reduce(
      (acc, customField, index) => {
        acc["time_" + index] = {
          name: customField.name,
          quantity: customField.quantity,
        };
        return acc;
      },
      {}
    );

    try {
      await PushTime(reducedCustomMedicines);
      console.log("Times pushed successfully");
    } catch (error) {
      console.error("Error pushing times:", error);
    }
  };

  return (
    <ScrollView style={styles.frame}>
      <View style={styles.container}>
        <View style={styles.base}>
          <TextInput
            style={styles.nameofcal}
            placeholder="Tên đơn thuốc"
          ></TextInput>
        </View>

        {customMedicines.map((customField, index) => (
          <View key={index} style={styles.content}>
            <TextInput
              style={styles.textinput}
              placeholder={"Tên thuốc"}
              value={customField.key}
              onChangeText={(name) => onIputMedicineNameHandler(name, index)}
            />
            <TextInput
              style={styles.textinput1}
              placeholder={"0"}
              value={customField.key}
              onChangeText={(quantity) =>
                onInputMedicineQuantityHandler(quantity, index)
              }
            />
            <TouchableOpacity onPress={() => deleteMedicine(index)}>
              <Text style={styles.delete}>X</Text>
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.addcal}>
          <TouchableOpacity onPress={addCustomMedicines}>
            <Text style={styles.add}>Thêm thuốc</Text>
          </TouchableOpacity>
        </View>
        {/* <Button
        style={styles.add}
        title="Push"
        onPress={handleCreateMedicine}
      ></Button> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  frame: {
    padding: 15,
    backgroundColor: "white",
  },
  base: {
    backgroundColor: "#efefef",
    borderRadius: 7,
    padding: 10,
    marginBottom: 10,
    alignItems: "stretch",
    justifyContent: "space-between",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 1,
    shadowColor: "grey",
    shadowRadius: 6,
  },
  nameofcal: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 4,
    outlineStyle: "none",
  },
  container: {
    padding: 15,
    backgroundColor: "#d7d7d7",
    borderRadius: 10,
  },
  addcal: {
    width: "100%",
    alignItems: "stretch",
  },
  content: {
    flexDirection: "row",
    backgroundColor: "#efefef",
    borderRadius: 7,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "space-between",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 1,
    shadowColor: "grey",
    shadowRadius: 6,
  },
  timeinput: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    justifyContent: "flex-end",
  },
  textinput: {
    width: "65%",
    paddingHorizontal: 7,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
    outlineStyle: "none",
  },

  textinput1: {
    width: "15%",
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 4,
    outlineStyle: "none",
    textAlign: "center",
  },
  add: {
    width: "100%",
    backgroundColor: "#274c77",
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
    lineHeight: 10,
    paddingHorizontal: 15,
    padding: 12,
    borderRadius: 5,
    textAlign: "center",
  },
  delete: {
    backgroundColor: "#df2c14",
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
    lineHeight: 10,
    padding: 12,
    borderRadius: 5,
    textAlign: "center",
  },
});

export default Test;
