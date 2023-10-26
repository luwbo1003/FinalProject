import React, { useState, useEffect, useRef } from "react";
import * as Device from "expo-device";
//import * as Notifications from 'expo-notifications';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Text,
  Platform,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";
//import DateTimePickerModal from "react-native-modal-datetime-picker";

//Notification
// Notifications.setNotificationHandler({
//     handleNotification: async () => ({
//         shouldShowAlert: true,
//         shouldPlaySound: true,
//         shouldSetBadge: false,
//     }),
// });
//
// async function schedulePushNotification(hours, minutes) {
//     let date = new Date();
//     test.setHours(parseInt(hours, 10), parseInt(minutes, 10),0);
//     await Notifications.scheduleNotificationAsync({
//         content: {
//             sound: "default",
//             title: 'Đã đến giờ uống thuốc',
//             body: 'Bạn cần uống những loại thuốc sau ...',
//         },
//         trigger: { date: test},
//         // trigger: { seconds: 2},
//     });
// }
//
// async function registerForPushNotificationsAsync() {
//     let token;
//
//     if (Platform.OS === 'android') {
//         await Notifications.setNotificationChannelAsync('default', {
//             name: 'default',
//             importance: Notifications.AndroidImportance.MAX,
//             vibrationPattern: [0, 250, 250, 250],
//             lightColor: '#FF231F7C',
//         });
//     }
//
//     if (Device.isDevice) {
//         const { status: existingStatus } = await Notifications.getPermissionsAsync();
//         let finalStatus = existingStatus;
//         if (existingStatus !== 'granted') {
//             const { status } = await Notifications.requestPermissionsAsync();
//             finalStatus = status;
//         }
//         if (finalStatus !== 'granted') {
//             alert('Failed to get push token for push notification!');
//             return;
//         }
//         token = (await Notifications.getExpoPushTokenAsync({ projectId: 'your-project-id' })).data;
//         console.log(token);
//     } else {
//         alert('Must use physical device for Push Notifications');
//     }
//     return token;
// }

let test;

//Calendar
const CalendarScreen = (props) => {
  // //Notification session
  // const [expoPushToken, setExpoPushToken] = useState('');
  // const [notification, setNotification] = useState(false);
  // const notificationListener = useRef();
  // const responseListener = useRef();
  //
  // useEffect(() => {
  //     registerForPushNotificationsAsync().then((token) => setExpoPushToken(token));
  //
  //     notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
  //         setNotification(notification);
  //     });
  //
  //     responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
  //         console.log(response);
  //     });
  //     return () => {
  //         Notifications.removeNotificationSubscription(notificationListener.current);
  //         Notifications.removeNotificationSubscription(responseListener.current);
  //     };
  // }, []);

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
    // let dateStartSelected = new Date(selectedStartDate.toString());
    // test = dateStartSelected;
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
      {/* <Button onPress={sendData} title="Chọn ngày" /> */}
      <View>
        <TouchableOpacity onPress={sendData}>
          <Text style={style.pickdate}>Chọn ngày</Text>
        </TouchableOpacity>
      </View>

      {/*<Button*/}
      {/*    title="Đặt lịch thông báo"*/}
      {/*    onPress={async () => {*/}
      {/*        await schedulePushNotification(hours, minutes);*/}
      {/*    }}*/}
      {/*/>*/}
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
