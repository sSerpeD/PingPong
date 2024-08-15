import { View, Text, Vibration } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import ClassRoomHeader from "@/components/ClassRoomHeader";
import Ping from "@/components/Ping";
import { db } from "@/firebaseConfig";
import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useAuth } from "@/context/authContext";
import Study from "@/components/LottieStudy";
import Calling from "@/components/LottieCalling";
import Bluetooth from "@/components/Bluetooth";

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
  const [members, setMembers] = useState<DocumentData[]>([]);
  const [pingImage, setPingImage] = useState(false);
  const { user } = useAuth();

  const ONE_SECOND_IN_MS = 500;
  const PATTERN = [
    1 * ONE_SECOND_IN_MS,
    2 * ONE_SECOND_IN_MS,
    3 * ONE_SECOND_IN_MS,
    4 * ONE_SECOND_IN_MS,
    5 * ONE_SECOND_IN_MS,
    6 * ONE_SECOND_IN_MS,
  ];
  // Inside your component
  useEffect(() => {
    let roomId = Array.isArray(item.roomId) ? item.roomId[0] : item.roomId;

    if (typeof roomId === "string") {
      const docRef = doc(db, "rooms", roomId);
      const membersRef = collection(docRef, "members");
      const q = query(membersRef, orderBy("username", "asc"));

      let unsub = onSnapshot(q, (snapshot) => {
        let allMembers = snapshot.docs.map((doc) => {
          const memberData = doc.data();
          if (memberData.userId === user?.userId && memberData.ping) {
            setPingImage(true);
            Vibration.vibrate(PATTERN);

            // Reset pingImage to false after 12.5 seconds
            setTimeout(() => {
              setPingImage(false);
            }, 12500);
          }
          return memberData;
        });
        setMembers([...allMembers]);
      });

      return unsub;
    }
  }, [item.roomId, user?.userId]);

  useEffect(() => {
    Vibration.vibrate();
  }, []);

  console.log("Memebrs: ", members);
  return (
    <View className="flex-1 bg-neutral-100">
      <StatusBar style="dark" />
      <ClassRoomHeader room={item} router={router} />

      <View className="px-5 py-12  items-center">
        <Text style={{ fontSize: 22 }} className="font-bold">
          {formatName(item.name)}
        </Text>
      </View>

      <View className=" items-center">
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
          className="rounded-full bg-neutral-300 p-3 shadow-md h-[38vh] w-[82vw]"
        >
          {pingImage ? <Calling size={35} /> : <Study size={35} />}
        </View>
      </View>

      <View className="flex-row justify-between  py-32 px-10">
        <Bluetooth ping={pingImage} />

        <Ping members={members} item={item} />
      </View>
    </View>
  );
}
