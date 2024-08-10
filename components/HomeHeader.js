import { View, Text, Platform } from 'react-native'
import { Image } from 'expo-image';
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MenuItem } from './CustomMenuItems'
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { useAuth } from "../context/authContext";
import { FontAwesome6, MaterialIcons, Octicons } from "@expo/vector-icons";

const ios = Platform.OS =='ios';
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


export default function HomeHeader() {
    const {user, logout} = useAuth();
    const {top} = useSafeAreaInsets();

    const handleLogOut = async ()=>{
        await logout();
    }
    return (
        <View>
            <View style={{paddingTop: ios? top:top+10  }} className="px-5 py-8 bg-neutral-900 shadow-xl">
            {/* <View className="items-center max-h-[10vh]">
                <Image
                    className="max-h-[7vh]"
                    resizeMode="contain"
                    source={require("../assets/images/CAree_logo.png")}
                />
            </View> */}
                <View className='flex-row justify-between pt-3'>
                    <View className='flex justify-center'>
                        <Text style={{fontSize: 30}} className='font-medium text-white'>SoundGuide</Text>
                    </View>
                    <View className='flex-row justify-center items-center gap-3'>
                        {/* <Text style={{ fontSize: hp(1.5), fontWeight: '500', color: '#333' }}>
                            {user?.username || "..."}
                        </Text> */}
                        <Menu>
                        <MenuTrigger>
                            <Image
                            style={{height: hp(5.3), aspectRatio: 1, borderRadius: 1000}}
                            placeholder={blurhash}
                            source={user?.profileUrl}
                            />
                        </MenuTrigger>
                        <MenuOptions
                            customStyles={{optionsContainer: {
                            borderRadius: 10,
                            marginRight: 45,
                            marginTop: 50,
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
                    </View>
                </View>
            </View>
            {/* <View className='py-[0.15vh] w-full bg-slate-400'/> */}
        </View>
  )
}