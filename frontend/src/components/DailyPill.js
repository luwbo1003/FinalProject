import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function DailyPill() {
  return (
    <View style={styles.container}>
      <View style={styles.frame}>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
    },
    frame:{
        borderColor: "black",
        borderWidth: 1,
        width: '100%', 
        height: 100,
        borderRadius: 10, 
    }
})