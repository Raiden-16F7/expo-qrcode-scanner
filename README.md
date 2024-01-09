
# QR Code Scanner Module for Expo 📸

This module provides a React Native component for scanning QR codes, specifically designed for use with Expo. It offers a customizable QR code scanning experience, allowing users to specify various parameters and styles.

## Installation 📦

To use this module in your Expo project, install it via npm or yarn:

```bash
npm install expo-qrcode-scanner
# or
yarn add expo-qrcode-scanner
```

## Usage 🚀

First, import the `QRCodeScanner` into your React Native component:

```javascript
import QRCodeScanner from 'expo-qrcode-scanner';
```

Then, you can use the `QRCodeScanner` in your component's render method:

```javascript
import React from 'react';
import { View } from 'react-native';
import QRCodeScanner from 'expo-qrcode-scanner';

const YourComponent = () => {
    const handleScanSuccess = (scanData) => {
        // Handle successful scan
        console.log('QR Code Scanned:', scanData);
    };

    const handleScanFail = () => {
        // Handle scan failure
        console.log('Failed to scan QR Code.');
    };

    return (
        <View style={{ flex: 1 }}>
            <QRCodeScanner
                onScanSuccess={handleScanSuccess}
                onScanFail={handleScanFail}
                // Additional props
            />
        </View>
    );
};

export default YourComponent;
```

## Requesting Camera Permissions 🎥

Before scanning QR codes, your app must ask the user for permission to access the camera. You can do this using Expo's `Permissions` API:

```javascript
import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import QRCodeScanner from 'expo-qrcode-scanner';
import {BarCodeScanner} from 'expo-barcode-scanner';

const CameraScreen = () => {
    const [hasPermission, setHasPermission] = useState(null);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={{ flex: 1 }}>
            <QRCodeScanner
                onScanSuccess={(scanData) => console.log(scanData)}
                onScanFail={() => console.log('Failed to scan')}
                // Additional props
            />
        </View>
    );
};
```
## Props 📐

The `QRCodeScannerComponent` accepts the following props:

| Prop            | Type     | Default | Required | Description                                                  |
|-----------------|----------|---------|----------|--------------------------------------------------------------|
| `style`         | Object   | -       | No       | A custom style object to apply to the scanner component.     |
| `onScanSuccess` | Function | -       | No       | A callback function invoked when a QR code is successfully scanned. |
| `onScanFail`    | Function | -       | No       | A callback function invoked when a scan attempt fails.       |
| `toleranceFactor` | Number | 0.5     | No       | A number representing the tolerance factor for QR code centering. |
| `minSize`       | Number   | 140       | Yes      | The minimum size for a QR code to be considered valid.       |
| `maxSize`       | Number   | 220       | Yes      | The maximum size for a QR code to be considered valid.       |
| `scanningInfinitely`  | boolean  | false       | Yes      | Scan QR code continously   |

## Contributing 🤝

Contributions to this module are welcome. Please ensure that your code adheres to the existing style and functionality.

## License 📄

This module is licensed under the MIT License.
