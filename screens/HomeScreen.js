import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation, onLogout }) => {
  const blinkOpacity = useRef(new Animated.Value(1)).current; // For blinking effect

  useEffect(() => {
    const animateBlink = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(blinkOpacity, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
          }),
          Animated.timing(blinkOpacity, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animateBlink();
  }, [blinkOpacity]);

  const handleLogout = () => {
    // Show confirmation alert
    Alert.alert(
      "Logout", // Title of the alert
      "Are you sure you want to log out?", // Message
      [
        {
          text: "Cancel",
          onPress: () => console.log("Logout cancelled"), // If user selects "Cancel"
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => onLogout(), // If user selects "Yes", log out
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
       <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={30} color="#ff4500" />
      </TouchableOpacity>
      {/* Blinking Text */}
      <View style={styles.blinkContainer}>
        <Animated.Text style={[styles.blinkText, { opacity: blinkOpacity }]}>
          श्रीराम जय राम जय जय राम!
        </Animated.Text>
        <Animated.Text style={[styles.blinkText, { opacity: blinkOpacity }]}>
          श्रीराम जय राम जय जय राम!
        </Animated.Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>रामदासी बाणा @ पुणे</Text>
        <View>
          <Text style={styles.grouprules}>
            आपला रामदासी बाणा परिवार पुणे परिसरात खालीलप्रमाणे ३ विभागात विभागला आहे.
          </Text>
          <Text style={styles.grouprules}>झोन A ( पूर्व पुणे )</Text>
          <Text style={styles.grouprules}>झोन B ( उर्वरित पुणे )</Text>
          <Text style={styles.grouprules}>झोन C ( पिंपरी चिंचवड )</Text>
          <Text style={styles.grouprules}>
            # एका महिन्यात पूर्व पुणे मध्ये जास्तीत जास्त एक उपासना बुक होईल.
          </Text>
          <Text style={styles.grouprules}>
            # एका महिन्यात उर्वरित पुणे मध्ये जास्तीत जास्त दोन तसेच पिंपरी चिंचवड मध्ये देखील जास्तीत जास्त दोन उपासना बुक होतील.
          </Text>
        </View>
      </View>

      {/* Button at the bottom */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Upasana_Booking")}
      >
        <Text style={styles.buttonText}>Upasana booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "#ff4500",
  },
  grouprules: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  blinkContainer: {
    alignItems: "center",
    marginBottom: 20,
    height: 40, // Set height to fit text properly
  },
  blinkText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff4500",
  },
  button: {
    width: "100%",
    height: 45,
    backgroundColor: "#ff4500",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#fff",
    padding: 10,
    elevation: 1,
    borderRadius: 5,
    position: "absolute",
    top: 15,
    right: 15,
    shadowOpacity: 1,
  },
});

export default HomeScreen;
