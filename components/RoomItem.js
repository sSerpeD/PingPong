import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from 'expo-router';
import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth } from "@/context/authContext";

export default function RoomItem({ item, router }) {
    const {user} = useAuth();

    const handlejoinRoom = async () => {
        let roomId = Array.isArray(item.roomId) ? item.roomId[0] : item.roomId;
    
        if (typeof roomId === "string" && user?.userId) {
            const docRef = doc(db, "rooms", roomId);
            const membersRef = collection(docRef, "members");
            const userDocRef = doc(membersRef, user.userId);
    
            await setDoc(userDocRef, {
                userId: user.userId,
                username: user.username,
                profileUrl: user.profileUrl,
                ping: false,
            });
            router.push({pathname: '/classRoom', params: item});
        }
    };

    return (
      <TouchableOpacity
        onPress={handlejoinRoom}
        style={{ height: hp(10), width: hp(10), justifyContent: 'center', alignItems: 'center' }}
        className="rounded-full bg-neutral-300 p-3"
      >
        <Text className="font-semibold text-neutral-800 text-center">
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }
  