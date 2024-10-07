import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';


const SlotBookingScreen = () => {
    const [selectedDate, setSelectedDate] = useState('');

    const handleDayPress = (day) => {
        const date = new Date(day.timestamp);
        const isSaturday = date.getDay() === 6;
        if (isSaturday) {
            setSelectedDate(day.dateString)
        } else {
            Alert.alert('Invalid Selection', 'You can only book slots on Saturdays');
        }
    };

    // const disableNonSaturdays = (day) => {
    //     const date = new Date(day.timestamp);
    //     return date.getDay() !== 6;
    // };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Book Your Upasana Slot</Text>
            <Calendar
                minDate={'2025-01-01'}
                maxDate={'2025-12-31'}
                current={'2025-01-01'}
                onDayPress={handleDayPress}
                theme={{
                    calendarBackground: '#f8f8ff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#ff8c00',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    monthTextColor: '#ff4500',
                    arrowColor: '#ff4500'
                }}
                markingType={'custom'}
                markedDates={{
                    [selectedDate]: {
                        selected: true,
                        selectedColor: '#ff8c00',
                    }
                }}
                monthFormat={'yyyy MMM'}
                onMonthChange={(month) => {
                    const year = parseInt(month.year);
                    const monthNumber = parseInt(month.month);

                    if (year === 2025 && monthNumber === 12) {
                        return;
                    }
                    if (year > 2025 || (year === 2025 && monthNumber > 12)) {
                        Alert.alert('Date Out of Range', 'You cannot Book past December 2025')
                    }
                }}
                dayComponent={({ date, state }) => {
                    const isSaturday = new Date(date.timestamp).getDay() === 6;
                    const isSelected = date.dateString === selectedDate;
                    return (
                        <TouchableOpacity disabled={!isSaturday} onPress={() => handleDayPress(date)}>
                            <View style={[styles.dayContainer, isSelected ? styles.selectedDay : null, { opacity: state === 'disabled' || !isSaturday ? 0.5 : 1 }]}>
                                <Text style={{
                                    textAlign: 'center', color: state === 'disabled' || !isSaturday ? '#d3d3d3' : '#2d4150', fontWeight: isSaturday ? 'bold' : 'normal'
                                }}>{date.day}</Text>
                            </View>
                        </TouchableOpacity>

                    );
                }} />

            {selectedDate ? (
                <View style={styles.selection}>
                    <Text style={styles.selectedText}>Selected Date: {selectedDate}</Text>
                    <TouchableOpacity style={styles.confirmButton} onPress={() => Alert.alert('Booking Confirmed', `Your slot on ${selectedDate} is Confirmed`)}>
                        <Text style={styles.confirmButtonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
            ) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#ffffff' },
    title: { fontSize: 24, textAlign: 'center', marginBottom: 20, fontWeight: 'bold', color: '#ff4500' },
    selection: { marginTop: 20, alignItems: 'center' },
    selectedText: { fontSize: 18, marginBottom: 20, color: '#2d4150' },
    confirmButton: { backgroundColor: '#ff4500', paddingVertical: 10, paddingHorizontal: 30, borderRadius: 5 },
    confirmButtonText: { color: '#ffffff', fontSize: 16, fontWeight: 'bold' },
    dayContainer: { alignItems: 'center', justifyContent: 'center', height: 40, width: 40, borderRadius: 20 },
    selectedDay: { borderColor: '#ff8c00', borderWidth: 2 },
})

export default SlotBookingScreen;