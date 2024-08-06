import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { FontAwesome6, Octicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Loading from "../components/Loading";
import { useAuth } from "@/context/authContext";

export default function signIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const idRef = useRef("");
  const passwordRef = useRef("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!idRef.current || !passwordRef.current) {
      Alert.alert("เข้าสู่ระบบ", "โปรดกรอกข้อมูลให้ครบถ้วน!");
      return;
    }

    setLoading(true);
    const response = await login(idRef.current, passwordRef.current);
    setLoading(false);
    if (!response.success) {
      Alert.alert("เข้าสู่ระบบ", "ข้อมูลผิดพลาด!");
    }
  };
  return (
    <View className="flex-1">
      <StatusBar style="dark" />
      {/* SignIn Image */}
      <View
        style={{
          paddingTop: hp(5),
          paddingHorizontal: wp(5),
        }}
        className="flex-1"
      >
        <View className="items-center">
          <Image
            className="max-h-[7vh] mt-[15vh]"
            resizeMode="contain"
            source={require("../assets/images/CAree_logo.png")}
          />
        </View>

        <View className="gap-5">
          {/* inputs */}
          <View
            style={{ height: hp(6) }}
            className="flex-row gap-4 px-5 bg-neutral-100 items-center rounded-2xl"
          >
            <FontAwesome6 name="user" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={(value) => (idRef.current = value)}
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="รหัสนักเรียน"
              placeholderTextColor={"gray"}
            />
          </View>

          <View
            style={{ height: hp(6) }}
            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
          >
            <Octicons name="key" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={(value) => (passwordRef.current = value)}
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="รหัสผ่าน"
              secureTextEntry
              placeholderTextColor={"gray"}
            />
          </View>

          <View>
            {loading ? (
              <View className="flex-row justify-center">
                <Loading size={hp(12)} />
              </View>
            ) : (
              <View
                style={{
                  height: hp(5),
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="rounded-2xl mt-2"
              >
                <TouchableOpacity
                  onPress={handleLogin}
                  className="py-2 px-6 bg-red-900 items-center rounded-3xl"
                >
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-semibold text-white"
                  >
                    เข้าสู่ระบบ
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}
