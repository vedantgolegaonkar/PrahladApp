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

const Upasana_Booking = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const { addBooking } = useBooking();
  const [userId, setUserId] = useState(null); // Initialize userId state
  const [bookedDates, setBookedDates] = useState({}); // State to store booked dates


  // Determine the environment safely
  const appEnv =
    (Constants.manifest && Constants.manifest.releaseChannel) || "dev";
  const envConfig = Constants.manifest?.extra?.[appEnv] || {
    apiUrl: "https://upasana-app-gdm2p.ondigitalocean.app",
  };
  const apiUrl = envConfig.apiUrl;

  const [selectedOption, setSelectedOption] = useState(null); // State to store selected value

  const isMahaPrasadAvailable = selectedOption === "Yes";

  const handleSelection = (option) => {
    setSelectedOption(option);
  };

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

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const response = await fetch(`${apiUrl}/bookingsDates`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          const dates = data.booked_dates; // Ensure this matches your API's response structure
          console.log("Booked dates fetched:", dates);

          // Transform dates into the required format for the calendar
          const markedDates = dates.reduce((acc, date) => {
            acc[date] = {
              disabled: true,
              disableTouchEvent: true,
              marked: true,
              dotColor: "gray", // Gray-out color
            };
            return acc;
          }, {});

          // Update state
          setBookedDates(markedDates);
        } else {
          console.error("Failed to fetch booked dates. Response:", response);
        }
      } catch (error) {
        console.error("Error fetching booked dates:", error);
      }
    };

    // Call the function immediately when the component mounts
    fetchBookedDates();

    // Set an interval to periodically fetch booked dates
    const intervalId = setInterval(fetchBookedDates, 30000); // 30 seconds

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [apiUrl]);


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
      Alert.alert("Invalid Selection", "You can only book upasana on Saturdays");
    }
  };

  const toggleMahaPrasadAvailability = () => {
    setIsMahaPrasadAvailable((previousState) => !previousState);
  };

  const handleConfirmBooking = () => {
    if (!selectedOption) {
      Alert.alert("Validation Error", "Please select if Mahaprasad is available.");
      return;
    }

    let finalMessage;

    if (isMahaPrasadAvailable) {
      finalMessage = "MahaPrasad is available, Do you want to confirm booking?";
    } else {
      finalMessage = "MahaPrasad is NOT available, Do you want to confirm booking?";
    }

    Alert.alert(
      "Confirm Booking",
      finalMessage,
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
              user_id: userId, // Replace with actual user ID
              booking_date: selectedDate,
              mahaprasad: isMahaPrasadAvailable ? true : false,
            };

            try {
              console.log("&&&&&***&&&&", JSON.stringify(bookedSlot));
              const response = await fetch(`${apiUrl}/book`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(bookedSlot),
              });

              if (response.ok) {
                addBooking(bookedSlot);

                Alert.alert("Booking Success", "Your upasana booked successfully!");

                setTimeout(() => {
                  navigation.navigate("My Bookings");
                }, 2500);
              } else {
                const errorData = await response.json();
                console.error("Booking failed:", JSON.stringify(errorData.error));
                Alert.alert("Booking not available!", errorData.error);
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
      <Text style={styles.title}>Book Your Upasana</Text>
      <Calendar
        minDate={"2025-01-01"}
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
          ...Object.keys(bookedDates).reduce((acc, date) => {
            acc[date] = {
              disabled: bookedDates[date]?.disabled,
              disableTouchEvent: true,
              customStyles: {
                container: {
                  backgroundColor: bookedDates[date]?.disabled
                    ? "#b22222" // Consistent red background for disabled dates
                    : "transparent",
                  borderRadius: 0, // Ensure all have a circular shape
                },
                text: {
                  color: bookedDates[date]?.disabled ? "#ffffff" : "#2d4150",
                  fontWeight: bookedDates[date]?.disabled ? "bold" : "normal",
                },
              },
            };
            return acc;
          }, {}),
          ...(selectedDate && {
            [selectedDate]: {
              selected: true,
              customStyles: {
                container: {
                  backgroundColor: "#ff8c00",
                  borderRadius: 0, // Ensure selected dates are also circular
                },
                text: {
                  color: "#ffffff",
                  fontWeight: "bold",
                },
              },
            },
          }),
        }}
        monthFormat={"MMMM yyyy"} // Displays the full month name and year
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
          const dateKey = date.dateString;
          const isSaturday = new Date(date.timestamp).getDay() === 6;
          const isSelected = dateKey === selectedDate;
          const isDisabled = bookedDates[dateKey]?.disabled;

          return (
            <TouchableOpacity
              disabled={isDisabled || !isSaturday} // Disable interaction for invalid dates
              onPress={() => handleDayPress(date)}
            >
              <View
                style={[
                  styles.dayContainer,
                  isSelected ? styles.selectedDay : null,
                  isDisabled
                    ? { backgroundColor: "#b22222", borderRadius: 0 } // Red for disabled dates
                    : null,
                  { opacity: isDisabled || !isSaturday ? 0.5 : 1 }, // Reduce opacity for disabled
                ]}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: isDisabled
                      ? "#ffffff" // White text for disabled
                      : state === "disabled" || !isSaturday
                        ? "#d3d3d3"
                        : "#2d4150", // Normal color
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

      <View style={styles.container}>
        {/* Radio Group */}
        <View style={styles.radioGroupContainer}>
          <Text style={styles.label}>Is MahaPrasad Available?</Text>
          <View style={styles.radioGroup}>
            {/* Yes Option */}
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => handleSelection("Yes")}
            >
              <View
                style={[
                  styles.outerCircle,
                  selectedOption === "Yes" && styles.selectedOuterCircle,
                ]}
              >
                {selectedOption === "Yes" && <View style={styles.innerCircle} />}
              </View>
              <Text style={styles.radioLabel}>Yes</Text>
            </TouchableOpacity>

            {/* No Option */}
            <TouchableOpacity
              style={styles.radioButton}
              onPress={() => handleSelection("No")}
            >
              <View
                style={[
                  styles.outerCircle,
                  selectedOption === "No" && styles.selectedOuterCircle,
                ]}
              >
                {selectedOption === "No" && <View style={styles.innerCircle} />}
              </View>
              <Text style={styles.radioLabel}>No</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Display Selected Option */}
        <Text style={styles.resultText}>
          MahaPrasad availability : {selectedOption || "Not Selected"}
        </Text>
        <Text style={styles.resultText}>
          “ महाप्रसाद ऐच्छिक आहे. महाप्रसाद करायचा असेल तर फक्त कढी खिचडी करावी “
        </Text>
      </View>

      {selectedDate ? (
        <View style={styles.selection}>
          <Text style={styles.selectedText}>
            Selected Date: {new Date(selectedDate).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </Text>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmBooking}
          >
            <Text style={styles.confirmButtonText}>Confirm upasana</Text>
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
    borderRadius: 0, // Remove border-radius to make the days square
  },
  selectedDay: {
    borderColor: "#ff8c00",
    borderWidth: 2
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  toggleText: {
    fontSize: 18,
    marginLeft: 10,
    color: "#ff4500", // Text color according to the theme
    fontWeight: "bold",
  },
  toggleTextAfter: {
    fontSize: 18,
    marginLeft: 10,
    color: "#006400", // Text color according to the theme
    fontWeight: "bold",
  },
  radioGroupContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  radioGroup: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  radioButton: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  outerCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#888",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  selectedOuterCircle: {
    borderColor: "#ff4500",
  },
  innerCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#ff4500",
  },
  radioLabel: {
    fontSize: 18,
    color: "#333",
  },
  resultText: {
    fontSize: 18,
    color: "#555",
    marginTop: 20,
  },
});

export default Upasana_Booking;
