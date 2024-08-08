import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@/context/authContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Account() {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  return (
    <View
      style={{
        height: hp(5),
      }}
      className="rounded-2xl mt-2"
    >
      <TouchableOpacity
        onPress={handleLogout}
        className="py-2 px-6 bg-red-900 items-center rounded-3xl"
      >
        <Text style={{ fontSize: hp(2) }} className="font-semibold text-white">
          ออกจากระบบ
        </Text>
      </TouchableOpacity>
    </View>
  );
}
