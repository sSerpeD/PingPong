import {
  View,
  Text,
  Image,
  TextInput,
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
  const { register } = useAuth();

  const [loading, setLoading] = useState(false);

  const emailRef = useRef("");
  const passwordRef = useRef("");
  const usernameRef = useRef("");
  const imageRef = useRef("");

  const handleRegister = async () => {
    if (
      !emailRef.current ||
      !passwordRef.current ||
      !usernameRef.current ||
      !imageRef.current
    ) {
      Alert.alert("สมัครบัญชี", "โปรดกรอกข้อมูลให้ครบถ้วน!");
      return;
    }

    setLoading(true);
    const response = await register(
      emailRef.current,
      passwordRef.current,
      usernameRef.current,
      imageRef.current
    );
    setLoading(false);
    if (!response.success) {
      Alert.alert("สมัครบัญชี", response.msg);
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
        <View className="items-center max-h-[30vh]">
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
              onChangeText={(value) => (usernameRef.current = value)}
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="ชื่อ"
              placeholderTextColor={"gray"}
            />
          </View>

          <View
            style={{ height: hp(6) }}
            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
          >
            <Octicons name="mail" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={(value) => (emailRef.current = value)}
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="อีเมล"
              secureTextEntry
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

          <View
            style={{ height: hp(6) }}
            className="flex-row gap-4 px-4 bg-neutral-100 items-center rounded-2xl"
          >
            <Octicons name="image" size={hp(2.7)} color="gray" />
            <TextInput
              onChangeText={(value) => (imageRef.current = value)}
              style={{ fontSize: hp(2) }}
              className="flex-1 font-semibold text-neutral-700"
              placeholder="ลิงค์รูปภาพ"
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
                }}
                className="rounded-2xl mt-2"
              >
                <TouchableOpacity
                  onPress={handleRegister}
                  className="py-[10px] px-8 bg-red-900 items-center rounded-3xl"
                >
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-semibold text-white"
                  >
                    สมัครบัญชี
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
              {`มีบัญชีอยู่แล้ว?`}
            </Text>
            <Pressable onPress={() => router.push("/signIn")}>
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-bold text-red-900"
              >
                {` เข้าสู่ระบบ `}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}
