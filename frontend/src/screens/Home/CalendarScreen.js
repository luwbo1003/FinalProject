import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Button } from "react-native";
import CalendarPicker from "react-native-calendar-picker";

const CalendarScreen = (props) => {
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const onDateChange = (date, type) => {
        //function to handle the date change
        if (type === 'END_DATE') {
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
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <CalendarPicker
                    startFromMonday={true}
                    allowRangeSelection={true}
                    minDate={new Date()}
                    maxDate={new Date(2050, 6, 3)}
                    weekdays={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
                    months={[
                        'January',
                        'February',
                        'March',
                        'April',
                        'May',
                        'June',
                        'July',
                        'August',
                        'September',
                        'October',
                        'November',
                        'December',
                    ]}
                    previousTitle="Prev"
                    nextTitle="Next"
                    todayBackgroundColor="#E0BBE4"
                    selectedDayColor="#66ff33"
                    selectedDayTextColor="#000000"
                    scaleFactor={370}
                    onDateChange={onDateChange}
                />
            </View>
            <Button onPress={sendData} title={"Tiếp tục"}/>
        </SafeAreaView>
    );
};

export default CalendarScreen;

const styles = StyleSheet.create({
    //   container: {
    //     padding: '20px',
    //     flex: 1,
    //     backgroundColor: "#ffffff",
    //     zIndex: 0,
    //   },
    //   textStyle: {
    //     fontSize: 10,
    //   },
    //   titleStyle: {
    //     textAlign: "center",
    //     fontSize: 10,
    //   },
});