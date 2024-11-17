import React, { useRef, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const translateX = useRef(new Animated.Value(width)).current; // Start marquee from the right

  useEffect(() => {
    const animateMarquee = () => {
      translateX.setValue(width); // Reset to start position (end of screen)
      Animated.timing(translateX, {
        toValue: -width * 2, // Ensure text scrolls completely off-screen
        duration: 10000, // Adjust scrolling speed
        useNativeDriver: true,
      }).start(() => animateMarquee()); // Loop the animation
    };

    animateMarquee();
  }, [translateX]);

  return (
    <View style={styles.container}>
      {/* Marquee effect */}
      <View style={styles.marqueeContainer}>
          <Animated.Text style={[styles.marqueeText, { transform: [{ translateX }] }]}>
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
            # एका महिन्यात उर्वरित पुणे मध्ये जस्तीत जास्त दोन तसेच पिंपरी चिंचवड मध्ये देखील जास्तीत जास्त दोन उपासना बुक होतील.
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
  marqueeContainer: {
    width: "100%",
    overflow: "hidden", // Ensures text outside the container is hidden
    marginBottom: 20,
    height: 40, // Set height to fit text properly
  },
  marqueeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff4500",
    whiteSpace: "nowrap", // Ensure text stays on a single line
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
});

export default HomeScreen;
