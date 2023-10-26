import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CalendarScreen from "./CalendarScreen";
import { createNotification } from "../../services/notificationService";

const PickerData = () => {
  // const [dateStart, setDateStart] = useState('');
  const [MCName, setMCName] = useState('Đơn thuốc');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [isContentVisible, setContentVisible] = React.useState(true);

  const [dateFromChild, setDateFromChild] = useState("");
  const handleDateFromChild = (data) => {
    setDateFromChild(data);
  };
  function formatDateString(inputString) {
    try {
      const dateObject = new Date(inputString);
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return dateObject.toLocaleDateString(undefined, options);
    } catch (error) {
      return "Ngày không hợp lệ";
    }
  }
  let dateStart = formatDateString(dateFromChild[0]);
  let dateEnd = formatDateString(dateFromChild[1]);
  const handleCreateNotification = async () => {
    const times = customTimes.reduce((acc, customField, index) => {
      acc["idTime" + index] = {
        hour: customField.hour,
        min: customField.min,
      };
      return acc;
    }, {});
    const medicines = customMedicines.reduce((acc, customField, index) => {
      acc["idMed" + index] = {
        name: customField.name,
        quantity: customField.quantity,
      };
      return acc;
    }, {});
    const notificationData = {
      MCName,
      medicines,
      times,
      dateStart,
      dateEnd,
    };
    try {
      const response = await createNotification(notificationData);
      // Xử lý phản hồi từ máy chủ (nếu cần)
      console.log("Thông báo đã được tạo:", response);
    } catch (error) {
      console.error("Lỗi khi tạo thông báo:", error);
    }
  };

  // ------------------Nhập thời gian-------------------//
  const [customTimes, setCustomTimes] = useState([]);

  const addCustomTimes = () => {
    setCustomTimes((prevCustomTimes) => [
      ...prevCustomTimes,
      { hour: "value", min: "00" },
    ]);
  };

  const onInputHourHandler = (value, index) => {
    const updatedCustomTimes = [...customTimes];
    updatedCustomTimes[index].hour = value;
    setCustomTimes(updatedCustomTimes);
  };

  const onInputMinHandler = (value, index) => {
    const updatedCustomTimes = [...customTimes];
    updatedCustomTimes[index].min = value;
    setCustomTimes(updatedCustomTimes);
  };

  const deleteTime = (index) => {
    const updatedCustomTimes = [...customTimes];
    updatedCustomTimes.splice(index, 1);
    setCustomTimes(updatedCustomTimes);
  };

  const checktime = () => {
    const reducedCustomTimes = customTimes.reduce((acc, customField, index) => {
      acc["time_" + index] = {
        hour: customField.hour,
        min: customField.min,
      };
      return acc;
    }, {});
    console.log(reducedCustomTimes);
    for (let i = 0; i < customTimes.length; i++) {
      console.log(customTimes[i].hour);
      console.log(customTimes[i].min);
    }
  };

  // --------------------Nhập thuốc-----------------------//
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

  return (
    <ScrollView>
      <View style={style.container}>
        {/* -------------Nhập thuốc------------- */}
        <View style={style.medcontainer}>
          <View style={style.base}>
            <TextInput
              style={style.nameofcal}
              placeholder="Tên đơn thuốc"
              onChangeText={(mcname) => setMCName(mcname)}
            ></TextInput>
          </View>

          {customMedicines.map((customField, index) => (
            <View key={index} style={style.medcontent}>
              <TextInput
                style={style.medtextinput}
                placeholder={"Tên thuốc"}
                value={customField.key}
                onChangeText={(name) => onIputMedicineNameHandler(name, index)}
              />
              <TextInput
                style={style.textinput1}
                placeholder={"1"}
                value={customField.key}
                onChangeText={(quantity) =>
                  onInputMedicineQuantityHandler(quantity, index)
                }
              />
              <TouchableOpacity onPress={() => deleteMedicine(index)}>
                <Text style={style.deletemedicine}>X</Text>
              </TouchableOpacity>
            </View>
          ))}
          <View>
            <TouchableOpacity onPress={addCustomMedicines}>
              <Text style={style.addmedicine}>Thêm thuốc</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* -------------/////////-------------- */}
        <View style={style.calcontainer}>
          <View style={style.time_row}>
            <Text>Hằng ngày</Text>
            <Switch
              style={style.switch}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
          <View style={{ height: 0.2, backgroundColor: "#b0b0b099" }} />
          <View style={style.time_row}>
            <Text>Từ ngày</Text>
            <Text
              style={style.datevalue}
              onPress={() => setContentVisible(!isContentVisible)}
            >
              {dateFromChild ? formatDateString(dateFromChild[0]) : "Chọn ngày"}
            </Text>
          </View>
          {!isContentVisible && (
            <View style={style.cal}>
              <CalendarScreen onData={handleDateFromChild} />
            </View>
          )}
          <View style={{ height: 0.2, backgroundColor: "#b0b0b099" }} />
          <View style={style.time_row}>
            <Text>Đến ngày</Text>
            <Text style={style.datevalue}>
              {dateFromChild ? formatDateString(dateFromChild[1]) : "Chọn ngày"}
            </Text>
          </View>
        </View>

        {/* ------------------Nhập giờ--------------------- */}
        <View style={style.timecontainer}>
          <View style={style.addcal}>
            <Text style={{ fontSize: 14 }}>Giờ uống thuốc</Text>
            <TouchableOpacity onPress={addCustomTimes}>
              <Text style={style.add}>Thêm giờ</Text>
            </TouchableOpacity>
          </View>
          {customTimes.map((customField, index) => (
            <View key={index} style={style.content}>
              <View style={{ width: "50%" }}>
                <Text>Vào lúc</Text>
              </View>
              <View style={style.timeinput}>
                <TextInput
                  style={style.textinput}
                  placeholder={"--"}
                  value={customField.key}
                  onChangeText={(hour) => onInputHourHandler(hour, index)}
                />
                <Text style={{ marginHorizontal: 3, fontWeight: "600" }}>
                  :
                </Text>
                <TextInput
                  style={style.textinput}
                  placeholder={"00"}
                  value={customField.key}
                  onChangeText={(min) => onInputMinHandler(min, index)}
                />
                <TouchableOpacity onPress={() => deleteTime(index)}>
                  <Text style={style.delete}>X</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
        {/* -------------------//////////------------------ */}
        <View>
          <TouchableOpacity onPress={handleCreateNotification}>
            <Text style={style.createnoti}>Tạo thông báo</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 15,
  },
  btn_row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  btns: {
    width: "47%",
    height: 40,
    backgroundColor: "#489",
    color: "#fff",
    borderRadius: 6,
    borderStyle: "none",
  },
  textbox: {
    backgroundColor: "#e5e5e5",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },

  calcontainer: {
    paddingHorizontal: 15,
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
    marginVertical: 15,
  },
  time_row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 13,
    paddingHorizontal: 5,
    alignItems: "center",
  },
  cal: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowColor: "#b0b0b0",
    shadowRadius: 6,
    marginBottom: 20,
    marginTop: 7,
  },
  datevalue: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 60,
    lineHeight: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    marginRight: 8,
  },
  base: {
    backgroundColor: "#efefef",
    borderRadius: 7,
    padding: 10,
    marginBottom: 10,
    alignItems: "stretch",
    justifyContent: "space-between",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowColor: "#b0b0b0",
    shadowRadius: 5,
  },
  nameofcal: {
    backgroundColor: "#fff",
    padding: 7,
    borderRadius: 4,
    outlineStyle: "none",
  },
  medcontainer: {
    padding: 15,
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
  },
  medcontent: {
    flexDirection: "row",
    backgroundColor: "#efefef",
    borderRadius: 7,
    padding: 10,
    marginBottom: 10,
    alignItems: "stretch",
    justifyContent: "space-between",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowColor: "#b0b0b0",
    shadowRadius: 5,
  },
  medtextinput: {
    width: "65%",
    paddingHorizontal: 7,
    paddingVertical: 7,
    backgroundColor: "#fff",
    borderRadius: 4,
    outlineStyle: "none",
  },

  timecontainer: {
    padding: 15,
    backgroundColor: "#e5e5e5",
    alignContent: "center",
    alignItems: "stretch",
    borderRadius: 10,
  },
  addcal: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  content: {
    flexDirection: "row",
    backgroundColor: "#efefef",
    borderRadius: 7,
    padding: 10,
    marginTop: 10,
    alignItems: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowColor: "#b0b0b0",
    shadowRadius: 5,
  },
  timeinput: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    justifyContent: "flex-end",
  },
  textinput: {
    width: "25%",
    paddingHorizontal: 5,
    paddingVertical: 7,
    backgroundColor: "#fff",
    borderRadius: 5,
    outlineStyle: "none",
    textAlign: "center",
  },
  textinput1: {
    width: "15%",
    paddingHorizontal: 5,
    paddingVertical: 7,
    backgroundColor: "#fff",
    borderRadius: 4,
    outlineStyle: "none",
    textAlign: "center",
  },
  add: {
    backgroundColor: "#274c77",
    fontSize: 14,
    color: "#fff",
    lineHeight: 10,
    paddingHorizontal: 15,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  delete: {
    backgroundColor: "#df2c14",
    fontSize: 16,
    color: "#fff",
    lineHeight: 10,
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
    textAlign: "center",
  },
  addmedicine: {
    backgroundColor: "#274c77",
    fontSize: 14,
    color: "#fff",
    lineHeight: 10,
    paddingHorizontal: 15,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  deletemedicine: {
    backgroundColor: "#df2c14",
    fontSize: 16,
    color: "#fff",
    lineHeight: 10,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  createnoti: {
    backgroundColor: "#274c77",
    fontSize: 16,
    color: "#fff",
    lineHeight: 10,
    paddingHorizontal: 15,
    padding: 12,
    borderRadius: 5,
    textAlign: "center",
    marginTop: 15,
  },
});

export default PickerData;
