import React, { useState } from "react";
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

const SlotBookingScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const { addBooking } = useBooking();
  const [isMahaPrasadAvailable, setIsMahaPrasadAvailable] = useState(false);

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
    // Trigger Confirmation Dialog
    Alert.alert(
      "Confirm Booking",
      "Are you sure you want to confirm this slot?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Booking Cancellled"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            const bookedSlot = {
              date: selectedDate,
              status: "Confirmed",
              MahaPrasadStatus: isMahaPrasadAvailable
                ? "Available"
                : "Not Available",
            };
            addBooking(bookedSlot);

            setTimeout(() => {
              navigation.navigate("My Bookings");
            }, 2500);

            Toast.show({
              type: "success",
              text1: "Success",
              text2: "Your Slot has been booked successfully! 🎉",
              visibilityTime: 2500,
            });
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
        minDate={"2026-01-01"}
        maxDate={"2026-12-31"}
        current={"2026-01-01"}
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

          if (year === 2026 && monthNumber === 12) {
            return;
          }
          if (year > 2026 || (year === 2026 && monthNumber > 12)) {
            Alert.alert(
              "Date Out of Range",
              "You cannot Book past December 2026"
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
