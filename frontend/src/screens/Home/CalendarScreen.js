import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
//Calendar
const CalendarScreen = (props) => {
  //Calendar session
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);

  const onDateChange = (date, type) => {
    //function to handle the date change
    if (type === "END_DATE") {
      setSelectedEndDate(date);
    } else {
      setSelectedEndDate(null);
      setSelectedStartDate(date);
    }
  };

  const sendData = () => {
    const dateStartSelected = selectedStartDate.toString();
    const dateEndSelected = selectedEndDate.toString();
    const dateFromTo = [dateStartSelected, dateEndSelected];
    props.onData(dateFromTo);
  };

  const width = Dimensions.get("window").width;

  return (
    <SafeAreaView>
      <View>
        <CalendarPicker
          startFromMonday={true}
          allowRangeSelection={true}
          minDate={new Date()}
          maxDate={new Date(2050, 6, 3)}
          weekdays={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
          months={[
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
          ]}
          previousTitle="Prev"
          nextTitle="Next"
          todayBackgroundColor="#E0BBE4"
          selectedDayColor="#66ff33"
          selectedDayTextColor="#000000"
          onDateChange={onDateChange}
          width={width - 60}
        />
      </View>
      <View>
        <TouchableOpacity onPress={sendData}>
          <Text style={style.pickdate}>Chọn ngày</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  pickdate: {
    width: "40%",
    backgroundColor: "#274c77",
    fontSize: 12,
    fontWeight: "600",
    color: "#fff",
    lineHeight: 10,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    alignSelf: "center",
    marginBottom: 2,
  },
});

export default CalendarScreen;
