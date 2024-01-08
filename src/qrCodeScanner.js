// QRCodeScanner.js
import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { handleBarCodeScanned } from "./qrCodeUtils"; // Import utility functions
import { BarCodeScanner } from "expo-barcode-scanner";

const validateProps = (minSize, maxSize, toleranceFactor) => {
  if (minSize == null || maxSize == null || toleranceFactor == null) {
    throw new Error(
      "QRCodeScanner: minSize, maxSize, and toleranceFactor must be provided."
    );
  }
  if (
    typeof minSize !== "number" ||
    typeof maxSize !== "number" ||
    typeof toleranceFactor !== "number"
  ) {
    throw new Error(
      "QRCodeScanner: minSize, maxSize, and toleranceFactor must be numbers."
    );
  }
};

const QRCodeScanner = ({
  style,
  onScanSuccess,
  onScanFail,
  toleranceFactor = 0.5,
  minSize = 141,
  maxSize = 220,
  scanningInfinitely = false, // New prop for continuous scanning
}) => {
  validateProps(minSize, maxSize, toleranceFactor);
  const [scanned, setScanned] = useState(false);

  const handleScan = (scanData) => {
    if (!scanningInfinitely) {
      setScanned(true);
    }

    const cameraViewSize = {
      width: Dimensions.get("screen").width,
      height: Dimensions.get("screen").height,
    };

    if (
      handleBarCodeScanned(
        scanData.type,
        scanData.data,
        scanData.cornerPoints,
        cameraViewSize,
        minSize,
        maxSize,
        toleranceFactor
      )
    ) {
      if (onScanSuccess) {
        onScanSuccess(scanData);
      }
    } else {
      if (onScanFail) {
        onScanFail(scanData);
      }
    }
  };

  return (
    <View style={[styles.container, style]}>
      <BarCodeScanner
        onBarCodeScanned={!scanned ? handleScan : undefined}
        style={StyleSheet.absoluteFillObject}
      />
      <View style={styles.overlay}>
        <View style={styles.unfocusedContainer} />
        <View style={styles.focusedContainer}>
          <View style={styles.focusedBox} />
        </View>
        <View style={styles.unfocusedContainer} />
      </View>
    </View>
  );
};

const overlayColor = "rgba(0,0,0,0.6)"; // Background color for unfocused areas

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  overlay: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  unfocusedContainer: {
    flex: 1,
    backgroundColor: overlayColor,
  },
  focusedContainer: {
    flexDirection: "row",
  },
  focusedBox: {
    flex: 1,
    height: 250,
    borderWidth: 2,
    borderColor: "#FFF",
    borderRadius: 8,
    backgroundColor: "transparent",
  },
});

export default QRCodeScanner;
