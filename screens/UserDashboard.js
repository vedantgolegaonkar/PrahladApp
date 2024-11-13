import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import BookingScreen from "../screens/BookingScreen";
import ListScreen from "../screens/ListScreen";
import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
// import PdfScreen from "../screens/PdfScreen"; // New PDF screen
import { Ionicons } from "@expo/vector-icons";
import Constants from 'expo-constants';


const Tab = createBottomTabNavigator();

const UserDashboard = ({ bookings, handleLogout }) => {
 
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "My Bookings") {
            iconName = "calendar";
          } else if (route.name === "List") {
            iconName = "list";
          } else if (route.name === "Notifications") {
            iconName = "notifications";
          } else if (route.name === "Profile") {
            iconName = "person";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ff4500",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="My Bookings">
        {(props) => <BookingScreen {...props} bookings={bookings} />}
      </Tab.Screen>
      <Tab.Screen name="List" component={ListScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="Profile">
        {(props) => <ProfileScreen {...props} onLogout={handleLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default UserDashboard;
