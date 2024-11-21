import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import BookingsScreen from "./BookingsScreen";
import DashboardScreen from "./DashboardScreen";
import MembersScreen from "./MembersScreen";

const Tab = createBottomTabNavigator();

const AdminDashboard = ({ handleLogout }) => {  // Destructure handleLogout prop
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Dashboard") {
            iconName = focused ? "stats-chart" : "stats-chart-outline";
          } else if (route.name === "Members") {
            iconName = focused ? "people" : "people-outline";
          } else if (route.name === "All Bookings") {
            iconName = focused ? "folder" : "folder-outline";
          } else if (route.name === "Notifications") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FF6F00",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Dashboard">
        {(props) => <DashboardScreen {...props} onLogout={handleLogout} />}
      </Tab.Screen>
      <Tab.Screen name="Members" component={MembersScreen} />
      <Tab.Screen name="All Bookings" component={BookingsScreen} />
     {/*  <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} /> */}
    </Tab.Navigator>
  );
};

export default AdminDashboard;
