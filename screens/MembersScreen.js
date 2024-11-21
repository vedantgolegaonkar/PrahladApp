import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  TextInput, // Added for search functionality
} from "react-native";

const MembersScreen = ({ navigation }) => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]); // Added state for filtered members
  const [searchQuery, setSearchQuery] = useState(""); // Added state for search query
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    try {
      setLoading(true); // Show loading indicator during data fetch
      const response = await fetch("https://upasana-app-gdm2p.ondigitalocean.app/users");
      const data = await response.json();
      setMembers(data); // Set original members data
      setFilteredMembers(data); // Initialize filtered members with full list
    } catch (error) {
      console.error("Failed to fetch members:", error);
    } finally {
      setLoading(false); // Hide loading indicator after data fetch
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchMembers);

    return unsubscribe; // Clean up the listener on unmount
  }, [navigation]);

  // Filter members whenever the search query changes
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredMembers(members); // Reset to all members if the query is empty
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = members.filter((item) =>
        `${item.first_name} ${item.last_name}`.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredMembers(filtered);
    }
  }, [searchQuery, members]); // Dependencies: searchQuery and members

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.memberCard}
      onPress={() => navigation.navigate("MembersDetailsScreen", { member: item })}
    >
      <View style={styles.memberDetails}>
        <Text style={styles.memberName}>
          {item.first_name} {item.last_name}
        </Text>
        <Text style={styles.memberText}>Email: {item.email}</Text>
        <Text style={styles.memberText}>Mobile: {item.mobile_number}</Text>
        <Text style={styles.memberText}>Address: {item.full_address}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <ActivityIndicator size="large" color="#ff4500" style={styles.loading} />
    );
  }

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchInput} // Added style for search bar
        placeholder="Search by member name..."
        value={searchQuery} // Controlled input
        onChangeText={(text) => setSearchQuery(text)} // Update search query state
      />

      {filteredMembers.length === 0 ? (
        <Text style={styles.noMembersText}>No matching members found!</Text>
      ) : (
        <FlatList
          data={filteredMembers} // Use filtered members here
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  searchInput: { // Added styles for search input
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  listContainer: {
    paddingBottom: 16,
  },
  memberCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 5,
    borderColor: "#ff4500",
  },
  memberDetails: {
    marginBottom: 8,
  },
  memberName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  memberText: {
    fontSize: 14,
    color: "#555",
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noMembersText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    color: "#999",
  },
});

export default MembersScreen;
