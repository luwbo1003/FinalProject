import React, {useState} from "react";
import {Button, ScrollView, StyleSheet, Switch, Text, TextInput, View,} from "react-native";
import CalendarScreen from "./CalendarScreen";
import {createNotification} from "../../services/notificationService";

const PickerData = () => {

    const [name, setNameMed] = useState('');
    const [quantity, setQuantityMed] = useState('');
    const [hours, setHours] = useState('')
    const [minutes, setMinutes] = useState('')
    // const [dateStart, setDateStart] = useState('');
    // const [dateEnd, setDateEnd] = useState('');
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
            const options = {year: 'numeric', month: 'numeric', day: 'numeric'};
            return dateObject.toLocaleDateString(undefined, options);
        } catch (error) {
            return "Ngày không hợp lệ";
        }
    }
    let dateStart = formatDateString(dateFromChild[0])
    let dateEnd = formatDateString(dateFromChild[1])
    const handleCreateNotification = async () => {

        const notificationData = {
            name,
            quantity,
            hours,
            minutes,
            dateStart,
            dateEnd,
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
                <View style={style.container}>
                    <View style={style.row}>
                        <TextInput
                            style={style.input}
                            placeholder="Nhập tên thuốc"
                            value={name}
                            onChangeText={(text) => setNameMed(text)}
                        />
                        <TextInput
                            style={style.input}
                            placeholder="Nhập số lượng"
                            keyboardType="numeric"
                            value={quantity}
                            onChangeText={(text) => setQuantityMed(text)}
                        />
                    </View>
                    <View style={style.row}>
                        <TextInput
                            style={style.input}
                            placeholder="Nhập giờ"
                            keyboardType="numeric"
                            value={hours}
                            onChangeText={(text) => setHours(text)}
                        />
                        <TextInput
                            style={style.input}
                            placeholder="Nhập phút"
                            keyboardType="numeric"
                            value={minutes}
                            onChangeText={(text) => setMinutes(text)}
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
                {console.log(formatDateString(dateFromChild[0]), formatDateString(dateFromChild[1]))}
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