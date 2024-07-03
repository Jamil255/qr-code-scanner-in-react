import React, { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

const Scanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (isScanning) {
      const scanner = new Html5QrcodeScanner('reader', {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      });

      const success = (result) => {
        scanner.clear().catch((error) => {
          console.error('Failed to clear scanner:', error);
        });
        setScanResult(result);

        // Retrieve current data from local storage
        const storedData = localStorage.getItem('scan');
        const array = storedData ? JSON.parse(storedData) : [];

        // Push the new scan result and update local storage
        array.push(result);
        localStorage.setItem('scan', JSON.stringify(array));
        
        setIsScanning(false);
      };

      const error = (err) => {
        console.warn('QR code scan error:', err);
      };

      scanner.render(success, error);

      return () => {
        scanner.clear().catch((error) => {
          console.error('Failed to clear scanner on unmount:', error);
        });
      };
    }
  }, [isScanning]);

  const startScan = () => {
    setScanResult(null); // Clear previous scan result
    setIsScanning(true);
  };

  const stopScan = () => {
    setIsScanning(false);
  };

  return (
    <div>
      <button onClick={startScan}>Start QR Code Scanner</button>
      <button onClick={stopScan}>Stop QR Code Scanner</button>
      {scanResult && <div>Scan Result: {scanResult}</div>}
      {isScanning && <div id="reader" style={{ width: '300px', margin: 'auto' }}></div>}
    </div>
  );
};

export default Scanner;
