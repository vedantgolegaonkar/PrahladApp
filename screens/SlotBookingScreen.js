import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Toast from "react-native-toast-message";
import { useBooking } from "../context/BookingContext";
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SlotBookingScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const { addBooking } = useBooking();
  const [isMahaPrasadAvailable, setIsMahaPrasadAvailable] = useState(false);
  const [userId, setUserId] = useState(null); // Initialize userId state
  
  // Determine the environment safely
  const appEnv =
    (Constants.manifest && Constants.manifest.releaseChannel) || "dev";
  const envConfig = Constants.manifest?.extra?.[appEnv] || {
    apiUrl: "http://192.168.1.4:5000",
  };
  const apiUrl = envConfig.apiUrl;

  // Fetch user ID asynchronously
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const id = await getData("userId");
        console.log("###############Setting user ID:", id);
        setUserId(id);  // Store the userId in component state
        console.log("###############Setting user ID:", userId);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };

    fetchUserId(); // Call the async function inside useEffect
  }, []);

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // Value exists
        return value;
      }
    } catch (e) {
      console.error('Failed to fetch data from AsyncStorage:', e);
    }
  };



  const handleDayPress = (day) => {
    const date = new Date(day.timestamp);
    const isSaturday = date.getDay() === 6;
    if (isSaturday) {
      setSelectedDate(day.dateString);
    } else {
      Alert.alert("Invalid Selection", "You can only book slots on Saturdays");
    }
  };

  const toggleMahaPrasadAvailability = () => {
    setIsMahaPrasadAvailable((previousState) => !previousState);
  };

  const handleConfirmBooking = () => {
    Alert.alert(
      "Confirm Booking",
      "Are you sure you want to confirm this slot?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Booking Cancelled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            if (!userId) {
              Alert.alert("User ID Error", "User ID is not available.");
              return;
            }

            const bookedSlot = {
              user_id: userId,  // Replace with actual user ID
              booking_date: selectedDate,
              mahaprasad: isMahaPrasadAvailable ? true : false,
            };
  
            try {
              console.log("&&&&&***&&&&",JSON.stringify(bookedSlot));
              const response = await fetch(`${apiUrl}/book`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(bookedSlot),
              });
  
              if (response.ok) {
                addBooking(bookedSlot);
  
                Toast.show({
                  type: "success",
                  text1: "Success",
                  text2: "Your Slot has been booked successfully! 🎉",
                  visibilityTime: 2500,
                });
  
                setTimeout(() => {
                  navigation.navigate("My Bookings");
                }, 2500);
              } else {
                const errorData = await response.json();
                console.error("Booking failed:", errorData);
                Alert.alert("Booking Failed", "Unable to book your slot. Please try again later.");
              }
            } catch (error) {
              console.error("Error:", error);
              Alert.alert("Network Error", "Please check your internet connection and try again.");
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book Your Upasana Slot</Text>
      <Calendar
        minDate={"2024-12-01"}
        maxDate={"2025-12-31"}
        current={"2025-01-01"}
        onDayPress={handleDayPress}
        theme={{
          calendarBackground: "#f8f8ff",
          textSectionTitleColor: "#b6c1cd",
          selectedDayBackgroundColor: "#ff8c00",
          selectedDayTextColor: "#ffffff",
          todayTextColor: "#00adf5",
          dayTextColor: "#2d4150",
          textDisabledColor: "#d9e1e8",
          monthTextColor: "#ff4500",
          arrowColor: "#ff4500",
        }}
        markingType={"custom"}
        markedDates={{
          [selectedDate]: {
            selected: true,
            selectedColor: "#ff8c00",
          },
        }}
        monthFormat={"yyyy MMM"}
        onMonthChange={(month) => {
          const year = parseInt(month.year);
          const monthNumber = parseInt(month.month);

          if (year === 2025 && monthNumber === 12) {
            return;
          }
          if (year > 2025 || (year === 2025 && monthNumber > 12)) {
            Alert.alert(
              "Date Out of Range",
              "You cannot Book past December 2025"
            );
          }
        }}
        dayComponent={({ date, state }) => {
          const isSaturday = new Date(date.timestamp).getDay() === 6;
          const isSelected = date.dateString === selectedDate;
          return (
            <TouchableOpacity
              disabled={!isSaturday}
              onPress={() => handleDayPress(date)}
            >
              <View
                style={[
                  styles.dayContainer,
                  isSelected ? styles.selectedDay : null,
                  { opacity: state === "disabled" || !isSaturday ? 0.5 : 1 },
                ]}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color:
                      state === "disabled" || !isSaturday
                        ? "#d3d3d3"
                        : "#2d4150",
                    fontWeight: isSaturday ? "bold" : "normal",
                  }}
                >
                  {date.day}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      <View style={styles.toggleContainer}>
        <Switch
          value={isMahaPrasadAvailable}
          onValueChange={toggleMahaPrasadAvailability}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isMahaPrasadAvailable ? "#ff4500" : "#f4f3f4"}
        />
        <Text
          style={
            isMahaPrasadAvailable ? styles.toggleTextAfter : styles.toggleText
          }
        >
          MahaPrasad is {isMahaPrasadAvailable ? "Available" : "Not Available"}
        </Text>
      </View>

      {selectedDate ? (
        <View style={styles.selection}>
          <Text style={styles.selectedText}>Selected Date: {selectedDate}</Text>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmBooking}
          >
            <Text style={styles.confirmButtonText}>Confirm Slot</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
    color: "#ff4500",
  },
  selection: { marginTop: 20, alignItems: "center" },
  selectedText: { fontSize: 18, marginBottom: 20, color: "#2d4150" },
  confirmButton: {
    backgroundColor: "#ff4500",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  confirmButtonText: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  selectedDay: { borderColor: "#ff8c00", borderWidth: 2 },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  toggleText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#2d4150", // Text color according to the theme
    fontWeight: "bold",
  },
  toggleTextAfter: {
    fontSize: 18,
    marginLeft: 10,
    color: "#ff4500", // Text color according to the theme
    fontWeight: "bold",
  },
});

export default SlotBookingScreen;
