import React, {useState} from "react";
import {Button, ScrollView, StyleSheet, Switch, Text, TextInput, View,} from "react-native";
import CalendarScreen from "./CalendarScreen";
import {createNotification} from "../../services/notificationService";

const PickerData = () => {

    const [name, setNameMed] = useState('');
    const [quantity, setQuantityMed] = useState('');
    const [hour, setHours] = useState('');
    const [minute, setMinutes] = useState('');
    const [DateStart, setDateStart] = useState('');
    const [DateEnd, setDateEnd] = useState('');

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
    const [isContentVisible, setContentVisible] = React.useState(true);

    const [dateFromChild, setDateFromChild] = useState("");
    const handleDateFromChild = (data) => {
        setDateFromChild(data);
        setHours(dateFromChild[2].toString());
        setMinutes(dateFromChild[3].toString());
        setDateStart(formatDateString(dateFromChild[0]));
        setDateEnd(formatDateString(dateFromChild[1]));
    };
    const [timerFromChild, setTimerFromChild] = useState("");
    const handleTimeFromChild = (time) => {
        setTimerFromChild(time);
    };

    function formatDateString(inputString) {
        try {
            const dateObject = new Date(inputString);
            const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
            return dateObject.toLocaleDateString(undefined, options);
        } catch (error) {
            return "Ngày không hợp lệ";
        }
    }

// add pills

    const [inputFields, setInputFields] = useState([
        {id: 1, text: '', number: ''},
    ]);


    const handleCreateNotification = async () => {
        const notificationData = {
            name,
            quantity,
            hour,
            minute,
            DateStart,
            DateEnd,
        };
        try {
            const response = await createNotification(notificationData);
            // Xử lý phản hồi từ máy chủ (nếu cần)
            console.log('Thông báo đã được tạo:', response);
        } catch (error) {
            console.error('Lỗi khi tạo thông báo:', error);
        }
    };



    return (
        <ScrollView>
            <View style={style.container}>
                {console.log(name, quantity, hour, minute, DateStart, DateEnd)}
                <View style={style.container}>
                    <View style={style.row}>
                        <TextInput
                            style={style.input}
                            placeholder="Nhập chữ"
                            value={name}
                            onChangeText={(text) => setNameMed(text)}
                        />
                        <TextInput
                            style={style.input}
                            placeholder="Nhập số"
                            keyboardType="numeric"
                            value={quantity}
                            onChangeText={(text) => setQuantityMed(text)}
                        />
                    </View>
                </View>
                <View style={style.time_row}>
                    <Text>Hằng ngày</Text>
                    <Switch
                        style={style.switch}
                        trackColor={{false: "#767577", true: "#81b0ff"}}
                        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={isEnabled}
                    />
                </View>
                <View style={{height: 0.2, backgroundColor: "rgba(0,0,0,0.3)"}}/>
                <View style={style.time_row}>
                    <Text>Từ ngày</Text>
                    <Text
                        onPress={() => setContentVisible(!isContentVisible)}> {dateFromChild ? formatDateString(dateFromChild[0]) : 'Chọn ngày'}</Text>
                </View>
                {!isContentVisible && (
                    <View style={style.cal}>
                        <CalendarScreen onData={handleDateFromChild}/>
                    </View>
                )}

                <View style={{height: 0.2, backgroundColor: "rgba(0,0,0,0.3)"}}/>
                <View style={style.time_row}>
                    <Text>Đến ngày</Text>
                    <Text> {dateFromChild ? formatDateString(dateFromChild[1]) : ''}</Text>
                </View>
                <Button title="Tạo thông báo" onPress={handleCreateNotification}/>

            </View>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    container: {
        padding: 10,
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
    time_row: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    cal: {
        padding: 20,
    },

    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        marginRight: 8,
    },
});

export default PickerData;