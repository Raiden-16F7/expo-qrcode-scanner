// qrCodeUtils.js
const isQrCodeAtDesiredDistance = (qrSize, minSize, maxSize) => {
    return qrSize >= minSize && qrSize <= maxSize;
};

const isQrCodeCentered = (cornerPoints, cameraViewSize, toleranceFactor) => {
    const centerX = cameraViewSize.width / 2;
    const centerY = cameraViewSize.height / 2;
    const qrBounds = {
        minX: Math.min(...cornerPoints.map(point => point.x)),
        maxX: Math.max(...cornerPoints.map(point => point.x)),
        minY: Math.min(...cornerPoints.map(point => point.y)),
        maxY: Math.max(...cornerPoints.map(point => point.y)),
    };
    const qrCenterX = (qrBounds.minX + qrBounds.maxX) / 2;
    const qrCenterY = (qrBounds.minY + qrBounds.maxY) / 2;
    const qrSize = Math.sqrt(Math.pow(qrBounds.maxX - qrBounds.minX, 2) + Math.pow(qrBounds.maxY - qrBounds.minY, 2));
    const tolerance = qrSize * toleranceFactor;

    return Math.abs(centerX - qrCenterX) < tolerance && Math.abs(centerY - qrCenterY) < tolerance;
};

const handleBarCodeScanned = (type, data, cornerPoints, cameraViewSize, minSize, maxSize, toleranceFactor) => {
    // Additional logic can be implemented here if needed

    const qrWidth = Math.max(...cornerPoints.map(point => point.x)) - Math.min(...cornerPoints.map(point => point.x));
    const qrHeight = Math.max(...cornerPoints.map(point => point.y)) - Math.min(...cornerPoints.map(point => point.y));
    const qrSize = Math.sqrt(qrWidth * qrWidth + qrHeight * qrHeight);

    return isQrCodeCentered(cornerPoints, cameraViewSize, toleranceFactor) && isQrCodeAtDesiredDistance(qrSize, minSize, maxSize);
};

module.exports = {
    isQrCodeAtDesiredDistance,
    isQrCodeCentered,
    handleBarCodeScanned
};

