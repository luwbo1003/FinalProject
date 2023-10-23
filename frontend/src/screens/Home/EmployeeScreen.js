import React, {useEffect, useState} from "react";
import {Button, SafeAreaView, StyleSheet, Text, TextInput, ScrollView, View} from "react-native";
import {createEmployee, getAllEmployees, getEmployeesById} from "../../services/employeeService"
import Constants from 'expo-constants';
import {List} from "react-native-paper";

const EmployeeScreen = () => {
    const [employees, setEmployees] = useState([]);
    const [employeeId, setEmployeeId] = useState("");
    const [employee, setEmployee] = useState(null);
    const [newEmployeeData, setNewEmployeeData] = useState({
        id: "", // Tương ứng với em_id trong Firebase
        name: "", // Tương ứng với em_name trong Firebase
        age: "", // Tương ứng với em_age trong Firebase
    });

    // useEffect(() => {
    //     getAllEmployees()
    //         .then((data) => {
    //             setEmployees(data);
    //         })
    //         .catch((error) => {
    //             console.error("Error fetching employee:", error)
    //         });
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllEmployees();
                setEmployees(response);
            } catch (error) {
                console.error("Error fetching employees:", error);
            }
        };
        fetchData();
    }, []);
    const fetchEmployee = async () => {
        try {
            const response = await getEmployeesById(employeeId);
            setEmployee(response);
        } catch (error) {
            console.error("Error fetching employee:", error);
        }
    };

    const handleCreateEmployee = async () => {
        try {
            const createdEmployee = await createEmployee(newEmployeeData);

            // Tạo một bản sao mới của employees
            const updatedEmployees = { ...employees };
            updatedEmployees[employeeId] = {
                name: newEmployeeData.name,
                age: newEmployeeData.age,
            };

            // Thêm nhân viên mới vào employees
            updatedEmployees[createdEmployee.id] = createdEmployee;

            // Cập nhật state employees với bản sao mới đã cập nhật
            setEmployees(updatedEmployees);

            // Cập nhật thông tin nhân viên vừa tạo
            setEmployee(createdEmployee);
            setEmployeeId(createdEmployee.id);
        } catch (error) {
            console.error("Error creating employee:", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>All Employees:</Text>
            <ScrollView
                style={styles.scrollView}
            >
                <View>
                    {Object.keys(employees).map((employeeId, index) => (
                        <Text key={index} style={styles.paragraph}>
                            <Text>
                                EmployeeID: {employeeId}
                            </Text>
                            <Text>
                                Employee name: {employees[employeeId]?.name}
                            </Text>
                            <Text>
                                Employee age: {employees[employeeId]?.age}
                            </Text>
                        </Text>
                    ))}
                </View>
            </ScrollView>


            {/*<Button style={styles.button} mode="contained" onPress={fetchEmployee} title={"Fetch Employee"}/>*/}
            <View>
                <TextInput
                    style={styles.input}
                    placeholder="Search for Employee ID"
                    value={employeeId ? employeeId.toString() : ""}
                    onChangeText={(text) => setEmployeeId(text)}
                />
                <View>
                    <Text>
                        EmployeeID: {employeeId}
                    </Text>
                    <Text>
                        Employee name: {employees[employeeId]?.name}
                    </Text>
                    <Text>
                        Employee age: {employees[employeeId]?.age}
                    </Text>
                </View>
            </View>

            <Text style={styles.title}>Create New Employee:</Text>
            <View>
                <TextInput
                    placeholder="Employee ID"
                    value={newEmployeeData.id}
                    onChangeText={(text) => setNewEmployeeData({ ...newEmployeeData, id: text })}
                />
                <TextInput
                    placeholder="Employee Name"
                    value={newEmployeeData.name}
                    onChangeText={(text) => setNewEmployeeData({ ...newEmployeeData, name: text })}
                />
                <TextInput
                    placeholder="Employee Age"
                    value={newEmployeeData.age}
                    onChangeText={(text) => setNewEmployeeData({ ...newEmployeeData, age: text })}
                />

            </View>
            <Button style={styles.button} mode="contained" onPress={handleCreateEmployee} title={"Create Employee"}/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    paragraph: {
        margin: 5,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    button:{
        width: 50,
        flex:1
    },
    scrollView: {
        height: 100,
        width: '100%',
        alignSelf: 'flex-start',
        borderRadius: 5,
    },
});
export default EmployeeScreen;
