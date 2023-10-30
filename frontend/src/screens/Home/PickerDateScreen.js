import React, { useEffect, useRef, useState } from "react";
import {
  Platform,
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
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../../styles";

const PickerData = () => {
  const [MCName, setMCName] = useState("Đơn thuốc");
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

  const [uid, setuid] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const retrievedValue = await AsyncStorage.getItem("userID");
        const stringValue = String(retrievedValue);
        setuid(stringValue);
      } catch (error) {
        console.error("Error retrieving data from AsyncStorage:", error);
      }
    };
    fetchData();
  }, []);

  const handleCreateNotification = async () => {
    const times = customTimes.reduce((acc, customField, index) => {
      const i = index + 1;
      acc["idTime" + i] = {
        hour: customField.hour,
        min: customField.min,
      };
      return acc;
    }, {});
    const medicines = customMedicines.reduce((acc, customField, index) => {
      const i = index + 1;
      acc["idMed" + i] = {
        name: customField.name,
        quantity: customField.quantity,
      };
      return acc;
    }, {});
    const everday = isEnabled;
    const notificationData = {
      uid,
      MCName,
      medicines,
      times,
      dateStart,
      dateEnd,
      everday,
    };

    try {
      const response = await createNotification(notificationData);
      console.log("Thông báo đã được tạo:", response);
    } catch (error) {
      console.error("Lỗi khi tạo thông báo:", error);
    }
    await schedulePushNotification();
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

  // ============== NOTIFICATION SESSION =============================

  //Notification session
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });
    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // --------------------Set notifications-----------------------//

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });
  let hours;
  let minutes;
  function schedulePushNotification() {
    let startDate = new Date(dateFromChild[0]);
    let endDate = new Date(dateFromChild[1]);

    // count date between
    let oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let firstDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate()
    );
    let secondDate = new Date(
      endDate.getFullYear(),
      endDate.getMonth(),
      endDate.getDate()
    );
    let countDate = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    //set schedule
    for (let i = 0; i <= countDate; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      for (let k = 0; k < customTimes.length; k++) {
        date.setHours(customTimes[k].hour, customTimes[k].min, 0, 0);
        Notifications.scheduleNotificationAsync({
          content: {
            sound: "default",
            title: `Đã đến ${customTimes[k].hour}:${customTimes[k].min}, bạn cần uống thuốc`,
            body: "Bạn có đơn thuốc cần uống, hãy vào ứng dụng kiểm tra thuốc cần uống ...",
          },
          trigger: { date: date },
        }).then((r) => "Đặt thông báo thành công");
      }
    }
  }

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "your-project-id",
        })
      ).data;
    } else {
      alert("Must use physical device for Push Notifications");
    }
    return token;
  }

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
              trackColor={{ false: "#b0b0b0", true: "#274c77" }}
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
                  keyboardType={"numeric"}
                  value={customField.key}
                  onChangeText={(hour) => onInputHourHandler(hour, index)}
                />
                <Text style={{ marginHorizontal: 3, fontWeight: "600" }}>
                  :
                </Text>
                <TextInput
                  style={style.textinput}
                  placeholder={"00"}
                  keyboardType={"numeric"}
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
        {/* ---------------handleCreateNotification----//////////------------------ */}
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
    textAlign: "center",
  },
  textinput1: {
    width: "15%",
    paddingHorizontal: 5,
    paddingVertical: 7,
    backgroundColor: "#fff",
    borderRadius: 4,
    textAlign: "center",
  },
  add: {
    backgroundColor: colors.primary01,
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
    backgroundColor: colors.primary01,
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
    backgroundColor: colors.primary01,
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
