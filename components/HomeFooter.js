import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useAuth } from "../context/authContext";
import { FontAwesome6, MaterialIcons, Octicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import { MenuItem } from './CustomMenuItems'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function HomeFooter() {
  const {user, logout} = useAuth();
  const router = useRouter();
  const handleLogOut = async ()=>{
    await logout();
  }
    return (
      <View
        style={{
          height: hp(15),
          backgroundColor: '#f6f6f6',
        }}
        className="flex-col justify-center px-16 pb-[3vh] rounded-t-3xl shadow-md"
      >
        <View className='flex-1 justify-center'>
        </View>
        <View className="flex-row justify-between">
          <Pressable onPress={() => router.replace("/home")} className='flex-col justify-center items-center gap-1'>
            <MaterialIcons name="meeting-room" size={hp(3)} color="gray" />
            <Text style={{ fontSize: hp(1.5), fontWeight: '500', color: '#333' }}>
              ห้องเรียน
            </Text>
          </Pressable>
          <View className='flex-col justify-center items-center gap-1'>
          <Menu>
            <MenuTrigger>
              <Image
                style={{height: hp(4.3), aspectRatio: 1, borderRadius: 1000}}
                placeholder={blurhash}
                source={user?.profileUrl}
              />
            </MenuTrigger>
            <MenuOptions
              customStyles={{optionsContainer: {
                borderRadius: 10,
                marginLeft: 45,
                marginTop: -45,
                width: 140,
              }}}>
              <MenuItem
                text="Sign Out"
                action={handleLogOut}
                value={null}
                icon={<MaterialIcons name="logout" size={hp(2.5)} color="#737373"/>}
              />
            </MenuOptions>
          </Menu>
            <Text style={{ fontSize: hp(1.5), fontWeight: '500', color: '#333' }}>
              {user?.username || "..."}
            </Text>
          </View>
        </View>
      </View>
    );
  };