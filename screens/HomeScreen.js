import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Prahlad Upasana</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SlotBooking")}
      >
        <Text style={styles.buttonText}>Book a Slot</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "#ff4500",
  },
  text: { marginTop: 8, marginBottom: 8 },
  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#ff4500",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: { color: "#ffffff", fontSize: 18, fontWeight: "bold" },
});

export default HomeScreen;
