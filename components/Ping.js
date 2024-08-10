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

export default function Ping({ members, item }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [pingedUsers, setPingedUsers] = useState([]); // Store multiple pinged user IDs
  const [isUserClickable, setIsUserClickable] = useState(true);
  const { user } = useAuth();

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

  return (
    <View>
      <TouchableOpacity
        style={{
          height: hp(10),
          width: hp(10),
          justifyContent: "center",
          alignItems: "center",
        }}
        className="rounded-full bg-neutral-300 p-3"
        onPress={handlePingPress}
        onLongPress={() => console.log("StartPing")}
        onPressOut={() => console.log("StopPing")}
      >
        <Text
          style={{ fontSize: 18 }}
          className="font-semibold text-gray-500 text-center"
        >
          PING
        </Text>
      </TouchableOpacity>

      {/* Popup Screen */}
      <PopupScreen
        members={members}
        action={handleUserPing} // Pass handleUserPing function
        value="someValue" // Adjust as needed
        icon={null} // Adjust if needed
        isVisible={isPopupVisible}
        onClose={handlePopupClose}
        pingedUsers={pingedUsers} // Pass pingedUsers array to PopupScreen
        handlePingAll={handlePingAll} // Pass handlePingAll function
      />
    </View>
  );
}
