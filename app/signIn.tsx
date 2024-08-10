import {
  View,
  Text,
  Image,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Pressable,
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
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("เข้าสู่ระบบ", "โปรดกรอกข้อมูลให้ครบถ้วน!");
      return;
    }

    setLoading(true);
    const response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    if (!response.success) {
      Alert.alert("เข้าสู่ระบบ", response.msg);
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
            <Octicons name="mail" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={(value) => (emailRef.current = value)}
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="อีเมล"
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

          <View className="flex-row justify-center">
            {loading ? (
              <Loading size={hp(12)} />
            ) : (
              <View
                style={{
                  height: hp(5),
                }}
                className="rounded-2xl mt-2"
              >
                <TouchableOpacity
                  onPress={handleLogin}
                  className="py-[10px] px-8 bg-neutral-900 items-center rounded-3xl"
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

          <View className="flex-row justify-center">
            <Text
              style={{ fontSize: hp(1.8) }}
              className="font-semibold text-neutral-500"
            >
              {`ไม่มีบัญชี?`}
            </Text>
            <Pressable onPress={() => router.push("/signUp")}>
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-bold text-neutral-900"
              >
                {` สมัครบัญชี `}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
