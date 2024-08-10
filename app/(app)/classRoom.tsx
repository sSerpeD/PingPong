import { View, Text, TouchableOpacity, Vibration } from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ClassRoomHeader from "@/components/ClassRoomHeader";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather, Ionicons } from "@expo/vector-icons";

const formatName = (name: any) => {
  if (name.startsWith("ม.")) {
    return `มัธยมศึกษาปีที่ ${name.substring(2)}`;
  } else if (name.startsWith("ป.")) {
    return `ประถมศึกษาปีที่ ${name.substring(2)}`;
  }
  return name;
};

export default function ClassRoom() {
  const item = useLocalSearchParams();
  const router = useRouter();

  return (
    <View className="flex-1 bg-neutral-100">
      <StatusBar style="dark" />
      <ClassRoomHeader user={item} router={router} />

      <View className="px-5 py-12  items-center">
        <Text style={{ fontSize: 22 }} className="font-bold">
          {formatName(item.name)}
        </Text>
      </View>

      <View className=" items-center">
        <View
          style={{
            height: hp(38),
            width: hp(38),
            justifyContent: "center",
            alignItems: "center",
          }}
          className="rounded-full bg-neutral-300 p-3 shadow-md"
        >
          <Text className="font-semibold text-neutral-800 text-center">
            {item.name}
          </Text>
        </View>
      </View>

      {/* <View className="flex py-10 justify-center items-center">
        <View
          style={{ height: hp(0.2), width: wp(85) }}
          className="bg-gray-300 rounded-full"border-right
        />
      </View> */}

      <View className="flex-row justify-between  py-32 px-10">
        <TouchableOpacity
          style={{
            height: hp(10),
            width: hp(10),
            justifyContent: "center",
            alignItems: "center",
          }}
          className="rounded-full bg-neutral-300 p-3"
          onPress={() => {}}
        >
          <Ionicons name="bluetooth" size={hp(4.5)} color="gray" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: hp(10),
            width: hp(10),
            justifyContent: "center",
            alignItems: "center",
          }}
          className="rounded-full bg-neutral-300 p-3"
          onPress={() => console.log("Ping")}
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
      </View>
    </View>
  );
}
