import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useRouter } from 'expo-router';

export default function RoomItem({ item, router }) {
    const openClassRoom = ()=>{
        router.push({pathname: '/classRoom', params: item});
    }

    return (
      <TouchableOpacity
        onPress={openClassRoom}
        style={{ height: hp(10), width: hp(10), justifyContent: 'center', alignItems: 'center' }}
        className="rounded-full bg-neutral-300 p-3"
      >
        <Text className="font-semibold text-neutral-800 text-center">
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  }
  