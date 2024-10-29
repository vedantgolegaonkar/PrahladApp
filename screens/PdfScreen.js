import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

const PdfScreen = () => {
  const [pdfFiles, setPdfFiles] = useState([]);

  // Function to handle PDF upload
  const handleUploadPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });

      if (result.type === "success") {
        setPdfFiles((prevFiles) => [...prevFiles, result]);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to upload PDF");
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pdfFiles}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <View style={styles.pdfItem}>
            <Text style={styles.pdfText}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No PDFs uploaded</Text>}
      />

      {/* Floating Upload PDF Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={handleUploadPDF}
      >
        <Text style={styles.fabText}>Upload PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  pdfItem: {
    padding: 16,
    marginVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  pdfText: {
    fontSize: 16,
    color: "#333",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#ff4500",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  fabText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default PdfScreen;
