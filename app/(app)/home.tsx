import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import RoomList from "@/components/RoomList";
import { getDocs, query } from "firebase/firestore";
import { roomRef } from "@/firebaseConfig";

export default function Home() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    if (user?.uid) getRooms();
  }, []);

  const getRooms = async () => {
    const q = query(roomRef);

    const querySnapshot = await getDocs(q);
    let data: any[] = [];
    querySnapshot.forEach((doc) => {
      data.push({ ...doc.data() });
    });

    setRooms(data);
  };

  return (
    <View className="flex-1 bg-neutral-50 w-full">
      <StatusBar style="light" />

      {rooms.length > 0 ? (
        <RoomList users={rooms} />
      ) : (
        <View className="flex items-center" style={{ top: hp(30) }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
}
