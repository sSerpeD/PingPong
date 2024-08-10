import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Entypo } from '@expo/vector-icons'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { deleteDoc, collection, doc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAuth } from '@/context/authContext';

export default function ClassRoomHeader({room, router}) {
    const {user} = useAuth();

    const handleLeftRoom = async () => {
        let roomId = Array.isArray(room.roomId) ? room.roomId[0] : room.roomId;

        if (typeof roomId === "string" && user?.userId) {
            const docRef = doc(db, "rooms", roomId);
            const membersRef = collection(docRef, "members");
            const userDocRef = doc(membersRef, user.userId);

            try {
                await deleteDoc(userDocRef);
                router.back();
            } catch (err) {
                console.log('Error removing document:', err.message);
            }
        }
    };


  return (
    <View style={{height: hp(2)}}className='bg-neutral-800'>
        <Stack.Screen
            options={{
                headerStyle: {
                    backgroundColor: '#262626'
                },
                title: '',
                headerShadowVisible: false,
                headerLeft: ()=>(
                    <View className='flex-row items-center gap-4'>
                        <TouchableOpacity onPress={handleLeftRoom} className='flex-row items-center'>
                            <Entypo name="chevron-left" size={hp(4)} color="#d4d4d4"/>
                            <Text style={{fontSize: 16}} className="font-semibold text-neutral-300 text-center">
                            ห้องเรียน
                            </Text>
                        </TouchableOpacity>
                    </View>)
            }}
        ></Stack.Screen>
    </View>
  )
}