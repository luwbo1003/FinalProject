import React, { useState } from "react";
import { StyleSheet, Switch, Text, TextInput, View } from "react-native";
import CalendarScreen from "./CalendarScreen";

const PickerDateScreen = () => {
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

  return (
    <></>
    // <View style={style.container}>
    //     <View>
    //         <TextInput style={style.textbox} placeholder="tên thuốc"></TextInput>
    //         <TextInput style={style.textbox} placeholder="tên thuốc"></TextInput>
    //     </View>
    //     <View style={style.btn_row}>
    //         <button style={style.btns}>HUY</button>
    //         <button style={style.btns}>THEM</button>
    //     </View>
    //     <View style={style.time_row}>
    //         <Text>Hằng ngày</Text>
    //         <Switch
    //             style={style.switch}
    //             trackColor={{ false: "#767577", true: "#81b0ff" }}
    //             thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
    //             ios_backgroundColor="#3e3e3e"
    //             onValueChange={toggleSwitch}
    //             value={isEnabled}
    //         />
    //     </View>
    //     <View style={{ height: 0.2, backgroundColor: "rgba(0,0,0,0.3)" }} />
    //     <View style={style.time_row}>
    //         <Text>Từ ngày</Text>
    //         <Text onPress={() => setContentVisible(!isContentVisible)}> {dateFromChild ? formatDateString(dateFromChild[0]) : 'Chọn ngày'}</Text>
    //     </View>
    //     {!isContentVisible && (
    //         <View style={style.cal}>
    //             <CalendarScreen onData={handleDateFromChild} />
    //         </View>
    //     )}

    //     <View style={{ height: 0.2, backgroundColor: "rgba(0,0,0,0.3)" }} />
    //     <View style={style.time_row}>
    //         <Text>Đến ngày</Text>
    //         <Text> {dateFromChild ?formatDateString(dateFromChild[1]) : ''}</Text>
    //     </View>
    // </View>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 20,
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
    borderWidth: 0,
  },
  textbox: {
    backgroundColor: "#e5e5e5",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  time_row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  cal: {
    padding: 20,
  },
});

export default PickerDateScreen;
