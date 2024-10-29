import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { WebView } from "react-native-webview";

const PDFScreen = () => {
  const [pdfFiles, setPdfFiles] = useState([]);
  const [selectedPdf, setSelectedPdf] = useState(null);

  const handleUploadPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const pdfFile = result.assets[0];

        if (pdfFile.mimeType === "application/pdf" && pdfFile.uri) {
          setPdfFiles((prevFiles) => [...prevFiles, pdfFile]);
          Alert.alert("Success", "PDF uploaded successfully!");
        } else {
          Alert.alert("Error", "Please select a valid PDF file.");
        }
      } else {
        Alert.alert("Upload Cancelled", "No file was selected.");
      }
    } catch (error) {
      console.error("Document Picker Error:", error);
      Alert.alert("Error", "An error occurred while uploading PDF.");
    }
  };

  const handlePdfPress = (pdfFile) => {
    setSelectedPdf(pdfFile);
  };

  const closePdfViewer = () => {
    setSelectedPdf(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={pdfFiles}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePdfPress(item)} style={styles.pdfItem}>
            <Text style={styles.pdfText}>{item.name || "Unnamed PDF"}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No PDFs uploaded</Text>}
      />

      {/* Floating Upload PDF Button */}
      <TouchableOpacity style={styles.fab} onPress={handleUploadPDF}>
        <Text style={styles.fabText}>Upload PDF</Text>
      </TouchableOpacity>

      {/* PDF Viewer Modal */}
      <Modal visible={!!selectedPdf} animationType="slide">
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={closePdfViewer}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
        {selectedPdf && (
          <WebView
            source={{ uri: selectedPdf.uri }}
            style={{ flex: 1 }}
            onError={() => Alert.alert("Error", "Failed to load PDF")}
          />
        )}
      </Modal>
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
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 20,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#ff4500",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  fabText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalHeader: {
    padding: 16,
    backgroundColor: "#ff4500",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PDFScreen;
