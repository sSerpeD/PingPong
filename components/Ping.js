import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { PopupScreen } from './PingPopup';
import { useAuth } from "@/context/authContext";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; // Adjust the import path as needed
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome for microphone icon
import axios from 'axios';

export default function Ping({ members, item }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [pingedUsers, setPingedUsers] = useState([]); // Store multiple pinged user IDs
  const [isUserClickable, setIsUserClickable] = useState(true);
  const [recording, setRecording] = useState();
  const [isRecording, setIsRecording] = useState(false); // To track recording status
  const { user } = useAuth();
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const handlePingPress = () => {
    setIsPopupVisible(true);
  };

  const handlePopupClose = () => {
    setIsPopupVisible(false);
  };

  const handleUserPing = async (selectedUser) => {
    if (!user?.userId || !selectedUser?.userId || !isUserClickable) return;

    // Add the user ID to the pingedUsers array
    setPingedUsers(prev => [...prev, selectedUser.userId]);
    setIsUserClickable(false);

    const userDocRef = doc(db, 'rooms', item.roomId, 'members', selectedUser.userId);

    try {
      // Set ping to true
      await updateDoc(userDocRef, { ping: true });

      // Set ping back to false after 2 seconds
      setTimeout(async () => {
        await updateDoc(userDocRef, { ping: false });
      }, 2000);

      // Reset the pinged users and user clickability after 2.5 seconds
      setTimeout(() => {
        setPingedUsers(prev => prev.filter(id => id !== selectedUser.userId));
        setIsUserClickable(true);
      }, 2500);

    } catch (error) {
      console.error('Error updating ping:', error);
    }
  };

  // Function to ping all users in the room
  const handlePingAll = () => {
    members.forEach(user => {
      handleUserPing(user);
    });
  };

  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync({
        isMeteringEnabled: true,
        android: {
          extension: '.m4a',
          outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
          audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
        },
        ios: {
          extension: '.m4a',
          audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_MAX,
          sampleRate: 44100,
          numberOfChannels: 2,
          bitRate: 128000,
          linearPCMBitDepth: 16,
          linearPCMIsBigEndian: false,
          linearPCMIsFloat: false,
        },
      });
      setRecording(recording);
      setIsRecording(true); // Set recording status to true
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    if (!isRecording) return; // Only stop recording if it has started
    console.log('Stopping recording..');
    setRecording(undefined);
    setIsRecording(false); // Set recording status to false
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);

    // Send the recorded audio to the API
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: uri
      });

      const response = await axios.post('https://stt.infer.visai.ai/predict', formData, {
        headers: {
            'X-API-KEY': 'faf5d8d6286a5d77a2102c4cae3e6cfc', // Your API key
            'Content-Type': 'multipart/form-data',
        },
      });

      const transcription = response.data.transcription;
      console.log('Transcription1:', response);
      console.log('Transcription2:', response.data);
      console.log('Transcription3:', transcription);

      // Handle the transcription logic here
      if (transcription.includes("ทุกคน")) {
        handlePingAll();
      } else {
        const matchedUser = members.find(user => transcription.includes(user.username));
        if (matchedUser) {
          handleUserPing(matchedUser);
        }
      }

    } catch (error) {
      console.error('Error sending audio file to API:', error);
    }
  }

  return (
    <View>
      <TouchableOpacity
        style={{
          height: hp(10),
          width: hp(10),
          justifyContent: "center",
          alignItems: "center",
        }}
        className={`rounded-full p-3 ${isRecording ? 'bg-red-800' : 'bg-neutral-300'}`}
        onPress={handlePingPress}
        onLongPress={startRecording} // Start recording on long press
        onPressOut={stopRecording} // Stop recording when the press is released
      >
        {isRecording ? (
          <FontAwesome name="microphone" color="white" size={hp(4.5)} /> // Show microphone icon when recording
        ) : (
          <Text
            style={{ fontSize: 18 }}
            className="font-semibold text-gray-500 text-center"
          >
            PING
          </Text>
        )}
      </TouchableOpacity>

      {/* Popup Screen */}
      <PopupScreen
        members={members}
        action={handleUserPing} // Pass handleUserPing function
        value={null} // Adjust as needed
        icon={null} // Adjust if needed
        isVisible={isPopupVisible}
        onClose={handlePopupClose}
        pingedUsers={pingedUsers} // Pass pingedUsers array to PopupScreen
        handlePingAll={handlePingAll} // Pass handlePingAll function
      />
    </View>
  );
}
