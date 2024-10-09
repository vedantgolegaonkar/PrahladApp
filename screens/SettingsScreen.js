import React from 'react'
import { View, Text, StyleSheet } from 'react-native';


const SettingsScreen = () => {
  return (
    <View style={StyleSheet.container}>
        <Text style={styles.text}>This is your Settings screen</Text>
    </View>
)
};

const styles = StyleSheet.create({
container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
text: { fontSize: 18, color: '#ff4500', paddingTop: 15, paddingLeft: 20, paddingRight: 20, paddingBottom: 15 },
})

export default SettingsScreen