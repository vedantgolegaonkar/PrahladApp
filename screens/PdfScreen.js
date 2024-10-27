// screens/PdfScreen.js
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';

const PdfScreen = () => {
  // Load the PDF from the file system or an external URL
  const pdfUri = FileSystem.documentDirectory + 'Upasana.pdf'; // Assuming you store the PDF in the app's file system

  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: pdfUri }} // Use the local file path or an external URL
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PdfScreen;
