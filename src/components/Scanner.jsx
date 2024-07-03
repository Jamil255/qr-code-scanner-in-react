import React, { useEffect, useState } from 'react'
import { Html5QrcodeScanner } from 'html5-qrcode'

const Scanner = () => {
  const [scanResult, setScanResult] = useState(null)

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    })

    let isScanning = true // Added isScanning flag

    scanner.render(success, error)

    function success(result) {
      if (isScanning) {
        scanner.clear()
        setScanResult(result)
        isScanning = false // Set isScanning to false to stop further scanning

        // Retrieve current data from local storage
        const storedData = localStorage.getItem('scan')
        const array = storedData ? JSON.parse(storedData) : []

        // Push the new scan result and update local storage
        array.push(result)
        localStorage.setItem('scan', JSON.stringify(array))
      }
    }

    function error(err) {
      console.warn(err)
    }

    return () => {
      scanner.clear()
    }
  }, [])

  return (
    <div>
      {scanResult ? (
        <div>{scanResult}</div>
      ) : (
        <div id="reader" style={{ width: '300px', margin: 'auto' }}></div>
      )}
    </div>
  )
}

export default Scanner
