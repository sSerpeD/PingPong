import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { PopupScreen } from './PingPopup';
import { useAuth } from "@/context/authContext";
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebaseConfig'; 
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

export default function Ping({ members, item }) {
    const { user } = useAuth();
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [pingedUsers, setPingedUsers] = useState([]); // Store multiple pinged user IDs
    const [isUserClickable, setIsUserClickable] = useState(true);
    const [recording, setRecording] = useState();
    const [speech, setSpeech] = useState();
    const [isRecording, setIsRecording] = useState(false);

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

    const handlePingAll = () => {
        members.forEach(user => {
        handleUserPing(user);
        });
    };

    async function startRecording() {
        try {
          if (permissionResponse.status !== 'granted') {
            console.info('Requesting permission..');
            await requestPermission();
          }
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });
    
          const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
          );
          setRecording(recording);
          setIsRecording(true);

        } catch (err) {
          console.warn('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        if (!recording) return;
        try {
            await recording.stopAndUnloadAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
            });
            const uri = recording.getURI();
            setSpeech(uri);

        } catch (error) {
            console.warn('Failed to stop recording:', error);
        } finally {
            setIsRecording(false);
            setRecording(undefined);
            handleSTT();
        }
    }
    
    async function handleSTT() {
        if (!speech) {
            console.log('No recording available to push');
            return;
        }
    
        try {
            const formData = new FormData();
            formData.append('files', {
                uri: speech, 
                name: 'recording.m4a', 
                type: 'audio/m4a'
            });
    
            const response = await axios.post('https://stt.infer.visai.ai/predict', formData, {
                headers: {
                    'X-API-KEY': 'faf5d8d6286a5d77a2102c4cae3e6cfc',
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            const results = response.data.data.results;
            results.forEach(result => {
                result.predictions.forEach(prediction => {
                    console.log('Transcript:', prediction.transcript);
                });
            });
    
            const fullTranscript = results.map(result => result.predictions.map(prediction => prediction.transcript).join(' ')).join(' ');
            
            if (fullTranscript.includes("ทุกคน")) {
                handlePingAll();
            } else {
                const matchedUser = members.find(user => fullTranscript.includes(user.username));
                if (matchedUser) {
                    handleUserPing(matchedUser)
                }
            }
        } catch (error) {
            console.error('Error sending audio file to API:', error);
        } finally {
            setSpeech(undefined)
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
