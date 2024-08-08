import { View, Text, Platform, Image } from 'react-native'
import React from 'react'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ios = Platform.OS =='ios';
export default function HomeHeader() {
  const {top} = useSafeAreaInsets();
    return (
        <View>
            <View style={{paddingTop: ios? top+3:top+10  }} className="flex-row justify-center px-5 bg-white rounded-b-3xl shadow-xl">
            <View className="items-center max-h-[10vh]">
                <Image
                    className="max-h-[7vh]"
                    resizeMode="contain"
                    source={require("../assets/images/CAree_logo.png")}
                />
            </View>
            </View>
            {/* <View className='py-[0.15vh] w-full bg-slate-400'/> */}
        </View>
  )
}