import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Loading({size}) {
  return (
    <View>
        {/* <LottieView source={require('../assets/animations/loading.json')} autoPlay loop/> */}
        <View
                style={{
                  height: hp(5),
                }}
                className="rounded-2xl mt-2"
              >
                <View
                  className="py-[10px] px-8 bg-red-900 items-center rounded-3xl"
                >
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-semibold text-white"
                  >
                    กำลังโหลด...
                  </Text>
                </View>
              </View>
    </View>
  )
}