// QRCodeScannerComponent.js
import React, { useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { handleBarCodeScanned } from './qrCodeUtils'; // Import utility functions
import {BarCodeScanner} from 'expo-barcode-scanner';

const validateProps = (minSize, maxSize, toleranceFactor) => {
    if (minSize == null || maxSize == null || toleranceFactor == null) {
        throw new Error('QRCodeScanner: minSize, maxSize, and toleranceFactor must be provided.');
    }
    if (typeof minSize !== 'number' || typeof maxSize !== 'number' || typeof toleranceFactor !== 'number') {
        throw new Error('QRCodeScanner: minSize, maxSize, and toleranceFactor must be numbers.');
    }
};

const QRCodeScanner = ({
    style,
    onScanSuccess,
    onScanFail,
    toleranceFactor = 0.5,
    minSize = 141,
    maxSize = 220
}) => {
    validateProps(minSize, maxSize, toleranceFactor);
    const [scanned, setScanned] = useState(false);

    const handleScan = (scanData) => {
        const cameraViewSize = {
            width: Dimensions.get("screen").width,
            height: Dimensions.get("screen").height,
        };

        if (handleBarCodeScanned(scanData.type, scanData.data, scanData.cornerPoints, cameraViewSize, minSize, maxSize, toleranceFactor)) {
            setScanned(true);
            if (onScanSuccess) {
                onScanSuccess(scanData);
            }
            // Optionally reset scanner state after a delay
            // setTimeout(() => setScanned(false), 5000);
        } else {
            if (onScanFail) {
                onScanFail(scanData);
            }
        }
    };

    return (
        <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleScan}
            style={[StyleSheet.absoluteFillObject, style]}
            />
        );
    };
    
    const styles = StyleSheet.create({
        // Define your styles here
    });
    
    export default QRCodeScannerComponent;

