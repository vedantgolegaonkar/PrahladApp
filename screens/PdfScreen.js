import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { AntDesign } from "@expo/vector-icons";
import PDFReader from "react-native-pdf";

const PdfScreen = () => {
  const [pdfUri, setPdfUri] = useState(null);

  // Function to handle PDF upload
  const handleUploadPdf = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
      });
      if (result.type === "success") {
        setPdfUri(result.uri);
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
    }
  };

  return (
    <View style={styles.container}>
      {pdfUri ? (
        <PDFReader
          source={{ uri: pdfUri }}
          style={styles.pdfViewer}
        />
      ) : (
        <Text style={styles.placeholderText}>No PDF uploaded yet.</Text>
      )}

      <TouchableOpacity style={styles.uploadButton} onPress={handleUploadPdf}>
        <AntDesign name="upload" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default PdfScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  pdfViewer: {
    width: "100%",
    height: "100%",
  },
  placeholderText: {
    fontSize: 18,
    color: "gray",
  },
  uploadButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FF6F00",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
});
