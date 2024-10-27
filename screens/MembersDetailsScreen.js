// MemberDetailsScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MemberDetailsScreen = ({ route }) => {
  const { member } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.detailCard}>
        <Text style={styles.memberName}>{member.first_name} {member.last_name}</Text>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{member.email}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Mobile:</Text>
          <Text style={styles.value}>{member.mobile_number}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>
            {member.flat_no}, {member.full_address}, {member.area},{member.landmark}, {member.city}, {member.state} - {member.pincode}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>
            {member.gender}
          </Text>
        </View>
         <View style={styles.detailRow}>
          <Text style={styles.label}>Anugrahit:</Text>
          <Text style={styles.value}>
            {member.anugrahit}
          </Text>
        </View>
         <View style={styles.detailRow}>
          <Text style={styles.label}>Gender:</Text>
          <Text style={styles.value}>
            {member.gender}
          </Text>
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f4f4f4',
  },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    borderLeftWidth: 5,
    borderColor: '#ff4500',
  },
  memberName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 16,
    width: '30%',
  },
  value: {
    color: '#555',
    fontSize: 16,
    width: '70%',
    flexWrap: 'wrap',
  },
});

export default MemberDetailsScreen;
