import React, { useState, useEffect } from 'react';
import { PermissionsAndroid, Platform, TouchableOpacity, Alert } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import { Ionicons } from '@expo/vector-icons';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const manager = new BleManager();

const SERVICE_UUID = "f7826da6-4fa2-4e98-8024-bc5b71e0893e";
const CHARACTERISTIC_UUID = "a3c87500-8ed3-4bdf-8a39-a01bebede295";

const Bluetooth = ({ ping }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [device, setDevice] = useState(null);

  useEffect(() => {
    if (Platform.OS === 'android') {
        requestBluetoothPermissions();
    }
  }, []);

  useEffect(() => {
    if (ping && device) {
      sendData();
    }
  }, [ping, device]);

  const requestBluetoothPermissions = async () => {
    try {
      if (Platform.OS === 'android' && Platform.Version >= 31) {
        const permissions = [
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ];
  
        const results = await PermissionsAndroid.requestMultiple(permissions);
  
        const allGranted = Object.values(results).every(
          (result) => result === PermissionsAndroid.RESULTS.GRANTED
        );
  
        if (allGranted) {
          console.log('All required permissions granted');
        } else {
          console.log('Some permissions were denied');
        }
      } else if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location for Bluetooth scanning.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Location permission granted');
        } else {
          console.log('Location permission denied');
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const showAlert = (title, message) => {
    Alert.alert(title, message, [{ text: "OK" }]);
  };

  const scanForDevice = () => {
    if (!isScanning) {
      setIsScanning(true);
      showAlert("Scanning", "Looking for SoundGuide device...");
      manager.startDeviceScan(null, null, (error, scannedDevice) => {
        if (error) {
          console.error('Scan error:', error);
          setIsScanning(false);
          showAlert("Error", "Failed to scan for devices. Please try again.");
          return;
        }
        if (scannedDevice.name && scannedDevice.name.includes("SoundGuide")) {
          manager.stopDeviceScan();
          showAlert("Device Found", "SoundGuide device found. Attempting to connect...");
          connectToDevice(scannedDevice);
        }
      });
      // Stop scanning after 10 seconds
      setTimeout(() => {
        if (isScanning) {
          manager.stopDeviceScan();
          setIsScanning(false);
          showAlert("Scan Timeout", "No SoundGuide device found. Please try again.");
        }
      }, 10000);
    }
  };

  const connectToDevice = async (scannedDevice) => {
    try {
      const connectedDevice = await scannedDevice.connect();
      setDevice(connectedDevice);
      setIsScanning(false);
      console.log('Connected to SoundGuide');
      showAlert("Connected", "Successfully connected to SoundGuide device.");
    } catch (error) {
      console.error('Connection error:', error);
      showAlert("Connection Error", "Failed to connect to the device. Please try again.");
    }
  };

  const sendData = async () => {
    if (device) {
      try {
        const characteristic = await device.writeCharacteristicWithResponseForService(
          SERVICE_UUID,
          CHARACTERISTIC_UUID,
          btoa('1') // Encode '1' to base64
        );
        console.log('Data sent successfully');
        showAlert("Data Sent", "Command sent to SoundGuide device.");
      } catch (error) {
        console.error('Error sending data:', error);
        showAlert("Send Error", "Failed to send data to the device. Please try reconnecting.");
      }
    }
  };

  return (
    <TouchableOpacity
      style={{
        height: hp(10),
        width: hp(10),
        justifyContent: "center",
        alignItems: "center",
      }}
      className={`rounded-full p-3 ${
        device 
          ? "bg-blue-800" 
          : (isScanning ? "bg-orange-600" : "bg-neutral-300")
      }`}
      onPress={scanForDevice}
    >
      <Ionicons 
        name="bluetooth" 
        size={hp(4.5)} 
        color={device ? "white" : (isScanning ? "white" : "gray")} 
      />
    </TouchableOpacity>
  );
};

export default Bluetooth;