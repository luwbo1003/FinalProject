import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import AddBtn_UI from './AddBtn_UI';
import { Ionicons } from '@expo/vector-icons';



export default function AddBtn() {
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View>
            <TouchableOpacity
                style={styles.addBtn}
                onPress={() => setModalVisible(true)}
            >
                <View style={styles.iconContainer}>
                    <Ionicons name="add-outline" color="white" size={30} />
                </View>
            </TouchableOpacity>
            <AddBtn_UI isVisible={modalVisible} onClose={() => setModalVisible(false)} />
        </View>
    )
}

const styles = StyleSheet.create({
    addBtn: {
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "blue",
        width: 65,
        height: 65,
    },
    iconContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
})
