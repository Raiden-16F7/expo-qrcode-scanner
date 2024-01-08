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
    <BarCodeScanner
      onBarCodeScanned={!scanned ? handleScan : undefined}
      style={[StyleSheet.absoluteFillObject, { style }]}
    />
  );
};

export default QRCodeScanner;
