import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import BookingScreen from "../screens/BookingScreen";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
// import PdfScreen from "../screens/PdfScreen"; // New PDF screen
import { Ionicons } from "@expo/vector-icons";
import BookingsScreen from "./BookingsScreen";
import ContactScreen from "./ContactScreen";


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
          }else if (route.name === "All Bookings") {
            iconName = "folder";
          }else if (route.name === "Contact") {
            iconName = "call";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#ff4500",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
      >
      {(props) => <HomeScreen {...props} onLogout={handleLogout} />} 
    </Tab.Screen>
      <Tab.Screen name="My Bookings">
        {(props) => <BookingScreen {...props} bookings={bookings} />}
      </Tab.Screen>
      {/* <Tab.Screen name="List" component={ListScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} /> */}
      <Tab.Screen name="All Bookings" component={BookingsScreen} />
      <Tab.Screen name="Profile">
        {(props) => <ProfileScreen {...props} onLogout={handleLogout} />}
      </Tab.Screen>
      <Tab.Screen name="Contact">
        {(props) => <ContactScreen {...props} onLogout={handleLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default UserDashboard;
