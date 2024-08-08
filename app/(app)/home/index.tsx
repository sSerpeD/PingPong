import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "@/context/authContext";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Home() {
  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  };

  return <View className="flex-1 bg-white"></View>;
}
